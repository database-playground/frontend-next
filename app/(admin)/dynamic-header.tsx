"use client"

import { SiteHeader } from "@/components/site-header"
import { usePathname } from "next/navigation"

// The closest route should be listed last
const routes = [
    {
        pathPrefix: "/",
        title: "首頁",
    },
    {
        pathPrefix: "/me",
        title: "個人資訊",
    },
].reverse()
  
export function DynamicHeader() {
  const pathname = usePathname()
  const route = routes.find((route) => pathname.startsWith(route.pathPrefix))
  return <SiteHeader title={route?.title ?? "管理介面"} />
}