import Login from "./Login";
import Welcome from "./WelcomeComponent";
import Logout from "./LogoutComponent";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import ErrorComponent from "./ErrorComponent";
import ListTodosComponent from "./ListTodosComponent";
import Header from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import AuthProvider, {useAuth} from "./security/AuthContext";
import TodoComponent from "./TodoComponent";

function AuthenticatedRoute({children}){
    let authContext = useAuth();
    if(authContext.isAuthenticated) return children
    return <Navigate to="/"/>
}
function TodoApp(){
    return (
            <div className="TodoApp">
                <AuthProvider>
                    <BrowserRouter>
                        <Header/>
                        <Routes>
                            <Route path="/" element={ <Login/> }/>
                            <Route path="/login" element={ <Login/> }/>

                            <Route path="/welcome" element={
                                <AuthenticatedRoute>
                                    <Welcome/>
                                </AuthenticatedRoute>
                            }/>

                            <Route path="/todos" element={
                                <AuthenticatedRoute>
                                    <ListTodosComponent/>
                                </AuthenticatedRoute>
                            }/>

                            <Route path="/todo/:id" element={
                                <AuthenticatedRoute>
                                    <TodoComponent/>
                                </AuthenticatedRoute>
                            }/>

                            <Route path="/logout" element={
                            <AuthenticatedRoute>
                                <Logout/>
                            </AuthenticatedRoute>
                            }/>

                            <Route path="*" element={ <ErrorComponent/> }/>
                        </Routes>
                        <FooterComponent/>
                    </BrowserRouter>
                </AuthProvider>
            </div>
    )
}




export default TodoApp;