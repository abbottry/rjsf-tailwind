import { withTheme } from '@rjsf/core';

function generateTemplates() {
  return {};
}
var Templates = /*#__PURE__*/generateTemplates();

function generateWidgets() {
  return {};
}
var Widgets = /*#__PURE__*/generateWidgets();

function generateTheme() {
  return {
    templates: generateTemplates(),
    widgets: generateWidgets()
  };
}
var Theme = /*#__PURE__*/generateTheme();

function generateForm() {
  return withTheme(generateTheme());
}
var Form = /*#__PURE__*/generateForm();

export { Form, Templates, Theme, Widgets, Form as default, generateForm, generateTemplates, generateTheme, generateWidgets };
//# sourceMappingURL=rjsf-tailwind.esm.js.map
