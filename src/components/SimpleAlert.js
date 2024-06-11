import * as React from "react";
import Alert from "@mui/material/Alert";
// import CheckIcon from "@mui/icons-material/Check";

export default function SimpleAlert() {
  return (
    <Alert style={{ margin: "0.75em" }} severity="error">
      Please enter a valid name
    </Alert>
  );
}
