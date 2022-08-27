import { Page, ItemId } from "composeum-schema"
import { findPage } from "./pageutils"

export type EditorState = {
  rootPage: Page
  currentPath: string
  editing: ItemId | null
}

export const getCurrentPage = ({ rootPage, currentPath }: EditorState) => {
  return findPage(rootPage, currentPath)
}
