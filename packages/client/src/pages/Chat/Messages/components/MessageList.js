import React from "react"
import { List, ListItem } from "react-md"
import io from "socket.io-client"

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
    this.socket = io("localhost:7340");
    this.socket.on("RECEIVE_MESSAGE", function(data) {
      addMessage(data);
    })
  
  const addMessage = data => {
    console.log(data);
    this.setState({ messages: [...this.state.messages, data] });
    console.log(this.state.messages);
  }

  }

  render() {
    return (
      <List>
        {this.state.messages.map(msg => (
          <ListItem
            key={msg.id}
            primaryText={msg.body}
            secondaryText={msg.user}
          />
        ))}
      </List>
    )
  }
}

export default MessageList
