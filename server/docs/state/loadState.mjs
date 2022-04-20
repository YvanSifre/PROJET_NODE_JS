export default {
  get: {
    tags: ["State"],
    description: "Affiche tous les états d'un message",
    operationId: "loadState",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/state",
          },
        },
      },
    },
    responses: {
      200: {
        description: "Brouillon",
      },
      400: {
        description: "Cet id n'existe pas ",
      },
    },
  },
};
