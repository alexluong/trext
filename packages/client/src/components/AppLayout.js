import React from "react"
import { Link } from "react-router-dom"
import { Drawer, Toolbar, Button } from "react-md"
import { Toggle } from "react-powerplug"
import { withUser } from "contexts/User"

const Nav = ({ onClick }) => (
  <Button
    icon
    onClick={onClick}
    className="md-btn--toolbar md-toolbar--action-left"
  >
    menu
  </Button>
)

const AppLayout = ({ user, showRightIcon, title, children }) =>
  console.log(user) || (
    <Toggle>
      {({ on, toggle }) => (
        <div
          style={{
            display: "grid",
            gridTemplateRows: "56px auto",
            height: "100%",
          }}
        >
          <Toolbar
            colored
            nav={<Nav onClick={toggle} />}
            title={title}
            actions={
              showRightIcon ? (
                <Button component={Link} icon to="/chat/new">
                  note_add
                </Button>
              ) : null
            }
          />

          <Drawer
            type={Drawer.DrawerTypes.TEMPORARY}
            visible={on}
            onVisibilityChange={toggle}
            navItems={navItems}
            header={
              user ? (
                <div
                  style={{
                    width: "100%",
                    padding: "2rem",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <p>
                    <u>Name:</u> {user.fullName}
                  </p>
                  <p>
                    <u>Twilio Number:</u> {user.twilioNumber}
                  </p>
                </div>
              ) : null
            }
          />

          {children}
        </div>
      )}
    </Toggle>
  )

AppLayout.defaultProps = {
  showRightIcon: false,
}

export default withUser(AppLayout)

const navItems = [
  {
    primaryText: "Conversations",
    component: Link,
    to: "/chat",
  },
  {
    primaryText: "Settings",
    component: Link,
    to: "/settings",
  },
  {
    primaryText: "Sign Out",
    component: Link,
    to: "/sign-out",
  },
]
