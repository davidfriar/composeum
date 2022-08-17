import { EditorAction } from "./actions"
import { Dispatch } from "react"
import { OnDragEndResponder } from "react-beautiful-dnd"
import { fromDroppableId } from "./editableSlotWrapper"
import { Page } from "composeum-schema"

export const dragHandler = (
  page: Page,
  dispatch: Dispatch<EditorAction>
): OnDragEndResponder => {
  return (result) => {
    if (result.reason === "DROP") {
      dispatch({
        type: "moveItem",
        page: page,
        itemId: result.draggableId,
        source: {
          ...fromDroppableId(result.source.droppableId),
          index: result.source.index,
        },
        destination: {
          ...fromDroppableId(result.destination!.droppableId),
          index: result.destination!.index,
        },
      })
    }
  }
}
