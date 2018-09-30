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

		axios.post(`${config.serverUrl}/chat/send`, {
    textBody:this.state.text,
    user:'+13862005006',
    // user: this.props.twilioNumber,
    sender:'+12052391820',
    senderLanguage:'es',
		})		

		this.setState({ text: "" })

		// fetch('http://localhost:8000/chat/send', {
		// 	method: "POST",
		// 	headers: {
		// 		Accept: "application/json",
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify({
		// 		textBody: this.state.text,
		// 		user: '+13862005006',
		// 		sender: '+13868645337',
		// 		senderLanguage: 'ru'
		// 	}),
		// })
		// 	.then(res => {this.setState({ text: "" })})
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
