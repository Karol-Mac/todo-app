import {Link} from "react-router-dom";
import {useState} from "react";
import {getHelloWorlPathVariable} from "./api/HelloWorldApiService";
import {useAuth} from "./security/AuthContext";

export default function WelcomeComponent(){

    const authContext = useAuth();
    let username = authContext.username

    const [beanMessage, setBeanMessage] = useState(null)

    function callHelloWorldPathVariableRestApi(){
        return getHelloWorlPathVariable(username, authContext.token)
            .then(response=> SuccessfulBeanResponse(response))
            .catch(error => ErrorResponse(error))
    }
    function SuccessfulBeanResponse(response){
        console.log(response)
        setBeanMessage(response.data.message)
    }

    function ErrorResponse(error){
        console.log(error)
    }

    return (
        <div className="WelcomeComponent">
            <h1>Welcome in my Todo App</h1>
            <h3>Hi {username}</h3>
            <div>
                <button>
                    <Link to="/todos"
                          style={{textDecoration: "none", color: "black"}}>
                        Your Todos</Link>
                </button>
            </div>
            <div>
                <button className="btn btn-success m-5"
                        onClick={callHelloWorldPathVariableRestApi}>Call Hello World Bean</button>
            </div>
            <div className="text-info">{beanMessage}</div>

        </div>
    )
}