import React from "react"
import { TextField, Button } from "react-md"
import { withUser } from "contexts/User"
import axios from "axios"
import config from "config"
import "./MessageForm.css"

class MessageForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "",
    }
  }

  updateText = e => {
    this.setState({ text: e })
  }

  sendMessage = e => {
    e.preventDefault()

    const conversation = this.props.conversation

    axios.post(`${config.serverUrl}/chat/send`, {
      textBody: this.state.text,
      user: conversation.user,
      sender: conversation.sender,
      senderLanguage: conversation.senderLanguage,
    })

    this.setState({ text: "" })
  }

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

export default withUser(MessageForm)
