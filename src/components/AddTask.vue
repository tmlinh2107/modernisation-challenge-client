<script setup lang="ts">
</script>

<template>
    <transition name="modal-fade">
        <div class="modal-overlay" @click="closeModal">
            <div class="modal" @click.stop>
                <div class="content">
                    <h2 v-if="selectedTaskId == 0">Create task</h2>
                    <h2 v-if="selectedTaskId > 0">Update task</h2>
                    <textarea class="form-control" rows="5" :selectedTaskDetails="selectedTaskDetails" v-model="details"></textarea>
                    <div class="footer">
                        <button class="btn btn-outline-primary" @click="closeModal">
                            Cancel
                        </button>
                        <button v-if="selectedTaskId == 0" class="btn btn-primary" @click="addTask()">Save</button>
                        <button v-if="selectedTaskId > 0" class="btn btn-primary" @click="updateTask()">Update</button>
                    </div>
                </div>
            </div>

        </div>
    </transition>
</template>

<script lang="ts">
import { CreateOrUpdateTaskRequest } from "@/models/TaskRequestModel";
import TaskDataService from "../services/TaskDataService";

export default {
    name: "AddTasks",
    props: ['selectedTaskId', 'selectedTaskDetails'],
    data() {
        return {
            details: '',
        }
    },
    methods: {
        async addTask() {
            await TaskDataService.createTask(new CreateOrUpdateTaskRequest(this.details))
                .then((response: any) => { })
                .catch((error) => {
                    if (error) {
                        console.log(error);
                    }
                });
            this.closeModal();
            location.reload();
        },

        closeModal() {
            this.$emit('close-modal');
            this.details = "";
        },

        async updateTask() {
            if (this.selectedTaskId > 0) {
                await TaskDataService.updateTask(this.selectedTaskId, new CreateOrUpdateTaskRequest(this.details));
                this.closeModal();
                location.reload();
            }
        }
    },
}
</script>
  
<style scoped>
.content {
    width: 500px;
    margin: 0 auto;
}

.footer {
    float: right;
}

.modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    background-color: #000000da;
}

.modal {
    background-color: white;
    width: 750px;
    padding: 60px 0;
    border-radius: 20px;
    display: block;
    position: relative;
    margin: 25px auto;
    max-height: calc(100vh - 300px);
}

.close {
    margin: 10% 0 0 16px;
    cursor: pointer;
}

.close-img {
    width: 25px;
}

.check {
    width: 150px;
}

p {
    /* font-weight: 500; */
    font-size: 16px;
    margin: 20px 0;
}

button {
    width: 150px;
    height: 40px;
    font-size: 14px;
    border-radius: 16px;
    margin-top: 50px;
}
</style>