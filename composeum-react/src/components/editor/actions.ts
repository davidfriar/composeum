import { ItemId, Page, Properties } from "composeum-schema"

export type EditorAction =
  | SetCurrentPathAction
  | MoveItemAction
  | EditItemAction
  | UpdateItemAction
  | DeleteDraft
  | SetDraft
  | SetOriginalPage

export interface SetCurrentPathAction {
  type: "setCurrentPath"
  path: string
}

export interface EditItemAction {
  type: "editItem"
  itemId: ItemId
}

export interface UpdateItemAction {
  type: "updateItem"
  itemId: ItemId
  properties: Properties
}

export interface MoveItemAction {
  type: "moveItem"
  page: Page
  itemId: ItemId
  source: { itemId: ItemId; slotName: string; index: number }
  destination: { itemId: ItemId; slotName: string; index: number }
}

export interface DeleteDraft {
  type: "deleteDraft"
}

export interface SetDraft {
  type: "setDraft"
  page: Page | undefined
}

export interface SetOriginalPage {
  type: "setOriginalPage"
  page: Page | undefined
}
