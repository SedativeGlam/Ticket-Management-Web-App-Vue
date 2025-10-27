<template>
    <form class="space-y-4" @submit.prevent="handleSubmit">
        
        <transition name="fade">
            <div
                v-if="toast.show"
                :class="[
                    'fixed bottom-6 right-6 z-50 rounded-md px-4 py-3 text-sm font-medium shadow-lg',
                    toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                ]"
                role="status"
            >
                {{ toast.msg }}
            </div>
        </transition>

        <div class="flex flex-col">
            <label for="username" class="text-slate-800 dark:text-slate-200 text-sm font-bold pb-2">
                Username
            </label>
            <input
                id="username"
                name="username"
                placeholder="e.g., john.doe"
                v-model="formData.username"
                @input="clearError('username')"
                :class="[
                    'w-full rounded-lg border bg-white dark:bg-slate-900 p-3 text-base text-slate-800 dark:text-slate-200 focus:outline-0 focus:ring-2 focus:ring-indigo-500',
                    errors.username ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                ]"
            />
            <span v-if="errors.username" class="text-sm text-red-500 pt-1">{{ errors.username }}</span>
        </div>

        <div class="flex flex-col">
            <label for="email" class="text-slate-800 dark:text-slate-200 text-sm font-bold pb-2">
                Email
            </label>
            <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                v-model="formData.email"
                @input="clearError('email')"
                :class="[
                    'w-full rounded-lg border bg-white dark:bg-slate-900 p-3 text-base text-slate-800 dark:text-slate-200 focus:outline-0 focus:ring-2 focus:ring-indigo-500',
                    errors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                ]"
            />
            <span v-if="errors.email" class="text-sm text-red-500 pt-1">{{ errors.email }}</span>
        </div>

        <div class="flex flex-col">
            <label for="password" class="text-slate-800 dark:text-slate-200 text-sm font-bold pb-2">
                Password
            </label>
            <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a strong password"
                v-model="formData.password"
                @input="clearError('password')"
                :class="[
                    'w-full rounded-lg border bg-white dark:bg-slate-900 p-3 text-base text-slate-800 dark:text-slate-200 focus:outline-0 focus:ring-2 focus:ring-indigo-500',
                    errors.password ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                ]"
            />
            <span v-if="errors.password" class="text-sm text-red-500 pt-1">{{ errors.password }}</span>
        </div>

        <div class="flex flex-col">
            <label for="confirmPassword" class="text-slate-800 dark:text-slate-200 text-sm font-bold pb-2">
                Confirm Password
            </label>
            <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                v-model="formData.confirmPassword"
                @input="clearError('confirmPassword')"
                :class="[
                    'w-full rounded-lg border bg-white dark:bg-slate-900 p-3 text-base text-slate-800 dark:text-slate-200 focus:outline-0 focus:ring-2 focus:ring-indigo-500',
                    errors.confirmPassword ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                ]"
            />
            <span v-if="errors.confirmPassword" class="text-sm text-red-500 pt-1">{{ errors.confirmPassword }}</span>
        </div>

        <button
            type="submit"
            class="w-full h-12 flex items-center justify-center gap-2 rounded-lg bg-[#4F46E5] px-6 mt-6 text-base font-semibold text-white hover:bg-indigo-600 transition-colors"
        >
            Create Account
        </button>
    </form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = reactive({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
})

const errors = reactive({})

const toast = reactive({
    show: false,
    msg: '',
    type: 'success'
})

let toastTimer = null
const showToast = (message, type = 'success', duration = 3000) => {
    toast.msg = message
    toast.type = type
    toast.show = true
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => (toast.show = false), duration)
}

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const clearError = (field) => {
    if (errors[field]) delete errors[field]
}

const validate = () => {
    // reset errors
    Object.keys(errors).forEach((k) => delete errors[k])

    if (!formData.username.trim()) errors.username = 'Username is required.'

    if (!formData.email.trim()) {
        errors.email = 'Email is required.'
    } else if (!emailPattern.test(formData.email)) {
        errors.email = 'Please enter a valid email address.'
    }

    if (!formData.password) {
        errors.password = 'Password is required.'
    } else if (formData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters.'
    }

    if (!formData.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password.'
    } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match.'
    }

    return Object.keys(errors).length === 0
}

const handleSubmit = () => {
    if (!validate()) return

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const existingUser = users.find(
        (u) => u.email.toLowerCase() === formData.email.toLowerCase()
    )

    if (existingUser) {
        showToast('Email is already registered.', 'error')
        return
    }

    users.push({
        username: formData.username,
        email: formData.email,
        password: formData.password
    })

    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('ticketapp_session', 'true')

    showToast('Account created successfully!', 'success')
    setTimeout(() => router.push('/dashboard'), 1000)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>