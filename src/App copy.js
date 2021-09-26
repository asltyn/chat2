import "./App.css"
import ReactDOM from "react-dom"
import { createMachine, interpret, assign } from "xstate"

const A = (props) => {
  console.log("props", props.emitter)
  return (
    <div className="log">
      <span className="inp-sp">Username:</span>
      <input type="text" className="inp" value={props.data.name} onChange={(e) => props.emitter.emit("name-change", e)}></input>
      <input className="btn" type="button" value="Enter" onClick={(e) => props.emitter.emit("press-button")}></input>
    </div>
  )
}

class EventEmitter {
  constructor() {
    this.events = {}
  }

  subscribe(eventName, callback) {
    !this.events[eventName] && (this.events[eventName] = [])
    this.events[eventName].push(callback)
  }

  unsubscribe(eventName, callback) {
    this.events[eventName] = this.events[eventName].filter((eventCallback) => callback !== eventCallback)
  }

  emit(eventName, args) {
    console.log("emitter works!", eventName, args)
    const event = this.events[eventName]
    event && event.forEach((callback) => callback.call(null, args))
  }
}

function App() {
  const emitter = new EventEmitter()

  const loginMachine = createMachine({
    id: "Login",
    initial: "start",
    context: {
      name: "",
      password: "",
    },
    on: {
      PRESS: { actions: (ctx) => console.log("actual ctx", ctx) },
    },
    states: {
      start: {
        entry: (ctx) => ReactDOM.render(<A emitter={emitter} data={ctx.name} />, document.getElementById("root")),
        on: {
          REGISTER: "registration",
          LOGIN: "sendingToServer",
          FILLDATA: { actions: assign({ name: (context, event) => event.name || "" }) },
        },
      },
      registration: {
        initial: "fillingRegForm",
        states: {
          fillingRegForm: {
            on: {
              SUBMIT: {
                target: "#Login.sendingToServer",
                cond: (ctx) => false,
              },
              FILLREGDATA: { actions: assign({ name: (context, event) => event.data || "" }) },
            },
          },
        },
        on: {
          CANCEL: "start",
        },
      },
      sendingToServer: {
        invoke: {
          id: "fet",
          src: (context, event) => Promise.resolve(),
          onDone: "success",
          onError: "error",
        },
      },
      success: {
        on: {
          OK: "finish",
        },
      },
      error: {
        on: {
          OK: "start",
        },
      },
      finish: {
        type: "final",
      },
    },
  })

  const loginService = interpret(loginMachine)
    .onTransition((state) => console.log(state.value))
    .start()

  emitter.subscribe("name-change", (e) => loginService.send("FILLDATA", { name: e.target }))
  emitter.subscribe("press-button", () => loginService.send("PRESS"))
  //ReactDOM.render(<A />, document.getElementById("root"))
}

export default App
