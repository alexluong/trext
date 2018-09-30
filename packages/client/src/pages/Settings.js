import React from "react"
import AppLayout from "components/AppLayout"
import { SelectField } from "react-md"

const OBJECT_ITEMS = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "Russian",
    value: "ru",
  },
  {
    label: "Korean",
    value: "ko",
  },
  {
    label: "Spanish",
    value: "es",
  }
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
  </AppLayout>
)
export default Settings
