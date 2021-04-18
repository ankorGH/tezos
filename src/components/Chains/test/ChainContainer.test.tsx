import React from "react"
import { screen } from "@testing-library/react"
import { render } from "../../../test-utils"
import { ChainContainer } from "../ChainContainer"

describe("Chains/ChainContainer", () => {
    test("renders with children", () => {
      render(
            <ChainContainer>
                <p>TzIndex</p>
            </ChainContainer>
        )
      const text = screen.getByText(/TzIndex/i)
      expect(text).toBeInTheDocument()
    })
})
