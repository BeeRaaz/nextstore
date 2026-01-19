"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GlobalErrorPage() {
  return (
    <section className="min-h-screen py-10 px-5 flex flex-wrap justify-center items-center text-center">
      <div className="space-y-4">
        <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">Some Error occured.</h1>
        <Link href={'/'}>
          <Button>Back to Home</Button>
        </Link>
      </div>
    </section>
  )
}