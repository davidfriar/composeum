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
import useCombinedReducers from "../../hooks/useCombinedReducers"
import { Page } from "composeum-schema"
import { EditorState } from "./state"

type ComposeumEditorProps = {
  path: string
}

export const ComposeumEditor = ({ path }: ComposeumEditorProps) => {
  const initialState = { currentPath: path, editing: null }
  const [editorState, editorDispatch] = useReducer(reducer, initialState)
  const {
    save,
    queryResult,
    draft,
    dispatch: draftDispatch,
  } = usePageDraft(editorState.currentPath)
  const [state, dispatch] = useCombinedReducers<{
    editor: EditorState
    page: Page | undefined
  }>({
    editor: [editorState, editorDispatch],
    page: [draft, draftDispatch],
  })

  useEffect(() => {
    dispatch({ type: "setCurrentPath", path: path })
  }, [path])

  if (queryResult.isError) {
    return <div>Editor could not fetch page</div>
  }
  if (queryResult.isLoading) {
    return <div>Loading</div>
  }
  if (draft) {
    const handleDrag = dragHandler(draft, dispatch)
    return (
      <EditorContextProvider value={{ dispatch: dispatch, state: state }}>
        <DragDropContext onDragEnd={handleDrag}>
          <div className={styles.container}>
            <Splitter>
              <div className={styles.leftPanel}>
                <PageNavigator />
                {state.editor.editing ? (
                  <ItemEditor page={draft} itemId={state.editor.editing} />
                ) : null}
                <button onClick={() => save()}>Save</button>
              </div>
              <div className={styles.mainPanel}>
                <Composeum
                  content={draft.content}
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
