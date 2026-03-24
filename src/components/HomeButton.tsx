import Link from "next/link"
import Image from "next/image"

export default function HomeButton(){
  return (
    <div className="fixed top-6 right-6 z-50">
      <Link href="/">
        <div className="px-3 py-2 bg-white/20 backdrop-blur-md rounded-lg hover:bg-white/30 transition">
          <Image
            src="/img/homeicon.png"
            alt="Home"
            width={30}
            height={30}
          />
        </div>
      </Link>
    </div>
  )
}