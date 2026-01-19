import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen py-10 px-5 flex flex-wrap justify-center items-center text-center">
      <div className="space-y-4">
        <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">Page Not Found</h1>
        <p>We didn't find what you were looking for.</p>
        <Link href={'/'}>
          <Button>Back to Home</Button>
        </Link>
      </div>
    </section>
  )
}