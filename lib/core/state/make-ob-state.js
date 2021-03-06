"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = _default;

var _privConstant = require("../../support/priv-constant");

var _util = require("../../support/util");

var _ccContext = _interopRequireDefault(require("../../cc-context"));

var waKey_uKeyMap_ = _ccContext["default"].waKey_uKeyMap_,
    moduleName_stateKeys_ = _ccContext["default"].moduleName_stateKeys_; // before render
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

function _default(ref, state, module) {
  return new Proxy(state, {
    get: function get(target, key) {
      var refCtx = ref.ctx;

      if (refCtx.__$$renderStatus === _privConstant.START) {
        var ccUniqueKey = refCtx.ccUniqueKey;

        if (module) {
          var waKey = module + "/" + key;
          var __$$curConnWaKeys = refCtx.__$$curConnWaKeys,
              __$$compareConnWaKeys = refCtx.__$$compareConnWaKeys,
              __$$nextCompareConnWaKeys = refCtx.__$$nextCompareConnWaKeys,
              __$$nextCompareConnWaKeyCount = refCtx.__$$nextCompareConnWaKeyCount;
          waKey_uKeyMap_[waKey][ccUniqueKey] = 1;
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

          if (moduleName_stateKeys_[refModule].includes(key)) {
            var _waKey = refModule + "/" + key;

            var __$$curWaKeys = refCtx.__$$curWaKeys,
                __$$compareWaKeys = refCtx.__$$compareWaKeys,
                __$$nextCompareWaKeys = refCtx.__$$nextCompareWaKeys;
            waKey_uKeyMap_[_waKey][ccUniqueKey] = 1;
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