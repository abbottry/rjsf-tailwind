import React from "react";
import {
  FormContextType,
  IconButtonProps,
  RJSFSchema,
  StrictRJSFSchema,
} from "@rjsf/utils";

import { ArrowSmallUpIcon, ArrowSmallDownIcon, XMarkIcon } from '@heroicons/react/20/solid';

export default function IconButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: IconButtonProps<T, S, F>) {
  const { icon, iconType, className, uiSchema, registry, ...otherProps } =
    props;
  return (
    <button {...otherProps} className="block rounded-[5px] border border-slate-200 p-0.5 mb-1 cursor-pointer">
      {icon === "up" ? <ArrowSmallUpIcon className={className} /> : null}
      {icon === "down" ? <ArrowSmallDownIcon className={className} /> : null}
      {icon === "remove" ? <XMarkIcon className={className} /> : null}
    </button>
  );
}

export function MoveDownButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: IconButtonProps<T, S, F>) {
  return (
    <IconButton title="Move down" {...props} icon="down" />
  );
}

export function MoveUpButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: IconButtonProps<T, S, F>) {
  return <IconButton title="Move up" {...props} icon="up" />;
}

export function RemoveButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: IconButtonProps<T, S, F>) {
  return (
    <IconButton
      title="Remove"
      {...props}
      icon="remove"
    />
  );
}
