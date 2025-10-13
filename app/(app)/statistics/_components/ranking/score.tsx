export function ScoreDiff({ score }: { score: number }) {
  if (score > 0) {
    return <span className="text-green-800">+{score}</span>;
  }

  if (score < 0) {
    return <span className="text-red-800">-{Math.abs(score)}</span>;
  }

  return <span className="text-gray-800">無變化</span>;
}
