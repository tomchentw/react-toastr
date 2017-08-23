"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _index = require("../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("ToastMessage", function () {
  beforeAll(function () {
    global.jQuery = _jquery2.default;
  });

  afterAll(function () {
    delete global.jQuery;
  });

  var dom = void 0;

  beforeEach(function () {
    dom = document.createElement("div");
  });

  afterEach(function () {
    _reactDom2.default.unmountComponentAtNode(dom);
  });

  describe("auto close", function () {
    it("will call handleRemove with given props", function () {
      var handleRemoveFn = jest.fn();
      _reactDom2.default.render(_react2.default.createElement(_index.ToastMessage.jQuery, {
        timeOut: 1,
        showDuration: 50,
        hideDuration: 50,
        handleRemove: handleRemoveFn
      }), dom);
      expect(handleRemoveFn.mock.calls.length).toEqual(0);

      return new Promise(function (resolve) {
        setTimeout(function () {
          expect(handleRemoveFn.mock.calls.length).toEqual(1);
          resolve();
        }, 150);
      });
    });
  });
});