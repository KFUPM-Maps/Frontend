import { createContext, useContext } from "react";

export const PopupContext = createContext(null);

export function usePopup() {
  return useContext(PopupContext);
}
