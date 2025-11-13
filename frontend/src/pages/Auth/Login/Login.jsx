import { useState, useEffect, useContext } from "react";
import { loginRequest } from "../../../api/auth";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../AuthLogic/AuthContext";

const Login = () => {
    const user = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({
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
        const performLogin = async () => {
            const response = await loginRequest(form.email, form.password);
            if (response.success) {
                user.login(response.data.user, response.data.accessToken);
                navigate("/");
            }
            else {
                alert("Login failed: " + response.error);
            }
        }

        performLogin();
    }
    return (
        <form className="flex flex-col items-center gap-3" onSubmit={(e)=>onFormSubmit(e)}>
            <label className="self-start" htmlFor="email">Email*</label>
            <input className="bg-white shadow" type="email" id="email" name="email" required value={form.email} onChange={(e)=>onFormChange(e)}/>
            <label className="self-start" htmlFor="password">Password*</label>
            <input className="bg-white shadow" type="password" id="password" name="password" required value={form.password} onChange={(e)=>onFormChange(e)}/>
            <button className="bg-white w-1/2 shadow mt-2" type="submit">Login</button>
        </form>
    );
};

export default Login;