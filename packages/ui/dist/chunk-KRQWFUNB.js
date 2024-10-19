'use strict';

var chunkNMR6OQWV_js = require('./chunk-NMR6OQWV.js');
var chunk6ANYWGMQ_js = require('./chunk-6ANYWGMQ.js');
var chunkTHSOWGKZ_js = require('./chunk-THSOWGKZ.js');
var reactTabs = require('@radix-ui/react-tabs');
var framerMotion = require('framer-motion');
var i = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var i__default = /*#__PURE__*/_interopDefault(i);

var D=()=>{let[e,r]=i.useState("email"),c={hidden:{opacity:0,x:-50},visible:{opacity:1,x:0},exit:{opacity:0,x:50}};return i__default.default.createElement("div",{className:"flex items-center justify-center min-h-screen bg-background"},i__default.default.createElement(chunkTHSOWGKZ_js.a,{className:"w-full max-w-md"},i__default.default.createElement(chunkTHSOWGKZ_js.b,null,i__default.default.createElement(chunkTHSOWGKZ_js.c,{className:"text-2xl font-bold text-center"},"Iniciar sesi\xF3n"),i__default.default.createElement(chunkTHSOWGKZ_js.d,{className:"text-center"},"Seleccione su m\xE9todo para iniciar sesi\xF3n")),i__default.default.createElement(chunkTHSOWGKZ_js.e,null,i__default.default.createElement(reactTabs.Tabs,{value:e,className:"space-y-4"},i__default.default.createElement(reactTabs.TabsList,{className:"grid w-full grid-cols-2"},i__default.default.createElement(reactTabs.TabsTrigger,{onClick:()=>r("email"),value:"email",className:`${e==="email"&&"bg-primary text-primary-foreground"} p-1 rounded-lg`},"Email"),i__default.default.createElement(reactTabs.TabsTrigger,{onClick:()=>r("dni"),className:`${e==="dni"&&"bg-primary text-primary-foreground"} p-1 rounded-lg`,value:"dni"},"DNI")),i__default.default.createElement(framerMotion.AnimatePresence,{mode:"wait"},i__default.default.createElement(framerMotion.motion.div,{key:e,initial:"hidden",animate:"visible",exit:"exit",variants:c,transition:{duration:.3}},i__default.default.createElement(reactTabs.TabsContent,{value:"email",className:"transition-all duration-300"},i__default.default.createElement(chunk6ANYWGMQ_js.a,null)),i__default.default.createElement(reactTabs.TabsContent,{value:"dni"},i__default.default.createElement(chunkNMR6OQWV_js.a,null))))))))};

exports.a = D;
