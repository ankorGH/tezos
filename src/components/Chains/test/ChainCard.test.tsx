import React from "react"
import { screen, waitFor } from "@testing-library/react"

import { render } from "../../../test-utils"
import { ChainCard } from "../ChainCard"
import { ChainKind } from "../types"

describe("Chains/ChainCard", () => {
    test("renders card", async () => {
        const mockHandleOnQuerySuccess = jest.fn()
        const maxBlockSize = 24332

        render(
            <ChainCard 
                name="TeraNode" 
                kind={"tzindex" as unknown as ChainKind} 
                url="https://api.tzstats.com"
                maxBlockSize={maxBlockSize} 
                onQuerySuccess={mockHandleOnQuerySuccess} 
            />
        )

        await waitFor(() => screen.getByText(/pqwA/))

        expect(mockHandleOnQuerySuccess).toBeCalledTimes(1)
        expect(screen.getByText(/TeraNode/i)).toBeInTheDocument()
        expect(screen.getByText(/24,332/i)).toBeInTheDocument()
        expect(screen.getByText(/synced/i)).toBeInTheDocument()
        expect(screen.getByText(/in sync/i)).toBeInTheDocument()
    })

    test("renders card with correct status", async () => {
        const mockHandleOnQuerySuccess = jest.fn()
        mockHandleOnQuerySuccess.mockReset()

        const maxBlockSize = 24350

        render(
            <>
                <ChainCard 
                    name="TeraNode1" 
                    kind={"tzindex" as unknown as ChainKind} 
                    url="https://api.tzstats.com"
                    maxBlockSize={maxBlockSize} 
                    onQuerySuccess={mockHandleOnQuerySuccess} 
                />
                <ChainCard 
                    name="TeraNode2" 
                    kind={"tezos-node" as unknown as ChainKind} 
                    url="https://api-v2.tzstats.com"
                    maxBlockSize={maxBlockSize} 
                    onQuerySuccess={mockHandleOnQuerySuccess} 
                />
                <ChainCard 
                    name="TeraNode3" 
                    kind={"tzindex" as unknown as ChainKind} 
                    url="https://api-v3.tzstats.com"
                    maxBlockSize={maxBlockSize} 
                    onQuerySuccess={mockHandleOnQuerySuccess} 
                />
            </>
        )

        await waitFor(() => screen.getAllByText(/wowA/))

        expect(mockHandleOnQuerySuccess).toBeCalledTimes(3)
        expect(screen.getByText(/TeraNode1/i)).toBeInTheDocument()
        expect(screen.getByText(/TeraNode2/i)).toBeInTheDocument()
        expect(screen.getByText(/TeraNode3/i)).toBeInTheDocument()
        expect(screen.getByText(/24,332/i)).toBeInTheDocument()
        expect(screen.getByText(/24,350/i)).toBeInTheDocument()
        expect(screen.getByText(/24,345/i)).toBeInTheDocument()
        expect(screen.getByText(/not synced/i)).toBeInTheDocument()
        expect(screen.getByText(/failed/i)).toBeInTheDocument()
        expect(screen.getByText(/^synced$/i, {
            exact: true
        })).toBeInTheDocument()
        expect(screen.getByText(/18 blocks out of sync/)).toBeInTheDocument()
        expect(screen.getByText(/5 blocks out of sync/)).toBeInTheDocument()
        expect(screen.getByText(/in sync/)).toBeInTheDocument()
    })
})
