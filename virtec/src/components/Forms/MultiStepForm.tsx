"use client";
import { useForm } from "@/hooks/useForm";
import React from "react";
import { BasicData } from "./Mini-forms/BasicData";
import { PrivateData } from "./Mini-forms/PrivateData";
import { SchoolData } from "./Mini-forms/SchoolData";

const initValues = {
  nombre: "",
  apellido: "",
  email: "",
  password: "",
  confirmPassword: "",
  dni: "",
  year: 0,
  division: 0,
  comision: 0,
  especialidad: "",
  rol: "",
  escuela:"",
  turno: "",
};
export const MultiStepForm = ({
  actualForm,
  setActualForm,
}: {
  actualForm: number;
  setActualForm: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { handleInputChange, handleSelectChange, formValues } =
    useForm(initValues);

  switch (actualForm) {
    case 1:
      return (
        <BasicData
          handleInputChange={handleInputChange}
          data={{
            nombre: formValues?.nombre,
            apellido: formValues?.apellido,
            email: formValues?.email,
          }}
          next={() => setActualForm((prev) => prev + 1)}
        />
      );
    case 2:
      return (
          <PrivateData 
            handleInputChange={handleInputChange}
            next={()=>setActualForm((prev) => prev + 1)}
            previous={()=>setActualForm((prev) => Math.min(prev - 1, 1))}
            data={{
              confirmPassword: formValues?.confirmPassword,
              password: formValues?.password,
              dni: formValues?.dni
            }}
          />
      )
    case 3:
        return (
            <SchoolData 
              handleSelectChange={handleSelectChange}
              previous={()=>setActualForm((prev) => Math.max(prev - 1, 1))}
              
              formValues={formValues}
            />
        )
    default:
      break;
  }
};
