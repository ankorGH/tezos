import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  theme,
  Flex,
  Spacer,
  IconButton,
} from "@chakra-ui/react"
import { FaSpinner } from "react-icons/fa"
import { QueryClient, QueryClientProvider,  } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'

import TzData from "./data/chains.json"
import { ChainData } from "./components/Chains"
import { Chains } from "./components/Chains"
import { ColorModeSwitcher } from "./ColorModeSwitcher"


export const App = () => {
  const queryClient = new QueryClient()
  
  const handleRefresh = async () => {
    await queryClient.refetchQueries()  
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Box fontSize="lg" minH="100vh" p={8}>
          <Flex pb={4}>
            <Text fontSize="xl" fontWeight="semibold">Tezos Mainnet Status Sync</Text>
            <Spacer />
            <IconButton colorScheme="green" aria-label="Refresh" icon={<FaSpinner />} onClick={handleRefresh} />
            <ColorModeSwitcher justifySelf="flex-end" />
          </Flex>
          <Chains data={TzData as unknown as ChainData[]}/>
        </Box>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
