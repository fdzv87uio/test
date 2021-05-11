import { render } from "@testing-library/react"
import React from "react"

import NotFoundPage from "../404"

test("should render 404 message", () => {
  const { queryByTestId } = render(<NotFoundPage />)
  const text = queryByTestId("message")
  expect(text?.textContent).toEqual("404 - Page not found")
})
