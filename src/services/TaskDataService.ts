import type { CreateOrUpdateTaskRequest } from '@/models/TaskRequestModel';
import axios from 'axios';

const TASK_API_URL = 'https://localhost:5001/api/v1/tasks'

export default class TaskDataService {
    static async getAllTasks() {
        return await axios.get(`${TASK_API_URL}`);
    }

    static async getTaskById(id: number) {
        return await axios.get(`${TASK_API_URL}/${id}`);
    }

    static async createTask(model: CreateOrUpdateTaskRequest) {
        return await axios.post(`${TASK_API_URL}`, model);
    }

    static async updateTask(id: number, modal: CreateOrUpdateTaskRequest) {
        return await axios.put(`${TASK_API_URL}/${id}`, modal);
    }

    static async deleteTask(id: number) {
        return await axios.delete(`${TASK_API_URL}/${id}`);
    }
 
    static async completedTask(id: number, isCompleted: boolean) {
        return await axios.put(`${TASK_API_URL}/${id}/completed?isCompleted=${isCompleted}`);
    }
}