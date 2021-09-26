import React from "react"
import Modal from "@material-ui/core/Modal"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Start from "./Start.js"
import Container from "@material-ui/core/Container"

const LogError = ({ action, data }) => {
  //console.log("props", props.act)
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  }

  return (
    <Container>
      <Start action={action} data={data} />
      <Modal
        open={true}
        //onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Username or password is incorrect
          </Typography>
          <Button onClick={() => action("OK")}>OK</Button>
        </Box>
      </Modal>
    </Container>
  )
}

export default LogError
