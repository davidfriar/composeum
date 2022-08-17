import { EditorState } from "./state"
import { EditorAction } from "./actions"
import { moveItem } from "./pageutils"

export const reducer = (
  state: EditorState,
  action: EditorAction
): EditorState => {
  switch (action.type) {
    case "setCurrentPath":
      return { ...state, currentPath: action.path }
    case "moveItem":
      console.log(
        `Move. item:${action.itemId} source: ${JSON.stringify(
          action.source
        )} dest: ${JSON.stringify(action.destination)}`
      )
      moveItem(action.page, action.source, action.destination, action.itemId)
      return { ...state }
  }
}
