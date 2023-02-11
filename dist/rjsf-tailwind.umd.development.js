(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@rjsf/core')) :
  typeof define === 'function' && define.amd ? define(['exports', '@rjsf/core'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["rjsf-tailwind"] = {}, global.core));
})(this, (function (exports, core) { 'use strict';

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

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=rjsf-tailwind.umd.development.js.map
