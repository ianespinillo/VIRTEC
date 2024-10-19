'use strict';

var chunk3OZBDNRM_js = require('./chunk-3OZBDNRM.js');
var t = require('@radix-ui/react-label');
var classVarianceAuthority = require('class-variance-authority');
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

var t__namespace = /*#__PURE__*/_interopNamespace(t);
var e__namespace = /*#__PURE__*/_interopNamespace(e);

var l=classVarianceAuthority.cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),p=e__namespace.forwardRef(({className:o,...i},r)=>e__namespace.createElement(t__namespace.Root,{ref:r,className:chunk3OZBDNRM_js.a(l(),o),...i}));p.displayName=t__namespace.Root.displayName;

exports.a = p;
