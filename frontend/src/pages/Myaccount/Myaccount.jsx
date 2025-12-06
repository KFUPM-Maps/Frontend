import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../AuthLogic/AuthContext";
import { usePopup } from "../../components/Popup/PopupContext";
import {
  getUpdateAccountRequest,
  putUpdateAccountRequest,
  uploadProfilePhoto,
} from "../../api/account";

export default function Myaccount() {
  const { user, updateUser } = useContext(AuthContext);
  const popup = usePopup();

  // Prefill from context if available
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [photoUrl, setPhotoUrl] = useState(user?.picture ?? "");
  const fileInputRef = useRef(null);

  useEffect(() => {
    setFirstName(user?.firstName ?? "");
    setLastName(user?.lastName ?? "");
    setPhotoUrl(user?.picture ?? "");
  }, [user]);

  const onChoosePhoto = () => fileInputRef.current?.click();

  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setPhotoUrl(url);
    popup.showSuccess?.("Photo selected.");
  };

  const onSave = (e) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      popup.showError?.("Please fill in both first and last name.");
      return;
    }
    const fetchData = async () => {
      if (fileInputRef.current?.files?.length === 0) {
        let res = await putUpdateAccountRequest({ firstName, lastName });
        if (res.success) {
          updateUser(res.data.user);
          popup.showSuccess("Account updated successfully.");
        }
        else {
          popup.showError("Request failed: " + res.error);
        }
        return;
      }

      let res = await getUpdateAccountRequest();
      if (res.success) {
        let photoRes = await uploadProfilePhoto(
          fileInputRef.current.files[0],
          res.data.presignedUrl
        );
        if (photoRes.success) {
          let putRes = await putUpdateAccountRequest({
            firstName,
            lastName,
            Key: photoRes.data.Key,
          });
          if (putRes.success) {
            updateUser(putRes.data.user);
            popup.showSuccess("Account updated successfully.");
          } else {
            popup.showError("Request failed: " + putRes.error);
          }
        } else {
          popup.showError("Photo upload failed: " + photoRes.error);
        }
      } 
      else {
        popup.showError("Request failed: " + res.error);
      }
    };
    fetchData();
  };

  return (
    <div className="flex items-center justify-center h-full">
      <section className="w-3/4 md:max-w-xl bg-linear-to-t from-bg to-bg-light border border-border rounded-2xl shadow p-6 md:p-8">
        <h1 className="text-3xl mb-6 text-center">My Account</h1>

        <div className="flex self-start items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-bg-light border border-border flex items-center justify-center overflow-hidden">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="material-symbols-rounded text-5xl text-text-muted">
                account_circle
              </span>
            )}
          </div>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onFileChange}
            />
            <button
              type="button"
              onClick={onChoosePhoto}
              className="inline-flex items-center gap-2 bg-primary hover:bg-secondary text-text px-3 py-2 rounded-lg border border-border-muted"
            >
              <span className="material-symbols-rounded text-xl leading-none">
                upload
              </span>
              <span>Update Photo</span>
            </button>
          </div>
        </div>

        <form onSubmit={onSave} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName" className="text-sm text-text">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-bg-light text-text border border-border rounded-lg px-3 py-2 outline-none focus:border-highlight"
              placeholder="First Name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="lastName" className="text-sm text-text">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-bg-light text-text border border-border rounded-lg px-3 py-2 outline-none focus:border-highlight"
              placeholder="Last Name"
            />
          </div>

          <div className="pt-2 text-center">
            <button
              type="submit"
              className="bg-success hover:bg-secondary text-text font-medium px-6 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
