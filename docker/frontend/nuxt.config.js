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
    baseURL: "http://localhost:8000", // Backend API URL
  },
};
