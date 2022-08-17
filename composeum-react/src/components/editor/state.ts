import { Page } from "composeum-schema"
import { findPage } from "./pageutils"

export type EditorState = {
  rootPage: Page
  currentPath: string
}

export const getCurrentPage = ({ rootPage, currentPath }: EditorState) => {
  return findPage(rootPage, currentPath)
}
