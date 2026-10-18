import { URL } from "node:url";
import {
  Result,
  ResultAsync,
  type ResultAsync as ResultAsyncType,
  type Result as ResultType,
} from "@mkvlrn/result";

function errorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

async function sendRequest(url: string): Promise<ResultType<Response, Error>> {
  try {
    return Result.ok(await fetch(url));
  } catch (error) {
    return Result.err(new Error(`error sending request: ${errorMessage(error)}`));
  }
}

function validateResponse(response: Response): ResultType<Response, Error> {
  if (!response.ok) {
    return Result.err(new Error("response not OK"));
  }

  if (!(response.headers.get("Content-Type") ?? "").includes("text/plain")) {
    return Result.err(new Error("wrong content-type"));
  }

  return Result.ok(response);
}

export async function fetchSnippet(url: string): ResultAsyncType<string, Error> {
  if (!URL.canParse(url)) {
    return ResultAsync.err(new Error("invalid url"));
  }

  const request = await sendRequest(url);
  if (request.isError) {
    return ResultAsync.err(request.error);
  }

  const validated = validateResponse(request.value);
  if (validated.isError) {
    return ResultAsync.err(validated.error);
  }

  const content = await validated.value.text();

  return ResultAsync.ok(content);
}
