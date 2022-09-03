import { EditorAction } from "./actions"
import { Dispatch } from "react"
import { OnDragEndResponder } from "@hello-pangea/dnd"
import { fromDroppableId } from "./slotWrapper"
import { Page } from "composeum-schema"

export const dragHandler = (
  page: Page,
  dispatch: Dispatch<EditorAction>
): OnDragEndResponder => {
  return (result) => {
    try {
      if (result && result.reason === "DROP") {
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
    } catch (e) {
      console.log(`Dragging error. ${e}`)
    }
  }
}
