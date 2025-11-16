import { usePopup } from "../../components/Popup/PopupContext";

export default function Myaccount() {
  const popup = usePopup(); //custome hook which returns useContext(PopupContext)

  popup.showSuccess("Welcome to your account page!");
  popup.showError("This is an error message.");
  popup.showConfirm("Do you want to proceed?"); //Promise

  return <div className="">my account</div>;
}
