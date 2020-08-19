import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import styled from 'styled-components';

export default function Form() {

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password:"",
    passwordConfirmation:"",
    terms: true
  });


  const [serverError, setServerError] = useState("");


  const [buttonDisabled, setButtonDisabled] = useState(true);



  const [errors, setErrors] = useState({
    name: "", 
    email: "",
    password:"",
    passwordConfirmation:"",
    terms: ""
  });


  const [post, setPost] = useState([]);


  const validateChange = (e) => {


    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.name === "terms" ? e.target.checked : e.target.value) 
      .then((valid) => {

        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
      .catch((err) => {
        console.log(err);


        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        });
      });
  };

  const formSubmit = (e) => {
    e.preventDefault(); 
    console.log("form submitted!");


    axios
      .post("https://reqres.in/api/users", formState)
      .then((res) => {
        console.log("success!", res.data);

        setPost(res.data);


        setServerError(null); 


        setFormState({
          name: "",
          email: "",
          password:"",
          passwordConfirmation:"",
          terms: true
        });
      })
      .catch((err) => {

        setServerError("oops! something happened!");
      });
  };


  const inputChange = (e) => {

    e.persist(); 
    console.log("input changed!", e.target.value);
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    };

    validateChange(e); 
    setFormState(newFormData); 
  };


  const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"), 
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Must include an email"), 

      password: yup
      .string()
      .required('Password is required'),

     passwordConfirmation: yup
     .string()
     .oneOf([yup.ref('password'), null], 'Passwords must match'),

    terms: yup.boolean().oneOf([true], "Please agree to T&Cs")
  });


  useEffect(() => {
    formSchema.isValid(formState).then((isValid) => {

      setButtonDisabled(!isValid); 
    });
  }, [formState]);

  return (
    <StyleForm onSubmit={formSubmit}>
      {serverError ? <p className="error">{serverError}</p> : null}

      <label htmlFor="name">
        Name:
        <input
          id="name"
          type="text"
          name="name"
          value={formState.name}
          onChange={inputChange}
        />
        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      </label>
      <label htmlFor="email">
        Email:
        <input
          id="email"
          type="text"
          name="email"
          value={formState.email}
          onChange={inputChange}
        />
        {errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null}
      </label>

      <label htmlFor="password" className="password">
          Password:
          <input
          type="string"
          id="password"
          name="password"
          value={formState.password}
          onChange={inputChange}
          />
      </label>
      <label htmlFor="passwordConfirmation" className="passwordConfirmation">
          Confirm Password:
          <input
          type="string"
          id="passwordConfirmation"
          name="passwordConfirmation"
          value={formState.passwordConfirmation}
          onChange={inputChange}
          />
      </label>

      <label htmlFor="terms" className="terms">
        <input
          type="checkbox"
          id="terms"
          name="terms"
          checked={formState.terms}
          onChange={inputChange}
        />
        Terms and Conditions:
        {errors.terms.length > 0 ? (
          <p className="error">{errors.terms}</p>
        ) : null}
      </label>
      <button disabled={buttonDisabled} type="submit">
        Submit
      </button>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </StyleForm>
  );
}


const StyleForm = styled.form`
display:flex;
flex-direction:column;
justify-content:space-around;
align-items:center;
color:darkgreen;
font-size:2rem;
font-weight:bold;
label{
    padding: 10px 0px;
}
input{
   margin-left: 20px;
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
