import { privateData } from "@/interfaces/forms";
import React from "react";

export const PrivateData = ({
  handleInputChange,
  next,
  previous,
  data: { confirmPassword, password, dni },
}: privateData) => {
  return (
    <form className="flex flex-col gap-4  outline-2 outline-white dark:bg-virtec-blue-light bg-virtec-blue-dark p-16 rounded-lg w-[400px] sm:w-[500px]">
      <h1 className="virtecFont text-center text-xl text-white">
        Información Privada
      </h1>
      <label
        htmlFor="email"
        className="virtecFont flex flex-col gap-1.5 text-white text-sm"
      >
        Contraseña
        <input
          className="rounded-lg p-2 placeholder:text-white outline-2 outline outline-white bg-transparent"
          type="password"
          id="password"
          name="password"
          placeholder="Introduzca su contraseña"
          onChange={handleInputChange}
          value={password}
        />
      </label>
      <label
        htmlFor="confirmpassword"
        className="virtecFont flex flex-col gap-1.5 text-white text-sm"
      >
        Confirmar contraseña
        <input
          className="rounded-lg p-2 placeholder:text-white outline-2 outline outline-white bg-transparent"
          type="password"
          id="confirmpassword"
          placeholder="Introduzca nuevamente su contraseña"
          name="confirmPassword"
          onChange={handleInputChange}
          value={confirmPassword}
        />
      </label>
      <label htmlFor="dni" className="virtecFont flex flex-col gap-1.5 text-white text-sm">
        DNI
        <input
          className="rounded-lg p-2 placeholder:text-white outline-2 outline outline-white bg-transparent"
          type="number"
          id="dni"
          placeholder="Introduzca su DNI"
          name="dni"
          onChange={handleInputChange}
          value={dni}
        />
      </label>
      <div className="flex justify-between w-full">
        <button
          onClick={previous}
          className="rounded-lg bg-virtec-orange hover:bg-transparent hover:outline hover:outline-2 hover:outline-virtec-orange duration-500 p-2 w-[35%] text-center"
        >
          <span className="virtecFont text-white">Atrás</span>
        </button>
        <button
          onClick={next}
          className="rounded-lg bg-virtec-orange hover:bg-transparent hover:outline hover:outline-2 hover:outline-virtec-orange duration-500 p-2 w-[35%] text-center"
        >
          <span className="virtecFont text-white">Siguiente</span>
        </button>
      </div>
    </form>
  );
};
