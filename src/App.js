import { createMachine, interpret, assign, send } from "xstate"
import { invoke } from "xstate/lib/actionTypes.js"
import loginMachine from "./machines/loginMachine.js"
import chatMachine from "./machines/chatMachine.js"

function app() {
  const appMachine = createMachine({
    id: "app",
    initial: "login",
    states: {
      login: {
        invoke: {
          id: "loginMachine",
          src: loginMachine,
        },
        on: {
          FINISH: "chat",
        },
      },
      chat: {
        entry: () => console.log("chat"),
        invoke: {
          id: "chatMachine",
          src: chatMachine,
        },
        on: {
          FINISH: "login",
        },
      },
    },
  })

  interpret(appMachine).start()
}

export default app
