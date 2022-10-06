import { get, post } from "../index";

const baseUrl = "/home";

export const getPaginationInfo = () => get(baseUrl + "/pagination");

export const getRankingInfo = () => get(baseUrl + "/ranking");
