import Link from "next/link";

export default function App() {
  return (
    <div>
      <p>WIP</p>
      <Link prefetch={false} href="/api/auth/logout">
        Logout
      </Link>
    </div>
  );
}
