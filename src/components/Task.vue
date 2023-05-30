<script setup lang="ts">
</script>

<template>
  <div class="container">
    <h2>Tasks</h2>

    <div>
      <div>
        <button class="btn" @click="openModal">+ Create a new task</button>
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th style="width: 1px;">Completed</th>
            <th>Details</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="task in tasks" v-bind:key="task.id" :checked="task.completed">
            <td><input type="checkbox" id="checkbox" v-model="task.completed"
                v-on:click="completedTask(task.id || 0, !task.completed)" /></td>
            <td>{{ task.details }}</td>
            <td>
              <button class="btn btn-warning" @click="updateTask(task.id || 0, task.details || '')">
                Update
              </button>
            </td>
            <td>
              <button class="btn btn-danger" v-on:click="deleteTask(task.id || 0)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <AddTask v-show="showModal" @close-modal="showModal = false" :selectedTaskId="selectedTaskId"
        :selectedTaskDetails=selectedTaskDetails />
    </div>
  </div>
</template>

<script lang="ts">
import { TaskModel } from "@/models/TaskModel";
import TaskDataService from "../services/TaskDataService";
import AddTask from './AddTask.vue';

export default {
  name: "Tasks",
  components: { AddTask },
  props: ['checked'],
  data() {
    return {
      showModal: false,
      tasks: [] as TaskModel[],
      message: "",
      isChecked: false,
      selectedTaskId: 0,
      selectedTaskDetails: ""
    }
  },
  methods: {
    async getTasks() {
      await TaskDataService.getAllTasks().then((response: any) => {
        this.tasks = response.data;
      })
    },

    async deleteTask(id: number) {
      await TaskDataService.deleteTask(id).then(() => {
        this.getTasks();
      });
    },

    async completedTask(id: number, isChecked: boolean) {
      await TaskDataService.completedTask(id, isChecked);
    },

    updateTask(taskId: number, details: string) {
      this.selectedTaskId = taskId;
      this.selectedTaskDetails = details;
      this.showModal = true;
    },

    openModal() {
      this.selectedTaskId = 0
      this.selectedTaskDetails = "";
      this.showModal = true;
    },

    addNewTask: (isAddNewTask: boolean) => {
      console.log(isAddNewTask)
    }
  },
  created() {
    this.getTasks();
  }
}
</script>