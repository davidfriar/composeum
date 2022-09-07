import { Page } from "composeum-client"
import { Tree, NodeRenderer } from "react-arborist"
import { useEditorDispatch } from "./useEditorContext"
import { usePageTree } from "../../hooks/usePage"
import Link from "next/link"

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
  const handleclick = () => {
    dispatch({ type: "setCurrentPath", path: data.id })
  }
  return (
    <div ref={innerRef} style={styles.row}>
      <div style={styles.indent}>
        <Link href={`edit?path=${data.id}`}>{data.name}</Link>
      </div>
    </div>
  )
}

export const PageNavigator = () => {
  const { error, data } = usePageTree()

  if (error) {
    return <div>No page tree data</div>
  }
  const rootPage = data!
  const treeData = mapTree(rootPage, (page) => {
    return {
      id: page.path,
      name: pageName(page.path),
    }
  })
  return <Tree data={treeData}>{TreeItem}</Tree>
}
