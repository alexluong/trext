import React from "react"
import { stringify } from "querystring"

const UserContext = React.createContext({})

class UserProvider extends React.Component {
  state = {
    user: this.getUserFromLS(),
  }

  getUserFromLS() {
    const user = localStorage.getItem("user")
    if (user === null) {
      return undefined
    }
    return JSON.parse(user)
  }

  setUser = user => {
    localStorage.setItem("user", JSON.stringify(user))
    this.setState({ user })
  }

  render() {
    const { user } = this.state

    return (
      <UserContext.Provider value={{ user, setUser: this.setUser }}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

const withUser = Component => props => (
  <UserContext.Consumer>
    {userProps => <Component {...props} {...userProps} />}
  </UserContext.Consumer>
)

export { UserProvider, withUser }
export default UserContext
