import React, { useState } from "react";
import FontPicker from "../utils/FontPicker";
import {
  FormContextType,
  // getTemplate,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from "@rjsf/utils";

export default function FontsWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: WidgetProps<T, S, F>) {
  const { onChange, value, id} = props;
  const [activeFont, setActiveFont] = useState(value || "Inter");

  const pickerId = id.replace(/[^a-z0-9]+/gi, "");
  return (
    <>
      <FontPicker
					apiKey="AIzaSyD8KNrMxpVkc3bxqamNlkN4LZp6kqohlS8"
					activeFontFamily={activeFont}
          pickerId={pickerId}
          sort="popularity"
          onChange={(nextFont) => {
            setActiveFont(nextFont.family);
            onChange(nextFont.family || undefined);
          }}
				/>
    </>
  );
}
