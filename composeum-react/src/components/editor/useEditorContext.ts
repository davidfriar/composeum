import { Dispatch, createContext, useContext } from "react"
import { EditorAction } from "./actions"
import { EditorState } from "./state"

type EditorContextType = {
  dispatch: Dispatch<EditorAction>
  state: EditorState
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
  const context = useEditorContext()
  return context.state.draft ?? context.state.originalPage
}

export const EditorContextProvider = EditorContext.Provider
