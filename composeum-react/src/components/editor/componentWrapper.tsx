import { Draggable } from "react-beautiful-dnd"
import styles from "./componentWrapper.module.css"
import { ItemId } from "composeum-schema"
import { useEditorContext } from "./composeumEditor"

type ComponentWrapperProps = {
  itemId: ItemId
  index: number
  children: JSX.Element
}
export const ComponentWrapper = ({
  itemId,
  index,
  children,
}: ComponentWrapperProps) => {
  const context = useEditorContext()
  switch (context.mode) {
    case "publish":
      return children
    case "edit":
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
}
