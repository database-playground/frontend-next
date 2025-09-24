import CodeMirror, { type ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { sql, SQLite } from "@codemirror/lang-sql";
import { Lightbulb, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export interface SQLEditorProps {
  disabled?: boolean;
  onSubmit?: (value: string) => void;
  onHint?: (value: string) => void;
  schema?: Record<string, string[]>;
  defaultValue?: string;
}

export default function SQLEditor({ onSubmit, onHint, schema, disabled, defaultValue }: SQLEditorProps) {
  const codeMirrorRef = useRef<ReactCodeMirrorRef>(null);

  const handleSubmit = () => {
    onSubmit?.(codeMirrorRef.current?.view?.state.doc.toString() ?? "");
  };

  const handleHint = () => {
    onHint?.(codeMirrorRef.current?.view?.state.doc.toString() ?? "");
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
          }),
        ]}
      />

      <div className="flex justify-between">
        <Button variant="outline" size="sm" onClick={handleHint} disabled={disabled}>
          <Lightbulb />
          提示
        </Button>

        <Button size="sm" onClick={handleSubmit} disabled={disabled}>
          <Play />
          送出
        </Button>
      </div>
    </div>
  );
}
