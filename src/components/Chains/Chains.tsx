import * as React from "react"

import { ChainCard } from "./ChainCard"
import { ChainHeader } from "./ChainHeader"
import { ChainCardContainer } from "./ChainCardContainer"
import { ChainContainer } from "./ChainContainer"
// import TzData from "../../data/chains.json"
import { ChainData, ChainKind } from "./types"

export interface ChainsProps {
    data: ChainData[]
}

export const Chains = (props: ChainsProps) => {
    const [maxBlocksize, setMaxBlockSize] = React.useState(0) 

    const handleOnQuerySuccess = (size: number) => {
        if(size > maxBlocksize) {
            setMaxBlockSize(size)
        }
    }

    return (
        <>
            {props.data.map((tzdata, index) => (
                <ChainContainer key={`${tzdata.title}-${index}`}>
                    <ChainHeader title={tzdata.title}/>
                    <ChainCardContainer>
                        {tzdata.cards.map((d, i) => (
                            <ChainCard key={`${d.title}-${i}-${d.title}`} name={d.title} kind={d.kind as unknown as ChainKind} url={d.url} 
                            maxBlockSize={maxBlocksize} onQuerySuccess={handleOnQuerySuccess}/>
                        ))}
                        </ChainCardContainer>
                </ChainContainer>
            ))}
        </>
    )
}