<template>
    <footer class="bg-slate-100 dark:bg-gray-900/50">
        <div class="max-w-5xl mx-auto px-5 py-16">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-center md:text-left">
                <div class="col-span-1 md:col-span-1 flex flex-col gap-2">
                    <div class="flex items-center gap-2 justify-center md:justify-start">
                        <span class="material-symbols-outlined text-[#4F46e5] text-2xl">
                            confirmation_number
                        </span>
                        <h2 class="text-text-light dark:text-text-dark text-lg font-bold">
                            TicketSphere
                        </h2>
                    </div>
                    <p class="text-slate-600 dark:text-slate-400 text-sm">
                        Stop dreaming, start seeing.
                    </p>
                </div>
                <div class="col-span-1">
                    <h3 class="font-bold text-text-light dark:text-text-dark mb-4">
                        Product
                    </h3>
                    <ul class="space-y-3">
                        <li>
                            <NuxtLink
                                class="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                                to="#"
                            >
                                Features
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                class="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                                to="#"
                            >
                                Pricing
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
                <div class="col-span-1">
                    <h3 class="font-bold text-text-light dark:text-text-dark mb-4">
                        Company
                    </h3>
                    <ul class="space-y-3">
                        <li>
                            <NuxtLink
                                class="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                                to="#"
                            >
                                About Us
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                class="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                                to="#"
                            >
                                Careers
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
                <div class="col-span-1">
                    <h3 class="font-bold text-text-light dark:text-text-dark mb-4">
                        Legal
                    </h3>
                    <ul class="space-y-3">
                        <li>
                            <NuxtLink
                                class="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                                to="#"
                            >
                                Privacy Policy
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                class="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                                to="#"
                            >
                                Terms of Service
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>

            <TicketSphereFooter />
        </div>
    </footer>
</template>

<script>
import TicketSphereFooter from './TicketSphereFooter.vue';

export default {
    components: {
        TicketSphereFooter,
    },
};
</script>

<style scoped>
</style>