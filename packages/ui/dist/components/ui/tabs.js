'use strict';

var chunk3OZBDNRM_js = require('../../chunk-3OZBDNRM.js');
var e = require('@radix-ui/react-tabs');
var i = require('react');

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
var i__namespace = /*#__PURE__*/_interopNamespace(i);

var c=e__namespace.Root,r=i__namespace.forwardRef(({className:t,...s},a)=>i__namespace.createElement(e__namespace.List,{ref:a,className:chunk3OZBDNRM_js.a("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",t),...s}));r.displayName=e__namespace.List.displayName;var n=i__namespace.forwardRef(({className:t,...s},a)=>i__namespace.createElement(e__namespace.Trigger,{ref:a,className:chunk3OZBDNRM_js.a("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",t),...s}));n.displayName=e__namespace.Trigger.displayName;var f=i__namespace.forwardRef(({className:t,...s},a)=>i__namespace.createElement(e__namespace.Content,{ref:a,className:chunk3OZBDNRM_js.a("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",t),...s}));f.displayName=e__namespace.Content.displayName;

exports.Tabs = c;
exports.TabsContent = f;
exports.TabsList = r;
exports.TabsTrigger = n;
