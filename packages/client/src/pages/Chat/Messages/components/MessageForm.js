import React from "react"
import { TextField, Button } from "react-md"
import "./MessageForm.css"

class MessageForm extends React.Component {
<<<<<<< HEAD
	constructor(props) {
		super(props)
		this.state = {
			text: "",
		}
	}
=======
  constructor(props) {
    super(props)
    this.state = {
      text: "",
    }
    this.socket = io("localhost:7340")
  }
>>>>>>> c5a564c2365a1ceac38b2c445337ac4606c8eb93

  updateText = e => {
    this.setState({ text: e })
  }

<<<<<<< HEAD
	sendMessage = e => {
		e.preventDefault()
		// if (this.state.text) {
		// 	console.log(`send message: ${this.state.text}`)
		// 	this.socket.emit("SEND_MESSAGE", {
		// 		body: this.state.text,
		// 		id: Math.floor(Math.random() * 1000),
		// 		user: 'awd'
		// 	})
		// 	this.setState({ text: "" })
		// }
		console.log('send message to server')
	}
=======
  sendMessage = e => {
    e.preventDefault()
    if (this.state.text) {
      console.log(`send message: ${this.state.text}`)
      this.socket.emit("SEND_MESSAGE", {
        body: this.state.text,
        id: Math.floor(Math.random() * 1000),
        user: "awd",
      })
      this.setState({ text: "" })
    }
  }
>>>>>>> c5a564c2365a1ceac38b2c445337ac4606c8eb93

  render() {
    return (
      <form className="message-form" onSubmit={this.sendMessage}>
        <TextField
          id="message-input"
          label="Text"
          placeholder="type your message here"
          value={this.state.text}
          onChange={this.updateText}
        />
        <Button raised primary type="submit">
          Send
        </Button>
      </form>
    )
  }
}

export default MessageForm
