import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { assemble } from "#/lib/assemble";
import { fetchSnippet } from "#/lib/fetch-snippet";
import { parseSnippet } from "#/lib/parse-snippet";

const BAD_REQUEST_STATUS = 400;
const INTERNAL_SERVER_ERROR_STATUS = 500;

async function buildFilters(source: string | undefined): Promise<string> {
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

  return assemble(dataMap.value);
}

const app = new Hono()
  .get("/", async (context) => context.text(await buildFilters(context.req.query("data"))))
  .onError((exception, context) => {
    if (exception instanceof HTTPException) {
      return context.json({ error: exception.message }, exception.status);
    }

    return context.json(
      { error: `Internal Server Error: ${exception.message}` },
      INTERNAL_SERVER_ERROR_STATUS,
    );
  });

export default app;
