import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();
    const handleonChange = (event) => {
        console.log("value", event.target.value);
        if (event.target.name === "username") {
            setUsername(event.target.value)
        }
        else if (event.target.name === "password") {
            setPassword(event.target.value)
        }

    };
    const handleLogin = () => {
        console.log({ username }, { password });
        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { "Content-Type": "application/JSON" },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        })
            .then((response) => response.json())
            .then(data => {
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    navigate("/products")
                    console.log("the value of token is", localStorage.getItem("token"));
                }

                if (data.message) {
                    localStorage.setItem("errMsg", data.message);
                    setErrorMsg(localStorage.getItem("errMsg"))
                }

                console.log({ data })
            })
        // .catch(error => console.log("error message", error.message))
    };
    return (
        <div>
            <div className="container">
                <div className="login">
                    <h2>Login Form</h2>

                    <div className='form-group'>
                        <label htmlFor="username"> Username</label>
                        <input type="text" name="username" placeholder="Username" required="" onChange={handleonChange} value={username} />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="password"> Password</label>
                        <input type="password" name="password" placeholder="Password" required="" onChange={handleonChange} value={password} />
                    </div>

                    <button className='btn' onClick={handleLogin}>Login</button>
                    <p className="text-error">{errorMsg}</p>
                </div>
            </div>
        </div>

    )
}

export default Login;

