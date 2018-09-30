import React from "react"
import { TextField, Button } from "react-md"
import { withUser } from "contexts/User"
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
		console.log(this.props)
		fetch('http://localhost:8000/chat/send', {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				textBody: this.state.text,
				user: 'user1',
				sender: 'sender1',
				senderLanguage: 'ru'
			}),
		})
			.then(res => {this.setState({ text: "" })})
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
