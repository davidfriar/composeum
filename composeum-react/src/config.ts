import { ComponentType } from "react"
import { JsonSchema7, UISchemaElement } from "@jsonforms/core"
import { allComponents } from "composeum-foundation"
export type ComposeumComponentSchema = JsonSchema7 & {
  $id: string
  $schema: "http://json-schema.org/draft-07/schema#"
  properties: JsonSchema7["properties"]
  type: "object"
  additionalProperties: false
  required: string[]
}
export type ComposeumComponentUISchema = UISchemaElement

export type ComposeumComponent<P = any> = {
  component: ComponentType<P>
  schema: ComposeumComponentSchema
  uiSchema?: ComposeumComponentUISchema
}

export type ComposeumConfig = {
  components: Array<ComposeumComponent>
}

export const defaultConfig: ComposeumConfig = {
  components: [], //allComponents,
}

export const getComponentByName = (config: ComposeumConfig, name: string) => {
  return config.components.find((component) => component.schema.$id === name)
}
