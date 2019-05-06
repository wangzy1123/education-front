import fetch from '../../lib/fetch.js'

export const login = (data) => fetch('/user/login', '/education', data, 'JSON', 'POST');

export const regist = (data) => fetch('/user/regist', '/education', data, 'JSON', 'POST');
