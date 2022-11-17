import { get } from '../index';

const baseUrl = '/archives';

export const getArchivesPaginationInfo = (param?: {
  page: number;
  size: number;
}) => get(baseUrl + '/pagination', param);
