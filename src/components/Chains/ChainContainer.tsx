import * as React from "react"
import { Box } from "@chakra-ui/react"

export interface ChainContainerProps {
    children: React.ReactNode
}

export const ChainContainer = (props: ChainContainerProps) => {
    return (<Box pb={8}>{props.children}</Box>)
}