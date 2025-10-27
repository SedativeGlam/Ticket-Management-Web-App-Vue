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
import FeatureSection from "@/components/pages/landing/FeatureSection";
import Footer from "@/components/pages/landing/Footer";
import Header from "@/components/pages/landing/Header";
import HeroSection from "@/components/pages/landing/HeroSection";

export default {
    components: {
        FeatureSection,
        Footer,
        Header,
        HeroSection,
    },
};
</script>

<style scoped>

</style>