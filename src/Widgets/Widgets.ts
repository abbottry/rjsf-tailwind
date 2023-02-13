import SelectWidget from "../SelectWidget/SelectWidget";
import TextareaWidget from "../TextareaWidget/TextareaWidget";

import {
  FormContextType,
  RegistryWidgetsType,
  RJSFSchema,
  StrictRJSFSchema,
} from "@rjsf/utils";

export function generateWidgets<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(): RegistryWidgetsType<T, S, F> {
  return {
    SelectWidget,
    TextareaWidget
  };
}

export default generateWidgets();
