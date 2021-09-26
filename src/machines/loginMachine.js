import { createMachine, interpret, assign, send, sendParent } from "xstate"
import renderService from "../services/renderService.js"
import networkService from "../services/networkService.js"

const loginMachine = createMachine(
  {
    id: "Login",
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
        entry: ["resetName", "resetPassword", send((ctx) => ({ type: "START", ...ctx }), { to: "renderService" })],
        on: {
          REGISTER: "registration",
          LOGIN: "loginRequest",
          FILLNAME: { actions: [assign({ name: (context, event) => event.data || "" }), send("CHECKCONTEXT")] },
          FILLPASSWORD: { actions: [assign({ password: (context, event) => event.data || "" }), send("CHECKCONTEXT")] },
        },
        //exit: ["resetName", "resetPassword"],
      },
      registration: {
        initial: "fillingRegForm",
        states: {
          fillingRegForm: {
            entry: send((ctx) => ({ type: "FILLINGREGFORM", ...ctx }), { to: "renderService" }),
            on: {
              SUBMIT: { target: "#Login.loginRequest", cond: (ctx) => true },
              FILLNAME: { actions: [assign({ name: (context, event) => event.data || "" }), send("CHECKCONTEXT")] },
              FILLPASSWORD: { actions: [assign({ password: (context, event) => event.data || "" }), send("CHECKCONTEXT")] },
              CANCEL: "#Login.start",
            },
            //exit: ["resetName", "resetPassword"],
          },
        },
        on: {
          CANCEL: "start",
        },
      },
      loginRequest: {
        invoke: {
          id: "networkService",
          src: networkService,
        },
        entry: [send("CHECKCONTEXT"), send((cxt) => ({ type: "LOGINREQUEST", ...cxt }), { to: "renderService" }), send((cxt) => ({ ...cxt }), { to: "networkService" })],
        on: {
          LOGINSUCCESS: { target: "finish", actions: () => console.log("try to finish") },
          REGSUCCESS: "success",
          LOGERROR: "logerror",
          REGERROR: "error",
          NETWORKERROR: "finishwitherror",
        },
      },
      success: {
        on: {
          OK: "finish",
        },
      },
      logerror: {
        entry: [() => console.log("logerror"), send({ type: "LOGERROR" }, { to: "renderService" })],
        on: {
          OK: "start",
        },
      },
      error: {
        on: {
          OK: "start",
        },
      },
      finish: {
        entry: [() => console.log("finish login machine"), sendParent("FINISH")],
        type: "final",
      },
      finishwitherror: {
        entry: send((cxt) => ({ type: "FINISHWITHERROR", ...cxt }), { to: "renderService" }),
        type: "final",
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

export default loginMachine
