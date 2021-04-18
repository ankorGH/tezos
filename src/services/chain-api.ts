import axios from "axios"

import { ChainKind } from "../components/Chains/types"

export const getChainStatus = (url: string, kind: ChainKind) => {
    url += kind === ChainKind.TezosNode ? '/chains/main/blocks/head/header' : '/explorer/tip'

    return axios.get(url)
}