"use client";

import React from "react";
import Select, { components } from "react-select";
import { schoolData } from "@/interfaces/forms";
import { division, especialidades, turnos, years } from "@/app/data/staticData";
import { register } from "@/lib/auth/actions";


export const SchoolData = ({
  handleSelectChange,
  previous,
  formValues,
}: schoolData) => {
  const formAction = async (formData: FormData) => {
    const res = await register(formValues);
    if (res.error) {
      console.log(res.error);
    } 
    
  };
  return (
    <form
      action={formAction}
      className="flex flex-col gap-4  outline-2 outline-white dark:bg-virtec-blue-light bg-virtec-blue-dark p-16 rounded-lg w-[400px] sm:w-[550px]"
    >
      <h1 className="virtecFont text-center text-xl text-white">
        Información de la escuela
      </h1>
      <label
        htmlFor="email"
        className="virtecFont flex flex-col gap-1.5 text-white text-sm"
      >
        Selecciona tu año
        <Select
          placeholder="Selecciona tu año, ej: 4°"
          styles={{
            control: (base, isFocused) => ({
              ...base,
              borderColor: isFocused ? "white" : "white",
              backgroundColor: "transparent",
              font: "Helvetica Neue",
            }),
            option: (base) => ({
              ...base,
              backgroundColor: "transparent",
            }),
            dropdownIndicator(base, props) {
              return {
                color: "#6AB0E7",
                padding: "2px",
              };
            },
            indicatorSeparator: () => ({
              display: "none",
            }),
            menuList(base, props) {
              return {
                ...base,
                backgroundColor: "#6AB0E7",
                borderRadius: "4px",
              };
            },
            singleValue: (base) => ({
              ...base,
              color: "white",
            }),
            placeholder: (base) => ({
              ...base,
              color: "white",
            }),
          }}
          options={years}
          onChange={(e) => e?.value && handleSelectChange(e?.value, "year")}
        />
      </label>
      <label
        htmlFor="division"
        className="virtecFont flex flex-col gap-1.5 text-white text-sm"
      >
        <span className="flex">
          Selecciona tu division (1°
          <span className="text-red-500 font-bold">1°</span>)
        </span>
        <Select
          placeholder="Seleccione su division"
          styles={{
            control: (base, isFocused) => ({
              ...base,
              borderColor: isFocused ? "white" : "white",
              backgroundColor: "transparent",
            }),
            option: (base) => ({
              ...base,
              backgroundColor: "transparent",
              color: "white",
            }),
            dropdownIndicator(base, props) {
              return {
                color: "#6AB0E7",
                padding: "2px",
              };
            },
            indicatorSeparator: () => ({
              display: "none",
            }),
            menuList(base, props) {
              return {
                ...base,
                backgroundColor: "#6AB0E7",
                borderRadius: "4px",
              };
            },
            singleValue: (base) => ({
              ...base,
              color: "white",
            }),
            placeholder: (base) => ({
              ...base,
              color: "white",
            }),
          }}
          onChange={(e) => e?.value && handleSelectChange(e?.value, "division")}
          options={division}
        />
      </label>
      <label
        htmlFor="especialidad"
        className="virtecFont flex flex-col gap-1.5 text-white text-sm"
      >
        Especialidad
        <Select
          placeholder="Seleccione su especialidad"
          isSearchable={false}
          styles={{
            control: (base, isFocused) => ({
              ...base,
              borderColor: isFocused ? "white" : "white",
              backgroundColor: "transparent",
            }),
            option: (base) => ({
              ...base,
              display: "flex",
              gap: "12px",
              color: "white",
              backgroundColor: "transparent",
            }),
            dropdownIndicator(base, props) {
              return {
                color: "#6AB0E7",
                padding: "2px",
              };
            },
            indicatorSeparator: () => ({
              display: "none",
            }),

            menuList(base, props) {
              return {
                ...base,
                backgroundColor: "#6AB0E7",
                borderRadius: "4px",
              };
            },
            singleValue: (base) => ({
              ...base,
              color: "white",
              display: "flex",
              gap: "12px",
              alignItems: "center",
            }),
            placeholder: (base) => ({
              ...base,
              color: "white",
            }),
          }}
          options={especialidades}
          components={{
            Option: (props) => (
              <components.Option {...props} className="flex">
                <img
                  src={props.data.Icon}
                  alt={props.data.label}
                  className="w-6"
                />
                {props.data.label}
              </components.Option>
            ),
            SingleValue: (props) => (
              <components.SingleValue {...props}>
                <img
                  src={props.data.Icon}
                  alt={props.data.label}
                  className="w-6 "
                />
                {props.data.label}
              </components.SingleValue>
            ),
          }}
          onChange={(e) =>
            e?.value && handleSelectChange(e?.value, "especialidad")
          }
        />
      </label>
      <label
        htmlFor="comision"
        className="virtecFont flex flex-col gap-1.5 text-white text-sm"
      >
        Selecciona tu comisión (1° o 2°)
        <Select
          placeholder="Seleccione su comision"
          styles={{
            control: (base, isFocused) => ({
              ...base,
              borderColor: isFocused ? "white" : "white",
              backgroundColor: "transparent",
            }),
            option: (base) => ({
              ...base,
              backgroundColor: "transparent",
              color: "white",
            }),
            dropdownIndicator(base, props) {
              return {
                color: "#6AB0E7",
                padding: "2px",
              };
            },
            indicatorSeparator: () => ({
              display: "none",
            }),
            menuList(base, props) {
              return {
                ...base,
                backgroundColor: "#6AB0E7",
                borderRadius: "4px",
              };
            },
            singleValue: (base) => ({
              ...base,
              color: "white",
            }),
            placeholder: (base) => ({
              ...base,
              color: "white",
            }),
          }}
          options={[
            {
              label: "1°",
              value: 1,
            },
            {
              label: "2°",
              value: 2,
            },
          ]}
          onChange={(e) => e?.value && handleSelectChange(e?.value, "comision")}
        />
      </label>
      <label
        htmlFor="turno"
        className="virtecFont flex flex-col gap-1.5 text-white text-sm"
      >
        Turno
        <Select
          placeholder="Selecciona el turno donde cursa teória"
          styles={{
            control: (base, isFocused) => ({
              ...base,
              borderColor: isFocused ? "white" : "white",
              backgroundColor: "transparent",
            }),
            option: (base) => ({
              ...base,
              backgroundColor: "transparent",
              color: "white",
            }),
            dropdownIndicator(base, props) {
              return {
                color: "#6AB0E7",
                padding: "2px",
              };
            },
            indicatorSeparator: () => ({
              display: "none",
            }),
            menuList(base, props) {
              return {
                ...base,
                backgroundColor: "#6AB0E7",
                borderRadius: "4px",
              };
            },
            singleValue: (base) => ({
              ...base,
              color: "white",
            }),
            placeholder: (base) => ({
              ...base,
              color: "white",
            }),
          }}
          options={turnos}
          onChange={(e) => handleSelectChange(String(e?.value), "turno")}
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
          type="submit"
          className="rounded-lg bg-virtec-orange hover:bg-transparent hover:outline hover:outline-2 hover:outline-virtec-orange duration-500 p-2 w-[35%] text-center"
        >
          <span className="virtecFont text-white">Crear cuenta</span>
        </button>
      </div>
    </form>
  );
};
