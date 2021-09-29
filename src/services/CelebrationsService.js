import { create } from "./BaseService";

const http = create();

export const getCelebrations = () => {
  return http.get("/celebrations");
};

export const createCelebration = (celebrationData) => {
    return http.post("/celebrations", celebrationData)
}