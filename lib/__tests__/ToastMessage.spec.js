"use strict";

var _expect = require("expect");

var _expect2 = _interopRequireDefault(_expect);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _index = require("../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("ToastMessage", function describeToastMessage() {
  before(function before() {
    global.jQuery = _jquery2.default;
  });

  after(function after() {
    delete global.jQuery;
  });

  var dom = void 0;

  beforeEach(function beforeEach() {
    dom = document.createElement("div");
  });

  afterEach(function afterEach() {
    _reactDom2.default.unmountComponentAtNode(dom);
  });

  context("auto close", function context() {
    it("will call handleRemove with given props", function it(done) {
      var spy = (0, _expect.createSpy)();
      _reactDom2.default.render(_react2.default.createElement(_index.ToastMessage.jQuery, {
        timeOut: 1,
        showDuration: 50,
        hideDuration: 50,
        handleRemove: spy
      }), dom);
      (0, _expect2.default)(spy).toNotHaveBeenCalled();

      setTimeout(function () {
        (0, _expect2.default)(spy).toHaveBeenCalled();
        done();
      }, 150);
    });
  });
}); /* eslint-disable prefer-arrow-callback */