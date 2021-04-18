import * as React from "react"
import { Wrap } from "@chakra-ui/react"

export interface ChainCardContainerProps {
    children: React.ReactNode
}

export const ChainCardContainer = (props: ChainCardContainerProps) => {
    return (<Wrap>{props.children}</Wrap>)
}