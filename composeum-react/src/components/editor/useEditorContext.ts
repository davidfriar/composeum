import { Dispatch, createContext, useContext } from "react"
import { EditorAction } from "./actions"
import { EditorState, getCurrentPage } from "./state"
import { ComposeumConfig } from "../../config"

type EditorContextType = {
  dispatch: Dispatch<EditorAction>
  state: EditorState
  config: ComposeumConfig
}

export const EditorContext = createContext<EditorContextType | null>(null)

export const useEditorContext = () => {
  const context = useContext(EditorContext)
  if (!context) throw Error("Editor context has not been initialised")
  return context
}

export const useEditorDispatch = () => {
  return useEditorContext().dispatch
}

export const useCurrentPage = () => {
  const context = useContext(EditorContext)
  return context ? getCurrentPage(context.state) : null
}

export const useConfig = () => {
  return useEditorContext().config
}

export const EditorContextProvider = EditorContext.Provider
