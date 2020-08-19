import React, { useState } from 'react';
import * as yup from 'yup';
import styled from 'styled-components';

let fromSchema = yup.object().shape({
    name:yup.string().required('Name is required'),
    email: yup.string().email().required('email is required'),
    password: yup.string().required('password is required'),
    terms: yup.boolean().oneOf([true], 'AGREE')
})

export default function Form() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        terms: "" 
    });

    const [error, setError] = useState({
        name: "",
        email: "",
        password: "",
        terms: "" 
    })

    const formSubmit = (event) => {
        event.preventDefault()
    }

    const validate = (event) => {
        yup.reach(fromSchema, event.target.name).validate(event.target.value)
        .then(valid => {
            setError({...error, [event.target.name]: "" })
        })
    }

    const inputChange = (event) => {
        event.persist()
        validate(event)
        let value = event.target.type === 'chackbox' ? event.target.checked: event.target.value
        setForm({...form, [event.target.name]: value})
    }

    return (
        <StyleForm className = "form" onSubmit = {formSubmit}>

            <label htmlFor = "name"> Name: </label>
            <input id ="name" name="name" type ="text" value={form.name} onChange={inputChange}/>
            <label htmlFor="email">Email: {error.email.length > 0 ? <p className="error">{error.email}</p> : null}</label>
            <input id="email" name="email" type="email" value={form.email} onChange={inputChange} />
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" value={form.password} onChange={inputChange} />
            <label htmlFor="terms">Terms of Service</label>
             <div className="alignTerms">
                 <input id="terms" type="checkbox" checked={form.terms} name="terms" className="checkBox" onChange={inputChange}  />
            </div>
                 <button type="submit" className="btn">Submit</button>
        </StyleForm>
    );
}

const StyleForm = styled.form`
display:flex;
flex-direction:column;
justify-content:space-evenly;
align-items:center;
color:darkgreen;
font-size:2rem;
font-weight:bold;
label{
    padding: 10px 0px;
}
button{
    margin: 10px 0px;
    color:seagreen;
    border-color:darkgreen;
    background:lightgreen;
    padding:10px;
    border-radius:30px;
    font-size:20px;

    :hover{
        background:pink;
        color:hotpink;
        border-color:hotpink;
    }
}
input:focus{
    background:lightsalmon;
}
`;
