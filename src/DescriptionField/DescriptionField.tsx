import React from "react";
import {
  DescriptionFieldProps,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
} from "@rjsf/utils";

export default function DescriptionField<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({ id, description }: DescriptionFieldProps<T, S, F>) {
  if (description) {
    return (
      <>
        <div id={id} className="mb-3">
          {description}
        </div>
      </>
    );
  }

  return null;
}
