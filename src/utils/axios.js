import axios from 'axios';
import { api } from '../config';
const Axios = axios.create({
	baseURL: api.URL,
});

export default Axios;
