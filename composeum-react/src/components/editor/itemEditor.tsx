import { ItemId, Page } from "composeum-schema"
import { useConfig } from "../../hooks/useConfig"
import { findItemInPage } from "./pageutils"
import { ComponentEditor } from "./componentEditor"
import { getComponentByName } from "../../config"
import { useEditorDispatch } from "./useEditorContext"
import { Properties } from "composeum-schema"

type ItemEditorProps = { itemId: ItemId; page: Page }
export const ItemEditor = ({ itemId, page }: ItemEditorProps) => {
  const item = findItemInPage(page, itemId)
  if (!item) {
    return null
  }
  const component = getComponentByName(useConfig(), item.componentType)
  if (!component) {
    throw new Error(`Cannot find component with name: ${item.componentType}`)
  }
  const dispatch = useEditorDispatch()
  const setData = (props: Properties) =>
    dispatch({
      type: "updateItem",
      itemId: item.itemId,
      properties: props,
    })

  return (
    <ComponentEditor
      data={item.properties}
      schema={component.schema}
      setData={setData}
      uiSchema={component.uiSchema}
    />
  )
}
