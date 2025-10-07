import ForbiddenLayout from "@/components/forbidden-layout/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "帳號尚未開通",
};

export default function ForbiddenPage() {
  return <ForbiddenLayout />;
}
