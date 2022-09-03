import { Draggable } from "@hello-pangea/dnd"
import styles from "./componentWrapper.module.css"
import { useEditorContext } from "./useEditorContext"
import type { ComponentWrapper } from "../composeum"

export const EditableComponentWrapper: ComponentWrapper = ({
  itemId,
  index,
  children,
}) => {
  const context = useEditorContext()
  return (
    <Draggable draggableId={itemId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${styles.component} ${
            snapshot.isDragging ? styles.drag : ""
          }`}
        >
          {children}
          <div className={styles.controls}>
            <button
              onClick={() =>
                context.dispatch({ type: "editItem", itemId: itemId })
              }
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </Draggable>
  )
}
