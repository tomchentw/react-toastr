/* eslint-disable prefer-arrow-callback */

import {
  default as expect,
  createSpy,
} from "expect";

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

describe(`ToastMessage`, function describeToastMessage() {
  before(function before() {
    global.jQuery = $;
  });

  after(function after() {
    delete global.jQuery;
  });

  let dom;

  beforeEach(function beforeEach() {
    dom = document.createElement(`div`);
  });

  afterEach(function afterEach() {
    ReactDOM.unmountComponentAtNode(dom);
  });

  context(`auto close`, function context() {
    it(`will call handleRemove with given props`, function it(done) {
      const spy = createSpy();
      ReactDOM.render((
        <ToastMessage.jQuery
          timeOut={1}
          showDuration={50}
          hideDuration={50}
          handleRemove={spy}
        />
      ), dom);
      expect(spy).toNotHaveBeenCalled();

      setTimeout(() => {
        expect(spy).toHaveBeenCalled();
        done();
      }, 150);
    });
  });
});
