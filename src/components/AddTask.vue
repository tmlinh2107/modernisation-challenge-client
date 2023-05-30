<script setup lang="ts">
</script>

<template>
    <transition name="modal-fade">
        <div class="modal-overlay">
            <div class="modal">
                <div class="content">
                    <h2 v-if="selectedTaskId == 0">Create task</h2>
                    <h2 v-if="selectedTaskId > 0">Update task</h2>
                    <label v-if="selectedTaskId > 0">Task: {{ selectedTaskDetails }}</label>
                    <textarea class="form-control" rows="5" :selectedTaskDetails="selectedTaskDetails" v-model="details"
                        required placeholder="Enter the details of the task"></textarea>
                    <span v-if="error.length > 0" class="txtError">{{ error }}</span>
                    <div class="footer">
                        <button class="btn btn-outline-primary" @click="closeModal">
                            Cancel
                        </button>
                        <button type="submit" v-if="selectedTaskId == 0" class="btn btn-primary"
                            @click="addTask()">Save</button>
                        <button type="submit" v-if="selectedTaskId > 0" class="btn btn-primary"
                            @click="updateTask()">Update</button>
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
            error: ''
        }
    },
    methods: {
        async addTask() {
            if (this.checkValidation()) {
                await TaskDataService.createTask(new CreateOrUpdateTaskRequest(this.details))
                    .then((response: any) => { })
                    .catch((error) => {
                        if (error) {
                            console.log(error);
                        }
                    });
                this.closeModal();
                location.reload();
            }
        },

        closeModal() {
            this.$emit('close-modal');
            this.details = "";
            this.error = "";
        },

        async updateTask() {
            if (this.selectedTaskId > 0) {
                if (this.checkValidation()) {
                    await TaskDataService.updateTask(this.selectedTaskId, new CreateOrUpdateTaskRequest(this.details));
                    this.closeModal();
                    location.reload();
                }
            }
        },

        checkValidation() {
            if (this.details == "") {
                this.error = "The details of the task must not be empty."
                return false;
            }

            return true;
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
    max-height: calc(100vh - 200px);
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

.txtError {
    color: red;
}
</style>