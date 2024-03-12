"use client"

import { basicData } from '@/interfaces/forms'
import React from 'react'

export const BasicData = ({handleInputChange, data:{nombre, apellido, email}, next}:basicData) => {
  return (
    <form className="flex flex-col gap-4 outline-2 outline-white dark:bg-virtec-blue-light bg-virtec-blue-dark p-16 rounded-lg w-[400px] sm:w-[500px]">
          <h1 className='text-center text-xl text-white'>Datos Básicos</h1>
          <label
            htmlFor="Nombre"
            className="virtecFont flex flex-col gap-1.5 text-white text-sm"
          >
            Nombre
            <input
              className="rounded-lg p-2 placeholder:text-white outline-2 outline outline-white bg-transparent"
              type="Nombre"
              id="Nombre"
              name='nombre'
              placeholder="Introduzca su nombre"
              onChange={handleInputChange}
              value={nombre}
            />
          </label>
          <label
            htmlFor="apellido"
            className="virtecFont flex flex-col gap-1.5 text-white text-sm"
          >
            Apellido
            <input
              className="rounded-lg p-2 placeholder:text-white outline-2 outline outline-white bg-transparent"
              type="apellido"
              id="apellido"
              name='apellido'
              placeholder="Introduzca su apellido"
              onChange={handleInputChange}
              value={apellido}
            />
          </label>
          <label htmlFor="email" className="virtecFont flex flex-col gap-1.5 text-white text-sm">
            Email 
            <input 
              className="rounded-lg p-2 placeholder:text-white outline-2 outline outline-white bg-transparent"
              type="email"
              id="email"
              name='email'
              placeholder="Introduzca su email"
              value={email}
              onChange={handleInputChange}
            />
          </label>
          <button onClick={next} className="rounded-lg bg-virtec-orange hover:bg-transparent hover:outline hover:outline-2 hover:outline-virtec-orange duration-500 p-2" type='button'>
            <span className="virtecFont text-white">Siguiente</span>
          </button>
        </form>
  )
}
