export enum ChainKind {
    TezosNode = "tezos-node",
    TezosIndexer = "tzindex"
}

export interface ChainQueryResponse {
    height: number,
    hash: string
}

export enum ChainStatus {
    Synced = "synced",
    NotSynced = "not_synced",
    Failed = "failed"
}

export interface ChainStatusDetails {
    status: ChainStatus|undefined,
    description: string|undefined
}

export interface ChainDataCard {
    title: string,
    kind: ChainKind,
    url: string
}

export interface ChainData {
    title: string
    cards: ChainDataCard[]
}