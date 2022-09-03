import { ComposeumConfig, getDescendantPaths } from "composeum-react"
import { stringToPathArray, fetchPage } from "composeum-react"
import { useState } from "react"
import {
  dehydrate,
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "react-query"
import { fetchPageTree } from "../hooks/usePage"
import { GetStaticProps } from "next"
import { ReactQueryDevtools } from "react-query/devtools"
import { ComposeumConfigProvider } from "../hooks/useConfig"

const getStaticPathsForPages = (config: ComposeumConfig) => {
  return async () => {
    const rootPage = await fetchPageTree(config)()
    const paths = getDescendantPaths(rootPage).map((path: string) => {
      return {
        params: { path: stringToPathArray(path) },
      }
    })
    return {
      paths: paths,
      fallback: false,
    }
  }
}

const getStaticPropsForPage = (config: ComposeumConfig): GetStaticProps => {
  return async ({ params: path }) => {
    const pathArray = path?.path as string[]
    const pathString = pathArray?.join("/")

    const queryClient = new QueryClient()
    const queryFn = fetchPage(config, pathString)
    await queryClient.prefetchQuery(["Pages", ...pathArray], queryFn)
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        path: pathString,
      },
    }
  }
}

const getStaticPropsForEditor = (config: ComposeumConfig): GetStaticProps => {
  return async () => {
    const queryClient = new QueryClient()
    const queryFn = fetchPageTree(config)
    await queryClient.prefetchQuery(["PageTree"], queryFn)
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    }
  }
}

type ProviderProps = {
  dehydratedState: any
  config: ComposeumConfig
  children: JSX.Element
}
const Provider = ({ dehydratedState, children, config }: ProviderProps) => {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <ComposeumConfigProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </ComposeumConfigProvider>
  )
}

export const NextJSAdapter = {
  getStaticPropsForPage,
  getStaticPathsForPages,
  getStaticPropsForEditor,
  Provider,
}
