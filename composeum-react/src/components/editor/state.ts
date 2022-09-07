import { ItemId, Page } from "composeum-schema"

export type EditorState = {
  currentPath: string
  selectedItem?: ItemId
  draft?: Page
  originalPage?: Page
}
