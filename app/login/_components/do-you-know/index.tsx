"use server";

import { connection } from "next/server";

export default async function DoYouKnow() {
  await connection();

  const randomKnow = await getDoYouKnow();

  return (
    <div className="flex flex-col justify-center gap-2 text-center">
      <div className="text-sm text-gray-500">你知道嗎？</div>
      <div className="font-normal">{randomKnow}</div>
    </div>
  );
}

export async function getDoYouKnow() {
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
    </p>,
    <p key="do-you-knows-chat-with-ai-assistant">
      寫題目卡關了？可以試試看點右下角的「AI 助手」<br />讓 AI 助教幫你解答
    </p>,
    <p key="do-you-knows-discord-community">
      歡迎加入練功坊的 Discord 社群，<br />與開發者和其他使用者直接交流！
    </p>,
    <p key="do-you-knows-github-contribution">
      向 GitHub 貢獻程式碼，每次都能<br />直接獲得 200 - 700 點不等的點數！
    </p>,
  ];

  const randomKnow = knowsList[Math.floor(Math.random() * knowsList.length)];

  return randomKnow;
}
