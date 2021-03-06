"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = _default;

var _configureDepFns = _interopRequireDefault(require("../base/configure-dep-fns"));

var _constant = require("../../support/constant");

function _default(refCtx, isLazyComputed) {
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
    (0, _configureDepFns["default"])(_constant.CATE_REF, confMeta, computedItem, computedHandler, depKeys, compare);
  };
}