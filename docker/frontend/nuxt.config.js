export default {
  head: {
    title: "Nuxt App",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
  },
  buildModules: [],
  modules: ["@nuxtjs/axios"],
  axios: {
    baseURL: "http://node:8000", // Backend API URL
  },
};
