import { KeyboardEvent } from "react";

export const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
  const charCode: number = event.charCode;
  if ((charCode < 48 || charCode > 57) && charCode !== 45) {
    event.preventDefault();
  }
};
