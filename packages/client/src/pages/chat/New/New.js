import React from "react"
import { Button, FontIcon, TextField, SelectField } from "react-md"
import AppLayout from "components/AppLayout"
import "./New.css"

const OBJECT_ITEMS = [
	{
		label: "English",
		value: "en",
	},
	{
		label: "Russian",
		value: "ru",
	},
	{
		label: "Korean",
		value: "ko",
	},
	{
		label: "Spanish",
		value: "es",
	},
]

class NewChatPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			text: "",
			number: "",
			language: ""
		}
	}

	updateText = e => {
		this.setState({ text: e })
	}

	updateNumber = e => {
		this.setState({ number: e })
	}

	updateLanguage = e => {
		this.setState({ language: e })
	}

	sendMessage = e => {
		e.preventDefault()
		console.log(this.state)
		// axios.post(`${config.serverUrl}/chat/send`, {
		//    textBody:this.state.text,
		//    user:'+13862005006',
		//    // user: this.props.twilioNumber,
		//    sender:'+12052391820',
		//    senderLanguage:'es',
		// })
	}

	render() {
		return (
			<AppLayout title="New">
				<div className="new-conv">
				<TextField
					id="phone-number-with-icon-right"
					label="Phone"
					type="tel"
					rightIcon={<FontIcon>phone</FontIcon>}
					size={10}
					fullWidth={false}
					className="item"
					onChange={this.updateNumber}
				/>
				<SelectField
					id="select-field-3"
					label="Select Their Language"
					placeholder="Placeholder"
					className="item"
					menuItems={OBJECT_ITEMS}
					onChange={this.updateLanguage}
				/>
				<form className="item" onSubmit={this.sendMessage}>
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
				</div>
			</AppLayout>
		)
	}
}

export default NewChatPage
