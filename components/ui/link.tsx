import Link from "next/link";

export function StyledLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link href={href} className={`
      text-blue-500
      hover:underline
    `}>
      {children}
    </Link>
  )
}
