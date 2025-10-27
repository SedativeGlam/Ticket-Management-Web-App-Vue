<template>
  <section class="bg-background-light dark:bg-background-dark py-20 px-4">
    <div class="max-w-5xl mx-auto flex flex-col gap-12">
      <!-- Section Header -->
      <div class="flex flex-col gap-4 text-center">
        <h1 class="text-text-light dark:text-text-dark tracking-tight text-3xl font-bold md:text-4xl">
          Everything You Need to Manage Tickets Efficiently
        </h1>
        <p class="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
          From creation to resolution — our system helps you track, prioritize,
          and resolve tickets faster and smarter.
        </p>
      </div>

      <!-- Feature Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Feature 1 -->
        <div
          class="flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-card-dark p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
        >
          <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
            <span class="material-symbols-outlined text-3xl text-[#4F46E5] bg-[#4F46E51A] p-2 rounded-lg">
              add_task
            </span>
          </div>
          <div class="flex flex-col gap-1">
            <h2 class="text-text-light dark:text-text-dark text-lg font-bold">
              Quick Ticket Creation
            </h2>
            <p class="text-slate-600 dark:text-slate-400 text-base">
              Easily create new tickets with all essential details like title,
              description, priority, and status — all in one simple form.
            </p>
          </div>
        </div>

        <!-- Feature 2 -->
        <div
          class="flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-card-dark p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
        >
          <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
            <span class="material-symbols-outlined text-3xl text-[#4F46E5] bg-[#4F46E51A] p-2 rounded-lg">
              tune
            </span>
          </div>
          <div class="flex flex-col gap-1">
            <h2 class="text-text-light dark:text-text-dark text-lg font-bold">
              Smart Ticket Management
            </h2>
            <p class="text-slate-600 dark:text-slate-400 text-base">
              Filter, sort, and update tickets seamlessly. Assign tasks to the
              right team members and track progress in real time.
            </p>
          </div>
        </div>

        <!-- Feature 3 -->
        <div
          class="flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-card-dark p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
        >
          <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
            <span class="material-symbols-outlined text-3xl text-[#4F46E5] bg-[#4F46E51A] p-2 rounded-lg">
              insights
            </span>
          </div>
          <div class="flex flex-col gap-1">
            <h2 class="text-text-light dark:text-text-dark text-lg font-bold">
              Ticket Insights & Analytics
            </h2>
            <p class="text-slate-600 dark:text-slate-400 text-base">
              Get visual reports on ticket trends, resolution times, and
              workload distribution to improve efficiency and performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No logic needed for this component yet
</script>
