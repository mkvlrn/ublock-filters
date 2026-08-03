export const success = {
  response: () =>
    new Response("firstline\nsecondline", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    }),
  expected: "firstline\nsecondline",
};

export const failure = [
  {
    resolve: false,
    url: "https://someurl.com/valid",
    response: new Response(),
    error: "error sending request: something broke",
  },
  {
    resolve: true,
    url: "invalid url",
    response: new Response(new Blob(), {
      status: 200,
      headers: new Headers({ "Content-Type": "text/plain" }),
    }),
    error: "invalid url",
  },
  {
    resolve: true,
    url: "https://someurl.com/valid",
    response: new Response(new Blob(), {
      status: 404,
      headers: new Headers({ "Content-Type": "text/plain" }),
    }),
    error: "response not OK",
  },
  {
    resolve: true,
    url: "https://someurl.com/valid",
    response: new Response(new Blob(), {
      status: 200,
      headers: new Headers({ "Content-Type": "application/json" }),
    }),
    error: "wrong content-type",
  },
];
