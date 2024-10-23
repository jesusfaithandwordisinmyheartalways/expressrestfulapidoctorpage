

import React from 'react'
import { useState } from 'react';
import '../components/userlogin/userlogin.css'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


 interface LoginData {
     headline:string;
     summary:string;
     caption:string;
 }
 
  const PageLogin:LoginData = {
    headline: 'Doctor, Susan Tangle',
    summary: 'The Family Practice that will help you achieve great health results',
    caption: 'Tangle Family Clinic'
  }


const Login:React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setUserConfirmPassword] = useState('');
  const [email, setUserEmail] = useState('');
  const [message, setMessage] = useState('');
  const [userProfile, setUserProfile] = useState<{username: string; email: string} | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    document.body.classList.add('login-background')
    return () => {
      document.body.classList.remove('login-background')
    }
  }, [])

  useEffect(() => { 
      window.onload = function() {
        document.getElementById('inputLogin')?.focus()
      }
  }, [])



      const RegisterUserProfile = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
           try {
            const response = await fetch('http://localhost:9001/register',{
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              credentials: 'include',
              body: JSON.stringify({ username, password, confirmPassword, email }),
            });
              const userData =  await response.json();
              if(response.ok) {
                setMessage(userData.message)
                navigate('/landpage')
              } else{
                 setMessage(userData.error)
              }
           }catch(error) {
              setMessage('Registration failed')
           }
      } 


      const UserLogin = async () => {
          try {
              const response = await fetch('http://localhost:9001/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({ username, email })
              });
                const userData = await  response.json();
                setMessage(userData.message || userData.error)
          }catch(error) {
                setMessage('User is unable to Login: try again')
          }
      }


      const GetUserLoginProfile = async () => {
            try {
                const response = await fetch('http://localhost:9001/profile', {
                   method: 'GET',
                   credentials: 'include',
                });
                  const userData = await  response.json();
                  if(userData.error) {
                    setMessage(userData.error)
                  } else {
                    setUserProfile(userData)
                  }
            }catch(error) {
                  setMessage('Unable to retrieve user profile')
            }
      }


      const UserProfileUpdate = async () => {
          try {
              const response = await fetch('http://localhost:9001/profile',{
                  method: 'PUT',
                  headers: {'Content-Type': 'application/json'},
                  credentials: 'include',
                  body: JSON.stringify({ username, password, confirmPassword, email })
              });
                  const userData = await  response.json()
                  setMessage(userData.message || userData.error)
            }catch(error) {
                  setMessage('Failed to update profile')
          }
      }


      const DeleteUserProfile = async ()=> {
            try {
              const response = await fetch('http://localhost:9001/profile', {
                method: 'DELETE',
                credentials: 'include',
              });
                const userData = await response.json();
                setMessage(userData.message || userData.error)
            }catch(error) {
                  setMessage('Failed to delete user profile')
            }
      }
  

       return (
        <>


        <div className='Title-Container'>
          <div className='Title-Wrapper'>
              { <div className='headline'><h3>{PageLogin.headline}</h3></div> }
              {  <div className='headline-two'><p>{PageLogin.summary}</p></div> } 
              { <div className='headline-three'><p>{PageLogin.caption}</p></div> }

          </div>
        </div>

             
             
             
             
             
              <div className='Form-Container' >
                <div className='Form-Wrapper'>
                  <form onSubmit={RegisterUserProfile} name='form' id='form-ID'>
                    <div>
                      <label htmlFor='username'>Username:</label>
                        <br />
                      <input onChange={(e) => setUsername(e.target.value)} id='inputLogin' type='text' name='inputLogin' value={username} placeholder='Username' required></input>
                    </div>
                    <div>
                      <label htmlFor='password'>Password:</label>
                         <br />
                      <input onChange={(e) => setPassword(e.target.value)} type='password' value={password} placeholder='Password' required></input>
                    </div>

                    <div>
                      <label htmlFor='confirm-password'>Confirm Password:</label>
                          <br />
                      <input onChange={(e) => setUserConfirmPassword(e.target.value)} type='password' value={confirmPassword} placeholder='Confirm Password' required></input>
                    </div>

                    <div>
                      <label htmlFor='email'>Email:</label>
                         <br />
                      <input onChange={(e) => setUserEmail(e.target.value)} type='email' value={email} placeholder='Email' required></input>
                    </div>

                     <div><button type='submit'>Register</button></div>

                </form>
                </div>


              </div>
   

                {message && <p> {message} </p>}

                { userProfile && (
                  <div>
                    <h3>Profile</h3> 
                    <p>Username: {userProfile.username} </p>
                    <p>Email: {userProfile.email} </p>
                  </div>
                )}
   
   
        </>
  )
}

export default Login;
