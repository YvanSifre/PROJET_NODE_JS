export default {
  put: {
    tags: ["State"],
    description: "Modifie le label de l'état à partir de son id",
    operationId: "updateState",
    parameters: [
      {
        "name": "id",
        "description": "id de l'état de message à modifier",
        "in": "query",
        "type": "int",
        "required": true,
        "example": 1

      },
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
        description: "État ${id} renommé ${label}",
        content: {
          "text/plain": {
            schema: {
              type: "string",
              example: "État 1 renommé enregistré"
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
