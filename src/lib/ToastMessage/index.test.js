import {
  default as React,
} from "react";

import {
  default as ReactDOM,
} from "react-dom";

import {
  default as $,
} from "jquery";

import {
  ToastMessage,
} from "../index";

describe(`ToastMessage`, () => {
  beforeAll(() => {
    global.jQuery = $;
  });

  afterAll(() => {
    delete global.jQuery;
  });

  let dom;

  beforeEach(() => {
    dom = document.createElement(`div`);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(dom);
  });

  describe(`auto close`, () => {
    it(`will call handleRemove with given props`, () => {
      const handleRemoveFn = jest.fn();
      ReactDOM.render((
        <ToastMessage.jQuery
          timeOut={1}
          showDuration={50}
          hideDuration={50}
          handleRemove={handleRemoveFn}
        />
      ), dom);
      expect(handleRemoveFn.mock.calls.length).toEqual(0);

      return new Promise((resolve) => {
        setTimeout(() => {
          expect(handleRemoveFn.mock.calls.length).toEqual(1);
          resolve();
        }, 150);
      });
    });
  });
});
