"use client";
import Image from "next/image";
import * as logo from "../../public/next.svg";
export default function Logo({ height = 100, width = 100 }) {
  return <Image src={logo} height={height} width={width} alt="logo"></Image>;
}
