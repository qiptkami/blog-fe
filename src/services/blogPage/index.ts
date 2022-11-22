import { get } from '../index';

const baseUrl = '';

export const getCommentInfo = (id: number) => get(baseUrl + `/comments/${id}`);
