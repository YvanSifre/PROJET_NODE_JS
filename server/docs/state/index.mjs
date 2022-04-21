import updateState from "./updateState.mjs";
import loadStateByid from "./loadStateByid.mjs";
import deleteState from "./deleteState.mjs";
import loadState from "./loadState.mjs";
import createState from "./createState.mjs";


export default {
  paths: {
    "/state": {
      ...loadState,
    },
    "/state/{id}": {
      ...loadStateByid,
      ...deleteState
    },
    "/state/{id}/{label}": {
      ...updateState
    },
    "/state/{label}": {
      ...createState
    },
  },
}
