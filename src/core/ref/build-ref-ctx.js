import {
  MODULE_GLOBAL, ERR, CCSYNC_KEY,
  SET_STATE, SET_MODULE_STATE, FORCE_UPDATE, CC_HOOK,
} from '../../support/constant';
import ccContext from '../../cc-context';
import * as util from '../../support/util';
import { NOT_A_JSON, END, START } from '../../support/priv-constant';
import * as ev from '../event';
import * as hf from '../state/handler-factory';
import changeRefState from '../state/change-ref-state';
import makeObState from '../state/make-ob-state';
import getDefineWatchHandler from '../watch/get-define-watch-handler';
import getDefineComputedHandler from '../computed/get-define-computed-handler';
import computeCcUniqueKey from '../base/compute-cc-unique-key';
import getOutProps from '../base/get-out-props';
import getStoredKeys from '../base/get-stored-keys';
import __sync from '../base/sync';

const {
  reducer: { _module_fnNames_, _caller },
  refStore,
  ccClassKey_ccClassContext_,
  moduleName_stateKeys_,
  store: { getState },
  moduleName_ccClassKeys_,
  computed: { _computedValue },
  waKey_uKeyMap_,
} = ccContext;

const { okeys, makeError: me, verboseInfo: vbi, safeGetArray, safeGetObject, justWarning, isObjectNull } = util;

let idSeq = 0;
function getEId() {
  idSeq++;
  return Symbol(`__autoGen_${idSeq}__`);
}

const noop = () => { };
const eType = (th) => `type of defineEffect ${th} param must be`;

const getWatchedKeys = (ctx) => {
  if (ctx.watchedKeys === '-') {
    if (ctx.__$$renderStatus === START) return okeys(ctx.__$$compareWaKeys);
    else return okeys(ctx.__$$curWaKeys);
  }
  else return ctx.watchedKeys;
}

const getConnectWatchedKeys = (ctx, module) => {
  const { connect, connectedModules } = ctx;
  const isConnectArr = Array.isArray(connect);

  const getModuleWaKeys = (m) => {
    if (ctx.__$$renderStatus === START) return okeys(ctx.__$$compareConnWaKeys[m]);
    else return okeys(ctx.__$$curConnWaKeys[m]);
  }

  const getWKeys = (module) => {
    if (isConnectArr) {// auto observe connect modules
      return getModuleWaKeys(module);
    } else {
      const waKeys = connect[module];
      if (waKeys === '*') return moduleName_stateKeys_[module];
      else if (waKeys === '-') return getModuleWaKeys(module);
      else return waKeys;
    }
  }

  if (module) return getWKeys(module);
  else {
    const cKeys = {};
    connectedModules.forEach(m => cKeys[m] = getWKeys(m));
    return cKeys;
  }
}

function recordDep(ccUniqueKey, module, watchedKeys) {
  const waKeys = watchedKeys === '*' ? moduleName_stateKeys_[module] : watchedKeys;
  waKeys.forEach(waKey => {
    const map = waKey_uKeyMap_[`${module}/${waKey}`];
    if(map){
      map[ccUniqueKey] = 1;
    }else{
      justWarning(`invalid watchedKey[${waKey}] of module[${module}]`)
    }
  });
}

//调用buildFragmentRefCtx 之前，props参数已被处理过
/**
 * 构建refCtx，附加到ref上
 * liteLevel 越小，绑定的方法越少
 */
export default function (ref, params, liteLevel = 5) {

  // 能省赋默认值的就省，比如state，外层调用都保证赋值过了
  let {
    isSingle, ccClassKey, ccKey = '', module, type,
    state, storedKeys = [], persistStoredKeys = false, watchedKeys, connect = {}, tag = '', ccOption = {},
  } = params;
  const stateModule = module;
  const existedCtx = ref.ctx;

  let __boundSetState = ref.setState, __boundForceUpdate = ref.forceUpdate;

  // 如果已存在ctx，则直接指向原来的__bound，否则会造成无限递归调用栈溢出
  // 做个保护判断，防止 ctx = {}
  if (!isObjectNull(existedCtx) && existedCtx.ccUniqueKey) {
    __boundSetState = existedCtx.__boundSetState;
    __boundForceUpdate = existedCtx.__boundForceUpdate;
  } else if (type !== CC_HOOK) {
    __boundSetState = ref.setState.bind(ref);
    __boundForceUpdate = ref.forceUpdate.bind(ref);
  }

  const refOption = {};
  refOption.persistStoredKeys = ccOption.persistStoredKeys === undefined ? persistStoredKeys : ccOption.persistStoredKeys;
  refOption.tag = ccOption.tag || tag;

  // pick ref defined tag first, register tag second
  const ccUniqueKey = computeCcUniqueKey(isSingle, ccClassKey, ccKey, refOption.tag);
  refOption.renderKey = ccOption.renderKey || ccUniqueKey;// 没有设定renderKey的话，默认ccUniqueKey就是renderKey

  refOption.storedKeys = getStoredKeys(state, moduleName_stateKeys_[stateModule], ccOption.storedKeys, storedKeys);

  //用户使用ccKey属性的话，必需显示的指定ccClassKey
  if (ccKey && !ccClassKey) {
    throw new Error(`missing ccClassKey while init a cc ins with ccKey[${ccKey}]`);
  }

  if (refOption.storedKeys.length > 0) {
    if (!ccKey) throw me(ERR.CC_STORED_KEYS_NEED_CCKEY, vbi(`ccClassKey[${ccClassKey}]`));
  }

  const classCtx = ccClassKey_ccClassContext_[ccClassKey];
  const classConnectedState = classCtx.connectedState;
  const connectedModules = okeys(connect);
  const connectedComputed = classCtx.connectedComputed || {};
  const connectedState = {};
  const cstate = {};
  const moduleState = getState(module);
  const moduleComputed = _computedValue[module] || {};
  const globalComputed = _computedValue[MODULE_GLOBAL] || {};
  const globalState = getState(MODULE_GLOBAL);

  // extract privStateKeys
  const privStateKeys = util.removeArrElements(okeys(state), moduleName_stateKeys_[stateModule]);

  // recover ref state
  let refStoredState = refStore._state[ccUniqueKey] || {};
  const mergedState = Object.assign({}, state, refStoredState, moduleState);
  ref.state = mergedState;
  const stateKeys = okeys(mergedState);

  // record ccClassKey
  const ccClassKeys = safeGetArray(moduleName_ccClassKeys_, module);
  if (!ccClassKeys.includes(ccClassKey)) ccClassKeys.push(ccClassKey);

  // declare cc state series api
  const changeState = (state, option) => {
    changeRefState(state, option, ref);
  }
  const _setState = (module, state, calledBy, reactCallback, renderKey, delay) => {
    changeState(state, { calledBy, module, renderKey, delay, reactCallback });
  };
  const setModuleState = (module, state, reactCallback, renderKey, delay) => {
    _setState(module, state, SET_MODULE_STATE, reactCallback, renderKey, delay);
  };
  // const setState = (state, reactCallback, renderKey, delay) => {
  const setState = (p1, p2, p3, p4, p5) => {
    if (typeof p1 === 'string') {
      //p1 module, p2 state, p3 cb, p4 rkey, p5 delay
      setModuleState(p1, p2, p3, p4, p5);
    } else {
      //p1 state, p2 cb, p3 rkey, p4 delay
      _setState(stateModule, p1, SET_STATE, p2, p3, p4);
    }
  };
  const forceUpdate = (reactCallback, renderKey, delay) => {
    _setState(stateModule, ref.state, FORCE_UPDATE, reactCallback, renderKey, delay);
  };


  const __$$onEvents = [];
  const effectItems = [], effectPropsItems = [];// {fn:function, status:0, eId:'', immediate:true}
  const eid_effectReturnCb_ = {}, eid_effectPropsReturnCb_ = {};// fn
  const effectMeta = { effectItems, eid_effectReturnCb_, effectPropsItems, eid_effectPropsReturnCb_ };
  const refs = {};

  // depDesc = {stateKey_retKeys_: {}, retKey_fn_:{}}
  // computedDep or watchDep  : { [module:string] : { stateKey_retKeys_: {}, retKey_fn_: {}, immediateRetKeys: [] } }
  const computedDep = {}, watchDep = {};

  const props = getOutProps(ref.props);
  const ctx = {
    // static params
    type,
    isSingle,
    module,
    ccClassKey,
    ccKey,
    ccUniqueKey,
    renderCount: 1,
    initTime: Date.now(),
    watchedKeys,
    privStateKeys,
    connect,
    connectedModules,
    
    // dynamic meta, I don't want user know these props, so put them in ctx instead of ref
    __$$onEvents,// 当组件还未挂载时，event中心会将事件存到__$$onEvents里，当组件挂载时检查的事件列表并执行，然后清空

    __$$hasModuleState: moduleName_stateKeys_[module].length > 0,
    __$$renderStatus: END,

    __$$curWaKeys: {},
    __$$compareWaKeys: {},
    __$$compareWaKeyCount: 0,//write before render
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
    props,
    mapped: {},

    prevState: mergedState,
    // state
    state: mergedState,
    moduleState,
    mstate: moduleState,// always be latest in auto watch mode
    globalState,
    gstate: globalState,// always be latest in auto watch mode
    connectedState,
    cstate,// always be latest in auto watch mode
    extra: {},// can pass value to extra in every render period
    staticExtra: {},// only can be assign value in setup block

    // computed result containers
    refComputed: {},
    refComputedOri: {},// 未代理的计算值容器
    moduleComputed,
    globalComputed,
    connectedComputed,

    moduleReducer: {},
    connectedReducer: {},
    reducer: {},

    //collect mapProps result
    mapped: {},

    // api meta data
    stateKeys,
    computedDep,
    computedRetKeyFns: {},//不按模块分类，映射的cuRetKey_fn_
    watchDep,
    watchRetKeyFns: {},//不按模块分类，映射的watchRetKey_fn_
    execute: null,
    effectMeta,
    retKey_fnUid_: {},

    // api
    reactSetState: noop,//等待重写
    __boundSetState,
    reactForceUpdate: noop,//等待重写
    __boundForceUpdate,
    setState,
    setModuleState,
    forceUpdate,
    changeState,// not expose in d.ts
    refs,
    useRef: (refName) => {
      return ref => refs[refName] = { current: ref };// keep the same shape with hook useRef
    },

    // below only can be called by cc or updated by cc in existed period, not expose in d.ts
    __$$ccSetState: hf.makeCcSetStateHandler(ref),
    __$$ccForceUpdate: hf.makeCcForceUpdateHandler(ref),
    __$$settedList: [],//[{module:string, keys:string[]}, ...]
    __$$prevMoStateVer: {},
  };
  ref.setState = setState;
  ref.forceUpdate = forceUpdate;

  // allow user have a chance to define state in setup block;
  ctx.initState = (initState) => {
    // 已挂载则不让用户在调用initState
    if (ref.__$$isMounted) {
      return justWarning(`ctx.initState can only been called before first render period!`);
    }
    if (!util.isPJO(state)) {
      return justWarning(`state ${NOT_A_JSON}`);
    }
    ref.state = Object.assign({}, state, initState, refStoredState, moduleState);
    ctx.prevState = ctx.state = ref.state;
  }

  // 创建dispatch需要ref.ctx里的ccClassKey相关信息, 所以这里放在ref.ctx赋值之后在调用makeDispatchHandler
  const dispatch = hf.makeDispatchHandler(ref, false, false, stateModule);
  ctx.dispatch = dispatch;

  if (liteLevel > 1) {// level 2, assign these mod data api
    ctx.lazyDispatch = hf.makeDispatchHandler(ref, true, false, stateModule);
    ctx.silentDispatch = hf.makeDispatchHandler(ref, false, true, stateModule);
    ctx.dispatchLazy = ctx.lazyDispatch;// alias of lazyDispatch
    ctx.dispatchSilent = ctx.silentDispatch;// alias of silentDispatch

    ctx.invoke = hf.makeInvokeHandler(ref);
    ctx.lazyInvoke = hf.makeInvokeHandler(ref, { isLazy: true });
    ctx.silentInvoke = hf.makeInvokeHandler(ref, { isLazy: false, isSilent: true });
    ctx.invokeLazy = ctx.lazyInvoke;// alias of lazyInvoke
    ctx.invokeSilent = ctx.silentInvoke;// alias of silentInvoke

    ctx.setGlobalState = (state, reactCallback, renderKey, delay) => {
      _setState(MODULE_GLOBAL, state, SET_STATE, reactCallback, renderKey, delay);
    };
  }

  if (liteLevel > 2) {// level 3, assign async api
    const doSync = (e, val, rkey, delay, type) => {
      if (typeof e === 'string') return __sync.bind(null, { [CCSYNC_KEY]: e, type, val, delay, rkey }, ref);
      __sync({ type: 'val' }, ref, e);//allow <input data-ccsync="foo/f1" onChange={ctx.sync} />
    }

    ctx.sync = (e, val, rkey = '', delay = -1) => doSync(e, val, rkey, delay, 'val');
    ctx.syncBool = (e, val, rkey = '', delay = -1) => doSync(e, val, rkey, delay, 'bool');
    ctx.syncInt = (e, val, rkey = '', delay = -1) => doSync(e, val, rkey, delay, 'int');
    ctx.syncAs = (e, val, rkey = '', delay = -1) => doSync(e, val, rkey, delay, 'as');

    ctx.set = (ccsync, val, rkey = '', delay = -1) => {
      __sync({ [CCSYNC_KEY]: ccsync, type: 'val', val, delay, rkey }, ref);
    };
    ctx.setBool = (ccsync, rkey = '', delay = -1) => {
      __sync({ [CCSYNC_KEY]: ccsync, type: 'bool', delay, rkey }, ref);
    };
  }

  if (liteLevel > 3) {// level 4, assign event api
    ctx.emit = (event, ...args) => {
      ev.findEventHandlersToPerform(ev.getEventItem(event), ...args);
    };
    // 默认off掉当前实例对某个事件名的所有监听
    ctx.off = (event, { module, ccClassKey, ccUniqueKey: inputCcUkey = ccUniqueKey } = {}) => {
      //这里刻意不为identity赋默认值，如果是undefined，表示off掉所有监听
      const { name, identity } = ev.getEventItem(event);
      ev.findEventHandlersToOff(name, { module, ccClassKey, ccUniqueKey: inputCcUkey, identity });
    }
    ctx.on = (inputEvent, handler) => {
      //这里刻意赋默认值identity = null，表示on的是不带id认证的监听
      const { name: event, identity = null } = ev.getEventItem(inputEvent);
      ev.bindEventHandlerToCcContext(stateModule, ccClassKey, ccUniqueKey, event, identity, handler);
    };
  }

  if (liteLevel > 4) {// level 5, assign enhance api
    ctx.execute = handler => ctx.execute = handler;

    ctx.watch = getDefineWatchHandler(ctx);
    ctx.computed = getDefineComputedHandler(ctx);
    ctx.lazyComputed = getDefineComputedHandler(ctx, true);

    const makeEffectHandler = (targetEffectItems, isProp) => (fn, depKeys, compare = true, immediate = true) => {
      if (typeof fn !== 'function') throw new Error(`${eType('first')} function`);
      let _depKeys = depKeys;
      //对于effectProps 第三位参数就是immediate
      let _immediate = isProp ? compare : immediate;

      // depKeys 为null 和 undefined 表示无任何依赖，每一轮都执行的副作用
      if (depKeys !== null && depKeys !== undefined) {
        if (!Array.isArray(depKeys)) throw new Error(`${eType('second')} one of them(array, null, undefined)`);
      }

      let moDepKeys = null;
      if (!isProp && _depKeys) {
        moDepKeys = [];
        _depKeys.forEach(depKey => {
          if (depKey.includes('/')) moDepKeys.push(depKey);
          else moDepKeys.push(`${stateModule}/${depKey}`);
        });
      }
      // 对于effectProps来说是不会读取compare属性来用的
      const effectItem = { fn, isProp, depKeys: _depKeys, moDepKeys, eId: getEId(), compare, immediate: _immediate };
      targetEffectItems.push(effectItem);
    };

    ctx.effect = makeEffectHandler(effectItems, false);
    ctx.effectProps = makeEffectHandler(effectPropsItems, true);
  }

  // 构造完毕ctx后，开始创建reducer，和可观察connectedState
  const { 
    moduleReducer, connectedReducer, 
    __$$curConnWaKeys, __$$compareConnWaKeys, __$$compareConnWaKeyCount,
    __$$nextCompareConnWaKeys, __$$nextCompareConnWaKeyCount,
  } = ctx;
  const allModules = connectedModules.slice();
  if (!allModules.includes(module)) allModules.push(module);
  else {
    justWarning(`module[${module}] is in belongTo and connect both, it will cause redundant render.`);
  }

  let __$$autoWatch = false;
  //向实例的reducer里绑定方法，key:{module} value:{reducerFn}
  //为了性能考虑，只绑定所属的模块和已连接的模块的reducer方法
  allModules.forEach(m => {
    let reducerObj;
    if (m === module) {
      reducerObj = moduleReducer;
    } else {
      reducerObj = safeGetObject(connectedReducer, m);
    }

    const connectDesc = connect[m];
    if (connectDesc) {
      let mConnectedState = classConnectedState[m];
      cstate[m] = mConnectedState;// let cstate always be latest in every re-render period

      if (connectDesc === '-') {// auto watch
        __$$autoWatch = true;

        __$$curConnWaKeys[m] = {};
        __$$compareConnWaKeys[m] = {};
        __$$compareConnWaKeyCount[m] = 0;
        __$$nextCompareConnWaKeys[m] = {};
        __$$nextCompareConnWaKeyCount[m] = 0;

        mConnectedState = makeObState(ref, mConnectedState, m);
      }
      // 非自动收集，这里就需要写入waKey_uKeyMap_来记录依赖关系了
      else{
        recordDep(ccUniqueKey, m, connectDesc);
      } 

      connectedState[m] = mConnectedState;
    }

    const fnNames = _module_fnNames_[m] || [];
    fnNames.forEach(fnName => {
      reducerObj[fnName] = (payload, rkeyOrOption, delay) => dispatch(`${m}/${fnName}`, payload, rkeyOrOption, delay);
    });
  });

  ctx.reducer = _caller;

  if (watchedKeys === '-') {
    __$$autoWatch = true;
    ref.state = makeObState(ref, mergedState);
    ctx.state = ref.state;
  }else{
    //开始记录依赖
    recordDep(ccUniqueKey, module, watchedKeys);
  }
  ctx.__$$autoWatch = __$$autoWatch;

  ctx.__$$reInjectConnObState = (module) => {
    const connectedState = ctx.connectedState;
    if (Array.isArray(connect)) {
      connectedState[module] = makeObState(ref, classConnectedState[module], module);
    } else {
      const waKeys = connect[module];
      if (waKeys === '-') connectedState[module] = makeObState(ref, classConnectedState[module], module);
      // else do nothing
    }

    // 总是将connectedState.globalState指向ctx.globalState
    ctx.globalState = connectedState[MODULE_GLOBAL];
  };
 
  //始终优先取ref上指向的ctx，对于在热加载模式下的hook组件实例，那里面有的最近一次渲染收集的依赖信息才是正确的
  ctx.getWatchedKeys = () => getWatchedKeys(ref.ctx || ctx);
  ctx.getConnectWatchedKeys = (module) => getConnectWatchedKeys(ref.ctx || ctx, module);

  if (!existedCtx) ref.ctx = ctx;
  // 适配热加载或者异步渲染里, 需要清理ctx里运行时收集的相关数据，重新分配即可
  else {
    // 这里需要把第一次渲染期间已经收集好的依赖再次透传给ref.ctx
    const {
      __$$curWaKeys,
      __$$compareWaKeys,
      __$$compareWaKeyCount,
      __$$nextCompareWaKeys,
      __$$nextCompareWaKeyCount,
      __$$curConnWaKeys,
      __$$compareConnWaKeys,
      __$$compareConnWaKeyCount,
      __$$nextCompareConnWaKeys,
      __$$nextCompareConnWaKeyCount,
    } = ref.ctx;
    Object.assign(ref.ctx, ctx, {
      __$$curWaKeys,
      __$$compareWaKeys,
      __$$compareWaKeyCount,
      __$$nextCompareWaKeys,
      __$$nextCompareWaKeyCount,
      __$$curConnWaKeys,
      __$$compareConnWaKeys,
      __$$compareConnWaKeyCount,
      __$$nextCompareConnWaKeys,
      __$$nextCompareConnWaKeyCount,
    });
  }
}
