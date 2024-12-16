import axios from "axios";

export const getTenis = () => axios.get("/api/tenis");
export const createTenis = (tenis) => axios.post("/api/tenis", tenis);
