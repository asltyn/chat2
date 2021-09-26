import React from "react"
import ReactDOM from "react-dom"
import { createMachine, interpret, send, sendParent } from "xstate"
import { respond } from "xstate/lib/actions"

const A = (props) => {
  console.log("props", props.act)
  return (
    <div>
      <div>
        <span>Username:</span>
        <input type="text" value={"props.data.name"} onChange={(e) => props.emitter.emit("name-change", e)}></input>
      </div>
      <input className="btn" type="button" value="Enter" onClick={() => props.act("press-button")}></input>
    </div>
  )
}

const echoCallbackHandler = (context, event) => (callback, onEvent) => {
  onEvent((e) => {
    console.log(e)
    if (e.type === "HEAR") {
      ReactDOM.render(<A act={(e) => callback("ECHO")} data={e} />, document.getElementById("root"))
      console.log("aaa")
      //callback("ECHO")
    }
  })
}

const renderMachine = createMachine(
  {
    id: "renderMachine",
    initial: "ready",
    context: {
      // emitter: new EventEmitter(),
      send: send,
    },
    states: {
      ready: {
        entry: console.log("I recive"),
        invoke: {
          id: "echoCallback",
          src: echoCallbackHandler,
        },
        on: {
          RENDERSTART: { actions: send("HEAR", { to: "echoCallback" }) }, //["subscribe", "render"] }, //(_, e) => ReactDOM.render(<A emitter={emitter} data={e.ctx} />, document.getElementById("root")),
          PRESS: { actions: ["press"] },
          RESPOND: { actions: ["resp"] },
          TEST: "test",
          ECHO: {
            actions: sendParent("PRESS"),
          },
        },
      },
      test: {
        entry: () => console.log("yea"),
      },
    },
  },
  {
    actions: {
      // subscribe: (ctx) => ,
      render: (ctx, e) => ReactDOM.render(<A act={send} data={e} />, document.getElementById("root")),
      resp: (_, e) => respond(e),
      press: () => console.log("qqqq"),
    },
  }
)

// const renderService = interpret(renderMachine)
//   //.onTransition((state) => console.log("Render service state:", state.value))
//   .start()

// emitter.subscribe("name-change", (e) => renderService.send("FILLDATA", { name: e.target }))
// emitter.subscribe("press-button", () => renderService.send("PRESS"))

export default renderMachine
