import { create } from "./BaseService";

const http = create();

export const pay = (id, amount) => {
	return http.post("/pay", {
        id,
        amount
    });
}
