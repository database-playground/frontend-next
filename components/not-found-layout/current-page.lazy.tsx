"use client";

import dynamic from "next/dynamic";
import CurrentPage from "./current-page";

export const CurrentPageLazy = dynamic(() => Promise.resolve(CurrentPage), {
  ssr: false,
});
