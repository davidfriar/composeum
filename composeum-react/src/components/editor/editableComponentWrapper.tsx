import { Draggable } from "react-beautiful-dnd"

import { ItemId } from "composeum-schema"
type EditableComponentWrapperProps = {
  itemId: ItemId
  index: number
  children: JSX.Element
}
export const EditableComponentWrapper = ({
  itemId,
  index,
  children,
}: EditableComponentWrapperProps) => {
  return (
    <Draggable draggableId={itemId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="composeum-containerxxx"
        >
          {children}
        </div>
      )}
    </Draggable>
  )
}
