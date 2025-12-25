import AnswerTable from "@/components/answer/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { graphql } from "@/gql";
import { SubmissionStatus } from "@/gql/graphql";
import { useSuspenseQuery } from "@apollo/client/react";
import { AlertCircle, CheckCircle, Pencil, XCircle } from "lucide-react";

export interface MyAnswerProps {
  id: string;
}

export const MY_ANSWER = graphql(`
  query MyAnswer($id: ID!) {
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
    }
  }
`);

export default function MyAnswer({ id }: MyAnswerProps) {
  const { data } = useSuspenseQuery(MY_ANSWER, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  if (!data.question.lastSubmission) {
    return (
      <Alert>
        <Pencil />
        <AlertTitle>您尚未提交答案</AlertTitle>
        <AlertDescription>
          在左邊的 SQL 編輯器送出你的答案後，你就能在這邊看到查詢結果。
        </AlertDescription>
      </Alert>
    );
  }

  if (data.question.lastSubmission.error) {
    const { error } = data.question.lastSubmission;
    return (
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>您的答案有語法錯誤</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {data.question.lastSubmission.status === SubmissionStatus.Success
        ? (
          <Alert className="border-green-200 bg-green-50 text-green-800">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle>答案正確</AlertTitle>
            <AlertDescription>
              恭喜！您的 SQL 查詢已成功執行並返回正確結果。
            </AlertDescription>
          </Alert>
        )
        : (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>答案錯誤</AlertTitle>
            <AlertDescription>
              您的查詢結果與預期答案不符，請檢查您的 SQL 語句。
            </AlertDescription>
          </Alert>
        )}

      {data.question.lastSubmission.queryResult
        ? (
          <AnswerTable
            columns={data.question.lastSubmission.queryResult.columns}
            rows={data.question.lastSubmission.queryResult.rows}
          />
        )
        : <p>無查詢結果</p>}
    </div>
  );
}
