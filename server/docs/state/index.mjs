import updateState from "./updateState.mjs";
import loadStateByid from "./loadStateByid.mjs";
import deleteState from "./deleteState.mjs";
import loadState from "./loadState.mjs";


export default {
  paths: {
    "/state": {
      ...loadState,
      ...updateState
    },
    "/state/{id}": {
      ...loadStateByid,
      ...deleteState
    },
  },
}
