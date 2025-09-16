import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-svh items-center justify-center">
      Working in Progress

      <Link className="text-blue-500 underline" href="/api/auth/logout" prefetch={false}>Logout</Link>
    </div>
  );
}
