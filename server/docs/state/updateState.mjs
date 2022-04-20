export default {
  put: {
    tags: ["State"],
    description: "Mettre à jour un état de mail",
    operationId: "updateState",
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
        description: "Etat #id renommé '#newLabel'",
      },
      400: {
        description: "Error",
      },
    },
  },
};
