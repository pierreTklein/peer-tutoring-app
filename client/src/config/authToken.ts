import * as QueryString from "query-string";

export function getTokenFromQuery(): string {
  const queries = QueryString.parse(window.location.search);
  if (!queries.token) {
    throw new Error("Token not present in the query body");
  } else if (Array.isArray(queries.token)) {
    throw new Error("Token is an array");
  }
  return queries.token;
}

export default getTokenFromQuery;
