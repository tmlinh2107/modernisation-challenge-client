<script setup lang="ts">
</script>

<template>
  <div class="container">
    <h2>Tasks</h2>

    <div>
      <div>
        <button class="btn" @click="showModal = true">+ Create a new task</button>
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
            <td><input type="checkbox" id="checkbox" v-model="task.completed" v-on:click="completedTask(task.id || 0, !task.completed)" /></td>
            <td>{{ task.details }}</td>
            <td>
              <button class="btn btn-warning" @click="showModal = true">
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

      <AddTask v-show="showModal" @close-modal="showModal = false" @CustomEventInputChanged="getTasks" />
    </div>
  </div>
</template>

<script lang="ts">
import type { TaskModel } from "@/models/TaskModel";
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
      isChecked: false
    }
  },
  methods: {
    async getTasks() {
      await TaskDataService.getAllTasks().then((response: any) => {
        this.tasks = response.data;
      })
    },
    deleteTask(id: number) {
      TaskDataService.deleteTask(id).then(() => {
        this.getTasks();
      });
    },
    completedTask(id: number, isChecked: boolean) {
      TaskDataService.completedTask(id, isChecked);
    },
  },
  created() {
    this.getTasks();
  }
}
</script>