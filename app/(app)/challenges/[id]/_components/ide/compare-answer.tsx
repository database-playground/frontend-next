"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { graphql } from "@/gql";
import { SubmissionStatus } from "@/gql/graphql";
import { compareCSV, tableToCSV } from "@/lib/csv-utils";
import { useSuspenseQuery } from "@apollo/client/react";
import { EditorState, EditorView } from "@uiw/react-codemirror";
import { AlertCircle, CheckCircle, Pencil, XCircle } from "lucide-react";
import CodeMirrorMerge from "react-codemirror-merge";

export interface CompareAnswerProps {
  id: string;
}

export const COMPARE_ANSWER_QUERY = graphql(`
  query CompareAnswer($id: ID!) {
    question(id: $id) {
      id
      lastSubmission {
        id
        error
        status
        queryResult {
          columns
          rows
        }
      }
      referenceAnswerResult {
        columns
        rows
      }
    }
  }
`);

const Original = CodeMirrorMerge.Original;
const Modified = CodeMirrorMerge.Modified;

export default function CompareAnswer({ id }: CompareAnswerProps) {
  const { data } = useSuspenseQuery(COMPARE_ANSWER_QUERY, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  const { referenceAnswerResult, lastSubmission } = data.question;

  // 如果沒有提交答案
  if (!lastSubmission) {
    return (
      <Alert>
        <Pencil />
        <AlertTitle>您尚未提交答案</AlertTitle>
        <AlertDescription>
          在左邊的 SQL 編輯器送出你的答案後，你就能在這邊看到與正確答案的比較。
        </AlertDescription>
      </Alert>
    );
  }

  // 如果有語法錯誤
  if (lastSubmission.error) {
    return (
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>無法比較答案</AlertTitle>
        <AlertDescription>
          您的 SQL 查詢有語法錯誤，請先修正錯誤後再進行比較。
        </AlertDescription>
      </Alert>
    );
  }

  // 如果沒有查詢結果
  if (!lastSubmission.queryResult) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>無法比較答案</AlertTitle>
        <AlertDescription>
          您的查詢沒有回傳結果，無法進行比較。
        </AlertDescription>
      </Alert>
    );
  }

  // 轉換為 CSV 格式
  const correctAnswerCSV = tableToCSV(
    referenceAnswerResult.columns,
    referenceAnswerResult.rows,
  );

  const myAnswerCSV = tableToCSV(
    lastSubmission.queryResult.columns,
    lastSubmission.queryResult.rows,
  );

  // 如果答案正確，顯示成功訊息
  if (
    lastSubmission.status === SubmissionStatus.Success
    || compareCSV(correctAnswerCSV, myAnswerCSV)
  ) {
    return (
      <Alert className="border-green-200 bg-green-50 text-green-800">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertTitle>答案正確</AlertTitle>
        <AlertDescription>
          恭喜！您的查詢結果與正確答案完全一致。
        </AlertDescription>
      </Alert>
    );
  }

  // 顯示比較界面
  return (
    <div className="space-y-4">
      <Alert variant="destructive">
        <XCircle />
        <AlertTitle>答案不正確</AlertTitle>
        <AlertDescription>
          您的查詢結果與正確答案不符，請查看下方的比較結果。
        </AlertDescription>
      </Alert>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          答案比較 (左側：正確答案，右側：您的答案)
        </h3>
        <div className="overflow-hidden rounded-md border">
          <CodeMirrorMerge>
            <Original
              value={correctAnswerCSV}
              extensions={[
                EditorView.editable.of(false),
                EditorState.readOnly.of(true),
              ]}
            />
            <Modified
              value={myAnswerCSV}
              extensions={[
                EditorView.editable.of(false),
                EditorState.readOnly.of(true),
              ]}
            />
          </CodeMirrorMerge>
        </div>
      </div>
    </div>
  );
}
