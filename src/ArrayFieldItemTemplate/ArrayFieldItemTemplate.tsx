import React, { useState } from "react";
import classnames from "classnames";
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import {
  ArrayFieldTemplateItemType,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
} from "@rjsf/utils";

/** The `ArrayFieldItemTemplate` component is the template used to render an items of an array.
 *
 * @param props - The `ArrayFieldTemplateItemType` props for the component
 */
export default function ArrayFieldItemTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: ArrayFieldTemplateItemType<T, S, F>) {
  const {
    children,
    className,
    disabled,
    hasToolbar,
    hasMoveDown,
    hasMoveUp,
    hasRemove,
    index,
    onDropIndexClick,
    onReorderClick,
    readonly,
    registry,
    uiSchema,
  } = props;
  const { MoveDownButton, MoveUpButton, RemoveButton } =
    registry.templates.ButtonTemplates;

  const [isOpen, setIsOpen] = useState(false);

  let groupTitle = "Untitled";
  if (children.props.formData) {
    if (children.props.formData.title) {
      groupTitle = children.props.formData.title;
    }
  }

  return (
    <div className={`${className} mb-4`}>
      <div 
        className={classnames("flex items-center w-full p-3 py-2.5 rounded text-sm text-left text-slate-700 font-medium cursor-pointer", {
          "bg-slate-100": !hasToolbar,
          "border border-slate-200": hasToolbar
        })}
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        <div className="grow line-clamp-1">
          {groupTitle}
        </div>
        <ChevronRightIcon className={`h-5 w-5 ${isOpen ? 'rotate-90 transform' : ''}`} />
      </div>
      <div className={classnames("relative", {
        'hidden' : !isOpen,
        'block': isOpen
        })}>
        <div className="px-2.5 pt-5">
          {children}
        </div>
        {hasToolbar && (
          <div className="absolute top-[-42px] right-[-39px]">
            <div
              className="btn-group"
            >
              {(hasMoveUp || hasMoveDown) && (
                <MoveUpButton
                  className="w-[18px] h-[18px] text-slate-700"
                  disabled={disabled || readonly || !hasMoveUp}
                  onClick={onReorderClick(index, index - 1)}
                  uiSchema={uiSchema}
                  registry={registry}
                />
              )}
              {(hasMoveUp || hasMoveDown) && (
                <MoveDownButton
                  className="w-[18px] h-[18px] text-slate-700"
                  disabled={disabled || readonly || !hasMoveDown}
                  onClick={onReorderClick(index, index + 1)}
                  uiSchema={uiSchema}
                  registry={registry}
                />
              )}
              {hasRemove && (
                <RemoveButton
                  className="w-[18px] h-[18px] text-red-700"
                  disabled={disabled || readonly}
                  onClick={onDropIndexClick(index)}
                  uiSchema={uiSchema}
                  registry={registry}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
