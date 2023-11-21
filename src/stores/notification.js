import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

import { userConfirm, findById, tokenRegeneration, logout } from "@/api/UserAPI.js";
import { httpStatusCode } from "@/util/http-status";

export const useNotificationStore = defineStore("notificationStore", () => {
    const notification = ref([])
    const addNotification = (data) => {
        data.forEach(element => {
            notification.value.push(element);
        });
        console.log(notification.value)
    }
    
    return {
        notification,
        addNotification
  };
}, {persist : {
  storage: sessionStorage
}});
