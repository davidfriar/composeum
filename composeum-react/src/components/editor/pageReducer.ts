import { Page } from "composeum-schema"
import { PageAction } from "./actions"
import { updateItem } from "./pageutils"

export const pageReducer = (
  page: Page,
  action: PageAction
): Page | undefined => {
  switch (action.type) {
    case "updateItem":
      return updateItem(page, action.itemId, action.properties)
    case "deleteDraft":
      return undefined
    default:
      return page
  }
}
