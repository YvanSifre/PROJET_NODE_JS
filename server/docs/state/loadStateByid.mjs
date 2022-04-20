export default {
  get: {
    tags: ["State"],
    description: "Affiche l'état à partir de son id",
    operationId: "loadStateByid",
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
