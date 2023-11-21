import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notificationStore", () => {
    const notification = ref([])
    const addNotification = (data) => {
        if (Array.isArray(data)) {
          data?.forEach(element => {
            notification.value.push(element);
          })
        } else {
          notification.value.push(data)
        }
    }
    
    return {
        notification,
        addNotification
  };
}, {persist : {
  storage: sessionStorage
}});
