import { LoaderCircle } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
      <LoaderCircle className="w-12 h-12 text-white animate-spin" />
    </div>
  )
}