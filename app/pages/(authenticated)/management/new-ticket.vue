<script setup>
 definePageMeta({
  layout: 'authenticated'
})
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

const title = ref('')
const description = ref('')
const priority = ref('low')
const status = ref('open')
const saving = ref(false)
const error = ref('')

// Handle form submission
const handleSubmit = (e) => {
    e.preventDefault()

 
    if (!title.value.trim()) {
        error.value = 'Title is required.'
        toast.error('Title is required.')
        return
    }

    if (!status.value.trim()) {
        error.value = 'Status is required.'
        toast.error('Status is required.')
        return
    }

    error.value = ''
    saving.value = true

    // Simulate creating a ticket
    setTimeout(() => {
        const previousTicketsJson = localStorage?.getItem('default_tickets')
        const previousTickets = JSON.parse(previousTicketsJson) || []
        const newTickets = [
            ...previousTickets,
            {
                title: title.value,
                description: description.value,
                priority: priority.value,
                status: status.value,
                id: previousTickets.length + 1,
            },
        ]
        saving.value = false
        localStorage.setItem('default_tickets', JSON.stringify(newTickets))
        toast.success('Ticket created successfully!')
        // reset form
        title.value = ''
        description.value = ''
        priority.value = 'low'
        status.value = 'open'
        router.push('/management')
    }, 1500)
}

const handleCancel = () => {
    title.value = ''
    description.value = ''
    priority.value = 'low'
    status.value = 'open'
    error.value = ''
    router.push('/management')
}
</script>

<template>
    <div class="bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-200">
        <div class="relative flex min-h-screen w-full flex-col items-center justify-start sm:justify-center p-4 sm:p-6 lg:p-8">
            <main class="w-full max-w-2xl">
                <div class="bg-white dark:bg-slate-800/50 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <div class="p-6 sm:p-8">
                        <h1 class="text-slate-900 dark:text-white tracking-tight text-2xl sm:text-3xl font-bold text-left pb-6">
                            Create New Ticket
                        </h1>

                        <form @submit="handleSubmit" class="space-y-6">
                            <div>
                                <label class="flex flex-col" for="title">
                                    <p class="text-slate-700 dark:text-slate-300 text-base font-bold leading-normal pb-2">
                                        Title *
                                    </p>
                                    <input
                                        id="title"
                                        v-model="title"
                                        placeholder="e.g., Fix login button on homepage"
                                        :class="[
                                            'form-input w-full rounded-lg h-12 px-4 text-base font-normal leading-normal border',
                                            error && !title.trim()
                                                ? 'border-red-500'
                                                : 'border-slate-300 dark:border-slate-600',
                                            'bg-background-light dark:bg-slate-700/50 focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-0 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500'
                                        ]"
                                    />
                                </label>
                                <p v-if="error && !title.trim()" class="text-red-500 text-sm mt-2">
                                    Title is required.
                                </p>
                            </div>

                            <div>
                                <label class="flex flex-col" for="description">
                                    <p class="text-slate-700 dark:text-slate-300 text-base font-bold leading-normal pb-2">
                                        Description
                                    </p>
                                    <textarea
                                        id="description"
                                        v-model="description"
                                        placeholder="Provide a detailed description of the issue..."
                                        class="form-textarea w-full min-h-36 rounded-lg p-4 text-base font-normal leading-normal border border-slate-300 dark:border-slate-600 bg-background-light dark:bg-slate-700/50 focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-0 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                    />
                                </label>
                            </div>

                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label class="flex flex-col" for="priority">
                                        <p class="text-slate-700 dark:text-slate-300 text-base font-bold leading-normal pb-2">
                                            Priority
                                        </p>
                                        <select
                                            id="priority"
                                            v-model="priority"
                                            class="form-select w-full h-12 rounded-lg border border-slate-300 dark:border-slate-600 bg-background-light dark:bg-slate-700/50 px-4 text-base font-normal leading-normal text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-0"
                                        >
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                    </label>
                                </div>

                                <div>
                                    <label class="flex flex-col" for="status">
                                        <p class="text-slate-700 dark:text-slate-300 text-base font-bold leading-normal pb-2">
                                            Status *
                                        </p>
                                        <select
                                            id="status"
                                            v-model="status"
                                            :class="[
                                                'form-select w-full h-12 rounded-lg border',
                                                error && !status.trim()
                                                    ? 'border-red-500'
                                                    : 'border-slate-300 dark:border-slate-600',
                                                'bg-background-light dark:bg-slate-700/50 px-4 text-base font-normal leading-normal text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-0'
                                            ]"
                                        >
                                            <option value="open">Open</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="closed">Closed</option>
                                        </select>
                                    </label>
                                </div>
                            </div>

                            <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    @click="handleCancel"
                                    class="flex h-12 w-full sm:w-auto items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-6 text-base font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    :disabled="saving"
                                    class="flex h-12 w-full sm:w-auto items-center justify-center rounded-lg bg-[#137fec] px-6 text-base font-bold text-white shadow-sm hover:bg-[#1285f8] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
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
                                            />
                                            <path
                                                class="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        Creating...
                                    </template>
                                    <template v-else>
                                        Create Ticket
                                    </template>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <footer class="w-full text-center py-8">
                    <p class="text-slate-500 dark:text-slate-400 text-sm">
                        © 2024 Acme Inc. ·
                        <a class="hover:underline" href="#">
                            Help Center
                        </a>
                        ·
                        <a class="hover:underline" href="#">
                            Terms of Service
                        </a>
                    </p>
                </footer>
            </main>
        </div>
    </div>
</template>