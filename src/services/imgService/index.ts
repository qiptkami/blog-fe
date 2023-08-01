import { _post } from '../index';

const baseUrl = '/img';

export const imgUpload = (formData: FormData) => {
  _post(`${baseUrl}/upload`, formData);
};
