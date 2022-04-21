export default {
  get: {
    tags: ["State"],
    description: "Affiche tous les états de message",
    operationId: "loadState",
    parameters: [
      {
        "name": "id",
        "description": "id de l'état de message à afficher",
        "in": "query",
        "type": "int",
        "required": true,
        "example": 1
      }
    ],
    responses: {
      200: {
        description: "{ id: ${id}, label: '${label}}",
        content: {
          "text/plain": {
            schema: {
              type: "string",
              example: "{ id: 1, label: 'envoyé' }"
            }
          }
        }
      },
      400: {
        description: "L'etat ${id} n'existe pas ",
      },
    },
  },
};
