import Image, { type ImageProps } from "next/image";

export interface LogoProps extends Omit<ImageProps, "src" | "alt" | "width" | "height"> {}

export function Logo(props: LogoProps) {
  return <Image src="https://assets.dbplay.app/logo.svg" alt="Database Playground Logo" width={16} height={16} {...props} />;
}

export function LogoText() {
  return (
    <div className="flex items-center gap-2 select-none">
      <Logo />
      <div>Database Playground</div>
    </div>
  )
}