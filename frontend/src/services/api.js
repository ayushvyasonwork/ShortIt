import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

export const shortenUrl = (data) => axios.post(`${BASE_URL}/shorten`, data);
export const fetchUrlsByTag = (tag) => axios.get(`${BASE_URL}/tags/${tag}`);
export const fetchAnalytics = (code) => axios.get(`${BASE_URL}/analytics/${code}`);
