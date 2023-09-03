import {useNavigate, useParams} from "react-router-dom";
import {createTodoApi, retriveTodoApi, updateTodoApi} from "./api/TodoApiService";
import {useAuth} from "./security/AuthContext";
import {useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import moment from "moment";

export default function TodoComponent(){

    const {id} = useParams()



    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')

    const navigate = useNavigate()
    const authContext = useAuth();

    const username = authContext.username

    useEffect( () => retriveTodos())

    function retriveTodos(){

        if(id != -1) {
            retriveTodoApi(username, id)
                .then(response => {
                    setDescription(response.data.description)
                    setTargetDate(response.data.targetDate)
                })
                .catch(error => console.log(error))
        }
    }

    function onSubmit(values){
        console.log(values)
        let todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }

        console.log(todo)

        if(id == -1){
            createTodoApi(username, todo)
                .then(navigate("/todos"))
                .catch(error => console.log(error))
        }
        else {
            updateTodoApi(username, id, todo)
                .then(navigate("/todos"))
                .catch(error => console.log(error))
        }
    }

    function validate(values){
        let errors = {}
        let targetYear = values.targetDate.slice(0, 4);
        let targetMonth = values.targetDate.slice(5, 7);
        let targetDay = values.targetDate.slice(8, 10);

        let today = new Date()

        if(values.description.length < 5)
            errors.description = "enter at least 5 characters"

        if(parseInt(targetYear) < parseInt(today.getFullYear()) || values.targetDate == null ||
            values.targetDate ==="" || !moment(values.targetDate).isValid() )
            errors.targetDate = "target date has to be in future"

        if(parseInt(targetYear) === parseInt(today.getFullYear())){
            if (parseInt(targetMonth) < parseInt(today.getMonth()+1))
                errors.targetDate = "target date has to be in future"
            if (parseInt(targetMonth) === parseInt(today.getMonth()+1)){
                if(parseInt(targetDay) <= parseInt(today.getDate()))
                    errors.targetDate = "target date has to be in future"
            }
        }

        return errors
    }

    return (
        <div className="container">
            <h1 className="h1 accordion-header">Enter Todo Details</h1>
            <div>
                {/*Formik isn't reinitialized automaticly,*/}
                {/*so initial Values are default values from useStatae()*/}
                {/*TO change that: enableReinitialize={true}*/}
                <Formik
                    initialValues={ { description, targetDate} }
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnChange={false}
                    validateOnBlur={false}
                >

                    {
                        (props) =>(
                            <Form>
                                <ErrorMessage name="description"
                                      component="div"
                                      className="alert alert-warning"/>

                                <ErrorMessage name="targetDate"
                                      component="div"
                                      className="alert alert-warning"/>

                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control"
                                           name="description"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control"
                                           name="targetDate"/>
                                </fieldset>
                                <div>
                                    <button type="submit" className="btn btn-success m-5"
                                    >Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}