import api from "./api.service";

export const getAllUsers = async () => api.get('/users').then((res) => res.data).catch((err) => { console.log(err) });

export const getUser = async (id) => api.get(`/users/${id}`).then((res) => res.data).catch((err) => { console.log(err) });

export const createUser = async (data) => api.post('/users', data).then((res) => res).catch((err) => { console.log(err) });

export const updateUser = async (id, data) => api.put(`/users/${id}`, data).then((res) => res).catch((err) => { console.log(err) });

export const eraseUser = async (id) => api.delete(`/users/${id}`).then((res) => res).catch((err) => { console.log(err) });