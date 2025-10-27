<template>
    <div>
        <div class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div class="font-display bg-gray-100 dark:bg-background-dark text-text-light dark:text-text-dark rounded-2xl shadow-lg w-full max-w-3xl p-6 relative">
                <header class="flex items-center justify-between border-b border-gray-300 dark:border-gray-700 pb-4">
                    <div class="flex items-center">
                        <button
                            @click="handleClose"
                            class="inline-flex items-center justify-center p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                            <span class="material-symbols-outlined">arrow_back</span>
                        </button>
                        <h1 class="text-xl font-bold ml-4">
                            Edit Ticket #{{ ticket.id || 'TICK-XXXX' }}
                        </h1>
                    </div>
                </header>

                <form @submit.prevent="handleSave" class="mt-6 space-y-6">
                    <label class="flex flex-col">
                        <p class="text-base font-bold pb-2">
                            Title<span class="text-red-600">*</span>
                        </p>
                        <input
                            class="w-full py-2 px-4 rounded-lg bg-gray-200 border"
                            :class="error ? 'border-red-500' : 'border-gray-300'"
                            placeholder="Enter title"
                            v-model="title"
                        />
                        <p v-if="error" class="text-sm text-red-600 pt-1">{{ error }}</p>
                    </label>

                    <label class="flex flex-col">
                        <p class="text-base font-bold pb-2">Description</p>
                        <textarea
                            class="w-full min-h-36 p-4 rounded-lg bg-gray-200 border border-gray-300 outline-[#137fec]"
                            placeholder="Provide a detailed description..."
                            v-model="description"
                        ></textarea>
                    </label>

                    <label class="flex flex-col">
                        <p class="text-base font-bold pb-2">Status</p>
                        <select
                            class="w-full py-2 px-4 rounded-lg bg-gray-200 border border-gray-300 outline-[#137fec]"
                            v-model="status"
                        >
                            <option value="open">Open</option>
                            <option value="in_progress">In Progress</option>
                            <option value="closed">Closed</option>
                        </select>
                    </label>

                    <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4">
                        <button
                            type="button"
                            @click="handleClose"
                            class="px-6 py-2.5 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            :disabled="saving"
                            class="px-6 py-2.5 rounded-lg font-semibold text-white bg-[#137fec] hover:bg-[#3291f1] transition flex items-center justify-center disabled:opacity-70"
                        >
                            <template v-if="saving">
                                <svg
                                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        class="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        stroke-width="4"
                                    ></circle>
                                    <path
                                        class="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Saving...
                            </template>
                            <template v-else>
                                Save Changes
                            </template>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const props = defineProps({
    ticket: {
        type: Object,
        default: () => ({})
    },
    onClose: {
        type: Function,
        required: true
    },
    onSave: {
        type: Function,
        required: true
    }
})

const title = ref(props.ticket.title || '')
const description = ref(props.ticket.description || '')
const status = ref(props.ticket.status || 'open')
const saving = ref(false)
const error = ref('')

const handleSave = () => {
    if (!title.value.trim()) {
        error.value = 'Title is required.'
        return
    }

    error.value = ''
    saving.value = true

    const updatedTicket = {
        ...props.ticket,
        title: title.value,
        description: description.value,
        status: status.value
    }

    setTimeout(() => {
        saving.value = false
        props.onSave(updatedTicket)
        toast.success('Ticket updated successfully!')
        props.onClose()
    }, 1200)
}

const handleClose = () => props.onClose()
</script>