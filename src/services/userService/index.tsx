import { _get } from '../index';

const baseUrl = '/user';

export const getUserInfo = (id: number) => _get(`${baseUrl}/info/${id}`);
