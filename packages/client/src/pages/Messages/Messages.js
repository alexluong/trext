import React from "react"
import MessageList from "./components/MessageList"
import MessageForm from "./components/MessageForm"

class Messages extends React.Component {
  render() {
    return (
      <div className="Messages">
        <h1>title bar</h1>
        <MessageList />
        <MessageForm />
      </div>
    )
  }
}

export default Messages
