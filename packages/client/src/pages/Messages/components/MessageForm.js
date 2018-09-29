import React from "react"
import { TextField, Button } from "react-md"
import "./MessageForm.css"

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  updateText = e => {
    this.setState({ text: e });
  };

	sendMessage = e => {
		e.preventDefault()
		if (this.state.text) {
			console.log(`send message: ${this.state.text}`)
			this.setState({ text: "" });
		}
	};

	render() {
		return (
			<form className="message-form" onSubmit={this.sendMessage}>
			<TextField id="message-input" placeholder="type your message here" value={this.state.text} onChange={this.updateText}/>
			<Button flat primary type="submit">Send</Button>
			</form>
		)
	}
}

export default MessageForm
