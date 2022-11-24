import { RequestError } from "@/protocols";

export function requestError(status: number, statusText: string): RequestError {
  return {
    name: "",
    data: null,
    status,
    statusText,
    message: "No result for this search!",
  };
}
