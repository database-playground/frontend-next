import { Suspense } from "react";
import CompletedQuestionsPercentage from "./completed-questions";

export default function Board() {
  return (
    <section
      className={`
        relative mb-6 flex h-42 w-full items-end justify-between rounded
        bg-primary/20 px-6 py-4
      `}
    >
      <div className="flex flex-col gap-2">
        <p className="tracking-widest text-muted-foreground uppercase">
          Welcome to Database Playground
        </p>
        <h1 className="text-xl font-bold tracking-wide">
          歡迎使用「資料庫練功坊」！🎉
          <br />
          試試看到「挑戰題目」中，開始挑戰 SQL 題目！
        </h1>
      </div>

      <Suspense>
        <div className="flex flex-col items-end leading-none">
          <p className="text-sm text-muted-foreground">完成題數</p>
          <p className="text-xl font-bold">
            <CompletedQuestionsPercentage />
          </p>
        </div>
      </Suspense>

      <div className="absolute top-4 right-6 text-6xl opacity-25 select-none">
        🥳
      </div>
    </section>
  );
}
