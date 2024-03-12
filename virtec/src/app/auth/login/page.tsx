"use client";
import { login } from "@/lib/auth/actions";
import React from "react";

export default function page() {
  async function formAction(formData: FormData) {
    const res = await login(formData);
    console.log(res)
  }
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex items-center justify-center" data-v0-t="card">
        <form
          action={formAction}
          className="flex flex-col gap-4  outline-2 outline-white dark:bg-virtec-blue-light bg-virtec-blue-dark p-16 rounded-lg scale-150"
        >
          <h1 className=" write virtecFont flex flex-col gap-0.5 text-white text-xl">
            Inicia sesion con tu cuenta
          </h1>
          <label
            htmlFor="email"
            className="virtecFont flex flex-col gap-1.5 text-white text-sm"
          >
            Email o DNI
            <input
              className="rounded-lg p-2 placeholder:text-white outline-2 outline outline-white bg-transparent"
              type="text"
              id="email"
              name="emailOrDni"
              placeholder="Loguese con su e-mail o DNI"
            />
            <span>Recomendamos iniciar sesion con el DNI*</span>
          </label>
          <label
            htmlFor="password"
            className="virtecFont flex flex-col gap-1.5 text-white text-sm"
          >
            Contraseña
            <input
              className="rounded-lg p-2 placeholder:text-white outline-2 outline outline-white bg-transparent"
              type="password"
              id="password"
              name="password"
              placeholder="Introduzca su contraseña"
            />
          </label>
          <button
            className="rounded-lg bg-virtec-orange hover:bg-transparent hover:outline hover:outline-2 hover:outline-virtec-orange duration-500 p-2"
            type="submit"
          >
            <span className="virtecFont text-white">Iniciar Sesion</span>
          </button>
        </form>
      </div>
    </div>
  );
}
