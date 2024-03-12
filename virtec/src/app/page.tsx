import { Metadata } from "next";
import Image from "next/image";

export default function Home() {
  return (
    <h1>Bienvenido a VIRTEC</h1>
  );
}

export const metadata: Metadata = {
  title: {
    absolute: "VIRTEC"
  },
  description: "Herramienta de automatización de escuelas técnicas",
  icons:{
    icon: "/virtec.ico"
  }
};