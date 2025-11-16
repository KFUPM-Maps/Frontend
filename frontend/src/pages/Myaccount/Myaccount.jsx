import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../AuthLogic/AuthContext";
import { usePopup } from "../../components/Popup/PopupContext";

export default function Myaccount() {
  const { user } = useContext(AuthContext) ?? {};
  const popup = usePopup();

  // Prefill from context if available
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [photoUrl, setPhotoUrl] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setFirstName(user?.firstName ?? "");
    setLastName(user?.lastName ?? "");
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
    popup.showSuccess?.("Your changes have been saved.");
  };

  return (
    <div className="w-full h-full flex items-start justify-center p-6 md:p-10 bg-bg-dark text-text">
      <section className="w-full md:max-w-xl bg-bg border border-border rounded-2xl shadow p-6 md:p-8">
        <h1 className="text-3xl font-semibold mb-6 text-center">My Account</h1>

        <div className="flex items-center gap-4 mb-8 justify-center">
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
