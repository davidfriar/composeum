import { Droppable, DroppableId } from "react-beautiful-dnd"
import { ItemId } from "composeum-schema"

const sep = "-"
const toDroppableid = (itemId: ItemId, slotName: string) =>
  [itemId, slotName].join(sep)
export const fromDroppableId = (droppableId: DroppableId) => {
  const parts = droppableId.split(sep)
  return { itemId: parts[0], slotName: parts[1] }
}

type EditableSlotWrapperProps = {
  children: JSX.Element
  itemId: ItemId
  name: string
}
export const EditableSlotWrapper = ({
  children,
  itemId,
  name,
}: EditableSlotWrapperProps) => {
  return (
    <Droppable droppableId={toDroppableid(itemId, name)}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className="changethis"
          style={{ backgroundColor: snapshot.isDraggingOver ? "blue" : "grey" }}
          {...provided.droppableProps}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
