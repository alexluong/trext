import React from "react"
import AppLayout from "components/AppLayout"
import { Avatar, List, ListItem, FontIcon } from "react-md"
import io from "socket.io-client"
import { withUser } from "contexts/User"
import { getConversations } from "actions/chat"

class ConversationsPage extends React.Component {
  state = { conversations: [], error: "" }

  async componentDidMount() {
    this.socket = io("http://localhost:8000")
    this.socket.on("stuff", function(data) {
      console.log("update conversations list")
    })

    try {
      console.log(this.props.user)
      const conversations = await getConversations(this.props.user.twilioNumber)
      console.log(conversations)
      this.setState({ conversations })
    } catch (error) {
      this.setState({ error })
    }
  }

  componentWillUnmount() {
    this.socket.disconnect()
  }

  render() {
    const { conversations } = this.state

    return (
      <AppLayout title="Conversations" showRightIcon>
        <List>
          {conversations.length > 0 ? (
            conversations.map(convo => (
              <ListItem
                key={convo._id}
                leftAvatar={<Avatar icon={<FontIcon>person</FontIcon>} />}
                primaryText={convo.sender}
                secondaryText={convo.messages[0].translation}
                onClick={() => {
                  this.props.history.push(`/chat/${convo.sender}`)
                }}
              />
            ))
          ) : (
            <p>There's no conversation.</p>
          )}
        </List>
      </AppLayout>
    )
  }
}

export default withUser(ConversationsPage)
