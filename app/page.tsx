import { LogoText } from "@/components/logo";
import { Loader } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center gap-4">
      <LogoText />
      <Loader className="animate-spin" />
    </div>
  );
}
