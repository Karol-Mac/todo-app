import {useEffect, useState} from "react";
import {deleteTodoApi, getTodosForUserApi} from "./api/TodoApiService";
import {useAuth} from "./security/AuthContext";
import {useNavigate} from "react-router-dom";

function ListTodosComponent(){
    const authContext = useAuth();
    const username = authContext.username

    const [todos, setTodos] = useState([])
    const [message, setMessage] = useState(null)

    const navigate = useNavigate()

    useEffect(
        () => refreshTodos()
    )

    function refreshTodos(){
        getTodosForUserApi(username)
            .then(
                response => {
                    setTodos(response.data )
                }
            )
            .catch(error => console.log(error))
    }

    function deleteTodo(id){
        console.log(id + " clicked")
        deleteTodoApi(username, id)
            .then(
                () => {
                    setMessage(`Delete of todo with id = ${id} seccesful`)
                    refreshTodos()
                }
            )
            .catch(error => console.log(error))

    }

    function updateTodo(id){
        console.log(`Todo with id = ${id} clicked`)
        navigate(`/todo/${id}`)
    }

    function addNewTodo(){
        navigate(`/todo/-1`)
    }


    return (
        <div className="container">
            <h1>Things You Want To Do!</h1>
            {message && <div className="alert alert-danger">{message}</div>}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Is done?</th>
                            <th>Target date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(todo => (
                            <tr key={todo.id}>
                                <td>{todo.description}</td>
                                <td>{todo.done.toString() }</td>
                                <td>{todo.targetDate.toString()}</td>
                                <td>
                                    <button className="btn btn-danger"
                                            onClick={() => deleteTodo(todo.id)}>
                                        Delete</button>
                                </td>
                                <td>
                                    <button className="btn btn-success"
                                            onClick={() => updateTodo(todo.id)}>
                                        Update</button>
                                </td>
                            </tr>
                            )
                        )
                    }
                    </tbody>
                </table>
            </div>

            <div>
                <button className="btn mt-4 btn-primary" onClick={() => addNewTodo()}>Add new Todo</button>
            </div>
        </div>
    )
}

export default ListTodosComponent;