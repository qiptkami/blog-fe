import { _get } from '../index';

const baseUrl = '/tag';

export const getAllTag = () => _get(baseUrl);

export const getTagList = (param?: { page: number; size: number }) =>
  _get(baseUrl + '/pagination', param);
