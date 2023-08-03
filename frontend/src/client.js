import { createClient } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

const client = createClient({
  projectId: "cg0q6oq5",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-03-08",
  token: "skiyD0vYmBK4LT8ENnohK618DV8UasdC7uszjNCgZVSwrsIfTVw9pMdkghspZOMh7h2afjTS7PZK4FSpSxWB5WvY4nvSJ5ipOB4l8nkXRIvGbZtOKOFt3FjAUGrQFOiLqAC8ldeDhdrgJTmDnVHbAI74pWLu0qd8B43T5uWWdIrT13fkDDLq"
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)

export default client;