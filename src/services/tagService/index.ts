import { _get, _delete, _put, _post } from '../index';
import { Tag } from '../../typings/index';

const baseUrl = '/tag';

export const getAllTag = () => _get(baseUrl);

export const getTagList = (param?: { page: number; size: number }) =>
  _get(baseUrl + '/pagination', param);

export const editTag = (tag: Tag) => _put(baseUrl, tag);

export const addTag = (tag: Tag) => _post(baseUrl, tag);

export const delTag = (id: number) => _delete(baseUrl + `/${id}`);
