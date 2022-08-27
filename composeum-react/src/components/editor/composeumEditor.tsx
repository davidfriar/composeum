import styles from "./composeumEditor.module.css"
import { Composeum } from "../composeum"
import { Page } from "composeum-schema"
import { PageNavigator } from "./pageNavigator"
import { useEffect, useReducer } from "react"
import { DragDropContext } from "react-beautiful-dnd"
import { reducer } from "./reducer"
import { dragHandler } from "./dragHandler"
import { Splitter } from "./splitter"
import { EditorContextProvider } from "./useEditorContext"
import { ComposeumConfig } from "../../config"
import { ItemEditor } from "./itemEditor"
import { EditableComponentWrapper } from "./componentWrapper"
import { EditableSlotWrapper } from "./slotWrapper"
import { getCurrentPage } from "./state"

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
  const initialState = { currentPath: path, rootPage: rootPage, editing: null }
  const [state, dispatch] = useReducer(reducer, initialState)
  const page = getCurrentPage(state)
  const handleDrag = page ? dragHandler(page, dispatch) : () => null
  useEffect(() => {
    dispatch({ type: "setCurrentPath", path: path })
  }, [path])

  return (
    <EditorContextProvider
      value={{ dispatch: dispatch, state: state, config: config }}
    >
      <DragDropContext onDragEnd={handleDrag}>
        <div className={styles.container}>
          <Splitter>
            <div className={styles.leftPanel}>
              <PageNavigator state={state} />
              {state.editing ? <ItemEditor itemId={state.editing} /> : null}
            </div>
            <div className={styles.mainPanel}>
              {page ? (
                <Composeum
                  content={page.content}
                  config={config}
                  slotWrapper={EditableSlotWrapper}
                  componentWrapper={EditableComponentWrapper}
                />
              ) : (
                <div>Page not found</div>
              )}
            </div>
          </Splitter>
        </div>
      </DragDropContext>
    </EditorContextProvider>
  )
}
