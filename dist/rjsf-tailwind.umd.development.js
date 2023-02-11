(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@rjsf/core'), require('react'), require('@rjsf/utils')) :
  typeof define === 'function' && define.amd ? define(['exports', '@rjsf/core', 'react', '@rjsf/utils'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["rjsf-tailwind"] = {}, global.core, global.React, global.utils));
})(this, (function (exports, core, React, utils) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }

  function BaseInputTemplate(_ref) {
    var id = _ref.id,
      placeholder = _ref.placeholder,
      required = _ref.required,
      readonly = _ref.readonly,
      disabled = _ref.disabled,
      type = _ref.type,
      value = _ref.value,
      onChange = _ref.onChange,
      onBlur = _ref.onBlur,
      onFocus = _ref.onFocus,
      autofocus = _ref.autofocus,
      options = _ref.options,
      schema = _ref.schema,
      _ref$rawErrors = _ref.rawErrors,
      rawErrors = _ref$rawErrors === void 0 ? [] : _ref$rawErrors,
      children = _ref.children,
      extraProps = _ref.extraProps;
    var inputProps = _extends({}, extraProps, utils.getInputProps(schema, type, options));
    var _onChange = function _onChange(_ref2) {
      var value = _ref2.target.value;
      return onChange(value === "" ? options.emptyValue : value);
    };
    var _onBlur = function _onBlur(_ref3) {
      var value = _ref3.target.value;
      return onBlur(id, value);
    };
    var _onFocus = function _onFocus(_ref4) {
      var value = _ref4.target.value;
      return onFocus(id, value);
    };
    // const classNames = [rawErrors.length > 0 ? "is-invalid" : "", type === 'file' ? 'custom-file-label': ""]
    return React__default["default"].createElement(React__default["default"].Fragment, null, React__default["default"].createElement("form", _extends({
      id: id,
      name: id,
      placeholder: placeholder,
      autoFocus: autofocus,
      required: required,
      disabled: disabled,
      readOnly: readonly,
      className: rawErrors.length > 0 ? "is-invalid" : "tailwind-form",
      list: schema.examples ? utils.examplesId(id) : undefined
    }, inputProps, {
      value: value || value === 0 ? value : "",
      onChange: _onChange,
      onBlur: _onBlur,
      onFocus: _onFocus,
      "aria-describedby": utils.ariaDescribedByIds(id, !!schema.examples)
    })), children, Array.isArray(schema.examples) ? React__default["default"].createElement("datalist", {
      id: utils.examplesId(id)
    }, schema.examples.concat(schema["default"] && !schema.examples.includes(schema["default"]) ? [schema["default"]] : []).map(function (example) {
      return React__default["default"].createElement("option", {
        key: example,
        value: example
      });
    })) : null);
  }

  function generateTemplates() {
    return {
      BaseInputTemplate: BaseInputTemplate
    };
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
