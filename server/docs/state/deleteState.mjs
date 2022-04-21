export default {
  delete: {
    tags: ["State"],
    description: "Supprime l'état à partir de son id",
    operationId: "deleteState",
    parameters: [
      {
        "name": "id",
        "description": "id de l'état de message à supprimer",
        "in": "query",
        "type": "int",
        "required": true,
        "example": 1

      }
    ],
    responses: {
      200: {
        description: "État ${id} a bien été supprimé",
        content: {
          "text/plain": {
            schema: {
              type: "string",
              example: "État 1 a bien été supprimé"
            }
          }
        }
      },
      400: {
        description: "Cet id n'existe pas ",
      },
    },
  },
};
