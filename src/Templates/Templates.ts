import AddButton from "../AddButton";
import ArrayFieldTemplate from "../ArrayFieldTemplate";
import ArrayFieldItemTemplate from "../ArrayFieldItemTemplate";
import BaseInputTemplate from "../BaseInputTemplate/BaseInputTemplate";
import DescriptionField from "../DescriptionField";
import FieldTemplate from "../FieldTemplate";
import { MoveDownButton, MoveUpButton, RemoveButton } from "../IconButton";
import ObjectFieldTemplate from "../ObjectFieldTemplate";
import SubmitButton from "../SubmitButton";
import TitleField from "../TitleField";
import WrapIfAdditionalTemplate from "../WrapIfAdditionalTemplate";

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
    ArrayFieldTemplate,
    ArrayFieldItemTemplate,
    BaseInputTemplate,
    ButtonTemplates: {
      AddButton,
      MoveDownButton,
      MoveUpButton,
      RemoveButton,
      SubmitButton
    },
    DescriptionFieldTemplate: DescriptionField,
    FieldTemplate,
    ObjectFieldTemplate,
    TitleFieldTemplate: TitleField,
    WrapIfAdditionalTemplate
  };
}

export default generateTemplates();
