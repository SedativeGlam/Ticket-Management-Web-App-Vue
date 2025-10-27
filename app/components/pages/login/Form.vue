<template>
    <div class="rounded-xl bg-card-light p-6 shadow-sm dark:bg-card-dark sm:p-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
                <label for="email" class="block text-sm font-bold leading-6 text-[#6c757d]">
                    Email or Username
                </label>
                <div class="relative mt-2">
                    <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span class="material-symbols-outlined text-[#6c757d]">person</span>
                    </span>
                    <input
                        v-model="formData.email"
                        @input="clearError('email')"
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter your email or username"
                        class="form-input block w-full rounded-lg border-0 bg-gray-50 py-3 pl-10 pr-3 text-[#6C757D] ring-1 ring-inset placeholder:text-text-secondary-light focus:ring-2 outline-[#0a4d68]"
                        :class="errors.email ? 'ring-[#d93b38]' : 'ring-gray-300'"
                    />
                </div>
                <p v-if="errors.email" class="mt-2 text-sm text-[#d93b38]">{{ errors.email }}</p>
            </div>

            <div>
                <div class="flex items-center justify-between">
                    <label for="password" class="block text-sm font-bold leading-6 text-[#6c757d]">
                        Password
                    </label>
                    <div class="text-sm">
                        <NuxtLink to="#" class="font-semibold text-[#0a4d68]">Forgot your password?</NuxtLink>
                    </div>
                </div>
                <div class="relative mt-2">
                    <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span class="material-symbols-outlined text-[#6c757d]">lock</span>
                    </span>
                    <input
                        v-model="formData.password"
                        @input="clearError('password')"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        class="form-input block w-full rounded-lg border-0 bg-gray-50 py-3 pl-10 pr-3 text-[#6C757D] ring-1 ring-inset placeholder:text-text-secondary-light focus:ring-2 outline-[#0a4d68]"
                        :class="errors.password ? 'ring-[#d93b38]' : 'ring-gray-300'"
                    />
                </div>
                <p v-if="errors.password" class="mt-2 text-sm text-[#d93b38]">{{ errors.password }}</p>
            </div>

            <div>
                <button
                    type="submit"
                    class="flex w-full justify-center rounded-lg bg-[#0a4d68] px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#3a6172] focus-visible:outline-primary cursor-pointer"
                >
                    Sign In
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { NuxtLink } from '#components'

const router = useRouter()
const toast = useToast()

const formData = reactive({ email: '', password: '' })
const errors = reactive({})

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

function clearError(name) {
    if (errors[name]) errors[name] = ''
}

function validate() {
    const newErrors = {}

    if (!formData.email.trim()) {
        newErrors.email = 'Email or username is required.'
    } else if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address.'
    }

    if (!formData.password.trim()) {
        newErrors.password = 'Password is required.'
    } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters.'
    }

    return newErrors
}

function handleSubmit() {
    const validationErrors = validate()

    Object.keys(errors).forEach((k) => delete errors[k])
    if (Object.keys(validationErrors).length > 0) {
        Object.assign(errors, validationErrors)
        return
    }

    const fakeUser = {
        email: 'demo@example.com',
        password: 'password123',
    }

    const usersJson = localStorage.getItem('users')
    const users = usersJson ? JSON.parse(usersJson) : []

    const userFound = users.find((item) => item?.email === formData?.email)

    if (
        formData.email === (userFound?.email || fakeUser.email) &&
        formData.password === (userFound?.password || fakeUser.password)
    ) {
        toast.success('Login successful!')
        localStorage.setItem('ticketapp_session', 'true')

        setTimeout(() => {
            router.push('/dashboard')
        }, 500)
    } else {
        toast.error('Invalid credentials. Please try again.')
    }
}
</script>