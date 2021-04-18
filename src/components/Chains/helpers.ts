import { AxiosResponse } from "axios";
import { UseQueryResult } from "react-query";
import { ChainKind, ChainQueryResponse, ChainStatus, ChainStatusDetails } from "./types";

export const getChainResponse = (payload: UseQueryResult<AxiosResponse<any>, unknown>, kind: ChainKind): ChainQueryResponse => {
    const { hashIdentifier, levelIdentifier } = getChainResponseIdentifier(kind)
    
    return {
        hash: payload?.data?.data[hashIdentifier],
        height: payload?.data?.data[levelIdentifier]
    }
}

export const getChainResponseIdentifier = (kind: ChainKind) => {
    return {
        hashIdentifier: kind === ChainKind.TezosNode ? 'hash' : 'block_hash',
        levelIdentifier: kind === ChainKind.TezosNode ? 'level' : 'height'
    }
}

export const shortenHash = (hash: string) => {
    return hash.substr(0, 4) + '...' + hash.substr(hash.length - 2, hash.length)
}

export const formatBlockSize = (size: number) => {
    return new Intl.NumberFormat().format(size)
}

export const convertKebabCase = (data: string): string => {
    return data.replaceAll("_", " ")
}

export const getStatusColor = (status: ChainStatus|undefined) => {
    switch (status) {
        case ChainStatus.Synced:
            return "green.500"
        case ChainStatus.NotSynced:
            return "orange.500"
        case ChainStatus.Failed:
            return "red.500"
        default:
            return "gray.500"
    }
}

export const getChainStatusDetails = (max: number, height: number): ChainStatusDetails => {
    const differenceInHeight = Math.abs(max - height)
    if(isNaN(differenceInHeight)) {
        return {
            status: undefined,
            description: undefined
        }
    }

    if(differenceInHeight === 0) {
        return {
            status: ChainStatus.Synced,
            description: "in sync"
        }
    }

    const description = `${differenceInHeight} block${differenceInHeight > 1 ? 's' : ''} out of sync`

    if(differenceInHeight <= 5) {
        return {
            status: ChainStatus.NotSynced,
            description
        }
    }

    return {
        status: ChainStatus.Failed,
        description
    }
}
