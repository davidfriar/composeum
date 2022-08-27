import { ComposeumConfig } from "../config"
import { ComposeumClient } from "composeum-client"
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { useState } from "react"

const fetchPage = async (config: ComposeumConfig, path: string) => {
  const baseURL = config.apiBaseUrl
  const client = new ComposeumClient(baseURL, { enableCache: false })
  return client.getPage(path)
}

const fetchPageTree = async (
  config: ComposeumConfig,
  rootPath?: string,
  depth = 100
) => {
  const baseURL = config.apiBaseUrl
  const root = rootPath ? rootPath : config.rootPage
  const client = new ComposeumClient(baseURL, { enableCache: false })
  return client.getPageTree(root, depth)
}

type ComposeumQueryClientProviderProps = {
  dehydratedState: any
  children: JSX.Element
}
export const ComposeumQueryClientProvider = ({
  dehydratedState,
  children,
}: ComposeumQueryClientProviderProps) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>{children}</Hydrate>
    </QueryClientProvider>
  )
}
