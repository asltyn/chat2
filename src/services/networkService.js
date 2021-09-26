const later = (delay, value) => new Promise((resolve, reject) => setTimeout(resolve, delay, value))
const networkService = (context, event) => (callback, onEvent) => {
  onEvent(async (e) => {
    switch (event.type) {
      case "LOGIN":
        try {
          //console.log("post context ", context)
          const { name, password } = { ...context }
          const response = await fetch("/AUTH", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "POST", // или 'PUT'
            body: JSON.stringify({ name, password }), // данные могут быть 'строкой' или {объектом}!
          })
          // console.log("response ", response)
          const text = await response.json()
          switch (text) {
            case "user find":
              return callback("LOGINSUCCESS")
            case "user not find":
              return callback("LOGERROR")
          }
          callback("LOGINSUCCESS")
        } catch (error) {
          console.error("HTTP error:", error)
          callback("NETWORKERROR")
        }
        break
      case "REGISTER":
        later(1000, "ok")
          .then((v) => callback("REGSUCCESS"))
          .catch(() => callback("SERVERERROR"))
        break
      default:
        console.log("unexpected action: ", event.type)
    }
  })
}

export default networkService
