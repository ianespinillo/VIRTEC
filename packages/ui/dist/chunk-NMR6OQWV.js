'use strict';

var chunkBOAXP74G_js = require('./chunk-BOAXP74G.js');
var chunkGF6AHBWK_js = require('./chunk-GF6AHBWK.js');
var classValidator = require('@hookform/resolvers/class-validator');
var reactLabel = require('@radix-ui/react-label');
var common = require('@repo/common');
var hooks = require('@repo/hooks');
var s = require('react');
var reactHookForm = require('react-hook-form');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var s__default = /*#__PURE__*/_interopDefault(s);

var S=()=>{let{register:o,handleSubmit:l,formState:{errors:i}}=reactHookForm.useForm({resolver:classValidator.classValidatorResolver(common.LoginDniDTO)}),[t,m]=s.useState(null),{loginWithDni:d}=hooks.useProfile(),p=l(async u=>{let r=await d(u);console.log(r),r?.message&&(m(r.message),setTimeout(()=>{m(null);},2e3));});return s__default.default.createElement("form",{onSubmit:p},t&&s__default.default.createElement("div",{className:"flex items-center justify-center rounded-md bg-red-500 px-4 py-3 text-white"},s__default.default.createElement("p",null,t)),s__default.default.createElement("div",{className:"space-y-4"},s__default.default.createElement("div",{className:"space-y-2"},s__default.default.createElement(reactLabel.Label,{htmlFor:"dni"},"DNI"),s__default.default.createElement(chunkBOAXP74G_js.a,{id:"dni",type:"text",placeholder:"Ingrese su DNI",...o("dni")}),s__default.default.createElement("p",{className:"text-red-500 text-sm"},i.dni?.message)),s__default.default.createElement("div",{className:"space-y-2"},s__default.default.createElement(reactLabel.Label,{htmlFor:"password-dni"},"Password"),s__default.default.createElement(chunkBOAXP74G_js.a,{id:"password-dni",type:"password",placeholder:"Ingrese su contrase\xF1a",...o("password")}),s__default.default.createElement("p",{className:"text-red-500 text-sm"},i.password?.message))),s__default.default.createElement(chunkGF6AHBWK_js.b,{type:"submit",className:"w-full mt-6"},"Iniciar sesi\xF3n"))};

exports.a = S;
