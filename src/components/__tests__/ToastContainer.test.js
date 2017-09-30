import React from "react"
import ReactDOM from "react-dom"
import ReactTestRenderer from "react-test-renderer"

describe(`ToastContainer module`, () => {
  const { ToastContainer } = require("../ToastContainer")

  describe(`renders a toast message`, () => {
    it(`exists in the container`, () => {
      const renderer = ReactTestRenderer.create(<ToastContainer />)
      expect(renderer).toMatchSnapshot()

      renderer.getInstance().success(`yeah,`, `cool`)
      expect(renderer).toMatchSnapshot()
    })

    it(`should be closed by clicking on it`, done => {
      const renderer = ReactTestRenderer.create(<ToastContainer />)
      renderer.getInstance().success(`yeah,`, `cool`, { hideAnimation: null })
      expect(renderer).toMatchSnapshot()

      renderer.toJSON().children[0].props.onClick({ defaultPrevented: true })

      setTimeout(() => {
        expect(renderer).toMatchSnapshot()
        done()
      }, 100)
    })
  })

  describe(`when component function is triggered multiple times`, () => {
    it(`renders a list of toast messages`, () => {
      const renderer = ReactTestRenderer.create(<ToastContainer />)
      renderer.getInstance().success(`yeah`, `cool`)
      renderer.getInstance().error(`blabla`, `foobar`)

      expect(renderer).toMatchSnapshot()
    })
  })
})
