import fetch from '../../lib/fetch.js'

export const login = (data) => fetch('/user/login', '/education', data, 'JSON', 'POST');

export const regist = (data) => fetch('/user/regist', '/education', data, 'JSON', 'POST');

export const getUserById = (data) => fetch('/user/getUserById', '/education', data, '', 'GET');

export const updateUser = (data) => fetch('/user/updateUser', '/education', data, '', 'POST');
