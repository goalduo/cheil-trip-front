import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { getNotificationByUserId } from '@/api/NotificationAPI.js'
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
  const getNotification = async (userId) => {
    const result = await getNotificationByUserId(userId)
    notification.value = result
  } 
    
    return {
        notification,
      addNotification,
      getNotification
  };
}, {persist : {
  storage: sessionStorage
}});
