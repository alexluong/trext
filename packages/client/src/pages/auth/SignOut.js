import React from "react"
import { withUser } from "contexts/User"

class SignOutPage extends React.Component {
  componentDidMount() {
    this.props.setUser(null)
    localStorage.clear()
  }

  render() {
    return <p>We're sad to see you go. Come back soon :(</p>
  }
}

export default withUser(SignOutPage)
