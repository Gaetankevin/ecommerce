import { apiService } from "./../services/apiservice";
import { defineStore } from "pinia";
import { ref } from "vue";

export interface Message {
    contenu: string; // corrected from `Text` to `string`
}

export const useMessageStore = defineStore('message', () => {
    const messages = ref<Message[]>([]);

    async function fetchMessages() {
        try {
            const response = await apiService.get('/message');
            messages.value = response.data;
        } catch (error: any) {
            console.error('Error fetching messages:', error);
        }
    }


    return {
        messages,
        fetchMessages,
    };
});
