"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = _default;

var util = _interopRequireWildcard(require("../../support/util"));

var cst = _interopRequireWildcard(require("../../support/constant"));

var _privConstant = require("../../support/priv-constant");

var _runLater = _interopRequireDefault(require("../base/run-later"));

var _ccContext = _interopRequireDefault(require("../../cc-context"));

var _extractStateByKeys4 = _interopRequireDefault(require("../state/extract-state-by-keys"));

var _watchKeyForRef = _interopRequireDefault(require("../watch/watch-key-for-ref"));

var _computeValueForRef = _interopRequireDefault(require("../computed/compute-value-for-ref"));

var _findUpdateRefs2 = _interopRequireDefault(require("../ref/find-update-refs"));

var _plugin = require("../plugin");

var isPJO = util.isPJO,
    justWarning = util.justWarning,
    isObjectNotNull = util.isObjectNotNull,
    computeFeature = util.computeFeature,
    okeys = util.okeys;
var FOR_ONE_INS_FIRSTLY = cst.FOR_ONE_INS_FIRSTLY,
    FOR_ALL_INS_OF_A_MOD = cst.FOR_ALL_INS_OF_A_MOD,
    FORCE_UPDATE = cst.FORCE_UPDATE,
    SET_STATE = cst.SET_STATE,
    SET_MODULE_STATE = cst.SET_MODULE_STATE,
    INVOKE = cst.INVOKE,
    SYNC = cst.SYNC,
    SIG_STATE_CHANGED = cst.SIG_STATE_CHANGED,
    RENDER_NO_OP = cst.RENDER_NO_OP,
    RENDER_BY_KEY = cst.RENDER_BY_KEY,
    RENDER_BY_STATE = cst.RENDER_BY_STATE;
var _ccContext$store = _ccContext["default"].store,
    setState = _ccContext$store.setState,
    getPrevState = _ccContext$store.getPrevState,
    middlewares = _ccContext["default"].middlewares,
    ccClassKey_ccClassContext_ = _ccContext["default"].ccClassKey_ccClassContext_,
    refStore = _ccContext["default"].refStore,
    moduleName_stateKeys_ = _ccContext["default"].moduleName_stateKeys_; //触发修改状态的实例所属模块和目标模块不一致的时候，stateFor是FOR_ALL_INS_OF_A_MOD

function getStateFor(targetModule, refModule) {
  return targetModule === refModule ? FOR_ONE_INS_FIRSTLY : FOR_ALL_INS_OF_A_MOD;
}

function getActionType(calledBy, type) {
  if ([FORCE_UPDATE, SET_STATE, SET_MODULE_STATE, INVOKE, SYNC].includes(calledBy)) {
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
            justWarning("found one middleware is not a function");
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


function _default(state, _temp, targetRef) {
  var _ref = _temp === void 0 ? {} : _temp,
      module = _ref.module,
      _ref$skipMiddleware = _ref.skipMiddleware,
      skipMiddleware = _ref$skipMiddleware === void 0 ? false : _ref$skipMiddleware,
      payload = _ref.payload,
      reactCallback = _ref.reactCallback,
      type = _ref.type,
      _ref$calledBy = _ref.calledBy,
      calledBy = _ref$calledBy === void 0 ? SET_STATE : _ref$calledBy,
      _ref$fnName = _ref.fnName,
      fnName = _ref$fnName === void 0 ? '' : _ref$fnName,
      _ref$renderKey = _ref.renderKey,
      renderKey = _ref$renderKey === void 0 ? '' : _ref$renderKey,
      _ref$delay = _ref.delay,
      delay = _ref$delay === void 0 ? -1 : _ref$delay;

  if (state === undefined) return;

  if (!isPJO(state)) {
    justWarning("your committed state " + _privConstant.NOT_A_JSON);
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

  var passedCtx = stateFor === FOR_ONE_INS_FIRSTLY ? targetRef.ctx : null;
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
    if (renderType === RENDER_NO_OP && !sharedState) {} else {
      (0, _plugin.send)(SIG_STATE_CHANGED, {
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
  stateFor !== FOR_ONE_INS_FIRSTLY || //确保forceUpdate能够刷新cc实例，因为state可能是{}，此时用户调用forceUpdate也要触发render
  calledBy !== FORCE_UPDATE && !isObjectNotNull(state)) {
    if (reactCallback) reactCallback(refState);
    return next && next(RENDER_NO_OP, state);
  }

  var stateModule = refCtx.module,
      storedKeys = refCtx.storedKeys,
      ccUniqueKey = refCtx.ccUniqueKey;
  var renderType = RENDER_BY_STATE;

  if (renderKey) {
    //if user specify renderKey
    renderType = RENDER_BY_KEY;

    if (refCtx.renderKey !== renderKey) {
      // current instance can been rendered only if current instance's ccKey equal renderKey
      return next && next(RENDER_NO_OP, state);
    }
  }

  if (storedKeys.length > 0) {
    var _extractStateByKeys = (0, _extractStateByKeys4["default"])(state, storedKeys),
        partialState = _extractStateByKeys.partialState,
        isStateEmpty = _extractStateByKeys.isStateEmpty;

    if (!isStateEmpty) {
      if (refCtx.persistStoredKeys === true) {
        var _extractStateByKeys2 = (0, _extractStateByKeys4["default"])(refState, storedKeys),
            entireStoredState = _extractStateByKeys2.partialState;

        var currentStoredState = Object.assign({}, entireStoredState, partialState);
        localStorage.setItem('CCSS_' + ccUniqueKey, JSON.stringify(currentStoredState));
      }

      refStore.setState(ccUniqueKey, partialState);
    }
  }

  var deltaCommittedState = (0, _computeValueForRef["default"])(refCtx, stateModule, refState, state, callInfo);
  var shouldCurrentRefUpdate = (0, _watchKeyForRef["default"])(refCtx, stateModule, refState, deltaCommittedState, callInfo, false, true);

  var ccSetState = function ccSetState() {
    // 记录stateKeys，方便triggerRefEffect之用
    refCtx.__$$settedList.push({
      module: stateModule,
      keys: okeys(deltaCommittedState)
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
  var stateKeys = moduleName_stateKeys_[moduleName]; // extract shared state

  var _extractStateByKeys3 = (0, _extractStateByKeys4["default"])(committedState, stateKeys, true),
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
    var feature = computeFeature(targetRef.ctx.ccUniqueKey, sharedState);
    (0, _runLater["default"])(startBroadcastState, feature, delay);
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

  var ignoreCurrentCcUKey = stateFor === FOR_ONE_INS_FIRSTLY;

  var _findUpdateRefs = (0, _findUpdateRefs2["default"])(moduleName, partialSharedState, renderKey, renderKeyClasses),
      sharedStateKeys = _findUpdateRefs.sharedStateKeys,
      _findUpdateRefs$resul = _findUpdateRefs.result,
      belongRefs = _findUpdateRefs$resul.belong,
      connectRefs = _findUpdateRefs$resul.connect;

  belongRefs.forEach(function (ref) {
    if (ignoreCurrentCcUKey && ref.ccUniqueKey === currentCcUKey) return; // 这里的calledBy直接用'broadcastState'，仅供concent内部运行时用，同时这ignoreCurrentCcUkey里也不会发送信号给插件

    triggerReactSetState(ref, callInfo, null, 'broadcastState', partialSharedState, FOR_ONE_INS_FIRSTLY);
  });
  var prevModuleState = getPrevState(moduleName);
  connectRefs.forEach(function (ref) {
    if (ref.__$$isUnmounted !== true) {
      var refCtx = ref.ctx;
      (0, _computeValueForRef["default"])(refCtx, moduleName, prevModuleState, partialSharedState, callInfo);
      var shouldCurrentRefUpdate = (0, _watchKeyForRef["default"])(refCtx, moduleName, prevModuleState, partialSharedState, callInfo); // 记录sharedStateKeys，方便triggerRefEffect之用

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