import React from "react";

import {
  ADDITIONAL_PROPERTY_FLAG,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WrapIfAdditionalTemplateProps,
} from "@rjsf/utils";

export default function WrapIfAdditionalTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({
  classNames,
  style,
  children,
  disabled,
  id,
  label,
  onDropPropertyClick,
  onKeyChange,
  readonly,
  required,
  schema,
  uiSchema,
  registry,
}: WrapIfAdditionalTemplateProps<T, S, F>) {
  // Button templates are not overridden in the uiSchema
  const { RemoveButton } = registry.templates.ButtonTemplates;
  const keyLabel = `${label} Key`; // i18n ?
  const additional = ADDITIONAL_PROPERTY_FLAG in schema;

  if (!additional) {
    return (
      <div className={classNames} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div className={classNames} style={style}>
      <div className="row">
        <div className="col-xs-5 form-additional">
          <div className="form-group">
            <label htmlFor={`${id}-key`}>{keyLabel}</label>
            <input
              className="form-control"
              required={required}
              type="text"
              id={`${id}-key`}
              onBlur={(event) => onKeyChange(event.target.value)}
              defaultValue={label}
            />
          </div>
        </div>
        <div className="form-additional form-group col-xs-5">{children}</div>
        <div className="col-xs-2">
          <RemoveButton
            className="array-item-remove btn-block"
            style={{ border: "0" }}
            disabled={disabled || readonly}
            onClick={onDropPropertyClick(label)}
            uiSchema={uiSchema}
            registry={registry}
          />
        </div>
      </div>
    </div>
  );
}
