<template>
    <div>
        <slot />
    </div>
</template>

<script setup>
const router = useRouter()

const handleRedirectDashboard = () => {
    const isLoggedIn = localStorage.getItem('ticketapp_session')
    
    if (isLoggedIn === 'true') {
        router.push('/dashboard')
    }
}

onMounted(() => {
    handleRedirectDashboard()
})
</script>

<style scoped>
</style>