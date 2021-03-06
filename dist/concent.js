(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom'], factory) :
  (factory((global.concent = {}),global.React,global.ReactDOM));
}(this, (function (exports,React,ReactDOM) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

  /**
   * 为避免cc-context文件里调用的方法和自身产生循环引用，将moduleName_stateKeys_单独拆开放置到此文件
   * 如果还有别的类似循环引用产生，都可以像moduleName_stateKeys_一样单独拆出来放置为一个文件
   */
  var moduleName_stateKeys_ = {}; // 映射好模块的状态所有key并缓存住，用于提高性能

  var _ERR_MESSAGE;

  var MODULE_GLOBAL = '$$global';
  var MODULE_DEFAULT = '$$default';
  var MODULE_CC = '$$cc'; //do not consider symbol as MODULE_VOID

  var MODULE_VOID = '$$concent_void_module_624313307';
  var MODULE_CC_ROUTER = '$$CONCENT_ROUTER';
  var CC_CLASS = '$$CcClass';
  var CC_FRAGMENT = '$$CcFrag';
  var CC_HOOK = '$$CcHook';
  var CC_PREFIX = '$$Cc';
  var CC_DISPATCHER = '$$Dispatcher';
  var CC_DISPATCHER_BOX = '__cc_dispatcher_container_designed_by_zzk_qq_is_624313307__';
  var CCSYNC_KEY = Symbol('__for_sync_param_ccsync__');
  var SIG_FN_START = 10;
  var SIG_FN_END = 11;
  var SIG_FN_QUIT = 12;
  var SIG_FN_ERR = 13;
  var SIG_MODULE_CONFIGURED = 14;
  var SIG_STATE_CHANGED = 15;
  var RENDER_NO_OP = 1;
  var RENDER_BY_KEY = 2;
  var RENDER_BY_STATE = 3;
  var FOR_ONE_INS_FIRSTLY = 1;
  var FOR_ALL_INS_OF_A_MOD = 2;
  var EFFECT_AVAILABLE = 1;
  var EFFECT_STOPPED = 0;
  var DISPATCH = 'dispatch';
  var SET_STATE = 'setState';
  var SET_MODULE_STATE = 'setModuleState';
  var FORCE_UPDATE = 'forceUpdate';
  var INVOKE = 'invoke';
  var SYNC = 'sync';
  var CATE_MODULE = 'module';
  var CATE_REF = 'ref';
  var FN_CU = 'computed';
  var FN_WATCH = 'watch';
  var ERR = {
    CC_MODULE_NAME_DUPLICATE: 1002,
    CC_MODULE_NOT_FOUND: 1012,
    CC_DISPATCH_STRING_INVALID: 1013,
    CC_DISPATCH_PARAM_INVALID: 1014,
    CC_MODULE_NOT_CONNECTED: 1015,
    CC_CLASS_KEY_DUPLICATE: 1100,
    CC_CLASS_INSTANCE_KEY_DUPLICATE: 1200,
    CC_CLASS_INSTANCE_MORE_THAN_ONE: 1205,
    CC_STORED_KEYS_NEED_CCKEY: 1207,
    CC_REDUCER_NOT_A_FUNCTION: 1503
  };
  var ERR_MESSAGE = (_ERR_MESSAGE = {}, _ERR_MESSAGE[ERR.CC_MODULE_NAME_DUPLICATE] = 'module name duplicate!', _ERR_MESSAGE[ERR.CC_MODULE_NOT_FOUND] = "module not found!", _ERR_MESSAGE[ERR.CC_DISPATCH_STRING_INVALID] = "when type param is string, it must be one of these format: (fnName)\u3001(moduleName)/(fnName)", _ERR_MESSAGE[ERR.CC_DISPATCH_PARAM_INVALID] = "dispatch param type is invalid, it must be string or object", _ERR_MESSAGE[ERR.CC_MODULE_NOT_CONNECTED] = "module not been connected by ref", _ERR_MESSAGE[ERR.CC_CLASS_INSTANCE_KEY_DUPLICATE] = "props.ccKey duplicate", _ERR_MESSAGE[ERR.CC_CLASS_INSTANCE_MORE_THAN_ONE] = 'ccClass is declared as singleton, trying new another one instance is not allowed! ', _ERR_MESSAGE[ERR.CC_STORED_KEYS_NEED_CCKEY] = 'you must explicitly specify a ccKey for ccInstance when set storedKeys!', _ERR_MESSAGE[ERR.CC_CLASS_KEY_DUPLICATE] = 'ccClassKey duplicate!', _ERR_MESSAGE[ERR.CC_REDUCER_NOT_A_FUNCTION] = "reducer must be a function!", _ERR_MESSAGE);

  var _cst = /*#__PURE__*/Object.freeze({
    MODULE_GLOBAL: MODULE_GLOBAL,
    MODULE_DEFAULT: MODULE_DEFAULT,
    MODULE_CC: MODULE_CC,
    MODULE_VOID: MODULE_VOID,
    MODULE_CC_ROUTER: MODULE_CC_ROUTER,
    CC_CLASS: CC_CLASS,
    CC_FRAGMENT: CC_FRAGMENT,
    CC_HOOK: CC_HOOK,
    CC_PREFIX: CC_PREFIX,
    CC_DISPATCHER: CC_DISPATCHER,
    CC_DISPATCHER_BOX: CC_DISPATCHER_BOX,
    CCSYNC_KEY: CCSYNC_KEY,
    SIG_FN_START: SIG_FN_START,
    SIG_FN_END: SIG_FN_END,
    SIG_FN_QUIT: SIG_FN_QUIT,
    SIG_FN_ERR: SIG_FN_ERR,
    SIG_MODULE_CONFIGURED: SIG_MODULE_CONFIGURED,
    SIG_STATE_CHANGED: SIG_STATE_CHANGED,
    RENDER_NO_OP: RENDER_NO_OP,
    RENDER_BY_KEY: RENDER_BY_KEY,
    RENDER_BY_STATE: RENDER_BY_STATE,
    FOR_ONE_INS_FIRSTLY: FOR_ONE_INS_FIRSTLY,
    FOR_ALL_INS_OF_A_MOD: FOR_ALL_INS_OF_A_MOD,
    EFFECT_AVAILABLE: EFFECT_AVAILABLE,
    EFFECT_STOPPED: EFFECT_STOPPED,
    DISPATCH: DISPATCH,
    SET_STATE: SET_STATE,
    SET_MODULE_STATE: SET_MODULE_STATE,
    FORCE_UPDATE: FORCE_UPDATE,
    INVOKE: INVOKE,
    SYNC: SYNC,
    CATE_MODULE: CATE_MODULE,
    CATE_REF: CATE_REF,
    FN_CU: FN_CU,
    FN_WATCH: FN_WATCH,
    ERR: ERR,
    ERR_MESSAGE: ERR_MESSAGE
  });

  var _computedValue2, _computedValueOri2;

  var _computedValue = (_computedValue2 = {}, _computedValue2[MODULE_GLOBAL] = {}, _computedValue2[MODULE_DEFAULT] = {}, _computedValue2[MODULE_CC] = {}, _computedValue2);

  var _computedValueOri = (_computedValueOri2 = {}, _computedValueOri2[MODULE_GLOBAL] = {}, _computedValueOri2[MODULE_DEFAULT] = {}, _computedValueOri2[MODULE_CC] = {}, _computedValueOri2);

  var _computedDep = {};
  var _computedRaw = {};
  var cuMap = {
    _computedValueOri: _computedValueOri,
    _computedValue: _computedValue,
    _computedRaw: _computedRaw,
    _computedDep: _computedDep,
    getRootComputedValue: function getRootComputedValue() {
      return _computedValue;
    },
    getRootComputedDep: function getRootComputedDep() {
      return _computedDep;
    },
    getRootComputedRaw: function getRootComputedRaw() {
      return _computedRaw;
    }
  };

  /** watch section */
  var _watchDep = {};
  var _watchRaw = {};
  var watch = {
    _watchRaw: _watchRaw,
    _watchDep: _watchDep,
    getRootWatchDep: function getRootWatchDep() {
      return _watchDep;
    },
    getRootWatchRaw: function getRootWatchRaw() {
      return _watchRaw;
    }
  };

  // 后续在逐步迁移其他的
  var runtimeVar = {
    alwaysGiveState: true,
    // if isStrict is true, every error will be throw out instead of console.error, 
    // but this may crash your app, make sure you have a nice error handling way,
    // like componentDidCatch in react 16.*
    isStrict: false,
    isDebug: false,
    computedCompare: true,
    watchCompare: true,
    watchImmediate: false,
    bindCtxToMethod: false
  };

  var CU_KEY = Symbol('cuk');
  var START = '1';
  var END = '2';
  var NOT_A_JSON = 'is not a plain json object!';
  var STR_ARR_OR_STAR = 'should be an string array or *!';

  var cer = console.error;
  function isObjectNotNull(object) {
    if (object === null || object === undefined) {
      return false;
    }

    if (okeys(object).length > 0) {
      return true;
    }

    return false;
  }
  function isObjectNull(object) {
    return !isObjectNotNull(object);
  } // const _toString = Object.prototype.toString;
  //_toString.call(obj) === '[object Object]'; //judge plain json object
  // isPJO is short of isPlainJsonObject

  function isPJO(obj, canBeArray) {
    if (canBeArray === void 0) {
      canBeArray = false;
    }

    // null undefined 0 false ''
    if (!obj) return false;
    var isObj = typeof obj === 'object';

    if (isObj) {
      var isArr = Array.isArray(obj);
      return canBeArray ? isArr : isObj && !isArr;
    } else {
      return false;
    }
  }
  function makeError(code, extraMessage) {
    var message = '';
    if (typeof code === 'string') message = code;else {
      message = ERR_MESSAGE[code] || '';
    }
    if (extraMessage) message += extraMessage;
    if (!message) message = "undefined message for code:" + code;
    var error = new Error(message);
    error.code = code;
    return error;
  }
  function makeCuObValue(isLazy, result, needCompute, fn, newState, oldState, fnCtx) {
    var _ref;

    return _ref = {}, _ref[CU_KEY] = 1, _ref.needCompute = needCompute, _ref.fn = fn, _ref.newState = newState, _ref.oldState = oldState, _ref.fnCtx = fnCtx, _ref.isLazy = isLazy, _ref.result = result, _ref;
  }
  function makeCuDepDesc() {
    return {
      retKey_fn_: {},
      retKey_lazy_: {},
      stateKey_retKeys_: {},
      fnCount: 0
    };
  }
  /** make ccClassContext */

  function makeCcClassContext(module, ccClassKey, renderKeyClasses, watchedKeys, originalWatchedKeys) {
    return {
      module: module,
      ccClassKey: ccClassKey,
      renderKeyClasses: renderKeyClasses,
      originalWatchedKeys: originalWatchedKeys,
      watchedKeys: watchedKeys,
      ccKeys: [],
      connectedState: {},
      connectedModuleKeyMapping: null,
      connectedModule: {} //记录当前cc类连接到了其他哪些模块

    };
  } // !!! different ccClass enable own a same key

  function makeUniqueCcKey(ccClassKey, ccKey) {
    // return `${ccClassKey}/${ccKey}`;
    return ccClassKey + "$" + ccKey;
  }
  function makeHandlerKey(ccUniqueKey, eventName, identity) {
    return ccUniqueKey + "$" + eventName + "$" + identity;
  }
  function isModuleNameValid(moduleName) {
    return /^[\$\#\&a-zA-Z0-9_-]+$/.test(moduleName);
  }
  function isModuleNameCcLike(moduleName) {
    var name = moduleName.toLowerCase();
    return name === MODULE_CC;
  }
  function verboseInfo(info) {
    return info ? " --verbose-info: " + info : '';
  }
  function ccClassDisplayName(className) {
    return "CC(" + className + ")";
  }
  function verifyKeys(keys1, keys2) {
    var duplicate = false,
        notArray = false,
        keyElementNotString = false;
    if (!Array.isArray(keys1)) return {
      duplicate: duplicate,
      notArray: true,
      keyElementNotString: keyElementNotString
    };
    if (!Array.isArray(keys2)) return {
      duplicate: duplicate,
      notArray: true,
      keyElementNotString: keyElementNotString
    };
    var len1 = keys1.length;
    var len2 = keys2.length;

    outLoop: for (var i = 0; i < len1; i++) {
      var tmpKey = keys1[i];

      if (typeof tmpKey !== 'string') {
        keyElementNotString = true;
        break outLoop;
      }

      for (var j = 0; j < len2; j++) {
        var tmpKey2 = keys2[j];

        if (typeof tmpKey2 !== 'string') {
          keyElementNotString = true;
          break outLoop;
        }

        if (tmpKey2 === tmpKey) {
          duplicate = true;
          break outLoop;
        }
      }
    }

    return {
      duplicate: duplicate,
      notArray: notArray,
      keyElementNotString: keyElementNotString
    };
  }
  function color(color) {
    if (color === void 0) {
      color = 'green';
    }

    return "color:" + color + ";border:1px solid " + color;
  }
  function styleStr(str) {
    return "%c" + str;
  }

  var tipStart = function tipStart(str) {
    return "------------ CC " + str + " ------------";
  };

  function justWarning(err) {
    cer(tipStart('WARNING'));

    if (err instanceof Error) {
      cer(err.message);
      cer(err.stack);
    } else cer(err);
  }
  function justTip(msg) {
    console.log(tipStart('TIP'));
    console.log("%c" + msg, 'color:green;border:1px solid green;');
  }
  function strictWarning(err) {
    cer(tipStart('WARNING'));
    cer(err);

    if (runtimeVar.isStrict) {
      throw err;
    }
  }
  function safeGetObject(object, key, defaultVal) {
    if (defaultVal === void 0) {
      defaultVal = {};
    }

    var childrenObject = object[key];

    if (!childrenObject) {
      childrenObject = object[key] = defaultVal;
    }

    return childrenObject;
  }
  function safeGetArray(object, key) {
    var childrenArray = object[key];

    if (!childrenArray) {
      childrenArray = object[key] = [];
    }

    return childrenArray;
  }
  function safeAssignObjectValue(assignTo, assignFrom) {
    Object.keys(assignFrom).forEach(function (key) {
      assignTo[key] = assignFrom[key];
    });
  }
  function computeFeature(ccUniqueKey, state) {
    var stateKeys = Object.keys(state);
    var stateKeysStr = stateKeys.sort().join('|');
    return ccUniqueKey + "/" + stateKeysStr;
  }
  function randomNumber(lessThan) {
    if (lessThan === void 0) {
      lessThan = 52;
    }

    var seed = Math.random();
    return parseInt(seed * lessThan);
  }
  function clearObject(object, excludeKeys, reset) {
    if (excludeKeys === void 0) {
      excludeKeys = [];
    }

    if (Array.isArray(object)) {
      var retainKeys = [];
      excludeKeys.forEach(function (key) {
        if (object.includes(key)) retainKeys.push(key);
      });
      object.length = 0;
      retainKeys.forEach(function (key) {
        return object.push(key);
      });
    } else Object.keys(object).forEach(function (key) {
      if (excludeKeys.includes(key)) ; else {
        if (reset) object[key] = reset;else delete object[key];
      }
    });
  }
  function okeys(obj) {
    return Object.keys(obj);
  }
  function convertToStandardEvent(e) {
    var ret = null;

    if (e) {
      if (e.currentTarget && e.type) {
        ret = e;
      } else if (e.nativeEvent && e.target) {
        e.currentTarget = e.target;
        ret = e;
      }
    }

    return ret;
  } //防止有些在线IDE，绑定失败

  function bindToWindow(key, toBindObj, targetObj) {
    var attachToTarget = function attachToTarget(targetObj) {
      if (targetObj) targetObj[key] = toBindObj;else window[key] = toBindObj;
    };

    if (window) {
      attachToTarget(targetObj);
    } else {
      setTimeout(function () {
        attachToTarget(targetObj);
      }, 3000);
    }
  }
  /**
   * 浅比较两个对象
   * come from : https://github.com/developit/preact-compat/blob/7c5de00e7c85e2ffd011bf3af02899b63f699d3a/src/index.js#L349
   */

  function shallowDiffers(a, b) {
    for (var i in a) {
      if (!(i in b)) return true;
    }

    for (var _i in b) {
      if (a[_i] !== b[_i]) return true;
    }

    return false;
  }
  function differStateKeys(oldState, newState) {
    var changed = [],
        setted = []; // const unchanged=[];

    okeys(newState).forEach(function (k) {
      var newVal = newState[k];

      if (newVal !== undefined) {
        setted.push(k);
        if (newVal !== oldState[k]) changed.push(k); // else unchanged.push(k);
      }
    });
    return {
      changed: changed,
      setted: setted
    };
  }
  function removeArrElements(arr, toRemoveArr) {
    var newArr = [];
    arr.forEach(function (item) {
      if (!toRemoveArr.includes(item)) newArr.push(item);
    });
    return newArr;
  }
  function getRegisterOptions(options) {
    if (options === void 0) {
      options = {};
    }

    if (typeof options === 'string') {
      return {
        module: options
      };
    } else {
      return Object.assign({
        module: MODULE_DEFAULT
      }, options);
    }
  }
  var ccns = '';
  function setCcNamespace(name) {
    ccns = name;
  }
  function getCcNamespace() {
    return ccns;
  }
  function getWinCc() {
    if (ccns) return window.mcc[ccns];
    return window.cc;
  }
  function makeCommitHandler() {
    var state = null;

    var commit = function commit(partialState) {
      if (!state) state = {};
      Object.assign(state, partialState);
    };

    var getFnCommittedState = function getFnCommittedState() {
      return state;
    };

    return {
      commit: commit,
      getFnCommittedState: getFnCommittedState
    };
  }
  function isOnlineEditor() {
    var result = false;

    if (window) {
      if (window.name === 'previewFrame' //for stackblitz
      || window.__SANDBOX_DATA__ // for codesandbox
      || window.BrowserFS // for codesandbox
      ) {
          result = true;
        }
    }

    return result;
  }
  function makeCallInfo(module) {
    return {
      payload: null,
      renderKey: '',
      delay: -1,
      module: module,
      fnName: ''
    };
  }
  function evalState(state) {
    if (state === void 0) {
      state = {};
    }

    var ret = typeof state === 'function' ? state() : state;

    if (!isPJO(ret)) {
      throw new Error("state " + NOT_A_JSON);
    }

    return ret;
  }

  function _getValue(obj, keys, lastKeyIndex, keyIndex) {
    var key = keys[keyIndex];

    if (lastKeyIndex === keyIndex) {
      return obj[key];
    } else {
      return _getValue(obj[key], keys, lastKeyIndex, ++keyIndex);
    }
  }

  function getValueByKeyPath(obj, keyPath) {
    var keys = keyPath.split('.');
    return _getValue(obj, keys, keys.length - 1, 0);
  }
  function getPassToMapWaKeys(watchedKeys) {
    if (watchedKeys === '-') return '*';else return watchedKeys;
  }

  function getCacheDataContainer() {
    return {
      module: {
        computed: {},
        watch: {}
      },
      ref: {
        computed: {},
        watch: {},
        effect: {}
      }
    };
  }

  var cacheArea_pickedRetKeys_ = getCacheDataContainer();

  function _wrapFn(retKey, retKey_fn_, isLazy) {
    var _retKey_fn_$retKey = retKey_fn_[retKey],
        fn = _retKey_fn_$retKey.fn,
        depKeys = _retKey_fn_$retKey.depKeys;
    return {
      retKey: retKey,
      fn: fn,
      depKeys: depKeys,
      isLazy: isLazy
    };
  }

  function clearCachedData() {
    cacheArea_pickedRetKeys_ = getCacheDataContainer();
  } // cate module | ref
  // type computed | watch

  function pickDepFns (isBeforeMount, cate, type, depDesc, stateModule, oldState, committedState, cUkey) {
    var moduleDep = depDesc[stateModule]; // it can be refModuleDep or moduleDep

    var pickedFns = [];
    if (!moduleDep) return {
      pickedFns: pickedFns,
      setted: [],
      changed: []
    };
    var retKey_fn_ = moduleDep.retKey_fn_,
        retKey_lazy_ = moduleDep.retKey_lazy_,
        stateKey_retKeys_ = moduleDep.stateKey_retKeys_,
        fnCount = moduleDep.fnCount;
    /** 首次调用 */

    if (isBeforeMount) {
      var retKeys = okeys(retKey_fn_);

      var _setted = okeys(committedState);

      var _changed = _setted;

      if (type === 'computed') {
        return {
          pickedFns: retKeys.map(function (retKey) {
            return _wrapFn(retKey, retKey_fn_, retKey_lazy_[retKey]);
          }),
          setted: _setted,
          changed: _changed
        };
      } // for watch


      retKeys.forEach(function (retKey) {
        var _retKey_fn_$retKey2 = retKey_fn_[retKey],
            fn = _retKey_fn_$retKey2.fn,
            immediate = _retKey_fn_$retKey2.immediate,
            depKeys = _retKey_fn_$retKey2.depKeys;
        if (immediate) pickedFns.push({
          retKey: retKey,
          fn: fn,
          depKeys: depKeys
        });
      });
      return {
        pickedFns: pickedFns,
        setted: _setted,
        changed: _changed
      };
    } // 这些目标stateKey的值发生了变化


    var _differStateKeys = differStateKeys(oldState, committedState),
        setted = _differStateKeys.setted,
        changed = _differStateKeys.changed;

    if (setted.length === 0) {
      return {
        pickedFns: pickedFns,
        setted: [],
        changed: []
      };
    } //用setted + changed + module 作为键，缓存对应的pickedFns，这样相同形状的committedState再次进入此函数时，方便快速直接命中pickedFns


    var cacheKey = setted.join(',') + '|' + changed.join(',') + '|' + stateModule; // 要求用户必须在setup里静态的定义完computed & watch，动态的调用computed & watch的回调因为缓存原因不会被触发

    var tmpNode = cacheArea_pickedRetKeys_[cate][type];
    var cachePool = cUkey ? safeGetObject(tmpNode, cUkey) : tmpNode;
    var cachedPickedRetKeys = cachePool[cacheKey];

    if (cachedPickedRetKeys) {
      return {
        pickedFns: cachedPickedRetKeys.map(function (retKey) {
          return _wrapFn(retKey, retKey_fn_, retKey_lazy_[retKey]);
        }),
        setted: setted,
        changed: changed
      };
    }

    _pickFn(pickedFns, setted, changed, retKey_fn_, stateKey_retKeys_, retKey_lazy_, fnCount);

    cachePool[cacheKey] = pickedFns.map(function (v) {
      return v.retKey;
    });
    return {
      pickedFns: pickedFns,
      setted: setted,
      changed: changed
    };
  }

  function _pickFn(pickedFns, settedStateKeys, changedStateKeys, retKey_fn_, stateKey_retKeys_, retKey_lazy_, fnCount) {
    if (settedStateKeys.length === 0) return; // 把*的函数先全部挑出来, 有key的值发生变化了或者有设值行为

    var starRetKeys = stateKey_retKeys_['*'];

    if (starRetKeys) {
      var isKeyValChanged = changedStateKeys.length > 0;
      starRetKeys.forEach(function (retKey) {
        var _retKey_fn_$retKey3 = retKey_fn_[retKey],
            fn = _retKey_fn_$retKey3.fn,
            compare = _retKey_fn_$retKey3.compare,
            depKeys = _retKey_fn_$retKey3.depKeys;
        var toPush = {
          retKey: retKey,
          fn: fn,
          depKeys: depKeys,
          isLazy: retKey_lazy_[retKey]
        };

        if (compare) {
          if (isKeyValChanged) pickedFns.push(toPush);
          return;
        }

        pickedFns.push(toPush);
      });
    } // 继续遍历settedStateKeys, 挑选出剩余的目标fn（非*相关的）


    if (pickedFns.length < fnCount) {
      (function () {
        var retKey_picked_ = {};
        var len = settedStateKeys.length;

        var _loop2 = function _loop2(i) {
          var stateKey = settedStateKeys[i];
          var retKeys = stateKey_retKeys_[stateKey]; //发生变化了的stateKey不一定在依赖列表里

          if (!retKeys) return "continue";
          retKeys.forEach(function (retKey) {
            //没有挑过的方法才挑出来
            if (!retKey_picked_[retKey]) {
              var _retKey_fn_$retKey4 = retKey_fn_[retKey],
                  fn = _retKey_fn_$retKey4.fn,
                  compare = _retKey_fn_$retKey4.compare,
                  depKeys = _retKey_fn_$retKey4.depKeys;
              var canPick = true;

              if (compare && !changedStateKeys.includes(stateKey)) {
                canPick = false;
              }

              if (canPick) {
                retKey_picked_[retKey] = true;
                pickedFns.push({
                  retKey: retKey,
                  fn: fn,
                  depKeys: depKeys,
                  isLazy: retKey_lazy_[retKey]
                });
              }
            }
          });
          if (pickedFns.length === fnCount) return "break";
        };

        _loop: for (var i = 0; i < len; i++) {
          var _ret = _loop2(i);

          switch (_ret) {
            case "continue":
              continue;

            case "break":
              break _loop;
          }
        }
      })();
    }
  }

  function setPartialState(partialState, state, key) {
    var value = state[key];

    if (value !== undefined) {
      partialState[key] = value;
      return true;
    }

    return false;
  }

  function extractStateByKeys (state, stateKeys, returnNullIfEmpty, needIgnored) {
    if (stateKeys === void 0) {
      stateKeys = [];
    }

    if (returnNullIfEmpty === void 0) {
      returnNullIfEmpty = false;
    }

    if (needIgnored === void 0) {
      needIgnored = false;
    }

    var partialState = {},
        ignoredStateKeys = [];

    if (!isPJO(state)) {
      return {
        partialState: returnNullIfEmpty ? null : partialState,
        isStateEmpty: true,
        ignoredStateKeys: ignoredStateKeys
      };
    }

    var isStateEmpty = true;
    var committedStateKeys = okeys(state);

    if (committedStateKeys.length >= stateKeys.length) {
      stateKeys.forEach(function (key) {
        if (setPartialState(partialState, state, key)) isStateEmpty = false;
      });
      if (needIgnored) ignoredStateKeys = removeArrElements(committedStateKeys, stateKeys);
    } else {
      committedStateKeys.forEach(function (key) {
        if (stateKeys.includes(key)) {
          if (setPartialState(partialState, state, key)) isStateEmpty = false;
        } else {
          if (needIgnored) ignoredStateKeys.push(key);
        }
      });
    }

    if (isStateEmpty && returnNullIfEmpty) partialState = null;
    return {
      partialState: partialState,
      isStateEmpty: isStateEmpty,
      ignoredStateKeys: ignoredStateKeys
    };
  }

  function makeCuObState (state, depKeys) {
    return new Proxy(state, {
      get: function get(target, key) {
        if (!depKeys.includes(key)) depKeys.push(key);
        return target[key];
      },
      set: function set(target, key) {
        target[key] = target[key];
        return true;
      }
    });
  }

  function getCuWaParams(retKey, depKeys, newState, oldState) {
    if (runtimeVar.alwaysGiveState) {
      return [newState, oldState];
    } else {
      var firstDepKey = depKeys[0];

      if (depKeys.length === 1 && firstDepKey !== '*' && firstDepKey === retKey) {
        return [newState[firstDepKey], oldState[firstDepKey]];
      } else {
        return [newState, oldState];
      }
    }
  }

  function getStateKeyRetKeysMap(refCtx, sourceType, stateModule) {
    var modDep;

    if (sourceType === CATE_REF) {
      modDep = refCtx.computedDep[refCtx.module] || {};
    } else {
      modDep = cuMap._computedDep[stateModule] || {};
    }

    return modDep.stateKey_retKeys_;
  }

  function setStateKeyRetKeysMap(refCtx, sourceType, stateModule, retKey, depKeys) {
    if (depKeys.length === 0) return;
    var modDep;

    if (sourceType === CATE_REF) {
      modDep = safeGetObject(refCtx.computedDep, refCtx.module);
    } else {
      modDep = safeGetObject(cuMap._computedDep, stateModule);
    }

    var stateKey_retKeys_ = safeGetObject(modDep, 'stateKey_retKeys_');
    depKeys.forEach(function (sKey) {
      var retKeys = safeGetArray(stateKey_retKeys_, sKey); // 此处判断一下retKeys，谨防用户直接在computed里操作obState, 这里拿到的sKey是一堆原型链上key，如`valueOf`等

      if (retKeys && !retKeys.includes(retKey)) retKeys.push(retKey);
    });
  }

  function executeCuOrWatch(retKey, depKeys, fn, newState, oldState, fnCtx) {
    var _getCuWaParams = getCuWaParams(retKey, depKeys, newState, oldState),
        n = _getCuWaParams[0],
        o = _getCuWaParams[1];

    return fn(n, o, fnCtx);
  } // fnType: computed watch
  // sourceType: module ref


  var findDepFnsToExecute = (function (refCtx, stateModule, refModule, oldState, finder, stateForComputeFn, initNewState, initDeltaCommittedState, callInfo, isFirstCall, fnType, sourceType, computedContainer) {
    var whileCount = 0;
    var curStateForComputeFn = stateForComputeFn;
    var shouldCurrentRefUpdate = true;
    var hasDelta = false;

    var _loop = function _loop() {
      whileCount++; // 因为beforeMountFlag为true的情况下，finder里调用的pickDepFns会挑出所有函数，
      // 这里必需保证只有第一次循环的时候取isFirstCall的实际值，否则一定取false，（要不然就陷入无限死循环，每一次都是true，每一次都挑出所有dep函数执行）

      var beforeMountFlag = whileCount === 1 ? isFirstCall : false;

      var _finder = finder(curStateForComputeFn, beforeMountFlag),
          pickedFns = _finder.pickedFns,
          setted = _finder.setted,
          changed = _finder.changed;

      if (!pickedFns.length) return "break";

      var _makeCommitHandler = makeCommitHandler(),
          commit = _makeCommitHandler.commit,
          getFnCommittedState = _makeCommitHandler.getFnCommittedState;

      var _makeCommitHandler2 = makeCommitHandler(),
          commitCu = _makeCommitHandler2.commit,
          getFinalCu = _makeCommitHandler2.getFnCommittedState;

      pickedFns.forEach(function (_ref) {
        var retKey = _ref.retKey,
            fn = _ref.fn,
            depKeys = _ref.depKeys,
            isLazy = _ref.isLazy;
        var fnCtx = {
          retKey: retKey,
          callInfo: callInfo,
          isFirstCall: isFirstCall,
          commit: commit,
          commitCu: commitCu,
          setted: setted,
          changed: changed,
          stateModule: stateModule,
          refModule: refModule,
          oldState: oldState,
          committedState: curStateForComputeFn,
          refCtx: refCtx
        }; // 循环里的首次计算且是自动收集状态，注入代理对象，收集计算&观察依赖
        // 注：只有immediate为true的watch才有机会执行此判断结构为true并收集到依赖

        var canPassObState = beforeMountFlag && depKeys === '-';

        if (fnType === 'computed') {
          if (isLazy) {
            // lazyComputed 不再暴露这两个接口，以隔绝副作用
            delete fnCtx.commit;
            delete fnCtx.commitCu;
          }

          if (canPassObState) {
            var collectedDepKeys = [];
            var obInitNewState = makeCuObState(initNewState, collectedDepKeys); // 首次计算时，new 和 old是同一个对象，方便用于收集depKeys

            var computedValueOrRet = executeCuOrWatch(retKey, depKeys, fn, obInitNewState, obInitNewState, fnCtx);
            computedContainer[retKey] = makeCuObValue(false, computedValueOrRet);
            setStateKeyRetKeysMap(refCtx, sourceType, stateModule, retKey, collectedDepKeys);
          } else {
            if (isLazy) {
              var _getCuWaParams2 = getCuWaParams(retKey, depKeys, initNewState, oldState),
                  n = _getCuWaParams2[0],
                  o = _getCuWaParams2[1];

              computedContainer[retKey] = makeCuObValue(isLazy, null, true, fn, n, o, fnCtx);
            } else {
              var _computedValueOrRet = executeCuOrWatch(retKey, depKeys, fn, initNewState, oldState, fnCtx);

              computedContainer[retKey] = makeCuObValue(false, _computedValueOrRet);
            }
          }
        } else {
          // watch
          var _computedValueOrRet2,
              tmpInitNewState = initNewState,
              _collectedDepKeys = [];

          var tmpOldState = oldState;

          if (canPassObState) {
            tmpInitNewState = makeCuObState(initNewState, _collectedDepKeys); // 首次触发watch时，new 和 old是同一个对象，方便用于收集depKeys

            tmpOldState = tmpInitNewState;
          }

          _computedValueOrRet2 = executeCuOrWatch(retKey, depKeys, fn, tmpInitNewState, tmpOldState, fnCtx);
          setStateKeyRetKeysMap(refCtx, sourceType, stateModule, retKey, _collectedDepKeys); //实例里只要有一个watch函数返回false，就会阻碍当前实例的ui被更新

          if (_computedValueOrRet2 === false) shouldCurrentRefUpdate = false;
        }
      });
      curStateForComputeFn = getFnCommittedState();

      if (curStateForComputeFn) {
        var assignCuState = function assignCuState(toAssign, judgeEmpty) {
          if (judgeEmpty === void 0) {
            judgeEmpty = false;
          }

          curStateForComputeFn = toAssign;

          if (judgeEmpty && okeys(toAssign).length === 0) {
            curStateForComputeFn = null;
            return;
          }

          Object.assign(initNewState, curStateForComputeFn);
          Object.assign(initDeltaCommittedState, curStateForComputeFn);
          hasDelta = true;
        }; // !!! 确保实例里调用commit只能提交privState片段，模块里调用commit只能提交moduleState片段
        // !!! 同时确保privState里的key是事先声明过的，而不是动态添加的


        var stateKeys = sourceType === 'ref' ? refCtx.privStateKeys : moduleName_stateKeys_[stateModule];

        var _extractStateByKeys = extractStateByKeys(curStateForComputeFn, stateKeys, true, true),
            partialState = _extractStateByKeys.partialState,
            ignoredStateKeys = _extractStateByKeys.ignoredStateKeys;

        if (partialState) {
          if (fnType === FN_WATCH) {
            var stateKey_retKeys_ = getStateKeyRetKeysMap(refCtx, sourceType, stateModule);

            if (stateKey_retKeys_) {
              // 确保watch函数里调用commit提交的state keys没有出现在computed函数的depKeys里
              // 因为按照先执行computed，再执行watch的顺序，提交了这种stateKey，会造成computed函数返回结果失效了的情况产生
              var ignoredStateKeysAsDepInCu = [],
                  canAssignState = {};
              okeys(partialState).forEach(function (stateKey) {
                if (stateKey_retKeys_[stateKey]) {
                  ignoredStateKeysAsDepInCu.push(stateKey);
                } else {
                  canAssignState[stateKey] = partialState[stateKey];
                }
              });

              if (ignoredStateKeysAsDepInCu.length > 0) {
                justWarning("these state keys[" + ignoredStateKeysAsDepInCu.join(',') + "] will been ignored, cause they are also appeared in computed depKeys,\n              cc suggest you move the logic to computed file.");
              }

              assignCuState(canAssignState, true);
            } else {
              assignCuState(partialState);
            }
          } else {
            assignCuState(partialState);
          }
        }

        if (ignoredStateKeys.length) {
          var reason = "they are not " + (sourceType === CATE_REF ? 'private' : 'module') + ", fn is " + sourceType + " " + fnType;
          justWarning("these state keys[" + ignoredStateKeys.join(',') + "] are invalid, " + reason);
        }
      } // computedContainer对于模块里的computed回调里调用committedCu，是moduleComputed结果容器，
      // 对于实例里的computed回调里调用committedCu来说，是refComputed结果容器


      var committedCu = getFinalCu();

      if (committedCu) {
        var retKey_fn_;

        if (sourceType === 'ref') {
          retKey_fn_ = fnType === 'computed' ? refCtx.computedRetKeyFns : refCtx.watchRetKeyFns;
        } else {
          // commitCu提交的结果是存到moduleComputed里的，所以这里从始终从_computedDep 取retKey_fn_，来判断commitCu提交的retKey是否合法
          var moduleDep = cuMap.getRootComputedDep()[stateModule] || {};
          retKey_fn_ = moduleDep.retKey_fn_ || null;
        }

        if (retKey_fn_) {
          okeys(committedCu).forEach(function (retKey) {
            if (!retKey_fn_[retKey]) justWarning("fnCtx.commitCu commit an invalid retKey[" + retKey + "] for moduleComputed"); // 由committedCu提交的值，可以统一当作非lazy值set回去，方便取的时候直接取
            else computedContainer[retKey] = makeCuObValue(false, committedCu[retKey]);
          });
        }
      }

      if (whileCount > 10) {
        justWarning('fnCtx.commit may goes endless loop, please check your code');
        curStateForComputeFn = null;
      }
    };

    while (curStateForComputeFn) {
      var _ret = _loop();

      if (_ret === "break") break;
    }

    return {
      shouldCurrentRefUpdate: shouldCurrentRefUpdate,
      hasDelta: hasDelta
    };
  });

  var _reducer;
  var _computedValue$1 = cuMap._computedValue;
  var okeys$1 = okeys;
  var refs = {};

  var getDispatcher = function getDispatcher() {
    return refs[CC_DISPATCHER];
  };

  var setStateByModule = function setStateByModule(module, committedState, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$refCtx = _ref.refCtx,
        refCtx = _ref$refCtx === void 0 ? null : _ref$refCtx,
        _ref$callInfo = _ref.callInfo,
        callInfo = _ref$callInfo === void 0 ? {} : _ref$callInfo;

    var moduleState = _getState(module);

    var prevModuleState = _getPrevState(module);

    var moduleComputedValue = _computedValue$1[module];
    var rootComputedDep = cuMap.getRootComputedDep();

    var curDepComputedFns = function curDepComputedFns(committedState, isFirstCall) {
      return pickDepFns(isFirstCall, CATE_MODULE, 'computed', rootComputedDep, module, moduleState, committedState);
    };

    var rootWatchDep = watch.getRootWatchDep();

    var curDepWatchFns = function curDepWatchFns(committedState, isFirstCall) {
      return pickDepFns(isFirstCall, CATE_MODULE, 'watch', rootWatchDep, module, moduleState, committedState);
    };

    var refModule = refCtx ? refCtx.module : null;
    var newState = Object.assign({}, moduleState, committedState);
    var deltaCommittedState = Object.assign({}, committedState);
    var toComputedState = deltaCommittedState;
    findDepFnsToExecute(refCtx, module, refModule, moduleState, curDepComputedFns, toComputedState, newState, deltaCommittedState, callInfo, false, 'computed', CATE_MODULE, moduleComputedValue);
    findDepFnsToExecute(refCtx, module, refModule, moduleState, curDepWatchFns, toComputedState, newState, deltaCommittedState, callInfo, false, 'watch', CATE_MODULE, moduleComputedValue);
    okeys$1(deltaCommittedState).forEach(function (key) {
      prevModuleState[key] = moduleState[key];
      incStateVer(module, key);
      moduleState[key] = deltaCommittedState[key];
    });
    return deltaCommittedState;
  };

  var _getState = function getState(module) {
    return _state[module];
  };

  var _getPrevState = function getPrevState(module) {
    return _prevState[module];
  };

  var getStateVer = function getStateVer(module) {
    if (!module) return _stateVer;
    return _stateVer[module];
  };

  var incStateVer = function incStateVer(module, key) {
    _stateVer[module][key]++;
  };

  var getRootState = function getRootState() {
    var _ref2;

    return _ref2 = {}, _ref2[MODULE_CC] = {}, _ref2[MODULE_VOID] = {}, _ref2[MODULE_GLOBAL] = {}, _ref2[MODULE_DEFAULT] = {}, _ref2;
  };
  /** ccContext section */


  var _state = getRootState();

  var _prevState = getRootState(); // record state version, to let ref effect avoid endless execute
  // 1 effect里的函数再次出发当前实例渲染，渲染完后检查prevModuleState curModuleState, 对应的key值还是不一样，又再次出发effect，造成死循环
  // 2 确保引用型值是基于原有引用修改某个属性的值时，也能触发effect


  var _stateVer = {};
  var ccContext = {
    getDispatcher: getDispatcher,
    isHotReloadMode: function isHotReloadMode() {
      if (ccContext.isHot) return true;
      return window && (window.webpackHotUpdate || isOnlineEditor());
    },
    runtimeVar: runtimeVar,
    isHot: false,
    reComputed: true,
    isStartup: false,
    //  cc allow multi react class register to a module by default, but if want to control some module 
    //  to only allow register one react class, flag the module name as true in this option object
    //  example:  {fooModule: true, barModule:true}
    moduleSingleClass: {},
    moduleName_stateFn_: {},
    moduleName_ccClassKeys_: {},
    // 映射好模块的状态所有key并缓存住，用于提高性能
    moduleName_stateKeys_: moduleName_stateKeys_,
    // 记录模块是不是通过configure配置的
    moduleName_isConfigured_: {},

    /**
      ccClassContext:{
        module,
        ccClassKey,
        // renderKey机制影响的类范围，默认只影响调用者所属的类，如果有别的类观察了同一个模块的某个key，这个类的实例是否触发渲染不受renderKey影响
        // 为 * 表示影响所有的类，即其他类实例都受renderKey机制影响。
        renderKeyClasses, 
        originalWatchedKeys,
        watchedKeys,
        ccKeys: [],
        connectedState: {},
        connectedModuleKeyMapping: null,
        connectedModule:{},//记录当前cc类连接到了其他哪些模块
      }
    */
    ccClassKey_ccClassContext_: {},
    // globalStateKeys is maintained by cc automatically,
    // when user call cc.setGlobalState, or ccInstance.setGlobalState,
    // commit state will be checked strictly by cc with globalStateKeys,
    // all the keys of commit state must been included in globalStateKeys
    globalStateKeys: [],
    //store里的setState行为会自动触发模块级别的computed、watch函数
    store: {
      appendState: function appendState(module, state) {
        var stateKeys = safeGetArray(moduleName_stateKeys_, module);
        okeys(state).forEach(function (k) {
          if (!stateKeys.includes(k)) {
            stateKeys.push(k);
          }
        });
        ccContext.store.setState(module, state);
      },
      _state: _state,
      _prevState: _prevState,
      //辅助effect逻辑用
      _stateVer: _stateVer,
      //触发时，比较state版本，防止死循环
      getState: function getState(module) {
        if (module) return _getState(module);else return _state;
      },
      getPrevState: function getPrevState(module) {
        if (module) return _getPrevState(module);else return _prevState;
      },
      getStateVer: getStateVer,
      setState: function setState(module, partialSharedState, options) {
        return setStateByModule(module, partialSharedState, options);
      },
      setGlobalState: function setGlobalState(partialGlobalState) {
        return setStateByModule(MODULE_GLOBAL, partialGlobalState);
      },
      getGlobalState: function getGlobalState() {
        return _state[MODULE_GLOBAL];
      }
    },
    reducer: {
      _reducer: (_reducer = {}, _reducer[MODULE_GLOBAL] = {}, _reducer[MODULE_CC] = {}, _reducer),
      _caller: {},
      // _reducerRefCaller: {},//为实例准备的reducer caller
      _fnName_fullFnNames_: {},
      _module_fnNames_: {}
    },
    computed: cuMap,
    watch: watch,
    refStore: {
      _state: {},
      setState: function setState(ccUniqueKey, partialStoredState) {
        var _state = ccContext.refStore._state;
        var fullStoredState = _state[ccUniqueKey];
        var mergedState = Object.assign({}, fullStoredState, partialStoredState);
        _state[ccUniqueKey] = mergedState;
      }
    },
    init: {
      _init: {}
    },
    ccUKey_ref_: refs,
    //  key:eventName,  value: Array<{ccKey, identity,  handlerKey}>
    event_handlers_: {},
    ccUKey_handlerKeys_: {},
    // to avoid memory leak, the handlerItem of event_handlers_ just store handlerKey, 
    // it is a ref that towards ccUniqueKeyEvent_handler_'s key
    // when component unmounted, its handler will been removed
    handlerKey_handler_: {},
    // { 'foo/f1': {ukey1: 1, ukey2:1 } }
    waKey_uKeyMap_: {},
    refs: refs,
    info: {
      packageLoadTime: Date.now(),
      firstStartupTime: '',
      latestStartupTime: '',
      version: '2.3.3',
      author: 'fantasticsoul',
      emails: ['624313307@qq.com', 'zhongzhengkai@gmail.com'],
      tag: 'yuna'
    },
    // fragment association
    fragmentNameCount: 0,
    featureStr_classKey_: {},
    userClassKey_featureStr_: {},
    errorHandler: null,
    middlewares: [],
    plugins: [],
    pluginNameMap: {}
  };
  var lsLen = localStorage.length;
  var _refStoreState = ccContext.refStore._state;

  for (var i = 0; i < lsLen; i++) {
    var lsKey = localStorage.key(i);

    if (lsKey.startsWith('CCSS_')) {
      try {
        _refStoreState[lsKey.substr(5)] = JSON.parse(localStorage.getItem(lsKey));
      } catch (err) {
        console.error(err);
      }
    }
  }

  /**
   * private variable, not bind in ccContext
   */
  var pendingModules = [];

  var isModuleNameCcLike$1 = isModuleNameCcLike,
      isModuleNameValid$1 = isModuleNameValid,
      vbi = verboseInfo,
      makeError$1 = makeError;
  /** 检查模块名，名字合法，就算检查通过 */

  function checkModuleNameBasically(moduleName) {
    if (!isModuleNameValid$1(moduleName)) {
      throw new Error("module[" + moduleName + "] writing is invalid!");
    }

    if (isModuleNameCcLike$1(moduleName)) {
      throw new Error("'$$cc' is a built-in module name for concent");
    }
  }
  /**
   * 检查模块名, moduleMustNotExisted 默认为true，表示【module名字合法】且【对应的moduleState不存在】，才算检查通过  
   * 如果设置为false，表示【module名字合法】且【对应的moduleState存在】，才算检查通过
   * @param {string} moduleName 
   * @param {boolean} moduleMustNotExisted  true 要求模块应该不存在 ,false 要求模块状态应该已存在
   */

  function checkModuleName(moduleName, moduleMustNotExisted, vbiMsg) {
    if (moduleMustNotExisted === void 0) {
      moduleMustNotExisted = true;
    }

    if (vbiMsg === void 0) {
      vbiMsg = '';
    }

    var _vbiMsg = vbiMsg || "module[" + moduleName + "]";

    var _state = ccContext.store._state;
    checkModuleNameBasically(moduleName);

    if (moduleName !== MODULE_GLOBAL) {
      if (moduleMustNotExisted) {
        if (isObjectNotNull(_state[moduleName])) {
          //但是却存在了
          throw makeError$1(ERR.CC_MODULE_NAME_DUPLICATE, vbi(_vbiMsg));
        }
      } else {
        if (!_state[moduleName]) {
          //实际上却不存在
          throw makeError$1(ERR.CC_MODULE_NOT_FOUND, vbi(_vbiMsg));
        }
      }
    }
  }
  function checkModuleNameAndState(moduleName, moduleState, moduleMustNotExisted) {
    checkModuleName(moduleName, moduleMustNotExisted);

    if (!isPJO(moduleState)) {
      throw new Error("module[" + moduleName + "]'s state " + NOT_A_JSON);
    }
  }
  function checkStoredKeys(moduleStateKeys, storedKeys) {
    var isSKeysArr = Array.isArray(storedKeys);

    if (!isSKeysArr && storedKeys !== '*') {
      throw new Error("storedKeys type err, " + STR_ARR_OR_STAR);
    }

    if (isSKeysArr) {
      storedKeys.forEach(function (sKey) {
        if (moduleStateKeys.includes(sKey)) {
          throw new Error("the item[" + sKey + "] of storedKeys is not a module state key!");
        }
      });
    }
  }

  var keyWord = '.checkModuleNameAndState';

  function getDupLocation(errStack) {
    if (!errStack) errStack = '';
    /** stack may like this: at CodeSandbox
    Error: module name duplicate! --verbose-info: module[SetupDemo]
      at makeError (https://xvcej.csb.app/node_modules/concent/src/support/util.js:128:15)
      at checkModuleName (https://xvcej.csb.app/node_modules/concent/src/core/checker/index.js:71:15)
    >>  at Object.checkModuleNameAndState (https://xvcej.csb.app/node_modules/concent/src/core/checker/index.js:90:3)
      at _default (https://xvcej.csb.app/node_modules/concent/src/core/state/init-module-state.js:25:13)
      at _default (https://xvcej.csb.app/node_modules/concent/src/api/configure.js:96:35)
    >>  at evaluate (https://xvcej.csb.app/src/pages/SetupDemo/model/index.js:13:24)
      at Jn (https://codesandbox.io/static/js/sandbox.fb6f2fde.js:1:146799)
      at e.value (https://codesandbox.io/static/js/sandbox.fb6f2fde.js:1:162063)
      at e.value (https://codesandbox.io/static/js/sandbox.fb6f2fde.js:1:202119)
      at t (https://codesandbox.io/static/js/sandbox.fb6f2fde.js:1:161805)
      ...
     or: at local web-dev-server
     Error: module name duplicate! --verbose-info: module[batchAddGroup]
      at makeError (http://localhost:3001/static/js/main.chunk.js:20593:17)
      at checkModuleName (http://localhost:3001/static/js/main.chunk.js:17256:15)
    >>  at Module.checkModuleNameAndState (http://localhost:3001/static/js/main.chunk.js:17273:3)
      at http://localhost:3001/static/js/main.chunk.js:19804:106
      at Object.configure (http://localhost:3001/static/js/main.chunk.js:13750:80)
    >>  at Module../src/components/layer/BatchOpGroup/model/index.js (http://localhost:3001/static/js/main.chunk.js:8374:55)
      at __webpack_require__ (http://localhost:3001/static/js/bundle.js:782:30)
      at fn (http://localhost:3001/static/js/bundle.js:150:20)
     */

    var arr = errStack.split('\n');
    var len = arr.length;
    var locationStr = '';

    for (var i = 0; i < len; i++) {
      var strPiece = arr[i];

      if (strPiece.includes(keyWord)) {
        var _ret = function () {
          var callConfigureIdx = i + 3; // 向下3句就是调用处
          // 这句话是具体调用configure的地方
          // at Module../src/components/layer/BatchOpGroup/model/index.js (http://localhost:3001/static/js/main.chunk.js:8374:55)

          var targetStrPiece = arr[callConfigureIdx];
          var arr2 = targetStrPiece.split(':');
          var lastIdx = arr2.length - 1;
          var locationStrArr = [];
          arr2.forEach(function (str, idx) {
            if (idx !== lastIdx) locationStrArr.push(str);
          }); // at Module../src/components/layer/BatchOpGroup/model/index.js (http://localhost:3001/static/js/main.chunk.js:8374

          locationStr = locationStrArr.join(':');
          return "break";
        }();

        break;
      }
    }

    return locationStr;
  }

  var module_dupLocation_ = {};
  var guessDuplicate = (function (err, module, tag) {
    if (err.code === ERR.CC_MODULE_NAME_DUPLICATE && ccContext.isHotReloadMode()) {
      var dupLocation = getDupLocation(err.stack);
      var key = tag + "|--link--|" + module;
      var prevLocation = module_dupLocation_[key];

      if (!prevLocation) {
        // 没有记录过
        module_dupLocation_[key] = dupLocation;
      } else if (dupLocation !== prevLocation) {
        throw err;
      }
    } else {
      throw err;
    }
  });

  var key_findResult_ = {};
  function createModuleNode(moduleName) {
    key_findResult_[moduleName] = {};
  }
  function getCacheKey(moduleName, sharedStateKeys, renderKey, renderKeyClasses) {
    if (renderKey === void 0) {
      renderKey = '';
    }

    if (renderKeyClasses === void 0) {
      renderKeyClasses = [];
    }

    var featureStr1 = sharedStateKeys.sort().join(',');
    var featureStr2 = renderKeyClasses === '*' ? '*' : renderKeyClasses.sort().join(',');
    return moduleName + "/" + featureStr1 + "/" + renderKey + "/" + featureStr2;
  }
  function getCache(moduleName, key) {
    return key_findResult_[moduleName][key];
  }
  function setCache(moduleName, key, result) {
    key_findResult_[moduleName][key] = result;
  }

  var waKey_uKeyMap_ = ccContext.waKey_uKeyMap_;
  function initModuleState (module, mState, moduleMustNotExisted) {
    if (moduleMustNotExisted === void 0) {
      moduleMustNotExisted = true;
    }

    createModuleNode(module); //force MODULE_VOID state as {}

    var state = module === MODULE_VOID ? {} : mState;

    try {
      checkModuleNameAndState(module, state, moduleMustNotExisted);
    } catch (err) {
      guessDuplicate(err, module, 'state');
    }

    var ccStore = ccContext.store;
    var rootState = ccStore.getState();
    var rootStateVer = ccStore.getStateVer();
    var prevRootState = ccStore.getPrevState();
    rootState[module] = state;
    prevRootState[module] = Object.assign({}, state);
    rootStateVer[module] = okeys(state).reduce(function (map, key) {
      waKey_uKeyMap_[module + "/" + key] = {};
      map[key] = 1;
      return map;
    }, {});
    var stateKeys = Object.keys(state);
    ccContext.moduleName_stateKeys_[module] = stateKeys;

    if (module === MODULE_GLOBAL) {
      var globalStateKeys = ccContext.globalStateKeys;
      stateKeys.forEach(function (key) {
        if (!globalStateKeys.includes(key)) globalStateKeys.push(key);
      });
    }
  }

  /****
   * 尽可能优先找module的实例，找不到的话在根据mustBelongToModule值来决定要不要找其他模块的实例
   * pick one ccInstance ref randomly
   */

  function pickOneRef (module, mustBelongToModule) {
    if (mustBelongToModule === void 0) {
      mustBelongToModule = false;
    }

    var ccUKey_ref_ = ccContext.ccUKey_ref_,
        moduleName_ccClassKeys_ = ccContext.moduleName_ccClassKeys_,
        ccClassKey_ccClassContext_ = ccContext.ccClassKey_ccClassContext_;
    var ccKeys = [];

    if (module) {
      if (ccContext.store._state[module]) {
        var ccClassKeys = moduleName_ccClassKeys_[module];

        if (ccClassKeys && ccClassKeys.length !== 0) {
          var oneCcClassKey = ccClassKeys[0];
          var ccClassContext = ccClassKey_ccClassContext_[oneCcClassKey];

          if (!ccClassContext) {
            throw new Error("no ccClassContext found for ccClassKey " + oneCcClassKey + "!");
          }

          ccKeys = ccClassContext.ccKeys;
        }
      } else {
        throw new Error("module[" + module + "] is not declared in store");
      }

      if (module === MODULE_DEFAULT) {
        ccKeys = ccKeys.filter(function (key) {
          return !key.startsWith(CC_FRAGMENT);
        });
      }

      if (ccKeys.length === 0) {
        if (mustBelongToModule === false) ccKeys = [CC_DISPATCHER];else {
          var ignoreIt = "if this message doesn't matter, you can ignore it";
          throw new Error("[[pickOneRef]]: no ref found for module[" + module + "]!," + ignoreIt);
        }
      }
    } else {
      ccKeys = [CC_DISPATCHER];
    }

    var oneRef = ccUKey_ref_[ccKeys[0]];

    if (!oneRef) {
      throw new Error('cc found no ref!');
    }

    return oneRef;
  }

  var makeUniqueCcKey$1 = makeUniqueCcKey,
      justWarning$1 = justWarning;

  var resolve = function resolve() {
    return Promise.resolve();
  };

  function ccDispatch (action, payLoadWhenActionIsString, rkOrOptions, delay, _temp) {
    if (rkOrOptions === void 0) {
      rkOrOptions = '';
    }

    var _ref = _temp === void 0 ? {} : _temp,
        ccClassKey = _ref.ccClassKey,
        ccKey = _ref.ccKey,
        throwError = _ref.throwError,
        _ref$refModule = _ref.refModule,
        refModule = _ref$refModule === void 0 ? '' : _ref$refModule;

    if (action === undefined && payLoadWhenActionIsString === undefined) {
      throw new Error("params type error");
    }

    var dispatchFn,
        module = '',
        fnName = '';

    try {
      if (ccClassKey && ccKey) {
        var uKey = makeUniqueCcKey$1(ccClassKey, ccKey);
        var targetRef = ccContext.refs[uKey];

        if (!targetRef) {
          justWarning$1("no ref found for ccUniqueKey:" + uKey + "!");
          return resolve();
        } else {
          dispatchFn = targetRef.ctx.dispatch;
        }
      } else {
        if (typeof action == 'string') {
          if (action.includes('/')) {
            var _action$split = action.split('/'),
                m = _action$split[0],
                name = _action$split[1];

            module = m;
            fnName = name;
          } else {
            fnName = action;
          }
        }

        var ref;

        if (module && module !== '*') {
          ref = pickOneRef(module);
        } else if (refModule) {
          ref = pickOneRef(refModule);
        } else {
          ref = pickOneRef();
        }

        if (!ref) {
          justWarning$1("no ref found");
          return resolve();
        }

        dispatchFn = ref.ctx.dispatch;
      }

      if (module === '*') {
        var fullFnNames = ccContext.reducer._fnName_fullFnNames_[fnName];
        if (!fullFnNames) return;
        var tasks = [];
        fullFnNames.forEach(function (fullFnName) {
          tasks.push(dispatchFn(fullFnName, payLoadWhenActionIsString, rkOrOptions, delay));
        });
        return Promise.all(tasks);
      } else {
        return dispatchFn(action, payLoadWhenActionIsString, rkOrOptions, delay);
      }
    } catch (err) {
      if (throwError) throw err;else {
        justWarning$1(err.message);
        return resolve();
      }
    }
  }

  function dispatch (action, payLoadWhenActionIsString, rkOrOptions, delay, extra) {
    return ccDispatch(action, payLoadWhenActionIsString, rkOrOptions, delay, extra);
  }

  function initModuleReducer (module, reducer) {
    if (reducer === void 0) {
      reducer = {};
    }

    var tip = "module[" + module + "] reducer";

    if (!isPJO(reducer)) {
      throw new Error(tip + " " + NOT_A_JSON);
    }

    checkModuleName(module, false, tip + " is invalid");
    var _ccContext$reducer = ccContext.reducer,
        _reducer = _ccContext$reducer._reducer,
        _caller = _ccContext$reducer._caller,
        _fnName_fullFnNames_ = _ccContext$reducer._fnName_fullFnNames_,
        _module_fnNames_ = _ccContext$reducer._module_fnNames_; // 防止同一个reducer被载入到不同模块时，setState附加逻辑不正确

    var newReducer = Object.assign({}, reducer);
    _reducer[module] = newReducer;
    var subReducerCaller = safeGetObject(_caller, module); // const subReducerRefCaller = util.safeGetObject(_reducerRefCaller, module);

    var fnNames = safeGetArray(_module_fnNames_, module); // 自动附加一个setState在reducer里

    if (!newReducer.setState) newReducer.setState = function (payload) {
      return payload;
    };
    var reducerFnNames = okeys(newReducer);
    reducerFnNames.forEach(function (name) {
      // avoid hot reload
      if (!fnNames.includes(name)) fnNames.push(name);
      var fullFnName = module + "/" + name;
      var list = safeGetArray(_fnName_fullFnNames_, name); // avoid hot reload

      if (!list.includes(fullFnName)) list.push(fullFnName);

      subReducerCaller[name] = function (payload, renderKeyOrOptions, delay) {
        return dispatch(fullFnName, payload, renderKeyOrOptions, delay);
      };

      var reducerFn = newReducer[name];

      if (typeof reducerFn !== 'function') {
        throw new Error("reducer key[" + name + "] 's value is not a function");
      } else {
        var targetFn = reducerFn;

        if (reducerFn.__fnName) {
          // 将某个已载入到模块a的reducer再次载入到模块b
          targetFn = function targetFn(payload, moduleState, actionCtx) {
            return reducerFn(payload, moduleState, actionCtx);
          };

          newReducer[name] = targetFn;
        }

        targetFn.__fnName = name; //!!! 很重要，将真正的名字附记录上，否则名字是编译后的缩写名

        targetFn.__stateModule = module; // AsyncFunction GeneratorFunction Function

        targetFn.__ctName = reducerFn.__ctName || reducerFn.constructor.name;
      } // 给函数绑上模块名，方便dispatch可以直接调用函数时，也能知道是更新哪个模块的数据，
      // 暂不考虑，因为cloneModule怎么处理，因为它们指向的是用一个函数
      // reducerFn.stateModule = module;

    });
  }

  var _currentIndex = 0;
  var letters = ['a', 'A', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J', 'k', 'K', 'l', 'L', 'm', 'M', 'n', 'N', 'o', 'O', 'p', 'P', 'q', 'Q', 'r', 'R', 's', 'S', 't', 'T', 'u', 'U', 'v', 'V', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z'];

  function genNonceStr(length) {
    if (length === void 0) {
      length = 6;
    }

    var ret = '';

    for (var i = 0; i < length; i++) {
      ret += letters[randomNumber()];
    }

    return ret;
  }

  function uuid (tag) {
    _currentIndex++;
    var nonceStr = tag || genNonceStr();
    return nonceStr + "_" + _currentIndex;
  }

  var moduleName_stateKeys_$1 = ccContext.moduleName_stateKeys_,
      runtimeVar$1 = ccContext.runtimeVar;
  /**
  computed('foo/firstName', ()=>{});
  //or
  computed('firstName', ()=>{}, ['foo/firstName']);

  computed('foo/firstName', {
    fn: ()=>{},
    compare: false,
    depKeys: ['firstName'],
  });

  computed({
    'foo/firstName':()=>{},
    'foo/fullName':{
      fn:()=>{},
      depKeys:['firstName', 'lastName']
    }
  });
  // or 
  computed({
    'foo/firstName':()=>{},
    'fullName':{
      fn:()=>{},
      depKeys:['foo/firstName', 'foo/lastName']
    }
  });

  computed(ctx=>{ return cuDesc}
  */
  // cate: module | ref

  function configureDepFns (cate, confMeta, item, handler, depKeys, compare, immediate) {
    var ctx = confMeta.refCtx;
    var type = confMeta.type;

    if (cate === CATE_REF) {
      if (!ctx.__$$isBSe) {
        justWarning(cate + " " + type + " must be been called in setup block");
        return;
      }
    }

    if (!item) return;
    var itype = typeof item;

    var _descObj;

    if (itype === 'string') {
      var _descObj2, _descObj3;

      // retKey
      if (isPJO(handler)) _descObj = (_descObj2 = {}, _descObj2[item] = handler, _descObj2);else _descObj = (_descObj3 = {}, _descObj3[item] = {
        fn: handler,
        depKeys: depKeys,
        compare: compare,
        immediate: immediate
      }, _descObj3);
    } else if (isPJO(item)) {
      _descObj = item;
    } else if (itype === 'function') {
      _descObj = item(ctx);
      if (!isPJO(_descObj)) throw new Error("type of " + type + " callback result must be an object");
    }

    if (!_descObj) {
      justWarning(cate + " " + type + " param type error");
      return;
    }

    _parseDescObj(cate, confMeta, _descObj);
  }

  function _parseDescObj(cate, confMeta, descObj) {
    var computedCompare = runtimeVar$1.computedCompare,
        watchCompare = runtimeVar$1.watchCompare,
        watchImmediate = runtimeVar$1.watchImmediate; //读全局的默认值

    var defaultCompare = confMeta.type === 'computed' ? computedCompare : watchCompare;
    var callerModule = confMeta.module;
    okeys(descObj).forEach(function (retKey) {
      var val = descObj[retKey];
      var vType = typeof val;
      var targetItem = val;

      if (vType === 'function') {
        targetItem = {
          fn: val
        };
      }

      if (isPJO(targetItem)) {
        // 默认自动收集
        var _targetItem = targetItem,
            fn = _targetItem.fn,
            _targetItem$depKeys = _targetItem.depKeys,
            depKeys = _targetItem$depKeys === void 0 ? '-' : _targetItem$depKeys,
            _targetItem$immediate = _targetItem.immediate,
            immediate = _targetItem$immediate === void 0 ? watchImmediate : _targetItem$immediate,
            _targetItem$compare = _targetItem.compare,
            compare = _targetItem$compare === void 0 ? defaultCompare : _targetItem$compare,
            lazy = _targetItem.lazy;
        var fnUid = uuid('mark');

        if (depKeys === '*' || depKeys === '-') {
          var _resolveStateKey2 = _resolveStateKey(confMeta, callerModule, retKey),
              stateKey = _resolveStateKey2.stateKey;

          _checkRetKeyDup(cate, confMeta, fnUid, stateKey); // when retKey is '/xxxx', here need pass xxxx to pass stateKey as retKey


          _mapDepDesc(cate, confMeta, callerModule, stateKey, fn, depKeys, immediate, compare, lazy);
        } else {
          // ['foo/b1', 'bar/b1'] or null or undefined
          if (depKeys && !Array.isArray(depKeys)) throw new Error('depKeys must an string array or *');

          if (!depKeys || depKeys.length === 0) {
            var _resolveStateKey3 = _resolveStateKey(confMeta, callerModule, retKey),
                isStateKey = _resolveStateKey3.isStateKey,
                _stateKey2 = _resolveStateKey3.stateKey,
                module = _resolveStateKey3.module; //consume retKey is stateKey


            var targetDepKeys = [];

            if (!depKeys && isStateKey) {
              targetDepKeys = [_stateKey2]; // regenerate depKeys
            }

            _checkRetKeyDup(cate, confMeta, fnUid, _stateKey2);

            _mapDepDesc(cate, confMeta, module, _stateKey2, fn, targetDepKeys, immediate, compare, lazy);
          } else {
            var stateKeyModule = '',
                targetRetKey = retKey;

            if (retKey.includes('/')) {
              var _retKey$split = retKey.split('/'),
                  m = _retKey$split[0],
                  r = _retKey$split[1];

              stateKeyModule = m;
              targetRetKey = r;
            }

            _checkRetKeyDup(cate, confMeta, fnUid, targetRetKey); // 给depKeys按module分类，此时它们都指向同一个retKey，同一个fn


            var module_depKeys_ = {};
            depKeys.forEach(function (depKey) {
              var _resolveStateKey4 = _resolveStateKey(confMeta, callerModule, depKey),
                  isStateKey = _resolveStateKey4.isStateKey,
                  stateKey = _resolveStateKey4.stateKey,
                  module = _resolveStateKey4.module; //consume depKey is stateKey
              // ok: retKey: 'xxxx' depKeys:['foo/f1', 'foo/f2', 'bar/b1', 'bar/b2'], some stateKey belong to foo, some belong to bar
              // ok: retKey: 'foo/xxxx' depKeys:['f1', 'f2'], all stateKey belong to foo
              // ok: retKey: 'foo/xxxx' depKeys:['foo/f1', 'foo/f2'], all stateKey belong to foo
              // both left and right include module but they are not equal, this situation is not ok!
              // not ok: retKey: 'foo/xxxx' depKeys:['foo/f1', 'foo/f2', 'bar/b1', 'bar/b2']


              if (stateKeyModule && module !== stateKeyModule) {
                throw new Error("including slash both in retKey[" + retKey + "] and depKey[" + depKey + "] founded, but their module is different");
              }

              var depKeys = safeGetArray(module_depKeys_, module);

              if (!isStateKey) {
                throw new Error("depKey[" + depKey + "] invalid, module[" + module + "] doesn't include its stateKey[" + stateKey + "]");
              }

              depKeys.push(stateKey);
            });
            okeys(module_depKeys_).forEach(function (m) {
              // 指向同一个fn，允许重复
              _mapDepDesc(cate, confMeta, m, targetRetKey, fn, module_depKeys_[m], immediate, compare, lazy);
            });
          }
        }
      } else {
        justWarning("retKey[" + retKey + "] item type error");
      }
    });
  }

  function _checkRetKeyDup(cate, confMeta, fnUid, retKey) {
    if (cate === CATE_REF) {
      var _confMeta$refCtx = confMeta.refCtx,
          ccUniqueKey = _confMeta$refCtx.ccUniqueKey,
          retKey_fnUid_ = _confMeta$refCtx.retKey_fnUid_;
      var type = confMeta.type;
      var typedRetKey = type + "_" + retKey;
      var mappedFn = retKey_fnUid_[typedRetKey];

      if (mappedFn) {
        throw new Error("ccUKey[" + ccUniqueKey + "], retKey[" + retKey + "] duplicate in ref " + type);
      } else {
        retKey_fnUid_[typedRetKey] = fnUid;
      }
    }
  } // 映射依赖描述对象


  function _mapDepDesc(cate, confMeta, module, retKey, fn, depKeys, immediate, compare, lazy) {
    var dep = confMeta.dep;
    var moduleDepDesc = safeGetObject(dep, module, makeCuDepDesc());
    var retKey_fn_ = moduleDepDesc.retKey_fn_,
        stateKey_retKeys_ = moduleDepDesc.stateKey_retKeys_,
        retKey_lazy_ = moduleDepDesc.retKey_lazy_;
    var fnDesc = {
      fn: fn,
      immediate: immediate,
      compare: compare,
      depKeys: depKeys
    }; // retKey作为将计算结果映射到refComputed | moduleComputed 里的key

    if (retKey_fn_[retKey]) {
      if (cate !== CATE_REF) {
        // 因为热加载，对于module computed 定义总是赋值最新的，
        retKey_fn_[retKey] = fnDesc;
        retKey_lazy_[retKey] = confMeta.isLazyComputed || lazy;
      } // do nothing

    } else {
      retKey_fn_[retKey] = fnDesc;
      retKey_lazy_[retKey] = confMeta.isLazyComputed || lazy;
      moduleDepDesc.fnCount++;
    }

    if (cate === CATE_REF) {
      confMeta.retKeyFns[retKey] = retKey_fn_[retKey];
    }

    var refCtx = confMeta.refCtx;

    if (refCtx) {
      if (confMeta.type === 'computed') refCtx.hasComputedFn = true;else refCtx.hasWatchFn = true;
    } //处于自动收集依赖状态，首次计算完之后再去写stateKey_retKeys_


    if (depKeys === '-') return;

    var _depKeys = depKeys === '*' ? ['*'] : depKeys;

    _depKeys.forEach(function (sKey) {
      //一个依赖key列表里的stateKey会对应着多个结果key
      var retKeys = safeGetArray(stateKey_retKeys_, sKey);
      if (!retKeys.includes(retKey)) retKeys.push(retKey);
    });
  }

  function _resolveStateKey(confMeta, module, stateKey) {
    var targetModule = module,
        targetStateKey = stateKey;

    if (stateKey.includes('/')) {
      var _stateKey$split = stateKey.split('/'),
          _module = _stateKey$split[0],
          _stateKey = _stateKey$split[1];

      if (_module) targetModule = _module; // '/name' 支持这种申明方式

      targetStateKey = _stateKey;
    }

    var stateKeys;

    if (targetModule === confMeta.module) {
      // 此时computed & watch观察的是对象的所有stateKeys
      stateKeys = confMeta.stateKeys;
    } else {
      // 对于属于bar的ref 配置key 'foo/a'时，会走入到此块
      stateKeys = moduleName_stateKeys_$1[targetModule];

      if (!stateKeys) {
        throw makeError(ERR.CC_MODULE_NOT_FOUND, verboseInfo("module[" + targetModule + "]"));
      }

      if (!confMeta.connect[targetModule]) {
        throw makeError(ERR.CC_MODULE_NOT_CONNECTED, verboseInfo("module[" + targetModule + "], stateKey[" + targetStateKey + "]"));
      }
    }

    return {
      isStateKey: stateKeys.includes(targetStateKey),
      stateKey: targetStateKey,
      module: targetModule
    };
  }

  function makeObCuContainer (computed, originalCuContainer) {
    var moduleComputedValue = {};
    okeys(computed).forEach(function (key) {
      //避免get无限递归，用这个对象来存其他信息
      originalCuContainer[key] = makeCuObValue();
      Object.defineProperty(moduleComputedValue, key, {
        get: function get() {
          var value = originalCuContainer[key] || {}; //防止用户传入未定义的key

          var needCompute = value.needCompute,
              fn = value.fn,
              newState = value.newState,
              oldState = value.oldState,
              fnCtx = value.fnCtx,
              isLazy = value.isLazy,
              result = value.result;

          if (!isLazy) {
            return result;
          }

          if (isLazy && needCompute) {
            var ret = fn(newState, oldState, fnCtx);
            value.result = ret;
            value.needCompute = false;
          }

          return value.result;
        },
        set: function set(input) {
          var value = originalCuContainer[key];

          if (!input[CU_KEY]) {
            justWarning("computed value can not been changed manually");
            return;
          }

          if (input.isLazy) {
            value.isLazy = true;
            value.needCompute = true;
            value.newState = input.newState;
            value.oldState = input.oldState;
            value.fn = input.fn;
            value.fnCtx = input.fnCtx;
          } else {
            value.isLazy = false;
            value.result = input.result;
          }
        }
      });
    });
    return moduleComputedValue;
  }

  var safeGetObject$1 = safeGetObject,
      isPJO$1 = isPJO;
  function initModuleComputed (module, computed) {
    if (!computed) return;
    var tip = "module[" + module + "] computed";

    if (!isPJO$1(computed)) {
      throw new Error(tip + " " + NOT_A_JSON);
    }

    checkModuleName(module, false, tip + " is invalid");
    var ccComputed = ccContext.computed;
    var rootState = ccContext.store.getState();
    var rootComputedValue = ccComputed.getRootComputedValue();
    var rootComputedDep = ccComputed.getRootComputedDep();
    var rootComputedRaw = ccComputed.getRootComputedRaw();
    rootComputedRaw[module] = computed;
    var moduleState = rootState[module];
    configureDepFns(CATE_MODULE, {
      module: module,
      stateKeys: okeys(moduleState),
      dep: rootComputedDep
    }, computed);
    var d = ccContext.getDispatcher();

    var curDepComputedFns = function curDepComputedFns(committedState, isBeforeMount) {
      return pickDepFns(isBeforeMount, CATE_MODULE, 'computed', rootComputedDep, module, moduleState, committedState);
    };

    var deltaCommittedState = Object.assign({}, moduleState);
    var cuOri = safeGetObject$1(ccComputed._computedValueOri, module);
    rootComputedValue[module] = makeObCuContainer(computed, cuOri);
    var moduleComputedValue = rootComputedValue[module];
    findDepFnsToExecute(d && d.ctx, module, d && d.ctx.module, moduleState, curDepComputedFns, moduleState, moduleState, deltaCommittedState, makeCallInfo(module), true, 'computed', CATE_MODULE, moduleComputedValue);
  }

  var isPJO$2 = isPJO,
      safeGetObject$2 = safeGetObject,
      okeys$2 = okeys;
  /**
   * 设置watch值，过滤掉一些无效的key
   */

  function initModuleWatch (module, moduleWatch, append) {
    if (append === void 0) {
      append = false;
    }

    if (!moduleWatch) return;
    var tip = "module[" + module + "] watch";

    if (!isPJO$2(moduleWatch)) {
      throw new Error(tip + " " + NOT_A_JSON);
    }

    checkModuleName(module, false, tip + " is invalid");
    var rootWatchDep = ccContext.watch.getRootWatchDep();
    var rootWatchRaw = ccContext.watch.getRootWatchRaw();
    var rootComputedValue = ccContext.computed.getRootComputedValue();

    if (append) {
      var ori = rootWatchRaw[module];
      if (ori) Object.assign(ori, moduleWatch);else rootWatchRaw[module] = moduleWatch;
    } else {
      rootWatchRaw[module] = moduleWatch;
    }

    var getState = ccContext.store.getState;
    var moduleState = getState(module);
    configureDepFns(CATE_MODULE, {
      module: module,
      stateKeys: okeys$2(moduleState),
      dep: rootWatchDep
    }, moduleWatch);
    var d = ccContext.getDispatcher();
    var deltaCommittedState = Object.assign({}, moduleState);

    var curDepWatchFns = function curDepWatchFns(committedState, isFirstCall) {
      return pickDepFns(isFirstCall, CATE_MODULE, 'watch', rootWatchDep, module, moduleState, committedState);
    };

    var moduleComputedValue = safeGetObject$2(rootComputedValue, module);
    findDepFnsToExecute(d && d.ctx, module, d && d.ctx.module, moduleState, curDepWatchFns, moduleState, moduleState, deltaCommittedState, makeCallInfo(module), true, 'watch', CATE_MODULE, moduleComputedValue);
  }

  var sigs = [SIG_FN_START, SIG_FN_END, SIG_FN_QUIT, SIG_FN_ERR, SIG_MODULE_CONFIGURED, SIG_STATE_CHANGED];
  var sig_cbs_ = {};
  sigs.forEach(function (sig) {
    return sig_cbs_[sig] = [];
  });
  function clearCbs() {
    sigs.forEach(function (sig) {
      return sig_cbs_[sig].length = 0;
    });
  }
  function send(sig, payload) {
    var cbs = sig_cbs_[sig];
    cbs.forEach(function (cb) {
      cb({
        sig: sig,
        payload: payload
      });
    });
  }
  function on(sigOrSigs, cb) {
    function pushCb(sig, cb) {
      var cbs = sig_cbs_[sig];

      if (!cbs) {
        console.warn("invalid sig[" + sig + "]");
        return;
      }

      cbs.push(cb);
    }

    if (Array.isArray(sigOrSigs)) {
      sigOrSigs.forEach(function (sig) {
        pushCb(sig, cb);
      });
    } else {
      pushCb(sigOrSigs, cb);
    }
  }

  var catchCcError = (function (err) {
    if (ccContext.errorHandler) ccContext.errorHandler(err);else throw err;
  });

  var id = 0;
  /** 针对lazy的reducer调用链状态记录缓存map */

  var chainId_moduleStateMap_ = {};
  var chainId_isExited_ = {};
  var chainId_isLazy_ = {};
  /** 所有的reducer调用链状态记录缓存map */

  var normalChainId_moduleStateMap_ = {};
  function getChainId() {
    id++;
    return id;
  }

  function __setChainState(chainId, targetModule, partialState, targetId_msMap) {
    if (partialState) {
      var moduleStateMap = targetId_msMap[chainId];
      if (!moduleStateMap) moduleStateMap = targetId_msMap[chainId] = {};
      var state = moduleStateMap[targetModule];

      if (!state) {
        moduleStateMap[targetModule] = partialState;
      } else {
        Object.assign(state, partialState);
      }
    }
  }

  function setChainState(chainId, targetModule, partialState) {
    __setChainState(chainId, targetModule, partialState, chainId_moduleStateMap_);
  }
  function setAllChainState(chainId, targetModule, partialState) {
    __setChainState(chainId, targetModule, partialState, normalChainId_moduleStateMap_);
  }
  function setAndGetChainStateList(chainId, targetModule, partialState) {
    setChainState(chainId, targetModule, partialState);
    return getChainStateList(chainId);
  }
  function getChainStateMap(chainId) {
    return chainId_moduleStateMap_[chainId];
  }
  function getAllChainStateMap(chainId) {
    return normalChainId_moduleStateMap_[chainId];
  } // export function getChainModuleState(chainId, module) {
  //   const moduleStateMap = getChainStateMap(chainId);
  //   return moduleStateMap[module];
  // }

  function getChainStateList(chainId) {
    var moduleStateMap = getChainStateMap(chainId);
    var list = [];
    okeys(moduleStateMap).forEach(function (m) {
      list.push({
        module: m,
        state: moduleStateMap[m]
      });
    });
    return list;
  }
  function removeChainState(chainId) {
    delete chainId_moduleStateMap_[chainId];
  }
  function removeAllChainState(chainId) {
    delete normalChainId_moduleStateMap_[chainId];
  }
  function isChainExited(chainId) {
    return chainId_isExited_[chainId] === true;
  }
  function setChainIdLazy(chainId) {
    chainId_isLazy_[chainId] = true;
  }
  function isChainIdLazy(chainId) {
    return chainId_isLazy_[chainId] === true;
  }

  var feature_timerId = {};
  var runLater = (function (cb, feature, delay) {
    if (delay === void 0) {
      delay = 1000;
    }

    var timerId = feature_timerId[feature];
    if (timerId) clearTimeout(timerId);
    feature_timerId[feature] = setTimeout(function () {
      delete feature_timerId[feature];
      cb();
    }, delay);
  });

  function watchKeyForRef (refCtx, stateModule, oldState, committedState, callInfo, isBeforeMount, autoMergeDeltaToCommitted) {
    if (autoMergeDeltaToCommitted === void 0) {
      autoMergeDeltaToCommitted = false;
    }

    if (!refCtx.hasWatchFn) return true;
    var deltaCommittedState = Object.assign({}, committedState);
    var watchDep = refCtx.watchDep,
        refModule = refCtx.module,
        ccUniqueKey = refCtx.ccUniqueKey,
        refComputed = refCtx.refComputed;
    var newState = Object.assign({}, oldState, committedState);

    var curDepComputedFns = function curDepComputedFns(committedState, isBeforeMount) {
      return pickDepFns(isBeforeMount, 'ref', 'watch', watchDep, stateModule, oldState, committedState, ccUniqueKey);
    }; // 触发有stateKey依赖列表相关的watch函数


    var _findDepFnsToExecute = findDepFnsToExecute(refCtx, stateModule, refModule, oldState, curDepComputedFns, committedState, newState, deltaCommittedState, callInfo, isBeforeMount, 'watch', CATE_REF, refComputed),
        shouldCurrentRefUpdate = _findDepFnsToExecute.shouldCurrentRefUpdate,
        hasDelta = _findDepFnsToExecute.hasDelta;

    if (autoMergeDeltaToCommitted && hasDelta) {
      Object.assign(committedState, deltaCommittedState);
    }

    return shouldCurrentRefUpdate;
  }

  // stateModule表示状态所属的模块

  function computeValueForRef (refCtx, stateModule, oldState, committedState, callInfo, isBeforeMount, autoMergeDeltaToCommitted) {
    if (isBeforeMount === void 0) {
      isBeforeMount = false;
    }

    if (autoMergeDeltaToCommitted === void 0) {
      autoMergeDeltaToCommitted = false;
    }

    var deltaCommittedState = Object.assign({}, committedState);
    if (!refCtx.hasComputedFn) return deltaCommittedState;
    var computedDep = refCtx.computedDep,
        refModule = refCtx.module,
        refComputed = refCtx.refComputed,
        ccUniqueKey = refCtx.ccUniqueKey; // const moduleState = ccContext.store.getState(stateModule);

    var newState = Object.assign({}, oldState, committedState);

    var curDepComputedFns = function curDepComputedFns(committedState, isBeforeMount) {
      return pickDepFns(isBeforeMount, CATE_REF, 'computed', computedDep, stateModule, oldState, committedState, ccUniqueKey);
    }; // 触发依赖stateKeys相关的computed函数


    findDepFnsToExecute(refCtx, stateModule, refModule, oldState, curDepComputedFns, committedState, newState, deltaCommittedState, callInfo, isBeforeMount, 'computed', CATE_REF, refComputed);

    if (autoMergeDeltaToCommitted) {
      Object.assign(committedState, deltaCommittedState);
    }

    return deltaCommittedState;
  }

  var okeys$3 = okeys;
  var ccUKey_ref_ = ccContext.ccUKey_ref_,
      waKey_uKeyMap_$1 = ccContext.waKey_uKeyMap_;
  function findUpdateRefs (moduleName, partialSharedState, renderKey, renderKeyClasses) {
    var sharedStateKeys = okeys$3(partialSharedState);
    var cacheKey = getCacheKey(moduleName, sharedStateKeys, renderKey, renderKeyClasses);
    var cachedResult = getCache(moduleName, cacheKey);

    if (cachedResult) {
      return {
        sharedStateKeys: sharedStateKeys,
        result: cachedResult
      };
    }

    var targetUKeyMap = {};
    sharedStateKeys.forEach(function (stateKey) {
      var waKey = moduleName + "/" + stateKey; //利用assign不停的去重

      Object.assign(targetUKeyMap, waKey_uKeyMap_$1[waKey]);
    });
    var uKeys = okeys$3(targetUKeyMap);
    var belongRefs = [];
    var connectRefs = [];

    var putRef = function putRef(isBelong, ref) {
      isBelong ? belongRefs.push(ref) : connectRefs.push(ref);
    };

    var tryMatch = function tryMatch(ref, toBelong) {
      var _ref$ctx = ref.ctx,
          refRenderKey = _ref$ctx.renderKey,
          refCcClassKey = _ref$ctx.ccClassKey; // 如果调用方携带renderKey发起修改状态动作，则需要匹配renderKey做更新

      if (renderKey) {
        var isRenderKeyMatched = refRenderKey === renderKey; // 所有的类实例都受renderKey匹配机制影响

        if (renderKeyClasses === '*') {
          if (isRenderKeyMatched) {
            putRef(toBelong, ref);
          }
        } else {
          // 这些指定类实例受renderKey机制影响
          if (renderKeyClasses.includes(refCcClassKey)) {
            if (isRenderKeyMatched) {
              putRef(toBelong, ref);
            }
          } // 这些实例则不受renderKey机制影响
          else {
              putRef(toBelong, ref);
            }
        }
      } else {
        putRef(toBelong, ref);
      }
    };

    uKeys.forEach(function (key) {
      var ref = ccUKey_ref_[key];
      if (!ref) return;
      var refCtx = ref.ctx;
      var refModule = refCtx.module,
          refConnect = refCtx.connect;
      var isBelong = refModule === moduleName;
      var isConnect = refConnect[moduleName] ? true : false;

      if (isBelong) {
        tryMatch(ref, true);
      } // 一个实例如果既属于模块x同时也连接了模块x，这是不推荐的，在buildCtx里面已给出警告
      // 会造成冗余的渲染


      if (isConnect) {
        tryMatch(ref, false);
      }
    });
    var result = {
      belong: belongRefs,
      connect: connectRefs
    };
    setCache(moduleName, cacheKey, result);
    return {
      sharedStateKeys: sharedStateKeys,
      result: result
    };
  }

  var isPJO$3 = isPJO,
      justWarning$2 = justWarning,
      isObjectNotNull$1 = isObjectNotNull,
      computeFeature$1 = computeFeature,
      okeys$4 = okeys;
  var FOR_ONE_INS_FIRSTLY$1 = FOR_ONE_INS_FIRSTLY,
      FOR_ALL_INS_OF_A_MOD$1 = FOR_ALL_INS_OF_A_MOD,
      FORCE_UPDATE$1 = FORCE_UPDATE,
      SET_STATE$1 = SET_STATE,
      SET_MODULE_STATE$1 = SET_MODULE_STATE,
      INVOKE$1 = INVOKE,
      SYNC$1 = SYNC,
      SIG_STATE_CHANGED$1 = SIG_STATE_CHANGED,
      RENDER_NO_OP$1 = RENDER_NO_OP,
      RENDER_BY_KEY$1 = RENDER_BY_KEY,
      RENDER_BY_STATE$1 = RENDER_BY_STATE;
  var _ccContext$store = ccContext.store,
      setState = _ccContext$store.setState,
      getPrevState = _ccContext$store.getPrevState,
      middlewares = ccContext.middlewares,
      ccClassKey_ccClassContext_ = ccContext.ccClassKey_ccClassContext_,
      refStore = ccContext.refStore,
      moduleName_stateKeys_$2 = ccContext.moduleName_stateKeys_; //触发修改状态的实例所属模块和目标模块不一致的时候，stateFor是FOR_ALL_INS_OF_A_MOD

  function getStateFor(targetModule, refModule) {
    return targetModule === refModule ? FOR_ONE_INS_FIRSTLY$1 : FOR_ALL_INS_OF_A_MOD$1;
  }

  function getActionType(calledBy, type) {
    if ([FORCE_UPDATE$1, SET_STATE$1, SET_MODULE_STATE$1, INVOKE$1, SYNC$1].includes(calledBy)) {
      return "ccApi/" + calledBy;
    } else {
      return "dispatch/" + type;
    }
  }

  function callMiddlewares(skipMiddleware, passToMiddleware, cb) {
    if (skipMiddleware !== true) {
      var len = middlewares.length;

      if (len > 0) {
        var index = 0;

        var next = function next() {
          if (index === len) {
            // all middlewares been executed
            cb();
          } else {
            var middlewareFn = middlewares[index];
            index++;
            if (typeof middlewareFn === 'function') middlewareFn(passToMiddleware, next);else {
              justWarning$2("found one middleware is not a function");
              next();
            }
          }
        };

        next();
      } else {
        cb();
      }
    } else {
      cb();
    }
  }
  /**
   * 
   * @param {*} state 
   * @param {*} option 
   * @param {*} targetRef 
   */


  function changeRefState (state, _temp, targetRef) {
    var _ref = _temp === void 0 ? {} : _temp,
        module = _ref.module,
        _ref$skipMiddleware = _ref.skipMiddleware,
        skipMiddleware = _ref$skipMiddleware === void 0 ? false : _ref$skipMiddleware,
        payload = _ref.payload,
        reactCallback = _ref.reactCallback,
        type = _ref.type,
        _ref$calledBy = _ref.calledBy,
        calledBy = _ref$calledBy === void 0 ? SET_STATE$1 : _ref$calledBy,
        _ref$fnName = _ref.fnName,
        fnName = _ref$fnName === void 0 ? '' : _ref$fnName,
        _ref$renderKey = _ref.renderKey,
        renderKey = _ref$renderKey === void 0 ? '' : _ref$renderKey,
        _ref$delay = _ref.delay,
        delay = _ref$delay === void 0 ? -1 : _ref$delay;

    if (state === undefined) return;

    if (!isPJO$3(state)) {
      justWarning$2("your committed state " + NOT_A_JSON);
      return;
    }

    var _targetRef$ctx = targetRef.ctx,
        refModule = _targetRef$ctx.module,
        ccUniqueKey = _targetRef$ctx.ccUniqueKey,
        ccKey = _targetRef$ctx.ccKey;
    var stateFor = getStateFor(module, refModule);
    var callInfo = {
      payload: payload,
      renderKey: renderKey,
      ccKey: ccKey,
      module: module,
      fnName: fnName
    }; //在triggerReactSetState之前把状态存储到store，
    //防止属于同一个模块的父组件套子组件渲染时，父组件修改了state，子组件初次挂载是不能第一时间拿到state

    var passedCtx = stateFor === FOR_ONE_INS_FIRSTLY$1 ? targetRef.ctx : null;
    var sharedState = syncCommittedStateToStore(module, state, {
      refCtx: passedCtx,
      callInfo: callInfo
    });
    Object.assign(state, sharedState);
    var passToMiddleware = {
      calledBy: calledBy,
      type: type,
      payload: payload,
      renderKey: renderKey,
      delay: delay,
      ccKey: ccKey,
      ccUniqueKey: ccUniqueKey,
      committedState: state,
      refModule: refModule,
      module: module,
      fnName: fnName,
      sharedState: sharedState
    }; // source ref will receive the whole committed state 

    triggerReactSetState(targetRef, callInfo, renderKey, calledBy, state, stateFor, reactCallback, function (renderType, committedState) {
      if (renderType === RENDER_NO_OP$1 && !sharedState) ; else {
        send(SIG_STATE_CHANGED$1, {
          committedState: committedState,
          sharedState: sharedState,
          module: module,
          type: getActionType(calledBy, type),
          ccUniqueKey: ccUniqueKey,
          renderKey: renderKey
        });
      }

      if (sharedState) triggerBroadcastState(callInfo, targetRef, sharedState, stateFor, module, renderKey, delay);
    }, skipMiddleware, passToMiddleware);
  }

  function triggerReactSetState(targetRef, callInfo, renderKey, calledBy, state, stateFor, reactCallback, next, skipMiddleware, passToMiddleware) {
    var refState = targetRef.state,
        refCtx = targetRef.ctx;

    if ( // 未挂载上不用判断，react自己会安排到更新队列里，等到挂载上时再去触发更新
    // targetRef.__$$isMounted === false || // 还未挂载上
    targetRef.__$$isUnmounted === true || // 已卸载
    stateFor !== FOR_ONE_INS_FIRSTLY$1 || //确保forceUpdate能够刷新cc实例，因为state可能是{}，此时用户调用forceUpdate也要触发render
    calledBy !== FORCE_UPDATE$1 && !isObjectNotNull$1(state)) {
      if (reactCallback) reactCallback(refState);
      return next && next(RENDER_NO_OP$1, state);
    }

    var stateModule = refCtx.module,
        storedKeys = refCtx.storedKeys,
        ccUniqueKey = refCtx.ccUniqueKey;
    var renderType = RENDER_BY_STATE$1;

    if (renderKey) {
      //if user specify renderKey
      renderType = RENDER_BY_KEY$1;

      if (refCtx.renderKey !== renderKey) {
        // current instance can been rendered only if current instance's ccKey equal renderKey
        return next && next(RENDER_NO_OP$1, state);
      }
    }

    if (storedKeys.length > 0) {
      var _extractStateByKeys = extractStateByKeys(state, storedKeys),
          partialState = _extractStateByKeys.partialState,
          isStateEmpty = _extractStateByKeys.isStateEmpty;

      if (!isStateEmpty) {
        if (refCtx.persistStoredKeys === true) {
          var _extractStateByKeys2 = extractStateByKeys(refState, storedKeys),
              entireStoredState = _extractStateByKeys2.partialState;

          var currentStoredState = Object.assign({}, entireStoredState, partialState);
          localStorage.setItem('CCSS_' + ccUniqueKey, JSON.stringify(currentStoredState));
        }

        refStore.setState(ccUniqueKey, partialState);
      }
    }

    var deltaCommittedState = computeValueForRef(refCtx, stateModule, refState, state, callInfo);
    var shouldCurrentRefUpdate = watchKeyForRef(refCtx, stateModule, refState, deltaCommittedState, callInfo, false, true);

    var ccSetState = function ccSetState() {
      // 记录stateKeys，方便triggerRefEffect之用
      refCtx.__$$settedList.push({
        module: stateModule,
        keys: okeys$4(deltaCommittedState)
      });

      refCtx.__$$ccSetState(deltaCommittedState, reactCallback, shouldCurrentRefUpdate);
    };

    if (next) {
      passToMiddleware.state = deltaCommittedState;
      callMiddlewares(skipMiddleware, passToMiddleware, function () {
        ccSetState();
        next(renderType, deltaCommittedState);
      });
    } else {
      ccSetState();
    }
  }

  function syncCommittedStateToStore(moduleName, committedState, options) {
    var stateKeys = moduleName_stateKeys_$2[moduleName]; // extract shared state

    var _extractStateByKeys3 = extractStateByKeys(committedState, stateKeys, true),
        partialState = _extractStateByKeys3.partialState; // save state to store


    if (partialState) {
      var mayChangedState = setState(moduleName, partialState, options);
      Object.assign(partialState, mayChangedState);
      return partialState;
    }

    return partialState;
  }

  function triggerBroadcastState(callInfo, targetRef, sharedState, stateFor, moduleName, renderKey, delay) {
    var startBroadcastState = function startBroadcastState() {
      broadcastState(callInfo, targetRef, sharedState, stateFor, moduleName, renderKey);
    };

    if (delay > 0) {
      var feature = computeFeature$1(targetRef.ctx.ccUniqueKey, sharedState);
      runLater(startBroadcastState, feature, delay);
    } else {
      startBroadcastState();
    }
  }

  function broadcastState(callInfo, targetRef, partialSharedState, stateFor, moduleName, renderKey) {
    if (!partialSharedState) {
      // null
      return;
    }

    var _targetRef$ctx2 = targetRef.ctx,
        currentCcUKey = _targetRef$ctx2.ccUniqueKey,
        ccClassKey = _targetRef$ctx2.ccClassKey;
    var renderKeyClasses = ccClassKey_ccClassContext_[ccClassKey].renderKeyClasses; // if stateFor === FOR_ONE_INS_FIRSTLY, it means currentCcInstance has triggered __$$ccSetState
    // so flag ignoreCurrentCcUkey as true;

    var ignoreCurrentCcUKey = stateFor === FOR_ONE_INS_FIRSTLY$1;

    var _findUpdateRefs = findUpdateRefs(moduleName, partialSharedState, renderKey, renderKeyClasses),
        sharedStateKeys = _findUpdateRefs.sharedStateKeys,
        _findUpdateRefs$resul = _findUpdateRefs.result,
        belongRefs = _findUpdateRefs$resul.belong,
        connectRefs = _findUpdateRefs$resul.connect;

    belongRefs.forEach(function (ref) {
      if (ignoreCurrentCcUKey && ref.ccUniqueKey === currentCcUKey) return; // 这里的calledBy直接用'broadcastState'，仅供concent内部运行时用，同时这ignoreCurrentCcUkey里也不会发送信号给插件

      triggerReactSetState(ref, callInfo, null, 'broadcastState', partialSharedState, FOR_ONE_INS_FIRSTLY$1);
    });
    var prevModuleState = getPrevState(moduleName);
    connectRefs.forEach(function (ref) {
      if (ref.__$$isUnmounted !== true) {
        var refCtx = ref.ctx;
        computeValueForRef(refCtx, moduleName, prevModuleState, partialSharedState, callInfo);
        var shouldCurrentRefUpdate = watchKeyForRef(refCtx, moduleName, prevModuleState, partialSharedState, callInfo); // 记录sharedStateKeys，方便triggerRefEffect之用

        refCtx.__$$settedList.push({
          module: moduleName,
          keys: sharedStateKeys
        });

        if (shouldCurrentRefUpdate) {
          refCtx.__$$reInjectConnObState(moduleName);

          refCtx.__$$ccForceUpdate();
        }
      }
    });
  }

  function setState$1 (module, state, renderKey, delay, skipMiddleware) {
    if (delay === void 0) {
      delay = -1;
    }

    try {
      var ref = pickOneRef(module);
      var option = {
        ccKey: '[[top api:setState]]',
        module: module,
        renderKey: renderKey,
        delay: delay,
        skipMiddleware: skipMiddleware
      };
      ref.ctx.changeState(state, option);
    } catch (err) {
      strictWarning(err);
    }
  }

  // import hoistNonReactStatic from 'hoist-non-react-statics';
  var verboseInfo$1 = verboseInfo,
      makeError$2 = makeError,
      justWarning$3 = justWarning,
      isPJO$4 = isPJO,
      okeys$5 = okeys;
  var _ccContext$store$1 = ccContext.store,
      getState = _ccContext$store$1.getState,
      storeSetState = _ccContext$store$1.setState,
      _reducer$1 = ccContext.reducer._reducer,
      _computedValue$2 = ccContext.computed._computedValue;
  var me = makeError$2;
  var vbi$1 = verboseInfo$1;

  function handleError(err, throwError) {
    if (throwError === void 0) {
      throwError = true;
    }

    if (throwError) throw err;else {
      handleCcFnError(err);
    }
  }

  function checkStoreModule(module, throwError) {
    if (throwError === void 0) {
      throwError = true;
    }

    try {
      checkModuleName(module, false, "module[" + module + "] is not configured in store");
      return true;
    } catch (err) {
      handleError(err, throwError);
      return false;
    }
  }

  function paramCallBackShouldNotSupply(module, currentModule) {
    return "param module[" + module + "] must equal current ref's module[" + currentModule + "] when pass param reactCallback, or it will never been triggered! ";
  }

  function _promiseErrorHandler(resolve, reject) {
    return function (err) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return err ? reject(err) : resolve.apply(void 0, args);
    };
  } //忽略掉传递进来的chainId，chainDepth，重新生成它们，源头调用了lazyDispatch或者ctx里调用了lazyDispatch，就会触发此逻辑


  function getNewChainData(isLazy, chainId, oriChainId, chainId_depth_) {
    var _chainId;

    if (isLazy === true) {
      _chainId = getChainId();
      setChainIdLazy(_chainId);
      chainId_depth_[_chainId] = 1; //置为1
    } else {
      _chainId = chainId || getChainId();
      if (!chainId_depth_[_chainId]) chainId_depth_[_chainId] = 1;
    } //源头函数会触发创建oriChainId， 之后就一直传递下去了


    var _oriChainId = oriChainId || _chainId;

    return {
      _chainId: _chainId,
      _oriChainId: _oriChainId
    };
  } // any error in this function will not been throw, cc just warning, 


  function isStateModuleValid(inputModule, currentModule, reactCallback, cb) {
    var targetCb = reactCallback;

    if (checkStoreModule(inputModule, false)) {
      if (inputModule !== currentModule && reactCallback) {
        // ???strict
        justWarning$3(paramCallBackShouldNotSupply(inputModule, currentModule));
        targetCb = null; //let user's reactCallback has no chance to be triggered
      }

      cb(null, targetCb);
    } else {
      cb(new Error("inputModule:" + inputModule + " invalid"), null);
    }
  }

  function handleCcFnError(err, __innerCb) {
    if (err) {
      if (__innerCb) __innerCb(err);else {
        justWarning$3(err);
        if (ccContext.errorHandler) ccContext.errorHandler(err);
      }
    }
  }

  function _promisifyCcFn(ccFn, userLogicFn, executionContext, payload) {
    return new Promise(function (resolve, reject) {
      var _executionContext = Object.assign(executionContext, {
        __innerCb: _promiseErrorHandler(resolve, reject)
      });

      ccFn(userLogicFn, _executionContext, payload);
    })["catch"](catchCcError);
  }

  function __promisifiedInvokeWith(userLogicFn, executionContext, payload) {
    return _promisifyCcFn(invokeWith, userLogicFn, executionContext, payload);
  }

  function __invoke(userLogicFn, option, payload) {
    var callerRef = option.callerRef,
        delay = option.delay,
        renderKey = option.renderKey,
        calledBy = option.calledBy,
        module = option.module,
        chainId = option.chainId,
        oriChainId = option.oriChainId,
        chainId_depth_ = option.chainId_depth_,
        isSilent = option.isSilent;
    return __promisifiedInvokeWith(userLogicFn, {
      callerRef: callerRef,
      context: true,
      module: module,
      calledBy: calledBy,
      fnName: userLogicFn.name,
      delay: delay,
      renderKey: renderKey,
      chainId: chainId,
      oriChainId: oriChainId,
      chainId_depth_: chainId_depth_,
      isSilent: isSilent
    }, payload);
  }

  function makeCcSetStateHandler(ref, containerRef) {
    return function (state, cb, shouldCurrentRefUpdate) {
      var refCtx = ref.ctx;
      /** start update state */
      // 和react保持immutable的思路一致，强迫用户养成习惯，总是从ctx取最新的state,
      // 注意这里赋值也是取refCtx.state取做合并，因为频繁进入此函数时，ref.state可能还不是最新的
      // refCtx.state = newFullState;

      if (containerRef) {
        var newFullState = Object.assign({}, refCtx.state, state);
        containerRef.state = newFullState;
      }
      /** start update ui */


      if (shouldCurrentRefUpdate) {
        refCtx.renderCount += 1;
        refCtx.reactSetState(state, cb);
      } else {
        Object.assign(ref.state, state);
        refCtx.state = ref.state;
      }
    };
  }
  function makeCcForceUpdateHandler(ref) {
    return function (cb) {
      var refCtx = ref.ctx;
      refCtx.renderCount += 1;
      refCtx.reactForceUpdate(cb);
    };
  } // last param: chainData

  function makeInvokeHandler(callerRef, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        chainId = _ref.chainId,
        oriChainId = _ref.oriChainId,
        isLazy = _ref.isLazy,
        _ref$delay = _ref.delay,
        delay = _ref$delay === void 0 ? -1 : _ref$delay,
        _ref$isSilent = _ref.isSilent,
        isSilent = _ref$isSilent === void 0 ? false : _ref$isSilent,
        _ref$chainId_depth_ = _ref.chainId_depth_,
        chainId_depth_ = _ref$chainId_depth_ === void 0 ? {} : _ref$chainId_depth_;

    return function (firstParam, payload, inputRKey, inputDelay) {
      var _isLazy = isLazy,
          _isSilent = isSilent;

      var _renderKey = '',
          _delay = inputDelay != undefined ? inputDelay : delay;

      if (isPJO$4(inputRKey)) {
        var lazy = inputRKey.lazy,
            silent = inputRKey.silent,
            renderKey = inputRKey.renderKey,
            _delay2 = inputRKey.delay;
        lazy !== undefined && (_isLazy = lazy);
        silent !== undefined && (_isSilent = silent);
        renderKey !== undefined && (_renderKey = renderKey);
        _delay2 !== undefined && (_delay = _delay2);
      } else {
        _renderKey = inputRKey;
      }

      var _getNewChainData = getNewChainData(_isLazy, chainId, oriChainId, chainId_depth_),
          _chainId = _getNewChainData._chainId,
          _oriChainId = _getNewChainData._oriChainId;

      var firstParamType = typeof firstParam;
      var option = {
        callerRef: callerRef,
        calledBy: INVOKE,
        module: callerRef.ctx.module,
        isSilent: _isSilent,
        chainId: _chainId,
        oriChainId: _oriChainId,
        chainId_depth_: chainId_depth_,
        delay: _delay,
        renderKey: _renderKey
      };
      var err = new Error("param type error, correct usage: invoke(userFn:function, ...args:any[]) or invoke(option:[module:string, fn:function], ...args:any[])");

      if (firstParamType === 'function') {
        // 可能用户直接使用invoke调用了reducer函数
        if (firstParam.__fnName) firstParam.name = firstParam.__fnName; // 这里不修改option.module，concent明确定义了dispatch和invoke规则

        /**
          invoke调用函数引用时
          无论组件有无注册模块，一定走调用方模块
           dispatch调用函数引用时
          优先走函数引用的模块（此时函数是一个reducer函数），没有(此函数不是reducer函数)则走调用方的模块并降级为invoke调用
         */
        // if (firstParam.__stateModule) option.module = firstParam.__stateModule;

        return __invoke(firstParam, option, payload);
      } else if (firstParamType === 'object') {
        var _fn, _module;

        if (Array.isArray(firstParam)) {
          var module = firstParam[0],
              fn = firstParam[1];
          _fn = fn;
          _module = module;
        } else {
          var _module2 = firstParam.module,
              _fn2 = firstParam.fn;
          _fn = _fn2;
          _module = _module2;
        }

        if (typeof _fn != 'function') throw err;
        if (_module) option.module = _module; //某个模块的实例修改了另外模块的数据

        return __invoke(_fn, option, payload);
      } else {
        throw err;
      }
    };
  }
  function invokeWith(userLogicFn, executionContext, payload) {
    var callerRef = executionContext.callerRef;
    var callerModule = callerRef.ctx.module;
    var _executionContext$mod = executionContext.module,
        targetModule = _executionContext$mod === void 0 ? callerModule : _executionContext$mod,
        _executionContext$con = executionContext.context,
        context = _executionContext$con === void 0 ? false : _executionContext$con,
        cb = executionContext.cb,
        __innerCb = executionContext.__innerCb,
        type = executionContext.type,
        calledBy = executionContext.calledBy,
        fnName = executionContext.fnName,
        _executionContext$del = executionContext.delay,
        delay = _executionContext$del === void 0 ? -1 : _executionContext$del,
        renderKey = executionContext.renderKey,
        chainId = executionContext.chainId,
        oriChainId = executionContext.oriChainId,
        chainId_depth_ = executionContext.chainId_depth_,
        isSilent = executionContext.isSilent;
    isStateModuleValid(targetModule, callerModule, cb, function (err, newCb) {
      if (err) return handleCcFnError(err, __innerCb);
      var moduleState = getState(targetModule);
      var actionContext = {};
      var isSourceCall = false;
      isSourceCall = chainId === oriChainId && chainId_depth_[chainId] === 1;

      if (context) {
        //调用前先加1
        chainId_depth_[chainId] = chainId_depth_[chainId] + 1; // !!!makeDispatchHandler的dispatch lazyDispatch将源头的isSilent 一致透传下去

        var _dispatch = makeDispatchHandler(callerRef, false, isSilent, targetModule, renderKey, delay, chainId, oriChainId, chainId_depth_);

        var silentDispatch = makeDispatchHandler(callerRef, false, true, targetModule, renderKey, delay, chainId, oriChainId, chainId_depth_);
        var lazyDispatch = makeDispatchHandler(callerRef, true, isSilent, targetModule, renderKey, delay, chainId, oriChainId, chainId_depth_); // const sourceClassContext = ccClassKey_ccClassContext_[callerRef.ctx.ccClassKey];
        //oriChainId, chainId_depth_ 一直携带下去，设置isLazy，会重新生成chainId

        var invoke = makeInvokeHandler(callerRef, {
          delay: delay,
          chainId: chainId,
          oriChainId: oriChainId,
          chainId_depth_: chainId_depth_
        });
        var lazyInvoke = makeInvokeHandler(callerRef, {
          isLazy: true,
          delay: delay,
          oriChainId: oriChainId,
          chainId_depth_: chainId_depth_
        });
        var silentInvoke = makeInvokeHandler(callerRef, {
          isLazy: false,
          delay: delay,
          isSilent: true,
          oriChainId: oriChainId,
          chainId_depth_: chainId_depth_
        }); // 首次调用时是undefined，这里做个保护

        var committedStateMap = getAllChainStateMap(chainId) || {};
        var committedState = committedStateMap[targetModule] || {};
        actionContext = {
          module: targetModule,
          callerModule: callerModule,
          committedStateMap: committedStateMap,
          //一次ref dispatch调用，所经过的所有reducer的返回结果收集
          committedState: committedState,
          invoke: invoke,
          lazyInvoke: lazyInvoke,
          silentInvoke: silentInvoke,
          invokeLazy: lazyInvoke,
          invokeSilent: silentInvoke,
          dispatch: _dispatch,
          lazyDispatch: lazyDispatch,
          silentDispatch: silentDispatch,
          dispatchLazy: lazyDispatch,
          dispatchSilent: silentDispatch,
          rootState: getState(),
          globalState: getState(MODULE_GLOBAL),
          //指的是目标模块的state
          moduleState: moduleState,
          //指的是目标模块的的moduleComputed
          moduleComputed: _computedValue$2[targetModule] || {},
          // //!!!指的是调用源cc类的connectedState
          // connectedState: sourceClassContext.connectedState,
          // //!!!指的是调用源cc类的connectedComputed
          // connectedComputed: sourceClassContext.connectedComputed,
          //利用dispatch调用自动生成的setState
          setState: function setState(state) {
            return _dispatch('setState', state, {
              silent: isSilent,
              renderKey: renderKey,
              delay: delay
            });
          },
          //透传上下文参数给IDispatchOptions,
          //!!!指的是调用源cc类实例的ctx
          refCtx: callerRef.ctx // concent不鼓励用户在reducer使用ref相关数据书写业务逻辑，除非用户确保是同一个模块的实例触发调用该函数，
          // 因为不同调用方传递不同的refCtx值，会引起用户不注意的bug

        };
      }

      if (isSilent === false) {
        send(SIG_FN_START, {
          isSourceCall: isSourceCall,
          calledBy: calledBy,
          module: targetModule,
          chainId: chainId,
          fn: userLogicFn
        });
      }

      var firstStepCall = new Promise(function (r) {
        return r(userLogicFn(payload, moduleState, actionContext));
      });
      firstStepCall.then(function (partialState) {
        chainId_depth_[chainId] = chainId_depth_[chainId] - 1; //调用结束减1

        var curDepth = chainId_depth_[chainId];
        var isFirstDepth = curDepth === 1; //调用结束就记录

        setAllChainState(chainId, targetModule, partialState);
        var commitStateList = [];

        if (isSilent === false) {
          send(SIG_FN_END, {
            isSourceCall: isSourceCall,
            calledBy: calledBy,
            module: targetModule,
            chainId: chainId,
            fn: userLogicFn
          }); // targetModule, sourceModule相等与否不用判断了，chainState里按模块为key去记录提交到不同模块的state

          if (isChainIdLazy(chainId)) {
            //来自于惰性派发的调用
            if (!isFirstDepth) {
              // 某条链还在往下调用中，没有回到第一层，暂存状态，直到回到第一层才提交
              setChainState(chainId, targetModule, partialState);
            } else {
              // 合并状态一次性提交到store并派发到组件实例
              if (isChainExited(chainId)) ; else {
                commitStateList = setAndGetChainStateList(chainId, targetModule, partialState);
                removeChainState(chainId);
              }
            }
          } else {
            commitStateList = [{
              module: targetModule,
              state: partialState
            }];
          }
        }

        commitStateList.forEach(function (v) {
          if (v.state) {
            changeRefState(v.state, {
              renderKey: renderKey,
              module: v.module,
              reactCallback: newCb,
              type: type,
              calledBy: calledBy,
              fnName: fnName,
              delay: delay,
              payload: payload
            }, callerRef);
          }
        });

        if (isSourceCall) {
          //源头dispatch or invoke结束调用
          removeChainState(chainId);
          removeAllChainState(chainId);
        }

        if (__innerCb) __innerCb(null, partialState);
      })["catch"](function (err) {
        send(SIG_FN_ERR, {
          isSourceCall: isSourceCall,
          calledBy: calledBy,
          module: targetModule,
          chainId: chainId,
          fn: userLogicFn
        });
        handleCcFnError(err, __innerCb);
      });
    });
  }
  function dispatch$1(_temp2) {
    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        callerRef = _ref2.callerRef,
        inputModule = _ref2.module,
        renderKey = _ref2.renderKey,
        isSilent = _ref2.isSilent,
        type = _ref2.type,
        payload = _ref2.payload,
        reactCallback = _ref2.cb,
        __innerCb = _ref2.__innerCb,
        _ref2$delay = _ref2.delay,
        delay = _ref2$delay === void 0 ? -1 : _ref2$delay,
        chainId = _ref2.chainId,
        oriChainId = _ref2.oriChainId,
        chainId_depth_ = _ref2.chainId_depth_;

    var targetReducerMap = _reducer$1[inputModule];

    if (!targetReducerMap) {
      return __innerCb(new Error("no reducerMap found for module:[" + inputModule + "]"));
    }

    var reducerFn = targetReducerMap[type];

    if (!reducerFn) {
      var fns = Object.keys(targetReducerMap);
      return __innerCb(new Error("no reducer fn found for [" + inputModule + "/" + type + "], is these fn you want:" + fns));
    }

    var executionContext = {
      callerRef: callerRef,
      module: inputModule,
      type: type,
      cb: reactCallback,
      context: true,
      __innerCb: __innerCb,
      calledBy: DISPATCH,
      delay: delay,
      renderKey: renderKey,
      isSilent: isSilent,
      chainId: chainId,
      oriChainId: oriChainId,
      chainId_depth_: chainId_depth_
    };
    invokeWith(reducerFn, executionContext, payload);
  }
  function makeDispatchHandler(callerRef, in_isLazy, in_isSilent, defaultModule, defaultRenderKey, delay, chainId, oriChainId, chainId_depth_ // sourceModule, oriChainId, oriChainDepth
  ) {
    if (defaultRenderKey === void 0) {
      defaultRenderKey = '';
    }

    if (delay === void 0) {
      delay = -1;
    }

    if (chainId_depth_ === void 0) {
      chainId_depth_ = {};
    }

    return function (paramObj, payload, userInputRKey, userInputDelay) {
      if (paramObj === void 0) {
        paramObj = {};
      }

      var isLazy = in_isLazy,
          isSilent = in_isSilent;
      var _renderKey = '';

      var _delay = userInputDelay || delay;

      if (isPJO$4(userInputRKey)) {
        _renderKey = defaultRenderKey;
        var lazy = userInputRKey.lazy,
            silent = userInputRKey.silent,
            renderKey = userInputRKey.renderKey,
            _delay3 = userInputRKey.delay;
        lazy !== undefined && (isLazy = lazy);
        silent !== undefined && (isSilent = silent);
        renderKey !== undefined && (_renderKey = renderKey);
        _delay3 !== undefined && (_delay = _delay3);
      } else {
        _renderKey = userInputRKey || defaultRenderKey;
      }

      var _getNewChainData2 = getNewChainData(isLazy, chainId, oriChainId, chainId_depth_),
          _chainId = _getNewChainData2._chainId,
          _oriChainId = _getNewChainData2._oriChainId;

      var paramObjType = typeof paramObj;

      var _type, _cb;

      var _module = defaultModule;

      var callInvoke = function callInvoke() {
        var iHandler = makeInvokeHandler(callerRef, {
          chainId: _chainId,
          oriChainId: _oriChainId,
          isLazy: isLazy,
          chainId_depth_: chainId_depth_
        });
        return iHandler(paramObj, payload, _renderKey, _delay);
      };

      if (paramObjType && paramObjType === 'object') {
        if (Array.isArray(paramObjType)) {
          return callInvoke();
        }

        var _paramObj = paramObj,
            module = _paramObj.module,
            type = _paramObj.type,
            cb = _paramObj.cb;
        if (module) _module = module;
        _type = type;
        _cb = cb;
      } else if (paramObjType === 'string' || paramObjType === 'function') {
        var targetFirstParam = paramObj;

        if (paramObjType === 'function') {
          var fnName = paramObj.__fnName;

          if (!fnName) {
            // 此函数是一个普通函数，没有配置到某个模块的reducer里，降级为invoke调用
            return callInvoke(); // throw new Error('you are calling a unnamed function!!!');
          }

          targetFirstParam = fnName; // 这里非常重要，只有处于第一层的调用时，才获取函数对象上的__stateModule参数
          // 防止克隆自模块a的模块b在reducer文件里基于函数引用直接调用时，取的是a的模块相关参数了，但是源头由b发起，应该是b才对

          if (chainId_depth_[_oriChainId] == 1) {
            // let dispatch can apply reducer function directly!!!
            // !!! 如果用户在b模块的组件里dispatch直接调用a模块的函数，但是确实想修改的是b模块的数据，只是想复用a模块的那个函数的逻辑
            // 那么千万要注意，写为{module:'b', fn:xxxFoo}的模式
            _module = paramObj.__stateModule;
          }
        }

        var slashCount = targetFirstParam.split('').filter(function (v) {
          return v === '/';
        }).length;

        if (slashCount === 0) {
          _type = targetFirstParam;
        } else if (slashCount === 1) {
          var _targetFirstParam$spl = targetFirstParam.split('/'),
              _module3 = _targetFirstParam$spl[0],
              _type2 = _targetFirstParam$spl[1];

          if (_module3) _module = _module3; //targetFirstParam may like: /foo/changeName

          _type = _type2;
        } else {
          return Promise.reject(me(ERR.CC_DISPATCH_STRING_INVALID, vbi$1(targetFirstParam)));
        }
      } else {
        return Promise.reject(me(ERR.CC_DISPATCH_PARAM_INVALID));
      }

      if (_module === '*') {
        return ccDispatch("*/" + _type, payload, {
          silent: isSilent,
          lazy: isLazy,
          renderKey: _renderKey
        }, _delay, {
          refModule: callerRef.ctx.module
        } // in name of refModule to call dispatch handler
        );
      }

      var p = new Promise(function (resolve, reject) {
        dispatch$1({
          callerRef: callerRef,
          module: _module,
          type: _type,
          payload: payload,
          cb: _cb,
          __innerCb: _promiseErrorHandler(resolve, reject),
          delay: _delay,
          renderKey: _renderKey,
          isSilent: isSilent,
          chainId: _chainId,
          oriChainId: _oriChainId,
          chainId_depth_: chainId_depth_ // oriChainId: _oriChainId, oriChainDepth: _oriChainDepth, sourceModule: _sourceModule,

        });
      })["catch"](catchCcError);
      return p;
    };
  } // for module/init method

  function makeSetStateHandler(module) {
    return function (state) {
      try {
        setState$1(module, state);
      } catch (err) {
        var moduleState = getState(module);

        if (!moduleState) {
          return justWarning$3("invalid module " + module);
        }

        var keys = okeys$5(moduleState);

        var _extractStateByKeys = extractStateByKeys(state, keys, false, true),
            partialState = _extractStateByKeys.partialState,
            isStateEmpty = _extractStateByKeys.isStateEmpty,
            ignoredStateKeys = _extractStateByKeys.ignoredStateKeys;

        if (!isStateEmpty) storeSetState(module, partialState); //store this valid state;

        if (ignoredStateKeys.length > 0) {
          justWarning$3("invalid keys:" + ignoredStateKeys.join(',') + ", their value is undefined or they are not declared in module" + module);
        }

        justTip("no ccInstance found for module[" + module + "] currently, cc will just store it, lately ccInstance will pick this state to render");
      }
    };
  }
  var makeRefSetState = function makeRefSetState(ref) {
    return function (partialState, cb) {
      var ctx = ref.ctx;
      var newState = Object.assign({}, ref.state, partialState);

      if (ctx.type === CC_HOOK) {
        ref.state = ctx.state = newState;

        ctx.__boundSetState(newState);

        if (cb) cb(newState); // 和class setState(partialState, cb); 保持一致
      } else {
        ctx.state = newState; // don't assign newState to ref.state before didMount
        // it will cause
        // Warning: Expected CC(SomeComp) state to match memoized state before processing the update queue

        if (!ref.__$$isMounted) {
          Object.assign(ref.state, partialState);
        } else {
          ref.state = newState;
        }

        ctx.__boundSetState(newState, cb);
      }
    };
  };
  var makeRefForceUpdate = function makeRefForceUpdate(ref) {
    return function (cb) {
      var ctx = ref.ctx;

      if (ctx.type === CC_HOOK) {
        var newState = Object.assign({}, ref.state);

        ctx.__boundSetState(newState);

        if (cb) cb(newState); // 和class setState(partialState, cb); 保持一致
      } else {
        ctx.__boundForceUpdate(cb);
      }
    };
  };
  /** avoid  Circular dependency, move this fn to util */
  // export function makeCommitHandler(module, refCtx) {}

  var isPJO$5 = isPJO,
      evalState$1 = evalState;
  /**
   * @description configure module、state、option to cc
   * @author zzk
   * @export
   * @param {string} module
   * @param {{state:object, reducer:object, watch:object, computed:object, init:object, isClassSingle:boolean}} config
   */

  function configure (module, config) {
    if (!ccContext.isStartup) {
      pendingModules.push({
        module: module,
        config: config
      });
      return; // throw new Error('configure must be called after run!');
    }

    if (!isPJO$5(config)) {
      throw new Error("param config " + NOT_A_JSON);
    }

    if (module === MODULE_GLOBAL) {
      throw new Error('configuring global module is not allowed');
    }

    var state = config.state,
        reducer = config.reducer,
        computed = config.computed,
        watch = config.watch,
        init = config.init,
        isClassSingle = config.isClassSingle;
    var eState = evalState$1(state);

    if (reducer && !isPJO$5(reducer)) {
      throw new Error("config.reducer " + NOT_A_JSON);
    }

    initModuleState(module, eState, true);
    initModuleReducer(module, reducer);
    computed && initModuleComputed(module, computed);
    watch && initModuleWatch(module, watch);
    ccContext.moduleSingleClass[module] = isClassSingle === true;

    if (init) {
      if (typeof init !== 'function') {
        throw new Error('init value must be a function!');
      }

      Promise.resolve().then(init).then(function (state) {
        makeSetStateHandler(module)(state);
      });
    }

    ccContext.moduleName_isConfigured_[module] = true;
    send(SIG_MODULE_CONFIGURED, module);
  }

  function tagReducerFn(reducerFns, moduleName) {
    var taggedReducer = {};
    okeys(reducerFns).forEach(function (fnName) {
      var oldFn = reducerFns[fnName];

      var fn = function fn() {
        return oldFn.apply(void 0, arguments);
      };

      fn.__fnName = fnName;
      fn.__stateModule = moduleName;
      taggedReducer[fnName] = fn;
    });
    return taggedReducer;
  }
  /**
   * @param {string} newModule
   * @param {string} existingModule
   */


  var _cloneModule = (function (newModule, existingModule, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        state = _ref.state,
        reducer = _ref.reducer,
        computed = _ref.computed,
        watch = _ref.watch,
        init = _ref.init;

    if (!ccContext.isStartup) {
      throw new Error('cc is not startup yet');
    }

    checkModuleNameBasically(newModule);
    checkModuleName(existingModule, false);
    var stateFn = ccContext.moduleName_stateFn_[existingModule];

    if (!stateFn) {
      throw new Error("target module[" + existingModule + "] state must be a function when use cloneModule");
    }

    var stateCopy = stateFn();
    Object.assign(stateCopy, evalState(state));
    var reducerOriginal = ccContext.reducer._reducer[existingModule] || {}; // attach  __fnName  __stateModule, 不能污染原函数的dispatch逻辑里需要的__stateModule

    var taggedReducerOriginal = tagReducerFn(reducerOriginal, newModule);
    if (reducer) Object.assign(taggedReducerOriginal, tagReducerFn(reducer, newModule));
    var computedEx = ccContext.computed._computedRaw[existingModule] || {};
    if (computed) Object.assign(computedEx, computed);
    var watchEx = ccContext.watch._watchRaw[existingModule] || {};
    if (watch) Object.assign(watchEx, watch);
    var initEx = ccContext.init._init[existingModule];
    if (init) initEx = init;
    var confObj = {
      state: stateCopy,
      reducer: taggedReducerOriginal,
      computed: computedEx,
      watch: watchEx
    };
    if (initEx) confObj.init = initEx;
    configure(newModule, confObj);
  });

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var okeys$6 = okeys,
      isPJO$6 = isPJO;
  var _state$1 = ccContext.store._state;
  /**
   * 根据connect,watchedKeys算出ccClassKey值和connectedModuleKeyMapping值
   */

  function getFeatureStrAndCmkMapping (connectSpec, watchedKeys, belongModule, compTypePrefix) {
    if (!isPJO$6(connectSpec)) {
      throw new Error("CcFragment or CcClass's prop connect type error, it " + NOT_A_JSON);
    }

    var invalidConnect = "CcFragment or CcClass's prop connect is invalid,";

    var invalidConnectItem = function invalidConnectItem(m) {
      return invalidConnect + " module[" + m + "]'s value must be * or array of string";
    };

    var moduleNames = okeys$6(connectSpec);
    moduleNames.sort();
    var featureStrs = [];
    var connectedModuleKeyMapping = {};
    moduleNames.forEach(function (m) {
      var moduleState = _state$1[m];
      var feature = compTypePrefix + "_" + m + "/";

      if (moduleState === undefined) {
        throw new Error(invalidConnect + " module[" + m + "] not found in cc store ");
      }

      var val = connectSpec[m];

      if (typeof val === 'string') {
        if (val !== '*' && val !== '-') throw new Error(invalidConnectItem(m));else {
          featureStrs.push(feature + "*");
          okeys$6(moduleState).forEach(function (sKey) {
            return connectedModuleKeyMapping[m + "/" + sKey] = sKey;
          });
        }
      } else if (!Array.isArray(val)) {
        throw new Error(invalidConnectItem(m));
      } else {
        val.forEach(function (sKey) {
          if (!moduleState.hasOwnProperty(sKey)) {
            throw new Error(invalidConnect + " module[" + m + "]'s key[" + sKey + "] not declared in cc store ");
          } else {
            feature += sKey + ",";
            connectedModuleKeyMapping[m + "/" + sKey] = sKey;
          }
        });
        featureStrs.push(feature);
      }
    });
    featureStrs.push('|'); // 之后是watchKeys相关的特征值参数

    if (watchedKeys === '*') featureStrs.push(compTypePrefix + "_$" + belongModule + "/*");else {
      watchedKeys.sort();
      var tmpStr = belongModule + "/" + watchedKeys.join(',');
      featureStrs.push(tmpStr);
    }
    return {
      featureStr: featureStrs.join('@'),
      connectedModuleKeyMapping: connectedModuleKeyMapping,
      connectedModuleNames: moduleNames
    };
  }

  var isObjectNull$1 = isObjectNull,
      me$1 = makeError;
  var featureStr_classKey_ = ccContext.featureStr_classKey_,
      userClassKey_featureStr_ = ccContext.userClassKey_featureStr_,
      ccClassKey_ccClassContext_$1 = ccContext.ccClassKey_ccClassContext_;
  var cursor = 0;
  function getCcClassKey (allowNamingDispatcher, module, connect, watchedKeys, prefix, featureStr, classKey) {
    if (classKey === void 0) {
      classKey = '';
    }

    // 未指定classKey
    if (!classKey) {
      // 未指定所属模块，也未连接到其他模块，且无watchedKeys
      if (module === MODULE_DEFAULT && isObjectNull$1(connect) && watchedKeys.length === 0) {
        return prefix + "0";
      }

      var prefixedFeatureStr = prefix + ":" + featureStr;
      var _classKey = featureStr_classKey_[prefixedFeatureStr];

      if (_classKey) {
        return _classKey;
      }

      cursor++;
      _classKey = "" + prefix + cursor;
      featureStr_classKey_[prefixedFeatureStr] = _classKey;
      return _classKey;
    } // verify user input classKey


    if (classKey.startsWith(CC_PREFIX)) {
      throw new Error("user can not specify a classKey[" + classKey + "] starts with $$Cc");
    }

    if (!allowNamingDispatcher) {
      if (classKey.toLowerCase() === CC_DISPATCHER.toLowerCase()) {
        throw new Error(CC_DISPATCHER + " is cc built-in ccClassKey name, if you want to customize your dispatcher, \n      you can set autoCreateDispatcher=false in StartupOption, and use createDispatcher then.");
      }
    }

    var ctx = ccClassKey_ccClassContext_$1[classKey];

    if (ctx) {
      var fStr = userClassKey_featureStr_[classKey];

      if (fStr !== featureStr) {
        //不允许，特征值不一样的class指定相同的ccClassKey
        throw me$1(ERR.CC_CLASS_KEY_DUPLICATE, "ccClassKey:[" + classKey + "] duplicate");
      }
    } else {
      userClassKey_featureStr_[classKey] = featureStr;
    }

    return classKey;
  }

  var moduleName_stateKeys_$3 = ccContext.moduleName_stateKeys_,
      moduleName_ccClassKeys_ = ccContext.moduleName_ccClassKeys_,
      moduleSingleClass = ccContext.moduleSingleClass,
      ccClassKey_ccClassContext_$2 = ccContext.ccClassKey_ccClassContext_,
      _computedValue$3 = ccContext.computed._computedValue;
  var verifyKeys$1 = verifyKeys,
      vbi$2 = verboseInfo;

  function checkCcStartupOrNot() {
    if (ccContext.isStartup !== true) {
      throw new Error('you must startup cc by call startup method before register ReactClass to cc!');
    }
  }

  function getWatchedStateKeys(module, ccClassKey, inputWatchedKeys) {
    if (!inputWatchedKeys) return [];

    if (inputWatchedKeys === '*') {
      return moduleName_stateKeys_$3[module];
    }

    var _verifyKeys = verifyKeys$1(inputWatchedKeys, []),
        notArray = _verifyKeys.notArray,
        keyElementNotString = _verifyKeys.keyElementNotString;

    if (notArray || keyElementNotString) {
      throw new Error("watchedKeys " + STR_ARR_OR_STAR + " " + vbi$2("ccClassKey:" + ccClassKey));
    }

    return inputWatchedKeys;
  }

  function mapModuleToCcClassKeys(moduleName, ccClassKey) {
    var ccClassKeys = safeGetArray(moduleName_ccClassKeys_, moduleName);

    if (moduleSingleClass[moduleName] === true && ccClassKeys.length >= 1) {
      throw new Error("module[" + moduleName + "] is declared as single, only on ccClassKey can been registered to it, and now a ccClassKey[" + ccClassKeys[0] + "] has been registered!");
    } // 做一个判断，防止热加载时，传入重复的ccClassKey


    if (!ccClassKeys.includes(ccClassKey)) ccClassKeys.push(ccClassKey);
  }

  function mapCcClassKeyToCcClassContext(ccClassKey, renderKeyClasses, moduleName, originalWatchedKeys, watchedKeys, connectedModuleKeyMapping, connectedModuleNames) {
    var ccClassContext = ccClassKey_ccClassContext_$2[ccClassKey]; //做一个判断，有可能是热加载调用

    if (!ccClassContext) {
      ccClassContext = makeCcClassContext(moduleName, ccClassKey, renderKeyClasses, watchedKeys, originalWatchedKeys);
      ccClassKey_ccClassContext_$2[ccClassKey] = ccClassContext;
    }

    var connectedModule = {};
    var connectedComputed = {};

    if (connectedModuleKeyMapping) {
      var _state = ccContext.store._state;
      var connectedState = ccClassContext.connectedState; //直接赋值引用

      connectedModuleNames.forEach(function (m) {
        connectedState[m] = _state[m];
        connectedComputed[m] = _computedValue$3[m];
        connectedModule[m] = 1; //记录连接的模块
      });
      ccClassContext.connectedModuleKeyMapping = connectedModuleKeyMapping;
      ccClassContext.connectedModule = connectedModule;
      ccClassContext.connectedComputed = connectedComputed;
    }
  }
  /**
   * map registration info to ccContext
   */


  function mapRegistrationInfo (module, ccClassKey, renderKeyClasses, classKeyPrefix, inputWatchedKeys, inputStoredKeys, connect, __checkStartUp, __calledBy) {
    if (module === void 0) {
      module = MODULE_DEFAULT;
    }

    if (inputStoredKeys === void 0) {
      inputStoredKeys = [];
    }

    if (__checkStartUp === true) checkCcStartupOrNot();
    var allowNamingDispatcher = __calledBy === 'cc';
    checkModuleName(module, false, "module[" + module + "] is not configured in store");
    checkStoredKeys(moduleName_stateKeys_$3[module], inputStoredKeys);
    var _connect = connect;

    if (Array.isArray(connect)) {
      _connect = {};
      connect.forEach(function (m) {
        return _connect[m] = '-';
      }); //标识自动收集观察依赖
    } // 不指定global模块的话，默认自动收集global观察依赖，方便用户直接使用ctx.globalState时，就触发自动收集
    else if (!connect[MODULE_GLOBAL]) {
        connect[MODULE_GLOBAL] = '-';
      }

    var _watchedKeys = getWatchedStateKeys(module, ccClassKey, inputWatchedKeys);

    var _getFeatureStrAndCmkM = getFeatureStrAndCmkMapping(_connect, _watchedKeys),
        featureStr = _getFeatureStrAndCmkM.featureStr,
        connectedModuleKeyMapping = _getFeatureStrAndCmkM.connectedModuleKeyMapping,
        connectedModuleNames = _getFeatureStrAndCmkM.connectedModuleNames;

    var _ccClassKey = getCcClassKey(allowNamingDispatcher, module, _connect, _watchedKeys, classKeyPrefix, featureStr, ccClassKey);

    var _renderKeyClasses;

    if (!renderKeyClasses) {
      _renderKeyClasses = [_ccClassKey];
    } else {
      if (!Array.isArray(renderKeyClasses) && renderKeyClasses !== '*') {
        throw new Error("renderKeyClasses type err, it is must be an array or string *");
      }

      _renderKeyClasses = renderKeyClasses;
    }

    mapCcClassKeyToCcClassContext(_ccClassKey, _renderKeyClasses, module, inputWatchedKeys, _watchedKeys, connectedModuleKeyMapping, connectedModuleNames);
    mapModuleToCcClassKeys(module, _ccClassKey);
    return {
      _module: module,
      _connect: _connect,
      _watchedKeys: _watchedKeys,
      _ccClassKey: _ccClassKey
    };
  }

  var event_handlers_ = ccContext.event_handlers_,
      handlerKey_handler_ = ccContext.handlerKey_handler_,
      ccUKey_handlerKeys_ = ccContext.ccUKey_handlerKeys_,
      ccUKey_ref_$1 = ccContext.ccUKey_ref_;
  var makeHandlerKey$1 = makeHandlerKey,
      safeGetArray$1 = safeGetArray,
      justWarning$4 = justWarning;

  function _findEventHandlers(event, module, ccClassKey, ccUniqueKey, identity) {
    if (identity === void 0) {
      identity = null;
    }

    var handlers = event_handlers_[event];

    if (handlers) {
      var filteredHandlers = handlers;
      if (ccUniqueKey) filteredHandlers = handlers.filter(function (v) {
        return v.ccUniqueKey === ccUniqueKey;
      });else if (ccClassKey) filteredHandlers = handlers.filter(function (v) {
        return v.ccClassKey === ccClassKey;
      });else if (module) filteredHandlers = handlers.filter(function (v) {
        return v.module === module;
      }); // identity is null means user call emit like emit('eventName')
      // identity is not null means user call emit like emit(['eventName', 'idtName'])

      if (identity !== undefined) {
        filteredHandlers = filteredHandlers.filter(function (v) {
          return v.identity === identity;
        });
      }

      return filteredHandlers;
    }

    return [];
  }

  function _deleteEventHandlers(handlers) {
    var toDeleteCcUniqueKeyMap = {};
    var toDeleteEventNames = [];
    handlers.forEach(function (item) {
      var handlerKey = item.handlerKey,
          ccUniqueKey = item.ccUniqueKey,
          event = item.event;
      delete handlerKey_handler_[handlerKey]; //delete mapping of handlerKey_handler_;
      toDeleteCcUniqueKeyMap[ccUniqueKey] = 1;
      if (!toDeleteEventNames.includes(event)) toDeleteEventNames.push(event);
    });
    toDeleteEventNames.forEach(function (event) {
      var eHandlers = event_handlers_[event];

      if (eHandlers) {
        eHandlers.forEach(function (h, idx) {
          var ccUniqueKey = h.ccUniqueKey;

          if (toDeleteCcUniqueKeyMap[ccUniqueKey] === 1) {
            eHandlers[idx] = null;
            delete ccUKey_handlerKeys_[ccUniqueKey]; //delete mapping of ccUKey_handlerKeys_;
          }
        });
        event_handlers_[event] = eHandlers.filter(function (v) {
          return v !== null;
        }); //delete eHandlers null element
      }
    });
  }

  function bindEventHandlerToCcContext(module, ccClassKey, ccUniqueKey, event, identity, handler) {
    var handlers = safeGetArray$1(event_handlers_, event);

    if (typeof handler !== 'function') {
      return justWarning$4("event " + event + "'s handler is not a function!");
    }

    var handlerKey = makeHandlerKey$1(ccUniqueKey, event, identity);
    var handlerKeys = safeGetArray$1(ccUKey_handlerKeys_, ccUniqueKey);
    var targetHandlerIndex = handlers.findIndex(function (v) {
      return v.handlerKey === handlerKey;
    }); // user call ctx.on for a same event in a same instance more than once

    var handlerItem = {
      event: event,
      module: module,
      ccClassKey: ccClassKey,
      ccUniqueKey: ccUniqueKey,
      identity: identity,
      handlerKey: handlerKey,
      fn: handler
    };

    if (targetHandlerIndex > -1) {
      // will alway use the latest handler
      handlers[targetHandlerIndex] = handlerItem;
    } else {
      handlers.push(handlerItem);
      handlerKeys.push(handlerKey);
    }

    handlerKey_handler_[handlerKey] = handlerItem;
  }
  function findEventHandlersToPerform(event) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var _event,
        _identity = null,
        _module,
        _ccClassKey,
        _ccUniqueKey;

    var canPerform = null;

    if (typeof event === 'string') {
      _event = event;
    } else {
      _event = event.name;
      _identity = event.identity;
      _module = event.module;
      _ccClassKey = event.ccClassKey;
      _ccUniqueKey = event.ccUniqueKey;
      canPerform = event.canPerform;
    }

    var handlers = _findEventHandlers(_event, _module, _ccClassKey, _ccUniqueKey, _identity);

    handlers.forEach(function (_ref) {
      var ccUniqueKey = _ref.ccUniqueKey,
          handlerKey = _ref.handlerKey;
      var ref = ccUKey_ref_$1[ccUniqueKey];

      if (ref && handlerKey) {
        //  confirm the instance is mounted and handler is not been offed
        if (ref.__$$isUnmounted) return;
        var handler = handlerKey_handler_[handlerKey];

        if (handler) {
          if (canPerform && !canPerform(ref)) {
            return;
          }

          var fn = handler.fn;
          if (ref.__$$isMounted) fn.apply(void 0, args);else ref.ctx.__$$onEvents.push({
            fn: fn,
            args: args
          });
        }
      }
    });
  }
  function findEventHandlersToOff(event, _ref2) {
    var module = _ref2.module,
        ccClassKey = _ref2.ccClassKey,
        ccUniqueKey = _ref2.ccUniqueKey,
        identity = _ref2.identity;

    var handlers = _findEventHandlers(event, module, ccClassKey, ccUniqueKey, identity);

    _deleteEventHandlers(handlers);
  }
  function offEventHandlersByCcUniqueKey(ccUniqueKey) {
    var handlerKeys = ccUKey_handlerKeys_[ccUniqueKey];

    if (handlerKeys) {
      var toDeleteHandlers = [];
      handlerKeys.forEach(function (k) {
        return toDeleteHandlers.push(handlerKey_handler_[k]);
      });

      _deleteEventHandlers(toDeleteHandlers);
    }
  }
  function getEventItem(event) {
    if (event && typeof event === 'object') {
      var _event;

      if (Array.isArray(event)) {
        var name = event[0],
            identity = event[1];
        _event = {
          name: name,
          identity: identity
        };
      } else {
        _event = Object.assign({}, event);
      } //否则就允许用户传如自己定义的module, ccClassKey


      return _event;
    } else {
      return {
        name: event
      };
    }
  }

  var ev = /*#__PURE__*/Object.freeze({
    bindEventHandlerToCcContext: bindEventHandlerToCcContext,
    findEventHandlersToPerform: findEventHandlersToPerform,
    findEventHandlersToOff: findEventHandlersToOff,
    offEventHandlersByCcUniqueKey: offEventHandlersByCcUniqueKey,
    getEventItem: getEventItem
  });

  var waKey_uKeyMap_$2 = ccContext.waKey_uKeyMap_,
      moduleName_stateKeys_$4 = ccContext.moduleName_stateKeys_; // before render
  // cur: {} compare: {a:2, b:2, c:2} compareCount=3 nextCompare:{}
  //
  // rendering input
  // cur: {a:'val', c:'val', d:'val'}
  //
  // after render
  // cur: {a:1, c:1, c:1} compare: {a:1, b:2, c:1, d:1} nextCompare:{a:2, c:2, d:2}
  //
  // then concent will know b should delete dep because=0, 
  // compare key count=4>3 or compare include 2, so should let cache expire
  //
  // before next render
  // cur: {} compare: {a:2, c:2, d:2} compareCount=3 nextCompare:{}

  function makeObState (ref, state, module) {
    return new Proxy(state, {
      get: function get(target, key) {
        var refCtx = ref.ctx;

        if (refCtx.__$$renderStatus === START) {
          var ccUniqueKey = refCtx.ccUniqueKey;

          if (module) {
            var waKey = module + "/" + key;
            var __$$curConnWaKeys = refCtx.__$$curConnWaKeys,
                __$$compareConnWaKeys = refCtx.__$$compareConnWaKeys,
                __$$nextCompareConnWaKeys = refCtx.__$$nextCompareConnWaKeys,
                __$$nextCompareConnWaKeyCount = refCtx.__$$nextCompareConnWaKeyCount;
            waKey_uKeyMap_$2[waKey][ccUniqueKey] = 1;
            __$$curConnWaKeys[module][key] = 1;
            __$$compareConnWaKeys[module][key] = 1;
            var tmpMap = __$$nextCompareConnWaKeys[module];

            if (!tmpMap[key]) {
              tmpMap[key] = 2;
              __$$nextCompareConnWaKeyCount[module]++;
            }
          } else {
            var refModule = refCtx.module; // 此处不能用privStateKeys来判断，用户有可能动态的写入新的key
            // if(!refCtx.privStateKeys.includes(key)){
            // 这个key是模块的key

            if (moduleName_stateKeys_$4[refModule].includes(key)) {
              var _waKey = refModule + "/" + key;

              var __$$curWaKeys = refCtx.__$$curWaKeys,
                  __$$compareWaKeys = refCtx.__$$compareWaKeys,
                  __$$nextCompareWaKeys = refCtx.__$$nextCompareWaKeys;
              waKey_uKeyMap_$2[_waKey][ccUniqueKey] = 1;
              __$$curWaKeys[key] = 1;
              __$$compareWaKeys[key] = 1;

              if (!__$$nextCompareWaKeys[key]) {
                __$$nextCompareWaKeys[key] = 2;
                refCtx.__$$nextCompareWaKeyCount++;
              }
            }
          }
        }

        return target[key];
      },
      set: function set(target, key) {
        // 这个warning暂时关闭，因为buildRefCtx阶段就生成了obState, refComputed里可能会调用commit向obState写入新的state
        // justWarning(`warning: state key[${key}] can not been changed manually, use api setState or dispatch instead`);
        target[key] = target[key]; // avoid Uncaught TypeError: 'set' on proxy: trap returned falsish for property '***'

        return true;
      }
    });
  }

  function getDefineWatchHandler (refCtx) {
    return function (watchItem, watchHandler, depKeys, compare, immediate) {
      var confMeta = {
        type: 'watch',
        refCtx: refCtx,
        stateKeys: refCtx.stateKeys,
        retKeyFns: refCtx.watchRetKeyFns,
        module: refCtx.module,
        connect: refCtx.connect,
        dep: refCtx.watchDep
      };
      configureDepFns(CATE_REF, confMeta, watchItem, watchHandler, depKeys, compare, immediate);
    };
  }

  function getDefineComputedHandler (refCtx, isLazyComputed) {
    if (isLazyComputed === void 0) {
      isLazyComputed = false;
    }

    return function (computedItem, computedHandler, depKeys, compare) {
      var confMeta = {
        type: 'computed',
        isLazyComputed: isLazyComputed,
        refCtx: refCtx,
        stateKeys: refCtx.stateKeys,
        retKeyFns: refCtx.computedRetKeyFns,
        module: refCtx.module,
        connect: refCtx.connect,
        dep: refCtx.computedDep
      };
      configureDepFns(CATE_REF, confMeta, computedItem, computedHandler, depKeys, compare);
    };
  }

  var justWarning$5 = justWarning,
      makeUniqueCcKey$2 = makeUniqueCcKey;
  function computeCcUniqueKey (isClassSingle, ccClassKey, ccKey, tag) {
    var ccUniqueKey;

    if (isClassSingle) {
      //??? need strict
      if (ccKey) justWarning$5("now the ccClass is singleton, you needn't supply ccKey to instance props, cc will ignore the ccKey[" + ccKey + "]");
      ccUniqueKey = ccClassKey;
    } else {
      if (ccKey) {
        ccUniqueKey = makeUniqueCcKey$2(ccClassKey, ccKey);
      } else {
        var uuidStr = uuid(tag);
        ccUniqueKey = makeUniqueCcKey$2(ccClassKey, uuidStr);
      }
    }

    return ccUniqueKey;
  }

  function getOutProps (props) {
    if (props) {
      return props.props || props; //把最外层的props传递给用户
    } else {
      return {};
    }
  }

  function getStoredKeys (refPrivState, moduleStateKeys, ccOptionStoredKeys, registerStoredKeys) {
    var targetStoredKeys = ccOptionStoredKeys || registerStoredKeys;

    if (!targetStoredKeys) {
      return [];
    }

    if (targetStoredKeys === '*') {
      // refPrivState里可能含有moduleStateKey，需要进一步过滤
      return Object.keys(refPrivState).filter(function (k) {
        return !moduleStateKeys.includes(k);
      });
    } else {
      checkStoredKeys(moduleStateKeys, targetStoredKeys);
      return targetStoredKeys;
    }
  }

  var getState$1 = ccContext.store.getState;

  function getValFromEvent(e) {
    var se = convertToStandardEvent(e);

    if (se) {
      return se.currentTarget.value;
    } else {
      return e;
    }
  }

  var buildMockEvent = (function (spec, e, refCtx) {
    var refModule = refCtx.module,
        refState = refCtx.state;
    var ccint = false,
        ccsync = '',
        ccrkey = '',
        value = '',
        extraState = null,
        ccdelay = -1,
        isToggleBool = false;
    var syncKey = spec[CCSYNC_KEY];
    var type = spec.type;
    var noAutoExtract = false;

    if (syncKey !== undefined) {
      //来自sync生成的setter函数调用 即 sync('xxxKey')
      ccsync = syncKey;
      ccdelay = spec.delay;
      ccrkey = spec.rkey; // type 'bool', 'val', 'int', 'as'

      ccint = type === 'int'; //convert to int

      isToggleBool = type === 'bool';
      var keyPath, fullKeyPath, module;

      if (ccsync.includes('/')) {
        var _ccsync$split = ccsync.split('/'),
            _module = _ccsync$split[0],
            _keyPath = _ccsync$split[1];

        keyPath = _keyPath;
        fullKeyPath = ccsync;
        module = _module;
      } else {
        keyPath = ccsync;
        fullKeyPath = refModule + "/" + keyPath;
        module = refModule;
      }

      var mState = getState$1(module); // 布尔值需要对原来的值取反

      var fullState = module !== refModule ? mState : refState;
      value = type === 'bool' ? !getValueByKeyPath(fullState, keyPath) : getValFromEvent(e); //优先从spec里取，取不到的话，从e里面分析并提取

      var val = spec.val;

      if (val === undefined) ; else {
        if (typeof val === 'function') {
          // moduleState指的是所修改的目标模块的state
          var syncRet = val(value, keyPath, {
            module: module,
            moduleState: mState,
            fullKeyPath: fullKeyPath,
            state: refState,
            refCtx: refCtx
          });

          if (syncRet != undefined) {
            if (type === 'as') value = syncRet; // value is what cb returns;
            else {
                var retType = typeof syncRet;

                if (retType === 'boolean') {
                  // if return true, let noAutoExtract = false, so this cb will not block state update, and cc will extract partial state automatically
                  // if return false, let noAutoExtract = true, but now extraState is still null, so this cb will block state update
                  noAutoExtract = !syncRet;
                } else if (retType === 'object') {
                  noAutoExtract = true;
                  extraState = syncRet;
                } else {
                  justWarning("syncKey[" + syncKey + "] cb result type error.");
                }
              }
          } else {
            if (type === 'as') noAutoExtract = true; // if syncAs return undefined, will block update
            // else continue update and value is just extracted above
          }
        } else {
          value = val;
        }
      }
    } else {
      //来自于sync直接调用 <input data-ccsync="foo/f1" onChange={this.sync} /> 
      var se = convertToStandardEvent(e);

      if (se) {
        // e is event
        var currentTarget = se.currentTarget;
        value = currentTarget.value;
        var dataset = currentTarget.dataset;
        if (type === 'int') ccint = true;else ccint = dataset.ccint !== undefined;
        ccsync = dataset.ccsync;
        if (!ccsync) return null;
        ccrkey = dataset.ccrkey;
        var dataSetDelay = dataset.ccdelay;

        if (dataSetDelay) {
          try {
            ccdelay = parseInt(dataSetDelay);
          } catch (err) {}
        }
      } else {
        //<Input onChange={this.sync}/> is invalid
        return null;
      }
    }

    return {
      currentTarget: {
        value: value,
        extraState: extraState,
        noAutoExtract: noAutoExtract,
        dataset: {
          ccsync: ccsync,
          ccint: ccint,
          ccdelay: ccdelay,
          ccrkey: ccrkey
        }
      },
      isToggleBool: isToggleBool
    };
  });

  function setValue(obj, keys, lastKeyIndex, keyIndex, value, isToggleBool) {
    if (isToggleBool === void 0) {
      isToggleBool = false;
    }

    var key = keys[keyIndex];

    if (lastKeyIndex === keyIndex) {
      if (isToggleBool === true) {
        var oriVal = obj[key];

        if (typeof oriVal !== 'boolean') {
          justWarning("key[" + key + "]'s value type is not boolean");
        } else {
          obj[key] = !oriVal;
        }
      } else {
        obj[key] = value;
      }
    } else {
      setValue(obj[key], keys, lastKeyIndex, ++keyIndex, value, isToggleBool);
    }
  }

  var extractStateByCcsync = (function (ccsync, value, ccint, oriState, isToggleBool) {
    var _value = value;

    if (ccint === true) {
      _value = parseInt(value); //strict?

      if (Number.isNaN(_value)) {
        justWarning(value + " can not convert to int but you set ccint as true!\uFF01");
        _value = value;
      }
    }

    var module = null,
        keys = [];

    if (ccsync.includes('/')) {
      var _ccsync$split = ccsync.split('/'),
          _module = _ccsync$split[0],
          restStr = _ccsync$split[1];

      module = _module;

      if (restStr.includes('.')) {
        keys = restStr.split('.');
      } else {
        keys = [restStr];
      }
    } else if (ccsync.includes('.')) {
      keys = ccsync.split('.');
    } else {
      keys = [ccsync];
    }

    if (keys.length === 1) {
      var targetStateKey = keys[0];

      if (isToggleBool === true) {
        var _state;

        return {
          module: module,
          state: (_state = {}, _state[targetStateKey] = !oriState[targetStateKey], _state)
        };
      } else {
        var _state2;

        return {
          module: module,
          state: (_state2 = {}, _state2[targetStateKey] = _value, _state2)
        };
      }
    } else {
      var _state3;

      var _keys = keys,
          key = _keys[0],
          restKeys = _keys.slice(1);

      var subState = oriState[key];
      setValue(subState, restKeys, restKeys.length - 1, 0, _value, isToggleBool);
      return {
        module: module,
        state: (_state3 = {}, _state3[key] = subState, _state3)
      };
    }
  });

  var getState$2 = ccContext.store.getState;
  function __sync (spec, ref, e) {
    var refCtx = ref.ctx;
    var refModule = refCtx.module;
    var mockE = buildMockEvent(spec, e, refCtx);
    if (!mockE) return; //参数无效 例如 <input onChange={this.sync}/> 导致

    var currentTarget = mockE.currentTarget;
    var dataset = currentTarget.dataset,
        value = currentTarget.value,
        extraState = currentTarget.extraState,
        noAutoExtract = currentTarget.noAutoExtract;
    if (e && e.stopPropagation) e.stopPropagation();
    var ccsync = dataset.ccsync,
        ccint = dataset.ccint,
        ccdelay = dataset.ccdelay,
        ccrkey = dataset.ccrkey;

    if (ccsync.startsWith('/')) {
      dataset.ccsync = "" + refModule + ccsync; //附加上默认模块值
    }

    if (ccsync.includes('/')) {
      // syncModuleState 同步模块的state状态
      var targetModule = ccsync.split('/')[0];
      checkModuleName(targetModule, false);
      var ccKey = refCtx.ccKey,
          ccUniqueKey = refCtx.ccUniqueKey;

      if (noAutoExtract) {
        if (extraState) changeRefState(extraState, {
          calledBy: SYNC,
          ccKey: ccKey,
          ccUniqueKey: ccUniqueKey,
          module: targetModule,
          renderKey: ccrkey,
          delay: ccdelay
        }, ref);
        return;
      }

      var fullState = targetModule !== refModule ? getState$2(targetModule) : ref.state;

      var _extractStateByCcsync = extractStateByCcsync(ccsync, value, ccint, fullState, mockE.isToggleBool),
          state = _extractStateByCcsync.state;

      changeRefState(state, {
        calledBy: SYNC,
        ccKey: ccKey,
        ccUniqueKey: ccUniqueKey,
        module: targetModule,
        renderKey: ccrkey,
        delay: ccdelay
      }, ref);
    } else {
      //调用自己的setState句柄触发更新，key可能属于local的，也可能属于module的
      if (noAutoExtract) {
        if (extraState) ref.setState(extraState, null, ccrkey, ccdelay);
        return;
      }

      var _extractStateByCcsync2 = extractStateByCcsync(ccsync, value, ccint, ref.state, mockE.isToggleBool),
          _state = _extractStateByCcsync2.state;

      ref.setState(_state, null, ccrkey, ccdelay);
    }
  }

  var _ccContext$reducer = ccContext.reducer,
      _module_fnNames_ = _ccContext$reducer._module_fnNames_,
      _caller = _ccContext$reducer._caller,
      refStore$1 = ccContext.refStore,
      ccClassKey_ccClassContext_$3 = ccContext.ccClassKey_ccClassContext_,
      moduleName_stateKeys_$5 = ccContext.moduleName_stateKeys_,
      getState$3 = ccContext.store.getState,
      moduleName_ccClassKeys_$1 = ccContext.moduleName_ccClassKeys_,
      _computedValue$4 = ccContext.computed._computedValue,
      waKey_uKeyMap_$3 = ccContext.waKey_uKeyMap_;
  var okeys$7 = okeys,
      me$3 = makeError,
      vbi$3 = verboseInfo,
      safeGetArray$2 = safeGetArray,
      safeGetObject$3 = safeGetObject,
      justWarning$6 = justWarning,
      isObjectNull$2 = isObjectNull;
  var idSeq = 0;

  function getEId() {
    idSeq++;
    return Symbol("__autoGen_" + idSeq + "__");
  }

  var noop = function noop() {};

  var eType = function eType(th) {
    return "type of defineEffect " + th + " param must be";
  };

  var getWatchedKeys = function getWatchedKeys(ctx) {
    if (ctx.watchedKeys === '-') {
      if (ctx.__$$renderStatus === START) return okeys$7(ctx.__$$compareWaKeys);else return okeys$7(ctx.__$$curWaKeys);
    } else return ctx.watchedKeys;
  };

  var getConnectWatchedKeys = function getConnectWatchedKeys(ctx, module) {
    var connect = ctx.connect,
        connectedModules = ctx.connectedModules;
    var isConnectArr = Array.isArray(connect);

    var getModuleWaKeys = function getModuleWaKeys(m) {
      if (ctx.__$$renderStatus === START) return okeys$7(ctx.__$$compareConnWaKeys[m]);else return okeys$7(ctx.__$$curConnWaKeys[m]);
    };

    var getWKeys = function getWKeys(module) {
      if (isConnectArr) {
        // auto observe connect modules
        return getModuleWaKeys(module);
      } else {
        var waKeys = connect[module];
        if (waKeys === '*') return moduleName_stateKeys_$5[module];else if (waKeys === '-') return getModuleWaKeys(module);else return waKeys;
      }
    };

    if (module) return getWKeys(module);else {
      var cKeys = {};
      connectedModules.forEach(function (m) {
        return cKeys[m] = getWKeys(m);
      });
      return cKeys;
    }
  };

  function recordDep(ccUniqueKey, module, watchedKeys) {
    var waKeys = watchedKeys === '*' ? moduleName_stateKeys_$5[module] : watchedKeys;
    waKeys.forEach(function (waKey) {
      var map = waKey_uKeyMap_$3[module + "/" + waKey];

      if (map) {
        map[ccUniqueKey] = 1;
      } else {
        justWarning$6("invalid watchedKey[" + waKey + "] of module[" + module + "]");
      }
    });
  } //调用buildFragmentRefCtx 之前，props参数已被处理过

  /**
   * 构建refCtx，附加到ref上
   * liteLevel 越小，绑定的方法越少
   */


  function buildRefCtx (ref, params, liteLevel) {
    var _ctx;

    if (liteLevel === void 0) {
      liteLevel = 5;
    }

    // 能省赋默认值的就省，比如state，外层调用都保证赋值过了
    var isSingle = params.isSingle,
        ccClassKey = params.ccClassKey,
        _params$ccKey = params.ccKey,
        ccKey = _params$ccKey === void 0 ? '' : _params$ccKey,
        module = params.module,
        type = params.type,
        state = params.state,
        _params$storedKeys = params.storedKeys,
        storedKeys = _params$storedKeys === void 0 ? [] : _params$storedKeys,
        _params$persistStored = params.persistStoredKeys,
        persistStoredKeys = _params$persistStored === void 0 ? false : _params$persistStored,
        watchedKeys = params.watchedKeys,
        _params$connect = params.connect,
        connect = _params$connect === void 0 ? {} : _params$connect,
        _params$tag = params.tag,
        tag = _params$tag === void 0 ? '' : _params$tag,
        _params$ccOption = params.ccOption,
        ccOption = _params$ccOption === void 0 ? {} : _params$ccOption;
    var stateModule = module;
    var existedCtx = ref.ctx;
    var __boundSetState = ref.setState,
        __boundForceUpdate = ref.forceUpdate; // 如果已存在ctx，则直接指向原来的__bound，否则会造成无限递归调用栈溢出
    // 做个保护判断，防止 ctx = {}

    if (!isObjectNull$2(existedCtx) && existedCtx.ccUniqueKey) {
      __boundSetState = existedCtx.__boundSetState;
      __boundForceUpdate = existedCtx.__boundForceUpdate;
    } else if (type !== CC_HOOK) {
      __boundSetState = ref.setState.bind(ref);
      __boundForceUpdate = ref.forceUpdate.bind(ref);
    }

    var refOption = {};
    refOption.persistStoredKeys = ccOption.persistStoredKeys === undefined ? persistStoredKeys : ccOption.persistStoredKeys;
    refOption.tag = ccOption.tag || tag; // pick ref defined tag first, register tag second

    var ccUniqueKey = computeCcUniqueKey(isSingle, ccClassKey, ccKey, refOption.tag);
    refOption.renderKey = ccOption.renderKey || ccUniqueKey; // 没有设定renderKey的话，默认ccUniqueKey就是renderKey

    refOption.storedKeys = getStoredKeys(state, moduleName_stateKeys_$5[stateModule], ccOption.storedKeys, storedKeys); //用户使用ccKey属性的话，必需显示的指定ccClassKey

    if (ccKey && !ccClassKey) {
      throw new Error("missing ccClassKey while init a cc ins with ccKey[" + ccKey + "]");
    }

    if (refOption.storedKeys.length > 0) {
      if (!ccKey) throw me$3(ERR.CC_STORED_KEYS_NEED_CCKEY, vbi$3("ccClassKey[" + ccClassKey + "]"));
    }

    var classCtx = ccClassKey_ccClassContext_$3[ccClassKey];
    var classConnectedState = classCtx.connectedState;
    var connectedModules = okeys$7(connect);
    var connectedComputed = classCtx.connectedComputed || {};
    var connectedState = {};
    var cstate = {};
    var moduleState = getState$3(module);
    var moduleComputed = _computedValue$4[module] || {};
    var globalComputed = _computedValue$4[MODULE_GLOBAL] || {};
    var globalState = getState$3(MODULE_GLOBAL); // extract privStateKeys

    var privStateKeys = removeArrElements(okeys$7(state), moduleName_stateKeys_$5[stateModule]); // recover ref state

    var refStoredState = refStore$1._state[ccUniqueKey] || {};
    var mergedState = Object.assign({}, state, refStoredState, moduleState);
    ref.state = mergedState;
    var stateKeys = okeys$7(mergedState); // record ccClassKey

    var ccClassKeys = safeGetArray$2(moduleName_ccClassKeys_$1, module);
    if (!ccClassKeys.includes(ccClassKey)) ccClassKeys.push(ccClassKey); // declare cc state series api

    var changeState = function changeState(state, option) {
      changeRefState(state, option, ref);
    };

    var _setState = function _setState(module, state, calledBy, reactCallback, renderKey, delay) {
      changeState(state, {
        calledBy: calledBy,
        module: module,
        renderKey: renderKey,
        delay: delay,
        reactCallback: reactCallback
      });
    };

    var setModuleState = function setModuleState(module, state, reactCallback, renderKey, delay) {
      _setState(module, state, SET_MODULE_STATE, reactCallback, renderKey, delay);
    }; // const setState = (state, reactCallback, renderKey, delay) => {


    var setState = function setState(p1, p2, p3, p4, p5) {
      if (typeof p1 === 'string') {
        //p1 module, p2 state, p3 cb, p4 rkey, p5 delay
        setModuleState(p1, p2, p3, p4, p5);
      } else {
        //p1 state, p2 cb, p3 rkey, p4 delay
        _setState(stateModule, p1, SET_STATE, p2, p3, p4);
      }
    };

    var forceUpdate = function forceUpdate(reactCallback, renderKey, delay) {
      _setState(stateModule, ref.state, FORCE_UPDATE, reactCallback, renderKey, delay);
    };

    var __$$onEvents = [];
    var effectItems = [],
        effectPropsItems = []; // {fn:function, status:0, eId:'', immediate:true}

    var eid_effectReturnCb_ = {},
        eid_effectPropsReturnCb_ = {}; // fn

    var effectMeta = {
      effectItems: effectItems,
      eid_effectReturnCb_: eid_effectReturnCb_,
      effectPropsItems: effectPropsItems,
      eid_effectPropsReturnCb_: eid_effectPropsReturnCb_
    };
    var refs = {}; // depDesc = {stateKey_retKeys_: {}, retKey_fn_:{}}
    // computedDep or watchDep  : { [module:string] : { stateKey_retKeys_: {}, retKey_fn_: {}, immediateRetKeys: [] } }

    var computedDep = {},
        watchDep = {};
    var props = getOutProps(ref.props);
    var ctx = (_ctx = {
      // static params
      type: type,
      isSingle: isSingle,
      module: module,
      ccClassKey: ccClassKey,
      ccKey: ccKey,
      ccUniqueKey: ccUniqueKey,
      renderCount: 1,
      initTime: Date.now(),
      watchedKeys: watchedKeys,
      privStateKeys: privStateKeys,
      connect: connect,
      connectedModules: connectedModules,
      // dynamic meta, I don't want user know these props, so put them in ctx instead of ref
      __$$onEvents: __$$onEvents,
      // 当组件还未挂载时，event中心会将事件存到__$$onEvents里，当组件挂载时检查的事件列表并执行，然后清空
      __$$hasModuleState: moduleName_stateKeys_$5[module].length > 0,
      __$$renderStatus: END,
      __$$curWaKeys: {},
      __$$compareWaKeys: {},
      __$$compareWaKeyCount: 0,
      //write before render
      __$$nextCompareWaKeys: {},
      __$$nextCompareWaKeyCount: 0,
      __$$curConnWaKeys: {},
      __$$compareConnWaKeys: {},
      __$$compareConnWaKeyCount: {},
      __$$nextCompareConnWaKeys: {},
      __$$nextCompareConnWaKeyCount: {},
      persistStoredKeys: refOption.persistStoredKeys,
      storedKeys: refOption.storedKeys,
      renderKey: refOption.renderKey,
      tag: refOption.tag,
      prevProps: props,
      props: props,
      mapped: {},
      prevState: mergedState,
      // state
      state: mergedState,
      moduleState: moduleState,
      mstate: moduleState,
      // always be latest in auto watch mode
      globalState: globalState,
      gstate: globalState,
      // always be latest in auto watch mode
      connectedState: connectedState,
      cstate: cstate,
      // always be latest in auto watch mode
      extra: {},
      // can pass value to extra in every render period
      staticExtra: {},
      // only can be assign value in setup block
      // computed result containers
      refComputed: {},
      refComputedOri: {},
      // 未代理的计算值容器
      moduleComputed: moduleComputed,
      globalComputed: globalComputed,
      connectedComputed: connectedComputed,
      moduleReducer: {},
      connectedReducer: {},
      reducer: {}
    }, _ctx["mapped"] = {}, _ctx.stateKeys = stateKeys, _ctx.computedDep = computedDep, _ctx.computedRetKeyFns = {}, _ctx.watchDep = watchDep, _ctx.watchRetKeyFns = {}, _ctx.execute = null, _ctx.effectMeta = effectMeta, _ctx.retKey_fnUid_ = {}, _ctx.reactSetState = noop, _ctx.__boundSetState = __boundSetState, _ctx.reactForceUpdate = noop, _ctx.__boundForceUpdate = __boundForceUpdate, _ctx.setState = setState, _ctx.setModuleState = setModuleState, _ctx.forceUpdate = forceUpdate, _ctx.changeState = changeState, _ctx.refs = refs, _ctx.useRef = function useRef(refName) {
      return function (ref) {
        return refs[refName] = {
          current: ref
        };
      }; // keep the same shape with hook useRef
    }, _ctx.__$$ccSetState = makeCcSetStateHandler(ref), _ctx.__$$ccForceUpdate = makeCcForceUpdateHandler(ref), _ctx.__$$settedList = [], _ctx.__$$prevMoStateVer = {}, _ctx);
    ref.setState = setState;
    ref.forceUpdate = forceUpdate; // allow user have a chance to define state in setup block;

    ctx.initState = function (initState) {
      // 已挂载则不让用户在调用initState
      if (ref.__$$isMounted) {
        return justWarning$6("ctx.initState can only been called before first render period!");
      }

      if (!isPJO(state)) {
        return justWarning$6("state " + NOT_A_JSON);
      }

      ref.state = Object.assign({}, state, initState, refStoredState, moduleState);
      ctx.prevState = ctx.state = ref.state;
    }; // 创建dispatch需要ref.ctx里的ccClassKey相关信息, 所以这里放在ref.ctx赋值之后在调用makeDispatchHandler


    var dispatch = makeDispatchHandler(ref, false, false, stateModule);
    ctx.dispatch = dispatch;

    if (liteLevel > 1) {
      // level 2, assign these mod data api
      ctx.lazyDispatch = makeDispatchHandler(ref, true, false, stateModule);
      ctx.silentDispatch = makeDispatchHandler(ref, false, true, stateModule);
      ctx.dispatchLazy = ctx.lazyDispatch; // alias of lazyDispatch

      ctx.dispatchSilent = ctx.silentDispatch; // alias of silentDispatch

      ctx.invoke = makeInvokeHandler(ref);
      ctx.lazyInvoke = makeInvokeHandler(ref, {
        isLazy: true
      });
      ctx.silentInvoke = makeInvokeHandler(ref, {
        isLazy: false,
        isSilent: true
      });
      ctx.invokeLazy = ctx.lazyInvoke; // alias of lazyInvoke

      ctx.invokeSilent = ctx.silentInvoke; // alias of silentInvoke

      ctx.setGlobalState = function (state, reactCallback, renderKey, delay) {
        _setState(MODULE_GLOBAL, state, SET_STATE, reactCallback, renderKey, delay);
      };
    }

    if (liteLevel > 2) {
      // level 3, assign async api
      var doSync = function doSync(e, val, rkey, delay, type) {
        var _sync$bind;

        if (typeof e === 'string') return __sync.bind(null, (_sync$bind = {}, _sync$bind[CCSYNC_KEY] = e, _sync$bind.type = type, _sync$bind.val = val, _sync$bind.delay = delay, _sync$bind.rkey = rkey, _sync$bind), ref);

        __sync({
          type: 'val'
        }, ref, e); //allow <input data-ccsync="foo/f1" onChange={ctx.sync} />

      };

      ctx.sync = function (e, val, rkey, delay) {
        if (rkey === void 0) {
          rkey = '';
        }

        if (delay === void 0) {
          delay = -1;
        }

        return doSync(e, val, rkey, delay, 'val');
      };

      ctx.syncBool = function (e, val, rkey, delay) {
        if (rkey === void 0) {
          rkey = '';
        }

        if (delay === void 0) {
          delay = -1;
        }

        return doSync(e, val, rkey, delay, 'bool');
      };

      ctx.syncInt = function (e, val, rkey, delay) {
        if (rkey === void 0) {
          rkey = '';
        }

        if (delay === void 0) {
          delay = -1;
        }

        return doSync(e, val, rkey, delay, 'int');
      };

      ctx.syncAs = function (e, val, rkey, delay) {
        if (rkey === void 0) {
          rkey = '';
        }

        if (delay === void 0) {
          delay = -1;
        }

        return doSync(e, val, rkey, delay, 'as');
      };

      ctx.set = function (ccsync, val, rkey, delay) {
        var _sync;

        if (rkey === void 0) {
          rkey = '';
        }

        if (delay === void 0) {
          delay = -1;
        }

        __sync((_sync = {}, _sync[CCSYNC_KEY] = ccsync, _sync.type = 'val', _sync.val = val, _sync.delay = delay, _sync.rkey = rkey, _sync), ref);
      };

      ctx.setBool = function (ccsync, rkey, delay) {
        var _sync2;

        if (rkey === void 0) {
          rkey = '';
        }

        if (delay === void 0) {
          delay = -1;
        }

        __sync((_sync2 = {}, _sync2[CCSYNC_KEY] = ccsync, _sync2.type = 'bool', _sync2.delay = delay, _sync2.rkey = rkey, _sync2), ref);
      };
    }

    if (liteLevel > 3) {
      // level 4, assign event api
      ctx.emit = function (event) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        findEventHandlersToPerform.apply(ev, [getEventItem(event)].concat(args));
      }; // 默认off掉当前实例对某个事件名的所有监听


      ctx.off = function (event, _temp) {
        var _ref = _temp === void 0 ? {} : _temp,
            module = _ref.module,
            ccClassKey = _ref.ccClassKey,
            _ref$ccUniqueKey = _ref.ccUniqueKey,
            inputCcUkey = _ref$ccUniqueKey === void 0 ? ccUniqueKey : _ref$ccUniqueKey;

        //这里刻意不为identity赋默认值，如果是undefined，表示off掉所有监听
        var _ev$getEventItem = getEventItem(event),
            name = _ev$getEventItem.name,
            identity = _ev$getEventItem.identity;

        findEventHandlersToOff(name, {
          module: module,
          ccClassKey: ccClassKey,
          ccUniqueKey: inputCcUkey,
          identity: identity
        });
      };

      ctx.on = function (inputEvent, handler) {
        //这里刻意赋默认值identity = null，表示on的是不带id认证的监听
        var _ev$getEventItem2 = getEventItem(inputEvent),
            event = _ev$getEventItem2.name,
            _ev$getEventItem2$ide = _ev$getEventItem2.identity,
            identity = _ev$getEventItem2$ide === void 0 ? null : _ev$getEventItem2$ide;

        bindEventHandlerToCcContext(stateModule, ccClassKey, ccUniqueKey, event, identity, handler);
      };
    }

    if (liteLevel > 4) {
      // level 5, assign enhance api
      ctx.execute = function (handler) {
        return ctx.execute = handler;
      };

      ctx.watch = getDefineWatchHandler(ctx);
      ctx.computed = getDefineComputedHandler(ctx);
      ctx.lazyComputed = getDefineComputedHandler(ctx, true);

      var makeEffectHandler = function makeEffectHandler(targetEffectItems, isProp) {
        return function (fn, depKeys, compare, immediate) {
          if (compare === void 0) {
            compare = true;
          }

          if (immediate === void 0) {
            immediate = true;
          }

          if (typeof fn !== 'function') throw new Error(eType('first') + " function");
          var _depKeys = depKeys; //对于effectProps 第三位参数就是immediate

          var _immediate = isProp ? compare : immediate; // depKeys 为null 和 undefined 表示无任何依赖，每一轮都执行的副作用


          if (depKeys !== null && depKeys !== undefined) {
            if (!Array.isArray(depKeys)) throw new Error(eType('second') + " one of them(array, null, undefined)");
          }

          var moDepKeys = null;

          if (!isProp && _depKeys) {
            moDepKeys = [];

            _depKeys.forEach(function (depKey) {
              if (depKey.includes('/')) moDepKeys.push(depKey);else moDepKeys.push(stateModule + "/" + depKey);
            });
          } // 对于effectProps来说是不会读取compare属性来用的


          var effectItem = {
            fn: fn,
            isProp: isProp,
            depKeys: _depKeys,
            moDepKeys: moDepKeys,
            eId: getEId(),
            compare: compare,
            immediate: _immediate
          };
          targetEffectItems.push(effectItem);
        };
      };

      ctx.effect = makeEffectHandler(effectItems, false);
      ctx.effectProps = makeEffectHandler(effectPropsItems, true);
    } // 构造完毕ctx后，开始创建reducer，和可观察connectedState


    var moduleReducer = ctx.moduleReducer,
        connectedReducer = ctx.connectedReducer,
        __$$curConnWaKeys = ctx.__$$curConnWaKeys,
        __$$compareConnWaKeys = ctx.__$$compareConnWaKeys,
        __$$compareConnWaKeyCount = ctx.__$$compareConnWaKeyCount,
        __$$nextCompareConnWaKeys = ctx.__$$nextCompareConnWaKeys,
        __$$nextCompareConnWaKeyCount = ctx.__$$nextCompareConnWaKeyCount;
    var allModules = connectedModules.slice();
    if (!allModules.includes(module)) allModules.push(module);else {
      justWarning$6("module[" + module + "] is in belongTo and connect both, it will cause redundant render.");
    }
    var __$$autoWatch = false; //向实例的reducer里绑定方法，key:{module} value:{reducerFn}
    //为了性能考虑，只绑定所属的模块和已连接的模块的reducer方法

    allModules.forEach(function (m) {
      var reducerObj;

      if (m === module) {
        reducerObj = moduleReducer;
      } else {
        reducerObj = safeGetObject$3(connectedReducer, m);
      }

      var connectDesc = connect[m];

      if (connectDesc) {
        var mConnectedState = classConnectedState[m];
        cstate[m] = mConnectedState; // let cstate always be latest in every re-render period

        if (connectDesc === '-') {
          // auto watch
          __$$autoWatch = true;
          __$$curConnWaKeys[m] = {};
          __$$compareConnWaKeys[m] = {};
          __$$compareConnWaKeyCount[m] = 0;
          __$$nextCompareConnWaKeys[m] = {};
          __$$nextCompareConnWaKeyCount[m] = 0;
          mConnectedState = makeObState(ref, mConnectedState, m);
        } // 非自动收集，这里就需要写入waKey_uKeyMap_来记录依赖关系了
        else {
            recordDep(ccUniqueKey, m, connectDesc);
          }

        connectedState[m] = mConnectedState;
      }

      var fnNames = _module_fnNames_[m] || [];
      fnNames.forEach(function (fnName) {
        reducerObj[fnName] = function (payload, rkeyOrOption, delay) {
          return dispatch(m + "/" + fnName, payload, rkeyOrOption, delay);
        };
      });
    });
    ctx.reducer = _caller;

    if (watchedKeys === '-') {
      __$$autoWatch = true;
      ref.state = makeObState(ref, mergedState);
      ctx.state = ref.state;
    } else {
      //开始记录依赖
      recordDep(ccUniqueKey, module, watchedKeys);
    }

    ctx.__$$autoWatch = __$$autoWatch;

    ctx.__$$reInjectConnObState = function (module) {
      var connectedState = ctx.connectedState;

      if (Array.isArray(connect)) {
        connectedState[module] = makeObState(ref, classConnectedState[module], module);
      } else {
        var waKeys = connect[module];
        if (waKeys === '-') connectedState[module] = makeObState(ref, classConnectedState[module], module); // else do nothing
      } // 总是将connectedState.globalState指向ctx.globalState


      ctx.globalState = connectedState[MODULE_GLOBAL];
    }; //始终优先取ref上指向的ctx，对于在热加载模式下的hook组件实例，那里面有的最近一次渲染收集的依赖信息才是正确的


    ctx.getWatchedKeys = function () {
      return getWatchedKeys(ref.ctx || ctx);
    };

    ctx.getConnectWatchedKeys = function (module) {
      return getConnectWatchedKeys(ref.ctx || ctx, module);
    };

    if (!existedCtx) ref.ctx = ctx; // 适配热加载或者异步渲染里, 需要清理ctx里运行时收集的相关数据，重新分配即可
    else {
        // 这里需要把第一次渲染期间已经收集好的依赖再次透传给ref.ctx
        var _ref$ctx = ref.ctx,
            __$$curWaKeys = _ref$ctx.__$$curWaKeys,
            __$$compareWaKeys = _ref$ctx.__$$compareWaKeys,
            __$$compareWaKeyCount = _ref$ctx.__$$compareWaKeyCount,
            __$$nextCompareWaKeys = _ref$ctx.__$$nextCompareWaKeys,
            __$$nextCompareWaKeyCount = _ref$ctx.__$$nextCompareWaKeyCount,
            _$$curConnWaKeys = _ref$ctx.__$$curConnWaKeys,
            _$$compareConnWaKeys = _ref$ctx.__$$compareConnWaKeys,
            _$$compareConnWaKeyCount = _ref$ctx.__$$compareConnWaKeyCount,
            _$$nextCompareConnWaKeys = _ref$ctx.__$$nextCompareConnWaKeys,
            _$$nextCompareConnWaKeyCount = _ref$ctx.__$$nextCompareConnWaKeyCount;
        Object.assign(ref.ctx, ctx, {
          __$$curWaKeys: __$$curWaKeys,
          __$$compareWaKeys: __$$compareWaKeys,
          __$$compareWaKeyCount: __$$compareWaKeyCount,
          __$$nextCompareWaKeys: __$$nextCompareWaKeys,
          __$$nextCompareWaKeyCount: __$$nextCompareWaKeyCount,
          __$$curConnWaKeys: _$$curConnWaKeys,
          __$$compareConnWaKeys: _$$compareConnWaKeys,
          __$$compareConnWaKeyCount: _$$compareConnWaKeyCount,
          __$$nextCompareConnWaKeys: _$$nextCompareConnWaKeys,
          __$$nextCompareConnWaKeyCount: _$$nextCompareConnWaKeyCount
        });
      }
  }

  var getState$4 = ccContext.store.getState;
  /** 由首次render触发 */

  function triggerComputedAndWatch (ref) {
    var ctx = ref.ctx;
    var hasComputedFn = ctx.hasComputedFn,
        hasWatchFn = ctx.hasWatchFn,
        connect = ctx.connect,
        refModule = ctx.module;
    var callInfo = makeCallInfo(refModule);
    var connectedModules = okeys(connect);
    var refState = ctx.state;

    if (hasComputedFn) {
      computeValueForRef(ctx, refModule, refState, refState, callInfo, true, true);
      connectedModules.forEach(function (m) {
        var mState = getState$4(m);
        var tmpCallInfo = makeCallInfo(m);
        computeValueForRef(ctx, m, mState, mState, tmpCallInfo, true, true);
      });
    }

    if (hasWatchFn) {
      watchKeyForRef(ctx, refModule, refState, refState, callInfo, true, true);
      connectedModules.forEach(function (m) {
        var mState = getState$4(m);
        var tmpCallInfo = makeCallInfo(m);
        watchKeyForRef(ctx, m, mState, mState, tmpCallInfo, true, true);
      });
    }
  }

  var okeys$8 = okeys;
  var runtimeVar$2 = ccContext.runtimeVar;
  function beforeMount (ref, setup, bindCtxToMethod) {
    var ctx = ref.ctx;
    ref.__$$isUnmounted = false; // false表示未卸载（不代表已挂载），在willUnmount时机才置为true，表示已卸载

    ref.__$$isMounted = false; // 未挂载，在didMount时机才置为true，表示已挂载
    // flag before setup

    ctx.__$$isBSe = true; //先调用setup，setup可能会定义computed,watch，同时也可能调用ctx.reducer,所以setup放在fill reducer之后

    if (setup) {
      if (typeof setup !== 'function') throw new Error('type of setup must be function');
      var settingsObj = setup(ctx) || {};
      if (!isPJO(settingsObj)) throw new Error('type of setup return result must be an plain json object'); //优先读自己的，再读全局的

      if (bindCtxToMethod === true || runtimeVar$2.bindCtxToMethod === true && bindCtxToMethod !== false) {
        okeys$8(settingsObj).forEach(function (name) {
          var settingValue = settingsObj[name];
          if (typeof settingValue === 'function') settingsObj[name] = settingValue.bind(ref, ctx);
        });
      }

      ctx.settings = settingsObj;
    } // flag after setup


    ctx.__$$isBSe = false; //!!! 把拦截了setter getter的计算结果容器赋值给refComputed
    // 这一波必需在setup调用之后做，因为setup里会调用ctx.computed写入computedRetKeyFns等元数据

    ctx.refComputed = makeObCuContainer(ctx.computedRetKeyFns, ctx.refComputedOri);
    triggerComputedAndWatch(ref);
  }

  var moduleName_stateKeys_$6 = ccContext.moduleName_stateKeys_,
      _ccContext$store$2 = ccContext.store,
      getPrevState$1 = _ccContext$store$2.getPrevState,
      getState$5 = _ccContext$store$2.getState,
      getStateVer$1 = _ccContext$store$2.getStateVer;

  var warn = function warn(key, frag) {
    return justWarning("effect: key[" + key + "] is invalid, its " + frag + " has not been declared in' store!");
  };

  function mapSettedList(settedList) {
    return settedList.reduce(function (map, _ref) {
      var module = _ref.module,
          keys = _ref.keys;
      keys.forEach(function (key) {
        return map[module + "/" + key] = 1;
      });
      return map;
    }, {});
  }

  function triggerSetupEffect (ref, callByDidMount) {
    var ctx = ref.ctx;
    var _ctx$effectMeta = ctx.effectMeta,
        effectItems = _ctx$effectMeta.effectItems,
        eid_effectReturnCb_ = _ctx$effectMeta.eid_effectReturnCb_,
        effectPropsItems = _ctx$effectMeta.effectPropsItems,
        eid_effectPropsReturnCb_ = _ctx$effectMeta.eid_effectPropsReturnCb_;
    var __$$prevMoStateVer = ctx.__$$prevMoStateVer,
        __$$settedList = ctx.__$$settedList,
        refModule = ctx.module;

    var makeItemHandler = function makeItemHandler(eid_cleanCb_, isFirstCall, needJudgeImmediate) {
      return function (item) {
        var fn = item.fn,
            eId = item.eId,
            immediate = item.immediate;

        if (needJudgeImmediate) {
          if (immediate === false) return;
        }

        var prevCb = eid_cleanCb_[eId];
        if (prevCb) prevCb(ctx); // let ctx.effect have the totally same behavior with useEffect

        var cb = fn(ctx, isFirstCall);
        eid_cleanCb_[eId] = cb; //不管有没有返回，都要覆盖之前的结果
      };
    };

    if (callByDidMount) {
      // flag isFirstCall as true
      effectItems.forEach(makeItemHandler(eid_effectReturnCb_, true, true));
      effectPropsItems.forEach(makeItemHandler(eid_effectPropsReturnCb_, true, true));
    } else {
      // callByDidUpdate
      // start handle effect meta data of state keys
      var prevState = ctx.prevState;
      var curState = ref.state;
      var toBeExecutedFns = [];
      effectItems.forEach(function (item) {
        // const { status, depKeys, fn, eId } = item;
        // if (status === EFFECT_STOPPED) return;
        // todo, 优化为effectDep模式, 利用differStateKeys去命中执行函数
        var moDepKeys = item.moDepKeys,
            compare = item.compare,
            fn = item.fn,
            eId = item.eId;

        if (moDepKeys) {
          var keysLen = moDepKeys.length;
          if (keysLen === 0) return;
          var mappedSettedKey = mapSettedList(__$$settedList);
          var shouldEffectExecute = false;

          for (var i = 0; i < keysLen; i++) {
            var key = moDepKeys[i];

            if (!compare) {
              if (mappedSettedKey[key]) {
                shouldEffectExecute = true;
                break;
              } else {
                continue;
              }
            }

            var targetCurState = void 0,
                targetPrevState = void 0,
                targetKey = void 0;

            var _key$split = key.split('/'),
                module = _key$split[0],
                unmoduledKey = _key$split[1];

            if (module !== refModule) {
              var _prevState = getPrevState$1(module);

              var moduleStateVer = getStateVer$1(module);

              if (__$$prevMoStateVer[unmoduledKey] === moduleStateVer[unmoduledKey]) {
                continue;
              } else {
                __$$prevMoStateVer[unmoduledKey] = moduleStateVer[unmoduledKey];
              }

              if (!_prevState) {
                warn(key, "module[" + module + "]");
                continue;
              }

              if (!moduleName_stateKeys_$6[module].includes(unmoduledKey)) {
                warn(key, "unmoduledKey[" + unmoduledKey + "]");
                continue;
              }

              targetCurState = getState$5(module);
              targetPrevState = _prevState;
              targetKey = unmoduledKey;
            } else {
              targetCurState = curState;
              targetPrevState = prevState;
              targetKey = key;
            }

            if (targetPrevState[targetKey] !== targetCurState[targetKey]) {
              shouldEffectExecute = true;
              break;
            }
          }

          if (shouldEffectExecute) {
            toBeExecutedFns.push({
              fn: fn,
              eId: eId
            });
          }
        } else {
          toBeExecutedFns.push({
            fn: fn,
            eId: eId
          });
        }
      }); // flag isFirstCall as false, start to run state effect fns

      toBeExecutedFns.forEach(makeItemHandler(eid_effectReturnCb_, false, false)); // start handle effect meta data of props keys

      var prevProps = ctx.prevProps;
      var curProps = ctx.props;
      var toBeExecutedPropFns = [];
      effectPropsItems.forEach(function (item) {
        var depKeys = item.depKeys,
            fn = item.fn,
            eId = item.eId;

        if (depKeys) {
          // prop dep key
          var keysLen = depKeys.length;
          if (keysLen === 0) return;
          var shouldEffectExecute = false;

          for (var i = 0; i < keysLen; i++) {
            var key = depKeys[i];

            if (prevProps[key] !== curProps[key]) {
              shouldEffectExecute = true;
              break;
            }
          }

          if (shouldEffectExecute) toBeExecutedPropFns.push({
            fn: fn,
            eId: eId
          });
        } else {
          toBeExecutedPropFns.push({
            fn: fn,
            eId: eId
          });
        }
      }); // flag isFirstCall as false, start to run prop effect fns

      toBeExecutedPropFns.forEach(makeItemHandler(eid_effectPropsReturnCb_, false, false)); // clear settedList

      __$$settedList.length = 0;
    }
  }

  var justWarning$7 = justWarning,
      me$4 = makeError,
      vbi$4 = verboseInfo,
      ss = styleStr,
      cl = color;
  var runtimeVar$3 = ccContext.runtimeVar,
      ccClassKey_ccClassContext_$4 = ccContext.ccClassKey_ccClassContext_,
      ccUKey_ref_$2 = ccContext.ccUKey_ref_;
  var ccUKey_insCount = {};

  function setCcInstanceRef(ccUniqueKey, ref, ccKeys, delayMs) {
    function setRef() {
      ccUKey_ref_$2[ccUniqueKey] = ref;
      ccKeys.push(ccUniqueKey);
    }

    incCcKeyInsCount(ccUniqueKey);

    if (delayMs) {
      setTimeout(setRef, delayMs);
    } else {
      setRef();
    }
  }

  function incCcKeyInsCount(ccUniqueKey) {
    if (ccUKey_insCount[ccUniqueKey] === undefined) ccUKey_insCount[ccUniqueKey] = 1;else ccUKey_insCount[ccUniqueKey] += 1;
  }
  function decCcKeyInsCount(ccUniqueKey) {
    if (ccUKey_insCount[ccUniqueKey] === undefined) ccUKey_insCount[ccUniqueKey] = 0;else ccUKey_insCount[ccUniqueKey] -= 1;
  }
  function getCcKeyInsCount(ccUniqueKey) {
    if (ccUKey_insCount[ccUniqueKey] === undefined) return 0;else return ccUKey_insCount[ccUniqueKey];
  }
  function setRef (ref, isSingle, ccClassKey, ccKey, ccUniqueKey) {
    var classContext = ccClassKey_ccClassContext_$4[ccClassKey];
    var ccKeys = classContext.ccKeys;

    if (runtimeVar$3.isDebug) {
      console.log(ss("register ccKey " + ccUniqueKey + " to CC_CONTEXT"), cl());
    }

    var isHot = ccContext.isHotReloadMode();

    if (ccKeys.includes(ccUniqueKey)) {
      var dupErr = function dupErr() {
        throw me$4(ERR.CC_CLASS_INSTANCE_KEY_DUPLICATE, vbi$4("ccClass:" + ccClassKey + ",ccKey:" + ccUniqueKey));
      };

      if (isHot) {
        // get existed ins count
        var insCount = getCcKeyInsCount(ccUniqueKey);
        if (isSingle && insCount > 0) throw me$4(ERR.CC_CLASS_INSTANCE_MORE_THAN_ONE, vbi$4("ccClass:" + ccClassKey));

        if (insCount > 1) {
          // now cc can make sure the ccKey duplicate
          dupErr();
        } // just warning


        justWarning$7("\n        found ccKey[" + ccKey + "] duplicated in hot reload mode, please make sure your ccKey is unique manually,\n        " + vbi$4("ccClassKey:" + ccClassKey + " ccKey:" + ccKey + " ccUniqueKey:" + ccUniqueKey) + "\n      "); // in webpack hot reload mode, cc works not very well,
        // cc can't set ref immediately, because the ccInstance of ccKey will ummount right now, in unmount func, 
        // cc call unsetCcInstanceRef will lost the right ref in CC_CONTEXT.refs
        // so cc set ref later

        setCcInstanceRef(ccUniqueKey, ref, ccKeys, 600);
      } else {
        dupErr();
      }
    } else {
      setCcInstanceRef(ccUniqueKey, ref, ccKeys);
    }

    return classContext;
  }

  var waKey_uKeyMap_$4 = ccContext.waKey_uKeyMap_; // before render
  // cur: {} compare: {a:2, b:2, c:2} compareCount=3 nextCompare:{}
  //
  // rendering input
  // cur: {a:'val', c:'val', d:'val'}
  //
  // after render
  // cur: {a:1, c:1, c:1} compare: {a:1, b:2, c:1, d:1} nextCompare:{a:2, c:2, d:2}
  //
  // then concent will know b should delete dep because=0, 
  // compare key count=4>3 or compare include 2, so should let cache expire
  //
  // before next render
  // cur: {} compare: {a:2, c:2, d:2} compareCount=3 nextCompare:{}

  /** 删除依赖 */

  function delDep(compareWaKeys, compareWaKeyCount, module, ccUniqueKey) {
    var shouldLetCacheExpire = false;
    var waKeys = okeys(compareWaKeys);
    waKeys.forEach(function (waKey) {
      // no module prefix
      if (compareWaKeys[waKey] === 2) {
        //这个key在这轮渲染结束后没有命中，说明视图不再对它有依赖
        shouldLetCacheExpire = true;
        delete waKey_uKeyMap_$4[module + "/" + waKey][ccUniqueKey];
      }
    });

    if (waKeys.length > compareWaKeyCount) {
      //大于最初记录的key数量，有新增
      shouldLetCacheExpire = true;
    } // let find result cache expire


    if (shouldLetCacheExpire) {
      createModuleNode(module);
    }
  }

  function afterRender (ref) {
    var ctx = ref.ctx;
    ctx.__$$renderStatus = END; // 不存在自动收集行为

    if (!ctx.__$$autoWatch) {
      return;
    }

    var refModule = ctx.module,
        connectedModules = ctx.connectedModules,
        connect = ctx.connect,
        ccUniqueKey = ctx.ccUniqueKey,
        __$$compareWaKeys = ctx.__$$compareWaKeys,
        __$$compareWaKeyCount = ctx.__$$compareWaKeyCount,
        __$$compareConnWaKeys = ctx.__$$compareConnWaKeys,
        __$$compareConnWaKeyCount = ctx.__$$compareConnWaKeyCount;
    delDep(__$$compareWaKeys, __$$compareWaKeyCount, refModule, ccUniqueKey);
    connectedModules.forEach(function (m) {
      // 非自动收集，不用处理
      if (connect[m] !== '-') return;
      var __$$compareWaKeys = __$$compareConnWaKeys[m];
      var __$$compareWaKeyCount = __$$compareConnWaKeyCount[m];
      delDep(__$$compareWaKeys, __$$compareWaKeyCount, m, ccUniqueKey);
    });
  }

  function didMount (ref) {
    afterRender(ref);
    ref.__$$isMounted = true;
    ref.__$$isUnmounted = false;
    var _ref$ctx = ref.ctx,
        isSingle = _ref$ctx.isSingle,
        ccClassKey = _ref$ctx.ccClassKey,
        ccKey = _ref$ctx.ccKey,
        ccUniqueKey = _ref$ctx.ccUniqueKey,
        __$$onEvents = _ref$ctx.__$$onEvents;
    setRef(ref, isSingle, ccClassKey, ccKey, ccUniqueKey); // 这些事件是组件还未挂载时，就派发过来的，延迟到此刻执行，同时清空

    if (__$$onEvents.length > 0) {
      __$$onEvents.forEach(function (_ref) {
        var fn = _ref.fn,
            args = _ref.args;
        return fn.apply(void 0, args);
      });

      __$$onEvents.length = 0;
    }

    triggerSetupEffect(ref, true);
  }

  function didUpdate (ref) {
    afterRender(ref);
    triggerSetupEffect(ref); //!!! 将最新的state记录为prevState，方便下一轮渲染完毕执行triggerSetupEffect时做比较用
    //注意一定是先调用triggerSetupEffect，再赋值
    //这里刻意用assign，让prevState指向一个新引用
    // ref.ctx.prevState = Object.assign({}, ref.state);
    //不采用上面的写法了，因为makeCcSetStateHandler里放弃了okeys写法，总是直接赋值最新的state引用

    ref.ctx.prevState = ref.state;
  }

  var ccUKey_ref_$3 = ccContext.ccUKey_ref_,
      ccUKey_handlerKeys_$1 = ccContext.ccUKey_handlerKeys_,
      runtimeVar$4 = ccContext.runtimeVar,
      ccClassKey_ccClassContext_$5 = ccContext.ccClassKey_ccClassContext_,
      handlerKey_handler_$1 = ccContext.handlerKey_handler_;
  function unsetRef (ccClassKey, ccUniqueKey) {
    if (runtimeVar$4.isDebug) {
      console.log(styleStr(ccUniqueKey + " unset ref"), color('purple'));
    }

    delete ccUKey_ref_$3[ccUniqueKey];
    var classContext = ccClassKey_ccClassContext_$5[ccClassKey];
    var ccKeys = classContext.ccKeys;
    var ccKeyIdx = ccKeys.indexOf(ccUniqueKey);
    if (ccKeyIdx >= 0) ccKeys.splice(ccKeyIdx, 1);
    decCcKeyInsCount(ccUniqueKey);
    var handlerKeys = ccUKey_handlerKeys_$1[ccUniqueKey];

    if (handlerKeys) {
      handlerKeys.forEach(function (hKey) {
        delete handlerKey_handler_$1[hKey];
      });
    }
  }

  var okeys$a = okeys;

  function executeClearCb(cbMap, ctx) {
    var execute = function execute(key) {
      // symbolKey or normalKey
      var cb = cbMap[key];
      if (typeof cb === 'function') cb(ctx);
    };

    Object.getOwnPropertySymbols(cbMap).forEach(execute);
    okeys$a(cbMap).forEach(execute);
  }

  function beforeUnmount (ref) {
    //标记一下已卸载，防止组件卸载后，某个地方有异步的任务拿到了该组件的引用，然后执行setState，导致
    //Warning: Can't perform a React state update on an unmounted component. This is a no-op ......
    ref.__$$isUnmounted = true;
    var ctx = ref.ctx;
    var ccUniqueKey = ctx.ccUniqueKey,
        ccClassKey = ctx.ccClassKey,
        renderKey = ctx.renderKey; // 配合startup里tryClearShadowRef逻辑，正常情况下只有挂载了组件才会有effect等相关定义
    // shawRef的卸载可能会走到这里

    if (ref.__$$isMounted) {
      var _ctx$effectMeta = ctx.effectMeta,
          eid_effectReturnCb_ = _ctx$effectMeta.eid_effectReturnCb_,
          eid_effectPropsReturnCb_ = _ctx$effectMeta.eid_effectPropsReturnCb_;
      executeClearCb(eid_effectReturnCb_, ctx);
      executeClearCb(eid_effectPropsReturnCb_, ctx);
      offEventHandlersByCcUniqueKey(ccUniqueKey);
    }

    unsetRef(ccClassKey, ccUniqueKey, renderKey);
  }

  function beforeRender (ref) {
    var ctx = ref.ctx;
    ctx.__$$renderStatus = START; // 在buildRefCtx阶段已完成相关的obState注入，这里不再需要

    if (ctx.renderCount === 1) {
      return;
    } // 处于收集观察依赖


    if (ctx.__$$autoWatch) {
      if (ctx.__$$hasModuleState) {
        // 这里后期考虑结合handlerFactory.makeRefSetState优化，不用每次都生成代理对象
        ref.state = makeObState(ref, ref.state);
        ctx.state = ref.state;
        ctx.moduleState = makeObState(ref, ctx.mstate);
        ctx.__$$curWaKeys = {};
        ctx.__$$compareWaKeys = ctx.__$$nextCompareWaKeys;
        ctx.__$$compareWaKeyCount = ctx.__$$nextCompareWaKeyCount; // 渲染期间再次收集

        ctx.__$$nextCompareWaKeys = {};
        ctx.__$$nextCompareWaKeyCount = 0;
      }

      var connectedModules = ctx.connectedModules,
          connect = ctx.connect;
      connectedModules.forEach(function (m) {
        // 非自动收集，在make-ob-state里不会触发get，这里直接跳出
        if (connect[m] !== '-') return;
        ctx.__$$curConnWaKeys[m] = {};
        ctx.__$$compareConnWaKeys[m] = ctx.__$$nextCompareConnWaKeys[m];
        ctx.__$$compareConnWaKeyCount[m] = ctx.__$$nextCompareConnWaKeyCount[m]; // 渲染期间再次收集

        ctx.__$$nextCompareConnWaKeys[m] = {};
        ctx.__$$nextCompareConnWaKeyCount[m] = 0;
      });
    }
  }

  var ccClassDisplayName$1 = ccClassDisplayName,
      styleStr$1 = styleStr,
      color$1 = color,
      getPassToMapWaKeys$1 = getPassToMapWaKeys,
      shallowDiffers$1 = shallowDiffers,
      evalState$2 = evalState;
  var runtimeVar$5 = ccContext.runtimeVar;
  var cl$1 = color$1;
  var ss$1 = styleStr$1;

  var setupErr = function setupErr(info) {
    return new Error('can not defined setup both in register options and class body ' + '--verbose:' + info);
  };

  function register(_temp, ccClassKey) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$module = _ref.module,
        module = _ref$module === void 0 ? MODULE_DEFAULT : _ref$module,
        _ref$state = _ref.state,
        state = _ref$state === void 0 ? {} : _ref$state,
        _ref$watchedKeys = _ref.watchedKeys,
        watchedKeys = _ref$watchedKeys === void 0 ? '-' : _ref$watchedKeys,
        _ref$storedKeys = _ref.storedKeys,
        storedKeys = _ref$storedKeys === void 0 ? [] : _ref$storedKeys,
        _ref$setup = _ref.setup,
        setup = _ref$setup === void 0 ? null : _ref$setup,
        persistStoredKeys = _ref.persistStoredKeys,
        _ref$connect = _ref.connect,
        connect = _ref$connect === void 0 ? {} : _ref$connect,
        tag = _ref.tag,
        lite = _ref.lite,
        _ref$isPropsProxy = _ref.isPropsProxy,
        isPropsProxy = _ref$isPropsProxy === void 0 ? false : _ref$isPropsProxy,
        _ref$isSingle = _ref.isSingle,
        isSingle = _ref$isSingle === void 0 ? false : _ref$isSingle,
        renderKeyClasses = _ref.renderKeyClasses,
        _ref$__checkStartUp = _ref.__checkStartUp,
        __checkStartUp = _ref$__checkStartUp === void 0 ? true : _ref$__checkStartUp,
        _ref$compareProps = _ref.compareProps,
        compareProps = _ref$compareProps === void 0 ? true : _ref$compareProps,
        __calledBy = _ref.__calledBy;

    if (ccClassKey === void 0) {
      ccClassKey = '';
    }

    try {
      var _mapRegistrationInfo = mapRegistrationInfo(module, ccClassKey, renderKeyClasses, CC_CLASS, getPassToMapWaKeys$1(watchedKeys), storedKeys, connect, __checkStartUp, __calledBy),
          _module = _mapRegistrationInfo._module,
          _ccClassKey = _mapRegistrationInfo._ccClassKey,
          _connect = _mapRegistrationInfo._connect;

      return function (ReactClass) {
        if (ReactClass.prototype && ReactClass.prototype.$$attach) {
          throw new Error("register a cc class is prohibited!");
        } // const isClsPureComponent = ReactClass.prototype.isPureReactComponent;


        var ToBeExtendedClass = isPropsProxy === false ? ReactClass : React.Component;
        var staticSetup = ToBeExtendedClass.$$setup;

        var _CcClass =
        /*#__PURE__*/
        function (_ToBeExtendedClass) {
          _inheritsLoose(CcClass, _ToBeExtendedClass);

          function CcClass(props, context) {
            var _this;

            try {
              _this = _ToBeExtendedClass.call(this, props, context) || this;
              var optState = evalState$2(state);
              var thisState = _this.state || {};
              var privState = Object.assign(thisState, optState);
              _this.$$attach = _this.$$attach.bind(_assertThisInitialized(_this)); // props.ccOption

              var params = Object.assign({}, props, {
                isSingle: isSingle,
                module: _module,
                tag: tag,
                state: privState,
                type: CC_CLASS,
                watchedKeys: watchedKeys,
                ccClassKey: _ccClassKey,
                connect: _connect,
                storedKeys: storedKeys,
                persistStoredKeys: persistStoredKeys
              });
              buildRefCtx(_assertThisInitialized(_this), params, lite);
              _this.ctx.reactSetState = makeRefSetState(_assertThisInitialized(_this));
              _this.ctx.reactForceUpdate = makeRefForceUpdate(_assertThisInitialized(_this));

              if (setup && (_this.$$setup || staticSetup)) {
                throw setupErr('ccUniqueKey ' + _this.ctx.ccUniqueKey);
              }

              if (!isPropsProxy) {
                if (_this.$$setup) _this.$$setup = _this.$$setup.bind(_assertThisInitialized(_this));
                beforeMount(_assertThisInitialized(_this), setup || _this.$$setup || staticSetup, false);
              } // isPropsProxy为true时，延迟到$$attach里执行beforeMount

            } catch (err) {
              catchCcError(err);
            }

            return _this;
          } // 如果代理组件或者继承组件没有没有实现scu，则同时比较nextState nextProps
          // 因为nextProps不同也会导致重渲染，所以需要约束用户不要把可变数据从props传下来，以提高性能


          var _proto = CcClass.prototype;

          _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
            var childRef = this.ctx.childRef;

            if (childRef && childRef.shouldComponentUpdate) {
              return childRef.shouldComponentUpdate(nextProps, nextState);
            } else if (_ToBeExtendedClass.prototype.shouldComponentUpdate) {
              return _ToBeExtendedClass.prototype.shouldComponentUpdate.call(this, nextProps, nextState);
            }

            var isPropsChanged = compareProps ? shallowDiffers$1(this.props, nextProps) : false;
            return this.state !== nextState || isPropsChanged;
          } //!!! 存在多重装饰器时, 或者用户想使用this.props.***来用concent类时
          //!!! 必需在类的【constructor】 里调用 this.props.$$attach(this),紧接着state定义之后
          ;

          _proto.$$attach = function $$attach(childRef) {
            var ctx = this.ctx;
            ctx.childRef = childRef;
            childRef.ctx = ctx;
            ctx.reactSetState = childRef.setState.bind(childRef);
            ctx.reactForceUpdate = childRef.forceUpdate.bind(childRef); // 让孩子引用的setState forceUpdate 指向父容器事先构造好的setState forceUpdate

            childRef.setState = ctx.setState;
            childRef.forceUpdate = ctx.forceUpdate; //替换掉ctx.__$$ccSetState ctx.__$$ccForceUpdate, 让changeRefState正确的更新目标实例

            ctx.__$$ccSetState = makeCcSetStateHandler(childRef, this);
            ctx.__$$ccForceUpdate = makeCcForceUpdateHandler(childRef);
            if (!childRef.state) childRef.state = {};
            var childRefState = childRef.state;
            var thisState = this.state;
            Object.assign(childRefState, thisState);
            beforeRender(childRef); //避免提示 Warning: Expected {Component} state to match memoized state before componentDidMount
            // const newState = Object.assign({}, childRefState, thisState);
            // this.state = newState; // bad writing
            // okeys(newState).forEach(key => thisState[key] = newState[key]);

            if (childRef.$$setup) childRef.$$setup = childRef.$$setup.bind(childRef);
            if (setup && (childRef.$$setup || staticSetup)) throw setupErr('ccUniqueKey ' + ctx.ccUniqueKey);
            beforeMount(childRef, setup || childRef.$$setup || staticSetup, false);
          };

          _proto.componentDidMount = function componentDidMount() {
            if (_ToBeExtendedClass.prototype.componentDidMount) _ToBeExtendedClass.prototype.componentDidMount.call(this);
            didMount(this); // 代理模式不再强制检查$$attach是否给调用
            // if (isPropsProxy === true && !this.ctx.childRef) {
            //   throw new Error('you forgot to call this.props.$$attach(this) in constructor, you must call it after state assign expression next line!');
            // }
          };

          _proto.componentDidUpdate = function componentDidUpdate() {
            if (_ToBeExtendedClass.prototype.componentDidUpdate) _ToBeExtendedClass.prototype.componentDidUpdate.call(this);
            didUpdate(this);
          };

          _proto.componentWillUnmount = function componentWillUnmount() {
            if (_ToBeExtendedClass.prototype.componentWillUnmount) _ToBeExtendedClass.prototype.componentWillUnmount.call(this);
            beforeUnmount(this);
          };

          _proto.render = function render() {
            this.ctx.prevProps = this.ctx.props;
            this.ctx.props = this.props;

            if (runtimeVar$5.isDebug) {
              console.log(ss$1("@@@ render " + ccClassDisplayName$1(_ccClassKey)), cl$1());
            }

            if (isPropsProxy === false) {
              beforeRender(this); //now cc class extends ReactClass, call super.render()

              return _ToBeExtendedClass.prototype.render.call(this);
            } else {
              //将$$attach传递下去，让用户在构造器里紧接着super之后调this.props.$$attach()
              return React.createElement(ReactClass, {
                ctx: this.ctx,
                $$attach: this.$$attach
              });
            }
          };

          return CcClass;
        }(ToBeExtendedClass);

        if (_ccClassKey === CC_DISPATCHER) _CcClass.displayName = 'CcDispatcher';else _CcClass.displayName = ccClassDisplayName$1(_ccClassKey);
        return _CcClass;
      };
    } catch (err) {
      catchCcError(err);
    }
  }

  function createDispatcher (CustomizedComponent) {
    var DefaultComponent =
    /*#__PURE__*/
    function (_React$Component) {
      _inheritsLoose(DefaultComponent, _React$Component);

      function DefaultComponent() {
        return _React$Component.apply(this, arguments) || this;
      }

      var _proto = DefaultComponent.prototype;

      _proto.render = function render() {
        return this.props.children || React.createElement('span', {
          style: {
            display: 'none'
          }
        });
      };

      return DefaultComponent;
    }(React.Component);

    if (ccContext.refs[CC_DISPATCHER]) {
      if (ccContext.isHotReloadMode()) {
        justTip("hot reload mode, CC_DISPATCHER existed");
      } else {
        throw new Error("CcDispatcher can only be initialize one time");
      }
    }

    var TargetComponent = CustomizedComponent || DefaultComponent;
    return register({
      isSingle: true,
      __checkStartUp: false,
      __calledBy: 'cc'
    }, CC_DISPATCHER)(TargetComponent);
  }

  var isPJO$7 = isPJO,
      okeys$b = okeys;

  function checkObj(rootObj, tag) {
    if (!isPJO$7(rootObj)) {
      throw new Error(tag + " " + NOT_A_JSON);
    }
  }
  /** 对已有的store.$$global状态追加新的state */
  // export function appendGlobalState(globalState) {
  //   // todo
  // }


  function configStoreState(storeState) {
    checkObj(storeState, 'state');
    delete storeState[MODULE_VOID];
    delete storeState[MODULE_CC];
    if (storeState[MODULE_GLOBAL] === undefined) storeState[MODULE_GLOBAL] = {};
    if (storeState[MODULE_DEFAULT] === undefined) storeState[MODULE_DEFAULT] = {};
    var moduleNames = okeys$b(storeState);
    var len = moduleNames.length;

    for (var i = 0; i < len; i++) {
      var moduleName = moduleNames[i];
      var moduleState = storeState[moduleName];
      initModuleState(moduleName, moduleState);
    }
  }
  /**
   * 
   * @param {{[moduleName:string]:{[reducerFnType:string]:function}}} rootReducer 
   */

  function configRootReducer(rootReducer) {
    checkObj(rootReducer, 'reducer');
    if (rootReducer[MODULE_DEFAULT] === undefined) rootReducer[MODULE_DEFAULT] = {};
    if (rootReducer[MODULE_GLOBAL] === undefined) rootReducer[MODULE_GLOBAL] = {};
    okeys$b(rootReducer).forEach(function (m) {
      return initModuleReducer(m, rootReducer[m]);
    });
  }
  function configRootComputed(rootComputed) {
    checkObj(rootComputed, 'computed');
    okeys$b(rootComputed).forEach(function (m) {
      return initModuleComputed(m, rootComputed[m]);
    });
  }
  function configRootWatch(rootWatch) {
    checkObj(rootWatch, 'watch');
    Object.keys(rootWatch).forEach(function (m) {
      return initModuleWatch(m, rootWatch[m]);
    });
  }
  function executeRootInit(init) {
    if (!init) return;

    if (!isPJO$7(init)) {
      throw new Error("init " + NOT_A_JSON);
    }

    okeys$b(init).forEach(function (moduleName) {
      checkModuleName(moduleName, false);
      var initFn = init[moduleName];

      if (initFn) {
        Promise.resolve().then(initFn).then(function (state) {
          makeSetStateHandler(moduleName)(state);
        });
      }
    });
    ccContext.init._init = init;
  }
  function configModuleSingleClass(moduleSingleClass) {
    if (!isPJO$7(moduleSingleClass)) {
      throw new Error("StartupOption.moduleSingleClass " + NOT_A_JSON);
    }

    safeAssignObjectValue(ccContext.moduleSingleClass, moduleSingleClass);
  }
  function configMiddlewares(middlewares) {
    if (middlewares.length > 0) {
      var ccMiddlewares = ccContext.middlewares;
      ccMiddlewares.length = 0; //防止热加载重复多次载入middlewares

      middlewares.forEach(function (m) {
        return ccMiddlewares.push(m);
      });
    }
  }
  function configPlugins(plugins) {
    if (plugins.length > 0) {
      var ccPlugins = ccContext.plugins;
      ccPlugins.length = 0; //防止热加载重复多次载入plugins

      clearCbs(); //清理掉已映射好的插件回调

      var pluginNameMap = {};
      plugins.forEach(function (p) {
        ccPlugins.push(p);

        if (p.install) {
          var pluginInfo = p.install(on);
          var e = new Error('plugin.install must return result:{name:string, options?:object}');
          if (!pluginInfo) throw e;
          var pluginName = pluginInfo.name;
          if (!pluginName) throw e;
          if (pluginNameMap[pluginName]) throw new Error("pluginName[" + pluginName + "] duplicate");
          pluginNameMap[pluginName] = 1;
        } else {
          throw new Error('a plugin must export install handler!');
        }
      });
      ccContext.pluginNameMap = pluginNameMap;
    }
  }

  var appendDispatcher = (function (Dispatcher) {
    var box = document.querySelector("#" + CC_DISPATCHER_BOX);

    if (!box) {
      box = document.createElement('div');
      box.id = CC_DISPATCHER_BOX;
      var boxSt = box.style;
      boxSt.position = 'fixed';
      boxSt.left = 0;
      boxSt.top = 0;
      boxSt.display = 'none';
      boxSt.zIndex = -888666; // document.body.append(box);// chrome <= 49 not support append

      document.body.appendChild(box);
    }

    ReactDOM.render(React.createElement(Dispatcher), box);
  });

  var justCalledByStartUp = false;
  /**
    CodeSandbox ide里，当runConcent.js单独放置时，代码结构如下
      import React, { Component } from "react";
      import ReactDom from "react-dom";
      import "./runConcent";
      import App from "./App";
      import { clearContextIfHot } from "concent";

      clearContextIfHot();
      ReactDom.render(<App />, document.getElementById("root"));
   * 
   * 如果只修改了其他地方的代码属于App相关依赖的代码，查看dom结构返现热加载直接将dispatcher div标签丢弃，
   * 同时refs里也没有dispatcher引用了，这里做一次额外检查
   */

  function _checkDispatcher() {
    if (!ccContext.refs[CC_DISPATCHER]) {
      var Dispatcher = createDispatcher();
      appendDispatcher(Dispatcher);
    }
  }

  function _clearInsAssociation(recomputed, otherExcludeKeys) {
    if (recomputed === void 0) {
      recomputed = false;
    }

    clearObject(ccContext.event_handlers_);
    clearObject(ccContext.ccUKey_handlerKeys_);
    var cct = ccContext.ccClassKey_ccClassContext_;
    var ccUKey_ref_ = ccContext.ccUKey_ref_;
    Object.keys(cct).forEach(function (ccClassKey) {
      var ctx = cct[ccClassKey];
      var ccKeys = ctx.ccKeys;
      var tmpExclude = [];

      if (otherExcludeKeys.length > 0) {
        ccKeys.forEach(function (ccKey) {
          if (otherExcludeKeys.includes(ccKey)) {
            tmpExclude.push(ccKey);
          }
        });
      }

      clearObject(ctx.ccKeys, tmpExclude);
    });
    clearObject(ccContext.handlerKey_handler_);
    clearObject(ccUKey_ref_, [CC_DISPATCHER].concat(otherExcludeKeys));

    if (recomputed) {
      var computed = ccContext.computed,
          watch = ccContext.watch;
      var computedValue = computed._computedValue;
      var watchDep = watch._watchDep;
      var modules = okeys(ccContext.store._state);
      modules.forEach(function (m) {
        if (m === MODULE_CC) return;

        if (computedValue[m]) {
          // !!!先清除之前建立好的依赖关系
          ccContext.computed._computedDep[m] = makeCuDepDesc();
          initModuleComputed(m, computed._computedRaw[m]);
        }

        if (watchDep[m]) {
          // !!!先清除之前建立好的依赖关系
          watchDep[m] = makeCuDepDesc();
          initModuleWatch(m, watch._watchRaw[m]);
        }
      });
    }
  } // 这些CcFragIns随后需要被恢复


  function _pickCcFragIns() {
    var ccUKey_ref_ = ccContext.ccUKey_ref_;
    var ccFragKeys = [];
    okeys(ccUKey_ref_).forEach(function (ccKey) {
      var ref = ccUKey_ref_[ccKey];

      if (ref && ref.ctx.type === CC_FRAGMENT && ref.props.__$$regDumb !== true // 直接<CcFragment>实例化的
      && ref.__$$isMounted === true // 已挂载
      && ref.__$$isUnmounted == false // 未卸载
      ) {
          ccFragKeys.push(ccKey);
        }
    });
    return ccFragKeys;
  }

  function _clearAll() {
    clearObject(ccContext.globalStateKeys); // 在codesandbox里，按标准模式组织的代码，如果只是修改了runConcent里相关联的代码，pages目录下的configure调用不会被再次触发的
    // 所以是来自configure调用配置的模块则不参与清理，防止报错

    var toExcludedModules = okeys(ccContext.moduleName_isConfigured_).concat([MODULE_DEFAULT, MODULE_CC, MODULE_GLOBAL, MODULE_CC_ROUTER]);
    clearObject(ccContext.reducer._reducer, toExcludedModules);
    clearObject(ccContext.store._state, toExcludedModules, {});
    clearObject(ccContext.computed._computedDep, toExcludedModules);
    clearObject(ccContext.computed._computedValue, toExcludedModules);
    clearObject(ccContext.watch._watchDep, toExcludedModules);
    clearObject(ccContext.middlewares);
    clearObject(ccContext.waKey_uKeyMap_);
    clearCachedData();

    var ccFragKeys = _pickCcFragIns();

    _clearInsAssociation(false, ccFragKeys);

    return ccFragKeys;
  }

  function clearContextIfHot (clearAll) {
    if (clearAll === void 0) {
      clearAll = false;
    }

    ccContext.info.latestStartupTime = Date.now();
    var ccFragKeys = [];

    if (ccContext.isStartup) {
      if (ccContext.isHotReloadMode()) {
        if (clearAll) {
          console.warn("attention: make sure [[clearContextIfHot]] been called before app rendered!");
          justCalledByStartUp = true;
          ccFragKeys = _clearAll(clearAll);
          return ccFragKeys;
        } else {
          // 如果刚刚被startup调用，则随后的调用只是把justCalledByStartUp标记为false
          // 因为在stackblitz的 hot reload 模式下，当用户将启动cc的命令单独放置在一个脚本里，
          // 如果用户修改了启动相关文件, 则会触发 runConcent renderApp，
          // runConcent调用清理把justCalledByStartUp置为true，则renderApp这里再次触发clear时就可以不用执行了(注意确保renderApp之前，调用了clearContextIfHot)
          // 而随后只是改了某个component文件时，则只会触发 renderApp，
          // 因为之前已把justCalledByStartUp置为false，则有机会清理实例相关上下文了
          if (justCalledByStartUp) {
            justCalledByStartUp = false;
            return ccFragKeys;
          }

          _checkDispatcher();

          ccFragKeys = _pickCcFragIns(); // !!!重计算各个模块的computed结果

          _clearInsAssociation(ccContext.reComputed, ccFragKeys);

          return ccFragKeys;
        }
      } else {
        console.warn("clear failed because of not running under hot reload mode!");
        return ccFragKeys;
      }
    } else {
      //还没有启动过，泽只是标记justCalledByStartUp为true
      justCalledByStartUp = true;
      return ccFragKeys;
    }
  }

  var getRegisterOptions$1 = getRegisterOptions,
      evalState$3 = evalState;
  function initCcFrag (ref) {
    var props = ref.props;
    var registerOptions = getRegisterOptions$1(props.register);
    var module = registerOptions.module,
        renderKeyClasses = registerOptions.renderKeyClasses,
        tag = registerOptions.tag,
        lite = registerOptions.lite,
        _registerOptions$comp = registerOptions.compareProps,
        compareProps = _registerOptions$comp === void 0 ? true : _registerOptions$comp,
        setup = registerOptions.setup,
        bindCtxToMethod = registerOptions.bindCtxToMethod,
        _registerOptions$watc = registerOptions.watchedKeys,
        watchedKeys = _registerOptions$watc === void 0 ? '-' : _registerOptions$watc,
        _registerOptions$conn = registerOptions.connect,
        connect = _registerOptions$conn === void 0 ? {} : _registerOptions$conn,
        isSingle = registerOptions.isSingle,
        _registerOptions$stor = registerOptions.storedKeys,
        storedKeys = _registerOptions$stor === void 0 ? [] : _registerOptions$stor;
    var state = evalState$3(registerOptions.state);
    var ccClassKey = props.ccClassKey,
        ccKey = props.ccKey,
        _props$ccOption = props.ccOption,
        ccOption = _props$ccOption === void 0 ? {} : _props$ccOption;
    var target_watchedKeys = watchedKeys;
    var target_ccClassKey = ccClassKey;
    var target_connect = connect; //直接使用<CcFragment />构造的cc实例, 尝试提取storedKeys, 然后映射注册信息，（注：registerDumb创建的组件已在外部调用过mapRegistrationInfo）

    if (props.__$$regDumb !== true) {
      var _mapRegistrationInfo = mapRegistrationInfo(module, ccClassKey, renderKeyClasses, CC_FRAGMENT, getPassToMapWaKeys(watchedKeys), storedKeys, connect, true),
          _ccClassKey = _mapRegistrationInfo._ccClassKey,
          _connect = _mapRegistrationInfo._connect;

      target_watchedKeys = watchedKeys;
      target_ccClassKey = _ccClassKey;
      target_connect = _connect;
    } //直接使用<CcFragment />构造的cc实例，把ccOption.storedKeys当作registerStoredKeys


    buildRefCtx(ref, {
      isSingle: isSingle,
      ccKey: ccKey,
      connect: target_connect,
      state: state,
      module: module,
      storedKeys: storedKeys,
      watchedKeys: target_watchedKeys,
      tag: tag,
      ccClassKey: target_ccClassKey,
      ccOption: ccOption,
      type: CC_FRAGMENT
    }, lite);
    ref.ctx.reactSetState = makeRefSetState(ref);
    ref.ctx.reactForceUpdate = makeRefForceUpdate(ref);
    ref.__$$compareProps = compareProps; //对于concent来说，ctx在constructor里构造完成，此时就可以直接把ctx传递给beforeMount了，
    //无需在将要给废弃的componentWillMount里调用beforeMount

    beforeMount(ref, setup, bindCtxToMethod);
  }

  var justTip$1 = justTip,
      bindToWindow$1 = bindToWindow;
  var cachedLocation = '';

  function checkStartup(err) {
    var errStack = err.stack;
    var info = ccContext.info;
    var arr = errStack.split('\n');
    var len = arr.length;
    var curLocation = '';

    var tryGetLocation = function tryGetLocation(keyword, offset) {
      for (var i = 0; i < len; i++) {
        if (arr[i].includes(keyword)) {
          curLocation = arr[i + offset];
          break;
        }
      }
    };

    tryGetLocation('startup', 2); //向下2句找触发run的文件

    if (!curLocation) tryGetLocation('runConcent', 0);

    var letRunOk = function letRunOk() {
      ccContext.isHot = true;
      return clearContextIfHot(true);
    };

    var now = Date.now();
    var ccFragKeys = [],
        canStartup = true;

    if (!cachedLocation) {
      cachedLocation = curLocation;
      info.firstStartupTime = now;
      info.latestStartupTime = now;
    } else if (cachedLocation !== curLocation) {
      var tip = "invalid run api call!(it can only be called once, changing 'call run' line location in HMR will cause this error also, \n    try refresh browser to reload your app to avoid this tip)";

      if (now - info.latestStartupTime < 1000) {
        throw new Error(tip);
      } else {
        if (isOnlineEditor()) {
          ccFragKeys = letRunOk();
          cachedLocation = curLocation;
        } else {
          strictWarning(tip);
          canStartup = false;
        }
      }
    } else {
      ccFragKeys = letRunOk();
    }

    return {
      canStartup: canStartup,
      ccFragKeys: ccFragKeys
    };
  }

  function startup (_temp, _temp2) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$store = _ref.store,
        store = _ref$store === void 0 ? {} : _ref$store,
        _ref$reducer = _ref.reducer,
        reducer = _ref$reducer === void 0 ? {} : _ref$reducer,
        _ref$init = _ref.init,
        init = _ref$init === void 0 ? null : _ref$init,
        _ref$computed = _ref.computed,
        computed = _ref$computed === void 0 ? {} : _ref$computed,
        _ref$watch = _ref.watch,
        watch = _ref$watch === void 0 ? {} : _ref$watch,
        _ref$moduleSingleClas = _ref.moduleSingleClass,
        moduleSingleClass = _ref$moduleSingleClas === void 0 ? {} : _ref$moduleSingleClas;

    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$plugins = _ref2.plugins,
        plugins = _ref2$plugins === void 0 ? [] : _ref2$plugins,
        _ref2$middlewares = _ref2.middlewares,
        middlewares = _ref2$middlewares === void 0 ? [] : _ref2$middlewares,
        _ref2$isStrict = _ref2.isStrict,
        isStrict = _ref2$isStrict === void 0 ? false : _ref2$isStrict,
        _ref2$isDebug = _ref2.isDebug,
        isDebug = _ref2$isDebug === void 0 ? false : _ref2$isDebug,
        _ref2$errorHandler = _ref2.errorHandler,
        errorHandler = _ref2$errorHandler === void 0 ? null : _ref2$errorHandler,
        isHot = _ref2.isHot,
        _ref2$bindCtxToMethod = _ref2.bindCtxToMethod,
        bindCtxToMethod = _ref2$bindCtxToMethod === void 0 ? false : _ref2$bindCtxToMethod,
        _ref2$computedCompare = _ref2.computedCompare,
        computedCompare = _ref2$computedCompare === void 0 ? true : _ref2$computedCompare,
        _ref2$watchCompare = _ref2.watchCompare,
        watchCompare = _ref2$watchCompare === void 0 ? true : _ref2$watchCompare,
        _ref2$watchImmediate = _ref2.watchImmediate,
        watchImmediate = _ref2$watchImmediate === void 0 ? false : _ref2$watchImmediate,
        _ref2$alwaysGiveState = _ref2.alwaysGiveState,
        alwaysGiveState = _ref2$alwaysGiveState === void 0 ? true : _ref2$alwaysGiveState,
        _ref2$reComputed = _ref2.reComputed,
        reComputed = _ref2$reComputed === void 0 ? true : _ref2$reComputed;

    try {
      throw new Error();
    } catch (err) {
      var _checkStartup = checkStartup(err),
          canStartup = _checkStartup.canStartup,
          ccFragKeys = _checkStartup.ccFragKeys;

      if (!canStartup) return;

      try {
        console.log("%c window.name:" + window.name, 'color:green;border:1px solid green');
        justTip$1("cc version " + ccContext.info.version);
        if (isHot !== undefined) ccContext.isHot = isHot;
        ccContext.reComputed = reComputed;
        ccContext.errorHandler = errorHandler;
        var rv = ccContext.runtimeVar;
        rv.alwaysGiveState = alwaysGiveState;
        rv.isStrict = isStrict;
        rv.isDebug = isDebug;
        rv.computedCompare = computedCompare;
        rv.watchCompare = watchCompare;
        rv.watchImmediate = watchImmediate;
        rv.bindCtxToMethod = bindCtxToMethod;
        configModuleSingleClass(moduleSingleClass);
        configStoreState(store);
        configRootReducer(reducer);
        configRootComputed(computed);
        configRootWatch(watch);
        executeRootInit(init);
        configMiddlewares(middlewares);

        if (!ccContext.refs[CC_DISPATCHER]) {
          var Dispatcher = createDispatcher();
          appendDispatcher(Dispatcher);
        }

        var bindOthers = function bindOthers(bindTarget) {
          bindToWindow$1('CC_CONTEXT', ccContext, bindTarget);
          bindToWindow$1('ccc', ccContext, bindTarget);
          bindToWindow$1('cccc', ccContext.computed._computedValue, bindTarget);
          bindToWindow$1('sss', ccContext.store._state, bindTarget);
        };

        if (window.mcc) {
          setTimeout(function () {
            //延迟绑定，等待ccns的输入
            bindOthers(window.mcc[getCcNamespace()]);
          }, 1200);
        } else {
          bindOthers();
        }

        ccContext.isStartup = true; //置为已启动后，才开始配置plugins，因为plugins需要注册自己的模块，而注册模块又必需是启动后才能注册

        configPlugins(plugins); // 可以理解为类似useConcent里处理double - invoking 以及 async rendering的过程
        // 直接实例化的CcFragment需要在boot过程完毕后再次走卸载并挂载的过程，以便数据和store同步，register信息正确
        // 防止在线IDE热加载后，ui和store不同步的问题

        ccFragKeys.forEach(function (key) {
          var ref = ccContext.ccUKey_ref_[key];
          beforeUnmount(ref);
          initCcFrag(ref);
          didMount(ref);
        });
      } catch (err) {
        if (errorHandler) errorHandler(err);else throw err;
      }
    }
  }

  var isPJO$8 = isPJO,
      okeys$c = okeys,
      isObjectNull$3 = isObjectNull,
      evalState$4 = evalState;

  var pError = function pError(label) {
    throw new Error("[[run]]: param error, " + label + " " + NOT_A_JSON);
  }; // option:
  // middlewares, plugins, isStrict, isDebug, errorHandler, isHot,
  // autoCreateDispatcher, bindCtxToMethod,
  // computedCompare, watchCompare, watchImmediate, alwaysGiveState

  /**
   * run will call startup
   * @param {{ [moduleName:string]: config:{state:object|()=>object, reducer:object, watch:object, computed:object, init:object, isClassSingle:boolean} }} store
   * @param {{isStrict:boolean}} options
   */


  function _run (store, options) {
    if (store === void 0) {
      store = {};
    }

    if (options === void 0) {
      options = {};
    }

    if (!isPJO$8(store)) pError('store');
    if (!isPJO$8(options)) pError('options');
    var storeConf = {
      store: {},
      reducer: {},
      watch: {},
      computed: {},
      init: {},
      moduleSingleClass: {}
    };

    var buildStoreConf = function buildStoreConf(m, moduleConf) {
      var state = moduleConf.state,
          _moduleConf$reducer = moduleConf.reducer,
          reducer = _moduleConf$reducer === void 0 ? {} : _moduleConf$reducer,
          watch = moduleConf.watch,
          computed = moduleConf.computed,
          init = moduleConf.init,
          isClassSingle = moduleConf.isClassSingle;

      if (storeConf.store[m]) {
        throw new Error("run api error: module" + m + " duplicate");
      }

      storeConf.store[m] = evalState$4(state);
      if (typeof state === 'function') ccContext.moduleName_stateFn_[m] = state;
      storeConf.reducer[m] = reducer;
      if (watch) storeConf.watch[m] = watch;
      if (computed) storeConf.computed[m] = computed;
      if (init) storeConf.init[m] = init;
      storeConf.moduleSingleClass[m] = isClassSingle === true;
    }; // traversal moduleNames


    okeys$c(store).forEach(function (m) {
      return buildStoreConf(m, store[m]);
    }); // push by configure api

    pendingModules.forEach(function (_ref) {
      var module = _ref.module,
          config = _ref.config;
      justTip("configure pending module[" + module + "]");
      buildStoreConf(module, config);
    });
    pendingModules.length = 0; // clear pending modules

    if (isObjectNull$3(storeConf.init)) storeConf.init = null;
    startup(storeConf, options);
  }

  /****
   * @param {string} ccClassKey a cc class's name, you can register a same react class to cc with different ccClassKey,
   * but you can not register multi react class with a same ccClassKey!
   * @param {object} registerOption
   * @param {string} [registerOption.module] declare which module current cc class belong to, default is '$$default'
   * @param {Function} [registerOption.setup]
   * @param {Array<string>|string} [registerOption.watchedKeys] 
   * declare current cc class's any instance is concerned which state keys's state changing,
   * @param {{ [moduleName:string]: keys: string[] | '*' }} [registerOption.connect]
   * ```
   *    this.ctx.dispatch({type:'doStaff', payload:{foo:1, bar:2}});
   *    // or 
   *    this.ctx.dispatch('doStaff', {foo:1, bar:2});
   *    // or
   *    this.ctx.dispatch('moduleName/doStaff', {foo:1, bar:2});
   * ```
   * @param {string} [registerOption.isPropsProxy] default is false
   * cc alway use strategy of reverse inheritance to wrap your react class, that meas you can call cc instance method from `this` directly
   * but if you meet multi decorator in your legacy project and want to change it to cc, to make it still works well in cc mode,
   * you can set isPropsProxy as true, then cc will use strategy of prop proxy to wrap your react class, in this situation, 
   * all the cc instance method and property you can get them from both `this.props` and `this.`, for example
   * ```
   *    @cc.register({
   *      connect: {'form': ['regularFormSubmitting']},
   *      isPropsProxy: true 
   *    },'BasicForms')
   *    @Form.create()
   *    export default class BasicForms extends PureComponent {
   *      componentDidMount()=>{
   *        this.props.$$dispatch('form/getInitData');
   *      }
   *      render(){
   *        const {regularFormSubmitting} = this.props.$$connectedState.from;
   *      }
   *    }
   * ```
   * more details you can see https://github.com/fantasticsoul/rcc-antd-pro/blob/master/src/routes/Forms/BasicForm.js
   * @param {string} [registerOption.isSingle] default is false
   * if you only allow current cc class only initialize one time, 
   * that means there is only one cc instance can be existed for current cc class at most,
   * you can define registerOption.isSingle as true, it just like singleton mode in java coding^_^
   */

  function register$1 (registerOption, ccClassKey) {
    var _registerOption = getRegisterOptions(registerOption);

    delete _registerOption.__checkStartUp;
    delete _registerOption.__calledBy;
    return register(_registerOption, ccClassKey);
  }

  function _connect (connectSpec, ccClassKey) {
    return register$1({
      connect: connectSpec
    }, ccClassKey);
  }

  var shallowDiffers$2 = shallowDiffers;
  var nullSpan = React.createElement('span', {
    style: {
      display: 'none'
    }
  });

  var CcFragment =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(CcFragment, _React$Component);

    function CcFragment(props, context) {
      var _this;

      _this = _React$Component.call(this, props, context) || this;
      initCcFrag(_assertThisInitialized(_this));
      return _this;
    }

    var _proto = CcFragment.prototype;

    _proto.componentDidMount = function componentDidMount() {
      didMount(this);
    };

    _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
      var isPropsChanged = this.__$$compareProps ? shallowDiffers$2(getOutProps(nextProps), getOutProps(this.props)) : false;
      return this.state !== nextState || isPropsChanged;
    } // componentDidUpdate(prevProps, prevState) {
    ;

    _proto.componentDidUpdate = function componentDidUpdate() {
      didUpdate(this);
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      if (_React$Component.prototype.componentWillUnmount) _React$Component.prototype.componentWillUnmount.call(this);
      beforeUnmount(this);
    };

    _proto.render = function render() {
      //注意这里，一定要每次都取最新的绑在ctx上，确保交给renderProps的ctx参数里的state和props是最新的
      var thisProps = this.props;
      this.ctx.prevProps = this.ctx.props;
      this.ctx.props = getOutProps(thisProps);
      var children = thisProps.children,
          render = thisProps.render;
      var view = render || children;

      if (typeof view === 'function') {
        beforeRender(this);
        var __$$regDumb = thisProps.__$$regDumb,
            _thisProps$register = thisProps.register,
            register = _thisProps$register === void 0 ? {} : _thisProps$register;
        var ctx = this.ctx;

        if (__$$regDumb !== true && register.mapProps) {
          //直接使用<CcFragment />实例化
          ctx.mapped = register.mapProps(ctx) || {};
          return view(ctx.mapped) || nullSpan;
        }

        return view(ctx) || nullSpan;
      } else {
        if (React.isValidElement(view)) {
          //直接传递dom，无论state怎么改变都不会再次触发渲染
          throw new Error("CcFragment's children can not b a react dom ");
        }

        return view;
      }
    };

    return CcFragment;
  }(React.Component);

  function _registerDumb(Dumb, regOpt) {
    var ccClassKey = regOpt.ccClassKey,
        mapProps = regOpt.mapProps,
        _regOpt$props = regOpt.props,
        props = _regOpt$props === void 0 ? {} : _regOpt$props;

    var render = function render(ctx) {
      if (mapProps) {
        ctx.mapped = mapProps(ctx);
        return React.createElement(Dumb, ctx.mapped);
      } else {
        return React.createElement(Dumb, ctx);
      }
    }; //ccKey由实例化的Dumb组件props上透传下来


    var passProps = {
      __$$regDumb: true,
      props: props,
      ccOption: props.ccOption,
      ccClassKey: ccClassKey,
      render: render,
      ccKey: props.ccKey,
      register: regOpt
    };
    return React.createElement(CcFragment, passProps);
  } // renderKeyClasses, isSingle, tag, mapProps, module = MODULE_DEFAULT,
  // watchedKeys = '*', storedKeys, persistStoredKeys, render: Dumb,
  // connect = {}, state = {}, setup, bindCtxToMethod, compareProps, lite,
  // bindCtxToMethod


  function registerDumb (registerOption, ccClassKey) {
    var _registerOption = getRegisterOptions(registerOption);

    var renderKeyClasses = _registerOption.renderKeyClasses,
        module = _registerOption.module,
        _registerOption$watch = _registerOption.watchedKeys,
        watchedKeys = _registerOption$watch === void 0 ? '-' : _registerOption$watch,
        storedKeys = _registerOption.storedKeys,
        Dumb = _registerOption.render,
        _registerOption$conne = _registerOption.connect,
        connect = _registerOption$conne === void 0 ? {} : _registerOption$conne;
    var passToMapWaKeys = getPassToMapWaKeys(watchedKeys);

    var _mapRegistrationInfo = mapRegistrationInfo(module, ccClassKey, renderKeyClasses, CC_FRAGMENT, passToMapWaKeys, storedKeys, connect, true),
        _module = _mapRegistrationInfo._module,
        _ccClassKey = _mapRegistrationInfo._ccClassKey,
        _connect = _mapRegistrationInfo._connect;

    _registerOption.module = _module;
    _registerOption.watchedKeys = watchedKeys;
    _registerOption.ccClassKey = _ccClassKey;
    _registerOption.connect = _connect;

    function buildCcFragComp(Dumb) {
      //避免react dev tool显示的dom为Unknown
      var ConnectedFragment = function ConnectedFragment(props) {
        _registerOption.props = props;
        return _registerDumb(Dumb, _registerOption);
      };

      return ConnectedFragment;
    }

    if (Dumb) {
      return buildCcFragComp(Dumb);
    } else {
      return function (Dumb) {
        return buildCcFragComp(Dumb);
      };
    }
  }

  function _connectDumb (connectSpec, ccClassKey) {
    return registerDumb({
      connect: connectSpec
    }, ccClassKey);
  }

  var ccUKey_ref_$4 = ccContext.ccUKey_ref_;
  var refCursor = 1;

  function getUsableCursor() {
    return refCursor;
  }

  function incCursor() {
    refCursor = refCursor + 1;
  }

  function CcHook(state, hookSetter, props) {
    //new CcHook时，这里锁定的hookSetter就是后面一直可以用的setter
    //如果存在期一直替换hookSetter，反倒会造成打开react-dev-tool，点击面板里的dom后，视图便不再更新的bug
    this.setState = hookSetter;
    this.forceUpdate = hookSetter;
    this.state = state;
    this.isFirstRendered = true;
    this.props = props;
  } // rState: resolvedState, iState: initialState


  function buildRef(ref, refKeyContainer, rState, iState, regOpt, hookState, hookSetter, props, extra, ccClassKey) {
    // when single file demo in hmr mode trigger buildRef, rState is 0 
    // so here call evalState again
    var state = rState || evalState(iState);
    var bindCtxToMethod = regOpt.bindCtxToMethod;
    var renderKeyClasses = regOpt.renderKeyClasses,
        module = regOpt.module,
        _regOpt$watchedKeys = regOpt.watchedKeys,
        watchedKeys = _regOpt$watchedKeys === void 0 ? '-' : _regOpt$watchedKeys,
        _regOpt$storedKeys = regOpt.storedKeys,
        storedKeys = _regOpt$storedKeys === void 0 ? [] : _regOpt$storedKeys,
        _regOpt$connect = regOpt.connect,
        connect = _regOpt$connect === void 0 ? {} : _regOpt$connect,
        setup = regOpt.setup,
        lite = regOpt.lite;
    incCursor();

    var _mapRegistrationInfo = mapRegistrationInfo(module, ccClassKey, renderKeyClasses, CC_HOOK, getPassToMapWaKeys(watchedKeys), storedKeys, connect, true),
        _module = _mapRegistrationInfo._module,
        _ccClassKey = _mapRegistrationInfo._ccClassKey,
        _connect = _mapRegistrationInfo._connect;

    var hookRef = ref || new CcHook(hookState, hookSetter, props);
    var params = Object.assign({}, regOpt, {
      module: _module,
      watchedKeys: watchedKeys,
      state: state,
      type: CC_HOOK,
      ccClassKey: _ccClassKey,
      connect: _connect,
      ccOption: props.ccOption
    });
    hookRef.props = props; // keep shape same as class

    buildRefCtx(hookRef, params, lite); // in buildRefCtx cc will assign hookRef.props to ctx.prevProps

    hookRef.ctx.reactSetState = makeRefSetState(hookRef);
    hookRef.ctx.reactForceUpdate = makeRefForceUpdate(hookRef);
    var refCtx = hookRef.ctx;
    refCtx.props = props; // attach props to ctx

    refCtx.extra = extra; // attach extra before setup process

    beforeMount(hookRef, setup, bindCtxToMethod); // cursor_refKey_[cursor] = hookRef.ctx.ccUniqueKey;

    refKeyContainer.current = hookRef.ctx.ccUniqueKey; // rewrite useRef for CcHook

    refCtx.useRef = function useR(refName) {
      //give named function to avoid eslint error
      var ref = React.useRef(null);
      refCtx.refs[refName] = ref;
      return ref;
    };

    return hookRef;
  }

  function replaceSetter(ctx, hookSetter) {
    ctx.__boundSetState = hookSetter;
    ctx.__boundForceUpdate = hookSetter;
  }

  var tip = 'react version is LTE 16.8'; //写为具名函数，防止react devtoo里显示.default

  function useConcent(registerOption, ccClassKey) {
    var _registerOption = getRegisterOptions(registerOption); // here not allow user pass extra as undefined, it will been given value {} implicitly if pass undefined!!!


    var _registerOption$state = _registerOption.state,
        iState = _registerOption$state === void 0 ? {} : _registerOption$state,
        _registerOption$props = _registerOption.props,
        props = _registerOption$props === void 0 ? {} : _registerOption$props,
        mapProps = _registerOption.mapProps,
        _registerOption$layou = _registerOption.layoutEffect,
        layoutEffect = _registerOption$layou === void 0 ? false : _registerOption$layou,
        _registerOption$extra = _registerOption.extra,
        extra = _registerOption$extra === void 0 ? {} : _registerOption$extra;
    var reactUseState = React.useState;

    if (!reactUseState) {
      throw new Error(tip);
    }

    var cursor = getUsableCursor();

    var _reactUseState = reactUseState(cursor),
        lockedCursor = _reactUseState[0];

    var isFirstRendered = lockedCursor === cursor;
    var state = isFirstRendered ? evalState(iState) : 0;

    var _reactUseState2 = reactUseState(state),
        hookState = _reactUseState2[0],
        hookSetter = _reactUseState2[1];

    var refKeyContainer = React.useRef(null);

    var cref = function cref(ref) {
      return buildRef(ref, refKeyContainer, state, iState, _registerOption, hookState, hookSetter, props, extra, ccClassKey);
    };

    var hookRef;

    if (isFirstRendered) {
      hookRef = cref();
    } else {
      hookRef = ccUKey_ref_$4[refKeyContainer.current];

      if (!hookRef) {
        // single file demo in hot reload mode
        hookRef = cref();
      } else {
        var _refCtx = hookRef.ctx;
        _refCtx.prevProps = _refCtx.props;
        hookRef.props = _refCtx.props = props;
        _refCtx.extra = extra;
      }
    }

    var refCtx = hookRef.ctx; // ???does user really need beforeMount,mounted,beforeUpdate,updated,beforeUnmount in setup???

    var effectHandler = layoutEffect ? React.useLayoutEffect : React.useEffect; //after every render

    effectHandler(function () {
      if (!hookRef.isFirstRendered) {
        // mock componentDidUpdate
        didUpdate(hookRef);
      }

      replaceSetter(refCtx, hookSetter);
    }); //after first render

    effectHandler(function () {
      // mock componentDidMount
      // 正常情况走到这里应该是true，如果是false，则是热加载情况下的hook行为，此前已走了一次beforeUnmount
      // 需要走重新初始化当前组件的整个流程，否则热加载时的setup等参数将无效，只是不需要再次创建ref
      if (hookRef.isFirstRendered === false) {
        cref(hookRef);
      } else {
        hookRef.isFirstRendered = false;
      }

      replaceSetter(refCtx, hookSetter);
      didMount(hookRef);
      return function () {
        // mock componentWillUnmount
        beforeUnmount(hookRef);
      };
    }, []); // before every render

    if (mapProps) {
      var mapped = mapProps(refCtx);

      if (!isPJO(mapped)) {
        throw new Error("mapProps ret " + NOT_A_JSON);
      }

      refCtx.mapped = mapped;
    }

    beforeRender(hookRef);
    return refCtx;
  }

  function registerHookComp(options, ccClassKey) {
    var _options = getRegisterOptions(options);

    if (typeof _options.state === 'function') {
      _options.state = _options.state();
    }

    function buildCcHookComp(Dumb) {
      var _options$memo = _options.memo,
          memo = _options$memo === void 0 ? true : _options$memo;
      delete _options.memo;

      var getComp = function getComp() {
        return function CcHookComp(props) {
          _options.props = props;
          var ctx = useConcent(_options, ccClassKey); // 和registerDumb保持一致，如果定义了mapProps，传递mapProps的结果给Dumb

          if (_options.mapProps) {
            return React.createElement(Dumb, ctx.mapped);
          } else {
            return React.createElement(Dumb, ctx);
          }
        };
      };

      if (memo && React.memo) {
        return React.memo(getComp());
      } else {
        return getComp();
      }
    }

    var Dumb = _options.render;

    if (Dumb) {
      return buildCcHookComp(Dumb);
    } else {
      return function (Dumb) {
        return buildCcHookComp(Dumb);
      };
    }
  }

  /****
   * if you are sure the input state is really belong to global state, call cc.setGlobalState,
   * note! cc will filter the input state to meet global state shape and only pass the filtered state to global module
   */

  function setGlobalState (state, cb, delay, idt, throwError) {
    if (throwError === void 0) {
      throwError = false;
    }

    try {
      var ref = pickOneRef();
      ref.ctx.setGlobalState(state, cb, delay, idt);
    } catch (err) {
      if (throwError) throw err;else justWarning(err.message);
    }
  }

  function throwApiCallError() {
    throw new Error("api doc: cc.setState(module:string, state:object, renderKey:string, delayMs?:number, skipMiddleware?:boolean, throwError?:boolean)");
  }

  function _setState (module, state, renderKey, delayMs, skipMiddleware, throwError) {
    if (delayMs === void 0) {
      delayMs = -1;
    }

    if (throwError === void 0) {
      throwError = false;
    }

    if (module === undefined && state === undefined) {
      throwApiCallError();
    }

    if (typeof module !== 'string') {
      throwApiCallError();
    }

    setState$1(module, state, renderKey, delayMs, skipMiddleware, throwError);
  }

  function _set (moduledKeyPath, val, renderKey, delay) {
    var dispatcher = pickOneRef();
    dispatcher.ctx.set(moduledKeyPath, val, renderKey, delay);
  }

  var getState$6 = (function (module) {
    return ccContext.store.getState(module);
  });

  function _setValue (moduledKeyPath, val) {
    if (!moduledKeyPath.includes('/')) {
      throw new Error("keyPath must start with module");
    }

    var _moduledKeyPath$split = moduledKeyPath.split('/'),
        targetModule = _moduledKeyPath$split[0];

    var fullState = getState$6(targetModule);

    var _extractStateByCcsync = extractStateByCcsync(moduledKeyPath, val, false, fullState, false),
        state = _extractStateByCcsync.state;

    return state;
  }

  var getGlobalState = ccContext.store.getGlobalState;

  var _computedValue$5 = ccContext.computed._computedValue;
  var _getComputed = (function (module) {
    if (module) return _computedValue$5[module];else return _computedValue$5;
  });

  function _emit (event) {
    if (event === undefined) {
      throw new Error("api doc: cc.emit(event:string|{name:string, identity?:string, ctx?:boolean}, ...args)");
    }

    try {
      var _ref$ctx;

      var ref = pickOneRef();

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      (_ref$ctx = ref.ctx).emit.apply(_ref$ctx, [event].concat(args));
    } catch (err) {
      justWarning(err);
    }
  }

  function _off (event, option) {
    try {
      var ref = pickOneRef();
      ref.ctx.off(event, option);
    } catch (err) {
      if (option.throwError) throw err;else justWarning(err.message);
    }
  }

  var ccUKey_ref_$5 = ccContext.ccUKey_ref_,
      ccClassKey_ccClassContext_$6 = ccContext.ccClassKey_ccClassContext_;
  function getRefsByClassKey (ccClassKey) {
    var refs = [];
    var ccClassContext = ccClassKey_ccClassContext_$6[ccClassKey];

    if (!ccClassContext) {
      return refs;
    }

    var ccKeys = ccClassContext.ccKeys;
    ccKeys.forEach(function (k) {
      var ref = ccUKey_ref_$5[k];
      if (ref) refs.push(ref);
    });
    return refs;
  }

  var _execute = (function (ccClassKey) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var refs = getRefsByClassKey(ccClassKey);
    refs.forEach(function (ref) {
      var _ref$ctx;

      if (ref.__$$isUnmounted) return;
      if (ref.ctx.execute) (_ref$ctx = ref.ctx).execute.apply(_ref$ctx, args);
    });
  });

  function getRefs () {
    var refs = [];
    var ccUKey_ref_ = ccContext.ccUKey_ref_;
    var ccKeys = okeys(ccUKey_ref_);
    ccKeys.forEach(function (k) {
      var ref = ccUKey_ref_[k];
      if (ref && !ref.__$$isUnmounted) refs.push(ref);
    });
    return refs;
  }

  var _executeAll = (function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var refs = getRefs();
    refs.forEach(function (ref) {
      var _ref$ctx;

      if (ref.ctx.execute) (_ref$ctx = ref.ctx).execute.apply(_ref$ctx, args);
    });
  });

  var ccClassKey_ccClassContext_$7 = ccContext.ccClassKey_ccClassContext_;
  var _getConnectedState = (function (ccClassKey) {
    var ctx = ccClassKey_ccClassContext_$7[ccClassKey];
    return ctx.connectedState || {};
  });

  var appendState = ccContext.store.appendState;

  var _caller$1 = ccContext.reducer._caller;

  var cloneModule = _cloneModule;
  var run = _run;
  var connect = _connect;
  var connectDumb = _connectDumb;
  var register$2 = register$1;
  var registerDumb$1 = registerDumb;
  var registerHookComp$1 = registerHookComp;
  var configure$1 = configure;
  var setGlobalState$1 = setGlobalState;
  var setState$2 = _setState;
  var set = _set;
  var setValue$1 = _setValue;
  var getState$7 = getState$6;
  var getGlobalState$1 = getGlobalState;
  var getConnectedState = _getConnectedState;
  var getComputed = _getComputed;
  var emit = _emit;
  var off = _off;
  var dispatch$2 = dispatch;
  var ccContext$1 = ccContext;
  var createDispatcher$1 = createDispatcher;
  var execute = _execute;
  var executeAll = _executeAll;
  var getRefs$1 = getRefs;
  var reducer = _caller$1;
  var clearContextIfHot$1 = clearContextIfHot;
  var CcFragment$1 = CcFragment;
  var cst = _cst;
  var appendState$1 = appendState;
  var useConcent$1 = useConcent;
  var defComputed = function defComputed(fn, depKeys, compare) {
    return {
      fn: fn,
      depKeys: depKeys,
      compare: compare
    };
  };
  var defLazyComputed = function defLazyComputed(fn, depKeys, compare) {
    return {
      fn: fn,
      depKeys: depKeys,
      compare: compare,
      lazy: true
    };
  };
  var defComputedVal = function defComputedVal(val, compare) {
    if (compare === void 0) {
      compare = true;
    }

    return {
      fn: function fn() {
        return val;
      },
      depKeys: [],
      compare: compare
    };
  };
  var defWatch = function defWatch(fn, depKeys, compare, immediate) {
    return {
      fn: fn,
      depKeys: depKeys,
      compare: compare,
      immediate: immediate
    };
  };
  var defWatchImmediate = function defWatchImmediate(fn, depKeys, compare) {
    return {
      fn: fn,
      depKeys: depKeys,
      compare: compare,
      immediate: true
    };
  };
  var defaultExport = {
    cloneModule: cloneModule,
    emit: emit,
    off: off,
    connect: connect,
    connectDumb: connectDumb,
    register: register$2,
    registerDumb: registerDumb$1,
    registerHookComp: registerHookComp$1,
    configure: configure$1,
    dispatch: dispatch$2,
    run: run,
    setGlobalState: setGlobalState$1,
    setState: setState$2,
    set: set,
    setValue: setValue$1,
    getGlobalState: getGlobalState$1,
    getState: getState$7,
    getComputed: getComputed,
    getConnectedState: getConnectedState,
    ccContext: ccContext$1,
    createDispatcher: createDispatcher$1,
    execute: execute,
    executeAll: executeAll,
    getRefs: getRefs$1,
    reducer: reducer,
    clearContextIfHot: clearContextIfHot$1,
    CcFragment: CcFragment$1,
    cst: cst,
    appendState: appendState$1,
    useConcent: useConcent$1,
    bindCcToMcc: bindCcToMcc,
    defComputed: defComputed,
    defLazyComputed: defLazyComputed,
    defComputedVal: defComputedVal,
    defWatch: defWatch,
    defWatchImmediate: defWatchImmediate
  };
  function bindCcToMcc(name) {
    if (!multiCcContainer) {
      throw new Error('current env is not multi concent ins mode');
    }

    if (multiCcContainer[name]) {
      throw new Error("ccNamespace[" + name + "] already existed in window.mcc");
    }

    setCcNamespace(name);
    bindToWindow(name, defaultExport, multiCcContainer);
  }

  function avoidMultiCcInSameScope() {
    var winCc = getWinCc();

    if (winCc) {
      if (winCc.ccContext && winCc.ccContext.info) {
        var existedVersion = winCc.ccContext.info.version;
        var nowVersion = ccContext$1.info.version; //webpack-dev-server模式下，有些引用了concent的插件或者中间件模块，如果和当前concent版本不一致的话，会保留另外一个concent在其包下
        //路径如 node_modules/concent-middleware-web-devtool/node_modules/concent（注，在版本一致时，不会出现此问题）
        //这样的就相当于隐形的实例化两个concent 上下文，这是不允许的

        if (existedVersion !== nowVersion) {
          throw new Error("a existed version concent " + existedVersion + " is different with current about to import concent " + nowVersion + ", \n        it may caused by some of your concent-eco-module with older version concent, please reinstall them (concent-*** module)");
        }
      }
    }
  } // 微前端机构里，每个子应用都有自己的cc实例，需要绑定到mcc下，防止相互覆盖


  var multiCcContainer = window.mcc;

  if (multiCcContainer) {
    // 1秒后concent会检查ccns，如果不存在，说明用户忘记调用bindCcToMcc了
    setTimeout(function () {
      var ccns = getCcNamespace();

      if (!ccns) {
        throw new Error('detect window.mcc, but user forget call bindCcToMcc in bundle entry');
      } else {
        avoidMultiCcInSameScope();
      }
    }, 1000);
  } else {
    avoidMultiCcInSameScope();
    bindToWindow('cc', defaultExport);
  }

  exports.cloneModule = cloneModule;
  exports.run = run;
  exports.connect = connect;
  exports.connectDumb = connectDumb;
  exports.register = register$2;
  exports.registerDumb = registerDumb$1;
  exports.registerHookComp = registerHookComp$1;
  exports.configure = configure$1;
  exports.setGlobalState = setGlobalState$1;
  exports.setState = setState$2;
  exports.set = set;
  exports.setValue = setValue$1;
  exports.getState = getState$7;
  exports.getGlobalState = getGlobalState$1;
  exports.getConnectedState = getConnectedState;
  exports.getComputed = getComputed;
  exports.emit = emit;
  exports.off = off;
  exports.dispatch = dispatch$2;
  exports.ccContext = ccContext$1;
  exports.createDispatcher = createDispatcher$1;
  exports.execute = execute;
  exports.executeAll = executeAll;
  exports.getRefs = getRefs$1;
  exports.reducer = reducer;
  exports.clearContextIfHot = clearContextIfHot$1;
  exports.CcFragment = CcFragment$1;
  exports.cst = cst;
  exports.appendState = appendState$1;
  exports.useConcent = useConcent$1;
  exports.defComputed = defComputed;
  exports.defLazyComputed = defLazyComputed;
  exports.defComputedVal = defComputedVal;
  exports.defWatch = defWatch;
  exports.defWatchImmediate = defWatchImmediate;
  exports.bindCcToMcc = bindCcToMcc;
  exports.default = defaultExport;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
