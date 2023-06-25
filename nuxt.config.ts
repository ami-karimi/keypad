// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    {src:'~/assets/css/style.css'},
  ],
  runtimeConfig: {
    SecretToken: '',
    AppMode: 'debug',
    public: {
      apiBase: 'https://api.arta20.top/api/',
      baseUrl: 'https://api.arta20.top',
    }
  },
})
