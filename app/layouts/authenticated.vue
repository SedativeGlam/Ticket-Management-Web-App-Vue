<template>
    <div class="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <div class="flex-1 flex flex-col">
            <header class="flex items-center justify-between border-b border-slate-200 bg-background-light dark:border-slate-800 dark:bg-background-dark px-6 py-4">
                <div class="flex items-center gap-10">
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-[#137fec] text-3xl">
                            confirmation_number
                        </span>
                        <h1 class="text-slate-900 dark:text-slate-50 text-xl font-bold">
                            TicketSphere
                        </h1>
                    </div>
                    <nav class="hidden items-center gap-6 md:flex">
                        <NuxtLink class="text-[#137fec] text-base font-semibold" to="/dashboard">
                            Dashboard
                        </NuxtLink>
                    </nav>
                </div>
                <button @click="handleLogout" class="flex h-10 items-center justify-center rounded-lg bg-[#137fec] px-4 text-sm font-bold text-white hover:bg-[#1783ee] focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer">
                    Logout
                </button>
            </header>

            <main class="grow p-8">
                <slot /> 
            </main>
        </div>
    </div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
const default_tickets = [
  {
    id: "TICK-5821",
    title: "API connection is failing intermittently",
    description: "Connection drops randomly during calls.",
    created: "Oct 26, 2023",
    priority: "high",
    assignee: "Jane Doe",
    status: "in_progress",
  },
  {
    id: "TICK-5820",
    title: "Cannot reset user password from admin",
    description: "Admin reset flow returns 500 on some accounts.",
    created: "Oct 25, 2023",
    priority: "low",
    assignee: "John Smith",
    status: "open",
  },
  {
    id: "TICK-5819",
    title: "Dashboard analytics not loading",
    description: "Charts return empty dataset intermittently.",
    created: "Oct 24, 2023",
    priority: "medium",
    assignee: "Sara Connor",
    status: "closed",
  },
];

const route = useRoute();


const handleLogout = () => {
    localStorage.setItem('ticketapp_session', 'false');
    localStorage.removeItem("default_tickets_set");
    navigateTo('/login');
};

const setDefaultTickets = () => {
    const defaultTicketsSet = localStorage.getItem("default_tickets_set");
    let defaultTickets;
    if (defaultTicketsSet === "true") {
      defaultTickets = typeof window !== "undefined" && localStorage?.getItem("default_tickets")
        ? JSON.parse(localStorage?.getItem("default_tickets"))
        : [];
    } else {
      localStorage.setItem("default_tickets", JSON.stringify(default_tickets));
      localStorage.setItem("default_tickets_set", "true");
    }
};

const handleRedirect = () => {
    const isLoggedIn = localStorage.getItem('ticketapp_session');
    if (isLoggedIn !== 'true') {
        navigateTo('/login');
    }
};

onMounted(() => {
    setDefaultTickets();
    handleRedirect();
});

watch(() => route.fullPath, () => {
    handleRedirect();
});
</script>