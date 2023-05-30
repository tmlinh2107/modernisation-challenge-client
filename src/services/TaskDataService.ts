import type { CreateOrUpdateTaskRequest } from '@/models/TaskRequestModel';
import axios from 'axios';

const TASK_API_URL = 'https://localhost:5001/api/v1/tasks'

export default class TaskDataService {
    static async getAllTasks() {
        return await axios.get(`${TASK_API_URL}`);
    }

    static getTaskById(id: number) {
        return axios.get(`${TASK_API_URL}/${id}`);
    }

    static async createTask(model: CreateOrUpdateTaskRequest) {
        return await axios.post(`${TASK_API_URL}`, model);
    }

    static updateTask(id: number, detail: string) {
        return axios.put(`${TASK_API_URL}/${id}`, detail);
    }

    static deleteTask(id: number) {
        return axios.delete(`${TASK_API_URL}/${id}`);
    }
 
    static completedTask(id: number, isCompleted: boolean) {
        return axios.put(`${TASK_API_URL}/${id}/completed?isCompleted=${isCompleted}`);
    }
}