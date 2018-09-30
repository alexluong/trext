import React from "react"
import AppLayout from "components/AppLayout"
import { SelectField, SelectionControlGroup } from "react-md"

const OBJECT_ITEMS = [
  {
    label: "Apples",
    value: "A",
  },
  {
    label: "Bananas",
    value: "B",
  },
  {
    label: "Cherries",
    value: "C",
  },
  {
    label: "Durian",
    value: "D",
  },
  {
    label: "Elderberry",
    value: "E",
  },
]

const Settings = () => (
  <AppLayout title="Settings">
    <SelectField
      id="select-field-3"
      label="Select Your Language"
      placeholder="Placeholder"
      className="md-cell"
      position={SelectField.Positions.BELOW}
      menuItems={OBJECT_ITEMS}
    />

    <SelectionControlGroup
      id="selection-control-group-radios"
      name="radio-example"
      type="radio"
      defaultValue="A"
      controls={[
        {
          label: "Show translation only.",
          value: "A",
        },
        {
          label: "Show translation and original text",
          value: "B",
        },
      ]}
    />
  </AppLayout>
)
export default Settings
