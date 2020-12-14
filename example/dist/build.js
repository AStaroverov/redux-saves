(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
  var __commonJS = (callback, module) => () => {
    if (!module) {
      module = {exports: {}};
      callback(module.exports, module);
    }
    return module.exports;
  };
  var __export = (target, all) => {
    __markAsModule(target);
    for (var name in all)
      __defProp(target, name, {get: all[name], enumerable: true});
  };
  var __exportStar = (target, module, desc) => {
    __markAsModule(target);
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
    }
    return target;
  };
  var __toModule = (module) => {
    if (module && module.__esModule)
      return module;
    return __exportStar(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", {value: module, enumerable: true}), module);
  };

  // node_modules/symbol-observable/es/index.js
  var require_es = __commonJS((exports, module) => {
    __export(exports, {
      default: () => es_default2
    });
    var root;
    if (typeof self !== "undefined") {
      root = self;
    } else if (typeof window !== "undefined") {
      root = window;
    } else if (typeof global !== "undefined") {
      root = global;
    } else if (typeof module !== "undefined") {
      root = module;
    } else {
      root = Function("return this")();
    }
    var result = symbolObservablePonyfill(root);
    var es_default2 = result;
  });

  // node_modules/@babel/runtime/helpers/esm/extends.js
  function _extends() {
    _extends = Object.assign || function(target) {
      for (var i2 = 1; i2 < arguments.length; i2++) {
        var source = arguments[i2];
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

  // node_modules/is-in-browser/dist/module.js
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };
  var isBrowser = (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" && (typeof document === "undefined" ? "undefined" : _typeof(document)) === "object" && document.nodeType === 9;
  var module_default = isBrowser;

  // node_modules/tiny-warning/dist/tiny-warning.esm.js
  var isProduction = false;
  function warning(condition, message) {
    if (!isProduction) {
      if (condition) {
        return;
      }
      var text2 = "Warning: " + message;
      if (typeof console !== "undefined") {
        console.warn(text2);
      }
      try {
        throw Error(text2);
      } catch (x2) {
      }
    }
  }
  var tiny_warning_esm_default = warning;

  // node_modules/@babel/runtime/helpers/esm/createClass.js
  function _defineProperties(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  // node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  // node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
  function _assertThisInitialized(self4) {
    if (self4 === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self4;
  }

  // node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null)
      return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i2;
    for (i2 = 0; i2 < sourceKeys.length; i2++) {
      key = sourceKeys[i2];
      if (excluded.indexOf(key) >= 0)
        continue;
      target[key] = source[key];
    }
    return target;
  }

  // node_modules/jss/dist/jss.esm.js
  var plainObjectConstrurctor = {}.constructor;
  function cloneStyle(style) {
    if (style == null || typeof style !== "object")
      return style;
    if (Array.isArray(style))
      return style.map(cloneStyle);
    if (style.constructor !== plainObjectConstrurctor)
      return style;
    var newStyle = {};
    for (var name in style) {
      newStyle[name] = cloneStyle(style[name]);
    }
    return newStyle;
  }
  function createRule(name, decl, options) {
    if (name === void 0) {
      name = "unnamed";
    }
    var jss9 = options.jss;
    var declCopy = cloneStyle(decl);
    var rule = jss9.plugins.onCreateRule(name, declCopy, options);
    if (rule)
      return rule;
    if (name[0] === "@") {
      tiny_warning_esm_default(false, "[JSS] Unknown rule " + name);
    }
    return null;
  }
  var join = function join2(value, by) {
    var result = "";
    for (var i2 = 0; i2 < value.length; i2++) {
      if (value[i2] === "!important")
        break;
      if (result)
        result += by;
      result += value[i2];
    }
    return result;
  };
  var toCssValue = function toCssValue2(value, ignoreImportant) {
    if (ignoreImportant === void 0) {
      ignoreImportant = false;
    }
    if (!Array.isArray(value))
      return value;
    var cssValue = "";
    if (Array.isArray(value[0])) {
      for (var i2 = 0; i2 < value.length; i2++) {
        if (value[i2] === "!important")
          break;
        if (cssValue)
          cssValue += ", ";
        cssValue += join(value[i2], " ");
      }
    } else
      cssValue = join(value, ", ");
    if (!ignoreImportant && value[value.length - 1] === "!important") {
      cssValue += " !important";
    }
    return cssValue;
  };
  function indentStr(str, indent) {
    var result = "";
    for (var index = 0; index < indent; index++) {
      result += "  ";
    }
    return result + str;
  }
  function toCss(selector, style, options) {
    if (options === void 0) {
      options = {};
    }
    var result = "";
    if (!style)
      return result;
    var _options = options, _options$indent = _options.indent, indent = _options$indent === void 0 ? 0 : _options$indent;
    var fallbacks = style.fallbacks;
    if (selector)
      indent++;
    if (fallbacks) {
      if (Array.isArray(fallbacks)) {
        for (var index = 0; index < fallbacks.length; index++) {
          var fallback = fallbacks[index];
          for (var prop in fallback) {
            var value = fallback[prop];
            if (value != null) {
              if (result)
                result += "\n";
              result += "" + indentStr(prop + ": " + toCssValue(value) + ";", indent);
            }
          }
        }
      } else {
        for (var _prop in fallbacks) {
          var _value = fallbacks[_prop];
          if (_value != null) {
            if (result)
              result += "\n";
            result += "" + indentStr(_prop + ": " + toCssValue(_value) + ";", indent);
          }
        }
      }
    }
    for (var _prop2 in style) {
      var _value2 = style[_prop2];
      if (_value2 != null && _prop2 !== "fallbacks") {
        if (result)
          result += "\n";
        result += "" + indentStr(_prop2 + ": " + toCssValue(_value2) + ";", indent);
      }
    }
    if (!result && !options.allowEmpty)
      return result;
    if (!selector)
      return result;
    indent--;
    if (result)
      result = "\n" + result + "\n";
    return indentStr(selector + " {" + result, indent) + indentStr("}", indent);
  }
  var escapeRegex = /([[\].#*$><+~=|^:(),"'`\s])/g;
  var nativeEscape = typeof CSS !== "undefined" && CSS.escape;
  var escape = function(str) {
    return nativeEscape ? nativeEscape(str) : str.replace(escapeRegex, "\\$1");
  };
  var BaseStyleRule = /* @__PURE__ */ function() {
    function BaseStyleRule2(key, style, options) {
      this.type = "style";
      this.key = void 0;
      this.isProcessed = false;
      this.style = void 0;
      this.renderer = void 0;
      this.renderable = void 0;
      this.options = void 0;
      var sheet = options.sheet, Renderer = options.Renderer;
      this.key = key;
      this.options = options;
      this.style = style;
      if (sheet)
        this.renderer = sheet.renderer;
      else if (Renderer)
        this.renderer = new Renderer();
    }
    var _proto = BaseStyleRule2.prototype;
    _proto.prop = function prop(name, value, options) {
      if (value === void 0)
        return this.style[name];
      var force = options ? options.force : false;
      if (!force && this.style[name] === value)
        return this;
      var newValue = value;
      if (!options || options.process !== false) {
        newValue = this.options.jss.plugins.onChangeValue(value, name, this);
      }
      var isEmpty = newValue == null || newValue === false;
      var isDefined = name in this.style;
      if (isEmpty && !isDefined && !force)
        return this;
      var remove2 = isEmpty && isDefined;
      if (remove2)
        delete this.style[name];
      else
        this.style[name] = newValue;
      if (this.renderable && this.renderer) {
        if (remove2)
          this.renderer.removeProperty(this.renderable, name);
        else
          this.renderer.setProperty(this.renderable, name, newValue);
        return this;
      }
      var sheet = this.options.sheet;
      if (sheet && sheet.attached) {
        tiny_warning_esm_default(false, '[JSS] Rule is not linked. Missing sheet option "link: true".');
      }
      return this;
    };
    return BaseStyleRule2;
  }();
  var StyleRule = /* @__PURE__ */ function(_BaseStyleRule) {
    _inheritsLoose(StyleRule2, _BaseStyleRule);
    function StyleRule2(key, style, options) {
      var _this;
      _this = _BaseStyleRule.call(this, key, style, options) || this;
      _this.selectorText = void 0;
      _this.id = void 0;
      _this.renderable = void 0;
      var selector = options.selector, scoped = options.scoped, sheet = options.sheet, generateId = options.generateId;
      if (selector) {
        _this.selectorText = selector;
      } else if (scoped !== false) {
        _this.id = generateId(_assertThisInitialized(_assertThisInitialized(_this)), sheet);
        _this.selectorText = "." + escape(_this.id);
      }
      return _this;
    }
    var _proto2 = StyleRule2.prototype;
    _proto2.applyTo = function applyTo(renderable) {
      var renderer = this.renderer;
      if (renderer) {
        var json = this.toJSON();
        for (var prop in json) {
          renderer.setProperty(renderable, prop, json[prop]);
        }
      }
      return this;
    };
    _proto2.toJSON = function toJSON() {
      var json = {};
      for (var prop in this.style) {
        var value = this.style[prop];
        if (typeof value !== "object")
          json[prop] = value;
        else if (Array.isArray(value))
          json[prop] = toCssValue(value);
      }
      return json;
    };
    _proto2.toString = function toString(options) {
      var sheet = this.options.sheet;
      var link = sheet ? sheet.options.link : false;
      var opts = link ? _extends({}, options, {
        allowEmpty: true
      }) : options;
      return toCss(this.selectorText, this.style, opts);
    };
    _createClass(StyleRule2, [{
      key: "selector",
      set: function set(selector) {
        if (selector === this.selectorText)
          return;
        this.selectorText = selector;
        var renderer = this.renderer, renderable = this.renderable;
        if (!renderable || !renderer)
          return;
        var hasChanged = renderer.setSelector(renderable, selector);
        if (!hasChanged) {
          renderer.replaceRule(renderable, this);
        }
      },
      get: function get() {
        return this.selectorText;
      }
    }]);
    return StyleRule2;
  }(BaseStyleRule);
  var pluginStyleRule = {
    onCreateRule: function onCreateRule(name, style, options) {
      if (name[0] === "@" || options.parent && options.parent.type === "keyframes") {
        return null;
      }
      return new StyleRule(name, style, options);
    }
  };
  var defaultToStringOptions = {
    indent: 1,
    children: true
  };
  var atRegExp = /@([\w-]+)/;
  var ConditionalRule = /* @__PURE__ */ function() {
    function ConditionalRule2(key, styles4, options) {
      this.type = "conditional";
      this.at = void 0;
      this.key = void 0;
      this.query = void 0;
      this.rules = void 0;
      this.options = void 0;
      this.isProcessed = false;
      this.renderable = void 0;
      this.key = key;
      var atMatch = key.match(atRegExp);
      this.at = atMatch ? atMatch[1] : "unknown";
      this.query = options.name || "@" + this.at;
      this.options = options;
      this.rules = new RuleList(_extends({}, options, {
        parent: this
      }));
      for (var name in styles4) {
        this.rules.add(name, styles4[name]);
      }
      this.rules.process();
    }
    var _proto = ConditionalRule2.prototype;
    _proto.getRule = function getRule(name) {
      return this.rules.get(name);
    };
    _proto.indexOf = function indexOf2(rule) {
      return this.rules.indexOf(rule);
    };
    _proto.addRule = function addRule(name, style, options) {
      var rule = this.rules.add(name, style, options);
      if (!rule)
        return null;
      this.options.jss.plugins.onProcessRule(rule);
      return rule;
    };
    _proto.toString = function toString(options) {
      if (options === void 0) {
        options = defaultToStringOptions;
      }
      if (options.indent == null)
        options.indent = defaultToStringOptions.indent;
      if (options.children == null)
        options.children = defaultToStringOptions.children;
      if (options.children === false) {
        return this.query + " {}";
      }
      var children = this.rules.toString(options);
      return children ? this.query + " {\n" + children + "\n}" : "";
    };
    return ConditionalRule2;
  }();
  var keyRegExp = /@media|@supports\s+/;
  var pluginConditionalRule = {
    onCreateRule: function onCreateRule2(key, styles4, options) {
      return keyRegExp.test(key) ? new ConditionalRule(key, styles4, options) : null;
    }
  };
  var defaultToStringOptions$1 = {
    indent: 1,
    children: true
  };
  var nameRegExp = /@keyframes\s+([\w-]+)/;
  var KeyframesRule = /* @__PURE__ */ function() {
    function KeyframesRule2(key, frames, options) {
      this.type = "keyframes";
      this.at = "@keyframes";
      this.key = void 0;
      this.name = void 0;
      this.id = void 0;
      this.rules = void 0;
      this.options = void 0;
      this.isProcessed = false;
      this.renderable = void 0;
      var nameMatch = key.match(nameRegExp);
      if (nameMatch && nameMatch[1]) {
        this.name = nameMatch[1];
      } else {
        this.name = "noname";
        tiny_warning_esm_default(false, "[JSS] Bad keyframes name " + key);
      }
      this.key = this.type + "-" + this.name;
      this.options = options;
      var scoped = options.scoped, sheet = options.sheet, generateId = options.generateId;
      this.id = scoped === false ? this.name : escape(generateId(this, sheet));
      this.rules = new RuleList(_extends({}, options, {
        parent: this
      }));
      for (var name in frames) {
        this.rules.add(name, frames[name], _extends({}, options, {
          parent: this
        }));
      }
      this.rules.process();
    }
    var _proto = KeyframesRule2.prototype;
    _proto.toString = function toString(options) {
      if (options === void 0) {
        options = defaultToStringOptions$1;
      }
      if (options.indent == null)
        options.indent = defaultToStringOptions$1.indent;
      if (options.children == null)
        options.children = defaultToStringOptions$1.children;
      if (options.children === false) {
        return this.at + " " + this.id + " {}";
      }
      var children = this.rules.toString(options);
      if (children)
        children = "\n" + children + "\n";
      return this.at + " " + this.id + " {" + children + "}";
    };
    return KeyframesRule2;
  }();
  var keyRegExp$1 = /@keyframes\s+/;
  var refRegExp = /\$([\w-]+)/g;
  var findReferencedKeyframe = function findReferencedKeyframe2(val, keyframes) {
    if (typeof val === "string") {
      return val.replace(refRegExp, function(match, name) {
        if (name in keyframes) {
          return keyframes[name];
        }
        tiny_warning_esm_default(false, '[JSS] Referenced keyframes rule "' + name + '" is not defined.');
        return match;
      });
    }
    return val;
  };
  var replaceRef = function replaceRef2(style, prop, keyframes) {
    var value = style[prop];
    var refKeyframe = findReferencedKeyframe(value, keyframes);
    if (refKeyframe !== value) {
      style[prop] = refKeyframe;
    }
  };
  var plugin = {
    onCreateRule: function onCreateRule3(key, frames, options) {
      return typeof key === "string" && keyRegExp$1.test(key) ? new KeyframesRule(key, frames, options) : null;
    },
    onProcessStyle: function onProcessStyle(style, rule, sheet) {
      if (rule.type !== "style" || !sheet)
        return style;
      if ("animation-name" in style)
        replaceRef(style, "animation-name", sheet.keyframes);
      if ("animation" in style)
        replaceRef(style, "animation", sheet.keyframes);
      return style;
    },
    onChangeValue: function onChangeValue(val, prop, rule) {
      var sheet = rule.options.sheet;
      if (!sheet) {
        return val;
      }
      switch (prop) {
        case "animation":
          return findReferencedKeyframe(val, sheet.keyframes);
        case "animation-name":
          return findReferencedKeyframe(val, sheet.keyframes);
        default:
          return val;
      }
    }
  };
  var KeyframeRule = /* @__PURE__ */ function(_BaseStyleRule) {
    _inheritsLoose(KeyframeRule2, _BaseStyleRule);
    function KeyframeRule2() {
      var _this;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _BaseStyleRule.call.apply(_BaseStyleRule, [this].concat(args)) || this;
      _this.renderable = void 0;
      return _this;
    }
    var _proto = KeyframeRule2.prototype;
    _proto.toString = function toString(options) {
      var sheet = this.options.sheet;
      var link = sheet ? sheet.options.link : false;
      var opts = link ? _extends({}, options, {
        allowEmpty: true
      }) : options;
      return toCss(this.key, this.style, opts);
    };
    return KeyframeRule2;
  }(BaseStyleRule);
  var pluginKeyframeRule = {
    onCreateRule: function onCreateRule4(key, style, options) {
      if (options.parent && options.parent.type === "keyframes") {
        return new KeyframeRule(key, style, options);
      }
      return null;
    }
  };
  var FontFaceRule = /* @__PURE__ */ function() {
    function FontFaceRule2(key, style, options) {
      this.type = "font-face";
      this.at = "@font-face";
      this.key = void 0;
      this.style = void 0;
      this.options = void 0;
      this.isProcessed = false;
      this.renderable = void 0;
      this.key = key;
      this.style = style;
      this.options = options;
    }
    var _proto = FontFaceRule2.prototype;
    _proto.toString = function toString(options) {
      if (Array.isArray(this.style)) {
        var str = "";
        for (var index = 0; index < this.style.length; index++) {
          str += toCss(this.at, this.style[index]);
          if (this.style[index + 1])
            str += "\n";
        }
        return str;
      }
      return toCss(this.at, this.style, options);
    };
    return FontFaceRule2;
  }();
  var keyRegExp$2 = /@font-face/;
  var pluginFontFaceRule = {
    onCreateRule: function onCreateRule5(key, style, options) {
      return keyRegExp$2.test(key) ? new FontFaceRule(key, style, options) : null;
    }
  };
  var ViewportRule = /* @__PURE__ */ function() {
    function ViewportRule2(key, style, options) {
      this.type = "viewport";
      this.at = "@viewport";
      this.key = void 0;
      this.style = void 0;
      this.options = void 0;
      this.isProcessed = false;
      this.renderable = void 0;
      this.key = key;
      this.style = style;
      this.options = options;
    }
    var _proto = ViewportRule2.prototype;
    _proto.toString = function toString(options) {
      return toCss(this.key, this.style, options);
    };
    return ViewportRule2;
  }();
  var pluginViewportRule = {
    onCreateRule: function onCreateRule6(key, style, options) {
      return key === "@viewport" || key === "@-ms-viewport" ? new ViewportRule(key, style, options) : null;
    }
  };
  var SimpleRule = /* @__PURE__ */ function() {
    function SimpleRule2(key, value, options) {
      this.type = "simple";
      this.key = void 0;
      this.value = void 0;
      this.options = void 0;
      this.isProcessed = false;
      this.renderable = void 0;
      this.key = key;
      this.value = value;
      this.options = options;
    }
    var _proto = SimpleRule2.prototype;
    _proto.toString = function toString(options) {
      if (Array.isArray(this.value)) {
        var str = "";
        for (var index = 0; index < this.value.length; index++) {
          str += this.key + " " + this.value[index] + ";";
          if (this.value[index + 1])
            str += "\n";
        }
        return str;
      }
      return this.key + " " + this.value + ";";
    };
    return SimpleRule2;
  }();
  var keysMap = {
    "@charset": true,
    "@import": true,
    "@namespace": true
  };
  var pluginSimpleRule = {
    onCreateRule: function onCreateRule7(key, value, options) {
      return key in keysMap ? new SimpleRule(key, value, options) : null;
    }
  };
  var plugins = [pluginStyleRule, pluginConditionalRule, plugin, pluginKeyframeRule, pluginFontFaceRule, pluginViewportRule, pluginSimpleRule];
  var defaultUpdateOptions = {
    process: true
  };
  var forceUpdateOptions = {
    force: true,
    process: true
  };
  var RuleList = /* @__PURE__ */ function() {
    function RuleList2(options) {
      this.map = {};
      this.raw = {};
      this.index = [];
      this.counter = 0;
      this.options = void 0;
      this.classes = void 0;
      this.keyframes = void 0;
      this.options = options;
      this.classes = options.classes;
      this.keyframes = options.keyframes;
    }
    var _proto = RuleList2.prototype;
    _proto.add = function add(name, decl, ruleOptions) {
      var _this$options = this.options, parent = _this$options.parent, sheet = _this$options.sheet, jss9 = _this$options.jss, Renderer = _this$options.Renderer, generateId = _this$options.generateId, scoped = _this$options.scoped;
      var options = _extends({
        classes: this.classes,
        parent,
        sheet,
        jss: jss9,
        Renderer,
        generateId,
        scoped,
        name,
        keyframes: this.keyframes,
        selector: void 0
      }, ruleOptions);
      var key = name;
      if (name in this.raw) {
        key = name + "-d" + this.counter++;
      }
      this.raw[key] = decl;
      if (key in this.classes) {
        options.selector = "." + escape(this.classes[key]);
      }
      var rule = createRule(key, decl, options);
      if (!rule)
        return null;
      this.register(rule);
      var index = options.index === void 0 ? this.index.length : options.index;
      this.index.splice(index, 0, rule);
      return rule;
    };
    _proto.get = function get(name) {
      return this.map[name];
    };
    _proto.remove = function remove2(rule) {
      this.unregister(rule);
      delete this.raw[rule.key];
      this.index.splice(this.index.indexOf(rule), 1);
    };
    _proto.indexOf = function indexOf2(rule) {
      return this.index.indexOf(rule);
    };
    _proto.process = function process2() {
      var plugins3 = this.options.jss.plugins;
      this.index.slice(0).forEach(plugins3.onProcessRule, plugins3);
    };
    _proto.register = function register(rule) {
      this.map[rule.key] = rule;
      if (rule instanceof StyleRule) {
        this.map[rule.selector] = rule;
        if (rule.id)
          this.classes[rule.key] = rule.id;
      } else if (rule instanceof KeyframesRule && this.keyframes) {
        this.keyframes[rule.name] = rule.id;
      }
    };
    _proto.unregister = function unregister(rule) {
      delete this.map[rule.key];
      if (rule instanceof StyleRule) {
        delete this.map[rule.selector];
        delete this.classes[rule.key];
      } else if (rule instanceof KeyframesRule) {
        delete this.keyframes[rule.name];
      }
    };
    _proto.update = function update2() {
      var name;
      var data2;
      var options;
      if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) === "string") {
        name = arguments.length <= 0 ? void 0 : arguments[0];
        data2 = arguments.length <= 1 ? void 0 : arguments[1];
        options = arguments.length <= 2 ? void 0 : arguments[2];
      } else {
        data2 = arguments.length <= 0 ? void 0 : arguments[0];
        options = arguments.length <= 1 ? void 0 : arguments[1];
        name = null;
      }
      if (name) {
        this.updateOne(this.map[name], data2, options);
      } else {
        for (var index = 0; index < this.index.length; index++) {
          this.updateOne(this.index[index], data2, options);
        }
      }
    };
    _proto.updateOne = function updateOne(rule, data2, options) {
      if (options === void 0) {
        options = defaultUpdateOptions;
      }
      var _this$options2 = this.options, plugins3 = _this$options2.jss.plugins, sheet = _this$options2.sheet;
      if (rule.rules instanceof RuleList2) {
        rule.rules.update(data2, options);
        return;
      }
      var styleRule = rule;
      var style = styleRule.style;
      plugins3.onUpdate(data2, rule, sheet, options);
      if (options.process && style && style !== styleRule.style) {
        plugins3.onProcessStyle(styleRule.style, styleRule, sheet);
        for (var prop in styleRule.style) {
          var nextValue = styleRule.style[prop];
          var prevValue = style[prop];
          if (nextValue !== prevValue) {
            styleRule.prop(prop, nextValue, forceUpdateOptions);
          }
        }
        for (var _prop in style) {
          var _nextValue = styleRule.style[_prop];
          var _prevValue = style[_prop];
          if (_nextValue == null && _nextValue !== _prevValue) {
            styleRule.prop(_prop, null, forceUpdateOptions);
          }
        }
      }
    };
    _proto.toString = function toString(options) {
      var str = "";
      var sheet = this.options.sheet;
      var link = sheet ? sheet.options.link : false;
      for (var index = 0; index < this.index.length; index++) {
        var rule = this.index[index];
        var css2 = rule.toString(options);
        if (!css2 && !link)
          continue;
        if (str)
          str += "\n";
        str += css2;
      }
      return str;
    };
    return RuleList2;
  }();
  var StyleSheet = /* @__PURE__ */ function() {
    function StyleSheet3(styles4, options) {
      this.options = void 0;
      this.deployed = void 0;
      this.attached = void 0;
      this.rules = void 0;
      this.renderer = void 0;
      this.classes = void 0;
      this.keyframes = void 0;
      this.queue = void 0;
      this.attached = false;
      this.deployed = false;
      this.classes = {};
      this.keyframes = {};
      this.options = _extends({}, options, {
        sheet: this,
        parent: this,
        classes: this.classes,
        keyframes: this.keyframes
      });
      if (options.Renderer) {
        this.renderer = new options.Renderer(this);
      }
      this.rules = new RuleList(this.options);
      for (var name in styles4) {
        this.rules.add(name, styles4[name]);
      }
      this.rules.process();
    }
    var _proto = StyleSheet3.prototype;
    _proto.attach = function attach() {
      if (this.attached)
        return this;
      if (this.renderer)
        this.renderer.attach();
      this.attached = true;
      if (!this.deployed)
        this.deploy();
      return this;
    };
    _proto.detach = function detach() {
      if (!this.attached)
        return this;
      if (this.renderer)
        this.renderer.detach();
      this.attached = false;
      return this;
    };
    _proto.addRule = function addRule(name, decl, options) {
      var queue = this.queue;
      if (this.attached && !queue)
        this.queue = [];
      var rule = this.rules.add(name, decl, options);
      if (!rule)
        return null;
      this.options.jss.plugins.onProcessRule(rule);
      if (this.attached) {
        if (!this.deployed)
          return rule;
        if (queue)
          queue.push(rule);
        else {
          this.insertRule(rule);
          if (this.queue) {
            this.queue.forEach(this.insertRule, this);
            this.queue = void 0;
          }
        }
        return rule;
      }
      this.deployed = false;
      return rule;
    };
    _proto.insertRule = function insertRule2(rule) {
      if (this.renderer) {
        this.renderer.insertRule(rule);
      }
    };
    _proto.addRules = function addRules(styles4, options) {
      var added = [];
      for (var name in styles4) {
        var rule = this.addRule(name, styles4[name], options);
        if (rule)
          added.push(rule);
      }
      return added;
    };
    _proto.getRule = function getRule(name) {
      return this.rules.get(name);
    };
    _proto.deleteRule = function deleteRule(name) {
      var rule = typeof name === "object" ? name : this.rules.get(name);
      if (!rule || this.attached && !rule.renderable) {
        return false;
      }
      this.rules.remove(rule);
      if (this.attached && rule.renderable && this.renderer) {
        return this.renderer.deleteRule(rule.renderable);
      }
      return true;
    };
    _proto.indexOf = function indexOf2(rule) {
      return this.rules.indexOf(rule);
    };
    _proto.deploy = function deploy() {
      if (this.renderer)
        this.renderer.deploy();
      this.deployed = true;
      return this;
    };
    _proto.update = function update2() {
      var _this$rules;
      (_this$rules = this.rules).update.apply(_this$rules, arguments);
      return this;
    };
    _proto.updateOne = function updateOne(rule, data2, options) {
      this.rules.updateOne(rule, data2, options);
      return this;
    };
    _proto.toString = function toString(options) {
      return this.rules.toString(options);
    };
    return StyleSheet3;
  }();
  var PluginsRegistry = /* @__PURE__ */ function() {
    function PluginsRegistry2() {
      this.plugins = {
        internal: [],
        external: []
      };
      this.registry = void 0;
    }
    var _proto = PluginsRegistry2.prototype;
    _proto.onCreateRule = function onCreateRule8(name, decl, options) {
      for (var i2 = 0; i2 < this.registry.onCreateRule.length; i2++) {
        var rule = this.registry.onCreateRule[i2](name, decl, options);
        if (rule)
          return rule;
      }
      return null;
    };
    _proto.onProcessRule = function onProcessRule3(rule) {
      if (rule.isProcessed)
        return;
      var sheet = rule.options.sheet;
      for (var i2 = 0; i2 < this.registry.onProcessRule.length; i2++) {
        this.registry.onProcessRule[i2](rule, sheet);
      }
      if (rule.style)
        this.onProcessStyle(rule.style, rule, sheet);
      rule.isProcessed = true;
    };
    _proto.onProcessStyle = function onProcessStyle2(style, rule, sheet) {
      for (var i2 = 0; i2 < this.registry.onProcessStyle.length; i2++) {
        rule.style = this.registry.onProcessStyle[i2](rule.style, rule, sheet);
      }
    };
    _proto.onProcessSheet = function onProcessSheet(sheet) {
      for (var i2 = 0; i2 < this.registry.onProcessSheet.length; i2++) {
        this.registry.onProcessSheet[i2](sheet);
      }
    };
    _proto.onUpdate = function onUpdate(data2, rule, sheet, options) {
      for (var i2 = 0; i2 < this.registry.onUpdate.length; i2++) {
        this.registry.onUpdate[i2](data2, rule, sheet, options);
      }
    };
    _proto.onChangeValue = function onChangeValue2(value, prop, rule) {
      var processedValue = value;
      for (var i2 = 0; i2 < this.registry.onChangeValue.length; i2++) {
        processedValue = this.registry.onChangeValue[i2](processedValue, prop, rule);
      }
      return processedValue;
    };
    _proto.use = function use(newPlugin, options) {
      if (options === void 0) {
        options = {
          queue: "external"
        };
      }
      var plugins3 = this.plugins[options.queue];
      if (plugins3.indexOf(newPlugin) !== -1) {
        return;
      }
      plugins3.push(newPlugin);
      this.registry = [].concat(this.plugins.external, this.plugins.internal).reduce(function(registry2, plugin2) {
        for (var name in plugin2) {
          if (name in registry2) {
            registry2[name].push(plugin2[name]);
          } else {
            tiny_warning_esm_default(false, '[JSS] Unknown hook "' + name + '".');
          }
        }
        return registry2;
      }, {
        onCreateRule: [],
        onProcessRule: [],
        onProcessStyle: [],
        onProcessSheet: [],
        onChangeValue: [],
        onUpdate: []
      });
    };
    return PluginsRegistry2;
  }();
  var SheetsRegistry = /* @__PURE__ */ function() {
    function SheetsRegistry2() {
      this.registry = [];
    }
    var _proto = SheetsRegistry2.prototype;
    _proto.add = function add(sheet) {
      var registry2 = this.registry;
      var index = sheet.options.index;
      if (registry2.indexOf(sheet) !== -1)
        return;
      if (registry2.length === 0 || index >= this.index) {
        registry2.push(sheet);
        return;
      }
      for (var i2 = 0; i2 < registry2.length; i2++) {
        if (registry2[i2].options.index > index) {
          registry2.splice(i2, 0, sheet);
          return;
        }
      }
    };
    _proto.reset = function reset() {
      this.registry = [];
    };
    _proto.remove = function remove2(sheet) {
      var index = this.registry.indexOf(sheet);
      this.registry.splice(index, 1);
    };
    _proto.toString = function toString(_temp) {
      var _ref = _temp === void 0 ? {} : _temp, attached = _ref.attached, options = _objectWithoutPropertiesLoose(_ref, ["attached"]);
      var css2 = "";
      for (var i2 = 0; i2 < this.registry.length; i2++) {
        var sheet = this.registry[i2];
        if (attached != null && sheet.attached !== attached) {
          continue;
        }
        if (css2)
          css2 += "\n";
        css2 += sheet.toString(options);
      }
      return css2;
    };
    _createClass(SheetsRegistry2, [{
      key: "index",
      get: function get() {
        return this.registry.length === 0 ? 0 : this.registry[this.registry.length - 1].options.index;
      }
    }]);
    return SheetsRegistry2;
  }();
  var registry = new SheetsRegistry();
  var globalThis = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
  var ns = "2f1acc6c3a606b082e5eef5e54414ffb";
  if (globalThis[ns] == null)
    globalThis[ns] = 0;
  var moduleId = globalThis[ns]++;
  var maxRules = 1e10;
  var createGenerateId = function createGenerateId2(options) {
    if (options === void 0) {
      options = {};
    }
    var ruleCounter = 0;
    return function(rule, sheet) {
      ruleCounter += 1;
      if (ruleCounter > maxRules) {
        tiny_warning_esm_default(false, "[JSS] You might have a memory leak. Rule counter is at " + ruleCounter + ".");
      }
      var jssId = "";
      var prefix4 = "";
      if (sheet) {
        if (sheet.options.classNamePrefix) {
          prefix4 = sheet.options.classNamePrefix;
        }
        if (sheet.options.jss.id != null) {
          jssId = String(sheet.options.jss.id);
        }
      }
      if (options.minify) {
        return "" + (prefix4 || "c") + moduleId + jssId + ruleCounter;
      }
      return prefix4 + rule.key + "-" + moduleId + (jssId ? "-" + jssId : "") + "-" + ruleCounter;
    };
  };
  var memoize = function memoize2(fn2) {
    var value;
    return function() {
      if (!value)
        value = fn2();
      return value;
    };
  };
  var getPropertyValue = function getPropertyValue2(cssRule, prop) {
    try {
      if (cssRule.attributeStyleMap) {
        return cssRule.attributeStyleMap.get(prop);
      }
      return cssRule.style.getPropertyValue(prop);
    } catch (err) {
      return "";
    }
  };
  var setProperty = function setProperty2(cssRule, prop, value) {
    try {
      var cssValue = value;
      if (Array.isArray(value)) {
        cssValue = toCssValue(value, true);
        if (value[value.length - 1] === "!important") {
          cssRule.style.setProperty(prop, cssValue, "important");
          return true;
        }
      }
      if (cssRule.attributeStyleMap) {
        cssRule.attributeStyleMap.set(prop, cssValue);
      } else {
        cssRule.style.setProperty(prop, cssValue);
      }
    } catch (err) {
      return false;
    }
    return true;
  };
  var removeProperty = function removeProperty2(cssRule, prop) {
    try {
      if (cssRule.attributeStyleMap) {
        cssRule.attributeStyleMap.delete(prop);
      } else {
        cssRule.style.removeProperty(prop);
      }
    } catch (err) {
      tiny_warning_esm_default(false, '[JSS] DOMException "' + err.message + '" was thrown. Tried to remove property "' + prop + '".');
    }
  };
  var setSelector = function setSelector2(cssRule, selectorText) {
    cssRule.selectorText = selectorText;
    return cssRule.selectorText === selectorText;
  };
  var getHead = memoize(function() {
    return document.querySelector("head");
  });
  function findHigherSheet(registry2, options) {
    for (var i2 = 0; i2 < registry2.length; i2++) {
      var sheet = registry2[i2];
      if (sheet.attached && sheet.options.index > options.index && sheet.options.insertionPoint === options.insertionPoint) {
        return sheet;
      }
    }
    return null;
  }
  function findHighestSheet(registry2, options) {
    for (var i2 = registry2.length - 1; i2 >= 0; i2--) {
      var sheet = registry2[i2];
      if (sheet.attached && sheet.options.insertionPoint === options.insertionPoint) {
        return sheet;
      }
    }
    return null;
  }
  function findCommentNode(text2) {
    var head = getHead();
    for (var i2 = 0; i2 < head.childNodes.length; i2++) {
      var node4 = head.childNodes[i2];
      if (node4.nodeType === 8 && node4.nodeValue.trim() === text2) {
        return node4;
      }
    }
    return null;
  }
  function findPrevNode(options) {
    var registry$1 = registry.registry;
    if (registry$1.length > 0) {
      var sheet = findHigherSheet(registry$1, options);
      if (sheet && sheet.renderer) {
        return {
          parent: sheet.renderer.element.parentNode,
          node: sheet.renderer.element
        };
      }
      sheet = findHighestSheet(registry$1, options);
      if (sheet && sheet.renderer) {
        return {
          parent: sheet.renderer.element.parentNode,
          node: sheet.renderer.element.nextSibling
        };
      }
    }
    var insertionPoint = options.insertionPoint;
    if (insertionPoint && typeof insertionPoint === "string") {
      var comment = findCommentNode(insertionPoint);
      if (comment) {
        return {
          parent: comment.parentNode,
          node: comment.nextSibling
        };
      }
      tiny_warning_esm_default(false, '[JSS] Insertion point "' + insertionPoint + '" not found.');
    }
    return false;
  }
  function insertStyle(style, options) {
    var insertionPoint = options.insertionPoint;
    var nextNode = findPrevNode(options);
    if (nextNode !== false && nextNode.parent) {
      nextNode.parent.insertBefore(style, nextNode.node);
      return;
    }
    if (insertionPoint && typeof insertionPoint.nodeType === "number") {
      var insertionPointElement = insertionPoint;
      var parentNode = insertionPointElement.parentNode;
      if (parentNode)
        parentNode.insertBefore(style, insertionPointElement.nextSibling);
      else
        tiny_warning_esm_default(false, "[JSS] Insertion point is not in the DOM.");
      return;
    }
    getHead().appendChild(style);
  }
  var getNonce = memoize(function() {
    var node4 = document.querySelector('meta[property="csp-nonce"]');
    return node4 ? node4.getAttribute("content") : null;
  });
  var _insertRule = function insertRule(container, rule, index) {
    try {
      if ("insertRule" in container) {
        var c2 = container;
        c2.insertRule(rule, index);
      } else if ("appendRule" in container) {
        var _c = container;
        _c.appendRule(rule);
      }
    } catch (err) {
      tiny_warning_esm_default(false, "[JSS] " + err.message);
      return false;
    }
    return container.cssRules[index];
  };
  var getValidRuleInsertionIndex = function getValidRuleInsertionIndex2(container, index) {
    var maxIndex = container.cssRules.length;
    if (index === void 0 || index > maxIndex) {
      return maxIndex;
    }
    return index;
  };
  var createStyle = function createStyle2() {
    var el2 = document.createElement("style");
    el2.textContent = "\n";
    return el2;
  };
  var DomRenderer = /* @__PURE__ */ function() {
    function DomRenderer2(sheet) {
      this.getPropertyValue = getPropertyValue;
      this.setProperty = setProperty;
      this.removeProperty = removeProperty;
      this.setSelector = setSelector;
      this.element = void 0;
      this.sheet = void 0;
      this.hasInsertedRules = false;
      this.cssRules = [];
      if (sheet)
        registry.add(sheet);
      this.sheet = sheet;
      var _ref = this.sheet ? this.sheet.options : {}, media = _ref.media, meta = _ref.meta, element = _ref.element;
      this.element = element || createStyle();
      this.element.setAttribute("data-jss", "");
      if (media)
        this.element.setAttribute("media", media);
      if (meta)
        this.element.setAttribute("data-meta", meta);
      var nonce = getNonce();
      if (nonce)
        this.element.setAttribute("nonce", nonce);
    }
    var _proto = DomRenderer2.prototype;
    _proto.attach = function attach() {
      if (this.element.parentNode || !this.sheet)
        return;
      insertStyle(this.element, this.sheet.options);
      var deployed = Boolean(this.sheet && this.sheet.deployed);
      if (this.hasInsertedRules && deployed) {
        this.hasInsertedRules = false;
        this.deploy();
      }
    };
    _proto.detach = function detach() {
      if (!this.sheet)
        return;
      var parentNode = this.element.parentNode;
      if (parentNode)
        parentNode.removeChild(this.element);
      if (this.sheet.options.link) {
        this.cssRules = [];
        this.element.textContent = "\n";
      }
    };
    _proto.deploy = function deploy() {
      var sheet = this.sheet;
      if (!sheet)
        return;
      if (sheet.options.link) {
        this.insertRules(sheet.rules);
        return;
      }
      this.element.textContent = "\n" + sheet.toString() + "\n";
    };
    _proto.insertRules = function insertRules(rules, nativeParent) {
      for (var i2 = 0; i2 < rules.index.length; i2++) {
        this.insertRule(rules.index[i2], i2, nativeParent);
      }
    };
    _proto.insertRule = function insertRule2(rule, index, nativeParent) {
      if (nativeParent === void 0) {
        nativeParent = this.element.sheet;
      }
      if (rule.rules) {
        var parent = rule;
        var latestNativeParent = nativeParent;
        if (rule.type === "conditional" || rule.type === "keyframes") {
          var _insertionIndex = getValidRuleInsertionIndex(nativeParent, index);
          latestNativeParent = _insertRule(nativeParent, parent.toString({
            children: false
          }), _insertionIndex);
          if (latestNativeParent === false) {
            return false;
          }
          this.refCssRule(rule, _insertionIndex, latestNativeParent);
        }
        this.insertRules(parent.rules, latestNativeParent);
        return latestNativeParent;
      }
      var ruleStr = rule.toString();
      if (!ruleStr)
        return false;
      var insertionIndex = getValidRuleInsertionIndex(nativeParent, index);
      var nativeRule = _insertRule(nativeParent, ruleStr, insertionIndex);
      if (nativeRule === false) {
        return false;
      }
      this.hasInsertedRules = true;
      this.refCssRule(rule, insertionIndex, nativeRule);
      return nativeRule;
    };
    _proto.refCssRule = function refCssRule(rule, index, cssRule) {
      rule.renderable = cssRule;
      if (rule.options.parent instanceof StyleSheet) {
        this.cssRules[index] = cssRule;
      }
    };
    _proto.deleteRule = function deleteRule(cssRule) {
      var sheet = this.element.sheet;
      var index = this.indexOf(cssRule);
      if (index === -1)
        return false;
      sheet.deleteRule(index);
      this.cssRules.splice(index, 1);
      return true;
    };
    _proto.indexOf = function indexOf2(cssRule) {
      return this.cssRules.indexOf(cssRule);
    };
    _proto.replaceRule = function replaceRule(cssRule, rule) {
      var index = this.indexOf(cssRule);
      if (index === -1)
        return false;
      this.element.sheet.deleteRule(index);
      this.cssRules.splice(index, 1);
      return this.insertRule(rule, index);
    };
    _proto.getRules = function getRules() {
      return this.element.sheet.cssRules;
    };
    return DomRenderer2;
  }();
  var instanceCounter = 0;
  var Jss = /* @__PURE__ */ function() {
    function Jss2(options) {
      this.id = instanceCounter++;
      this.version = "10.5.0";
      this.plugins = new PluginsRegistry();
      this.options = {
        id: {
          minify: false
        },
        createGenerateId,
        Renderer: module_default ? DomRenderer : null,
        plugins: []
      };
      this.generateId = createGenerateId({
        minify: false
      });
      for (var i2 = 0; i2 < plugins.length; i2++) {
        this.plugins.use(plugins[i2], {
          queue: "internal"
        });
      }
      this.setup(options);
    }
    var _proto = Jss2.prototype;
    _proto.setup = function setup(options) {
      if (options === void 0) {
        options = {};
      }
      if (options.createGenerateId) {
        this.options.createGenerateId = options.createGenerateId;
      }
      if (options.id) {
        this.options.id = _extends({}, this.options.id, options.id);
      }
      if (options.createGenerateId || options.id) {
        this.generateId = this.options.createGenerateId(this.options.id);
      }
      if (options.insertionPoint != null)
        this.options.insertionPoint = options.insertionPoint;
      if ("Renderer" in options) {
        this.options.Renderer = options.Renderer;
      }
      if (options.plugins)
        this.use.apply(this, options.plugins);
      return this;
    };
    _proto.createStyleSheet = function createStyleSheet(styles4, options) {
      if (options === void 0) {
        options = {};
      }
      var _options = options, index = _options.index;
      if (typeof index !== "number") {
        index = registry.index === 0 ? 0 : registry.index + 1;
      }
      var sheet = new StyleSheet(styles4, _extends({}, options, {
        jss: this,
        generateId: options.generateId || this.generateId,
        insertionPoint: this.options.insertionPoint,
        Renderer: this.options.Renderer,
        index
      }));
      this.plugins.onProcessSheet(sheet);
      return sheet;
    };
    _proto.removeStyleSheet = function removeStyleSheet(sheet) {
      sheet.detach();
      registry.remove(sheet);
      return this;
    };
    _proto.createRule = function createRule$1(name, style, options) {
      if (style === void 0) {
        style = {};
      }
      if (options === void 0) {
        options = {};
      }
      if (typeof name === "object") {
        return this.createRule(void 0, name, style);
      }
      var ruleOptions = _extends({}, options, {
        name,
        jss: this,
        Renderer: this.options.Renderer
      });
      if (!ruleOptions.generateId)
        ruleOptions.generateId = this.generateId;
      if (!ruleOptions.classes)
        ruleOptions.classes = {};
      if (!ruleOptions.keyframes)
        ruleOptions.keyframes = {};
      var rule = createRule(name, style, ruleOptions);
      if (rule)
        this.plugins.onProcessRule(rule);
      return rule;
    };
    _proto.use = function use() {
      var _this = this;
      for (var _len = arguments.length, plugins3 = new Array(_len), _key = 0; _key < _len; _key++) {
        plugins3[_key] = arguments[_key];
      }
      plugins3.forEach(function(plugin2) {
        _this.plugins.use(plugin2);
      });
      return this;
    };
    return Jss2;
  }();
  /**
   * A better abstraction over CSS.
   *
   * @copyright Oleg Isonen (Slobodskoi) / Isonen 2014-present
   * @website https://github.com/cssinjs/jss
   * @license MIT
   */
  var hasCSSTOMSupport = typeof CSS === "object" && CSS != null && "number" in CSS;
  var create = function create2(options) {
    return new Jss(options);
  };
  var jss = create();
  var jss_esm_default = jss;

  // node_modules/jss-plugin-rule-value-function/dist/jss-plugin-rule-value-function.esm.js
  var now = Date.now();
  var fnValuesNs = "fnValues" + now;
  var fnRuleNs = "fnStyle" + ++now;
  var functionPlugin = function functionPlugin2() {
    return {
      onCreateRule: function onCreateRule8(name, decl, options) {
        if (typeof decl !== "function")
          return null;
        var rule = createRule(name, {}, options);
        rule[fnRuleNs] = decl;
        return rule;
      },
      onProcessStyle: function onProcessStyle2(style, rule) {
        if (fnValuesNs in rule || fnRuleNs in rule)
          return style;
        var fnValues = {};
        for (var prop in style) {
          var value = style[prop];
          if (typeof value !== "function")
            continue;
          delete style[prop];
          fnValues[prop] = value;
        }
        rule[fnValuesNs] = fnValues;
        return style;
      },
      onUpdate: function onUpdate(data2, rule, sheet, options) {
        var styleRule = rule;
        var fnRule = styleRule[fnRuleNs];
        if (fnRule) {
          styleRule.style = fnRule(data2) || {};
          if (true) {
            for (var prop in styleRule.style) {
              if (typeof styleRule.style[prop] === "function") {
                tiny_warning_esm_default(false, "[JSS] Function values inside function rules are not supported.");
                break;
              }
            }
          }
        }
        var fnValues = styleRule[fnValuesNs];
        if (fnValues) {
          for (var _prop in fnValues) {
            styleRule.prop(_prop, fnValues[_prop](data2), options);
          }
        }
      }
    };
  };
  var jss_plugin_rule_value_function_esm_default = functionPlugin;

  // node_modules/symbol-observable/es/ponyfill.js
  function symbolObservablePonyfill(root) {
    var result;
    var Symbol2 = root.Symbol;
    if (typeof Symbol2 === "function") {
      if (Symbol2.observable) {
        result = Symbol2.observable;
      } else {
        result = Symbol2("observable");
        Symbol2.observable = result;
      }
    } else {
      result = "@@observable";
    }
    return result;
  }

  // node_modules/jss-plugin-rule-value-observable/dist/jss-plugin-rule-value-observable.esm.js
  var symbol_observable = __toModule(require_es());
  var isObservable = function isObservable2(value) {
    return value && value[symbol_observable.default] && value === value[symbol_observable.default]();
  };
  var observablePlugin = function observablePlugin2(updateOptions) {
    return {
      onCreateRule: function onCreateRule8(name, decl, options) {
        if (!isObservable(decl))
          return null;
        var style$ = decl;
        var rule = createRule(name, {}, options);
        style$.subscribe(function(style) {
          for (var prop in style) {
            rule.prop(prop, style[prop], updateOptions);
          }
        });
        return rule;
      },
      onProcessRule: function onProcessRule3(rule) {
        if (rule && rule.type !== "style")
          return;
        var styleRule = rule;
        var style = styleRule.style;
        var _loop = function _loop2(prop2) {
          var value = style[prop2];
          if (!isObservable(value))
            return "continue";
          delete style[prop2];
          value.subscribe({
            next: function next(nextValue) {
              styleRule.prop(prop2, nextValue, updateOptions);
            }
          });
        };
        for (var prop in style) {
          var _ret = _loop(prop);
          if (_ret === "continue")
            continue;
        }
      }
    };
  };
  var jss_plugin_rule_value_observable_esm_default = observablePlugin;

  // node_modules/jss-plugin-template/dist/jss-plugin-template.esm.js
  var semiWithNl = /;\n/;
  var parse = function parse2(cssText) {
    var style = {};
    var split = cssText.split(semiWithNl);
    for (var i2 = 0; i2 < split.length; i2++) {
      var decl = (split[i2] || "").trim();
      if (!decl)
        continue;
      var colonIndex = decl.indexOf(":");
      if (colonIndex === -1) {
        tiny_warning_esm_default(false, '[JSS] Malformed CSS string "' + decl + '"');
        continue;
      }
      var prop = decl.substr(0, colonIndex).trim();
      var value = decl.substr(colonIndex + 1).trim();
      style[prop] = value;
    }
    return style;
  };
  var onProcessRule = function onProcessRule2(rule) {
    if (typeof rule.style === "string") {
      rule.style = parse(rule.style);
    }
  };
  function templatePlugin() {
    return {
      onProcessRule
    };
  }
  var jss_plugin_template_esm_default = templatePlugin;

  // node_modules/jss-plugin-global/dist/jss-plugin-global.esm.js
  var at = "@global";
  var atPrefix = "@global ";
  var GlobalContainerRule = /* @__PURE__ */ function() {
    function GlobalContainerRule2(key, styles4, options) {
      this.type = "global";
      this.at = at;
      this.rules = void 0;
      this.options = void 0;
      this.key = void 0;
      this.isProcessed = false;
      this.key = key;
      this.options = options;
      this.rules = new RuleList(_extends({}, options, {
        parent: this
      }));
      for (var selector in styles4) {
        this.rules.add(selector, styles4[selector]);
      }
      this.rules.process();
    }
    var _proto = GlobalContainerRule2.prototype;
    _proto.getRule = function getRule(name) {
      return this.rules.get(name);
    };
    _proto.addRule = function addRule(name, style, options) {
      var rule = this.rules.add(name, style, options);
      if (rule)
        this.options.jss.plugins.onProcessRule(rule);
      return rule;
    };
    _proto.indexOf = function indexOf2(rule) {
      return this.rules.indexOf(rule);
    };
    _proto.toString = function toString() {
      return this.rules.toString();
    };
    return GlobalContainerRule2;
  }();
  var GlobalPrefixedRule = /* @__PURE__ */ function() {
    function GlobalPrefixedRule2(key, style, options) {
      this.type = "global";
      this.at = at;
      this.options = void 0;
      this.rule = void 0;
      this.isProcessed = false;
      this.key = void 0;
      this.key = key;
      this.options = options;
      var selector = key.substr(atPrefix.length);
      this.rule = options.jss.createRule(selector, style, _extends({}, options, {
        parent: this
      }));
    }
    var _proto2 = GlobalPrefixedRule2.prototype;
    _proto2.toString = function toString(options) {
      return this.rule ? this.rule.toString(options) : "";
    };
    return GlobalPrefixedRule2;
  }();
  var separatorRegExp = /\s*,\s*/g;
  function addScope(selector, scope) {
    var parts = selector.split(separatorRegExp);
    var scoped = "";
    for (var i2 = 0; i2 < parts.length; i2++) {
      scoped += scope + " " + parts[i2].trim();
      if (parts[i2 + 1])
        scoped += ", ";
    }
    return scoped;
  }
  function handleNestedGlobalContainerRule(rule, sheet) {
    var options = rule.options, style = rule.style;
    var rules = style ? style[at] : null;
    if (!rules)
      return;
    for (var name in rules) {
      sheet.addRule(name, rules[name], _extends({}, options, {
        selector: addScope(name, rule.selector)
      }));
    }
    delete style[at];
  }
  function handlePrefixedGlobalRule(rule, sheet) {
    var options = rule.options, style = rule.style;
    for (var prop in style) {
      if (prop[0] !== "@" || prop.substr(0, at.length) !== at)
        continue;
      var selector = addScope(prop.substr(at.length), rule.selector);
      sheet.addRule(selector, style[prop], _extends({}, options, {
        selector
      }));
      delete style[prop];
    }
  }
  function jssGlobal() {
    function onCreateRule8(name, styles4, options) {
      if (!name)
        return null;
      if (name === at) {
        return new GlobalContainerRule(name, styles4, options);
      }
      if (name[0] === "@" && name.substr(0, atPrefix.length) === atPrefix) {
        return new GlobalPrefixedRule(name, styles4, options);
      }
      var parent = options.parent;
      if (parent) {
        if (parent.type === "global" || parent.options.parent && parent.options.parent.type === "global") {
          options.scoped = false;
        }
      }
      if (options.scoped === false) {
        options.selector = name;
      }
      return null;
    }
    function onProcessRule3(rule, sheet) {
      if (rule.type !== "style" || !sheet)
        return;
      handleNestedGlobalContainerRule(rule, sheet);
      handlePrefixedGlobalRule(rule, sheet);
    }
    return {
      onCreateRule: onCreateRule8,
      onProcessRule: onProcessRule3
    };
  }
  var jss_plugin_global_esm_default = jssGlobal;

  // node_modules/jss-plugin-extend/dist/jss-plugin-extend.esm.js
  var isObject = function isObject2(obj) {
    return obj && typeof obj === "object" && !Array.isArray(obj);
  };
  var valueNs = "extendCurrValue" + Date.now();
  function mergeExtend(style, rule, sheet, newStyle) {
    var extendType = typeof style.extend;
    if (extendType === "string") {
      if (!sheet)
        return;
      var refRule = sheet.getRule(style.extend);
      if (!refRule)
        return;
      if (refRule === rule) {
        tiny_warning_esm_default(false, "[JSS] A rule tries to extend itself \n" + rule.toString());
        return;
      }
      var parent = refRule.options.parent;
      if (parent) {
        var originalStyle = parent.rules.raw[style.extend];
        extend(originalStyle, rule, sheet, newStyle);
      }
      return;
    }
    if (Array.isArray(style.extend)) {
      for (var index = 0; index < style.extend.length; index++) {
        var singleExtend = style.extend[index];
        var singleStyle = typeof singleExtend === "string" ? _extends({}, style, {
          extend: singleExtend
        }) : style.extend[index];
        extend(singleStyle, rule, sheet, newStyle);
      }
      return;
    }
    for (var prop in style.extend) {
      if (prop === "extend") {
        extend(style.extend.extend, rule, sheet, newStyle);
        continue;
      }
      if (isObject(style.extend[prop])) {
        if (!(prop in newStyle))
          newStyle[prop] = {};
        extend(style.extend[prop], rule, sheet, newStyle[prop]);
        continue;
      }
      newStyle[prop] = style.extend[prop];
    }
  }
  function mergeRest(style, rule, sheet, newStyle) {
    for (var prop in style) {
      if (prop === "extend")
        continue;
      if (isObject(newStyle[prop]) && isObject(style[prop])) {
        extend(style[prop], rule, sheet, newStyle[prop]);
        continue;
      }
      if (isObject(style[prop])) {
        newStyle[prop] = extend(style[prop], rule, sheet);
        continue;
      }
      newStyle[prop] = style[prop];
    }
  }
  function extend(style, rule, sheet, newStyle) {
    if (newStyle === void 0) {
      newStyle = {};
    }
    mergeExtend(style, rule, sheet, newStyle);
    mergeRest(style, rule, sheet, newStyle);
    return newStyle;
  }
  function jssExtend() {
    function onProcessStyle2(style, rule, sheet) {
      if ("extend" in style)
        return extend(style, rule, sheet);
      return style;
    }
    function onChangeValue2(value, prop, rule) {
      if (prop !== "extend")
        return value;
      if (value == null || value === false) {
        for (var key in rule[valueNs]) {
          rule.prop(key, null);
        }
        rule[valueNs] = null;
        return null;
      }
      if (typeof value === "object") {
        for (var _key in value) {
          rule.prop(_key, value[_key]);
        }
        rule[valueNs] = value;
      }
      return null;
    }
    return {
      onProcessStyle: onProcessStyle2,
      onChangeValue: onChangeValue2
    };
  }
  var jss_plugin_extend_esm_default = jssExtend;

  // node_modules/jss-plugin-nested/dist/jss-plugin-nested.esm.js
  var separatorRegExp2 = /\s*,\s*/g;
  var parentRegExp = /&/g;
  var refRegExp2 = /\$([\w-]+)/g;
  function jssNested() {
    function getReplaceRef(container, sheet) {
      return function(match, key) {
        var rule = container.getRule(key) || sheet && sheet.getRule(key);
        if (rule) {
          rule = rule;
          return rule.selector;
        }
        tiny_warning_esm_default(false, '[JSS] Could not find the referenced rule "' + key + '" in "' + (container.options.meta || container.toString()) + '".');
        return key;
      };
    }
    function replaceParentRefs(nestedProp, parentProp) {
      var parentSelectors = parentProp.split(separatorRegExp2);
      var nestedSelectors = nestedProp.split(separatorRegExp2);
      var result = "";
      for (var i2 = 0; i2 < parentSelectors.length; i2++) {
        var parent = parentSelectors[i2];
        for (var j2 = 0; j2 < nestedSelectors.length; j2++) {
          var nested = nestedSelectors[j2];
          if (result)
            result += ", ";
          result += nested.indexOf("&") !== -1 ? nested.replace(parentRegExp, parent) : parent + " " + nested;
        }
      }
      return result;
    }
    function getOptions(rule, container, prevOptions) {
      if (prevOptions)
        return _extends({}, prevOptions, {
          index: prevOptions.index + 1
        });
      var nestingLevel = rule.options.nestingLevel;
      nestingLevel = nestingLevel === void 0 ? 1 : nestingLevel + 1;
      var options = _extends({}, rule.options, {
        nestingLevel,
        index: container.indexOf(rule) + 1
      });
      delete options.name;
      return options;
    }
    function onProcessStyle2(style, rule, sheet) {
      if (rule.type !== "style")
        return style;
      var styleRule = rule;
      var container = styleRule.options.parent;
      var options;
      var replaceRef3;
      for (var prop in style) {
        var isNested = prop.indexOf("&") !== -1;
        var isNestedConditional = prop[0] === "@";
        if (!isNested && !isNestedConditional)
          continue;
        options = getOptions(styleRule, container, options);
        if (isNested) {
          var selector = replaceParentRefs(prop, styleRule.selector);
          if (!replaceRef3)
            replaceRef3 = getReplaceRef(container, sheet);
          selector = selector.replace(refRegExp2, replaceRef3);
          container.addRule(selector, style[prop], _extends({}, options, {
            selector
          }));
        } else if (isNestedConditional) {
          container.addRule(prop, {}, options).addRule(styleRule.key, style[prop], {
            selector: styleRule.selector
          });
        }
        delete style[prop];
      }
      return style;
    }
    return {
      onProcessStyle: onProcessStyle2
    };
  }
  var jss_plugin_nested_esm_default = jssNested;

  // node_modules/jss-plugin-compose/dist/jss-plugin-compose.esm.js
  function registerClass(rule, className) {
    if (!className)
      return true;
    if (Array.isArray(className)) {
      for (var index = 0; index < className.length; index++) {
        var isSetted = registerClass(rule, className[index]);
        if (!isSetted)
          return false;
      }
      return true;
    }
    if (className.indexOf(" ") > -1) {
      return registerClass(rule, className.split(" "));
    }
    var _ref = rule.options, parent = _ref.parent;
    if (className[0] === "$") {
      var refRule = parent.getRule(className.substr(1));
      if (!refRule) {
        tiny_warning_esm_default(false, "[JSS] Referenced rule is not defined. \n" + rule.toString());
        return false;
      }
      if (refRule === rule) {
        tiny_warning_esm_default(false, "[JSS] Cyclic composition detected. \n" + rule.toString());
        return false;
      }
      parent.classes[rule.key] += " " + parent.classes[refRule.key];
      return true;
    }
    parent.classes[rule.key] += " " + className;
    return true;
  }
  function jssCompose() {
    function onProcessStyle2(style, rule) {
      if (!("composes" in style))
        return style;
      registerClass(rule, style.composes);
      delete style.composes;
      return style;
    }
    return {
      onProcessStyle: onProcessStyle2
    };
  }
  var jss_plugin_compose_esm_default = jssCompose;

  // node_modules/hyphenate-style-name/index.js
  var uppercasePattern = /[A-Z]/g;
  var msPattern = /^ms-/;
  var cache = {};
  function toHyphenLower(match) {
    return "-" + match.toLowerCase();
  }
  function hyphenateStyleName(name) {
    if (cache.hasOwnProperty(name)) {
      return cache[name];
    }
    var hName = name.replace(uppercasePattern, toHyphenLower);
    return cache[name] = msPattern.test(hName) ? "-" + hName : hName;
  }
  var hyphenate_style_name_default = hyphenateStyleName;

  // node_modules/jss-plugin-camel-case/dist/jss-plugin-camel-case.esm.js
  function convertCase(style) {
    var converted = {};
    for (var prop in style) {
      var key = prop.indexOf("--") === 0 ? prop : hyphenate_style_name_default(prop);
      converted[key] = style[prop];
    }
    if (style.fallbacks) {
      if (Array.isArray(style.fallbacks))
        converted.fallbacks = style.fallbacks.map(convertCase);
      else
        converted.fallbacks = convertCase(style.fallbacks);
    }
    return converted;
  }
  function camelCase() {
    function onProcessStyle2(style) {
      if (Array.isArray(style)) {
        for (var index = 0; index < style.length; index++) {
          style[index] = convertCase(style[index]);
        }
        return style;
      }
      return convertCase(style);
    }
    function onChangeValue2(value, prop, rule) {
      if (prop.indexOf("--") === 0) {
        return value;
      }
      var hyphenatedProp = hyphenate_style_name_default(prop);
      if (prop === hyphenatedProp)
        return value;
      rule.prop(hyphenatedProp, value);
      return null;
    }
    return {
      onProcessStyle: onProcessStyle2,
      onChangeValue: onChangeValue2
    };
  }
  var jss_plugin_camel_case_esm_default = camelCase;

  // node_modules/jss-plugin-default-unit/dist/jss-plugin-default-unit.esm.js
  var px = hasCSSTOMSupport && CSS ? CSS.px : "px";
  var ms = hasCSSTOMSupport && CSS ? CSS.ms : "ms";
  var percent = hasCSSTOMSupport && CSS ? CSS.percent : "%";
  var defaultUnits = {
    "animation-delay": ms,
    "animation-duration": ms,
    "background-position": px,
    "background-position-x": px,
    "background-position-y": px,
    "background-size": px,
    border: px,
    "border-bottom": px,
    "border-bottom-left-radius": px,
    "border-bottom-right-radius": px,
    "border-bottom-width": px,
    "border-left": px,
    "border-left-width": px,
    "border-radius": px,
    "border-right": px,
    "border-right-width": px,
    "border-top": px,
    "border-top-left-radius": px,
    "border-top-right-radius": px,
    "border-top-width": px,
    "border-width": px,
    "border-block": px,
    "border-block-end": px,
    "border-block-end-width": px,
    "border-block-start": px,
    "border-block-start-width": px,
    "border-block-width": px,
    "border-inline": px,
    "border-inline-end": px,
    "border-inline-end-width": px,
    "border-inline-start": px,
    "border-inline-start-width": px,
    "border-inline-width": px,
    "border-start-start-radius": px,
    "border-start-end-radius": px,
    "border-end-start-radius": px,
    "border-end-end-radius": px,
    margin: px,
    "margin-bottom": px,
    "margin-left": px,
    "margin-right": px,
    "margin-top": px,
    "margin-block": px,
    "margin-block-end": px,
    "margin-block-start": px,
    "margin-inline": px,
    "margin-inline-end": px,
    "margin-inline-start": px,
    padding: px,
    "padding-bottom": px,
    "padding-left": px,
    "padding-right": px,
    "padding-top": px,
    "padding-block": px,
    "padding-block-end": px,
    "padding-block-start": px,
    "padding-inline": px,
    "padding-inline-end": px,
    "padding-inline-start": px,
    "mask-position-x": px,
    "mask-position-y": px,
    "mask-size": px,
    height: px,
    width: px,
    "min-height": px,
    "max-height": px,
    "min-width": px,
    "max-width": px,
    bottom: px,
    left: px,
    top: px,
    right: px,
    inset: px,
    "inset-block": px,
    "inset-block-end": px,
    "inset-block-start": px,
    "inset-inline": px,
    "inset-inline-end": px,
    "inset-inline-start": px,
    "box-shadow": px,
    "text-shadow": px,
    "column-gap": px,
    "column-rule": px,
    "column-rule-width": px,
    "column-width": px,
    "font-size": px,
    "font-size-delta": px,
    "letter-spacing": px,
    "text-indent": px,
    "text-stroke": px,
    "text-stroke-width": px,
    "word-spacing": px,
    motion: px,
    "motion-offset": px,
    outline: px,
    "outline-offset": px,
    "outline-width": px,
    perspective: px,
    "perspective-origin-x": percent,
    "perspective-origin-y": percent,
    "transform-origin": percent,
    "transform-origin-x": percent,
    "transform-origin-y": percent,
    "transform-origin-z": percent,
    "transition-delay": ms,
    "transition-duration": ms,
    "vertical-align": px,
    "flex-basis": px,
    "shape-margin": px,
    size: px,
    gap: px,
    grid: px,
    "grid-gap": px,
    "grid-row-gap": px,
    "grid-column-gap": px,
    "grid-template-rows": px,
    "grid-template-columns": px,
    "grid-auto-rows": px,
    "grid-auto-columns": px,
    "box-shadow-x": px,
    "box-shadow-y": px,
    "box-shadow-blur": px,
    "box-shadow-spread": px,
    "font-line-height": px,
    "text-shadow-x": px,
    "text-shadow-y": px,
    "text-shadow-blur": px
  };
  function addCamelCasedVersion(obj) {
    var regExp2 = /(-[a-z])/g;
    var replace = function replace2(str) {
      return str[1].toUpperCase();
    };
    var newObj = {};
    for (var _key in obj) {
      newObj[_key] = obj[_key];
      newObj[_key.replace(regExp2, replace)] = obj[_key];
    }
    return newObj;
  }
  var units = addCamelCasedVersion(defaultUnits);
  function iterate(prop, value, options) {
    if (value == null)
      return value;
    if (Array.isArray(value)) {
      for (var i2 = 0; i2 < value.length; i2++) {
        value[i2] = iterate(prop, value[i2], options);
      }
    } else if (typeof value === "object") {
      if (prop === "fallbacks") {
        for (var innerProp in value) {
          value[innerProp] = iterate(innerProp, value[innerProp], options);
        }
      } else {
        for (var _innerProp in value) {
          value[_innerProp] = iterate(prop + "-" + _innerProp, value[_innerProp], options);
        }
      }
    } else if (typeof value === "number") {
      var unit = options[prop] || units[prop];
      if (unit && !(value === 0 && unit === px)) {
        return typeof unit === "function" ? unit(value).toString() : "" + value + unit;
      }
      return value.toString();
    }
    return value;
  }
  function defaultUnit(options) {
    if (options === void 0) {
      options = {};
    }
    var camelCasedOptions = addCamelCasedVersion(options);
    function onProcessStyle2(style, rule) {
      if (rule.type !== "style")
        return style;
      for (var prop in style) {
        style[prop] = iterate(prop, style[prop], camelCasedOptions);
      }
      return style;
    }
    function onChangeValue2(value, prop) {
      return iterate(prop, value, camelCasedOptions);
    }
    return {
      onProcessStyle: onProcessStyle2,
      onChangeValue: onChangeValue2
    };
  }
  var jss_plugin_default_unit_esm_default = defaultUnit;

  // node_modules/jss-plugin-expand/dist/jss-plugin-expand.esm.js
  var propArray = {
    "background-size": true,
    "background-position": true,
    border: true,
    "border-bottom": true,
    "border-left": true,
    "border-top": true,
    "border-right": true,
    "border-radius": true,
    "border-image": true,
    "border-width": true,
    "border-style": true,
    "border-color": true,
    "box-shadow": true,
    flex: true,
    margin: true,
    padding: true,
    outline: true,
    "transform-origin": true,
    transform: true,
    transition: true
  };
  var propArrayInObj = {
    position: true,
    size: true
  };
  var propObj = {
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    background: {
      attachment: null,
      color: null,
      image: null,
      position: null,
      repeat: null
    },
    border: {
      width: null,
      style: null,
      color: null
    },
    "border-top": {
      width: null,
      style: null,
      color: null
    },
    "border-right": {
      width: null,
      style: null,
      color: null
    },
    "border-bottom": {
      width: null,
      style: null,
      color: null
    },
    "border-left": {
      width: null,
      style: null,
      color: null
    },
    outline: {
      width: null,
      style: null,
      color: null
    },
    "list-style": {
      type: null,
      position: null,
      image: null
    },
    transition: {
      property: null,
      duration: null,
      "timing-function": null,
      timingFunction: null,
      delay: null
    },
    animation: {
      name: null,
      duration: null,
      "timing-function": null,
      timingFunction: null,
      delay: null,
      "iteration-count": null,
      iterationCount: null,
      direction: null,
      "fill-mode": null,
      fillMode: null,
      "play-state": null,
      playState: null
    },
    "box-shadow": {
      x: 0,
      y: 0,
      blur: 0,
      spread: 0,
      color: null,
      inset: null
    },
    "text-shadow": {
      x: 0,
      y: 0,
      blur: null,
      color: null
    }
  };
  var customPropObj = {
    border: {
      radius: "border-radius",
      image: "border-image",
      width: "border-width",
      style: "border-style",
      color: "border-color"
    },
    "border-bottom": {
      width: "border-bottom-width",
      style: "border-bottom-style",
      color: "border-bottom-color"
    },
    "border-top": {
      width: "border-top-width",
      style: "border-top-style",
      color: "border-top-color"
    },
    "border-left": {
      width: "border-left-width",
      style: "border-left-style",
      color: "border-left-color"
    },
    "border-right": {
      width: "border-right-width",
      style: "border-right-style",
      color: "border-right-color"
    },
    background: {
      size: "background-size",
      image: "background-image"
    },
    font: {
      style: "font-style",
      variant: "font-variant",
      weight: "font-weight",
      stretch: "font-stretch",
      size: "font-size",
      family: "font-family",
      lineHeight: "line-height",
      "line-height": "line-height"
    },
    flex: {
      grow: "flex-grow",
      basis: "flex-basis",
      direction: "flex-direction",
      wrap: "flex-wrap",
      flow: "flex-flow",
      shrink: "flex-shrink"
    },
    align: {
      self: "align-self",
      items: "align-items",
      content: "align-content"
    },
    grid: {
      "template-columns": "grid-template-columns",
      templateColumns: "grid-template-columns",
      "template-rows": "grid-template-rows",
      templateRows: "grid-template-rows",
      "template-areas": "grid-template-areas",
      templateAreas: "grid-template-areas",
      template: "grid-template",
      "auto-columns": "grid-auto-columns",
      autoColumns: "grid-auto-columns",
      "auto-rows": "grid-auto-rows",
      autoRows: "grid-auto-rows",
      "auto-flow": "grid-auto-flow",
      autoFlow: "grid-auto-flow",
      row: "grid-row",
      column: "grid-column",
      "row-start": "grid-row-start",
      rowStart: "grid-row-start",
      "row-end": "grid-row-end",
      rowEnd: "grid-row-end",
      "column-start": "grid-column-start",
      columnStart: "grid-column-start",
      "column-end": "grid-column-end",
      columnEnd: "grid-column-end",
      area: "grid-area",
      gap: "grid-gap",
      "row-gap": "grid-row-gap",
      rowGap: "grid-row-gap",
      "column-gap": "grid-column-gap",
      columnGap: "grid-column-gap"
    }
  };
  function mapValuesByProp(value, prop, rule) {
    return value.map(function(item) {
      return objectToArray(item, prop, rule, false, true);
    });
  }
  function processArray(value, prop, scheme, rule) {
    if (scheme[prop] == null)
      return value;
    if (value.length === 0)
      return [];
    if (Array.isArray(value[0]))
      return processArray(value[0], prop, scheme, rule);
    if (typeof value[0] === "object") {
      return mapValuesByProp(value, prop, rule);
    }
    return [value];
  }
  function objectToArray(value, prop, rule, isFallback, isInArray) {
    if (!(propObj[prop] || customPropObj[prop]))
      return [];
    var result = [];
    if (customPropObj[prop]) {
      value = customPropsToStyle(value, rule, customPropObj[prop], isFallback);
    }
    if (Object.keys(value).length) {
      for (var baseProp in propObj[prop]) {
        if (value[baseProp]) {
          if (Array.isArray(value[baseProp])) {
            result.push(propArrayInObj[baseProp] === null ? value[baseProp] : value[baseProp].join(" "));
          } else
            result.push(value[baseProp]);
          continue;
        }
        if (propObj[prop][baseProp] != null) {
          result.push(propObj[prop][baseProp]);
        }
      }
    }
    if (!result.length || isInArray)
      return result;
    return [result];
  }
  function customPropsToStyle(value, rule, customProps, isFallback) {
    for (var prop in customProps) {
      var propName = customProps[prop];
      if (typeof value[prop] !== "undefined" && (isFallback || !rule.prop(propName))) {
        var _styleDetector;
        var appendedValue = styleDetector((_styleDetector = {}, _styleDetector[propName] = value[prop], _styleDetector), rule)[propName];
        if (isFallback)
          rule.style.fallbacks[propName] = appendedValue;
        else
          rule.style[propName] = appendedValue;
      }
      delete value[prop];
    }
    return value;
  }
  function styleDetector(style, rule, isFallback) {
    for (var prop in style) {
      var value = style[prop];
      if (Array.isArray(value)) {
        if (!Array.isArray(value[0])) {
          if (prop === "fallbacks") {
            for (var index = 0; index < style.fallbacks.length; index++) {
              style.fallbacks[index] = styleDetector(style.fallbacks[index], rule, true);
            }
            continue;
          }
          style[prop] = processArray(value, prop, propArray, rule);
          if (!style[prop].length)
            delete style[prop];
        }
      } else if (typeof value === "object") {
        if (prop === "fallbacks") {
          style.fallbacks = styleDetector(style.fallbacks, rule, true);
          continue;
        }
        style[prop] = objectToArray(value, prop, rule, isFallback);
        if (!style[prop].length)
          delete style[prop];
      } else if (style[prop] === "")
        delete style[prop];
    }
    return style;
  }
  function jssExpand() {
    function onProcessStyle2(style, rule) {
      if (!style || rule.type !== "style")
        return style;
      if (Array.isArray(style)) {
        for (var index = 0; index < style.length; index++) {
          style[index] = styleDetector(style[index], rule);
        }
        return style;
      }
      return styleDetector(style, rule);
    }
    return {
      onProcessStyle: onProcessStyle2
    };
  }
  var jss_plugin_expand_esm_default = jssExpand;

  // node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
      arr2[i2] = arr[i2];
    }
    return arr2;
  }

  // node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr))
      return _arrayLikeToArray(arr);
  }

  // node_modules/@babel/runtime/helpers/esm/iterableToArray.js
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
      return Array.from(iter);
  }

  // node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
  function _unsupportedIterableToArray(o2, minLen) {
    if (!o2)
      return;
    if (typeof o2 === "string")
      return _arrayLikeToArray(o2, minLen);
    var n2 = Object.prototype.toString.call(o2).slice(8, -1);
    if (n2 === "Object" && o2.constructor)
      n2 = o2.constructor.name;
    if (n2 === "Map" || n2 === "Set")
      return Array.from(o2);
    if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
      return _arrayLikeToArray(o2, minLen);
  }

  // node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  // node_modules/@babel/runtime/helpers/esm/toConsumableArray.js
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  // node_modules/css-vendor/dist/css-vendor.esm.js
  var js = "";
  var css = "";
  var vendor = "";
  var browser = "";
  var isTouch = module_default && "ontouchstart" in document.documentElement;
  if (module_default) {
    jsCssMap = {
      Moz: "-moz-",
      ms: "-ms-",
      O: "-o-",
      Webkit: "-webkit-"
    };
    _document$createEleme = document.createElement("p"), style = _document$createEleme.style;
    testProp = "Transform";
    for (var key in jsCssMap) {
      if (key + testProp in style) {
        js = key;
        css = jsCssMap[key];
        break;
      }
    }
    if (js === "Webkit" && "msHyphens" in style) {
      js = "ms";
      css = jsCssMap.ms;
      browser = "edge";
    }
    if (js === "Webkit" && "-apple-trailing-word" in style) {
      vendor = "apple";
    }
  }
  var jsCssMap;
  var _document$createEleme;
  var style;
  var testProp;
  var prefix = {
    js,
    css,
    vendor,
    browser,
    isTouch
  };
  function supportedKeyframes(key) {
    if (key[1] === "-")
      return key;
    if (prefix.js === "ms")
      return key;
    return "@" + prefix.css + "keyframes" + key.substr(10);
  }
  var appearence = {
    noPrefill: ["appearance"],
    supportedProperty: function supportedProperty(prop) {
      if (prop !== "appearance")
        return false;
      if (prefix.js === "ms")
        return "-webkit-" + prop;
      return prefix.css + prop;
    }
  };
  var colorAdjust = {
    noPrefill: ["color-adjust"],
    supportedProperty: function supportedProperty2(prop) {
      if (prop !== "color-adjust")
        return false;
      if (prefix.js === "Webkit")
        return prefix.css + "print-" + prop;
      return prop;
    }
  };
  var regExp = /[-\s]+(.)?/g;
  function toUpper(match, c2) {
    return c2 ? c2.toUpperCase() : "";
  }
  function camelize(str) {
    return str.replace(regExp, toUpper);
  }
  function pascalize(str) {
    return camelize("-" + str);
  }
  var mask = {
    noPrefill: ["mask"],
    supportedProperty: function supportedProperty3(prop, style) {
      if (!/^mask/.test(prop))
        return false;
      if (prefix.js === "Webkit") {
        var longhand = "mask-image";
        if (camelize(longhand) in style) {
          return prop;
        }
        if (prefix.js + pascalize(longhand) in style) {
          return prefix.css + prop;
        }
      }
      return prop;
    }
  };
  var textOrientation = {
    noPrefill: ["text-orientation"],
    supportedProperty: function supportedProperty4(prop) {
      if (prop !== "text-orientation")
        return false;
      if (prefix.vendor === "apple" && !prefix.isTouch) {
        return prefix.css + prop;
      }
      return prop;
    }
  };
  var transform = {
    noPrefill: ["transform"],
    supportedProperty: function supportedProperty5(prop, style, options) {
      if (prop !== "transform")
        return false;
      if (options.transform) {
        return prop;
      }
      return prefix.css + prop;
    }
  };
  var transition = {
    noPrefill: ["transition"],
    supportedProperty: function supportedProperty6(prop, style, options) {
      if (prop !== "transition")
        return false;
      if (options.transition) {
        return prop;
      }
      return prefix.css + prop;
    }
  };
  var writingMode = {
    noPrefill: ["writing-mode"],
    supportedProperty: function supportedProperty7(prop) {
      if (prop !== "writing-mode")
        return false;
      if (prefix.js === "Webkit" || prefix.js === "ms" && prefix.browser !== "edge") {
        return prefix.css + prop;
      }
      return prop;
    }
  };
  var userSelect = {
    noPrefill: ["user-select"],
    supportedProperty: function supportedProperty8(prop) {
      if (prop !== "user-select")
        return false;
      if (prefix.js === "Moz" || prefix.js === "ms" || prefix.vendor === "apple") {
        return prefix.css + prop;
      }
      return prop;
    }
  };
  var breakPropsOld = {
    supportedProperty: function supportedProperty9(prop, style) {
      if (!/^break-/.test(prop))
        return false;
      if (prefix.js === "Webkit") {
        var jsProp = "WebkitColumn" + pascalize(prop);
        return jsProp in style ? prefix.css + "column-" + prop : false;
      }
      if (prefix.js === "Moz") {
        var _jsProp = "page" + pascalize(prop);
        return _jsProp in style ? "page-" + prop : false;
      }
      return false;
    }
  };
  var inlineLogicalOld = {
    supportedProperty: function supportedProperty10(prop, style) {
      if (!/^(border|margin|padding)-inline/.test(prop))
        return false;
      if (prefix.js === "Moz")
        return prop;
      var newProp = prop.replace("-inline", "");
      return prefix.js + pascalize(newProp) in style ? prefix.css + newProp : false;
    }
  };
  var unprefixed = {
    supportedProperty: function supportedProperty11(prop, style) {
      return camelize(prop) in style ? prop : false;
    }
  };
  var prefixed = {
    supportedProperty: function supportedProperty12(prop, style) {
      var pascalized = pascalize(prop);
      if (prop[0] === "-")
        return prop;
      if (prop[0] === "-" && prop[1] === "-")
        return prop;
      if (prefix.js + pascalized in style)
        return prefix.css + prop;
      if (prefix.js !== "Webkit" && "Webkit" + pascalized in style)
        return "-webkit-" + prop;
      return false;
    }
  };
  var scrollSnap = {
    supportedProperty: function supportedProperty13(prop) {
      if (prop.substring(0, 11) !== "scroll-snap")
        return false;
      if (prefix.js === "ms") {
        return "" + prefix.css + prop;
      }
      return prop;
    }
  };
  var overscrollBehavior = {
    supportedProperty: function supportedProperty14(prop) {
      if (prop !== "overscroll-behavior")
        return false;
      if (prefix.js === "ms") {
        return prefix.css + "scroll-chaining";
      }
      return prop;
    }
  };
  var propMap = {
    "flex-grow": "flex-positive",
    "flex-shrink": "flex-negative",
    "flex-basis": "flex-preferred-size",
    "justify-content": "flex-pack",
    order: "flex-order",
    "align-items": "flex-align",
    "align-content": "flex-line-pack"
  };
  var flex2012 = {
    supportedProperty: function supportedProperty15(prop, style) {
      var newProp = propMap[prop];
      if (!newProp)
        return false;
      return prefix.js + pascalize(newProp) in style ? prefix.css + newProp : false;
    }
  };
  var propMap$1 = {
    flex: "box-flex",
    "flex-grow": "box-flex",
    "flex-direction": ["box-orient", "box-direction"],
    order: "box-ordinal-group",
    "align-items": "box-align",
    "flex-flow": ["box-orient", "box-direction"],
    "justify-content": "box-pack"
  };
  var propKeys = Object.keys(propMap$1);
  var prefixCss = function prefixCss2(p2) {
    return prefix.css + p2;
  };
  var flex2009 = {
    supportedProperty: function supportedProperty16(prop, style, _ref) {
      var multiple = _ref.multiple;
      if (propKeys.indexOf(prop) > -1) {
        var newProp = propMap$1[prop];
        if (!Array.isArray(newProp)) {
          return prefix.js + pascalize(newProp) in style ? prefix.css + newProp : false;
        }
        if (!multiple)
          return false;
        for (var i2 = 0; i2 < newProp.length; i2++) {
          if (!(prefix.js + pascalize(newProp[0]) in style)) {
            return false;
          }
        }
        return newProp.map(prefixCss);
      }
      return false;
    }
  };
  var plugins2 = [appearence, colorAdjust, mask, textOrientation, transform, transition, writingMode, userSelect, breakPropsOld, inlineLogicalOld, unprefixed, prefixed, scrollSnap, overscrollBehavior, flex2012, flex2009];
  var propertyDetectors = plugins2.filter(function(p2) {
    return p2.supportedProperty;
  }).map(function(p2) {
    return p2.supportedProperty;
  });
  var noPrefill = plugins2.filter(function(p2) {
    return p2.noPrefill;
  }).reduce(function(a2, p2) {
    a2.push.apply(a2, _toConsumableArray(p2.noPrefill));
    return a2;
  }, []);
  var el;
  var cache2 = {};
  if (module_default) {
    el = document.createElement("p");
    computed = window.getComputedStyle(document.documentElement, "");
    for (var key$1 in computed) {
      if (!isNaN(key$1))
        cache2[computed[key$1]] = computed[key$1];
    }
    noPrefill.forEach(function(x2) {
      return delete cache2[x2];
    });
  }
  var computed;
  function supportedProperty17(prop, options) {
    if (options === void 0) {
      options = {};
    }
    if (!el)
      return prop;
    if (cache2[prop] != null) {
      return cache2[prop];
    }
    if (prop === "transition" || prop === "transform") {
      options[prop] = prop in el.style;
    }
    for (var i2 = 0; i2 < propertyDetectors.length; i2++) {
      cache2[prop] = propertyDetectors[i2](prop, el.style, options);
      if (cache2[prop])
        break;
    }
    try {
      el.style[prop] = "";
    } catch (err) {
      return false;
    }
    return cache2[prop];
  }
  var cache$1 = {};
  var transitionProperties = {
    transition: 1,
    "transition-property": 1,
    "-webkit-transition": 1,
    "-webkit-transition-property": 1
  };
  var transPropsRegExp = /(^\s*[\w-]+)|, (\s*[\w-]+)(?![^()]*\))/g;
  var el$1;
  function prefixTransitionCallback(match, p1, p2) {
    if (p1 === "var")
      return "var";
    if (p1 === "all")
      return "all";
    if (p2 === "all")
      return ", all";
    var prefixedValue = p1 ? supportedProperty17(p1) : ", " + supportedProperty17(p2);
    if (!prefixedValue)
      return p1 || p2;
    return prefixedValue;
  }
  if (module_default)
    el$1 = document.createElement("p");
  function supportedValue(property, value) {
    var prefixedValue = value;
    if (!el$1 || property === "content")
      return value;
    if (typeof prefixedValue !== "string" || !isNaN(parseInt(prefixedValue, 10))) {
      return prefixedValue;
    }
    var cacheKey = property + prefixedValue;
    if (cache$1[cacheKey] != null) {
      return cache$1[cacheKey];
    }
    try {
      el$1.style[property] = prefixedValue;
    } catch (err) {
      cache$1[cacheKey] = false;
      return false;
    }
    if (transitionProperties[property]) {
      prefixedValue = prefixedValue.replace(transPropsRegExp, prefixTransitionCallback);
    } else if (el$1.style[property] === "") {
      prefixedValue = prefix.css + prefixedValue;
      if (prefixedValue === "-ms-flex")
        el$1.style[property] = "-ms-flexbox";
      el$1.style[property] = prefixedValue;
      if (el$1.style[property] === "") {
        cache$1[cacheKey] = false;
        return false;
      }
    }
    el$1.style[property] = "";
    cache$1[cacheKey] = prefixedValue;
    return cache$1[cacheKey];
  }

  // node_modules/jss-plugin-vendor-prefixer/dist/jss-plugin-vendor-prefixer.esm.js
  function jssVendorPrefixer() {
    function onProcessRule3(rule) {
      if (rule.type === "keyframes") {
        var atRule = rule;
        atRule.at = supportedKeyframes(atRule.at);
      }
    }
    function prefixStyle(style) {
      for (var prop in style) {
        var value = style[prop];
        if (prop === "fallbacks" && Array.isArray(value)) {
          style[prop] = value.map(prefixStyle);
          continue;
        }
        var changeProp = false;
        var supportedProp = supportedProperty17(prop);
        if (supportedProp && supportedProp !== prop)
          changeProp = true;
        var changeValue = false;
        var supportedValue$1 = supportedValue(supportedProp, toCssValue(value));
        if (supportedValue$1 && supportedValue$1 !== value)
          changeValue = true;
        if (changeProp || changeValue) {
          if (changeProp)
            delete style[prop];
          style[supportedProp || prop] = supportedValue$1 || value;
        }
      }
      return style;
    }
    function onProcessStyle2(style, rule) {
      if (rule.type !== "style")
        return style;
      return prefixStyle(style);
    }
    function onChangeValue2(value, prop) {
      return supportedValue(prop, toCssValue(value)) || value;
    }
    return {
      onProcessRule: onProcessRule3,
      onProcessStyle: onProcessStyle2,
      onChangeValue: onChangeValue2
    };
  }
  var jss_plugin_vendor_prefixer_esm_default = jssVendorPrefixer;

  // node_modules/jss-plugin-props-sort/dist/jss-plugin-props-sort.esm.js
  function jssPropsSort() {
    var sort = function sort2(prop0, prop1) {
      if (prop0.length === prop1.length) {
        return prop0 > prop1 ? 1 : -1;
      }
      return prop0.length - prop1.length;
    };
    return {
      onProcessStyle: function onProcessStyle2(style, rule) {
        if (rule.type !== "style")
          return style;
        var newStyle = {};
        var props = Object.keys(style).sort(sort);
        for (var i2 = 0; i2 < props.length; i2++) {
          newStyle[props[i2]] = style[props[i2]];
        }
        return newStyle;
      }
    };
  }
  var jss_plugin_props_sort_esm_default = jssPropsSort;

  // node_modules/jss-preset-default/dist/jss-preset-default.esm.js
  var create3 = function create4(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      plugins: [jss_plugin_rule_value_function_esm_default(), jss_plugin_rule_value_observable_esm_default(options.observable), jss_plugin_template_esm_default(), jss_plugin_global_esm_default(), jss_plugin_extend_esm_default(), jss_plugin_nested_esm_default(), jss_plugin_compose_esm_default(), jss_plugin_camel_case_esm_default(), jss_plugin_default_unit_esm_default(options.defaultUnit), jss_plugin_expand_esm_default(), jss_plugin_vendor_prefixer_esm_default(), jss_plugin_props_sort_esm_default()]
    };
  };
  var jss_preset_default_esm_default = create3;

  // node_modules/@ungap/custom-event/esm/index.js
  /*! (c) Andrea Giammarchi - ISC */
  var self2 = {};
  self2.CustomEvent = typeof CustomEvent === "function" ? CustomEvent : function(__p__) {
    CustomEvent2[__p__] = new CustomEvent2("").constructor[__p__];
    return CustomEvent2;
    function CustomEvent2(type, init) {
      if (!init)
        init = {};
      var e = document.createEvent("CustomEvent");
      e.initCustomEvent(type, !!init.bubbles, !!init.cancelable, init.detail);
      return e;
    }
  }("prototype");
  var esm_default = self2.CustomEvent;

  // node_modules/@ungap/weakset/esm/index.js
  /*! (c) Andrea Giammarchi - ISC */
  var self3 = {};
  try {
    self3.WeakSet = WeakSet;
  } catch (WeakSet2) {
    (function(WeakMap2) {
      var all = new WeakMap2();
      var proto = WeakSet3.prototype;
      proto.add = function(value) {
        return all.get(this).set(value, 1), this;
      };
      proto.delete = function(value) {
        return all.get(this).delete(value);
      };
      proto.has = function(value) {
        return all.get(this).has(value);
      };
      self3.WeakSet = WeakSet3;
      function WeakSet3(iterable) {
        "use strict";
        all.set(this, new WeakMap2());
        if (iterable)
          iterable.forEach(this.add, this);
      }
    })(WeakMap);
  }
  var esm_default2 = self3.WeakSet;

  // node_modules/disconnected/esm/index.js
  /*! (c) Andrea Giammarchi */
  function disconnected(poly) {
    "use strict";
    var Event = poly.Event;
    var WeakSet2 = poly.WeakSet;
    var notObserving = true;
    var observer2 = null;
    return function observe2(node4) {
      if (notObserving) {
        notObserving = !notObserving;
        observer2 = new WeakSet2();
        startObserving(node4.ownerDocument);
      }
      observer2.add(node4);
      return node4;
    };
    function startObserving(document2) {
      var connected = new WeakSet2();
      var disconnected3 = new WeakSet2();
      try {
        new MutationObserver(changes).observe(document2, {subtree: true, childList: true});
      } catch (o_O) {
        var timer = 0;
        var records = [];
        var reschedule = function(record) {
          records.push(record);
          clearTimeout(timer);
          timer = setTimeout(function() {
            changes(records.splice(timer = 0, records.length));
          }, 0);
        };
        document2.addEventListener("DOMNodeRemoved", function(event2) {
          reschedule({addedNodes: [], removedNodes: [event2.target]});
        }, true);
        document2.addEventListener("DOMNodeInserted", function(event2) {
          reschedule({addedNodes: [event2.target], removedNodes: []});
        }, true);
      }
      function changes(records2) {
        for (var record, length = records2.length, i2 = 0; i2 < length; i2++) {
          record = records2[i2];
          dispatchAll(record.removedNodes, "disconnected", disconnected3, connected);
          dispatchAll(record.addedNodes, "connected", connected, disconnected3);
        }
      }
      function dispatchAll(nodes, type, wsin, wsout) {
        for (var node4, event2 = new Event(type), length = nodes.length, i2 = 0; i2 < length; (node4 = nodes[i2++]).nodeType === 1 && dispatchTarget(node4, event2, type, wsin, wsout))
          ;
      }
      function dispatchTarget(node4, event2, type, wsin, wsout) {
        if (observer2.has(node4) && !wsin.has(node4)) {
          wsout.delete(node4);
          wsin.add(node4);
          node4.dispatchEvent(event2);
        }
        for (var children = node4.children || [], length = children.length, i2 = 0; i2 < length; dispatchTarget(children[i2++], event2, type, wsin, wsout))
          ;
      }
    }
  }
  var esm_default3 = disconnected;

  // node_modules/reraf/esm/index.js
  var compat = typeof cancelAnimationFrame === "function";
  var cAF = compat ? cancelAnimationFrame : clearTimeout;
  var rAF = compat ? requestAnimationFrame : setTimeout;
  function reraf(limit) {
    var force, timer, callback, self4, args;
    reset();
    return function reschedule(_callback, _self, _args) {
      callback = _callback;
      self4 = _self;
      args = _args;
      if (!timer)
        timer = rAF(invoke);
      if (--force < 0)
        stop2(true);
      return stop2;
    };
    function invoke() {
      reset();
      callback.apply(self4, args || []);
    }
    function reset() {
      force = limit || Infinity;
      timer = compat ? 0 : null;
    }
    function stop2(flush) {
      var didStop = !!timer;
      if (didStop) {
        cAF(timer);
        if (flush)
          invoke();
      }
      return didStop;
    }
  }

  // node_modules/umap/esm/index.js
  var esm_default4 = (_2) => ({
    get: (key) => _2.get(key),
    set: (key, value) => (_2.set(key, value), value)
  });

  // node_modules/augmentor/esm/index.js
  /*! (c) Andrea Giammarchi - ISC */
  var state = null;
  var augmentor = (fn2) => {
    const stack = [];
    return function hook() {
      const prev = state;
      const after = [];
      state = {
        hook,
        args: arguments,
        stack,
        i: 0,
        length: stack.length,
        after
      };
      try {
        return fn2.apply(null, arguments);
      } finally {
        state = prev;
        for (let i2 = 0, {length} = after; i2 < length; i2++)
          after[i2]();
      }
    };
  };
  var updates = esm_default4(new WeakMap());
  var hookdate = (hook, ctx, args) => {
    hook.apply(ctx, args);
  };
  var defaults = {async: false, always: false};
  var getValue = (value, f2) => typeof f2 == "function" ? f2(value) : f2;
  var useReducer = (reducer3, value, init, options) => {
    const i2 = state.i++;
    const {hook, args, stack, length} = state;
    if (i2 === length)
      state.length = stack.push({});
    const ref2 = stack[i2];
    ref2.args = args;
    if (i2 === length) {
      const fn2 = typeof init === "function";
      const {async: asy, always} = (fn2 ? options : init) || options || defaults;
      ref2.$ = fn2 ? init(value) : getValue(void 0, value);
      ref2._ = asy ? updates.get(hook) || updates.set(hook, reraf()) : hookdate;
      ref2.f = (value2) => {
        const $value = reducer3(ref2.$, value2);
        if (always || ref2.$ !== $value) {
          ref2.$ = $value;
          ref2._(hook, null, ref2.args);
        }
      };
    }
    return [ref2.$, ref2.f];
  };
  var useState = (value, options) => useReducer(getValue, value, void 0, options);
  var hooks = new WeakMap();
  var effects = new WeakMap();
  var fx = esm_default4(effects);
  var stop = () => {
  };
  var createEffect = (asy) => (effect, guards) => {
    const i2 = state.i++;
    const {hook, after, stack, length} = state;
    if (i2 < length) {
      const info = stack[i2];
      const {update: update2, values, stop: stop2} = info;
      if (!guards || guards.some(different, values)) {
        info.values = guards;
        if (asy)
          stop2(asy);
        const {clean} = info;
        if (clean) {
          info.clean = null;
          clean();
        }
        const invoke = () => {
          info.clean = effect();
        };
        if (asy)
          update2(invoke);
        else
          after.push(invoke);
      }
    } else {
      const update2 = asy ? reraf() : stop;
      const info = {clean: null, update: update2, values: guards, stop};
      state.length = stack.push(info);
      (fx.get(hook) || fx.set(hook, [])).push(info);
      const invoke = () => {
        info.clean = effect();
      };
      if (asy)
        info.stop = update2(invoke);
      else
        after.push(invoke);
    }
  };
  var dropEffect = (hook) => {
    (effects.get(hook) || []).forEach((info) => {
      const {clean, stop: stop2} = info;
      stop2();
      if (clean) {
        info.clean = null;
        clean();
      }
    });
  };
  var hasEffect = effects.has.bind(effects);
  var useEffect = createEffect(true);
  var useLayoutEffect = createEffect(false);
  var useMemo = (memo, guards) => {
    const i2 = state.i++;
    const {stack, length} = state;
    if (i2 === length)
      state.length = stack.push({$: memo(), _: guards});
    else if (!guards || guards.some(different, stack[i2]._))
      stack[i2] = {$: memo(), _: guards};
    return stack[i2].$;
  };
  var useCallback = (fn2, guards) => useMemo(() => fn2, guards);
  function different(value, i2) {
    return value !== this[i2];
  }

  // node_modules/dom-augmentor/esm/index.js
  /*! (c) Andrea Giammarchi - ISC */
  var find = (node4) => {
    let {firstChild} = node4;
    while (firstChild && firstChild.nodeType !== 1)
      firstChild = firstChild.nextSibling;
    if (firstChild)
      return firstChild;
    throw "unobservable";
  };
  var observe = esm_default3({Event: esm_default, WeakSet: esm_default2});
  var observer = (element, handler) => {
    const {nodeType: nodeType2} = element;
    if (nodeType2) {
      const node4 = nodeType2 === 1 ? element : find(element);
      observe(node4);
      node4.addEventListener("disconnected", handler, false);
    } else {
      const value = element.valueOf();
      if (value !== element)
        observer(value, handler);
    }
  };
  var augmentor4 = (fn2) => {
    let handler = null;
    const hook = augmentor(fn2);
    return function() {
      const node4 = hook.apply(this, arguments);
      if (hasEffect(hook))
        observer(node4, handler || (handler = dropEffect.bind(null, hook)));
      return node4;
    };
  };

  // node_modules/uparser/esm/index.js
  var attr = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/;
  var empty = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;
  var node = /<[a-z][^>]+$/i;
  var notNode = />[^<>]*$/;
  var selfClosing = /<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/>)/ig;
  var trimEnd = /\s+$/;
  var isNode = (template, i2) => 0 < i2-- && (node.test(template[i2]) || !notNode.test(template[i2]) && isNode(template, i2));
  var regular = (original, name, extra) => empty.test(name) ? original : `<${name}${extra.replace(trimEnd, "")}></${name}>`;
  var esm_default5 = (template, prefix4, svg3) => {
    const text2 = [];
    const {length} = template;
    for (let i2 = 1; i2 < length; i2++) {
      const chunk = template[i2 - 1];
      text2.push(attr.test(chunk) && isNode(template, i2) ? chunk.replace(attr, (_2, $1, $2) => `${prefix4}${i2 - 1}=${$2 || '"'}${$1}${$2 ? "" : '"'}`) : `${chunk}<!--${prefix4}${i2 - 1}-->`);
    }
    text2.push(template[length - 1]);
    const output = text2.join("").trim();
    return svg3 ? output : output.replace(selfClosing, regular);
  };

  // node_modules/uarray/esm/index.js
  var {isArray} = Array;
  var {indexOf, slice} = [];

  // node_modules/uwire/esm/index.js
  var ELEMENT_NODE = 1;
  var nodeType = 111;
  var remove = ({firstChild, lastChild}) => {
    const range = document.createRange();
    range.setStartAfter(firstChild);
    range.setEndAfter(lastChild);
    range.deleteContents();
    return firstChild;
  };
  var diffable = (node4, operation) => node4.nodeType === nodeType ? 1 / operation < 0 ? operation ? remove(node4) : node4.lastChild : operation ? node4.valueOf() : node4.firstChild : node4;
  var persistent = (fragment) => {
    const {childNodes} = fragment;
    const {length} = childNodes;
    if (length < 2)
      return length ? childNodes[0] : fragment;
    const nodes = slice.call(childNodes, 0);
    const firstChild = nodes[0];
    const lastChild = nodes[length - 1];
    return {
      ELEMENT_NODE,
      nodeType,
      firstChild,
      lastChild,
      valueOf() {
        if (childNodes.length !== length) {
          let i2 = 0;
          while (i2 < length)
            fragment.appendChild(nodes[i2++]);
        }
        return fragment;
      }
    };
  };

  // node_modules/udomdiff/esm/index.js
  var esm_default6 = (parentNode, a2, b2, get, before) => {
    const bLength = b2.length;
    let aEnd = a2.length;
    let bEnd = bLength;
    let aStart = 0;
    let bStart = 0;
    let map = null;
    while (aStart < aEnd || bStart < bEnd) {
      if (aEnd === aStart) {
        const node4 = bEnd < bLength ? bStart ? get(b2[bStart - 1], -0).nextSibling : get(b2[bEnd - bStart], 0) : before;
        while (bStart < bEnd)
          parentNode.insertBefore(get(b2[bStart++], 1), node4);
      } else if (bEnd === bStart) {
        while (aStart < aEnd) {
          if (!map || !map.has(a2[aStart]))
            parentNode.removeChild(get(a2[aStart], -1));
          aStart++;
        }
      } else if (a2[aStart] === b2[bStart]) {
        aStart++;
        bStart++;
      } else if (a2[aEnd - 1] === b2[bEnd - 1]) {
        aEnd--;
        bEnd--;
      } else if (a2[aStart] === b2[bEnd - 1] && b2[bStart] === a2[aEnd - 1]) {
        const node4 = get(a2[--aEnd], -1).nextSibling;
        parentNode.insertBefore(get(b2[bStart++], 1), get(a2[aStart++], -1).nextSibling);
        parentNode.insertBefore(get(b2[--bEnd], 1), node4);
        a2[aEnd] = b2[bEnd];
      } else {
        if (!map) {
          map = new Map();
          let i2 = bStart;
          while (i2 < bEnd)
            map.set(b2[i2], i2++);
        }
        if (map.has(a2[aStart])) {
          const index = map.get(a2[aStart]);
          if (bStart < index && index < bEnd) {
            let i2 = aStart;
            let sequence = 1;
            while (++i2 < aEnd && i2 < bEnd && map.get(a2[i2]) === index + sequence)
              sequence++;
            if (sequence > index - bStart) {
              const node4 = get(a2[aStart], 0);
              while (bStart < index)
                parentNode.insertBefore(get(b2[bStart++], 1), node4);
            } else {
              parentNode.replaceChild(get(b2[bStart++], 1), get(a2[aStart++], -1));
            }
          } else
            aStart++;
        } else
          parentNode.removeChild(get(a2[aStart++], -1));
      }
    }
    return b2;
  };

  // node_modules/uhandlers/esm/index.js
  var aria = (node4) => (values) => {
    for (const key in values) {
      const name = key === "role" ? key : `aria-${key}`;
      const value = values[key];
      if (value == null)
        node4.removeAttribute(name);
      else
        node4.setAttribute(name, value);
    }
  };
  var attribute = (node4, name) => {
    let oldValue, orphan = true;
    const attributeNode = document.createAttributeNS(null, name);
    return (newValue) => {
      if (oldValue !== newValue) {
        oldValue = newValue;
        if (oldValue == null) {
          if (!orphan) {
            node4.removeAttributeNode(attributeNode);
            orphan = true;
          }
        } else {
          attributeNode.value = newValue;
          if (orphan) {
            node4.setAttributeNodeNS(attributeNode);
            orphan = false;
          }
        }
      }
    };
  };
  var data = ({dataset}) => (values) => {
    for (const key in values) {
      const value = values[key];
      if (value == null)
        delete dataset[key];
      else
        dataset[key] = value;
    }
  };
  var event = (node4, name) => {
    let oldValue, type = name.slice(2);
    if (!(name in node4) && name.toLowerCase() in node4)
      type = type.toLowerCase();
    return (newValue) => {
      const info = isArray(newValue) ? newValue : [newValue, false];
      if (oldValue !== info[0]) {
        if (oldValue)
          node4.removeEventListener(type, oldValue, info[1]);
        if (oldValue = info[0])
          node4.addEventListener(type, oldValue, info[1]);
      }
    };
  };
  var ref = (node4) => (value) => {
    if (typeof value === "function")
      value(node4);
    else
      value.current = node4;
  };
  var setter = (node4, key) => (value) => {
    node4[key] = value;
  };
  var text = (node4) => {
    let oldValue;
    return (newValue) => {
      if (oldValue != newValue) {
        oldValue = newValue;
        node4.textContent = newValue == null ? "" : newValue;
      }
    };
  };

  // node_modules/@ungap/create-content/esm/index.js
  /*! (c) Andrea Giammarchi - ISC */
  var createContent = function(document2) {
    "use strict";
    var FRAGMENT = "fragment";
    var TEMPLATE = "template";
    var HAS_CONTENT = "content" in create7(TEMPLATE);
    var createHTML = HAS_CONTENT ? function(html3) {
      var template = create7(TEMPLATE);
      template.innerHTML = html3;
      return template.content;
    } : function(html3) {
      var content = create7(FRAGMENT);
      var template = create7(TEMPLATE);
      var childNodes = null;
      if (/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(html3)) {
        var selector = RegExp.$1;
        template.innerHTML = "<table>" + html3 + "</table>";
        childNodes = template.querySelectorAll(selector);
      } else {
        template.innerHTML = html3;
        childNodes = template.childNodes;
      }
      append(content, childNodes);
      return content;
    };
    return function createContent2(markup, type) {
      return (type === "svg" ? createSVG : createHTML)(markup);
    };
    function append(root, childNodes) {
      var length = childNodes.length;
      while (length--)
        root.appendChild(childNodes[0]);
    }
    function create7(element) {
      return element === FRAGMENT ? document2.createDocumentFragment() : document2.createElementNS("http://www.w3.org/1999/xhtml", element);
    }
    function createSVG(svg3) {
      var content = create7(FRAGMENT);
      var template = create7("div");
      template.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + svg3 + "</svg>";
      append(content, template.firstChild.childNodes);
      return content;
    }
  }(document);
  var esm_default7 = createContent;

  // node_modules/uhtml/esm/node.js
  var reducePath = ({childNodes}, i2) => childNodes[i2];
  var createPath = (node4) => {
    const path = [];
    let {parentNode} = node4;
    while (parentNode) {
      path.push(indexOf.call(parentNode.childNodes, node4));
      node4 = parentNode;
      parentNode = node4.parentNode;
    }
    return path;
  };
  var {createTreeWalker, importNode} = document;
  var isImportNodeLengthWrong = importNode.length != 1;
  var createFragment = isImportNodeLengthWrong ? (text2, type) => importNode.call(document, esm_default7(text2, type), true) : esm_default7;
  var createWalker = isImportNodeLengthWrong ? (fragment) => createTreeWalker.call(document, fragment, 1 | 128, null, false) : (fragment) => createTreeWalker.call(document, fragment, 1 | 128);

  // node_modules/uhtml/esm/handlers.js
  var diff = (comment, oldNodes, newNodes) => esm_default6(comment.parentNode, oldNodes, newNodes, diffable, comment);
  var handleAnything = (comment) => {
    let oldValue, text2, nodes = [];
    const anyContent = (newValue) => {
      switch (typeof newValue) {
        case "string":
        case "number":
        case "boolean":
          if (oldValue !== newValue) {
            oldValue = newValue;
            if (text2)
              text2.textContent = newValue;
            else
              text2 = document.createTextNode(newValue);
            nodes = diff(comment, nodes, [text2]);
          }
          break;
        case "object":
        case "undefined":
          if (newValue == null) {
            if (oldValue != newValue) {
              oldValue = newValue;
              nodes = diff(comment, nodes, []);
            }
            break;
          }
          if (isArray(newValue)) {
            oldValue = newValue;
            if (newValue.length === 0)
              nodes = diff(comment, nodes, []);
            else if (typeof newValue[0] === "object")
              nodes = diff(comment, nodes, newValue);
            else
              anyContent(String(newValue));
            break;
          }
          if ("ELEMENT_NODE" in newValue && oldValue !== newValue) {
            oldValue = newValue;
            nodes = diff(comment, nodes, newValue.nodeType === 11 ? slice.call(newValue.childNodes) : [newValue]);
          }
      }
    };
    return anyContent;
  };
  var handleAttribute = (node4, name) => {
    if (name === "ref")
      return ref(node4);
    if (name === "aria")
      return aria(node4);
    if (name === ".dataset")
      return data(node4);
    if (name.slice(0, 1) === ".")
      return setter(node4, name.slice(1));
    if (name.slice(0, 2) === "on")
      return event(node4, name);
    return attribute(node4, name);
  };
  function handlers(options) {
    const {type, path} = options;
    const node4 = path.reduceRight(reducePath, this);
    return type === "node" ? handleAnything(node4) : type === "attr" ? handleAttribute(node4, options.name) : text(node4);
  }

  // node_modules/uhtml/esm/rabbit.js
  var prefix2 = "is\xB5";
  var cache3 = esm_default4(new WeakMap());
  var createCache = () => ({
    stack: [],
    entry: null,
    wire: null
  });
  var createEntry = (type, template) => {
    const {content, updates: updates2} = mapUpdates(type, template);
    return {type, template, content, updates: updates2, wire: null};
  };
  var mapTemplate = (type, template) => {
    const text2 = esm_default5(template, prefix2, type === "svg");
    const content = createFragment(text2, type);
    const tw = createWalker(content);
    const nodes = [];
    const length = template.length - 1;
    let i2 = 0;
    let search = `${prefix2}${i2}`;
    while (i2 < length) {
      const node4 = tw.nextNode();
      if (!node4)
        throw `bad template: ${text2}`;
      if (node4.nodeType === 8) {
        if (node4.textContent === search) {
          nodes.push({type: "node", path: createPath(node4)});
          search = `${prefix2}${++i2}`;
        }
      } else {
        while (node4.hasAttribute(search)) {
          nodes.push({
            type: "attr",
            path: createPath(node4),
            name: node4.getAttribute(search)
          });
          node4.removeAttribute(search);
          search = `${prefix2}${++i2}`;
        }
        if (/^(?:style|textarea)$/i.test(node4.tagName) && node4.textContent.trim() === `<!--${search}-->`) {
          node4.textContent = "";
          nodes.push({type: "text", path: createPath(node4)});
          search = `${prefix2}${++i2}`;
        }
      }
    }
    return {content, nodes};
  };
  var mapUpdates = (type, template) => {
    const {content, nodes} = cache3.get(template) || cache3.set(template, mapTemplate(type, template));
    const fragment = importNode.call(document, content, true);
    const updates2 = nodes.map(handlers, fragment);
    return {content: fragment, updates: updates2};
  };
  var unroll = (info, {type, template, values}) => {
    const {length} = values;
    unrollValues(info, values, length);
    let {entry} = info;
    if (!entry || (entry.template !== template || entry.type !== type))
      info.entry = entry = createEntry(type, template);
    const {content, updates: updates2, wire} = entry;
    for (let i2 = 0; i2 < length; i2++)
      updates2[i2](values[i2]);
    return wire || (entry.wire = persistent(content));
  };
  var unrollValues = ({stack}, values, length) => {
    for (let i2 = 0; i2 < length; i2++) {
      const hole = values[i2];
      if (hole instanceof Hole)
        values[i2] = unroll(stack[i2] || (stack[i2] = createCache()), hole);
      else if (isArray(hole))
        unrollValues(stack[i2] || (stack[i2] = createCache()), hole, hole.length);
      else
        stack[i2] = null;
    }
    if (length < stack.length)
      stack.splice(length);
  };
  function Hole(type, template, values) {
    this.type = type;
    this.template = template;
    this.values = values;
  }

  // node_modules/uhtml/esm/index.js
  var {create: create5, defineProperties} = Object;
  var tag = (type) => {
    const keyed = esm_default4(new WeakMap());
    const fixed = (cache7) => (template, ...values) => unroll(cache7, {type, template, values});
    return defineProperties((template, ...values) => new Hole(type, template, values), {
      for: {
        value(ref2, id) {
          const memo = keyed.get(ref2) || keyed.set(ref2, create5(null));
          return memo[id] || (memo[id] = fixed(createCache()));
        }
      },
      node: {
        value: (template, ...values) => unroll(createCache(), {type, template, values}).valueOf()
      }
    });
  };
  var cache4 = esm_default4(new WeakMap());
  var render = (where, what) => {
    const hole = typeof what === "function" ? what() : what;
    const info = cache4.get(where) || cache4.set(where, createCache());
    const wire = hole instanceof Hole ? unroll(info, hole) : hole;
    if (wire !== info.wire) {
      info.wire = wire;
      where.textContent = "";
      where.appendChild(wire.valueOf());
    }
    return where;
  };
  var html = tag("html");
  var svg = tag("svg");

  // node_modules/uland/esm/index.js
  var {isArray: isArray2} = Array;
  var {create: create6} = Object;
  var html2 = (template, ...values) => new Hole("html", template, values);
  html2.for = createFor(html);
  var svg2 = (template, ...values) => new Hole("svg", template, values);
  svg2.for = createFor(svg);
  var cache5 = esm_default4(new WeakMap());
  var render2 = (where, what) => {
    const hook = typeof what === "function" ? what() : what;
    const info = cache5.get(where) || cache5.set(where, createCache2(null));
    info.w = where;
    info.W = what;
    return render(where, hook instanceof Hook ? unroll2(info, hook) : (unrollHole(info, hook), hook));
  };
  var update = false;
  var updateEntry = (entry, node4) => {
    if (node4 !== entry.node) {
      if (entry.node)
        update = true;
      entry.node = node4;
    }
  };
  var createHook = (info, entry) => augmentor4(function() {
    const hole = entry.fn.apply(null, arguments);
    if (hole instanceof Hole) {
      unrollHole(info, hole);
      updateEntry(entry, view(entry, hole));
    } else
      updateEntry(entry, hole);
    try {
      return entry.node;
    } finally {
      if (update) {
        update = false;
        let p2 = info;
        while (p2.p)
          p2 = p2.p;
        render2(p2.w, p2.W);
      }
    }
  });
  var createCache2 = (p2) => ({p: p2, stack: [], entry: null});
  var unroll2 = (info, {fn: fn2, template, values}) => {
    let {entry} = info;
    if (!entry || entry.fn !== fn2) {
      info.entry = entry = {fn: fn2, hook: null, node: null};
      entry.hook = createHook(createCache2(info), entry);
    }
    return entry.hook(template, ...values);
  };
  var unrollHole = (info, {values}) => {
    unrollValues2(info, values, values.length);
  };
  var unrollValues2 = (info, values, length) => {
    const {stack} = info;
    for (let i2 = 0; i2 < length; i2++) {
      const hook = values[i2];
      if (hook instanceof Hook)
        values[i2] = unroll2(stack[i2] || (stack[i2] = createCache2(info)), hook);
      else if (hook instanceof Hole)
        unrollHole(stack[i2] || (stack[i2] = createCache2(info)), hook);
      else if (isArray2(hook))
        unrollValues2(stack[i2] || (stack[i2] = createCache2(info)), hook, hook.length);
      else
        stack[i2] = null;
    }
    if (length < stack.length)
      stack.splice(length);
  };
  var view = (entry, {type, template, values}) => (type === "svg" ? svg : html).for(entry, type)(template, ...values);
  function Component(fn2) {
    return (template, ...values) => new Hook(fn2, template, values);
  }
  function Hook(fn2, template, values) {
    this.fn = fn2;
    this.template = template;
    this.values = values;
  }
  function createFor(uhtml2) {
    const cache7 = esm_default4(new WeakMap());
    return (entry, id) => {
      const store6 = cache7.get(entry) || cache7.set(entry, create6(null));
      const info = store6[id] || (store6[id] = createCache2(null));
      return (template, ...values) => {
        unrollValues2(info, values);
        return uhtml2.for(entry, id)(template, ...values);
      };
    };
  }

  // ../src/reducer.ts
  var setSavesMetadataActionType = "@@REDUX_SAVES@@/setSavesMetadataActionType";
  function getInitialState() {
    return {
      groupSaves: {},
      currentBranchSaves: {},
      currentGroupSaves: {}
    };
  }
  function createSetSaveMetadataAction(payload) {
    return {
      type: setSavesMetadataActionType,
      payload
    };
  }
  function savesReducer(state2 = getInitialState(), action) {
    switch (action.type) {
      case setSavesMetadataActionType: {
        const {groupSaves, currentBranchSaves, currentGroupSaves} = action.payload;
        return {
          ...state2,
          groupSaves: {
            ...state2.groupSaves,
            ...groupSaves
          },
          currentBranchSaves: {
            ...state2.currentBranchSaves,
            ...currentBranchSaves
          },
          currentGroupSaves: {
            ...state2.currentGroupSaves,
            ...currentGroupSaves
          }
        };
      }
      default:
        return state2;
    }
  }

  // ../src/helpers.ts
  var SAVE_PREFIX = "@@REDUX-SAVE@@";
  function isGeneratedSaveKey(key) {
    return typeof key === "string" && key.startsWith(SAVE_PREFIX);
  }
  var groupSaveIndex = 0;
  function createGroupSaveKey() {
    return `${SAVE_PREFIX}/save-${groupSaveIndex++}`;
  }
  var groupAutoSaveIndex = 0;
  function updateGroupAutoSaveKey() {
    groupAutoSaveIndex += 1;
  }
  function getGroupAutoSaveKey() {
    return `${SAVE_PREFIX}/autosave-${groupAutoSaveIndex}`;
  }
  var mapGroupKeyToNeedAutoSave = new Map();
  function setGroupChangeState(groupKey, state2) {
    mapGroupKeyToNeedAutoSave.set(groupKey, state2);
  }
  function getGroupChangeState(groupKey) {
    return mapGroupKeyToNeedAutoSave.get(groupKey);
  }
  function createSave(groupSaveKey, snapshot) {
    return {groupSaveKey, snapshot};
  }
  var isDirty = true;
  var groupKeysArray;
  var groupKeysSet = new Set();
  function addGroupKey(key) {
    groupKeysSet.add(key);
    isDirty = true;
  }
  function deleteGroupKey(key) {
    groupKeysSet.delete(key);
    isDirty = true;
  }
  function getGroupKeys() {
    if (isDirty) {
      isDirty = false;
      groupKeysArray = Array.from(groupKeysSet);
    }
    return groupKeysArray;
  }
  function createSaveStore() {
    return new Map();
  }
  function getSave(store6, key) {
    return store6.get(key);
  }
  var getSaveStoreSize = (store6) => store6.size;
  function addSave(store6, save) {
    store6.set(save.groupSaveKey, save);
  }
  function deleteSave(store6, key) {
    store6.delete(key);
  }
  function clearSaves(store6) {
    store6.clear();
  }
  function createGroupSave(groupKey, saveKey, prevSaveKey, nextSaveKey) {
    return {groupKey, key: saveKey, prevSaveKey, nextSaveKey};
  }
  function trySetNextSaveKeyForGroupSave(groupKey, saveKey, nextSaveKey) {
    const groupSave = getGroupSave(groupKey, saveKey);
    if (groupSave !== void 0) {
      groupSave.nextSaveKey = nextSaveKey;
    }
  }
  var groupSaveStore = new Map();
  function getGroupSave(groupKey, saveKey) {
    return groupSaveStore.get(groupKey).get(saveKey);
  }
  function getGroupSaveKeys(groupKey) {
    return Array.from(groupSaveStore.get(groupKey)?.keys() || []);
  }
  function getBranchForSave(groupKey, saveKey) {
    const branch = [];
    const groupSave = getGroupSave(groupKey, saveKey);
    if (groupSave === void 0) {
      return branch;
    }
    branch.push(groupSave.key);
    if (groupSave.nextSaveKey !== void 0) {
      groupSavesIterator(groupKey, groupSave.nextSaveKey, (groupSave2) => {
        branch.push(groupSave2.key);
        return groupSave2.nextSaveKey;
      });
    }
    if (groupSave.prevSaveKey !== void 0) {
      groupSavesIterator(groupKey, groupSave.prevSaveKey, (groupSave2) => {
        branch.unshift(groupSave2.key);
        return groupSave2.prevSaveKey;
      });
    }
    return branch;
  }
  function addGroupSave(save) {
    if (!groupSaveStore.has(save.groupKey)) {
      groupSaveStore.set(save.groupKey, new Map());
    }
    groupSaveStore.get(save.groupKey).set(save.key, save);
  }
  function deleteGroupSave(groupKey, saveKey) {
    groupSaveStore.get(groupKey).delete(saveKey);
  }
  function deleteGroupSaveSafety(groupKey, groupSaveKey) {
    const groupSave = getGroupSave(groupKey, groupSaveKey);
    if (groupSave.prevSaveKey && groupSave.nextSaveKey) {
      const prevGroupSave = getGroupSave(groupKey, groupSave.prevSaveKey);
      const nextGroupSave = getGroupSave(groupKey, groupSave.nextSaveKey);
      nextGroupSave.prevSaveKey = prevGroupSave.key;
      prevGroupSave.nextSaveKey = nextGroupSave.key;
    }
    deleteGroupSave(groupKey, groupSave.key);
    if (getCurrentGroupSaveKey(groupKey) === groupSaveKey) {
      setCurrentGroupSaveKey(groupKey, groupSave.prevSaveKey);
    }
  }
  function clearGroupSaveStore(key) {
    groupSaveStore.get(key)?.clear();
  }
  var mapGroupKeyToCurrentGroupSaveKey = new Map();
  function setCurrentGroupSaveKey(key, saveKey) {
    mapGroupKeyToCurrentGroupSaveKey.set(key, saveKey);
  }
  function getCurrentGroupSaveKey(key) {
    return mapGroupKeyToCurrentGroupSaveKey.get(key);
  }
  function groupSavesIterator(groupKey, groupSaveKey, cb) {
    let groupSave = getGroupSave(groupKey, groupSaveKey);
    let tmpGroupSave;
    while (groupSave !== void 0) {
      tmpGroupSave = groupSave;
      const key = cb(groupSave);
      groupSave = key ? getGroupSave(groupKey, key) : void 0;
    }
    return tmpGroupSave;
  }
  var mapGroupKeyToSaveStores = new Map();
  var deleteSaveStores = (groupKey) => {
    deleteGroupKey(groupKey);
    mapGroupKeyToSaveStores.delete(groupKey);
  };
  var registerSaveStore = (groupKey, store6) => {
    if (!mapGroupKeyToSaveStores.has(groupKey)) {
      addGroupKey(groupKey);
      mapGroupKeyToSaveStores.set(groupKey, []);
    }
    mapGroupKeyToSaveStores.get(groupKey).push(store6);
  };

  // ../src/definitions.ts
  var EMPTY_OBJECT = Object.freeze({});
  var DEFAULT_GROUP_KEY = "__DEFAULT_GROUP_KEY__";
  var ActionType;
  (function(ActionType2) {
    ActionType2["SetInitState"] = "@@REDUX_SAVE@@/SetInitState";
    ActionType2["ClearSaves"] = "@@REDUX_SAVE@@/ClearSaves";
    ActionType2["AddSave"] = "@@REDUX_SAVE@@/AddSave";
    ActionType2["RemoveSaves"] = "@@REDUX_SAVE@@/RemoveLastsSaves";
    ActionType2["LoadSave"] = "@@REDUX_SAVE@@/LoadSave";
    ActionType2["LoadPrevSave"] = "@@REDUX_SAVE@@/LoadPrevSave";
    ActionType2["LoadNextSave"] = "@@REDUX_SAVE@@/LoadNextSave";
    ActionType2["LoadPrevSaveDone"] = "@@REDUX_SAVE@@/LoadPrevSaveDone";
    ActionType2["LoadNextSaveDone"] = "@@REDUX_SAVE@@/LoadNextSaveDone";
  })(ActionType || (ActionType = {}));
  var isValuableAction = (actionType) => {
    switch (actionType) {
      case ActionType.ClearSaves:
      case ActionType.AddSave:
      case ActionType.LoadSave:
      case ActionType.RemoveSaves:
      case ActionType.LoadPrevSave:
      case ActionType.LoadNextSave: {
        return true;
      }
      default:
        return false;
    }
  };
  function createAddSaveAction(payload) {
    return {
      type: ActionType.AddSave,
      payload: {
        groupKeys: payload?.groupKeys,
        saveKey: payload?.saveKey || createGroupSaveKey()
      }
    };
  }
  function createRemoveSavesAction(payload) {
    return {
      type: ActionType.RemoveSaves,
      payload: payload || EMPTY_OBJECT
    };
  }
  function createLoadSaveAction(payload) {
    return {
      type: ActionType.LoadSave,
      payload
    };
  }
  function createLoadPrevSaveAction(payload) {
    return {
      type: ActionType.LoadPrevSave,
      payload: payload || EMPTY_OBJECT
    };
  }
  function createLoadNextSaveAction(payload) {
    return {
      type: ActionType.LoadNextSave,
      payload: payload || EMPTY_OBJECT
    };
  }
  function createLoadPrevSaveDoneAction(payload) {
    return {
      type: ActionType.LoadPrevSaveDone,
      payload
    };
  }
  function createLoadNextSaveDoneAction(payload) {
    return {
      type: ActionType.LoadNextSaveDone,
      payload
    };
  }

  // ../src/reducerWrapper.ts
  function savesReducerWrapper(groupKeyOrReducer, optionalReducer) {
    const groupKey = optionalReducer ? groupKeyOrReducer : DEFAULT_GROUP_KEY;
    const reducer3 = optionalReducer ? optionalReducer : groupKeyOrReducer;
    const saveStore = createSaveStore();
    let currentSave;
    return (reducerState, action) => {
      if (reducerState === void 0 || !isValuableAction(action.type)) {
        const nextState = reducer3(reducerState, action);
        setGroupChangeState(groupKey, getGroupChangeState(groupKey) || (currentSave === void 0 ? true : currentSave.snapshot !== nextState));
        return nextState;
      }
      registerSaveStore(groupKey, saveStore);
      if (action.payload.groupKeys !== void 0 && action.payload.groupKeys.indexOf(groupKey) === -1) {
        return reducer3(reducerState, action);
      }
      const storeSize = getSaveStoreSize(saveStore);
      const groupWasChanged = getGroupChangeState(groupKey) === true;
      const currentGroupSaveKey = getCurrentGroupSaveKey(groupKey);
      if ((action.type === ActionType.LoadSave || action.type === ActionType.LoadPrevSave) && currentGroupSaveKey) {
        if (storeSize === 0) {
          return reducerState;
        }
        if (groupWasChanged) {
          addSave(saveStore, createSave(currentGroupSaveKey, reducerState));
        }
        if (action.type === ActionType.LoadSave) {
          currentSave = getSave(saveStore, action.payload.saveKey);
          if (currentSave) {
            return currentSave.snapshot;
          }
        }
        if (action.type === ActionType.LoadPrevSave) {
          let count = action.payload.count || 1;
          groupSavesIterator(groupKey, currentGroupSaveKey, (groupSave) => {
            currentSave = getSave(saveStore, groupSave.key) || currentSave;
            return count-- === 0 ? void 0 : groupSave.prevSaveKey;
          });
          if (currentSave) {
            return currentSave.snapshot;
          }
        }
        return reducerState;
      }
      if (action.type === ActionType.LoadNextSave && currentGroupSaveKey) {
        if (storeSize === 0) {
          return reducerState;
        }
        let count = action.payload.count || 1;
        groupSavesIterator(groupKey, currentGroupSaveKey, (groupSave) => {
          currentSave = getSave(saveStore, groupSave.key) || currentSave;
          return count-- === 0 ? void 0 : groupSave.nextSaveKey;
        });
        return currentSave ? currentSave.snapshot : reducerState;
      }
      if (action.type === ActionType.RemoveSaves && currentSave) {
        if (storeSize === 0) {
          return reducerState;
        }
        const {saveKeys, exceptSaveKeys} = action.payload;
        if (saveKeys === void 0 && exceptSaveKeys === void 0 && currentSave !== void 0) {
          deleteSave(saveStore, currentSave.groupSaveKey);
          currentSave = currentGroupSaveKey ? getSave(saveStore, currentGroupSaveKey) : void 0;
        }
        if (saveKeys !== void 0) {
          saveKeys.forEach((saveKey) => {
            deleteSave(saveStore, saveKey);
          });
        } else if (exceptSaveKeys !== void 0) {
          saveStore.forEach((_2, saveKey) => {
            if (exceptSaveKeys.indexOf(saveKey) !== -1) {
              deleteSave(saveStore, saveKey);
            }
          });
        }
        return reducerState;
      }
      if (action.type === ActionType.AddSave && (groupWasChanged || !isGeneratedSaveKey(action.payload.saveKey))) {
        addSave(saveStore, currentSave = createSave(action.payload.saveKey, reducerState));
      }
      if (action.type === ActionType.ClearSaves) {
        currentSave = void 0;
        clearSaves(saveStore);
      }
      return reducerState;
    };
  }

  // ../src/middleware.ts
  function createSavesMiddleware() {
    return function historyMiddleware(store6) {
      return (next) => (action) => {
        if (!isValuableAction(action.type)) {
          return next(action);
        }
        const groupKeys = action.payload.groupKeys || getGroupKeys();
        if (groupKeys.length === 0) {
          return next(action);
        }
        if (action.type === ActionType.AddSave) {
          groupKeys.forEach((key) => {
            const groupChangeState = getGroupChangeState(key);
            const currentGroupSaveKey = getCurrentGroupSaveKey(key);
            const currentGroupSave = currentGroupSaveKey ? getGroupSave(key, currentGroupSaveKey) : void 0;
            if (groupChangeState) {
              addGroupSave(createGroupSave(key, action.payload.saveKey, currentGroupSaveKey));
              if (currentGroupSave !== void 0) {
                trySetNextSaveKeyForGroupSave(key, currentGroupSave.key, action.payload.saveKey);
              }
              setCurrentGroupSaveKey(key, action.payload.saveKey);
            } else if (currentGroupSave !== void 0) {
              const isUserSaveKey = !isGeneratedSaveKey(action.payload.saveKey);
              const prevSaveKey = currentGroupSave.prevSaveKey;
              if (isUserSaveKey) {
                addGroupSave(createGroupSave(key, action.payload.saveKey, prevSaveKey));
                if (prevSaveKey !== void 0) {
                  trySetNextSaveKeyForGroupSave(key, prevSaveKey, action.payload.saveKey);
                }
                setCurrentGroupSaveKey(key, action.payload.saveKey);
              }
            }
          });
        }
        if (action.type === ActionType.LoadSave || action.type === ActionType.LoadPrevSave) {
          updateGroupAutoSaveKey();
          groupKeys.forEach((key) => {
            if (getGroupChangeState(key) === true) {
              const currentGroupSaveKey = getCurrentGroupSaveKey(key);
              const saveKey = getGroupAutoSaveKey();
              addGroupSave(createGroupSave(key, saveKey, currentGroupSaveKey));
              if (currentGroupSaveKey !== void 0) {
                trySetNextSaveKeyForGroupSave(key, currentGroupSaveKey, saveKey);
              }
              setCurrentGroupSaveKey(key, saveKey);
            }
          });
        }
        if (action.type === ActionType.RemoveSaves) {
          groupKeys.forEach((key) => {
            const currentGroupSaveKey = getCurrentGroupSaveKey(key);
            if (currentGroupSaveKey === void 0) {
              return;
            }
            const {saveKeys, exceptSaveKeys} = action.payload;
            if (saveKeys === void 0 && exceptSaveKeys === void 0) {
              deleteGroupSaveSafety(key, currentGroupSaveKey);
            }
            if (saveKeys !== void 0) {
              saveKeys.forEach((saveKey) => {
                deleteGroupSaveSafety(key, saveKey);
              });
            } else if (exceptSaveKeys !== void 0) {
              groupSaveStore.get(key).forEach((groupSave) => {
                if (exceptSaveKeys.indexOf(groupSave.key) !== -1) {
                  deleteGroupSaveSafety(key, groupSave.key);
                }
              });
            }
          });
        }
        getGroupKeys().forEach(deleteSaveStores);
        const result = next(action);
        if (action.type === ActionType.ClearSaves) {
          groupKeys.forEach((key) => {
            clearGroupSaveStore(key);
            setCurrentGroupSaveKey(key, void 0);
          });
        }
        const wasUpdatedGroupsKeys = new Set();
        if (action.type === ActionType.AddSave) {
          groupKeys.forEach((key) => {
            setGroupChangeState(key, false);
          });
        }
        if (action.type === ActionType.LoadSave) {
          groupKeys.forEach((key) => {
            setCurrentGroupSaveKey(key, action.payload.saveKey);
            setGroupChangeState(key, false);
          });
        }
        if (action.type === ActionType.LoadPrevSave) {
          groupKeys.forEach((key) => {
            const currentGroupSaveKey = getCurrentGroupSaveKey(key);
            if (currentGroupSaveKey === void 0) {
              return;
            }
            let steps = action.payload.count || 1;
            let nextGroupSaveKey;
            const groupSave = groupSavesIterator(key, currentGroupSaveKey, (groupSave2) => {
              if (nextGroupSaveKey) {
                groupSave2.nextSaveKey = nextGroupSaveKey;
              }
              nextGroupSaveKey = groupSave2.key;
              return steps-- === 0 ? void 0 : groupSave2.prevSaveKey;
            });
            if (groupSave.key !== currentGroupSaveKey) {
              wasUpdatedGroupsKeys.add(key);
              setCurrentGroupSaveKey(key, groupSave.key);
            }
            setGroupChangeState(key, false);
          });
        }
        if (action.type === ActionType.LoadNextSave) {
          groupKeys.forEach((key) => {
            const currentGroupSaveKey = getCurrentGroupSaveKey(key);
            if (currentGroupSaveKey === void 0) {
              return;
            }
            let steps = action.payload.count || 1;
            const groupSave = groupSavesIterator(key, currentGroupSaveKey, (groupSave2) => {
              return steps-- === 0 ? void 0 : groupSave2.nextSaveKey;
            });
            if (groupSave.key !== currentGroupSaveKey) {
              wasUpdatedGroupsKeys.add(key);
              setCurrentGroupSaveKey(key, groupSave.key);
            }
          });
        }
        const groupSaves = {};
        const currentBranchSaves = {};
        const currentGroupSaves = {};
        groupKeys.forEach((key) => {
          groupSaves[key] = getGroupSaveKeys(key);
          currentGroupSaves[key] = getCurrentGroupSaveKey(key);
          currentBranchSaves[key] = currentGroupSaves[key] ? getBranchForSave(key, currentGroupSaves[key]) : [];
        });
        store6.dispatch(createSetSaveMetadataAction({groupSaves, currentBranchSaves, currentGroupSaves}));
        if (wasUpdatedGroupsKeys.size > 0) {
          if (action.type === ActionType.LoadPrevSave) {
            store6.dispatch(createLoadPrevSaveDoneAction({
              groupKeys: Array.from(wasUpdatedGroupsKeys)
            }));
          }
          if (action.type === ActionType.LoadNextSave) {
            store6.dispatch(createLoadNextSaveDoneAction({
              groupKeys: Array.from(wasUpdatedGroupsKeys)
            }));
          }
        }
        return result;
      };
    };
  }

  // node_modules/immer/dist/immer.esm.js
  function n(n2) {
    for (var t2 = arguments.length, r2 = Array(t2 > 1 ? t2 - 1 : 0), e = 1; e < t2; e++)
      r2[e - 1] = arguments[e];
    if (true) {
      var i2 = Y[n2], o2 = i2 ? typeof i2 == "function" ? i2.apply(null, r2) : i2 : "unknown error nr: " + n2;
      throw Error("[Immer] " + o2);
    }
    throw Error("[Immer] minified error nr: " + n2 + (r2.length ? " " + r2.map(function(n3) {
      return "'" + n3 + "'";
    }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
  }
  function t(n2) {
    return !!n2 && !!n2[Q];
  }
  function r(n2) {
    return !!n2 && (function(n3) {
      if (!n3 || typeof n3 != "object")
        return false;
      var t2 = Object.getPrototypeOf(n3);
      return !t2 || t2 === Object.prototype;
    }(n2) || Array.isArray(n2) || !!n2[L] || !!n2.constructor[L] || s(n2) || v(n2));
  }
  function i(n2, t2, r2) {
    r2 === void 0 && (r2 = false), o(n2) === 0 ? (r2 ? Object.keys : Z)(n2).forEach(function(e) {
      r2 && typeof e == "symbol" || t2(e, n2[e], n2);
    }) : n2.forEach(function(r3, e) {
      return t2(e, r3, n2);
    });
  }
  function o(n2) {
    var t2 = n2[Q];
    return t2 ? t2.i > 3 ? t2.i - 4 : t2.i : Array.isArray(n2) ? 1 : s(n2) ? 2 : v(n2) ? 3 : 0;
  }
  function u(n2, t2) {
    return o(n2) === 2 ? n2.has(t2) : Object.prototype.hasOwnProperty.call(n2, t2);
  }
  function a(n2, t2) {
    return o(n2) === 2 ? n2.get(t2) : n2[t2];
  }
  function f(n2, t2, r2) {
    var e = o(n2);
    e === 2 ? n2.set(t2, r2) : e === 3 ? (n2.delete(t2), n2.add(r2)) : n2[t2] = r2;
  }
  function c(n2, t2) {
    return n2 === t2 ? n2 !== 0 || 1 / n2 == 1 / t2 : n2 != n2 && t2 != t2;
  }
  function s(n2) {
    return X && n2 instanceof Map;
  }
  function v(n2) {
    return q && n2 instanceof Set;
  }
  function p(n2) {
    return n2.o || n2.t;
  }
  function l(n2) {
    if (Array.isArray(n2))
      return Array.prototype.slice.call(n2);
    var t2 = nn(n2);
    delete t2[Q];
    for (var r2 = Z(t2), e = 0; e < r2.length; e++) {
      var i2 = r2[e], o2 = t2[i2];
      o2.writable === false && (o2.writable = true, o2.configurable = true), (o2.get || o2.set) && (t2[i2] = {configurable: true, writable: true, enumerable: o2.enumerable, value: n2[i2]});
    }
    return Object.create(Object.getPrototypeOf(n2), t2);
  }
  function d(n2, e) {
    return e === void 0 && (e = false), y(n2) || t(n2) || !r(n2) ? n2 : (o(n2) > 1 && (n2.set = n2.add = n2.clear = n2.delete = h), Object.freeze(n2), e && i(n2, function(n3, t2) {
      return d(t2, true);
    }, true), n2);
  }
  function h() {
    n(2);
  }
  function y(n2) {
    return n2 == null || typeof n2 != "object" || Object.isFrozen(n2);
  }
  function b(t2) {
    var r2 = tn[t2];
    return r2 || n(18, t2), r2;
  }
  function m(n2, t2) {
    tn[n2] || (tn[n2] = t2);
  }
  function _() {
    return U || n(0), U;
  }
  function j(n2, t2) {
    t2 && (b("Patches"), n2.u = [], n2.s = [], n2.v = t2);
  }
  function g(n2) {
    O(n2), n2.p.forEach(S), n2.p = null;
  }
  function O(n2) {
    n2 === U && (U = n2.l);
  }
  function w(n2) {
    return U = {p: [], l: U, h: n2, m: true, _: 0};
  }
  function S(n2) {
    var t2 = n2[Q];
    t2.i === 0 || t2.i === 1 ? t2.j() : t2.g = true;
  }
  function P(t2, e) {
    e._ = e.p.length;
    var i2 = e.p[0], o2 = t2 !== void 0 && t2 !== i2;
    return e.h.O || b("ES5").S(e, t2, o2), o2 ? (i2[Q].P && (g(e), n(4)), r(t2) && (t2 = M(e, t2), e.l || x(e, t2)), e.u && b("Patches").M(i2[Q], t2, e.u, e.s)) : t2 = M(e, i2, []), g(e), e.u && e.v(e.u, e.s), t2 !== H ? t2 : void 0;
  }
  function M(n2, t2, r2) {
    if (y(t2))
      return t2;
    var e = t2[Q];
    if (!e)
      return i(t2, function(i2, o3) {
        return A(n2, e, t2, i2, o3, r2);
      }, true), t2;
    if (e.A !== n2)
      return t2;
    if (!e.P)
      return x(n2, e.t, true), e.t;
    if (!e.I) {
      e.I = true, e.A._--;
      var o2 = e.i === 4 || e.i === 5 ? e.o = l(e.k) : e.o;
      i(e.i === 3 ? new Set(o2) : o2, function(t3, i2) {
        return A(n2, e, o2, t3, i2, r2);
      }), x(n2, o2, false), r2 && n2.u && b("Patches").R(e, r2, n2.u, n2.s);
    }
    return e.o;
  }
  function A(e, i2, o2, a2, c2, s2) {
    if (c2 === o2 && n(5), t(c2)) {
      var v2 = M(e, c2, s2 && i2 && i2.i !== 3 && !u(i2.D, a2) ? s2.concat(a2) : void 0);
      if (f(o2, a2, v2), !t(v2))
        return;
      e.m = false;
    }
    if (r(c2) && !y(c2)) {
      if (!e.h.N && e._ < 1)
        return;
      M(e, c2), i2 && i2.A.l || x(e, c2);
    }
  }
  function x(n2, t2, r2) {
    r2 === void 0 && (r2 = false), n2.h.N && n2.m && d(t2, r2);
  }
  function z(n2, t2) {
    var r2 = n2[Q];
    return (r2 ? p(r2) : n2)[t2];
  }
  function I(n2, t2) {
    if (t2 in n2)
      for (var r2 = Object.getPrototypeOf(n2); r2; ) {
        var e = Object.getOwnPropertyDescriptor(r2, t2);
        if (e)
          return e;
        r2 = Object.getPrototypeOf(r2);
      }
  }
  function E(n2) {
    n2.P || (n2.P = true, n2.l && E(n2.l));
  }
  function k(n2) {
    n2.o || (n2.o = l(n2.t));
  }
  function R(n2, t2, r2) {
    var e = s(t2) ? b("MapSet").T(t2, r2) : v(t2) ? b("MapSet").F(t2, r2) : n2.O ? function(n3, t3) {
      var r3 = Array.isArray(n3), e2 = {i: r3 ? 1 : 0, A: t3 ? t3.A : _(), P: false, I: false, D: {}, l: t3, t: n3, k: null, o: null, j: null, C: false}, i2 = e2, o2 = rn;
      r3 && (i2 = [e2], o2 = en);
      var u2 = Proxy.revocable(i2, o2), a2 = u2.revoke, f2 = u2.proxy;
      return e2.k = f2, e2.j = a2, f2;
    }(t2, r2) : b("ES5").J(t2, r2);
    return (r2 ? r2.A : _()).p.push(e), e;
  }
  function D(e) {
    return t(e) || n(22, e), function n2(t2) {
      if (!r(t2))
        return t2;
      var e2, u2 = t2[Q], c2 = o(t2);
      if (u2) {
        if (!u2.P && (u2.i < 4 || !b("ES5").K(u2)))
          return u2.t;
        u2.I = true, e2 = N(t2, c2), u2.I = false;
      } else
        e2 = N(t2, c2);
      return i(e2, function(t3, r2) {
        u2 && a(u2.t, t3) === r2 || f(e2, t3, n2(r2));
      }), c2 === 3 ? new Set(e2) : e2;
    }(e);
  }
  function N(n2, t2) {
    switch (t2) {
      case 2:
        return new Map(n2);
      case 3:
        return Array.from(n2);
    }
    return l(n2);
  }
  function T() {
    function r2(n2, t2) {
      var r3 = s2[n2];
      return r3 ? r3.enumerable = t2 : s2[n2] = r3 = {configurable: true, enumerable: t2, get: function() {
        var t3 = this[Q];
        return f2(t3), rn.get(t3, n2);
      }, set: function(t3) {
        var r4 = this[Q];
        f2(r4), rn.set(r4, n2, t3);
      }}, r3;
    }
    function e(n2) {
      for (var t2 = n2.length - 1; t2 >= 0; t2--) {
        var r3 = n2[t2][Q];
        if (!r3.P)
          switch (r3.i) {
            case 5:
              a2(r3) && E(r3);
              break;
            case 4:
              o2(r3) && E(r3);
          }
      }
    }
    function o2(n2) {
      for (var t2 = n2.t, r3 = n2.k, e2 = Z(r3), i2 = e2.length - 1; i2 >= 0; i2--) {
        var o3 = e2[i2];
        if (o3 !== Q) {
          var a3 = t2[o3];
          if (a3 === void 0 && !u(t2, o3))
            return true;
          var f3 = r3[o3], s3 = f3 && f3[Q];
          if (s3 ? s3.t !== a3 : !c(f3, a3))
            return true;
        }
      }
      var v2 = !!t2[Q];
      return e2.length !== Z(t2).length + (v2 ? 0 : 1);
    }
    function a2(n2) {
      var t2 = n2.k;
      if (t2.length !== n2.t.length)
        return true;
      var r3 = Object.getOwnPropertyDescriptor(t2, t2.length - 1);
      return !(!r3 || r3.get);
    }
    function f2(t2) {
      t2.g && n(3, JSON.stringify(p(t2)));
    }
    var s2 = {};
    m("ES5", {J: function(n2, t2) {
      var e2 = Array.isArray(n2), i2 = function(n3, t3) {
        if (n3) {
          for (var e3 = Array(t3.length), i3 = 0; i3 < t3.length; i3++)
            Object.defineProperty(e3, "" + i3, r2(i3, true));
          return e3;
        }
        var o4 = nn(t3);
        delete o4[Q];
        for (var u2 = Z(o4), a3 = 0; a3 < u2.length; a3++) {
          var f3 = u2[a3];
          o4[f3] = r2(f3, n3 || !!o4[f3].enumerable);
        }
        return Object.create(Object.getPrototypeOf(t3), o4);
      }(e2, n2), o3 = {i: e2 ? 5 : 4, A: t2 ? t2.A : _(), P: false, I: false, D: {}, l: t2, t: n2, k: i2, o: null, g: false, C: false};
      return Object.defineProperty(i2, Q, {value: o3, writable: true}), i2;
    }, S: function(n2, r3, o3) {
      o3 ? t(r3) && r3[Q].A === n2 && e(n2.p) : (n2.u && function n3(t2) {
        if (t2 && typeof t2 == "object") {
          var r4 = t2[Q];
          if (r4) {
            var e2 = r4.t, o4 = r4.k, f3 = r4.D, c2 = r4.i;
            if (c2 === 4)
              i(o4, function(t3) {
                t3 !== Q && (e2[t3] !== void 0 || u(e2, t3) ? f3[t3] || n3(o4[t3]) : (f3[t3] = true, E(r4)));
              }), i(e2, function(n4) {
                o4[n4] !== void 0 || u(o4, n4) || (f3[n4] = false, E(r4));
              });
            else if (c2 === 5) {
              if (a2(r4) && (E(r4), f3.length = true), o4.length < e2.length)
                for (var s3 = o4.length; s3 < e2.length; s3++)
                  f3[s3] = false;
              else
                for (var v2 = e2.length; v2 < o4.length; v2++)
                  f3[v2] = true;
              for (var p2 = Math.min(o4.length, e2.length), l2 = 0; l2 < p2; l2++)
                f3[l2] === void 0 && n3(o4[l2]);
            }
          }
        }
      }(n2.p[0]), e(n2.p));
    }, K: function(n2) {
      return n2.i === 4 ? o2(n2) : a2(n2);
    }});
  }
  var G;
  var U;
  var W = typeof Symbol != "undefined" && typeof Symbol("x") == "symbol";
  var X = typeof Map != "undefined";
  var q = typeof Set != "undefined";
  var B = typeof Proxy != "undefined" && Proxy.revocable !== void 0 && typeof Reflect != "undefined";
  var H = W ? Symbol.for("immer-nothing") : ((G = {})["immer-nothing"] = true, G);
  var L = W ? Symbol.for("immer-draftable") : "__$immer_draftable";
  var Q = W ? Symbol.for("immer-state") : "__$immer_state";
  var V = typeof Symbol != "undefined" && Symbol.iterator || "@@iterator";
  var Y = {0: "Illegal state", 1: "Immer drafts cannot have computed properties", 2: "This object has been frozen and should not be mutated", 3: function(n2) {
    return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + n2;
  }, 4: "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.", 5: "Immer forbids circular references", 6: "The first or second argument to `produce` must be a function", 7: "The third argument to `produce` must be a function or undefined", 8: "First argument to `createDraft` must be a plain object, an array, or an immerable object", 9: "First argument to `finishDraft` must be a draft returned by `createDraft`", 10: "The given draft is already finalized", 11: "Object.defineProperty() cannot be used on an Immer draft", 12: "Object.setPrototypeOf() cannot be used on an Immer draft", 13: "Immer only supports deleting array indices", 14: "Immer only supports setting array indices and the 'length' property", 15: function(n2) {
    return "Cannot apply patch, path doesn't resolve: " + n2;
  }, 16: 'Sets cannot have "replace" patches.', 17: function(n2) {
    return "Unsupported patch operation: " + n2;
  }, 18: function(n2) {
    return "The plugin for '" + n2 + "' has not been loaded into Immer. To enable the plugin, import and call `enable" + n2 + "()` when initializing your application.";
  }, 20: "Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available", 21: function(n2) {
    return "produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '" + n2 + "'";
  }, 22: function(n2) {
    return "'current' expects a draft, got: " + n2;
  }, 23: function(n2) {
    return "'original' expects a draft, got: " + n2;
  }};
  var Z = typeof Reflect != "undefined" && Reflect.ownKeys ? Reflect.ownKeys : Object.getOwnPropertySymbols !== void 0 ? function(n2) {
    return Object.getOwnPropertyNames(n2).concat(Object.getOwnPropertySymbols(n2));
  } : Object.getOwnPropertyNames;
  var nn = Object.getOwnPropertyDescriptors || function(n2) {
    var t2 = {};
    return Z(n2).forEach(function(r2) {
      t2[r2] = Object.getOwnPropertyDescriptor(n2, r2);
    }), t2;
  };
  var tn = {};
  var rn = {get: function(n2, t2) {
    if (t2 === Q)
      return n2;
    var e = p(n2);
    if (!u(e, t2))
      return function(n3, t3, r2) {
        var e2, i3 = I(t3, r2);
        return i3 ? "value" in i3 ? i3.value : (e2 = i3.get) === null || e2 === void 0 ? void 0 : e2.call(n3.k) : void 0;
      }(n2, e, t2);
    var i2 = e[t2];
    return n2.I || !r(i2) ? i2 : i2 === z(n2.t, t2) ? (k(n2), n2.o[t2] = R(n2.A.h, i2, n2)) : i2;
  }, has: function(n2, t2) {
    return t2 in p(n2);
  }, ownKeys: function(n2) {
    return Reflect.ownKeys(p(n2));
  }, set: function(n2, t2, r2) {
    var e = I(p(n2), t2);
    if (e == null ? void 0 : e.set)
      return e.set.call(n2.k, r2), true;
    if (!n2.P) {
      var i2 = z(p(n2), t2), o2 = i2 == null ? void 0 : i2[Q];
      if (o2 && o2.t === r2)
        return n2.o[t2] = r2, n2.D[t2] = false, true;
      if (c(r2, i2) && (r2 !== void 0 || u(n2.t, t2)))
        return true;
      k(n2), E(n2);
    }
    return n2.o[t2] = r2, n2.D[t2] = true, true;
  }, deleteProperty: function(n2, t2) {
    return z(n2.t, t2) !== void 0 || t2 in n2.t ? (n2.D[t2] = false, k(n2), E(n2)) : delete n2.D[t2], n2.o && delete n2.o[t2], true;
  }, getOwnPropertyDescriptor: function(n2, t2) {
    var r2 = p(n2), e = Reflect.getOwnPropertyDescriptor(r2, t2);
    return e ? {writable: true, configurable: n2.i !== 1 || t2 !== "length", enumerable: e.enumerable, value: r2[t2]} : e;
  }, defineProperty: function() {
    n(11);
  }, getPrototypeOf: function(n2) {
    return Object.getPrototypeOf(n2.t);
  }, setPrototypeOf: function() {
    n(12);
  }};
  var en = {};
  i(rn, function(n2, t2) {
    en[n2] = function() {
      return arguments[0] = arguments[0][0], t2.apply(this, arguments);
    };
  }), en.deleteProperty = function(t2, r2) {
    return isNaN(parseInt(r2)) && n(13), rn.deleteProperty.call(this, t2[0], r2);
  }, en.set = function(t2, r2, e) {
    return r2 !== "length" && isNaN(parseInt(r2)) && n(14), rn.set.call(this, t2[0], r2, e, t2[0]);
  };
  var on = function() {
    function e(n2) {
      this.O = B, this.N = true, typeof (n2 == null ? void 0 : n2.useProxies) == "boolean" && this.setUseProxies(n2.useProxies), typeof (n2 == null ? void 0 : n2.autoFreeze) == "boolean" && this.setAutoFreeze(n2.autoFreeze), this.produce = this.produce.bind(this), this.produceWithPatches = this.produceWithPatches.bind(this);
    }
    var i2 = e.prototype;
    return i2.produce = function(t2, e2, i3) {
      if (typeof t2 == "function" && typeof e2 != "function") {
        var o2 = e2;
        e2 = t2;
        var u2 = this;
        return function(n2) {
          var t3 = this;
          n2 === void 0 && (n2 = o2);
          for (var r2 = arguments.length, i4 = Array(r2 > 1 ? r2 - 1 : 0), a3 = 1; a3 < r2; a3++)
            i4[a3 - 1] = arguments[a3];
          return u2.produce(n2, function(n3) {
            var r3;
            return (r3 = e2).call.apply(r3, [t3, n3].concat(i4));
          });
        };
      }
      var a2;
      if (typeof e2 != "function" && n(6), i3 !== void 0 && typeof i3 != "function" && n(7), r(t2)) {
        var f2 = w(this), c2 = R(this, t2, void 0), s2 = true;
        try {
          a2 = e2(c2), s2 = false;
        } finally {
          s2 ? g(f2) : O(f2);
        }
        return typeof Promise != "undefined" && a2 instanceof Promise ? a2.then(function(n2) {
          return j(f2, i3), P(n2, f2);
        }, function(n2) {
          throw g(f2), n2;
        }) : (j(f2, i3), P(a2, f2));
      }
      if (!t2 || typeof t2 != "object") {
        if ((a2 = e2(t2)) === H)
          return;
        return a2 === void 0 && (a2 = t2), this.N && d(a2, true), a2;
      }
      n(21, t2);
    }, i2.produceWithPatches = function(n2, t2) {
      var r2, e2, i3 = this;
      return typeof n2 == "function" ? function(t3) {
        for (var r3 = arguments.length, e3 = Array(r3 > 1 ? r3 - 1 : 0), o2 = 1; o2 < r3; o2++)
          e3[o2 - 1] = arguments[o2];
        return i3.produceWithPatches(t3, function(t4) {
          return n2.apply(void 0, [t4].concat(e3));
        });
      } : [this.produce(n2, t2, function(n3, t3) {
        r2 = n3, e2 = t3;
      }), r2, e2];
    }, i2.createDraft = function(e2) {
      r(e2) || n(8), t(e2) && (e2 = D(e2));
      var i3 = w(this), o2 = R(this, e2, void 0);
      return o2[Q].C = true, O(i3), o2;
    }, i2.finishDraft = function(t2, r2) {
      var e2 = t2 && t2[Q];
      e2 && e2.C || n(9), e2.I && n(10);
      var i3 = e2.A;
      return j(i3, r2), P(void 0, i3);
    }, i2.setAutoFreeze = function(n2) {
      this.N = n2;
    }, i2.setUseProxies = function(t2) {
      t2 && !B && n(20), this.O = t2;
    }, i2.applyPatches = function(n2, r2) {
      var e2;
      for (e2 = r2.length - 1; e2 >= 0; e2--) {
        var i3 = r2[e2];
        if (i3.path.length === 0 && i3.op === "replace") {
          n2 = i3.value;
          break;
        }
      }
      var o2 = b("Patches").$;
      return t(n2) ? o2(n2, r2) : this.produce(n2, function(n3) {
        return o2(n3, r2.slice(e2 + 1));
      });
    }, e;
  }();
  var un = new on();
  var an = un.produce;
  var fn = un.produceWithPatches.bind(un);
  var cn = un.setAutoFreeze.bind(un);
  var sn = un.setUseProxies.bind(un);
  var vn = un.applyPatches.bind(un);
  var pn = un.createDraft.bind(un);
  var ln = un.finishDraft.bind(un);
  var immer_esm_default = an;

  // node_modules/redux/es/redux.js
  var symbol_observable2 = __toModule(require_es());
  var randomString = function randomString2() {
    return Math.random().toString(36).substring(7).split("").join(".");
  };
  var ActionTypes = {
    INIT: "@@redux/INIT" + randomString(),
    REPLACE: "@@redux/REPLACE" + randomString(),
    PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
      return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
    }
  };
  function isPlainObject(obj) {
    if (typeof obj !== "object" || obj === null)
      return false;
    var proto = obj;
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(obj) === proto;
  }
  function createStore(reducer3, preloadedState, enhancer) {
    var _ref2;
    if (typeof preloadedState === "function" && typeof enhancer === "function" || typeof enhancer === "function" && typeof arguments[3] === "function") {
      throw new Error("It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function.");
    }
    if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
      enhancer = preloadedState;
      preloadedState = void 0;
    }
    if (typeof enhancer !== "undefined") {
      if (typeof enhancer !== "function") {
        throw new Error("Expected the enhancer to be a function.");
      }
      return enhancer(createStore)(reducer3, preloadedState);
    }
    if (typeof reducer3 !== "function") {
      throw new Error("Expected the reducer to be a function.");
    }
    var currentReducer = reducer3;
    var currentState = preloadedState;
    var currentListeners = [];
    var nextListeners = currentListeners;
    var isDispatching = false;
    function ensureCanMutateNextListeners() {
      if (nextListeners === currentListeners) {
        nextListeners = currentListeners.slice();
      }
    }
    function getState() {
      if (isDispatching) {
        throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
      }
      return currentState;
    }
    function subscribe(listener) {
      if (typeof listener !== "function") {
        throw new Error("Expected the listener to be a function.");
      }
      if (isDispatching) {
        throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribelistener for more details.");
      }
      var isSubscribed = true;
      ensureCanMutateNextListeners();
      nextListeners.push(listener);
      return function unsubscribe() {
        if (!isSubscribed) {
          return;
        }
        if (isDispatching) {
          throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribelistener for more details.");
        }
        isSubscribed = false;
        ensureCanMutateNextListeners();
        var index = nextListeners.indexOf(listener);
        nextListeners.splice(index, 1);
        currentListeners = null;
      };
    }
    function dispatch(action) {
      if (!isPlainObject(action)) {
        throw new Error("Actions must be plain objects. Use custom middleware for async actions.");
      }
      if (typeof action.type === "undefined") {
        throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');
      }
      if (isDispatching) {
        throw new Error("Reducers may not dispatch actions.");
      }
      try {
        isDispatching = true;
        currentState = currentReducer(currentState, action);
      } finally {
        isDispatching = false;
      }
      var listeners = currentListeners = nextListeners;
      for (var i2 = 0; i2 < listeners.length; i2++) {
        var listener = listeners[i2];
        listener();
      }
      return action;
    }
    function replaceReducer(nextReducer) {
      if (typeof nextReducer !== "function") {
        throw new Error("Expected the nextReducer to be a function.");
      }
      currentReducer = nextReducer;
      dispatch({
        type: ActionTypes.REPLACE
      });
    }
    function observable() {
      var _ref;
      var outerSubscribe = subscribe;
      return _ref = {
        subscribe: function subscribe2(observer2) {
          if (typeof observer2 !== "object" || observer2 === null) {
            throw new TypeError("Expected the observer to be an object.");
          }
          function observeState() {
            if (observer2.next) {
              observer2.next(getState());
            }
          }
          observeState();
          var unsubscribe = outerSubscribe(observeState);
          return {
            unsubscribe
          };
        }
      }, _ref[symbol_observable2.default] = function() {
        return this;
      }, _ref;
    }
    dispatch({
      type: ActionTypes.INIT
    });
    return _ref2 = {
      dispatch,
      subscribe,
      getState,
      replaceReducer
    }, _ref2[symbol_observable2.default] = observable, _ref2;
  }
  function warning2(message) {
    if (typeof console !== "undefined" && typeof console.error === "function") {
      console.error(message);
    }
    try {
      throw new Error(message);
    } catch (e) {
    }
  }
  function getUndefinedStateErrorMessage(key, action) {
    var actionType = action && action.type;
    var actionDescription = actionType && 'action "' + String(actionType) + '"' || "an action";
    return "Given " + actionDescription + ', reducer "' + key + '" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.';
  }
  function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
    var reducerKeys = Object.keys(reducers);
    var argumentName = action && action.type === ActionTypes.INIT ? "preloadedState argument passed to createStore" : "previous state received by the reducer";
    if (reducerKeys.length === 0) {
      return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
    }
    if (!isPlainObject(inputState)) {
      return "The " + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
    }
    var unexpectedKeys = Object.keys(inputState).filter(function(key) {
      return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
    });
    unexpectedKeys.forEach(function(key) {
      unexpectedKeyCache[key] = true;
    });
    if (action && action.type === ActionTypes.REPLACE)
      return;
    if (unexpectedKeys.length > 0) {
      return "Unexpected " + (unexpectedKeys.length > 1 ? "keys" : "key") + " " + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
    }
  }
  function assertReducerShape(reducers) {
    Object.keys(reducers).forEach(function(key) {
      var reducer3 = reducers[key];
      var initialState = reducer3(void 0, {
        type: ActionTypes.INIT
      });
      if (typeof initialState === "undefined") {
        throw new Error('Reducer "' + key + `" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`);
      }
      if (typeof reducer3(void 0, {
        type: ActionTypes.PROBE_UNKNOWN_ACTION()
      }) === "undefined") {
        throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ("Don't try to handle " + ActionTypes.INIT + ' or other actions in "redux/*" ') + "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.");
      }
    });
  }
  function combineReducers(reducers) {
    var reducerKeys = Object.keys(reducers);
    var finalReducers = {};
    for (var i2 = 0; i2 < reducerKeys.length; i2++) {
      var key = reducerKeys[i2];
      if (true) {
        if (typeof reducers[key] === "undefined") {
          warning2('No reducer provided for key "' + key + '"');
        }
      }
      if (typeof reducers[key] === "function") {
        finalReducers[key] = reducers[key];
      }
    }
    var finalReducerKeys = Object.keys(finalReducers);
    var unexpectedKeyCache;
    if (true) {
      unexpectedKeyCache = {};
    }
    var shapeAssertionError;
    try {
      assertReducerShape(finalReducers);
    } catch (e) {
      shapeAssertionError = e;
    }
    return function combination(state2, action) {
      if (state2 === void 0) {
        state2 = {};
      }
      if (shapeAssertionError) {
        throw shapeAssertionError;
      }
      if (true) {
        var warningMessage = getUnexpectedStateShapeWarningMessage(state2, finalReducers, action, unexpectedKeyCache);
        if (warningMessage) {
          warning2(warningMessage);
        }
      }
      var hasChanged = false;
      var nextState = {};
      for (var _i = 0; _i < finalReducerKeys.length; _i++) {
        var _key = finalReducerKeys[_i];
        var reducer3 = finalReducers[_key];
        var previousStateForKey = state2[_key];
        var nextStateForKey = reducer3(previousStateForKey, action);
        if (typeof nextStateForKey === "undefined") {
          var errorMessage = getUndefinedStateErrorMessage(_key, action);
          throw new Error(errorMessage);
        }
        nextState[_key] = nextStateForKey;
        hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
      }
      hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state2).length;
      return hasChanged ? nextState : state2;
    };
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      keys.push.apply(keys, Object.getOwnPropertySymbols(object));
    }
    if (enumerableOnly)
      keys = keys.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    return keys;
  }
  function _objectSpread2(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2] != null ? arguments[i2] : {};
      if (i2 % 2) {
        ownKeys(source, true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  function compose() {
    for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
      funcs[_key] = arguments[_key];
    }
    if (funcs.length === 0) {
      return function(arg) {
        return arg;
      };
    }
    if (funcs.length === 1) {
      return funcs[0];
    }
    return funcs.reduce(function(a2, b2) {
      return function() {
        return a2(b2.apply(void 0, arguments));
      };
    });
  }
  function applyMiddleware() {
    for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
      middlewares[_key] = arguments[_key];
    }
    return function(createStore2) {
      return function() {
        var store6 = createStore2.apply(void 0, arguments);
        var _dispatch = function dispatch() {
          throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.");
        };
        var middlewareAPI = {
          getState: store6.getState,
          dispatch: function dispatch() {
            return _dispatch.apply(void 0, arguments);
          }
        };
        var chain = middlewares.map(function(middleware2) {
          return middleware2(middlewareAPI);
        });
        _dispatch = compose.apply(void 0, chain)(store6.dispatch);
        return _objectSpread2({}, store6, {
          dispatch: _dispatch
        });
      };
    };
  }
  function isCrushed() {
  }
  if (typeof isCrushed.name === "string" && isCrushed.name !== "isCrushed") {
    warning2('You are currently using minified code outside of NODE_ENV === "production". This means that you are running a slower development build of Redux. You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) to ensure you have the correct code for your production build.');
  }

  // node_modules/reselect/es/index.js
  function defaultEqualityCheck(a2, b2) {
    return a2 === b2;
  }
  function areArgumentsShallowlyEqual(equalityCheck, prev, next) {
    if (prev === null || next === null || prev.length !== next.length) {
      return false;
    }
    var length = prev.length;
    for (var i2 = 0; i2 < length; i2++) {
      if (!equalityCheck(prev[i2], next[i2])) {
        return false;
      }
    }
    return true;
  }
  function defaultMemoize(func) {
    var equalityCheck = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : defaultEqualityCheck;
    var lastArgs = null;
    var lastResult = null;
    return function() {
      if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {
        lastResult = func.apply(null, arguments);
      }
      lastArgs = arguments;
      return lastResult;
    };
  }
  function getDependencies(funcs) {
    var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;
    if (!dependencies.every(function(dep) {
      return typeof dep === "function";
    })) {
      var dependencyTypes = dependencies.map(function(dep) {
        return typeof dep;
      }).join(", ");
      throw new Error("Selector creators expect all input-selectors to be functions, " + ("instead received the following types: [" + dependencyTypes + "]"));
    }
    return dependencies;
  }
  function createSelectorCreator(memoize3) {
    for (var _len = arguments.length, memoizeOptions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      memoizeOptions[_key - 1] = arguments[_key];
    }
    return function() {
      for (var _len2 = arguments.length, funcs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        funcs[_key2] = arguments[_key2];
      }
      var recomputations = 0;
      var resultFunc = funcs.pop();
      var dependencies = getDependencies(funcs);
      var memoizedResultFunc = memoize3.apply(void 0, [function() {
        recomputations++;
        return resultFunc.apply(null, arguments);
      }].concat(memoizeOptions));
      var selector = memoize3(function() {
        var params = [];
        var length = dependencies.length;
        for (var i2 = 0; i2 < length; i2++) {
          params.push(dependencies[i2].apply(null, arguments));
        }
        return memoizedResultFunc.apply(null, params);
      });
      selector.resultFunc = resultFunc;
      selector.dependencies = dependencies;
      selector.recomputations = function() {
        return recomputations;
      };
      selector.resetRecomputations = function() {
        return recomputations = 0;
      };
      return selector;
    };
  }
  var createSelector = createSelectorCreator(defaultMemoize);

  // node_modules/redux-thunk/es/index.js
  function createThunkMiddleware(extraArgument) {
    return function(_ref) {
      var dispatch = _ref.dispatch, getState = _ref.getState;
      return function(next) {
        return function(action) {
          if (typeof action === "function") {
            return action(dispatch, getState, extraArgument);
          }
          return next(action);
        };
      };
    };
  }
  var thunk = createThunkMiddleware();
  thunk.withExtraArgument = createThunkMiddleware;
  var es_default = thunk;

  // node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js
  function _extends2() {
    _extends2 = Object.assign || function(target) {
      for (var i2 = 1; i2 < arguments.length; i2++) {
        var source = arguments[i2];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends2.apply(this, arguments);
  }
  function _inheritsLoose2(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }
  function _getPrototypeOf(o2) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o3) {
      return o3.__proto__ || Object.getPrototypeOf(o3);
    };
    return _getPrototypeOf(o2);
  }
  function _setPrototypeOf(o2, p2) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o3, p3) {
      o3.__proto__ = p3;
      return o3;
    };
    return _setPrototypeOf(o2, p2);
  }
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct)
      return false;
    if (Reflect.construct.sham)
      return false;
    if (typeof Proxy === "function")
      return true;
    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function() {
      }));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct2(Parent2, args2, Class2) {
        var a2 = [null];
        a2.push.apply(a2, args2);
        var Constructor = Function.bind.apply(Parent2, a2);
        var instance = new Constructor();
        if (Class2)
          _setPrototypeOf(instance, Class2.prototype);
        return instance;
      };
    }
    return _construct.apply(null, arguments);
  }
  function _isNativeFunction(fn2) {
    return Function.toString.call(fn2).indexOf("[native code]") !== -1;
  }
  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : void 0;
    _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
      if (Class2 === null || !_isNativeFunction(Class2))
        return Class2;
      if (typeof Class2 !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class2))
          return _cache.get(Class2);
        _cache.set(Class2, Wrapper);
      }
      function Wrapper() {
        return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
      }
      Wrapper.prototype = Object.create(Class2.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class2);
    };
    return _wrapNativeSuper(Class);
  }
  var composeWithDevTools = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
    if (arguments.length === 0)
      return void 0;
    if (typeof arguments[0] === "object")
      return compose;
    return compose.apply(null, arguments);
  };
  function isPlainObject2(value) {
    if (typeof value !== "object" || value === null)
      return false;
    var proto = value;
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(value) === proto;
  }
  function getTimeMeasureUtils(maxDelay, fnName) {
    var elapsed = 0;
    return {
      measureTime: function measureTime(fn2) {
        var started = Date.now();
        try {
          return fn2();
        } finally {
          var finished = Date.now();
          elapsed += finished - started;
        }
      },
      warnIfExceeded: function warnIfExceeded() {
        if (elapsed > maxDelay) {
          console.warn(fnName + " took " + elapsed + "ms, which is more than the warning threshold of " + maxDelay + "ms. \nIf your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode. See https://redux-toolkit.js.org/api/getDefaultMiddleware for instructions.\nIt is disabled in production builds, so you don't need to worry about that.");
        }
      }
    };
  }
  var MiddlewareArray = /* @__PURE__ */ function(_Array) {
    _inheritsLoose2(MiddlewareArray2, _Array);
    function MiddlewareArray2() {
      return _Array.apply(this, arguments) || this;
    }
    var _proto = MiddlewareArray2.prototype;
    _proto.concat = function concat() {
      var _Array$prototype$conc;
      for (var _len = arguments.length, arr = new Array(_len), _key = 0; _key < _len; _key++) {
        arr[_key] = arguments[_key];
      }
      return _construct(MiddlewareArray2, (_Array$prototype$conc = _Array.prototype.concat).call.apply(_Array$prototype$conc, [this].concat(arr)));
    };
    _proto.prepend = function prepend() {
      for (var _len2 = arguments.length, arr = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        arr[_key2] = arguments[_key2];
      }
      if (arr.length === 1 && Array.isArray(arr[0])) {
        return _construct(MiddlewareArray2, arr[0].concat(this));
      }
      return _construct(MiddlewareArray2, arr.concat(this));
    };
    return MiddlewareArray2;
  }(/* @__PURE__ */ _wrapNativeSuper(Array));
  var isProduction2 = false;
  var prefix3 = "Invariant failed";
  function invariant(condition, message) {
    if (condition) {
      return;
    }
    if (isProduction2) {
      throw new Error(prefix3);
    }
    throw new Error(prefix3 + ": " + (message || ""));
  }
  function stringify(obj, serializer, indent, decycler) {
    return JSON.stringify(obj, getSerialize(serializer, decycler), indent);
  }
  function getSerialize(serializer, decycler) {
    var stack = [], keys = [];
    if (!decycler)
      decycler = function decycler2(_2, value) {
        if (stack[0] === value)
          return "[Circular ~]";
        return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]";
      };
    return function(key, value) {
      if (stack.length > 0) {
        var thisPos = stack.indexOf(this);
        ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
        ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
        if (~stack.indexOf(value))
          value = decycler.call(this, key, value);
      } else
        stack.push(value);
      return serializer == null ? value : serializer.call(this, key, value);
    };
  }
  function isImmutableDefault(value) {
    return typeof value !== "object" || value === null || typeof value === "undefined";
  }
  function trackForMutations(isImmutable, ignorePaths, obj) {
    var trackedProperties = trackProperties(isImmutable, ignorePaths, obj);
    return {
      detectMutations: function detectMutations() {
        return _detectMutations(isImmutable, ignorePaths, trackedProperties, obj);
      }
    };
  }
  function trackProperties(isImmutable, ignorePaths, obj, path) {
    if (ignorePaths === void 0) {
      ignorePaths = [];
    }
    if (path === void 0) {
      path = [];
    }
    var tracked = {
      value: obj
    };
    if (!isImmutable(obj)) {
      tracked.children = {};
      for (var key in obj) {
        var childPath = path.concat(key);
        if (ignorePaths.length && ignorePaths.indexOf(childPath.join(".")) !== -1) {
          continue;
        }
        tracked.children[key] = trackProperties(isImmutable, ignorePaths, obj[key], childPath);
      }
    }
    return tracked;
  }
  function _detectMutations(isImmutable, ignorePaths, trackedProperty, obj, sameParentRef, path) {
    if (ignorePaths === void 0) {
      ignorePaths = [];
    }
    if (sameParentRef === void 0) {
      sameParentRef = false;
    }
    if (path === void 0) {
      path = [];
    }
    var prevObj = trackedProperty ? trackedProperty.value : void 0;
    var sameRef = prevObj === obj;
    if (sameParentRef && !sameRef && !Number.isNaN(obj)) {
      return {
        wasMutated: true,
        path
      };
    }
    if (isImmutable(prevObj) || isImmutable(obj)) {
      return {
        wasMutated: false
      };
    }
    var keysToDetect = {};
    Object.keys(trackedProperty.children).forEach(function(key2) {
      keysToDetect[key2] = true;
    });
    Object.keys(obj).forEach(function(key2) {
      keysToDetect[key2] = true;
    });
    var keys = Object.keys(keysToDetect);
    for (var i2 = 0; i2 < keys.length; i2++) {
      var key = keys[i2];
      var childPath = path.concat(key);
      if (ignorePaths.length && ignorePaths.indexOf(childPath.join(".")) !== -1) {
        continue;
      }
      var result = _detectMutations(isImmutable, ignorePaths, trackedProperty.children[key], obj[key], sameRef, childPath);
      if (result.wasMutated) {
        return result;
      }
    }
    return {
      wasMutated: false
    };
  }
  function createImmutableStateInvariantMiddleware(options) {
    if (options === void 0) {
      options = {};
    }
    if (false) {
      return function() {
        return function(next) {
          return function(action) {
            return next(action);
          };
        };
      };
    }
    var _options = options, _options$isImmutable = _options.isImmutable, isImmutable = _options$isImmutable === void 0 ? isImmutableDefault : _options$isImmutable, ignoredPaths = _options.ignoredPaths, _options$warnAfter = _options.warnAfter, warnAfter = _options$warnAfter === void 0 ? 32 : _options$warnAfter, ignore = _options.ignore;
    ignoredPaths = ignoredPaths || ignore;
    var track = trackForMutations.bind(null, isImmutable, ignoredPaths);
    return function(_ref) {
      var getState = _ref.getState;
      var state2 = getState();
      var tracker = track(state2);
      var result;
      return function(next) {
        return function(action) {
          var measureUtils = getTimeMeasureUtils(warnAfter, "ImmutableStateInvariantMiddleware");
          measureUtils.measureTime(function() {
            state2 = getState();
            result = tracker.detectMutations();
            tracker = track(state2);
            !!result.wasMutated ? invariant(false, "A state mutation was detected between dispatches, in the path '" + (result.path || []).join(".") + "'.  This may cause incorrect behavior. (https://redux.js.org/troubleshooting#never-mutate-reducer-arguments)") : void 0;
          });
          var dispatchedAction = next(action);
          measureUtils.measureTime(function() {
            state2 = getState();
            result = tracker.detectMutations();
            tracker = track(state2);
            result.wasMutated && (!!result.wasMutated ? invariant(false, "A state mutation was detected inside a dispatch, in the path: " + (result.path || []).join(".") + ". Take a look at the reducer(s) handling the action " + stringify(action) + ". (https://redux.js.org/troubleshooting#never-mutate-reducer-arguments)") : void 0);
          });
          measureUtils.warnIfExceeded();
          return dispatchedAction;
        };
      };
    };
  }
  function isPlain(val) {
    return typeof val === "undefined" || val === null || typeof val === "string" || typeof val === "boolean" || typeof val === "number" || Array.isArray(val) || isPlainObject2(val);
  }
  function findNonSerializableValue(value, path, isSerializable, getEntries, ignoredPaths) {
    if (path === void 0) {
      path = [];
    }
    if (isSerializable === void 0) {
      isSerializable = isPlain;
    }
    if (ignoredPaths === void 0) {
      ignoredPaths = [];
    }
    var foundNestedSerializable;
    if (!isSerializable(value)) {
      return {
        keyPath: path.join(".") || "<root>",
        value
      };
    }
    if (typeof value !== "object" || value === null) {
      return false;
    }
    var entries = getEntries != null ? getEntries(value) : Object.entries(value);
    var hasIgnoredPaths = ignoredPaths.length > 0;
    for (var _iterator = entries, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
      var _ref;
      if (_isArray) {
        if (_i >= _iterator.length)
          break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done)
          break;
        _ref = _i.value;
      }
      var _ref2 = _ref, property = _ref2[0], nestedValue = _ref2[1];
      var nestedPath = path.concat(property);
      if (hasIgnoredPaths && ignoredPaths.indexOf(nestedPath.join(".")) >= 0) {
        continue;
      }
      if (!isSerializable(nestedValue)) {
        return {
          keyPath: nestedPath.join("."),
          value: nestedValue
        };
      }
      if (typeof nestedValue === "object") {
        foundNestedSerializable = findNonSerializableValue(nestedValue, nestedPath, isSerializable, getEntries, ignoredPaths);
        if (foundNestedSerializable) {
          return foundNestedSerializable;
        }
      }
    }
    return false;
  }
  function createSerializableStateInvariantMiddleware(options) {
    if (options === void 0) {
      options = {};
    }
    if (false) {
      return function() {
        return function(next) {
          return function(action) {
            return next(action);
          };
        };
      };
    }
    var _options = options, _options$isSerializab = _options.isSerializable, isSerializable = _options$isSerializab === void 0 ? isPlain : _options$isSerializab, getEntries = _options.getEntries, _options$ignoredActio = _options.ignoredActions, ignoredActions = _options$ignoredActio === void 0 ? [] : _options$ignoredActio, _options$ignoredActio2 = _options.ignoredActionPaths, ignoredActionPaths = _options$ignoredActio2 === void 0 ? ["meta.arg"] : _options$ignoredActio2, _options$ignoredPaths = _options.ignoredPaths, ignoredPaths = _options$ignoredPaths === void 0 ? [] : _options$ignoredPaths, _options$warnAfter = _options.warnAfter, warnAfter = _options$warnAfter === void 0 ? 32 : _options$warnAfter;
    return function(storeAPI) {
      return function(next) {
        return function(action) {
          if (ignoredActions.length && ignoredActions.indexOf(action.type) !== -1) {
            return next(action);
          }
          var measureUtils = getTimeMeasureUtils(warnAfter, "SerializableStateInvariantMiddleware");
          measureUtils.measureTime(function() {
            var foundActionNonSerializableValue = findNonSerializableValue(action, [], isSerializable, getEntries, ignoredActionPaths);
            if (foundActionNonSerializableValue) {
              var keyPath = foundActionNonSerializableValue.keyPath, value = foundActionNonSerializableValue.value;
              console.error("A non-serializable value was detected in an action, in the path: `" + keyPath + "`. Value:", value, "\nTake a look at the logic that dispatched this action: ", action, "\n(See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)", "\n(To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)");
            }
          });
          var result = next(action);
          measureUtils.measureTime(function() {
            var state2 = storeAPI.getState();
            var foundStateNonSerializableValue = findNonSerializableValue(state2, [], isSerializable, getEntries, ignoredPaths);
            if (foundStateNonSerializableValue) {
              var keyPath = foundStateNonSerializableValue.keyPath, value = foundStateNonSerializableValue.value;
              console.error("A non-serializable value was detected in the state, in the path: `" + keyPath + "`. Value:", value, "\nTake a look at the reducer(s) handling this action type: " + action.type + ".\n(See https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state)");
            }
          });
          measureUtils.warnIfExceeded();
          return result;
        };
      };
    };
  }
  function isBoolean(x2) {
    return typeof x2 === "boolean";
  }
  function curryGetDefaultMiddleware() {
    return function curriedGetDefaultMiddleware(options) {
      return getDefaultMiddleware(options);
    };
  }
  function getDefaultMiddleware(options) {
    if (options === void 0) {
      options = {};
    }
    var _options = options, _options$thunk = _options.thunk, thunk2 = _options$thunk === void 0 ? true : _options$thunk, _options$immutableChe = _options.immutableCheck, immutableCheck = _options$immutableChe === void 0 ? true : _options$immutableChe, _options$serializable = _options.serializableCheck, serializableCheck = _options$serializable === void 0 ? true : _options$serializable;
    var middlewareArray = new MiddlewareArray();
    if (thunk2) {
      if (isBoolean(thunk2)) {
        middlewareArray.push(es_default);
      } else {
        middlewareArray.push(es_default.withExtraArgument(thunk2.extraArgument));
      }
    }
    if (true) {
      if (immutableCheck) {
        var immutableOptions = {};
        if (!isBoolean(immutableCheck)) {
          immutableOptions = immutableCheck;
        }
        middlewareArray.unshift(createImmutableStateInvariantMiddleware(immutableOptions));
      }
      if (serializableCheck) {
        var serializableOptions = {};
        if (!isBoolean(serializableCheck)) {
          serializableOptions = serializableCheck;
        }
        middlewareArray.push(createSerializableStateInvariantMiddleware(serializableOptions));
      }
    }
    return middlewareArray;
  }
  var IS_PRODUCTION = false;
  function configureStore(options) {
    var curriedGetDefaultMiddleware = curryGetDefaultMiddleware();
    var _ref = options || {}, _ref$reducer = _ref.reducer, reducer3 = _ref$reducer === void 0 ? void 0 : _ref$reducer, _ref$middleware = _ref.middleware, middleware2 = _ref$middleware === void 0 ? curriedGetDefaultMiddleware() : _ref$middleware, _ref$devTools = _ref.devTools, devTools = _ref$devTools === void 0 ? true : _ref$devTools, _ref$preloadedState = _ref.preloadedState, preloadedState = _ref$preloadedState === void 0 ? void 0 : _ref$preloadedState, _ref$enhancers = _ref.enhancers, enhancers = _ref$enhancers === void 0 ? void 0 : _ref$enhancers;
    var rootReducer;
    if (typeof reducer3 === "function") {
      rootReducer = reducer3;
    } else if (isPlainObject2(reducer3)) {
      rootReducer = combineReducers(reducer3);
    } else {
      throw new Error('"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers');
    }
    var middlewareEnhancer = applyMiddleware.apply(void 0, typeof middleware2 === "function" ? middleware2(curriedGetDefaultMiddleware) : middleware2);
    var finalCompose = compose;
    if (devTools) {
      finalCompose = composeWithDevTools(_extends2({
        trace: !IS_PRODUCTION
      }, typeof devTools === "object" && devTools));
    }
    var storeEnhancers = [middlewareEnhancer];
    if (Array.isArray(enhancers)) {
      storeEnhancers = [middlewareEnhancer].concat(enhancers);
    } else if (typeof enhancers === "function") {
      storeEnhancers = enhancers(storeEnhancers);
    }
    var composedEnhancer = finalCompose.apply(void 0, storeEnhancers);
    return createStore(rootReducer, preloadedState, composedEnhancer);
  }
  function createAction(type, prepareAction) {
    function actionCreator() {
      if (prepareAction) {
        var prepared = prepareAction.apply(void 0, arguments);
        if (!prepared) {
          throw new Error("prepareAction did not return an object");
        }
        return _extends2({
          type,
          payload: prepared.payload
        }, "meta" in prepared && {
          meta: prepared.meta
        }, {}, "error" in prepared && {
          error: prepared.error
        });
      }
      return {
        type,
        payload: arguments.length <= 0 ? void 0 : arguments[0]
      };
    }
    actionCreator.toString = function() {
      return "" + type;
    };
    actionCreator.type = type;
    actionCreator.match = function(action) {
      return action.type === type;
    };
    return actionCreator;
  }
  function executeReducerBuilderCallback(builderCallback) {
    var actionsMap = {};
    var actionMatchers = [];
    var defaultCaseReducer;
    var builder = {
      addCase: function addCase(typeOrActionCreator, reducer3) {
        if (true) {
          if (actionMatchers.length > 0) {
            throw new Error("`builder.addCase` should only be called before calling `builder.addMatcher`");
          }
          if (defaultCaseReducer) {
            throw new Error("`builder.addCase` should only be called before calling `builder.addDefaultCase`");
          }
        }
        var type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
        if (type in actionsMap) {
          throw new Error("addCase cannot be called with two reducers for the same action type");
        }
        actionsMap[type] = reducer3;
        return builder;
      },
      addMatcher: function addMatcher(matcher, reducer3) {
        if (true) {
          if (defaultCaseReducer) {
            throw new Error("`builder.addMatcher` should only be called before calling `builder.addDefaultCase`");
          }
        }
        actionMatchers.push({
          matcher,
          reducer: reducer3
        });
        return builder;
      },
      addDefaultCase: function addDefaultCase(reducer3) {
        if (true) {
          if (defaultCaseReducer) {
            throw new Error("`builder.addDefaultCase` can only be called once");
          }
        }
        defaultCaseReducer = reducer3;
        return builder;
      }
    };
    builderCallback(builder);
    return [actionsMap, actionMatchers, defaultCaseReducer];
  }
  function createReducer(initialState, mapOrBuilderCallback, actionMatchers, defaultCaseReducer) {
    if (actionMatchers === void 0) {
      actionMatchers = [];
    }
    var _ref = typeof mapOrBuilderCallback === "function" ? executeReducerBuilderCallback(mapOrBuilderCallback) : [mapOrBuilderCallback, actionMatchers, defaultCaseReducer], actionsMap = _ref[0], finalActionMatchers = _ref[1], finalDefaultCaseReducer = _ref[2];
    return function(state2, action) {
      if (state2 === void 0) {
        state2 = initialState;
      }
      var caseReducers = [actionsMap[action.type]].concat(finalActionMatchers.filter(function(_ref2) {
        var matcher = _ref2.matcher;
        return matcher(action);
      }).map(function(_ref3) {
        var reducer3 = _ref3.reducer;
        return reducer3;
      }));
      if (caseReducers.filter(function(cr) {
        return !!cr;
      }).length === 0) {
        caseReducers = [finalDefaultCaseReducer];
      }
      return caseReducers.reduce(function(previousState, caseReducer) {
        if (caseReducer) {
          if (t(previousState)) {
            var draft = previousState;
            var result = caseReducer(draft, action);
            if (typeof result === "undefined") {
              return previousState;
            }
            return result;
          } else if (!r(previousState)) {
            var _result = caseReducer(previousState, action);
            if (typeof _result === "undefined") {
              if (previousState === null) {
                return previousState;
              }
              throw Error("A case reducer on a non-draftable value must not return undefined");
            }
            return _result;
          } else {
            return immer_esm_default(previousState, function(draft2) {
              return caseReducer(draft2, action);
            });
          }
        }
        return previousState;
      }, state2);
    };
  }
  function getType$1(slice2, actionKey) {
    return slice2 + "/" + actionKey;
  }
  function createSlice(options) {
    var name = options.name, initialState = options.initialState;
    if (!name) {
      throw new Error("`name` is a required option for createSlice");
    }
    var reducers = options.reducers || {};
    var _ref = typeof options.extraReducers === "undefined" ? [] : typeof options.extraReducers === "function" ? executeReducerBuilderCallback(options.extraReducers) : [options.extraReducers], _ref$ = _ref[0], extraReducers = _ref$ === void 0 ? {} : _ref$, _ref$2 = _ref[1], actionMatchers = _ref$2 === void 0 ? [] : _ref$2, _ref$3 = _ref[2], defaultCaseReducer = _ref$3 === void 0 ? void 0 : _ref$3;
    var reducerNames = Object.keys(reducers);
    var sliceCaseReducersByName = {};
    var sliceCaseReducersByType = {};
    var actionCreators = {};
    reducerNames.forEach(function(reducerName) {
      var maybeReducerWithPrepare = reducers[reducerName];
      var type = getType$1(name, reducerName);
      var caseReducer;
      var prepareCallback;
      if ("reducer" in maybeReducerWithPrepare) {
        caseReducer = maybeReducerWithPrepare.reducer;
        prepareCallback = maybeReducerWithPrepare.prepare;
      } else {
        caseReducer = maybeReducerWithPrepare;
      }
      sliceCaseReducersByName[reducerName] = caseReducer;
      sliceCaseReducersByType[type] = caseReducer;
      actionCreators[reducerName] = prepareCallback ? createAction(type, prepareCallback) : createAction(type);
    });
    var finalCaseReducers = _extends2({}, extraReducers, {}, sliceCaseReducersByType);
    var reducer3 = createReducer(initialState, finalCaseReducers, actionMatchers, defaultCaseReducer);
    return {
      name,
      reducer: reducer3,
      actions: actionCreators,
      caseReducers: sliceCaseReducersByName
    };
  }
  var _iteratorSymbol = typeof Symbol !== "undefined" ? Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator")) : "@@iterator";
  var _asyncIteratorSymbol = typeof Symbol !== "undefined" ? Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator")) : "@@asyncIterator";
  T();

  // store/stackReducer.ts
  var createStacksSlice = (name) => createSlice({
    name,
    initialState: [],
    reducers: {
      add(state2, action) {
        state2.push({...action.payload});
      },
      delete(state2, action) {
        const index = state2.findIndex((item) => item.value === action.payload.value);
        if (index > -1) {
          state2.splice(index, 1);
        }
      }
    }
  });

  // store/index.ts
  var ReducerNames;
  (function(ReducerNames3) {
    ReducerNames3["stack1"] = "stack1";
    ReducerNames3["stack2"] = "stack2";
    ReducerNames3["stack3"] = "stack3";
    ReducerNames3["stack4"] = "stack4";
  })(ReducerNames || (ReducerNames = {}));
  var ReduceGroups;
  (function(ReduceGroups2) {
    ReduceGroups2["group1"] = "group1";
    ReduceGroups2["group2"] = "group2";
    ReduceGroups2["group3"] = "group3";
  })(ReduceGroups || (ReduceGroups = {}));
  var stackSlice1 = createStacksSlice(ReducerNames.stack1);
  var stackSlice2 = createStacksSlice(ReducerNames.stack2);
  var stackSlice3 = createStacksSlice(ReducerNames.stack3);
  var stackSlice4 = createStacksSlice(ReducerNames.stack4);
  var store = configureStore({
    reducer: {
      [ReducerNames.stack1]: savesReducerWrapper(ReduceGroups.group1, stackSlice1.reducer),
      [ReducerNames.stack2]: savesReducerWrapper(ReduceGroups.group2, stackSlice2.reducer),
      [ReducerNames.stack3]: savesReducerWrapper(ReduceGroups.group3, stackSlice3.reducer),
      [ReducerNames.stack4]: savesReducerWrapper(ReduceGroups.group3, stackSlice4.reducer),
      saves: savesReducer
    },
    enhancers: [applyMiddleware(createSavesMiddleware())]
  });
  var actions = {
    [ReducerNames.stack1]: stackSlice1.actions,
    [ReducerNames.stack2]: stackSlice2.actions,
    [ReducerNames.stack3]: stackSlice3.actions,
    [ReducerNames.stack4]: stackSlice4.actions
  };

  // utils/useDispatch.ts
  var useDispatch = () => {
    return store.dispatch;
  };

  // utils/useStyles.ts
  var cache6 = new Map();
  var useStyles = (styles4) => {
    if (!cache6.has(styles4)) {
      cache6.set(styles4, jss_esm_default.createStyleSheet(styles4).attach());
    }
    return cache6.get(styles4).classes;
  };

  // components/Button/index.ts
  var styles = {
    btn: {
      userSelect: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 5,
      background: "#5e99cf",
      borderRadius: 4
    }
  };
  var Button = Component((props) => {
    const s2 = useStyles(styles);
    const onclick = props.onClick ? useCallback(props.onClick) : void 0;
    const className = `${s2.btn} ${props.class}`;
    return html2`
        <div class="${className}" title=${props.title || ""} onclick=${onclick}>
            ${props.children}
        </div>
    `;
  });

  // components/Stack/index.ts
  var stackStyles = {
    stack: {
      display: "flex",
      flexGrow: 1,
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "flex-end",
      height: 300,
      padding: 5,
      border: "1px solid #eee",
      borderTop: "none"
    },
    item: {
      margin: 5
    },
    name: {
      padding: 10
    }
  };
  var itemIndex = 0;
  var Stack = Component((stack, items) => {
    const s2 = useStyles(stackStyles);
    const dispatch = useDispatch();
    const addItem = () => {
      dispatch(actions[stack].add({value: `item-${itemIndex++}`}));
    };
    return html2`
        <div class=${s2.stack}>
            ${items.map((item) => StackItem({class: s2.item, stack, item}))}
            ${Button({children: "Add Item", onClick: addItem})}
            <div class="${s2.name}">
                Reducer: ${stack}
            </div>
        </div>
    `;
  });
  var stackItemStyles = {
    item: {
      boxSizing: "border-box",
      position: "relative",
      width: "100%",
      padding: 5,
      borderRadius: 4,
      border: "1px solid",
      "&:hover $operations": {
        pointerEvents: "auto",
        opacity: 1
      }
    },
    operations: {
      pointerEvents: "none",
      position: "absolute",
      top: 0,
      right: 0,
      opacity: 0
    },
    operation: {
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 30,
      height: 30,
      padding: 0
    }
  };
  var StackItem = Component((props) => {
    const s2 = useStyles(stackItemStyles);
    const dis = useDispatch();
    const onDelete = useCallback(() => dis(actions[props.stack].delete({value: props.item.value})));
    const cn2 = `${s2.item} ${props.class}`;
    return html2`
        <div class=${cn2}>
            ${props.item.value}
            <div class=${s2.operations}>
                ${Button({children: "\u2716", class: s2.operation, onClick: onDelete})}
            </div>
        </div>
    `;
  });

  // components/Saves.ts
  var saveStyles = {
    saves: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      flexGrow: 1,
      height: 300,
      padding: 5,
      margin: 5,
      border: "1px solid #eee",
      borderBottom: "none"
    },
    row: {
      display: "flex"
    },
    col: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 5,
      margin: 5,
      border: "1px solid #eee",
      borderBottom: "none"
    },
    save: {
      margin: 5
    },
    name: {
      padding: 10
    }
  };
  var Saves = Component((props) => {
    const s2 = useStyles(saveStyles);
    const {group, currentSave, saves, branchSaves} = props;
    const shouldRender = Array.isArray(saves) && Array.isArray(branchSaves);
    return shouldRender ? html2`
        <div class=${s2.saves}>
            <div class=${`${s2.row} ${s2.name}`}>
                Current save: ${currentSave ? Save({group, save: currentSave}) : "-"}
            </div>
            <div class=${s2.row}>
                <div class=${s2.col}>
                    <div class=${s2.name}>All saves</div>
                    ${saves.map((save) => Save({class: s2.save, group, save}))}
                </div>
                <div class=${s2.col}>
                    <div class=${s2.name}>Branch saves</div>
                    ${branchSaves.map((save) => Save({class: s2.save, group, save}))}
                </div>
            </div>
        </div>
    ` : null;
  });
  var saveItemStyles = {
    item: {
      boxSizing: "border-box",
      position: "relative",
      width: "100%",
      padding: 5,
      borderRadius: 4,
      border: "1px solid",
      "&:hover $actions": {
        pointerEvents: "auto",
        opacity: 1
      }
    },
    actions: {
      pointerEvents: "none",
      position: "absolute",
      top: 0,
      right: 0,
      display: "flex",
      opacity: 0
    },
    action: {
      width: 30,
      height: 30,
      padding: 0,
      marginRight: 2
    }
  };
  var Save = Component((props) => {
    const s2 = useStyles(saveItemStyles);
    const dis = useDispatch();
    const onLoad = props.save ? useCallback(() => dis(createLoadSaveAction({groupKeys: [props.group], saveKey: props.save}))) : noop;
    const onRemove = props.save ? useCallback(() => dis(createRemoveSavesAction({groupKeys: [props.group], saveKeys: [props.save]}))) : noop;
    const cn2 = `${s2.item} ${props.class || ""}`;
    return props.save ? html2`
            <div class=${cn2}>
                ${String(props.save).replace("@@REDUX-SAVE@@/", "")}
                <div class=${s2.actions}>
                    ${Button({children: "\u2913", title: "set", class: s2.action, onClick: onLoad})}
                    ${Button({children: "\u2716", title: "remove", class: s2.action, onClick: onRemove})}
                </div>
            </div>
          ` : null;
  });
  var noop = () => {
  };

  // utils/useSelector.ts
  var useSelector = (selector) => {
    const [value, setValue] = useState(selector(store.getState()));
    useEffect(() => {
      function callback() {
        const newValue = selector(store.getState());
        if (newValue !== value) {
          setValue(newValue);
        }
      }
      return store.subscribe(callback);
    }, [store]);
    return value;
  };

  // components/Group/index.ts
  var styles2 = {
    group: {
      display: "flex",
      flexDirection: "column",
      width: 300
    },
    name: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: 30
    },
    stacks: {
      display: "flex",
      margin: 5,
      border: "1px solid #eee",
      borderTop: "none",
      "& > *": {
        margin: 5
      }
    },
    actions: {
      display: "flex",
      flexDirection: "column"
    },
    btn: {
      margin: 5
    }
  };
  var saveIndex = 0;
  var Group = Component((group) => {
    const s2 = useStyles(styles2);
    const dispatch = useDispatch();
    const onsave = () => dispatch(createAddSaveAction({
      groupKeys: [group.name],
      saveKey: `my-save-${saveIndex++}`
    }));
    const onloadprev = () => dispatch(createLoadPrevSaveAction({groupKeys: [group.name]}));
    const onnextsave = () => dispatch(createLoadNextSaveAction({groupKeys: [group.name]}));
    const reduxSavesState = useSelector((state2) => {
      return state2.saves;
    });
    return html2`
        <div class=${s2.group}>
            <div class=${s2.stacks}>
                ${group.stacks.map((stack) => Stack(stack.name, stack.items))}
            </div>
            <div class=${s2.name}>
                ${group.name}
            </div>
            <div class=${s2.actions}>
                ${Button({class: s2.btn, children: "Add Save", onClick: onsave})}
                ${Button({class: s2.btn, children: "Load Prev Save", onClick: onloadprev})}
                ${Button({class: s2.btn, children: "Load Next Save", onClick: onnextsave})}
            </div>
            <div>
                ${Saves({
      group: group.name,
      saves: reduxSavesState.groupSaves[group.name],
      branchSaves: reduxSavesState.currentBranchSaves[group.name],
      currentSave: reduxSavesState.currentGroupSaves[group.name]
    })}
            </div>
        </div>
    `;
  });

  // components/App/index.ts
  var styles3 = {
    app: {
      display: "flex"
    }
  };
  var App = Component(() => {
    const s2 = useStyles(styles3);
    const state2 = useSelector((state3) => state3);
    const g1 = createGroupProps(ReduceGroups.group1, [ReducerNames.stack1], state2);
    const g2 = createGroupProps(ReduceGroups.group2, [ReducerNames.stack2], state2);
    const g3 = createGroupProps(ReduceGroups.group3, [ReducerNames.stack3, ReducerNames.stack4], state2);
    return html2`
        <div class=${s2.app}>
            ${Group(g1)}
            ${Group(g2)}
            ${Group(g3)}
        </div>
    `;
  });
  function createGroupProps(groupName, reducerNames, state2) {
    return {
      name: groupName,
      stacks: reducerNames.map((reducerName) => {
        return {
          name: reducerName,
          items: state2[reducerName]
        };
      })
    };
  }

  // index.ts
  jss_esm_default.setup(jss_preset_default_esm_default());
  jss_esm_default.use(jss_plugin_nested_esm_default());
  render2(document.getElementById("root"), App);
})();
