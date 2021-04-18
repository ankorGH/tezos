import React from "react"
import { screen } from "@testing-library/react"
import { render } from "../../../test-utils"
import { ChainHeader } from "../ChainHeader"

describe("Chains/ChainHeader", () => {
    test("renders header with text 'TzNode Index'", () => {
      render(<ChainHeader title="TzNode Index"/>)
      const header = screen.getByText(/TzNode Index/i)
      expect(header).toBeInTheDocument()
    })
})
