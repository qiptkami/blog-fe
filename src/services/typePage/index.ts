import { get } from "../index";

const baseUrl = "/types";

export const getPaginationInfoByType = (param?: {
  id?: number;
  page: number;
  size: number;
}) => get(baseUrl + "/pagination", param);

export const getTypes = () => get(baseUrl + "/");
