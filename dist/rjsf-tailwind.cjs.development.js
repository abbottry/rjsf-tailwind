'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@rjsf/core');

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
  return core.withTheme(generateTheme());
}
var Form = /*#__PURE__*/generateForm();

exports.Form = Form;
exports.Templates = Templates;
exports.Theme = Theme;
exports.Widgets = Widgets;
exports["default"] = Form;
exports.generateForm = generateForm;
exports.generateTemplates = generateTemplates;
exports.generateTheme = generateTheme;
exports.generateWidgets = generateWidgets;
//# sourceMappingURL=rjsf-tailwind.cjs.development.js.map
