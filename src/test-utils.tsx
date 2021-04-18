import * as React from "react"
import { render, RenderOptions } from "@testing-library/react"
import { ChakraProvider, theme } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "react-query"

const AllProviders = ({ children }: { children?: React.ReactNode }) => {
  const client = new QueryClient()
  return (
    <QueryClientProvider client={client}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </QueryClientProvider>
  )
}


const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options })

export { customRender as render }
