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
import { EditorAction } from "../components/editor/actions"
import { Dispatch } from "react"
import { EditorState } from "../components/editor/state"

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

export const usePageDraft = (
  state: EditorState,
  dispatch: Dispatch<EditorAction>
) => {
  const pathString = normalisePathString(state.currentPath)
  const pathArray = stringToPathArray(state.currentPath)
  const config = useConfig()
  const queryFn = fetchPage(config, pathString)
  const mutationFn = savePage(config)
  const queryKey = ["Pages", ...pathArray]

  const { draft, queryResult, save } = useReactQueryAutoSync({
    queryOptions: {
      queryKey: queryKey,
      queryFn: queryFn,
    },
    mutationOptions: {
      mutationFn: mutationFn,
      mutationKey: queryKey,
    },
    autoSaveOptions: { wait: 5000 },
    draftProvider: {
      draft: state.draft,
      setDraft: (draft: Page | undefined) =>
        dispatch({ type: "setDraft", page: draft }),
    },
  })

  if (!state.originalPage && queryResult.data) {
    dispatch({ type: "setOriginalPage", page: queryResult.data })
  }

  return { draft, queryResult, save }
}
