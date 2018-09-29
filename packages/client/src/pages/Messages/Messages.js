import React from "react"
import MessageList from "./MessageList"
import MessageForm from "./MessageForm"
import Conversations from "./Conversations"

class Messages extends React.Component {
	render() {
		return (
			<div className="Messages">
				<h1>title bar</h1>
				<Conversations />
				<MessageList />
				<MessageForm />
			</div>
		)
	}
}

export default Messages
