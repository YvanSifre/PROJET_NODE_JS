export default {
  delete: {
    tags: ["State"],
    description: "Supprime l'état à partir de son id",
    operationId: "deleteState",
    parameters: [
    ],
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
