import "../App.css"
import {useState} from "react";
import {supabase} from "../client.js"
import {Link} from "react-router-dom";

const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName: "",
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
            await supabase.auth.signUp(
                {
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: {
                            full_name: formData.fullName
                        }
                    }
                }
            )
            alert("successfully create account")
        } catch (error){
            alert(error)
        }
    }

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Fullname" name="fullName" onChange={handleChange}/>
                <input type="text" placeholder="Email" name="email" onChange={handleChange}/>
                <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
                <button>Submit</button>
            </form>
            <p>Already have an account? <Link to="/">Login</Link></p>
        </div>
    );
};

export default SignUp;