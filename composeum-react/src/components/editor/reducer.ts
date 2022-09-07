import { EditorState } from "./state"
import { EditorAction } from "./actions"
import { moveItem, updateItem } from "./pageutils"

export const reducer = (
  state: EditorState,
  action: EditorAction
): EditorState => {
  console.log(`Reducer: ${action.type}`)
  switch (action.type) {
    case "setCurrentPath":
      return {
        currentPath: action.path,
      }
    case "moveItem":
      console.log(
        `Move. item:${action.itemId} source: ${JSON.stringify(
          action.source
        )} dest: ${JSON.stringify(action.destination)}`
      )
      const newDraft = moveItem(
        action.page,
        action.source,
        action.destination,
        action.itemId
      )
      return { ...state, draft: newDraft }
    case "editItem":
      console.log(`The dude wants to edit a component: ${action.itemId}`)
      return { ...state, selectedItem: action.itemId }
    case "updateItem":
      const page = state.draft ?? state.originalPage
      return page
        ? {
            ...state,
            draft: updateItem(page, action.itemId, action.properties),
          }
        : state
    case "deleteDraft":
      return { ...state, draft: undefined }
    case "setDraft":
      console.log(`SET DRAFT: ${action.page}`)
      return { ...state, draft: action.page }
    case "setOriginalPage":
      console.log(`SET ORIGINAL: ${action.page}`)
      return { ...state, originalPage: action.page }
  }
}
