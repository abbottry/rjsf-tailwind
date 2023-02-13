import React from "react";

import {
  canExpand,
  descriptionId,
  FormContextType,
  getTemplate,
  getUiOptions,
  ObjectFieldTemplateProps,
  RJSFSchema,
  StrictRJSFSchema,
  titleId,
} from "@rjsf/utils";

export default function ObjectFieldTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({
  description,
  title,
  properties,
  required,
  uiSchema,
  idSchema,
  schema,
  formData,
  onAddClick,
  disabled,
  readonly,
  registry,
}: ObjectFieldTemplateProps<T, S, F>) {
  const uiOptions = getUiOptions<T, S, F>(uiSchema);
  const TitleFieldTemplate = getTemplate<"TitleFieldTemplate", T, S, F>(
    "TitleFieldTemplate",
    registry,
    uiOptions
  );
  const DescriptionFieldTemplate = getTemplate<
    "DescriptionFieldTemplate",
    T,
    S,
    F
  >("DescriptionFieldTemplate", registry, uiOptions);
  // Button templates are not overridden in the uiSchema
  const {
    ButtonTemplates: { AddButton },
  } = registry.templates;
  return (
    <>
      {(uiOptions.title || title) && (
        <TitleFieldTemplate
          id={titleId<T>(idSchema)}
          title={uiOptions.title || title}
          required={required}
          schema={schema}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
      {(uiOptions.description || description) && (
        <DescriptionFieldTemplate
          id={descriptionId<T>(idSchema)}
          description={uiOptions.description || description!}
          schema={schema}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
      <div className="p-0">
        {properties.map((element: any, index: number) => (
          <div
            key={index}
            className={element.hidden ? "d-none" : "mb-5"}
          >
            {element.content}
          </div>
        ))}
        {canExpand(schema, uiSchema, formData) ? (
          <div className="py-4">
            <AddButton
              onClick={onAddClick(schema)}
              disabled={disabled || readonly}
              className="object-property-expand"
              uiSchema={uiSchema}
              registry={registry}
            />
          </div>
        ) : null}
      </div>
    </>
  );
}
