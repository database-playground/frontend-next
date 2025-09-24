import { graphql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Pencil } from "lucide-react";
import { SubmissionStatus } from "@/gql/graphql";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const SUBMISSION_HISTORY = graphql(`
  query SubmissionHistory($id: ID!) {
    question(id: $id) {
      id
      userSubmissions {
        id
        status
        submittedCode
        submittedAt
      }
    }
  }
`);

interface SubmissionHistoryProps {
  id: string;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function CodePreview({
  code,
  maxLength = 100,
}: {
  code: string;
  maxLength?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const shouldTruncate = code.length > maxLength;
  const displayCode =
    expanded || !shouldTruncate ? code : code.slice(0, maxLength) + "...";

  return (
    <div className="space-y-2">
      <pre className="text-xs bg-muted p-2 rounded overflow-x-auto whitespace-pre-wrap">
        <code>{displayCode}</code>
      </pre>
      {shouldTruncate && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="h-6 px-2 text-xs"
        >
          {expanded ? (
            <>
              <ChevronDown className="w-3 h-3 mr-1" />
              收起
            </>
          ) : (
            <>
              <ChevronRight className="w-3 h-3 mr-1" />
              展開
            </>
          )}
        </Button>
      )}
    </div>
  );
}

export default function SubmissionHistory({ id }: SubmissionHistoryProps) {
  const { data } = useSuspenseQuery(SUBMISSION_HISTORY, {
    variables: { id },
  });

  const submissions = data?.question?.userSubmissions || [];

  if (submissions.length === 0) {
    return (
      <Alert>
        <Pencil />
        <AlertTitle>尚無提交記錄</AlertTitle>
        <AlertDescription>
          完成第一次提交後，您的記錄將會顯示在這裡
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">提交記錄</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">狀態</TableHead>
            <TableHead className="w-40">提交時間</TableHead>
            <TableHead>程式碼</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission) => (
            <TableRow key={submission.id}>
              <TableCell>
                <StatusBadge status={submission.status} />
              </TableCell>
              <TableCell className="text-sm">
                {formatDate(submission.submittedAt)}
              </TableCell>
              <TableCell>
                <CodePreview code={submission.submittedCode} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function StatusBadge({ status }: { status: SubmissionStatus }) {
  switch (status) {
    case SubmissionStatus.Success:
      return (
        <Badge variant="default" className="bg-green-500 hover:bg-green-600">
          通過
        </Badge>
      );
    case SubmissionStatus.Failed:
      return <Badge variant="destructive">錯誤</Badge>;
    case SubmissionStatus.Pending:
      return <Badge variant="secondary">執行中</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
