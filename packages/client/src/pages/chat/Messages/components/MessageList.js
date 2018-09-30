import React from "react"
// import { List, ListItem } from "react-md"
import io from "socket.io-client"
import "./MessageList.css"

class MessageList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [
        { id: 0, user: "u", body: "hi" },
        { id: 1, user: "not u", body: "hello" },
        { id: 2, user: "u", body: "bye" },
      ],
    }
  }

  componentDidMount() {
    this.socket = io("http://localhost:8000")
    this.socket.on("NEW_MESSAGE", message => {
      // this.setState({ messages: [...this.state.messages, data] })
      console.log(message)
    })
  }

  componentWillUnmount() {
    this.socket.disconnect()
  }

  render() {
    return (
      <div className="message-list">
        {this.state.messages.map(msg => (
          <div
            key={msg.id}
            className={`message-list__item ${
              msg.user === "u" ? "message-list__item--user" : ""
            }`}
          >
            <span>{msg.body}</span>
          </div>
        ))}
      </div>
    )
  }
}

export default MessageList