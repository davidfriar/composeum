import { Page } from "composeum-schema"
import { ComposeumConfig } from "../config"
import { ComposeumClient } from "composeum-client"
import { useQuery } from "react-query"
import { useConfig } from "./useConfig"
import {
  stringToPathArray,
  appendJSONFileExtension,
  normalisePathString,
} from "./pathutils"
import { useReactQueryAutoSync } from "use-react-query-auto-sync"
import { PageAction } from "../components/editor/actions"
import { pageReducer } from "../components/editor/pageReducer"
import { Dispatch } from "react"

export const fetchPage = (config: ComposeumConfig, path: string) => {
  return async () => {
    const baseURL = config.apiBaseUrl
    const client = new ComposeumClient(baseURL, { enableCache: false })
    return client.getPage(appendJSONFileExtension(path))
  }
}

export const fetchPageTree = (
  config: ComposeumConfig,
  rootPath?: string,
  depth = 100
) => {
  return async () => {
    const baseURL = config.apiBaseUrl
    const root = appendJSONFileExtension(rootPath ? rootPath : config.rootPage)
    const client = new ComposeumClient(baseURL, { enableCache: false })
    return client.getPageTree(root, depth)
  }
}

const savePage = (config: ComposeumConfig) => {
  return async (page: Page) => {
    const baseURL = config.apiBaseUrl
    const client = new ComposeumClient(baseURL, { enableCache: false })
    return client.savePage(page)
  }
}

export const usePage = (pathString: string) => {
  const path = stringToPathArray(pathString)
  const s = normalisePathString(pathString)
  const queryFn = fetchPage(useConfig(), s)
  return useQuery(["Pages", ...path], queryFn)
}

export const usePageTree = () => {
  const queryFn = fetchPageTree(useConfig())
  return useQuery(["PageTree"], queryFn)
}

export const usePageDraft = (pathString: string) => {
  const queryFn = fetchPage(useConfig(), normalisePathString(pathString))
  const mutationFn = savePage(useConfig())
  const queryKey = ["Pages", ...stringToPathArray(pathString)]

  const { draft, setDraft, queryResult, save } = useReactQueryAutoSync({
    queryOptions: {
      queryKey: queryKey,
      queryFn: queryFn,
    },
    mutationOptions: {
      mutationFn: mutationFn,
      mutationKey: queryKey,
    },
    autoSaveOptions: { wait: 5000 },
  })

  const dispatch: Dispatch<PageAction> = (action: PageAction) => {
    if (draft) {
      setDraft(pageReducer(draft, action))
    }
  }

  return { draft, dispatch, queryResult, save }
}
