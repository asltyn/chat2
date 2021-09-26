import React from "react"
import Backdrop from "@material-ui/core/Backdrop"
import CircularProgress from "@material-ui/core/CircularProgress"
import Start from "./Start.js"
import Container from "@material-ui/core/Container"

const SendingToServer = ({ action, data }) => {
  //console.log("props", props.act)
  return (
    <Container>
      <Start action={action} data={data}></Start>
      <Backdrop style={{ zIndex: 1 }} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  )
}

export default SendingToServer
