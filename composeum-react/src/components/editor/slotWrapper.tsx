import { Droppable, DroppableId } from "react-beautiful-dnd"
import { ItemId } from "composeum-schema"
import styles from "./slotWrapper.module.css"
import { SlotWrapper } from "../composeum"

const sep = ":"
const toDroppableid = (itemId: ItemId, slotName: string) =>
  [itemId, slotName].join(sep)
export const fromDroppableId = (droppableId: DroppableId) => {
  const parts = droppableId.split(sep)
  return { itemId: parts[0], slotName: parts[1] }
}

export const EditableSlotWrapper: SlotWrapper = ({
  children,
  itemId,
  name,
}) => {
  return (
    <Droppable droppableId={toDroppableid(itemId, name)}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={`${styles.slot} ${
            snapshot.isDraggingOver ? styles.drag : ""
          }`}
          {...provided.droppableProps}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
