import { get } from '../index';

const baseUrl = '/tags';

export const getTagsAndBlogs = () => get(baseUrl + '/blogs');

export const getTags = () => get(baseUrl + '/');
