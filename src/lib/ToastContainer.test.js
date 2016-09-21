import {
  default as React,
} from "react";

import {
  default as ReactDOM,
} from "react-dom";

import {
  default as TestUtils,
} from "react-addons-test-utils";

import {
  ToastContainer,
  ToastMessage,
} from "./index";

describe(`ToastContainer`, () => {
  let dom;

  beforeEach(() => {
    dom = document.createElement(`div`);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(dom);
  });

  describe(`renders a toast message`, () => {
    it(`exists in the container`, () => {
      const component = ReactDOM.render((
        <ToastContainer toastMessageFactory={React.createFactory(ToastMessage.animation)} />
      ), dom);
      expect(dom.firstChild.childNodes.length).toBe(0);

      component.success(`yeah,`, `cool`);
      expect(dom.firstChild.childNodes.length).not.toBe(0);
    });

    it(`should be closed by clicking on it`, function it(done) {
      const component = ReactDOM.render((
        <ToastContainer toastMessageFactory={React.createFactory(ToastMessage.animation)} />
      ), dom);

      component.success(`yeah,`, `cool`);
      expect(dom.firstChild.childNodes.length).not.toBe(0);

      const toastComp = TestUtils.findRenderedDOMComponentWithClass(component, `toast`);
      TestUtils.Simulate.click(toastComp);

      setTimeout(() => {
        expect(dom.firstChild.childNodes.length).toBe(0);
        done();
      }, 500);
    });
  });

  describe(`when component function is triggered multiple times`, () => {
    it(`renders a list of toast messages`, () => {
      const component = ReactDOM.render((
        <ToastContainer toastMessageFactory={React.createFactory(ToastMessage.animation)} />
      ), dom);
      component.success(`yeah`, `cool`);
      component.error(`blabla`, `foobar`);

      expect(dom.firstChild.childNodes.length).toBe(2);

      const errorDom = dom.firstChild.childNodes[0];
      expect(errorDom.classList.contains(`toast-error`)).toBe(true);
      expect(errorDom.childNodes[0].textContent).toBe(`foobar`);
      expect(errorDom.childNodes[1].textContent).toBe(`blabla`);

      const successDom = dom.firstChild.childNodes[1];
      expect(successDom.classList.contains(`toast-success`)).toBe(true);
      expect(successDom.childNodes[0].textContent).toBe(`cool`);
      expect(successDom.childNodes[1].textContent).toBe(`yeah`);
    });
  });
});
