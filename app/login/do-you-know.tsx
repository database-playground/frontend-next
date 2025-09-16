import { connection } from "next/server";

export default async function DoYouKnow() {
  await connection();

  const knowsList = [
    <p key="do-you-knows-daily-login">
      每天登入可以獲得 20 點點數，<br />連續 7 天登入可以獲得 50 點加成！
    </p>,
    <p key="do-you-knows-share-experience">
      分享練習經驗可以一次性獲得 50 點點數，<br />分享經驗越多，獲得點數越多！
    </p>,
    <p key="do-you-knows-first-to-complete">
      試試看搶先在所有人之前完成題目：<br />先行者可以獲得 50 點點數！
    </p>,
    <p key="do-you-knows-wrong-no-penalty">
      寫錯不會扣點數，錯誤次數也不會列入排名<br />可以盡量在平台上練習！
    </p>
  ];

  const randomKnow = knowsList[Math.floor(Math.random() * knowsList.length)];
  return (
    <div className="flex flex-col gap-3">
      <div className="text-sm text-gray-500">DO YOU KNOW?</div>
      <div className="text-lg leading-6 font-normal">{randomKnow}</div>
    </div>
  );
}
