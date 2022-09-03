import { JsonSchema, UISchemaElement } from "@jsonforms/core"
import { vanillaCells, vanillaRenderers } from "@jsonforms/vanilla-renderers"
import { JsonForms } from "@jsonforms/react"
import { Dispatch } from "react"

type EditorProps<T> = {
  schema: JsonSchema
  uiSchema?: UISchemaElement
  data: T
  setData: Dispatch<T>
}
export function ComponentEditor<T = unknown>({
  schema,
  uiSchema,
  data,
  setData,
}: EditorProps<T>) {
  return (
    <div>
      <JsonForms
        schema={schema}
        uischema={uiSchema}
        data={data}
        renderers={vanillaRenderers}
        cells={vanillaCells}
        onChange={({ data }: { data: T }) => setData(data)}
      />
    </div>
  )
}
