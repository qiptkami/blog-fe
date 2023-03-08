import { get, post } from '../../index';
import { User } from '../../../typings/index';

const baseUrl = '/admin';

export const login = (u: User) => post(`${baseUrl}/login`, u);
