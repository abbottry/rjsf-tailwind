import React from "react";
import { PlusIcon } from '@heroicons/react/20/solid';
import {
  FormContextType,
  IconButtonProps,
  RJSFSchema,
  StrictRJSFSchema,
} from "@rjsf/utils";

export default function AddButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({ uiSchema, registry, ...props }: IconButtonProps<T, S, F>) {
  return (
    <button
      {...props}
      className={`flex items-center w-full px-3 py-[9px] rounded text-sm text-left text-slate-700 font-medium border border-dashed border-slate-300 hover:border-slate-400 ${props.className}`}
      title="Add Item"
    >
      <PlusIcon className="w-[18px] h-[18px] mr-2" />
      Add Item
    </button>
  );
}
