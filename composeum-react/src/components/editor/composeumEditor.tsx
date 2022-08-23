import styles from "./composeumEditor.module.css"
import { Composeum } from "../composeum"
import { Page } from "composeum-schema"
import { PageNavigator } from "./pageNavigator"
import { useEffect, useReducer } from "react"
import { DragDropContext } from "react-beautiful-dnd"
import { reducer } from "./reducer"
import { EditorState, getCurrentPage } from "./state"
import { dragHandler } from "./dragHandler"
import { Splitter } from "./splitter"
import { EditorAction } from "./actions"
import { Dispatch, createContext, useContext } from "react"
import { ComposeumConfig } from "../../config"

type EditorContextType =
  | {
      mode: "edit"
      dispatch: Dispatch<EditorAction>
      state: EditorState
      config: ComposeumConfig
    }
  | { mode: "publish" }

export const EditorContext = createContext<EditorContextType>({
  mode: "publish",
})

export const useEditorContext = () => useContext(EditorContext)

export const useEditorDispatch = () => {
  const context = useEditorContext()
  if (context.mode !== "edit") {
    throw new Error("Dispatch not available except in Edit mode")
  }
  return context.dispatch
}

export const useCurrentPage = () => {
  const context = useEditorContext()
  if (context.mode !== "edit") {
    throw new Error("State not available except in Edit mode")
  }
  return getCurrentPage(context.state)
}

export const useConfig = () => {
  const context = useEditorContext()
  if (context.mode !== "edit") {
    throw new Error("Config not available except in Edit mode")
  }
  return context.config
}

type ComposeumEditorProps = {
  config: ComposeumConfig
  rootPage: Page
  path: string
}

export const ComposeumEditor = ({
  rootPage,
  config,
  path,
}: ComposeumEditorProps) => {
  const initialState = { currentPath: path, rootPage: rootPage }
  const [state, dispatch] = useReducer(reducer, initialState)
  const page = getCurrentPage(state)
  const handleDrag = page ? dragHandler(page, dispatch) : () => null
  useEffect(() => {
    dispatch({ type: "setCurrentPath", path: path })
  }, [path])

  return (
    <EditorContext.Provider
      value={{ mode: "edit", dispatch: dispatch, state: state, config: config }}
    >
      <DragDropContext onDragEnd={handleDrag}>
        <div className={styles.container}>
          <Splitter>
            <div className={styles.leftPanel}>
              <PageNavigator state={state} />
            </div>
            <div className={styles.mainPanel}>
              {page ? (
                <Composeum content={page.content} config={config} />
              ) : (
                <div>Page not found</div>
              )}
            </div>
          </Splitter>
        </div>
      </DragDropContext>
    </EditorContext.Provider>
  )
}
