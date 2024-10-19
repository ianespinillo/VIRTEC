'use strict';

var chunkTL4KOMSN_js = require('../../chunk-TL4KOMSN.js');
var chunk3OZBDNRM_js = require('../../chunk-3OZBDNRM.js');
var reactSlot = require('@radix-ui/react-slot');
var e = require('react');
var reactHookForm = require('react-hook-form');

function _interopNamespace(e) {
	if (e && e.__esModule) return e;
	var n = Object.create(null);
	if (e) {
		Object.keys(e).forEach(function (k) {
			if (k !== 'default') {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () { return e[k]; }
				});
			}
		});
	}
	n.default = e;
	return Object.freeze(n);
}

var e__namespace = /*#__PURE__*/_interopNamespace(e);

var b=reactHookForm.FormProvider,c=e__namespace.createContext({}),N=({...t})=>e__namespace.createElement(c.Provider,{value:{name:t.name}},e__namespace.createElement(reactHookForm.Controller,{...t})),l=()=>{let t=e__namespace.useContext(c),o=e__namespace.useContext(F),{getFieldState:r,formState:a}=reactHookForm.useFormContext(),m=r(t.name,a);if(!t)throw new Error("useFormField should be used within <FormField>");let{id:i}=o;return {id:i,name:t.name,formItemId:`${i}-form-item`,formDescriptionId:`${i}-form-item-description`,formMessageId:`${i}-form-item-message`,...m}},F=e__namespace.createContext({}),x=e__namespace.forwardRef(({className:t,...o},r)=>{let a=e__namespace.useId();return e__namespace.createElement(F.Provider,{value:{id:a}},e__namespace.createElement("div",{ref:r,className:chunk3OZBDNRM_js.a("space-y-2",t),...o}))});x.displayName="FormItem";var C=e__namespace.forwardRef(({className:t,...o},r)=>{let{error:a,formItemId:m}=l();return e__namespace.createElement(chunkTL4KOMSN_js.a,{ref:r,className:chunk3OZBDNRM_js.a(a&&"text-destructive",t),htmlFor:m,...o})});C.displayName="FormLabel";var P=e__namespace.forwardRef(({...t},o)=>{let{error:r,formItemId:a,formDescriptionId:m,formMessageId:i}=l();return e__namespace.createElement(reactSlot.Slot,{ref:o,id:a,"aria-describedby":r?`${m} ${i}`:`${m}`,"aria-invalid":!!r,...t})});P.displayName="FormControl";var I=e__namespace.forwardRef(({className:t,...o},r)=>{let{formDescriptionId:a}=l();return e__namespace.createElement("p",{ref:r,id:a,className:chunk3OZBDNRM_js.a("text-sm text-muted-foreground",t),...o})});I.displayName="FormDescription";var T=e__namespace.forwardRef(({className:t,children:o,...r},a)=>{let{error:m,formMessageId:i}=l(),n=m?String(m?.message):o;return n?e__namespace.createElement("p",{ref:a,id:i,className:chunk3OZBDNRM_js.a("text-sm font-medium text-destructive",t),...r},n):null});T.displayName="FormMessage";

exports.Form = b;
exports.FormControl = P;
exports.FormDescription = I;
exports.FormField = N;
exports.FormItem = x;
exports.FormLabel = C;
exports.FormMessage = T;
exports.useFormField = l;
