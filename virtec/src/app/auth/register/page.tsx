"use client";

import { MultiStepForm } from "@/components/Forms/MultiStepForm";
import React, { useState } from "react";

export default function page() {
  const [actualForm, setActualForm] = useState(1);
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex items-center justify-center">
        <MultiStepForm actualForm={actualForm} setActualForm={setActualForm} />
      </div>
    </div>
  );
}
