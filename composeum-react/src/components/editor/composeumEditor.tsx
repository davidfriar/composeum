import styles from "./composeumEditor.module.css"
import { Composeum } from "../composeum"
import { PageNavigator } from "./pageNavigator"
import { useEffect, useReducer } from "react"
import { DragDropContext } from "@hello-pangea/dnd"
import { reducer } from "./reducer"
import { dragHandler } from "./dragHandler"
import { Splitter } from "./splitter"
import { EditorContextProvider } from "./useEditorContext"
import { ItemEditor } from "./itemEditor"
import { EditableComponentWrapper } from "./componentWrapper"
import { EditableSlotWrapper } from "./slotWrapper"
import { usePageDraft } from "../../hooks/usePage"

type ComposeumEditorProps = {
  path: string
}

export const ComposeumEditor = ({ path }: ComposeumEditorProps) => {
  const initialState = { currentPath: path, editing: null, shouldSave: false }
  const [state, dispatch] = useReducer(reducer, initialState)
  const { queryResult, save } = usePageDraft(state, dispatch)

  // console.log(`ComposeumEditor. state=${JSON.stringify(state)}`)
  console.log(`ComposeumEditor. rendering`)

  useEffect(() => {
    dispatch({ type: "setCurrentPath", path: path })
    return () => save()
  }, [path])

  if (queryResult.isError) {
    return <div>Editor could not fetch page</div>
  }
  if (queryResult.isLoading) {
    return <div>Loading</div>
  }
  const page = state.draft ?? queryResult.data
  if (page) {
    const handleDrag = dragHandler(page, dispatch)
    return (
      <EditorContextProvider value={{ dispatch: dispatch, state: state }}>
        <DragDropContext onDragEnd={handleDrag}>
          <div className={styles.container}>
            <Splitter>
              <div className={styles.leftPanel}>
                <PageNavigator />
                {state.selectedItem ? (
                  <ItemEditor page={page} itemId={state.selectedItem} />
                ) : null}
              </div>
              <div className={styles.mainPanel}>
                <Composeum
                  content={page.content}
                  slotWrapper={EditableSlotWrapper}
                  componentWrapper={EditableComponentWrapper}
                />
              </div>
            </Splitter>
          </div>
        </DragDropContext>
      </EditorContextProvider>
    )
  }
  return null
}
