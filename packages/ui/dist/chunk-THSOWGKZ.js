'use strict';

var chunk3OZBDNRM_js = require('./chunk-3OZBDNRM.js');
var e = require('react');

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

var s=e__namespace.forwardRef(({className:t,...a},r)=>e__namespace.createElement("div",{ref:r,className:chunk3OZBDNRM_js.a("rounded-lg border bg-card text-card-foreground shadow-sm",t),...a}));s.displayName="Card";var i=e__namespace.forwardRef(({className:t,...a},r)=>e__namespace.createElement("div",{ref:r,className:chunk3OZBDNRM_js.a("flex flex-col space-y-1.5 p-6",t),...a}));i.displayName="CardHeader";var o=e__namespace.forwardRef(({className:t,...a},r)=>e__namespace.createElement("h3",{ref:r,className:chunk3OZBDNRM_js.a("text-2xl font-semibold leading-none tracking-tight",t),...a}));o.displayName="CardTitle";var n=e__namespace.forwardRef(({className:t,...a},r)=>e__namespace.createElement("p",{ref:r,className:chunk3OZBDNRM_js.a("text-sm text-muted-foreground",t),...a}));n.displayName="CardDescription";var c=e__namespace.forwardRef(({className:t,...a},r)=>e__namespace.createElement("div",{ref:r,className:chunk3OZBDNRM_js.a("p-6 pt-0",t),...a}));c.displayName="CardContent";var l=e__namespace.forwardRef(({className:t,...a},r)=>e__namespace.createElement("div",{ref:r,className:chunk3OZBDNRM_js.a("flex items-center p-6 pt-0",t),...a}));l.displayName="CardFooter";

exports.a = s;
exports.b = i;
exports.c = o;
exports.d = n;
exports.e = c;
exports.f = l;
