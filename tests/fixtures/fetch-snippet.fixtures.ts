const success = {
  expected: "firstline\nsecondline",
  response: (): Response =>
    new Response("firstline\nsecondline", {
      headers: { "Content-Type": "text/plain" },
      status: 200,
    }),
};

const failure = [
  {
    error: "error sending request: something broke",
    resolve: false,
    response: new Response(),
    url: "https://someurl.com/valid",
  },
  {
    error: "invalid url",
    resolve: true,
    response: new Response(new Blob(), {
      headers: new Headers({ "Content-Type": "text/plain" }),
      status: 200,
    }),
    url: "invalid url",
  },
  {
    error: "response not OK",
    resolve: true,
    response: new Response(new Blob(), {
      headers: new Headers({ "Content-Type": "text/plain" }),
      status: 404,
    }),
    url: "https://someurl.com/valid",
  },
  {
    error: "wrong content-type",
    resolve: true,
    response: new Response(new Blob(), {
      headers: new Headers({ "Content-Type": "application/json" }),
      status: 200,
    }),
    url: "https://someurl.com/valid",
  },
];

export { failure, success };
