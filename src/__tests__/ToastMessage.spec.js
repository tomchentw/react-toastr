import expect, { createSpy } from "expect";
import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import { ToastMessage } from "../index";

describe(`Toast Message`, () => {
  beforeEach(() => {
    global.jQuery = $;
  });

  afterEach(() => {
    delete global.jQuery;
  });

  let dom;

  beforeEach(() => {
    dom = document.createElement(`div`);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(dom);
  });

  context(`Auto close`, () => {
    it(`Will call handleRemove with given props`, (done) => {
      const spy = expect.createSpy;
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
