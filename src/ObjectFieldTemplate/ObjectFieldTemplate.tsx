import React from "react";
import TabsTemplate from "../TabsTemplate";
import {
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
>(props: ObjectFieldTemplateProps<T, S, F>) {
  const {
    description,
    title,
    properties,
    required,
    uiSchema,
    idSchema,
    schema,
    registry,
  } = props;
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
        {tabGroups({
          properties,
          groups: uiSchema!["ui:tabs"],
          props
        })}        
      </div>
    </>
  );
}

const REST = Symbol("REST");
const EXTRANEOUS = Symbol("EXTRANEOUS");
function tabGroups({ properties, groups, props }: any) {
  if (!Array.isArray(groups)) {
    return (
      <>
        {properties.map((element: any, index: number) => (
          <div
            key={index}
            className={element.hidden ? "hidden" : "mb-5"}
          >
            {element.content}
          </div>
        ))}
      </>
    );
  }
  const mapped = groups.map((g: any, key:any) => {
    if (typeof g === "string") {
      const found = properties.filter((p:any) => p.name === g);
      if (found.length === 1) {
        const el = found[0];
        return el.content;
      }
      return EXTRANEOUS;
    } else if (typeof g === "object") {
      const _properties = Object.keys(g).reduce((acc:any, key:string) => {
        const field = g[key];
        if (key.startsWith("ui:")) return acc;
        if (!Array.isArray(field)) return acc;
        return [
          ...acc,
          {
            name: key,
            children: tabGroups({
              properties,
              props,
              groups: field
            })
          }
        ];
      }, []);
      
      return <TabsTemplate key={key} properties={_properties} />;
    }
    throw new Error("Invalid object type: " + typeof g + " " + g);
  });

  const remainder = mapped.filter((m: any) => m === REST);
  if (remainder.length > 0) {
    throw new Error("Remainder fields not supported");
  }
  const extraneous = mapped.filter((m: any) => m === EXTRANEOUS);
  if (extraneous.length) {
    throw new Error("Extranoues fields" + extraneous);
  }

  return mapped;
}
