import { cn } from "@/lib/utils"
import Link from "next/link"
import { ReactNode } from "react"

export const ChatButton = (
    {
        className,
        children

    }: {
        className?: string
        children?: ReactNode
    }
) => {
  return (
    <Link href="/">
      <div className={cn("h-[60px] w-[60px] rounded-full border-2 border-solid border-black bg-green-500", className)} >
          {children}
      </div>
    </Link>
  )
}
