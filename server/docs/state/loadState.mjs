export default {
  get: {
    tags: ["State"],
    description: "Affiche tous les états de message",
    operationId: "loadState",
    parameters: [
    ],
    responses: {
      200: {
        description: "{ id: ${id}, label: '${label}}",
        content: {
          "text/plain": {
            schema: {
              type: "string",
              example: "{ id: 1, label: 'envoyé' },\n{ id: 2, label: 'brouillon' },"
            }
          }
        }
      },
      400: {
        description: "Pas d'état de message ",
      },
    },
  },
};
