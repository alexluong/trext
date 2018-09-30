import React from "react"
import AppLayout from "components/AppLayout"
import MessageList from "./components/MessageList"
import MessageForm from "./components/MessageForm"
import "./Messages.css"

class MessagesPage extends React.Component {
  render() {
    return (
      <AppLayout title="some number">
        <div className="messages">
          <MessageList />
          <MessageForm />
        </div>
      </AppLayout>
    )
  }
}

export default MessagesPage
