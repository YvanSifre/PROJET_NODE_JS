import state from "./state/index.mjs";
export default {
  openapi: "3.0.1",
  info: {
    version: "1.0.0",
    title: "Projet API REST",
    description: "ESGI Paris : Projet API REST, Réalise par : Yvan Sifre, Thomas Southasa, Zinedine Megnouche",
    contact: {
      name: "SIFRE SOUTHASA MEGNOUCHE",
      email: "info@esgi.fr",
      url: "https://esgi.fr",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server",
    },
  ],
  paths: {
    ...state.paths,
  }
};
