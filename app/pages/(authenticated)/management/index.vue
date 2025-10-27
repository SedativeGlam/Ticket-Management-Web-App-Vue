<template>
    <article class="bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-200 relative">
        <div class="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            
         
            <main class="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <h1 class="text-slate-900 dark:text-white text-[32px] font-bold tracking-tight">
                        Manage Tickets
                    </h1>

                    <div class="flex items-center gap-3">
                        <NuxtLink to="/management/new-ticket">
                            <button class="flex min-w-[84px] items-center justify-center rounded-lg h-12 px-5 bg-[#137fec] text-white text-sm font-bold hover:bg-primary/90 transition-colors gap-2 cursor-pointer">
                                <span class="material-symbols-outlined">add</span>
                                <span class="truncate">Create New Ticket</span>
                            </button>
                        </NuxtLink>
                    </div>
                </div>

                <!-- Ticket Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <div v-for="ticket in tickets" :key="ticket.id"
                        class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex flex-col gap-4 transition-all hover:shadow-md hover:-translate-y-1">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="font-bold text-lg text-slate-900 dark:text-white">{{ ticket.title }}</h3>
                                <p class="text-sm text-slate-500 dark:text-slate-400">
                                    {{ ticket.id }} · Created: {{ ticket.created }}
                                </p>
                            </div>
                            <span :class="getStatusClass(ticket.status)">
                                {{ getStatusText(ticket.status) }}
                            </span>
                        </div>

                        <div class="flex items-center gap-3">
                            <img class="w-8 h-8 rounded-full" :src="getAssigneeAvatar(ticket.assignee)" :alt="ticket.assignee">
                            <div>
                                <p class="text-sm text-slate-500 dark:text-slate-400">Assigned to</p>
                                <p class="font-bold text-slate-700 dark:text-slate-300">{{ ticket.assignee }}</p>
                            </div>
                        </div>

                        <div class="flex justify-between items-center mt-2 border-t border-slate-100 dark:border-slate-700 pt-4">
                            <div class="flex items-center gap-1 text-sm font-bold text-red-600 dark:text-red-400">
                                <span class="material-symbols-outlined text-base">priority_high</span>
                                <span>{{ getPriorityText(ticket.priority) }}</span>
                            </div>

                            <div class="flex items-center gap-2">
                                <button @click="handleOpenEdit(ticket)"
                                    class="flex items-center justify-center h-9 w-9 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary transition-colors cursor-pointer">
                                    <span class="material-symbols-outlined text-xl">edit</span>
                                </button>
                                <button @click="handleConfirmDelete(ticket)"
                                    class="flex items-center justify-center h-9 w-9 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-red-500 transition-colors cursor-pointer">
                                    <span class="material-symbols-outlined text-xl">delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Edit Modal -->
                <Edit v-if="showEdit && selectedTicket" 
                    :ticket="selectedTicket"
                    @close="handleCloseEdit"
                    @save="handleSaveEdit" />

                <!-- Delete Confirmation Modal -->
                <div v-if="deleteConfirm" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div class="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg text-center w-[90%] max-w-sm">
                        <h2 class="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Delete Ticket?</h2>
                        <p class="text-slate-600 dark:text-slate-400 mb-6">
                            Are you sure you want to delete <strong>{{ deleteConfirm.title }}</strong>? This action cannot be undone.
                        </p>
                        <div class="flex justify-center gap-4">
                            <button @click="handleDelete"
                                class="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600">Continue</button>
                            <button @click="handleCancelDelete"
                                class="bg-gray-300 dark:bg-slate-700 text-slate-900 dark:text-slate-100 px-5 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-slate-600">Cancel</button>
                        </div>
                    </div>
                </div>
            </main>

            <footer class="w-full mt-auto">
                <div class="max-w-[1440px] mx-auto border-t border-slate-200 dark:border-slate-700 py-8 px-4 sm:px-6 lg:px-8">
                    <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                        <TicketSphereFooter />
                    </div>
                </div>
            </footer>
        </div>
    </article>
</template>

<script setup>
 definePageMeta({
  layout: 'authenticated'
})
import { ref, onMounted } from 'vue'
import Edit from '@/components/pages/management/Edit.vue'


const tickets = ref([])
const showEdit = ref(false)
const selectedTicket = ref(null)
const deleteConfirm = ref(null)
const userAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8bhccTgq7MRFzq4aB9zhKvXgxGJtPIvizzVzviib1Ljtnf84uZJ-9DOerX9xLexAq7zcAFXu5vApRIsVOkPmREOIugLu73yu-4Y8kUCKnJHyMill4WjwIING6ho1ZnLx79KEs111156nbO6GHpmoqUh842LmRJrGZDrGlmuXzMsgL_yAE_8R8f0uLnzdc2E-ZVsF4149nNnRyHNyu3shU679q8blFcB9ejkgMyGWLpfq7aXwQwK0FCFhWncfbXrg7StSIBl7JpVc'

const getTickets = () => {
    tickets.value = JSON.parse(localStorage?.getItem('default_tickets')) || []
}

const handleOpenEdit = (ticket) => {
    selectedTicket.value = ticket
    showEdit.value = true
}

const handleCloseEdit = () => {
    showEdit.value = false
    selectedTicket.value = null
}

const handleSaveEdit = (updatedTicket) => {
    tickets.value = tickets.value.map(t => 
        t.id === updatedTicket.id ? { ...t, ...updatedTicket } : t
    )
    localStorage.setItem('default_tickets', JSON.stringify(tickets.value))
    handleCloseEdit()
}

const handleConfirmDelete = (ticket) => {
    deleteConfirm.value = ticket
}

const handleDelete = () => {
    tickets.value = tickets.value.filter(t => t.id !== deleteConfirm.value.id)
    localStorage.setItem('default_tickets', JSON.stringify(tickets.value))
    deleteConfirm.value = null
}

const handleCancelDelete = () => {
    deleteConfirm.value = null
}

const getStatusClass = (status) => {
    const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold'
    switch(status) {
        case 'in_progress':
            return `${baseClasses} bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300`
        case 'open':
            return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300`
        default:
            return `${baseClasses} bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300`
    }
}

const getStatusText = (status) => {
    switch(status) {
        case 'in_progress': return 'In Progress'
        case 'open': return 'Open'
        default: return 'Closed'
    }
}

const getAssigneeAvatar = (assignee) => {
    switch(assignee) {
        case 'Jane Doe': return 'https://i.pravatar.cc/40?img=1'
        case 'John Smith': return 'https://i.pravatar.cc/40?img=2'
        default: return 'https://i.pravatar.cc/40?img=3'
    }
}

const getPriorityText = (priority) => {
    switch(priority) {
        case 'high': return 'High Priority'
        case 'low': return 'Low Priority'
        default: return 'Medium Priority'
    }
}

onMounted(() => {
    getTickets()
})
</script>