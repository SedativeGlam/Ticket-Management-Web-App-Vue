<template>
  <article class="bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark antialiased">
    <section class="max-w-[1440px] mx-auto overflow-x-hidden">
      <Header />
      <HeroSection />
      <FeatureSection />
      <Footer />
    </section>
  </article>
</template>

<script>
import Header from "@/components/pages/landing/Header.vue";
import HeroSection from "@/components/pages/landing/HeroSection.vue";
import FeatureSection from "@/components/pages/landing/FeatureSection.vue";
import Footer from "@/components/pages/landing/Footer.vue";

export default {
  name: "Home",
  components: {
    Header,
    HeroSection,
    FeatureSection,
    Footer,
  },
};
</script>

<style scoped>
/* You can add custom page styles here if needed */
</style>
