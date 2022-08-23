import { ItemId, Page } from "composeum-schema"

export type EditorAction =
  | SetCurrentPathAction
  | MoveItemAction
  | EditItemAction

export interface SetCurrentPathAction {
  type: "setCurrentPath"
  path: string
}
export interface MoveItemAction {
  type: "moveItem"
  page: Page
  itemId: ItemId
  source: { itemId: ItemId; slotName: string; index: number }
  destination: { itemId: ItemId; slotName: string; index: number }
}

export interface EditItemAction {
  type: "editItem"
  itemId: ItemId
}
