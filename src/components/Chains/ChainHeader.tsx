import * as React from "react"
import { Text } from "@chakra-ui/react"

export interface ChainHeaderProps {
    title: string
}

export const ChainHeader = (props: ChainHeaderProps) => {
    return (<Text fontSize="lg" pb={4}>{props.title}</Text>)
}