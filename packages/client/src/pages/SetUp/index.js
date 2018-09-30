import React, { Component } from "react"
import { Button, SelectField, TextField, List, ListItem } from "react-md"
import { Grid, Cell } from "react-md"
import { getPhoneNumbers, createUserTwilio } from "actions/twilio"
import { withUser } from "contexts/User"

class SetUp extends Component {
  state = {
    areaCode: "",
    selectedNumber: "",
    selectedLanguage: "",
    numberList: [],
  }

  handleSave = async () => {
    //Tell twilio to save
    try {
      const user = await createUserTwilio(
        document.getElementById("setup-__country_name").value,
        this.state.selectedNumber,
        this.props.user._id,
      )
      console.log(user)
    } catch (error) {
      console.log("handleSave", error)
    }
  }

  onAreaCodeInputChange = value => {
    this.setState({ areaCode: value })
  }

  onAreaCodeClick = async () => {
    try {
      const numbers = await getPhoneNumbers(this.state.areaCode)
      this.setState({ numberList: numbers })
    } catch (error) {
      console.log("onAreaCodeClick", error)
    }
  }

  onNumberListClick = id => {
    this.setState({ selectedNumber: this.state.numberList[id] })
  }

  render() {
    const { selectedNumber, numberList } = this.state
    return (
      <div>
        <h3
          className="md-text-center md-font-bold"
          style={{ marginTop: "35px" }}
        >
          Choose your Twilio Number
        </h3>
        <hr />
        <Grid>
          <Cell size={6} tabletSize={4} phoneSize={2}>
            Select your Language
          </Cell>
          <Cell size={6} tabletSize={4} phoneSize={2}>
            <SelectField id="setup-__country_name" menuItems={COUNTRIES} />
          </Cell>
        </Grid>
        <Grid>
          <Cell size={6} tabletSize={4} phoneSize={2}>
            Type an area Code
          </Cell>
          <Cell size={6} tabletSize={4} phoneSize={2}>
            <TextField
              id="area-code-text"
              label="Area Code"
              type="number"
              maxLength={3}
              onChange={val => this.onAreaCodeInputChange(val)}
            />
          </Cell>
        </Grid>
        <Button raised onClick={() => this.onAreaCodeClick()}>
          Check
        </Button>
        <div>
          <p className="md-text-center">{`Selected Number: ${selectedNumber}`}</p>
          <Grid>
            <List className="md-cell md-paper md-paper--1">
              {numberList.slice(0, 5).map((num, id) => (
                <ListItem
                  key={id}
                  primaryText={num}
                  onClick={() => this.onNumberListClick(id)}
                />
              ))}
            </List>
          </Grid>
        </div>
        <Button raised onClick={() => this.handleSave()}>
          Save
        </Button>
      </div>
    )
  }
}

export default withUser(SetUp)

const COUNTRIES = [
  {
    value: "en",
  },
  {
    value: "ko",
  },
  {
    value: "es",
  },
  {
    value: "vi",
  },
]

// <SelectField
//             id="1"
//             menuItems={nums}
//             onChange={number => this.onNumberListClick(number)}
//           />
