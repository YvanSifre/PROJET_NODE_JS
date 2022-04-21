export default {
  post: {
    tags: ["State"],
    description: "Creer un etat de message",
    operationId: "createState",
    parameters: [
      {
        "name": "label",
        "description": "nouveau label de l'état de message ",
        "in": "query",
        "type": "string",
        "required": true,
        "example": "Enregistré"
      }

    ],
    responses: {
      200: {
        description: "l'état '${label}'a bien été crée",
        content: {
          "text/plain": {
            schema: {
              type: "string",
              example: "l'état 'enregistré' a bien été crée"
            }
          }
        }
      },
      400: {
        description: "Le label '${labelState}' existe deja ",
      },
    },
  },
};
