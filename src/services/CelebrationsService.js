import { create } from "./BaseService";

const http = create();

export const getCelebrations = () => {
  return http.get("/celebrations");
};