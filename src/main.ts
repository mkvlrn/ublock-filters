import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { assemble } from "#/lib/assemble";
import { fetchSnippet } from "#/lib/fetch-snippet";
import { parseSnippet } from "#/lib/parse-snippet";

const app = new Hono();

app.get("/", async (c) => {
  const source = c.req.query("data");
  if (!source) {
    throw new HTTPException(400, { message: "a data source is needed" });
  }

  const data = await fetchSnippet(source);
  if (data.isError) {
    throw new HTTPException(400, { message: data.error.message });
  }

  const dataMap = parseSnippet(data.value);
  if (dataMap.isError) {
    throw new HTTPException(400, { message: dataMap.error.message });
  }

  const filters = assemble(dataMap.value);

  return c.text(filters);
});

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ error: err.message }, err.status);
  }

  return c.json({ error: `Internal Server Error: ${(err as Error).message}` }, 500);
});

// biome-ignore lint/style/noDefaultExport: hono app
export default app;
