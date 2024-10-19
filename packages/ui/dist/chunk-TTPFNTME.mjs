import { a } from './chunk-FDRPVQBE.mjs';
import { b } from './chunk-OT53SFLF.mjs';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Label } from '@radix-ui/react-label';
import { LoginEmailDTO } from '@repo/common';
import { useProfile } from '@repo/hooks';
import s, { useState } from 'react';
import { useForm } from 'react-hook-form';

var F=()=>{let{register:o,handleSubmit:n,formState:{errors:m}}=useForm({resolver:classValidatorResolver(LoginEmailDTO)}),[i,t]=useState(null),{loginWithEmail:p}=useProfile(),d=n(async u=>{let e=await p(u);console.log(e),e?.message&&(t(e.message),setTimeout(()=>{t(null);},2e3));});return s.createElement("form",{onSubmit:d},i&&s.createElement("div",{className:"flex items-center justify-center rounded-md bg-red-500 px-4 py-3 text-white"},i),s.createElement("div",{className:"space-y-4"},s.createElement("div",{className:"space-y-2"},s.createElement(Label,{htmlFor:"email"},"Email"),s.createElement(a,{id:"email",type:"email",placeholder:"Ingrese su e-mail",...o("email")}),s.createElement("p",{className:"text-red-500 text-sm"},m.email?.message)),s.createElement("div",{className:"space-y-2"},s.createElement(Label,{htmlFor:"password"},"Password"),s.createElement(a,{id:"password",type:"password",placeholder:"Ingrese su contrase\xF1a",...o("password")}),s.createElement("p",{className:"text-red-500 text-sm"},m.password?.message))),s.createElement(b,{type:"submit",className:"w-full mt-6"},"Iniciar sesi\xF3n"))};

export { F as a };
