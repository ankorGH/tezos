import React from "react"
import { screen } from "@testing-library/react"
import { render } from "../../../test-utils"
import { ChainCardContainer } from "../ChainCardContainer"

describe("Chains/ChainCardContainer", () => {
    test("renders with children", () => {
      render(
            <ChainCardContainer>
                <p>TzIndex</p>
            </ChainCardContainer>
        )
      const text = screen.getByText(/TzIndex/i)
      expect(text).toBeInTheDocument()
    })
})
