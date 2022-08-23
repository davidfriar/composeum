import { ComposeumComponentSchema } from "composeum-react"
const schema: ComposeumComponentSchema = {
  $id: "https://schemas.composeum.io/demo/navigation",
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    links: {
      title: "Links",
      type: "array",
      description:
        "A list of links that will be presented as the site navigation",
      items: {
        properties: {
          title: {
            title: "Title",
            description: "The display name for the link",
            type: "string",
          },
          slug: {
            title: "Slug",
            description: "A root-relative path for the page to be linked to",
            type: "string",
          },
        },
      },
    },
  },
  additionalProperties: false,
  required: ["links"],
}
export default schema
