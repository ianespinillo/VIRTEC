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

var F=()=>{let{register:o,handleSubmit:n,formState:{errors:m}}=reactHookForm.useForm({resolver:classValidator.classValidatorResolver(common.LoginEmailDTO)}),[i,t]=s.useState(null),{loginWithEmail:p}=hooks.useProfile(),d=n(async u=>{let e=await p(u);console.log(e),e?.message&&(t(e.message),setTimeout(()=>{t(null);},2e3));});return s__default.default.createElement("form",{onSubmit:d},i&&s__default.default.createElement("div",{className:"flex items-center justify-center rounded-md bg-red-500 px-4 py-3 text-white"},i),s__default.default.createElement("div",{className:"space-y-4"},s__default.default.createElement("div",{className:"space-y-2"},s__default.default.createElement(reactLabel.Label,{htmlFor:"email"},"Email"),s__default.default.createElement(chunkBOAXP74G_js.a,{id:"email",type:"email",placeholder:"Ingrese su e-mail",...o("email")}),s__default.default.createElement("p",{className:"text-red-500 text-sm"},m.email?.message)),s__default.default.createElement("div",{className:"space-y-2"},s__default.default.createElement(reactLabel.Label,{htmlFor:"password"},"Password"),s__default.default.createElement(chunkBOAXP74G_js.a,{id:"password",type:"password",placeholder:"Ingrese su contrase\xF1a",...o("password")}),s__default.default.createElement("p",{className:"text-red-500 text-sm"},m.password?.message))),s__default.default.createElement(chunkGF6AHBWK_js.b,{type:"submit",className:"w-full mt-6"},"Iniciar sesi\xF3n"))};

exports.a = F;
