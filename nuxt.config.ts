// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-01-07",
  devtools: { enabled: true },

  modules: ["@nuxt/icon", "@vee-validate/nuxt", "@sidebase/nuxt-auth"],

  runtimeConfig: {
    authSecret: "",
  },

  auth: {
    provider: { type: "authjs" },
    globalAppMiddleware: true,
  },

  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: "VeeForm",
      Field: "VeeField",
      FieldArray: "VeeFieldArray",
      ErrorMessage: "VeeErrorMessage",
    },
  },

  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
        },
      ],
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js",
          tagPosition: "bodyClose",
        },
        {
          innerHTML: "const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle=\"tooltip\"]'); const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))",
          tagPosition: "bodyClose",
        },
      ],
    },
  },
});
