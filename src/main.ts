import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { assemble } from "#/lib/assemble";
import { fetchSnippet } from "#/lib/fetch-snippet";
import { parseSnippet } from "#/lib/parse-snippet";

const BAD_REQUEST_STATUS = 400;
const INTERNAL_SERVER_ERROR_STATUS = 500;

const app = new Hono();

app.get("/", async (c) => {
  const source = c.req.query("data");
  if (!source) {
    throw new HTTPException(BAD_REQUEST_STATUS, { message: "a data source is needed" });
  }

  const data = await fetchSnippet(source);
  if (data.isError) {
    throw new HTTPException(BAD_REQUEST_STATUS, { message: data.error.message });
  }

  const dataMap = parseSnippet(data.value);
  if (dataMap.isError) {
    throw new HTTPException(BAD_REQUEST_STATUS, { message: dataMap.error.message });
  }

  const filters = assemble(dataMap.value);

  return c.text(filters);
});

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ error: err.message }, err.status);
  }

  return c.json(
    { error: `Internal Server Error: ${(err as Error).message}` },
    INTERNAL_SERVER_ERROR_STATUS,
  );
});

export default app;
