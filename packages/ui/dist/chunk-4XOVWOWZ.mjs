import { a as a$2 } from './chunk-P7V5QYYU.mjs';
import { a as a$1 } from './chunk-TTPFNTME.mjs';
import { a, b, c, d, e } from './chunk-OMBDPVA7.mjs';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import { AnimatePresence, motion } from 'framer-motion';
import i, { useState } from 'react';

var D=()=>{let[e$1,r]=useState("email"),c$1={hidden:{opacity:0,x:-50},visible:{opacity:1,x:0},exit:{opacity:0,x:50}};return i.createElement("div",{className:"flex items-center justify-center min-h-screen bg-background"},i.createElement(a,{className:"w-full max-w-md"},i.createElement(b,null,i.createElement(c,{className:"text-2xl font-bold text-center"},"Iniciar sesi\xF3n"),i.createElement(d,{className:"text-center"},"Seleccione su m\xE9todo para iniciar sesi\xF3n")),i.createElement(e,null,i.createElement(Tabs,{value:e$1,className:"space-y-4"},i.createElement(TabsList,{className:"grid w-full grid-cols-2"},i.createElement(TabsTrigger,{onClick:()=>r("email"),value:"email",className:`${e$1==="email"&&"bg-primary text-primary-foreground"} p-1 rounded-lg`},"Email"),i.createElement(TabsTrigger,{onClick:()=>r("dni"),className:`${e$1==="dni"&&"bg-primary text-primary-foreground"} p-1 rounded-lg`,value:"dni"},"DNI")),i.createElement(AnimatePresence,{mode:"wait"},i.createElement(motion.div,{key:e$1,initial:"hidden",animate:"visible",exit:"exit",variants:c$1,transition:{duration:.3}},i.createElement(TabsContent,{value:"email",className:"transition-all duration-300"},i.createElement(a$1,null)),i.createElement(TabsContent,{value:"dni"},i.createElement(a$2,null))))))))};

export { D as a };
