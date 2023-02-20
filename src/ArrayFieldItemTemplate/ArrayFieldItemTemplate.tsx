import React, { useState, useRef } from "react";
import classnames from "classnames";
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import {
  ArrayFieldTemplateItemType,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
} from "@rjsf/utils";

import { useDrag, useDrop } from 'react-dnd';
import type { XYCoord } from 'dnd-core'

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
  } = props;
  const { RemoveButton } =
    registry.templates.ButtonTemplates;

  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLInputElement>(null);
  let draggableOptions = {};
  if (hasMoveUp || hasMoveDown) {
    const [, drop] = useDrop({
      accept: 'item',
      hover(item: any, monitor) {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return;
        }
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        // Get pixels to the top
        const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
        // Time to actually perform the action
        // moveCard(dragIndex, hoverIndex)
        onReorderClick(dragIndex, hoverIndex)('');
        // console.log("drag index", dragIndex)
        // console.log("hover index", hoverIndex)
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex;
      },
    });

    const [{ isDragging }, drag] = useDrag({
      type: 'item',
      item: () => {
        return { index };
      },
      collect: (monitor: any) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const opacity = isDragging ? 0.3 : 1
    drag(drop(ref))

    draggableOptions = {
      style: {opacity}
    };
  }

  let groupTitle = "Untitled";
  if (children.props.formData) {
    if (children.props.formData.title) {
      groupTitle = children.props.formData.title;
    }
  }

  return (
    <div className={`${className} mb-4`} ref={ref} {...draggableOptions}>
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
          <div className="ml-3 mb-4">
            {hasRemove && (
              <RemoveButton
                disabled={disabled || readonly}
                onClick={onDropIndexClick(index)}
                registry={registry}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
