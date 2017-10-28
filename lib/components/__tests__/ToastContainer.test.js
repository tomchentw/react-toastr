"use strict"

var _react = require("react")

var _react2 = _interopRequireDefault(_react)

var _reactDom = require("react-dom")

var _reactDom2 = _interopRequireDefault(_reactDom)

var _reactTestRenderer = require("react-test-renderer")

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

describe("ToastContainer module", function() {
  var _require = require("../ToastContainer"),
    ToastContainer = _require.ToastContainer

  describe("renders a toast message", function() {
    it("exists in the container", function() {
      var renderer = _reactTestRenderer2.default.create(
        _react2.default.createElement(ToastContainer, null)
      )
      expect(renderer).toMatchSnapshot()

      renderer.getInstance().success("yeah,", "cool")
      expect(renderer).toMatchSnapshot()
    })

    it("should be closed by clicking on it", function(done) {
      var renderer = _reactTestRenderer2.default.create(
        _react2.default.createElement(ToastContainer, null)
      )
      renderer.getInstance().success("yeah,", "cool", { hideAnimation: null })
      expect(renderer).toMatchSnapshot()

      renderer.toJSON().children[0].props.onClick({ defaultPrevented: true })

      setTimeout(function() {
        expect(renderer).toMatchSnapshot()
        done()
      }, 100)
    })
  })

  describe("when component function is triggered multiple times", function() {
    it("renders a list of toast messages", function() {
      var renderer = _reactTestRenderer2.default.create(
        _react2.default.createElement(ToastContainer, null)
      )
      renderer.getInstance().success("yeah", "cool")
      renderer.getInstance().error("blabla", "foobar")

      expect(renderer).toMatchSnapshot()
    })
  })
})
