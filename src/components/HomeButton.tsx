import Link from "next/link"

export default function HomeButton(){
  return (
    <div className="fixed top-6 left-6 z-50">
      <Link href="/">
        <div className="px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-lg">
          ← Home
        </div>
      </Link>
    </div>
  )
}