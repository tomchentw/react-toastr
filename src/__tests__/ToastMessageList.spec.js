import {
  default as expect,
} from "expect";

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
  ToastMessageList,
} from "../index";

function noop () {}

describe(`ToastMessageList`, () => {
  it(`renders a list of toast messages`, () => {
    const listFixture = [
      {
        toastId: `0`,
        toastType: `success`,
        title: `cool`,
        message: `yeah`,
        onRemove: noop,
      },
      {
        toastId: `1`,
        toastType: `error`,
        title: `foobar`,
        message: `blabla`,
        onRemove: noop,
      },
    ];

    const ref = TestUtils.renderIntoDocument(
      <ToastMessageList list={listFixture} />
    );

    const dom = ReactDOM.findDOMNode(ref);
    expect(dom.childNodes.length).toBe(2);

    const successDom = dom.childNodes[0];
    expect(successDom.classList.contains(`toast-success`)).toBe(true);
    expect(successDom.childNodes[0].textContent).toBe(`cool`);
    expect(successDom.childNodes[1].textContent).toBe(`yeah`);

    const errorDom = dom.childNodes[1];
    expect(errorDom.classList.contains(`toast-error`)).toBe(true);
    expect(errorDom.childNodes[0].textContent).toBe(`foobar`);
    expect(errorDom.childNodes[1].textContent).toBe(`blabla`);
  });
});
