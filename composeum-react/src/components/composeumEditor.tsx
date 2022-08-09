import styles from "./composeumEditor.module.css"
import { Composeum } from "./composeum"
import { Page } from "composeum-schema"
import { ReactComponentMap } from "../types/componentMap"
import { PageNavigator } from "./pageNavigator"
import { useEffect, useReducer } from "react"

const findPage = (parentPage: Page, path: string): Page | null => {
  if (parentPage.path === path) {
    return parentPage
  } else {
    for (let child of parentPage.children || []) {
      const result = findPage(child, path)
      if (result) {
        return result
      }
    }
    return null
  }
}

const getCurrentPage = ({ rootPage, currentPath }: EditorState) => {
  return findPage(rootPage, currentPath)
}

type ComposeumEditorProps = {
  componentMap: ReactComponentMap
  rootPage: Page
  path: string
}

export type EditorState = {
  rootPage: Page
  currentPath: string
}
type EditorActionType = "setCurrentPath"
export type EditorAction = {
  type: EditorActionType
  path: string
}

const reducer = (state: EditorState, action: EditorAction): EditorState => {
  switch (action.type) {
    case "setCurrentPath":
      return { ...state, currentPath: action.path }
    default:
      return state
  }
}

export const ComposeumEditor = ({
  rootPage,
  componentMap,
  path,
}: ComposeumEditorProps) => {
  const initialState = { currentPath: path, rootPage: rootPage }
  const [state, dispatch] = useReducer(reducer, initialState)
  const page = getCurrentPage(state)
  useEffect(() => {
    dispatch({ type: "setCurrentPath", path: path })
  }, [path])

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <PageNavigator state={state} dispatch={dispatch} />
      </div>
      {page ? (
        <div className={styles.mainPanel}>
          <Composeum
            content={page.content}
            componentMap={componentMap}
            mode="edit"
          />
        </div>
      ) : (
        <div>Page not found</div>
      )}
      <div className={styles.rightPanel}>This is the right panel</div>
    </div>
  )
}
