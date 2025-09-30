import { graphql } from "@/gql";
import { getClient } from "@/lib/apollo.rsc";
import { checkAuthorizedStatus } from "@/lib/auth.rsc";
import { anthropic, type AnthropicProviderOptions } from "@ai-sdk/anthropic";
import { convertToModelMessages, stepCountIs, streamText, tool, type UIMessage } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

export const maxDuration = 30;

const QUESTION_INFO = graphql(`
  query QuestionInfo($id: ID!) {
    question(id: $id) {
      id
      title
      description
      difficulty
    }
  }
`);

const CORRECT_ANSWER_RESULT = graphql(`
  query CorrectAnswer($id: ID!) {
    question(id: $id) {
      id
      referenceAnswerResult {
        columns
        rows
      }
    }
  }
`);

const USER_ANSWER_RESULT = graphql(`
  query UserAnswerResult($id: ID!) {
    question(id: $id) {
      id
      lastSubmission {
        id
        submittedCode
        status
        queryResult {
          columns
          rows
        }
        error
      }
    }
  }
`);

const QUESTION_SCHEMA = graphql(`
  query QuestionSchema($id: ID!) {
    question(id: $id) {
      id
      database {
        id
        structure {
          tables {
            columns
            name
          }
        }
      }
    }
  }`);

interface ChatRouteRequest {
  messages: UIMessage[];
  questionId: string;
}

export async function POST(req: Request) {
  const authorized = await checkAuthorizedStatus();
  if (!authorized) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { messages, questionId }: ChatRouteRequest = await req.json();

  const apollo = await getClient();

  const { data, error } = await apollo.query({
    query: QUESTION_INFO,
    variables: { id: questionId },
    errorPolicy: "all",
  });
  if (!data?.question) {
    return NextResponse.json(
      { "error": "failed to fetch question info", "details": error?.message },
      { status: 500 },
    );
  }

  const result = streamText({
    model: anthropic("claude-sonnet-4-20250514"),
    providerOptions: {
      anthropic: {
        thinking: { type: "enabled", budgetTokens: 12000 },
      } satisfies AnthropicProviderOptions,
    },
    messages: convertToModelMessages(messages),
    system: `你是一個 SQL 學習助理，專門協助使用者解決 SQL 練習題目。
你可以：
1. 查看使用者提交的答案和結果
2. 查看正確答案的結果
3. 比較兩者的差異
4. 提供學習建議和錯誤分析

請用繁體中文回答，保持友善和專業的語氣。當使用者的答案有錯誤時，引導他們思考而不是直接給出答案。

題目 ID: ${questionId}
題目標題: ${data.question.title}
題目描述: ${data.question.description}
題目難度: ${data.question.difficulty}`,
    stopWhen: stepCountIs(5),
    tools: {
      getMyAnswer: tool({
        description:
          "取得使用者最後提交的答案結果，包括查詢結果、錯誤訊息和狀態。如果使用者問關於他們的答案，使用這個工具。",
        inputSchema: z.object({}),
        execute: async () => {
          const { data, error } = await apollo.query({
            query: USER_ANSWER_RESULT,
            variables: { id: questionId },
            errorPolicy: "all",
          });
          if (!data?.question) {
            return { error: "無法取得題目資料", details: error?.message };
          }

          const { lastSubmission } = data.question;
          if (!lastSubmission) {
            return { error: "使用者尚未提交答案" };
          }

          return {
            status: lastSubmission.status,
            submittedCode: lastSubmission.submittedCode,
            queryResult: lastSubmission.queryResult
              ? {
                columns: lastSubmission.queryResult.columns,
                rows: lastSubmission.queryResult.rows,
              }
              : null,
            error: lastSubmission.error,
          };
        },
      }),
      getCorrectAnswer: tool({
        description: "取得題目的正確答案結果，你可以對照和使用者的答案差異。",
        inputSchema: z.object({}),
        execute: async () => {
          const { data, error } = await apollo.query({
            query: CORRECT_ANSWER_RESULT,
            variables: { id: questionId },
            errorPolicy: "all",
          });
          if (!data?.question) {
            return { error: "無法取得題目資料", details: error?.message };
          }

          return {
            queryResult: data.question.referenceAnswerResult
              ? {
                columns: data.question.referenceAnswerResult.columns,
                rows: data.question.referenceAnswerResult.rows,
              }
              : null,
          };
        },
      }),
      getQuestionSchema: tool({
        description: "取得題目的資料庫結構，你可以用這個數據輔助了解 SQL 結構。",
        inputSchema: z.object({}),
        execute: async () => {
          const { data, error } = await apollo.query({
            query: QUESTION_SCHEMA,
            variables: { id: questionId },
            errorPolicy: "all",
          });
          if (!data?.question) {
            return { error: "無法取得題目資料", details: error?.message };
          }

          return {
            schema: data.question.database.structure
              ? {
                tables: data.question.database.structure.tables.map((table) => ({
                  name: table.name,
                  columns: table.columns,
                })),
              }
              : null,
          };
        },
      }),
      webSearch: anthropic.tools.webSearch_20250305({
        maxUses: 5,
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
