import { Page } from "composeum-client"
import { Tree, NodeRenderer } from "react-arborist"
import { EditorState } from "./state"
import { useEditorDispatch } from "./useEditorContext"

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
}
const TreeItem: NodeRenderer<TreeData> = ({ innerRef, styles, data }) => {
  const dispatch = useEditorDispatch()
  return (
    <div ref={innerRef} style={styles.row}>
      <div
        style={styles.indent}
        onClick={() => dispatch({ type: "setCurrentPath", path: data.id })}
      >
        {data.name}
      </div>
    </div>
  )
}

type PageNavigatorProps = {
  state: EditorState
}

export const PageNavigator = ({
  state: { rootPage, currentPath },
}: PageNavigatorProps) => {
  const treeData = mapTree(rootPage, (page) => {
    return {
      id: page.path,
      name: pageName(page.path),
    }
  })
  return <Tree data={treeData}>{TreeItem}</Tree>
}
