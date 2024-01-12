"use client";

import About from "@/components/layouts/About";
import Blogs from "@/components/layouts/Blogs";
import Contact from "@/components/layouts/Contact";
import Hero from "@/components/layouts/Hero";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {

  const session = useSession();
  const { status } = session;

  if (status === "loading") {
    return "Loading...";
  }

  if (status === "authenticated") {
    return redirect("/dashboard");
  }

  return (
    <>
      <Hero />
      <Blogs />
      <About />
      <Contact />
    </>
  )
}
