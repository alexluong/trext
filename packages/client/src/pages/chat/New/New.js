import React from "react"
import axios from "axios"
import config from "config"
import languages from "./languages.json"
import { Button, FontIcon, TextField, SelectField } from "react-md"
import AppLayout from "components/AppLayout"
import { withUser } from "contexts/User"
import "./New.css"

const LANGUAGES = Object.keys(languages).reduce((a, v) => {
  a.push({ label: v, value: languages[v] })
  return a
}, [])

class NewChatPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "",
      number: "",
      language: "",
    }
  }

  updateText = e => {
    this.setState({ text: e })
  }

  updateNumber = e => {
    this.setState({ number: e })
  }

  updateLanguage = e => {
    this.setState({ language: e })
  }

  sendMessage = e => {
    e.preventDefault()

    axios.post(`${config.serverUrl}/chat/send`, {
      textBody: this.state.text,
      user: this.props.user.twilioNumber,
      sender: this.state.number,
      senderLanguage: this.state.language,
    })
  }

  render() {
    return (
      <AppLayout title="New">
        <div className="new-conv">
          <TextField
            id="phone-number-with-icon-right"
            label="Phone"
            type="tel"
            rightIcon={<FontIcon>phone</FontIcon>}
            size={10}
            fullWidth={false}
            className="item"
            onChange={this.updateNumber}
          />
          <SelectField
            id="select-field-3"
            label="Select Their Language"
            placeholder="Placeholder"
            className="item"
            menuItems={LANGUAGES}
            onChange={this.updateLanguage}
          />
          <form className="item" onSubmit={this.sendMessage}>
            <TextField
              id="message-input"
              label="Text"
              placeholder="type your message here"
              value={this.state.text}
              onChange={this.updateText}
            />
            <Button raised primary type="submit">
              Send
            </Button>
          </form>
        </div>
      </AppLayout>
    )
  }
}

export default withUser(NewChatPage)
