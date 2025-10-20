import { Button } from "@/components/ui/button";
import { sql, SQLite } from "@codemirror/lang-sql";
import CodeMirror, { type ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { Code, Play } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

export interface SQLEditorProps {
  disabled?: boolean;
  onSubmit?: (value: string) => void;
  schema?: Record<string, string[]>;
  defaultValue?: string;
}

export default function SQLEditor({
  onSubmit,
  schema,
  disabled,
  defaultValue,
}: SQLEditorProps) {
  const codeMirrorRef = useRef<ReactCodeMirrorRef>(null);

  const handleSubmit = () => {
    onSubmit?.(codeMirrorRef.current?.view?.state?.doc.toString() ?? "");
  };

  const handleFormat = async () => {
    const { formatDialect, sqlite: formatterSqlite } = await import(
      "sql-formatter"
    );

    const currentCode = codeMirrorRef.current?.view?.state.doc.toString() ?? "";
    const formattedCode = formatDialect(currentCode, {
      dialect: formatterSqlite,
      keywordCase: "upper",
    });

    codeMirrorRef.current?.view?.dispatch({
      changes: { from: 0, to: currentCode.length, insert: formattedCode },
    });

    toast.success("成功格式化 SQL 程式碼");
  };

  return (
    <div className="flex flex-col gap-4">
      <CodeMirror
        className="rounded text-sm"
        ref={codeMirrorRef}
        readOnly={disabled}
        value={defaultValue}
        extensions={[
          sql({
            dialect: SQLite,
            schema,
            upperCaseKeywords: true,
          }),
        ]}
      />

      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleFormat}
            disabled={disabled}
          >
            <Code />
            格式化
          </Button>
        </div>

        <Button size="sm" onClick={handleSubmit} disabled={disabled}>
          <Play />
          送出
        </Button>
      </div>
    </div>
  );
}
