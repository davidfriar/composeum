import { JsonSchema, UISchemaElement } from "@jsonforms/core"
import { materialRenderers, materialCells } from "@jsonforms/material-renderers"
import { JsonForms } from "@jsonforms/react"
import { Dispatch, SetStateAction } from "react"

type EditorProps<T> = {
  schema: JsonSchema
  uiSchema?: UISchemaElement
  data: T
  setData: Dispatch<SetStateAction<T>>
}
export function Editor<T>({ schema, uiSchema, data, setData }: EditorProps<T>) {
  return (
    <div>
      <JsonForms
        schema={schema}
        uischema={uiSchema}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data }: { data: T }) => setData(data)}
      />
    </div>
  )
}
