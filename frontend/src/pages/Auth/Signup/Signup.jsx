import { useState, useContext } from "react";
import { AuthContext } from "../../../AuthLogic/AuthContext";
import { useNavigate } from "react-router";
import { signupRequest } from "../../../api/auth";
import { usePopup } from "../../../components/Popup/PopupContext";

const Signup = () => {
    const user = useContext(AuthContext);
    const popup = usePopup();

    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const onFormChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const performSignup = async () => {
            const response = await signupRequest(form.firstName, form.lastName, form.email, form.password);
            if (response.success) {
                user.login(response.data.user, response.data.accessToken);
                popup.showSuccess("Signup successful!");
                navigate("/");
            }
            else {
                popup.showError("Signup failed: " + response.error);
            }
        }

        performSignup();
    }

    return (
        <form className="flex flex-col items-start md:items-center gap-2 w-full" onSubmit={(e)=>onFormSubmit(e)}>
            <label className="text-text md:self-start" htmlFor="firstName">First Name*</label>
            <input className="bg-bg-light text-text border border-border-muted p-1 w-full" type="text" id="firstName" name="firstName" required value={form.firstName} onChange={(e)=>onFormChange(e)}/>
            <label className="text-text md:self-start" htmlFor="lastName">Last Name*</label>
            <input className="bg-bg-light text-text border border-border-muted p-1 w-full" type="text" id="lastName" name="lastName" required value={form.lastName} onChange={(e)=>onFormChange(e)}/>
            <label className="text-text md:self-start" htmlFor="email">Email*</label>
            <input className="bg-bg-light text-text border border-border-muted p-1 w-full" type="email" id="email" name="email" required value={form.email} onChange={(e)=>onFormChange(e)}/>
            <label className="text-text md:self-start" htmlFor="password">Password*</label>
            <input className="bg-bg-light text-text border border-border-muted p-1 w-full" type="password" id="password" name="password" required value={form.password} onChange={(e)=>onFormChange(e)}/>
            <button className="self-center bg-primary hover:bg-secondary rounded py-2 px-4 mt-2" type="submit">Sign up</button>
        </form>
    );
};

export default Signup;