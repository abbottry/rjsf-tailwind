'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@rjsf/core');
var React = require('react');
var solid = require('@heroicons/react/20/solid');
var utils = require('@rjsf/utils');
var reactDnd = require('react-dnd');
var reactDndHtml5Backend = require('react-dnd-html5-backend');
var classnames = require('classnames');
var fontManager = require('@samuelmeuli/font-manager');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var classnames__default = /*#__PURE__*/_interopDefaultLegacy(classnames);

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
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

var _excluded$2 = ["uiSchema", "registry"];
function AddButton(_ref) {
  var props = _objectWithoutPropertiesLoose(_ref, _excluded$2);
  return React__default["default"].createElement("button", _extends({}, props, {
    className: "flex items-center w-full px-3 py-[9px] rounded text-sm text-left text-slate-700 font-medium border border-dashed border-slate-300 hover:border-slate-400 " + props.className,
    title: "Add Item"
  }), React__default["default"].createElement(solid.PlusIcon, {
    className: "w-[18px] h-[18px] mr-2"
  }), "Add Item");
}

var _excluded$1 = ["key"];
/** The `ArrayFieldTemplate` component is the template used to render all items in an array.
 *
 * @param props - The `ArrayFieldTemplateItemType` props for the component
 */
function ArrayFieldTemplate(props) {
  var canAdd = props.canAdd,
    className = props.className,
    disabled = props.disabled,
    idSchema = props.idSchema,
    uiSchema = props.uiSchema,
    items = props.items,
    onAddClick = props.onAddClick,
    readonly = props.readonly,
    registry = props.registry,
    required = props.required,
    schema = props.schema,
    title = props.title;
  var uiOptions = utils.getUiOptions(uiSchema);
  var ArrayFieldDescriptionTemplate = utils.getTemplate("ArrayFieldDescriptionTemplate", registry, uiOptions);
  var ArrayFieldItemTemplate = utils.getTemplate("ArrayFieldItemTemplate", registry, uiOptions);
  var ArrayFieldTitleTemplate = utils.getTemplate("ArrayFieldTitleTemplate", registry, uiOptions);
  // Button templates are not overridden in the uiSchema
  var AddButton = registry.templates.ButtonTemplates.AddButton;
  return React__default["default"].createElement(reactDnd.DndProvider, {
    backend: reactDndHtml5Backend.HTML5Backend
  }, React__default["default"].createElement("fieldset", {
    className: className,
    id: idSchema.$id
  }, React__default["default"].createElement(ArrayFieldTitleTemplate, {
    idSchema: idSchema,
    title: uiOptions.title || title,
    required: required,
    schema: schema,
    uiSchema: uiSchema,
    registry: registry
  }), React__default["default"].createElement(ArrayFieldDescriptionTemplate, {
    idSchema: idSchema,
    description: uiOptions.description || schema.description,
    schema: schema,
    uiSchema: uiSchema,
    registry: registry
  }), React__default["default"].createElement("div", {
    className: "row array-item-list"
  }, items && items.map(function (_ref) {
    var key = _ref.key,
      itemProps = _objectWithoutPropertiesLoose(_ref, _excluded$1);
    return React__default["default"].createElement(ArrayFieldItemTemplate, _extends({
      key: key
    }, itemProps));
  })), canAdd && React__default["default"].createElement(AddButton, {
    className: "array-item-add",
    onClick: onAddClick,
    disabled: disabled || readonly,
    uiSchema: uiSchema,
    registry: registry
  })));
}

/** The `ArrayFieldItemTemplate` component is the template used to render an items of an array.
 *
 * @param props - The `ArrayFieldTemplateItemType` props for the component
 */
function ArrayFieldItemTemplate(props) {
  var children = props.children,
    className = props.className,
    disabled = props.disabled,
    hasToolbar = props.hasToolbar,
    hasMoveDown = props.hasMoveDown,
    hasMoveUp = props.hasMoveUp,
    hasRemove = props.hasRemove,
    index = props.index,
    onDropIndexClick = props.onDropIndexClick,
    onReorderClick = props.onReorderClick,
    readonly = props.readonly,
    registry = props.registry;
  var RemoveButton = registry.templates.ButtonTemplates.RemoveButton;
  var _useState = React.useState(false),
    isOpen = _useState[0],
    setIsOpen = _useState[1];
  var ref = React.useRef(null);
  var draggableOptions = {};
  if (hasMoveUp || hasMoveDown) {
    var _useDrop = reactDnd.useDrop({
        accept: 'item',
        hover: function hover(item, monitor) {
          var _ref$current;
          if (!ref.current) {
            return;
          }
          var dragIndex = item.index;
          var hoverIndex = index;
          // Don't replace items with themselves
          if (dragIndex === hoverIndex) {
            return;
          }
          // Determine rectangle on screen
          var hoverBoundingRect = (_ref$current = ref.current) == null ? void 0 : _ref$current.getBoundingClientRect();
          // Get vertical middle
          var hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          // Determine mouse position
          var clientOffset = monitor.getClientOffset();
          // Get pixels to the top
          var hoverClientY = clientOffset.y - hoverBoundingRect.top;
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
          onReorderClick(dragIndex, hoverIndex)('');
          // Note: we're mutating the monitor item here!
          // Generally it's better to avoid mutations,
          // but it's good here for the sake of performance
          // to avoid expensive index searches.
          item.index = hoverIndex;
        }
      }),
      drop = _useDrop[1];
    var _useDrag = reactDnd.useDrag({
        type: 'item',
        item: function item() {
          return {
            index: index
          };
        },
        collect: function collect(monitor) {
          return {
            isDragging: monitor.isDragging()
          };
        }
      }),
      isDragging = _useDrag[0].isDragging,
      drag = _useDrag[1];
    var opacity = isDragging ? 0.3 : 1;
    drag(drop(ref));
    draggableOptions = {
      style: {
        opacity: opacity
      }
    };
  }
  var groupTitle = "Untitled";
  if (children.props.formData) {
    if (children.props.formData.title) {
      groupTitle = children.props.formData.title;
    }
  }
  return React__default["default"].createElement("div", _extends({
    className: className + " mb-4",
    ref: ref
  }, draggableOptions), React__default["default"].createElement("div", {
    className: classnames__default["default"]("flex items-center w-full p-3 py-2.5 rounded text-sm text-left text-slate-700 font-medium cursor-pointer", {
      "bg-slate-100": !hasToolbar,
      "border border-slate-200": hasToolbar && !isOpen,
      "border border-slate-300": hasToolbar && isOpen
    }),
    onClick: function onClick() {
      return setIsOpen(function (isOpen) {
        return !isOpen;
      });
    }
  }, React__default["default"].createElement("div", {
    className: "grow line-clamp-1"
  }, groupTitle), React__default["default"].createElement(solid.ChevronRightIcon, {
    className: "h-5 w-5 " + (isOpen ? 'rotate-90 transform' : '')
  })), React__default["default"].createElement("div", {
    className: classnames__default["default"]("relative", {
      'hidden': !isOpen,
      'block': isOpen
    })
  }, React__default["default"].createElement("div", {
    className: "px-2.5 pt-5"
  }, children), hasToolbar && React__default["default"].createElement("div", {
    className: "ml-3 mb-4"
  }, hasRemove && React__default["default"].createElement(RemoveButton, {
    disabled: disabled || readonly,
    onClick: onDropIndexClick(index),
    registry: registry
  }))));
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
  return React__default["default"].createElement(React__default["default"].Fragment, null, React__default["default"].createElement("input", _extends({
    id: id,
    name: id,
    placeholder: placeholder,
    autoFocus: autofocus,
    required: required,
    disabled: disabled,
    readOnly: readonly,
    className: classnames__default["default"]("mt-1 block w-full text-[15px]", {
      "is-invalid": rawErrors.length > 0,
      "file:mr-3 file:font-medium file:text-sm file:border-none file:bg-slate-200 file:py-1 file:px-3 file:rounded-md file:cursor-pointer p-[7px]": type === "file",
      "bg-white h-[42px] p-[5px] cursor-pointer": type === "color",
      "rounded-md border border-slate-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50": type !== "range"
    }),
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

function DescriptionField(_ref) {
  var id = _ref.id,
    description = _ref.description;
  if (description) {
    return React__default["default"].createElement(React__default["default"].Fragment, null, React__default["default"].createElement("div", {
      id: id,
      className: "mb-3"
    }, description));
  }
  return null;
}

/** The `FieldErrorTemplate` component renders the errors local to the particular field
 *
 * @param props - The `FieldErrorProps` for the errors being rendered
 */
function FieldErrorTemplate(props) {
  var _props$errors = props.errors,
    errors = _props$errors === void 0 ? [] : _props$errors,
    idSchema = props.idSchema;
  if (errors.length === 0) {
    return null;
  }
  var id = utils.errorId(idSchema);
  return React__default["default"].createElement("div", null, React__default["default"].createElement("ul", {
    id: id,
    className: "error-detail bs-callout bs-callout-info"
  }, errors.filter(function (elem) {
    return !!elem;
  }).map(function (error, index) {
    return React__default["default"].createElement("li", {
      className: "text-red-700 text-sm",
      key: index
    }, error);
  })));
}

function FieldTemplate(_ref) {
  var id = _ref.id,
    children = _ref.children,
    displayLabel = _ref.displayLabel,
    _ref$rawErrors = _ref.rawErrors,
    rawErrors = _ref$rawErrors === void 0 ? [] : _ref$rawErrors,
    errors = _ref.errors,
    help = _ref.help,
    rawDescription = _ref.rawDescription,
    classNames = _ref.classNames,
    style = _ref.style,
    disabled = _ref.disabled,
    label = _ref.label,
    hidden = _ref.hidden,
    onDropPropertyClick = _ref.onDropPropertyClick,
    onKeyChange = _ref.onKeyChange,
    readonly = _ref.readonly,
    required = _ref.required,
    schema = _ref.schema,
    uiSchema = _ref.uiSchema,
    registry = _ref.registry;
  var uiOptions = utils.getUiOptions(uiSchema);
  var WrapIfAdditionalTemplate = utils.getTemplate("WrapIfAdditionalTemplate", registry, uiOptions);
  if (hidden) {
    return React__default["default"].createElement("div", {
      className: "hidden"
    }, children);
  }
  return React__default["default"].createElement(WrapIfAdditionalTemplate, {
    classNames: classNames,
    style: style,
    disabled: disabled,
    id: id,
    label: label,
    onDropPropertyClick: onDropPropertyClick,
    onKeyChange: onKeyChange,
    readonly: readonly,
    required: required,
    schema: schema,
    uiSchema: uiSchema,
    registry: registry
  }, React__default["default"].createElement(React__default["default"].Fragment, null, displayLabel && label !== " " && React__default["default"].createElement("label", {
    htmlFor: id,
    className: classnames__default["default"]("block mb-2 text-sm font-medium", {
      "text-red-700": rawErrors.length > 0,
      "text-slate-700": rawErrors.length < 0
    })
  }, label, required ? "*" : null), children, displayLabel && rawDescription && React__default["default"].createElement("p", {
    className: rawErrors.length > 0 ? "text-red-700" : "text-slate-500"
  }, rawDescription), errors, help));
}

var _excluded = ["icon", "iconType", "className", "registry"];
function IconButton(props) {
  var icon = props.icon,
    className = props.className,
    otherProps = _objectWithoutPropertiesLoose(props, _excluded);
  return React__default["default"].createElement("button", _extends({}, otherProps, {
    className: "block rounded-[5px] border border-slate-200 p-0.5 mb-1 cursor-pointer"
  }), icon === "up" ? React__default["default"].createElement(solid.ArrowSmallUpIcon, {
    className: className
  }) : null, icon === "down" ? React__default["default"].createElement(solid.ArrowSmallDownIcon, {
    className: className
  }) : null, icon === "remove" ? React__default["default"].createElement(solid.XMarkIcon, {
    className: className
  }) : null);
}
function MoveDownButton(props) {
  return React__default["default"].createElement(IconButton, _extends({
    title: "Move down"
  }, props, {
    icon: "down"
  }));
}
function MoveUpButton(props) {
  return React__default["default"].createElement(IconButton, _extends({
    title: "Move up"
  }, props, {
    icon: "up"
  }));
}
function RemoveButton(props) {
  return React__default["default"].createElement("button", _extends({}, props, {
    className: "flex items-center text-[13px] text-red-700 border border-red-700 rounded-[5px] py-0.5 px-2 hover:bg-red-700 hover:text-white"
  }), React__default["default"].createElement(solid.TrashIcon, {
    className: "w-3 h-3 mr-1"
  }), "Remove");
}

function TabsTemplate(props) {
  var _useState = React.useState(props.properties[0].name),
    activeTab = _useState[0],
    setActiveTab = _useState[1];
  return React__default["default"].createElement(React__default["default"].Fragment, null, React__default["default"].createElement("div", {
    className: "flex items-center justify-between bg-slate-100 p-1 rounded-md mb-6"
  }, props.properties.map(function (p, id) {
    return React__default["default"].createElement("button", {
      key: id,
      type: "button",
      onClick: function onClick() {
        return setActiveTab(p.name);
      },
      className: classnames__default["default"]("text-sm py-2 w-1/3 rounded-md capitalize", {
        "bg-white font-medium": activeTab === p.name
      })
    }, p.name);
  })), props.properties.map(function (p, id) {
    return React__default["default"].createElement("div", {
      key: id,
      title: p.name,
      className: classnames__default["default"]({
        "hidden": activeTab !== p.name
      })
    }, p.children.map(function (element, index) {
      return React__default["default"].createElement("div", {
        key: index,
        className: "mb-5"
      }, element);
    }));
  }));
}

function ObjectFieldTemplate(props) {
  var description = props.description,
    title = props.title,
    properties = props.properties,
    required = props.required,
    uiSchema = props.uiSchema,
    idSchema = props.idSchema,
    schema = props.schema,
    registry = props.registry;
  var uiOptions = utils.getUiOptions(uiSchema);
  var TitleFieldTemplate = utils.getTemplate("TitleFieldTemplate", registry, uiOptions);
  var DescriptionFieldTemplate = utils.getTemplate("DescriptionFieldTemplate", registry, uiOptions);
  // Button templates are not overridden in the uiSchema
  return React__default["default"].createElement(React__default["default"].Fragment, null, (uiOptions.title || title) && React__default["default"].createElement(TitleFieldTemplate, {
    id: utils.titleId(idSchema),
    title: uiOptions.title || title,
    required: required,
    schema: schema,
    uiSchema: uiSchema,
    registry: registry
  }), (uiOptions.description || description) && React__default["default"].createElement(DescriptionFieldTemplate, {
    id: utils.descriptionId(idSchema),
    description: uiOptions.description || description,
    schema: schema,
    uiSchema: uiSchema,
    registry: registry
  }), React__default["default"].createElement("div", {
    className: "p-0"
  }, tabGroups({
    properties: properties,
    groups: uiSchema["ui:tabs"],
    props: props
  })));
}
var REST = /*#__PURE__*/Symbol("REST");
var EXTRANEOUS = /*#__PURE__*/Symbol("EXTRANEOUS");
function tabGroups(_ref) {
  var properties = _ref.properties,
    groups = _ref.groups,
    props = _ref.props;
  if (!Array.isArray(groups)) {
    return React__default["default"].createElement(React__default["default"].Fragment, null, properties.map(function (element, index) {
      return React__default["default"].createElement("div", {
        key: index,
        className: element.hidden ? "hidden" : "mb-5"
      }, element.content);
    }));
  }
  var mapped = groups.map(function (g, key) {
    if (typeof g === "string") {
      var found = properties.filter(function (p) {
        return p.name === g;
      });
      if (found.length === 1) {
        var el = found[0];
        return el.content;
      }
      return EXTRANEOUS;
    } else if (typeof g === "object") {
      var _properties = Object.keys(g).reduce(function (acc, key) {
        var field = g[key];
        if (key.startsWith("ui:")) return acc;
        if (!Array.isArray(field)) return acc;
        return [].concat(acc, [{
          name: key,
          children: tabGroups({
            properties: properties,
            props: props,
            groups: field
          })
        }]);
      }, []);
      return React__default["default"].createElement(TabsTemplate, {
        key: key,
        properties: _properties
      });
    }
    throw new Error("Invalid object type: " + typeof g + " " + g);
  });
  var remainder = mapped.filter(function (m) {
    return m === REST;
  });
  if (remainder.length > 0) {
    throw new Error("Remainder fields not supported");
  }
  var extraneous = mapped.filter(function (m) {
    return m === EXTRANEOUS;
  });
  if (extraneous.length) {
    throw new Error("Extranoues fields" + extraneous);
  }
  return mapped;
}

function SubmitButton(props) {
  var _getSubmitButtonOptio = utils.getSubmitButtonOptions(props.uiSchema),
    submitText = _getSubmitButtonOptio.submitText,
    norender = _getSubmitButtonOptio.norender,
    submitButtonProps = _getSubmitButtonOptio.props;
  if (norender) {
    return null;
  }
  return React__default["default"].createElement("div", null, React__default["default"].createElement("button", _extends({
    type: "submit"
  }, submitButtonProps), submitText));
}

function TitleField(_ref) {
  var id = _ref.id,
    title = _ref.title,
    uiSchema = _ref.uiSchema;
  var uiOptions = utils.getUiOptions(uiSchema);
  return React__default["default"].createElement("div", {
    id: id,
    className: "mb-4"
  }, React__default["default"].createElement("h5", {
    className: "block mb-2 text-sm font-medium"
  }, uiOptions.title || title));
}

function WrapIfAdditionalTemplate(_ref) {
  var classNames = _ref.classNames,
    style = _ref.style,
    children = _ref.children,
    disabled = _ref.disabled,
    id = _ref.id,
    label = _ref.label,
    onDropPropertyClick = _ref.onDropPropertyClick,
    onKeyChange = _ref.onKeyChange,
    readonly = _ref.readonly,
    required = _ref.required,
    schema = _ref.schema,
    uiSchema = _ref.uiSchema,
    registry = _ref.registry;
  // Button templates are not overridden in the uiSchema
  var RemoveButton = registry.templates.ButtonTemplates.RemoveButton;
  var keyLabel = label + " Key"; // i18n ?
  var additional = (utils.ADDITIONAL_PROPERTY_FLAG in schema);
  if (!additional) {
    return React__default["default"].createElement("div", {
      className: classNames,
      style: style
    }, children);
  }
  return React__default["default"].createElement("div", {
    className: classNames,
    style: style
  }, React__default["default"].createElement("div", {
    className: "row"
  }, React__default["default"].createElement("div", {
    className: "col-xs-5 form-additional"
  }, React__default["default"].createElement("div", {
    className: "form-group"
  }, React__default["default"].createElement("label", {
    htmlFor: id + "-key"
  }, keyLabel), React__default["default"].createElement("input", {
    className: "form-control",
    required: required,
    type: "text",
    id: id + "-key",
    onBlur: function onBlur(event) {
      return onKeyChange(event.target.value);
    },
    defaultValue: label
  }))), React__default["default"].createElement("div", {
    className: "form-additional form-group col-xs-5"
  }, children), React__default["default"].createElement("div", {
    className: "col-xs-2"
  }, React__default["default"].createElement(RemoveButton, {
    className: "array-item-remove btn-block",
    style: {
      border: "0"
    },
    disabled: disabled || readonly,
    onClick: onDropPropertyClick(label),
    uiSchema: uiSchema,
    registry: registry
  }))));
}

function generateTemplates() {
  return {
    ArrayFieldTemplate: ArrayFieldTemplate,
    ArrayFieldItemTemplate: ArrayFieldItemTemplate,
    BaseInputTemplate: BaseInputTemplate,
    ButtonTemplates: {
      AddButton: AddButton,
      MoveDownButton: MoveDownButton,
      MoveUpButton: MoveUpButton,
      RemoveButton: RemoveButton,
      SubmitButton: SubmitButton
    },
    DescriptionFieldTemplate: DescriptionField,
    FieldErrorTemplate: FieldErrorTemplate,
    FieldTemplate: FieldTemplate,
    ObjectFieldTemplate: ObjectFieldTemplate,
    TitleFieldTemplate: TitleField,
    WrapIfAdditionalTemplate: WrapIfAdditionalTemplate
  };
}
var Templates = /*#__PURE__*/generateTemplates();

function FileWidget(props) {
  var options = props.options,
    registry = props.registry;
  var BaseInputTemplate = utils.getTemplate("BaseInputTemplate", registry, options);
  return React__default["default"].createElement(BaseInputTemplate, _extends({}, props, {
    type: "file"
  }));
}

/**
 * Return the fontId based on the provided font family
 */
function getFontId(fontFamily) {
  return fontFamily.replace(/\s+/g, "-").toLowerCase();
}
var FontPicker = /*#__PURE__*/function (_PureComponent) {
  _inheritsLoose(FontPicker, _PureComponent);
  // Instance of the FontManager class used for managing, downloading and applying fonts

  function FontPicker(props) {
    var _this;
    _this = _PureComponent.call(this, props) || this;
    _this.fontManager = void 0;
    _this.state = {
      expanded: false,
      loadingStatus: "loading"
    };
    _this.componentDidMount = function () {
      // Generate font list
      _this.fontManager.init().then(function () {
        _this.setState({
          loadingStatus: "finished"
        });
      })["catch"](function (err) {
        // On error: Log error message
        _this.setState({
          loadingStatus: "error"
        });
        console.error("Error trying to fetch the list of available fonts");
        console.error(err);
      });
    };
    _this.componentDidUpdate = function (prevProps) {
      var _this$props = _this.props,
        activeFontFamily = _this$props.activeFontFamily,
        onChange = _this$props.onChange;
      // If active font prop has changed: Update font family in font manager and component state
      if (activeFontFamily !== prevProps.activeFontFamily) {
        _this.setActiveFontFamily(activeFontFamily);
      }
      // If onChange prop has changed: Update onChange function in font manager
      if (onChange !== prevProps.onChange) {
        _this.fontManager.setOnChange(onChange);
      }
    };
    _this.onClose = function (e) {
      var targetEl = e.target; // Clicked element
      var fontPickerEl = document.getElementById("font-picker" + _this.fontManager.selectorSuffix);
      // eslint-disable-next-line no-constant-condition
      while (true) {
        if (targetEl === fontPickerEl) {
          // Click inside font picker: Exit
          return;
        }
        if (targetEl.parentNode) {
          // Click outside font picker: Move up the DOM
          targetEl = targetEl.parentNode;
        } else {
          // DOM root is reached: Toggle picker, exit
          _this.toggleExpanded();
          return;
        }
      }
    };
    _this.onSelection = function (e) {
      var target = e.target;
      var activeFontFamily = target.textContent;
      if (!activeFontFamily) {
        throw Error("Missing font family in clicked font button");
      }
      _this.setActiveFontFamily(activeFontFamily);
      _this.toggleExpanded();
    };
    _this.setActiveFontFamily = function (activeFontFamily) {
      _this.fontManager.setActiveFont(activeFontFamily);
    };
    _this.generateFontList = function (fonts) {
      var activeFontFamily = _this.props.activeFontFamily;
      var _this$state = _this.state,
        loadingStatus = _this$state.loadingStatus,
        expanded = _this$state.expanded;
      if (loadingStatus !== "finished") {
        return React__default["default"].createElement("div", null);
      }
      return React__default["default"].createElement("ul", {
        className: classnames__default["default"]("font-list !bg-white !rounded-md !border !border-slate-300 !shadow-sm !top-12", {
          "hidden": !expanded
        })
      }, fonts.map(function (font) {
        var isActive = font.family === activeFontFamily;
        var fontId = getFontId(font.family);
        return React__default["default"].createElement("li", {
          key: fontId,
          className: "font-list-item"
        }, React__default["default"].createElement("button", {
          type: "button",
          id: "font-button-" + fontId + _this.fontManager.selectorSuffix,
          className: classnames__default["default"]("font-button !text-[15px] hover:!bg-slate-100", {
            "!bg-slate-200": isActive
          }),
          onClick: _this.onSelection,
          onKeyPress: _this.onSelection
        }, font.family));
      }));
    };
    _this.toggleExpanded = function () {
      var expanded = _this.state.expanded;
      if (expanded) {
        _this.setState({
          expanded: false
        });
        document.removeEventListener("click", _this.onClose);
      } else {
        _this.setState({
          expanded: true
        });
        document.addEventListener("click", _this.onClose);
      }
    };
    _this.render = function () {
      var _this$props2 = _this.props,
        activeFontFamily = _this$props2.activeFontFamily,
        sort = _this$props2.sort;
      var _this$state2 = _this.state,
        expanded = _this$state2.expanded,
        loadingStatus = _this$state2.loadingStatus;
      console.log(loadingStatus);
      // Extract and sort font list
      var fonts = Array.from(_this.fontManager.getFonts().values());
      if (sort === "alphabet") {
        fonts.sort(function (font1, font2) {
          return font1.family.localeCompare(font2.family);
        });
      }
      // Render font picker button and attach font list to it
      return React__default["default"].createElement("div", {
        id: "font-picker" + _this.fontManager.selectorSuffix,
        className: classnames__default["default"]("!w-full !bg-transparent !rounded-md !border !border-slate-300 !shadow-sm", {
          "expanded": expanded
        })
      }, React__default["default"].createElement("button", {
        type: "button",
        className: "dropdown-button !h-[42px] !bg-white !rounded-md focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",
        onClick: _this.toggleExpanded,
        onKeyPress: _this.toggleExpanded
      }, React__default["default"].createElement("p", {
        className: "dropdown-font-family"
      }, activeFontFamily), React__default["default"].createElement("p", null, React__default["default"].createElement(solid.ChevronDownIcon, {
        className: "h-5 w-5 " + (expanded ? 'rotate-180 transform' : '')
      }))), loadingStatus === "finished" && _this.generateFontList(fonts));
    };
    var _this$props3 = _this.props,
      apiKey = _this$props3.apiKey,
      _activeFontFamily = _this$props3.activeFontFamily,
      pickerId = _this$props3.pickerId,
      families = _this$props3.families,
      categories = _this$props3.categories,
      scripts = _this$props3.scripts,
      variants = _this$props3.variants,
      filter = _this$props3.filter,
      limit = _this$props3.limit,
      _sort = _this$props3.sort,
      _onChange = _this$props3.onChange;
    var options = {
      pickerId: pickerId,
      families: families,
      categories: categories,
      scripts: scripts,
      variants: variants,
      filter: filter,
      limit: limit,
      sort: _sort
    };
    // Initialize FontManager object
    _this.fontManager = new fontManager.FontManager(apiKey, _activeFontFamily, options, _onChange);
    return _this;
  }
  return FontPicker;
}(React.PureComponent);
FontPicker.defaultProps = {
  activeFontFamily: fontManager.FONT_FAMILY_DEFAULT,
  onChange: function onChange() {},
  pickerId: fontManager.OPTIONS_DEFAULTS.pickerId,
  families: fontManager.OPTIONS_DEFAULTS.families,
  categories: fontManager.OPTIONS_DEFAULTS.categories,
  scripts: fontManager.OPTIONS_DEFAULTS.scripts,
  variants: fontManager.OPTIONS_DEFAULTS.variants,
  filter: fontManager.OPTIONS_DEFAULTS.filter,
  limit: fontManager.OPTIONS_DEFAULTS.limit,
  sort: fontManager.OPTIONS_DEFAULTS.sort
};

function FontsWidget(props) {
  var _onChange = props.onChange,
    value = props.value,
    id = props.id;
  var _useState = React.useState(value || "Inter"),
    activeFont = _useState[0],
    setActiveFont = _useState[1];
  var pickerId = id.replace(/[^a-z0-9]+/gi, "");
  return React__default["default"].createElement(React__default["default"].Fragment, null, React__default["default"].createElement(FontPicker, {
    apiKey: "AIzaSyD8KNrMxpVkc3bxqamNlkN4LZp6kqohlS8",
    activeFontFamily: activeFont,
    pickerId: pickerId,
    sort: "popularity",
    onChange: function onChange(nextFont) {
      setActiveFont(nextFont.family);
      _onChange(nextFont.family || undefined);
    }
  }));
}

function SelectWidget(_ref) {
  var schema = _ref.schema,
    id = _ref.id,
    options = _ref.options,
    required = _ref.required,
    disabled = _ref.disabled,
    readonly = _ref.readonly,
    value = _ref.value,
    multiple = _ref.multiple,
    autofocus = _ref.autofocus,
    _onChange = _ref.onChange,
    onBlur = _ref.onBlur,
    onFocus = _ref.onFocus,
    placeholder = _ref.placeholder,
    _ref$rawErrors = _ref.rawErrors,
    rawErrors = _ref$rawErrors === void 0 ? [] : _ref$rawErrors;
  var enumOptions = options.enumOptions,
    enumDisabled = options.enumDisabled,
    optEmptyValue = options.emptyValue;
  var emptyValue = multiple ? [] : "";
  function getValue(event, multiple) {
    if (multiple) {
      return [].slice.call(event.target.options).filter(function (o) {
        return o.selected;
      }).map(function (o) {
        return o.value;
      });
    } else {
      return event.target.value;
    }
  }
  var selectedIndexes = utils.enumOptionsIndexForValue(value, enumOptions, multiple);
  return React__default["default"].createElement("select", {
    id: id,
    name: id,
    value: typeof selectedIndexes === "undefined" ? emptyValue : selectedIndexes,
    required: required,
    multiple: multiple,
    disabled: disabled || readonly,
    autoFocus: autofocus,
    className: classnames__default["default"]("mt-1 block w-full text-[15px] rounded-md border-slate-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50", {
      "is-invalid": rawErrors.length > 0
    }),
    onBlur: onBlur && function (event) {
      var newValue = getValue(event, multiple);
      onBlur(id, utils.enumOptionsValueForIndex(newValue, enumOptions, optEmptyValue));
    },
    onFocus: onFocus && function (event) {
      var newValue = getValue(event, multiple);
      onFocus(id, utils.enumOptionsValueForIndex(newValue, enumOptions, optEmptyValue));
    },
    onChange: function onChange(event) {
      var newValue = getValue(event, multiple);
      _onChange(utils.enumOptionsValueForIndex(newValue, enumOptions, optEmptyValue));
    },
    "aria-describedby": utils.ariaDescribedByIds(id)
  }, !multiple && schema["default"] === undefined && React__default["default"].createElement("option", {
    value: ""
  }, placeholder), enumOptions.map(function (_ref2, i) {
    var value = _ref2.value,
      label = _ref2.label;
    var disabled = Array.isArray(enumDisabled) && enumDisabled.indexOf(value) != -1;
    return React__default["default"].createElement("option", {
      key: i,
      id: label,
      value: String(i),
      disabled: disabled
    }, label);
  }));
}

function TextareaWidget(_ref) {
  var id = _ref.id,
    placeholder = _ref.placeholder,
    value = _ref.value,
    required = _ref.required,
    disabled = _ref.disabled,
    autofocus = _ref.autofocus,
    readonly = _ref.readonly,
    onBlur = _ref.onBlur,
    onFocus = _ref.onFocus,
    onChange = _ref.onChange,
    options = _ref.options;
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
  return React__default["default"].createElement("textarea", {
    id: id,
    name: id,
    placeholder: placeholder,
    disabled: disabled,
    readOnly: readonly,
    value: value,
    required: required,
    autoFocus: autofocus,
    className: "mt-1 block w-full text-[15px] rounded-md border-slate-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",
    rows: options.rows || 5,
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus,
    "aria-describedby": utils.ariaDescribedByIds(id)
  });
}

function generateWidgets() {
  return {
    FileWidget: FileWidget,
    FontsWidget: FontsWidget,
    SelectWidget: SelectWidget,
    TextareaWidget: TextareaWidget
  };
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
