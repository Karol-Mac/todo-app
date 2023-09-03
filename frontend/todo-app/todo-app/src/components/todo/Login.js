import "./Login.css"
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./security/AuthContext";
function Login(){

    const [username, setUserUsername] = useState("user")
    const [password, setPassword] = useState("1234")

    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const navigate = useNavigate()

    let authContext = useAuth()

    function changeUserName(event){
        setUserUsername(event.target.value)
    }

    function changePassword(event){
        setPassword(event.target.value)
    }

    async function handleSubmit(){
        if(await authContext.login(username, password)){
            //typically " is enough, but when is needed to use path variable
            // then you have to use `` (not '')
            navigate("/welcome")
        }
        else{
            setShowErrorMessage(true)
        }
    }

    return (
        <div className="Login">
            <h1>Please log-in</h1>
            {showErrorMessage && <div className="ErrorMessage">Authentication Failed.
                                                        PLease check your credentials.</div>}
            <div className="LoginForm">
                    <div>
                        <label>User Name
                            <input type="text" name="username"
                                   defaultValue={username}
                                   onChange={changeUserName}/>
                        </label>
                    </div>
                    <div>
                        <label>Password
                            <input type="password" name="password"
                            defaultValue={password} onChange={changePassword}/>
                        </label>
                    </div>
                    <div>
                        <button type="button" name="login" onClick={handleSubmit}>login</button>
                    </div>
                </div>
        </div>
    )
}

export default Login;