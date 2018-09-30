import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
// Pages
import HomePage from "pages/Home"
import SignInPage from "pages/auth/SignIn"
import SignUpPage from "pages/auth/SignUp"
import NotFoundPage from "pages/NotFound"
import ConversationsPage from "pages/Chat/Conversations"
import MessagesPage from "pages/Chat/Messages"
import SettingsPage from "pages/Settings"

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/sign-in" component={SignInPage} />
      <Route path="/sign-up" component={SignUpPage} />
      <Route path="/chat/:id" component={MessagesPage} />
      <Route path="/chat" component={ConversationsPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
)

export default Routes
