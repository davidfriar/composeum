import { Page } from "composeum-client"
import { Tree, NodeRenderer } from "react-arborist"
import { EditorAction, EditorState } from "./composeumEditor"
import { Dispatch } from "react"

const mapTree = (page: Page, f: (p: Page) => any) => {
  const result = f(page)
  result.children = page.children?.map((p) => mapTree(p, f))
  return result
}

const pageName = (path: string) => {
  return path.slice(path.lastIndexOf("/") + 1, path.lastIndexOf("."))
}

type TreeData = {
  id: string
  name: string
  dispatch: Dispatch<EditorAction>
}
const TreeItem: NodeRenderer<TreeData> = ({ innerRef, styles, data }) => {
  return (
    <div ref={innerRef} style={styles.row}>
      <div
        style={styles.indent}
        onClick={() => data.dispatch({ type: "setCurrentPath", path: data.id })}
      >
        {data.name}
      </div>
    </div>
  )
}

type PageNavigatorProps = {
  state: EditorState
  dispatch: Dispatch<EditorAction>
}

export const PageNavigator = ({
  dispatch,
  state: { rootPage },
}: PageNavigatorProps) => {
  const treeData = mapTree(rootPage, (page) => {
    return {
      id: page.path,
      name: pageName(page.path),
      dispatch: dispatch,
    }
  })
  return <Tree data={treeData}>{TreeItem}</Tree>
}
