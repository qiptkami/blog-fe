import { get, post } from "../index";

const baseUrl = "/home";

export const getPaginationInfo = (param?: { page: number; size: number }) =>
  get(baseUrl + "/pagination", param);

export const getRankingInfo = () => get(baseUrl + "/ranking");
