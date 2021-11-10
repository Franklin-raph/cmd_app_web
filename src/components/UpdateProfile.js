import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { trackPromise } from 'react-promise-tracker';
import { useHistory } from 'react-router-dom'
import Spinner from './Spinner'
import axios from 'axios'

const phoneRegex = /^\+?\d+$/

const SignUpForm = ( props ) => {

    let userData = props.locaclStorageData;
    userData = JSON.parse(localStorage.getItem("user"))
    console.log(localStorage.getItem('user'))
    const updateUserEndpoint = 'updateUser/'+userData.id;
    console.log(updateUserEndpoint)

    const [emailError, setEmailError] = useState("");
    const historyRoute = useHistory();

    // const [fname, setFname] = useState("");
    // const [lname, setLname] = useState("");
    // const [email, setEmail] = useState("");
    // const [dob, setDob] = useState("");
    // const [phone, setPhone] = useState("");
    // const [github, setGithub] = useState("");
    // const [techtrack, setTechTrack] = useState("");
    // const [linkedIn, setLinkedIn] = useState("");
    // const [imgurl, setImgUrl] = useState("");

    // let updatedValues = {
    //     fname: fname,
    //     lname: lname, 
    //     email: email,
    //     phone: phone, 
    //     techtrack: techtrack,
    //     dob: new Date(),
    //     github: github,
    //     linkedIn: linkedIn,
    //     imgurl: imgurl,
    // }
    
    // const profileUpdate =(e)=>{
    //     e.preventDefault();

    //     axios.put(updateUserEndpoint, updatedValues)
    //         .then(response => {
    //             console.log(response.data)
    //         })
    //     console.log("Form Submitted")
    //     console.log(updatedValues)
    // }

    // useEffect(()=>{
    //    const users = axios.get('https://cmd-backend.herokuapp.com/cmd/users')
    //                         .then(response =>{
    //                             console.log(response.data)
    //                             let allUsers = response.data
    //                             Object.keys(allUsers).forEach(function(key) {
    //                                 const allUsersEmail = allUsers[key].email
    //                                 console.log(allUsersEmail);
    //                               })
    //                         })
    
    // },[])

  return (
    <Formik
      initialValues={{
            fname: '',
            lname: '', 
            email: '',
            phone: '', 
            techTrack:'',
            dob: new Date(),
            github:'',
            linkedIn: '',
            profilePic:'',
        }}

      validationSchema={Yup.object({
        fname: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('This field is Required'),
          lname: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('This field is Required'),
          email: Yup.string()
          .email('Invalid email address')
          .required('Email field is required'),
          phone: Yup.string().matches(phoneRegex, 'Phone number is not valid')
          .required("This field is required"),
          techTrack: Yup.string()
          .required("This field is required"),
          dob: Yup.date()
          .required('This field is required'),
          github: Yup.string()
          .required("This field is required"),
          linkedIn: Yup.string()
          .required("This field is required")
      })}

      onSubmit={(values) => {
        trackPromise(
            axios.put( updateUserEndpoint, values)
                .then(response => {
                        localStorage.setItem('user', JSON.stringify(response.data));
                        historyRoute.push('/OTPEmailUpdatePrompt')
                    }).catch(() => {
                    setEmailError("Email already exist")
                })
                    )
      }}
    >

      <Form>
      <section className="form" style={{ marginTop: '6rem' }}>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="form-row">
                        <div className="col-12 mb-3">
                            <h2>Update Profile</h2>
                        </div>
                        <span className="text-danger">{ emailError }</span>
                    </div>

                    <div className="col-12" id="userReg">
                        <label>First Name</label><br />
                        <Field name="fname" type="text" className="form-control"/>
                        <div className="text-danger">
                            <ErrorMessage name="fname" />
                        </div>
                    </div>

                    <div className="col-12" id="userReg">
                        <label>Last Name</label><br />
                        <Field name="lname" type="text" className="form-control"/>
                        <div className="text-danger">
                            <ErrorMessage name="lname" />
                        </div>
                    </div>

                    <div className="col-12" id="userReg">
                        <label>Date of Birth</label><br />
                        <Field name="dob" type="date" className="form-control"/>
                        <div className="text-danger">
                            <ErrorMessage name="dob" />
                        </div>
                    </div>

                    <div className="col-12" id="emailReg">
                    <label>Email</label><br />
                        <Field name="email" type="email" className="form-control"/>
                        <div className="text-danger">
                            <ErrorMessage name="email" />
                        </div>
                    </div>

                    <div className="col-12" id="emailReg">
                    <label>Phone</label><br />
                        <Field name="phone" type="text" className="form-control"/>
                        <div className="text-danger">
                            <ErrorMessage name="phone" />
                        </div>
                    </div>

                    <div className="col-12" id="emailReg">
                    <label>Tech Track</label><br />
                        <Field name="techTrack" type="text" className="form-control"/>
                        <div className="text-danger">
                            <ErrorMessage name="techTrack" />
                        </div>
                    </div>

                    <div className="col-12" id="emailReg">
                    <label>Github Link</label><br />
                        <Field name="github" type="text" className="form-control"/>
                        <div className="text-danger">
                            <ErrorMessage name="github" />
                        </div>
                    </div>

                    <div className="col-12" id="emailReg">
                    <label>LinkedIn Link</label><br />
                        <Field name="linkedIn" type="text" className="form-control"/>
                        <div className="text-danger">
                            <ErrorMessage name="linkedIn" />
                        </div>
                    </div>

                    <div className="col-12" id="emailReg">
                    <label>Profile Picture</label><br />
                        <Field name="profilePic" type="file" className="form-control"/>
                        <div className="text-danger">
                            <ErrorMessage name="profilePic" />
                        </div>
                    </div>

                    <div className="col-12 text-center" id="signInReg">
                        <input type="submit"  className="btn btn-block my-3" id="registerBtn" value="Update" />
                    </div>
                </div>
            </div>
                <Spinner />
            </div>
        </section>
      </Form>
    </Formik>
  );
};
  
export default SignUpForm;