import { AxiosResponse } from "axios"
import { UseQueryResult } from "react-query"

import { ChainStatus, ChainKind } from "../types"
import { convertKebabCase, formatBlockSize, getChainResponse, getChainResponseIdentifier, getChainStatusDetails, getStatusColor, shortenHash } from "../helpers"
import chainResponseData from "./resources/chain-response-payload.json"

describe("Chains/helpers", () => {
    describe("Chain/Helpers/ConvertKebabCase", () => {
        test("should return the right ouptut", () => {
            const payload = [
                {
                    input: "Thsa_sapsa",
                    output: "Thsa sapsa"
                },
                {
                    input: "pas-sas_oew",
                    output: "pas-sas oew"
                }
            ]

            payload.forEach((p) => {
                expect(convertKebabCase(p.input)).toBe(p.output)
            })
        })
    })

    describe("Chain/Helpers/GetChainStatusDetails", () => {
        test("should return the right ouptut", () => {
            const payload = [
                {
                    max: 2902323,
                    level: 2902323,
                    output: {
                        status: "synced",
                        description: "in sync"
                    }
                },
                {
                    max: 2902323,
                    level: 2902320,
                    output: {
                        status: "not_synced",
                        description: "3 blocks out of sync"
                    }
                },
                {
                    max: 2902323,
                    level: 2902322,
                    output: {
                        status: "not_synced",
                        description: "1 block out of sync"
                    }
                },
                {
                    max: 2902323,
                    level: 2901323,
                    output: {
                        status: "failed",
                        description: "1000 blocks out of sync"
                    }
                },
                {
                    max: 2902323,
                    level: "sasa" as unknown as number,
                    output: {
                        status: undefined,
                        description: undefined
                    }
                }
            ]

            payload.map(p => {
                expect(getChainStatusDetails(p.max, p.level)).toEqual(p.output)
            })
        })
    })

    describe("Chain/Helpers/FormatBlockSize", () => {
        test("should return the right output", () => {
            const payload = [
                {
                    size: 328934894,
                    output: "328,934,894"
                },
                {
                    size: "328934894ds" as unknown as number,
                    output: "NaN"
                },
                {
                    size: 228,
                    output: "228"
                }
            ]

            payload.map(p => {
                expect(formatBlockSize(p.size)).toBe(p.output)
            })
        })
    })

    describe("Chain/Helpers/ShortenHash", () => {
        test("should return the right output", () => {
            const payload = [
                {
                    hash: "sdmUsklas9302sa",
                    output: "sdmU...sa"
                },
                {
                    hash: "psaUsklas9302sa",
                    output: "psaU...sa"
                },
                {
                    hash: "isuasklas9302sa",
                    output: "isua...sa"
                }
            ]

            payload.map(p => {
                expect(shortenHash(p.hash)).toBe(p.output)
            })
        })
    })

    describe("Chain/Helpers/GetStatusColor", () => {
        test("should return the right output", () => {
            const payload = [
                {
                    status: "synced",
                    output: "green.500"
                },
                {
                    status: "not_synced",
                    output: "orange.500"
                },
                {
                    status: "failed",
                    output: "red.500"
                },
                {
                    status: "",
                    output: "gray.500"
                }
            ]

            payload.map(p => {
                expect(getStatusColor(p.status as unknown as ChainStatus)).toBe(p.output)
            })
        })
    })

    describe("Chain/Helpers/GetChainResponseIdentifier", () => {
        test("should return the right output", () => {
            const payload = [
                {
                    kind: "tezos-node",
                    output: {
                        hashIdentifier: "hash",
                        levelIdentifier: "level"
                    }
                },
                {
                    kind: "tzindex",
                    output: {
                        hashIdentifier: "block_hash",
                        levelIdentifier: "height"
                    }
                }
            ]

            payload.map(p => {
                expect(getChainResponseIdentifier(p.kind as unknown as ChainKind)).toEqual(p.output)
            })
        })
    })

    describe("Chain/Helpers/GetChainResponse", () => {
        test("should return the right output", () => {
            chainResponseData.map(p => {
                expect(getChainResponse(p.payload as unknown as UseQueryResult<AxiosResponse<any>, unknown>, p.kind as unknown as ChainKind)).toEqual(p.output)
            })
        })
    })
})