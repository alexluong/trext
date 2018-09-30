import React from "react"
import { Link } from "react-router-dom"
import { Drawer, Toolbar, Button } from "react-md"
import { Toggle } from "react-powerplug"

const Nav = ({ onClick }) => (
  <Button
    icon
    onClick={onClick}
    className="md-btn--toolbar md-toolbar--action-left"
  >
    menu
  </Button>
)

const AppLayout = ({ showRightIcon, title, children }) => (
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
        />

        {children}
      </div>
    )}
  </Toggle>
)

AppLayout.defaultProps = {
  showRightIcon: false,
}

export default AppLayout

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
    to: "chat",
  },
]
