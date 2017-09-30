import { ToastContainer, ToastMessage, ToastMessageAnimated } from "../index"

describe(`index module`, () => {
  it(`should be exported as ES2015 module`, () => {
    expect(ToastContainer).toBeDefined()
    expect(ToastMessage).toBeDefined()
    expect(ToastMessageAnimated).toBeDefined()
  })
})
