"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Bot, Loader2, Send, Sparkles, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Streamdown } from "streamdown";

export interface AIAssistantProps {
  questionId: string;
}

export function AIAssistant({ questionId }: AIAssistantProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: {
        questionId,
      },
      credentials: "include",
    }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");

    await sendMessage({
      role: "user",
      parts: [{ type: "text", text: userMessage }],
    });
  };

  const quickActions = [
    {
      label: "分析我的答案",
      prompt: "請幫我分析我提交的答案，告訴我哪裡有問題",
    },
    {
      label: "比較答案差異",
      prompt: "請比較我的答案和正確答案，告訴我有什麼不同",
    },
    {
      label: "給我提示",
      prompt: "請給我一些提示，幫助我改進我的 SQL 查詢",
    },
    {
      label: "解釋題目",
      prompt: "請解釋這個題目在問什麼，我應該注意什麼",
    },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={`
            fixed right-6 bottom-6 z-50 h-14 w-14 rounded-full shadow-lg
            transition-all
            hover:scale-110
          `}
        >
          <Sparkles className="h-6 w-6" />
          <span className="sr-only">開啟 AI 助理</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        className={`
          flex w-full flex-col gap-0 p-0
          sm:max-w-md
        `}
      >
        <SheetHeader className="border-b p-4">
          <SheetTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            SQL 學習助理
          </SheetTitle>
          <SheetDescription>
            我可以幫助你理解題目、分析答案錯誤、提供學習建議
          </SheetDescription>
        </SheetHeader>

        {/* Messages Area */}
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.length === 0 && (
            <div className="space-y-4">
              <div className="rounded-lg border bg-muted/50 p-4">
                <p className="text-sm text-muted-foreground">
                  👋 你好！我是你的 SQL 學習助理。你可以問我關於這個題目的任何問題，或者使用下面的快速操作。
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">
                  快速操作
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {quickActions.map((action) => (
                    <Button
                      key={action.label}
                      variant="outline"
                      size="sm"
                      className="h-auto justify-start text-left"
                      onClick={() => {
                        sendMessage({
                          role: "user",
                          parts: [{ type: "text", text: action.prompt }],
                        });
                      }}
                      disabled={isLoading}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`
                flex gap-3
                ${message.role === "user" ? "justify-end" : "justify-start"}
              `}
            >
              {message.role === "assistant" && (
                <div
                  className={`
                    flex h-8 w-8 shrink-0 items-center justify-center
                    rounded-full bg-primary
                  `}
                >
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
              )}

              <div
                className={`
                  max-w-[80%] space-y-2 rounded-lg px-4 py-2
                  ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }
                `}
              >
                {message.parts.map((part, index) => {
                  if (part.type === "text") {
                    return (
                      <div
                        key={`${message.id}-text-${index}`}
                        className="text-sm leading-relaxed whitespace-pre-wrap"
                      >
                        <Streamdown>
                          {part.text}
                        </Streamdown>
                      </div>
                    );
                  }

                  if (part.type.startsWith("tool-")) {
                    return (
                      <div
                        key={`${message.id}-tool-${index}`}
                        className="text-xs text-muted-foreground"
                      >
                        🔧 已執行: {getToolName(part.type.replace("tool-", ""))}
                      </div>
                    );
                  }

                  return null;
                })}
              </div>

              {message.role === "user" && (
                <div
                  className={`
                    flex h-8 w-8 shrink-0 items-center justify-center
                    rounded-full bg-secondary
                  `}
                >
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex gap-3">
              <div
                className={`
                  flex h-8 w-8 shrink-0 items-center justify-center rounded-full
                  bg-primary
                `}
              >
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div
                className={`
                  flex items-center gap-2 rounded-lg bg-muted px-4 py-2
                `}
              >
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm text-muted-foreground">思考中…</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form
          onSubmit={handleSubmit}
          className="border-t bg-background p-4"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="輸入你的問題……"
              className={`
                flex-1 rounded-lg border bg-background px-4 py-2 text-sm
                transition-colors
                placeholder:text-muted-foreground
                focus:ring-2 focus:ring-ring focus:outline-hidden
                disabled:cursor-not-allowed disabled:opacity-50
              `}
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                <Send
                  className={`h-4 w-4`}
                />
              )}
              <span className="sr-only">送出訊息</span>
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}

function getToolName(toolName: string): string {
  const toolNames: Record<string, string> = {
    getQuestionSchema: "確認題目 schema",
    getMyAnswer: "確認使用者提交的答案",
    getCorrectAnswer: "確認正確答案",
  };

  return toolNames[toolName] || toolName;
}
