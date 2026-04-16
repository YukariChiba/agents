import { md3 } from "vuetify/blueprints";

// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: "2026-04-16",
  modules: ["vuetify-nuxt-module", "@nuxt/content", "@nuxtjs/sitemap"],
  site: {
    url: "https://agents.0x7f.cc",
    name: "0x7f Agents",
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
  },
  vuetify: {
    moduleOptions: {},
    vuetifyOptions: {
      blueprint: md3,
      theme: {
        defaultTheme: "light",
      },
    },
  },
});
