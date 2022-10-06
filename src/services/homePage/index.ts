import { get, post } from "../index";

const baseUrl = "/home";

export const getIndexData = () => get(baseUrl + "/page");
