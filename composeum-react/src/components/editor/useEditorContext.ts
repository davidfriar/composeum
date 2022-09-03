import { Dispatch, createContext, useContext } from "react"
import { EditorAction } from "./actions"
import { EditorState } from "./state"
import { usePage } from "../../hooks/usePage"
import { PageAction } from "./actions"
import { Page } from "composeum-schema"

type GlobalState = { editor: EditorState; page: Page | undefined }

type EditorContextType = {
  dispatch: Dispatch<EditorAction | PageAction>
  state: GlobalState
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
  console.log("&&&&&&&&&&&&&&&&&&&&&&&& entering useCurrentPage")
  const context = useEditorContext()
  console.log("before")
  const path = context.state.editor.currentPath
  console.log("after")
  return usePage(path)
}

export const EditorContextProvider = EditorContext.Provider
