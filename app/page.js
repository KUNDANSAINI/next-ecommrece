'use client'

import Navbar from "@/app/component/Navbar";
import { GlobalContext } from "@/context";
import { useContext } from "react";

export default function Home() {

  const {isLogin} = useContext(GlobalContext)

  return (
    <>
    <div>
      <Navbar />
      <h1>Home</h1>
    </div>
    </>
  );
}
