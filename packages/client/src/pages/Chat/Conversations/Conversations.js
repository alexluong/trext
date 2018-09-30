import React from "react"
import AppLayout from "components/AppLayout"
import { Avatar, List, ListItem } from "react-md"

class ConversationsPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			conversations: [
				{ id: 0, recipient: "friend1", user: "me", lastMessage: "hi" },
				{ id: 1, recipient: "friend2", user: "me", lastMessage: "hii" },
				{
					id: 2,
					recipient: "friend3",
					user: "me",
					lastMessage: "hiii",
				},
			],
		}
	}

	render() {
		return (
			<AppLayout title="Conversations">
				<List className="md-cell">
					{this.state.conversations.map(convo => (
						<ListItem
							key={convo.id}
							leftAvatar={<Avatar>{convo.recipient[0]}</Avatar>}
							primaryText={convo.recipient}
							secondaryText={convo.lastMessage}
							onClick={() => { this.props.history.push(`/chat/${convo.id}`) }}
						/>
					))}
				</List>
			</AppLayout>
		)
	}
}

export default ConversationsPage
