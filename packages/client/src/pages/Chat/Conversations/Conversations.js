import React, { PureComponent } from "react"
import AppLayout from "components/AppLayout"
import Conversations from "../components/Conversations"

class ConversationsPage extends PureComponent {
  render() {
    return (
      <AppLayout title="Conversations">
        <Conversations />
      </AppLayout>
    )
  }
}

export default ConversationsPage
