import { ItemId } from "composeum-schema"

export type EditorState = {
  currentPath: string
  editing: ItemId | null
}
