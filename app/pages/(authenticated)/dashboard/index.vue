<template>
    <main class="font-display bg-background-light dark:bg-background-dark">
        <Toaster position="bottom-right" reverseOrder="false" />
        <div class="flex min-h-screen w-full flex-col">
            <div class="mx-auto flex w-full max-w-7xl flex-1 flex-col">
                

                <main class="flex flex-1 flex-col p-6 lg:p-8">
                    <section class="flex flex-col gap-6 md:flex-row">
                        <div class="flex flex-1 flex-col gap-4 rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm">
                            <div class="flex items-center justify-between">
                                <p class="text-slate-600 dark:text-slate-400 text-base font-bold">
                                    Total Tickets
                                </p>
                                <span class="material-symbols-outlined text-[#137fec] text-3xl">
                                    style
                                </span>
                            </div>
                            <p class="text-slate-900 dark:text-slate-50 text-4xl font-bold">
                                2,450
                            </p>
                        </div>

                        <div class="flex flex-1 flex-col gap-4 rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm">
                            <div class="flex items-center justify-between">
                                <p class="text-slate-600 dark:text-slate-400 text-base font-bold">
                                    Open Tickets
                                </p>
                                <span class="material-symbols-outlined text-orange-500 text-3xl">
                                    drafts
                                </span>
                            </div>
                            <p class="text-slate-900 dark:text-slate-50 text-4xl font-bold">
                                85
                            </p>
                        </div>

                        <div class="flex flex-1 flex-col gap-4 rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm">
                            <div class="flex items-center justify-between">
                                <p class="text-slate-600 dark:text-slate-400 text-base font-bold">
                                    Resolved Tickets
                                </p>
                                <span class="material-symbols-outlined text-green-500 text-3xl">
                                    task_alt
                                </span>
                            </div>
                            <p class="text-slate-900 dark:text-slate-50 text-4xl font-bold">
                                2,110
                            </p>
                        </div>
                    </section>

                    <section>
                        <NuxtLink to="/management" class="px-0 py-3">
                            <button class="flex justify-center items-center w-full max-w-[440px] mx-auto h-12 rounded-lg bg-[#1175da] text-white text-base font-bold hover:bg-[#1783ee] mt-12 cursor-pointer">
                                Manage Tickets
                            </button>
                        </NuxtLink>
                    </section>
                </main>

                <footer class="flex flex-col gap-6 px-5 py-10 text-center">
                    <TicketSphereFooter />
                </footer>
            </div>
        </div>
    </main>
</template>

<script>
 definePageMeta({
  layout: 'authenticated' 
})
import TicketSphereFooter from "@/components/pages/landing/TicketSphereFooter";
import { useRouter } from 'vue-router';
import { Toaster } from '@steveyuowo/vue-hot-toast';

export default {
    components: {
        TicketSphereFooter,
        Toaster
    },
    setup() {
        const router = useRouter();

        const handleLogout = () => {
            localStorage.setItem("ticketapp_session", "false");
            router.push("/login");
        };

        return {
            handleLogout
        };
    }
};
</script>

<style scoped>

</style>