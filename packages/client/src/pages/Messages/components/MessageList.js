import React from "react"
import { List, ListItem } from "react-md"

class MessageList extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {
      		messages : [
      			{"id":0,"user":"me","body":"hi"},
      			{"id":1,"user":"me","body":"hello"},
      			{"id":2,"user":"me","body":"bye"}
      		]
    	};
  }

	render() {
		return (
          <List>
            {this.state.messages.map(msg => (
              <ListItem key={msg.id} primaryText={msg.body}/>
            ))}
          </List>
		)
	}
}

export default MessageList
