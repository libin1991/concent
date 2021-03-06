"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = _default;

var _constant = require("../../support/constant");

var _ccContext = _interopRequireDefault(require("../../cc-context"));

var util = _interopRequireWildcard(require("../../support/util"));

var ccRef = _interopRequireWildcard(require("../ref"));

var hf = _interopRequireWildcard(require("../state/handler-factory"));

var ev = _interopRequireWildcard(require("../event"));

var _computeCcUniqueKey = _interopRequireDefault(require("./compute-cc-unique-key"));

var _sync3 = _interopRequireDefault(require("./sync"));

var _changeRefState = _interopRequireDefault(require("../state/change-ref-state"));

var _getDefineWatchHandler = _interopRequireDefault(require("../watch/get-define-watch-handler"));

var _getDefineComputedHandler = _interopRequireDefault(require("../computed/get-define-computed-handler"));

var _getOutProps = _interopRequireDefault(require("./get-out-props"));

var refStore = _ccContext["default"].refStore,
    ccClassKey_ccClassContext_ = _ccContext["default"].ccClassKey_ccClassContext_,
    getState = _ccContext["default"].store.getState,
    moduleName_ccClassKeys_ = _ccContext["default"].moduleName_ccClassKeys_,
    _computedValue = _ccContext["default"].computed._computedValue;
var okeys = util.okeys,
    me = util.makeError,
    vbi = util.verboseInfo;
var idSeq = 0;

function getEId() {
  idSeq++;
  return Symbol("__autoGen_" + idSeq + "__");
} //调用buildFragmentRefCtx 之前，props参数已被处理过

/**
 * 构建refCtx，附加到ref.cc上
 * liteLevel 越小，绑定的方法越少
 */


function _default(ref, params, liteLevel) {
  if (liteLevel === void 0) {
    liteLevel = 3;
  }

  var reactSetState = ref.setState.bind(ref);
  var reactForceUpdate = ref.forceUpdate.bind(ref);
  var isSingle = params.isSingle,
      ccClassKey = params.ccClassKey,
      ccKey = params.ccKey,
      module = params.module,
      reducerModule = params.reducerModule,
      type = params.type,
      _params$state = params.state,
      state = _params$state === void 0 ? {} : _params$state,
      storedKeys = params.storedKeys,
      watchedKeys = params.watchedKeys,
      connect = params.connect,
      tag = params.tag,
      ccOption = params.ccOption;
  reducerModule = reducerModule || module;
  var stateModule = module; //用户使用ccKey属性的话，必需显示的指定ccClassKey

  if (ccKey && !ccClassKey) {
    throw new Error("missing ccClassKey while init a cc ins with ccKey[" + ccKey + "]");
  }

  var _storedKeys = [];

  if (storedKeys !== undefined && storedKeys.length > 0) {
    if (!ccKey) throw me(_constant.ERR.CC_STORED_KEYS_NEED_CCKEY, vbi("ccClassKey[" + ccClassKey + "]"));
    _storedKeys = storedKeys;
  }

  var ccUniqueKey = (0, _computeCcUniqueKey["default"])(isSingle, ccClassKey, ccKey, tag);
  var classCtx = ccClassKey_ccClassContext_[ccClassKey];
  var connectedComputed = classCtx.connectedComputed || {};
  var connectedState = classCtx.connectedState || {};
  var moduleState = getState(module);
  var moduleComputed = _computedValue[module] || {};
  var globalComputed = _computedValue[_constant.MODULE_GLOBAL] || {};
  var globalState = getState(_constant.MODULE_GLOBAL);
  var refConnectedComputed = {};
  okeys(connect).forEach(function (moduleName) {
    refConnectedComputed[moduleName] = {};
  }); // recover ref state

  var refStoredState = refStore._state[ccUniqueKey] || {};
  var mergedState = Object.assign({}, state, refStoredState, moduleState);
  ref.state = mergedState; // record ref

  ccRef.setRef(ref, isSingle, ccClassKey, ccKey, ccUniqueKey, {}); // record ccClassKey

  var ccClassKeys = util.safeGetArrayFromObject(moduleName_ccClassKeys_, module);
  if (!ccClassKeys.includes(ccClassKey)) ccClassKeys.push(ccClassKey); // create cc api

  var _setState = function _setState(module, state, calledBy, reactCallback, delay, identity) {
    (0, _changeRefState["default"])(state, {
      calledBy: calledBy,
      ccKey: ccKey,
      ccUniqueKey: ccUniqueKey,
      module: module,
      delay: delay,
      identity: identity,
      reactCallback: reactCallback
    }, ref);
  };

  var setGlobalState = function setGlobalState(state, reactCallback, delay, identity) {
    _setState(_constant.MODULE_GLOBAL, state, _constant.SET_STATE, reactCallback, delay, identity);
  };

  var setModuleState = function setModuleState(module, state, reactCallback, delay, identity) {
    _setState(module, state, _constant.SET_MODULE_STATE, reactCallback, delay, identity);
  }; // const setState = (state, reactCallback, delay, identity) => {


  var setState = function setState(p1, p2, p3, p4, p5) {
    if (typeof p1 === 'string') {
      //p1 module, p2 state, p3 cb, p4 delay, p5 idt
      setModuleState(p1, p2, p3, p4, p5);
    } else {
      //p1 state, p2 cb, p3 delay, p4 idt
      _setState(stateModule, p1, _constant.SET_STATE, p2, p3, p4);
    }
  };

  var forceUpdate = function forceUpdate(reactCallback, delay, identity) {
    _setState(stateModule, ref.state, _constant.FORCE_UPDATE, reactCallback, delay, identity);
  };

  var changeState = function changeState(state, option) {
    (0, _changeRefState["default"])(state, option, ref);
  };

  var dispatch = hf.makeDispatchHandler(ref, false, ccKey, ccUniqueKey, ccClassKey, stateModule, stateModule);
  var lazyDispatch = hf.makeDispatchHandler(ref, true, ccKey, ccUniqueKey, ccClassKey, stateModule, stateModule);
  var invoke = hf.makeInvokeHandler(ref, ccKey, ccUniqueKey, ccClassKey);
  var lazyInvoke = hf.makeInvokeHandler(ref, ccKey, ccUniqueKey, ccClassKey, {
    isLazy: true
  });

  var syncBool = function syncBool(e, delay, idt) {
    var _sync$bind;

    if (delay === void 0) {
      delay = -1;
    }

    if (idt === void 0) {
      idt = '';
    }

    if (typeof e === 'string') return _sync3["default"].bind(null, (_sync$bind = {}, _sync$bind[_constant.CCSYNC_KEY] = e, _sync$bind.type = 'bool', _sync$bind.delay = delay, _sync$bind.idt = idt, _sync$bind), ref);
    (0, _sync3["default"])({
      type: 'bool'
    }, e, ref);
  };

  var sync = function sync(e, val, delay, idt) {
    var _sync$bind2;

    if (delay === void 0) {
      delay = -1;
    }

    if (idt === void 0) {
      idt = '';
    }

    if (typeof e === 'string') return _sync3["default"].bind(null, (_sync$bind2 = {}, _sync$bind2[_constant.CCSYNC_KEY] = e, _sync$bind2.type = 'val', _sync$bind2.val = val, _sync$bind2.delay = delay, _sync$bind2.idt = idt, _sync$bind2), ref);
    (0, _sync3["default"])({
      type: 'val'
    }, ref, e); //allow <input data-ccsync="foo/f1" onChange={ctx.sync} />
  };

  var set = function set(ccsync, val, delay, idt) {
    var _sync;

    (0, _sync3["default"])((_sync = {}, _sync[_constant.CCSYNC_KEY] = ccsync, _sync.type = 'val', _sync.val = val, _sync.delay = delay, _sync.idt = idt, _sync), ref);
  };

  var setBool = function setBool(ccsync, delay, idt) {
    var _sync2;

    if (delay === void 0) {
      delay = -1;
    }

    if (idt === void 0) {
      idt = '';
    }

    (0, _sync3["default"])((_sync2 = {}, _sync2[_constant.CCSYNC_KEY] = ccsync, _sync2.type = 'bool', _sync2.delay = delay, _sync2.idt = idt, _sync2), ref);
  };

  var syncInt = function syncInt(e, delay, idt) {
    var _sync$bind3;

    if (delay === void 0) {
      delay = -1;
    }

    if (idt === void 0) {
      idt = '';
    }

    if (typeof e === 'string') return _sync3["default"].bind(null, (_sync$bind3 = {}, _sync$bind3[_constant.CCSYNC_KEY] = e, _sync$bind3.type = 'int', _sync$bind3.delay = delay, _sync$bind3.idt = idt, _sync$bind3), ref);
    (0, _sync3["default"])({
      type: 'int'
    }, ref, e);
  };

  var emit = function emit(event) {
    var _event = ev.getEventItem(event, stateModule, ccClassKey);

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    ev.findEventHandlersToPerform.apply(ev, [_event].concat(args));
  };

  var off = function off(event, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        module = _ref.module,
        ccClassKey = _ref.ccClassKey,
        identity = _ref.identity;

    ev.findEventHandlersToOff(event, {
      module: module,
      ccClassKey: ccClassKey,
      identity: identity
    });
  };

  var on = function on(event, handler, identity) {
    if (identity === void 0) {
      identity = null;
    }

    ev.bindEventHandlerToCcContext(stateModule, ccClassKey, ccUniqueKey, event, identity, handler);
  };

  var effectItems = []; // {fn:function, status:0, eId:'', immediate:true}

  var eid_effectReturnCb_ = {}; // fn

  var effectMeta = {
    effectItems: effectItems,
    eid_effectReturnCb_: eid_effectReturnCb_
  };

  var defineEffect = function defineEffect(fn, stateKeys, eId, immediate) {
    if (immediate === void 0) {
      immediate = true;
    }

    if (typeof fn !== 'function') throw new Error('type of defineEffect first param must be function');

    if (stateKeys !== null && stateKeys !== undefined) {
      if (!Array.isArray(stateKeys)) throw new Error('type of defineEffect second param must be one of them(array, null, undefined)');
    }

    var _eId = eId || getEId(); // const effectItem = { fn: _fn, stateKeys, status: EFFECT_AVAILABLE, eId: _eId, immediate };


    var effectItem = {
      fn: fn,
      stateKeys: stateKeys,
      eId: _eId,
      immediate: immediate
    };
    effectItems.push(effectItem);
  };

  var aux = {},
      watchFns = {},
      computedFns = {};
  var immediateWatchKeys = [];
  var ctx = {
    // static params
    type: type,
    module: module,
    reducerModule: reducerModule,
    ccClassKey: ccClassKey,
    ccKey: ccKey,
    ccUniqueKey: ccUniqueKey,
    renderCount: 1,
    initTime: Date.now(),
    storedKeys: _storedKeys,
    watchedKeys: watchedKeys,
    connect: connect,
    ccOption: ccOption,
    props: (0, _getOutProps["default"])(ref.props),
    prevState: Object.assign({}, mergedState),
    // state
    state: mergedState,
    moduleState: moduleState,
    globalState: globalState,
    connectedState: connectedState,
    // computed
    refComputed: {},
    refConnectedComputed: refConnectedComputed,
    moduleComputed: moduleComputed,
    globalComputed: globalComputed,
    connectedComputed: connectedComputed,
    //collect CcHook mapProps result
    mapped: {},
    // api meta data
    watchFns: watchFns,
    computedFns: computedFns,
    immediateWatchKeys: immediateWatchKeys,
    watchSpec: {},
    computedSpec: {},
    execute: null,
    reducer: {},
    lazyReducer: {},
    aux: aux,
    // auxiliary method map
    effectMeta: effectMeta,
    // api
    reactSetState: reactSetState,
    reactForceUpdate: reactForceUpdate,
    setState: setState,
    setGlobalState: setGlobalState,
    setModuleState: setModuleState,
    forceUpdate: forceUpdate,
    changeState: changeState,
    dispatch: dispatch,
    lazyDispatch: lazyDispatch,
    invoke: invoke,
    lazyInvoke: lazyInvoke,
    syncBool: syncBool,
    sync: sync,
    set: set,
    setBool: setBool,
    syncInt: syncInt,
    emit: emit,
    on: on,
    off: off,
    defineEffect: defineEffect,
    // alias
    effect: defineEffect,
    __$$ccForceUpdate: hf.makeCcForceUpdateHandler(ref),
    __$$ccSetState: hf.makeCcSetStateHandler(ref)
  };

  ctx.defineExecute = function (handler) {
    return ctx.execute = handler;
  };

  var defineWatch = (0, _getDefineWatchHandler["default"])(ctx, watchFns, immediateWatchKeys);
  var defineComputed = (0, _getDefineComputedHandler["default"])(ctx, computedFns);

  var defineAuxMethod = function defineAuxMethod(methodName, handler) {
    return ctx.aux[methodName] = handler;
  }; // api


  ctx.defineWatch = defineWatch;
  ctx.defineComputed = defineComputed;
  ctx.defineAuxMethod = defineAuxMethod; // alias

  ctx.watch = defineWatch;
  ctx.computed = defineComputed;
  ref.ctx = ctx;
  ref.setState = setState;
  ref.forceUpdate = forceUpdate;
}