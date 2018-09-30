import React from "react"
import { Avatar, List, ListItem } from "react-md"
// onClick={() => { history.push(`/chat/${convo.id}`) }}
class ConversationsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      conversations: [
        { id: 0, recipient: "friend1", user: "me", lastMessage: "hi" },
        { id: 1, recipient: "friend2", user: "me", lastMessage: "hii" },
        { id: 2, recipient: "friend3", user: "me", lastMessage: "hiii" },
      ],
    }
  }

  render() {
    return (
      <List className="md-cell">
        {this.state.conversations.map(convo => (
          <ListItem
            key={convo.id}
            leftAvatar={<Avatar>{convo.recipient[0]}</Avatar>}
            primaryText={convo.recipient}
            secondaryText={convo.lastMessage}
          />
        ))}
      </List>
    )
  }
}

export default ConversationsPage
