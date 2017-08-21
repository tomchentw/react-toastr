import { default as React } from "react";

import { default as ReactDOM } from "react-dom";

import { default as $ } from "jquery";

import { ToastMessage } from "../index";

describe("ToastMessage", function () {
  beforeAll(function () {
    global.jQuery = $;
  });

  afterAll(function () {
    delete global.jQuery;
  });

  var dom = void 0;

  beforeEach(function () {
    dom = document.createElement("div");
  });

  afterEach(function () {
    ReactDOM.unmountComponentAtNode(dom);
  });

  describe("auto close", function () {
    it("will call handleRemove with given props", function () {
      var handleRemoveFn = jest.fn();
      ReactDOM.render(React.createElement(ToastMessage.jQuery, {
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