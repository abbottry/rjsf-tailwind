import BaseInputTemplate from "../BaseInputTemplate/BaseInputTemplate";

import {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  TemplatesType,
} from "@rjsf/utils";

export function generateTemplates<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(): Partial<TemplatesType<T, S, F>> {
  return {
    BaseInputTemplate
  };
}

export default generateTemplates();
