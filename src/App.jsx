import "./App.css"
import {Routes, Route, useNavigate} from "react-router-dom";
import {Login, SignUp, HomePage} from "./pages"
import {useEffect, useState} from "react";

const App = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(false);

    if(token){
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("isLogin", "false");
    }

    useEffect(() => {
        if(localStorage.getItem("token")){
            let data = JSON.parse(localStorage.getItem("token"));
            setToken(data)
        }
    }, [])

    function signOut() {
        localStorage.removeItem("token");
        localStorage.setItem("isLogin", "false")
        navigate("/");
    }

    return (
        <div>
            <nav>
                <div className="logo">TestApp</div>
                {localStorage.getItem("isLogin") ? <button onClick={signOut}>LogOut</button> : null}
            </nav>
            <Routes>
                <Route path={"/signup"} element={<SignUp/>}/>
                <Route path={"/"} element={<Login setToken={setToken} />} />
                {token ? <Route path={"/home"} element={<HomePage token={token}/>} /> : null}
            </Routes>
        </div>
    );
};

export default App;