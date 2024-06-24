import {useState} from 'react';
import {supabase} from "../client.js";
import {Link, useNavigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Login = ({setToken}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    function handleChange(e) {
        setFormData((prevFormDate) => {
            return {
                ...prevFormDate,
                [e.target.name]: e.target.value
            }
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const {data, error} = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            })
            if (error) throw error
            setToken(data)
            localStorage.setItem("isLogin", "true")
            navigate("/home")
        } catch (error){
            alert(error)
        }
    }

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Email" name="email" onChange={handleChange}/>
                <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
                <button>Submit</button>
            </form>
            <p>Do not have an account yet? <Link to="/signup">Sign Up?</Link></p>
        </div>
    );
};

export default Login;