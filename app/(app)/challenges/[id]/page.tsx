import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "挑戰題目",
};

export default function ChallengePage({ params }: { params: { id: string } }) {
  return <div>ChallengePage</div>;
}
