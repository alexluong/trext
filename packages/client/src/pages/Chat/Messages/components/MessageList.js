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
<<<<<<< HEAD
  }

  componentDidMount() {
    this.socket = io("localhost:7340")
    this.socket.on("RECEIVE_MESSAGE", function(data) {
      this.setState({ messages: [...this.state.messages, data] })
    })
  }
  
  componentWillUnmount() {
    this.socket.disconnect()
=======
    this.socket = io("localhost:7340")
    this.socket.on("RECEIVE_MESSAGE", function(data) {
      addMessage(data)
    })

    const addMessage = data => {
      console.log(data)
      this.setState({ messages: [...this.state.messages, data] })
      console.log(this.state.messages)
    }
>>>>>>> c5a564c2365a1ceac38b2c445337ac4606c8eb93
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
