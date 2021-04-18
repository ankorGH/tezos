import * as React from "react"
import { Text, Box, Flex, Spacer, Divider, Icon, WrapItem, useColorMode } from "@chakra-ui/react"
import { FiBox } from "react-icons/fi"
import { useQuery } from 'react-query'

import { ChainKind } from "./types"
import { defaultText } from "../../utils/helpers"
import { getChainStatus } from "../../services/chain-api"
import { getChainResponse, shortenHash, formatBlockSize, getChainResponseIdentifier, getChainStatusDetails, getStatusColor, convertKebabCase } from "./helpers"

export interface ChainCardProps {
    name: string
    kind: ChainKind
    url: string
    onQuerySuccess: (size: number) => void
    maxBlockSize: number
}

export const ChainCard = (props: ChainCardProps) => {
    const { colorMode } = useColorMode()
    const { name, kind, url, onQuerySuccess, maxBlockSize } = props

    const chainQuery = useQuery(`chainQuery:${kind}:${name}`, () => getChainStatus(url, kind), {
        refetchInterval: 1000 * 60,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            const { levelIdentifier } = getChainResponseIdentifier(kind)
            if(typeof data.data[levelIdentifier] === "number") {
                return onQuerySuccess(data.data[levelIdentifier])
            }
        }
    })
    const chainQueryResponse = getChainResponse(chainQuery, kind)
    const chainStatusDetails = getChainStatusDetails(maxBlockSize, chainQueryResponse.height)
    const chainStatusColor = getStatusColor(chainStatusDetails.status)
    
    return (
    <WrapItem>
        <Box p={4} shadow="lg" w="400px" fontSize="sm" _hover={{
            bg: colorMode  === "light" ? "gray.50" : "whiteAlpha.50"
        }}>
            <Flex pb={2}>
                <Box bg={chainStatusColor} mt={2} mr={2} w={2} h={2} borderRadius="50%"></Box>
                <Text>{name || defaultText}</Text>
                <Spacer />
                <Text mr={1}>status: </Text>
                <Text color={chainStatusColor} fontWeight="bold">{chainStatusDetails.status ? convertKebabCase(chainStatusDetails.status) : defaultText}</Text>
            </Flex>

            <Text pb={2} fontSize="small">{kind === ChainKind.TezosNode ? "blockchain" : "indexer"} node</Text>

            <Divider />

            <Flex pt={2} pb={1}>
                <Icon as={FiBox} mr={2} mt={1} />
                <Text>{chainQueryResponse.height ? formatBlockSize(chainQueryResponse.height) : chainQueryResponse.height}</Text>
                <Spacer />
                <Text>{chainQueryResponse.hash ? shortenHash(chainQueryResponse.hash) : defaultText}</Text>
            </Flex>

            <Text fontSize="small">{chainStatusDetails.description || defaultText}</Text>
        </Box>
    </WrapItem>
    )
}