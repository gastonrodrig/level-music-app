import axios from 'axios'
import { baseURL } from '../../shared/helpers';

export const taskApi = axios.create({
  baseURL: `${baseURL}/event-tasks`,
});