import { a } from './chunk-FDRPVQBE.mjs';
import { b } from './chunk-OT53SFLF.mjs';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Label } from '@radix-ui/react-label';
import { LoginDniDTO } from '@repo/common';
import { useProfile } from '@repo/hooks';
import s, { useState } from 'react';
import { useForm } from 'react-hook-form';

var S=()=>{let{register:o,handleSubmit:l,formState:{errors:i}}=useForm({resolver:classValidatorResolver(LoginDniDTO)}),[t,m]=useState(null),{loginWithDni:d}=useProfile(),p=l(async u=>{let r=await d(u);console.log(r),r?.message&&(m(r.message),setTimeout(()=>{m(null);},2e3));});return s.createElement("form",{onSubmit:p},t&&s.createElement("div",{className:"flex items-center justify-center rounded-md bg-red-500 px-4 py-3 text-white"},s.createElement("p",null,t)),s.createElement("div",{className:"space-y-4"},s.createElement("div",{className:"space-y-2"},s.createElement(Label,{htmlFor:"dni"},"DNI"),s.createElement(a,{id:"dni",type:"text",placeholder:"Ingrese su DNI",...o("dni")}),s.createElement("p",{className:"text-red-500 text-sm"},i.dni?.message)),s.createElement("div",{className:"space-y-2"},s.createElement(Label,{htmlFor:"password-dni"},"Password"),s.createElement(a,{id:"password-dni",type:"password",placeholder:"Ingrese su contrase\xF1a",...o("password")}),s.createElement("p",{className:"text-red-500 text-sm"},i.password?.message))),s.createElement(b,{type:"submit",className:"w-full mt-6"},"Iniciar sesi\xF3n"))};

export { S as a };
