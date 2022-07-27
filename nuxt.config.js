require("dotenv").config();

var hostname = process.env.HOSTNAME;
var description = '';

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'picture - SENSE',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: description },
      { name: 'keywords', content: 'sense,artists,music,release,club,labels,services,picture,dashboard' },
      { name: 'robots', content: 'index, follow' },
      { name: 'category', content: 'music' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'theme-color', content: '#1d1d1d' },
      { name: 'msapplication-TileColor', content: '#1d1d1d' },
      { name: 'msapplication-TileImage', content: '/favicon.png' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-title', content: 'picture - SENSE' },
      { name: 'og:title', content: 'picture - SENSE' },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: 'https://'+hostname },
      { name: 'og:image', content: 'https://'+hostname+'/favicon.png' },
      { name: 'og:description', content: description },
      { name: 'og:site_name', content: 'picture - SENSE' },
      { name: 'og:locale', content: 'en_US' },
      { name: 'og:locale:alternate', content: 'en_US' },
      { name: 'twitter:creator', content: '@senseartists' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@senseartists' },
      { name: 'twitter:title', content: 'picture by SENSE' },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: 'https://'+hostname+'/favicon.png' },
      { name: 'twitter:image:alt', content: 'SENSE picture' },
      { name: 'application:name', content: 'picture - SENSE' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: 'apple-touch-icon.png' },
      { rel: 'canonical', href: 'https://'+hostname }
    ]
  },

  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || "localhost"
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/sitemap'
  ],

  // Configuration du module sitemap
  sitemap: {
    hostname: 'https://'+hostname,
    gzip: true,
    routes : ['/']
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: 'picture'
  },

  router: {
    base: process.env.BASE_URL || '/',
  },

  // API
  serverMiddleware: [
    { path: '/api', handler: '~/api.js' }
  ]

};
