import { createMachine, interpret, assign, send, sendParent } from "xstate"
import renderService from "../services/renderService.js"
import networkService from "../services/networkService.js"

const chatMachine = createMachine(
  {
    id: "chat",
    initial: "start",
    context: {
      name: "",
      password: "",
    },
    invoke: {
      id: "renderService",
      src: renderService,
    },
    on: {
      CHECKCONTEXT: { actions: "contextlog" },
    },
    states: {
      start: {
        entry: send((cxt) => ({ type: "START_CHAT", ...cxt }), { to: "renderService" }),
      },
    },
  },
  {
    actions: {
      contextlog: (ctx) => console.log("actual context: ", ctx),
      resetName: assign({ name: "" }),
      resetPassword: assign({ password: "" }),
    },
  }
)

export default chatMachine
