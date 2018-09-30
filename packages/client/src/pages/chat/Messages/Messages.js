import React from "react"
import AppLayout from "components/AppLayout"
import MessageList from "./components/MessageList"
import MessageForm from "./components/MessageForm"
import "./Messages.css"

class MessagesPage extends React.Component {
  render() {
    return (
      <AppLayout title={this.props.match.params.id}>
        <div className="messages">
          <MessageList
            messages={this.props.location.state.conversation.messages}
          />
          <MessageForm conversation={this.props.location.state.conversation} />
        </div>
      </AppLayout>
    )
  }
}

export default MessagesPage
