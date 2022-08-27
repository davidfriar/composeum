import { ItemId } from "composeum-schema"
import { useConfig, useCurrentPage } from "./useEditorContext"
import { findItemInPage } from "./pageutils"
import { ComponentEditor } from "./componentEditor"
import { getComponentByName } from "../../config"

type ItemEditorProps = { itemId: ItemId }
export const ItemEditor = ({ itemId }: ItemEditorProps) => {
  const page = useCurrentPage()
  if (!page) {
    return null
  }
  const item = findItemInPage(page, itemId)
  if (!item) {
    return null
  }
  const config = useConfig()
  const component = getComponentByName(config, item.componentType)
  if (!component) {
    throw new Error(`Cannot find component with name: ${item.componentType}`)
  }
  const setData = (_x: any) => null // should we have local state here?

  return (
    <ComponentEditor
      data={item.properties}
      schema={component.schema}
      setData={setData}
      uiSchema={component.uiSchema}
    />
  )
}
