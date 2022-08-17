import styles from "./composeumEditor.module.css"
import { Composeum } from "../composeum"
import { Page } from "composeum-schema"
import { ReactComponentMap } from "../../types/componentMap"
import { PageNavigator } from "./pageNavigator"
import { useEffect, useReducer } from "react"
import { DragDropContext } from "react-beautiful-dnd"
import { reducer } from "./reducer"
import { getCurrentPage } from "./state"
import { dragHandler } from "./dragHandler"
import { Splitter } from "./splitter"

type ComposeumEditorProps = {
  componentMap: ReactComponentMap
  rootPage: Page
  path: string
}

export const ComposeumEditor = ({
  rootPage,
  componentMap,
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
    <DragDropContext onDragEnd={handleDrag}>
      <div className={styles.container}>
        <Splitter>
          <div className={styles.leftPanel}>
            <PageNavigator state={state} dispatch={dispatch} />
          </div>
          <div className={styles.mainPanel}>
            {page ? (
              <Composeum
                content={page.content}
                componentMap={componentMap}
                mode="edit"
              />
            ) : (
              <div>Page not found</div>
            )}
          </div>
        </Splitter>
      </div>
    </DragDropContext>
  )
}
