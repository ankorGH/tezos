import React from "react"
import { screen, waitFor } from "@testing-library/react"

import { render } from "../../../test-utils"
import { Chains } from "../Chains"
import { ChainData } from "../types"

jest.setTimeout(1000* 60)

describe("Chains/Chains", () => {
    test("renders chain", async () => {

        const payload = [
            {   
                "title": "Tz APIs",   
                "cards": [
                    {    
                        "title": "TezNode",    
                        "kind": "tezos-node",    
                        "url": "https://api.tzstats.com"   
                    },
                ]   
            }
        ] 

        render(<Chains data={payload as unknown as ChainData[]} />)

        expect(screen.getByText(/TezNode/i)).toBeInTheDocument()
        expect(screen.getByText(/blockchain node/)).toBeInTheDocument()
    })
})
