import { get } from '../index';

const baseUrl = '/types';

export const getTypesAndBlogs = () => get(baseUrl + '/blogs');

export const getTypes = () => get(baseUrl + '/');
