import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../css/AddProduct.css'
import {Redirect} from 'react-router-dom'

function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const onsubmit=()=>{
        setError('')
        setSuccess('')
        console.log(name);
        if (!name) {
            setError("name No. Required")
        } else if (!password) {
            setError("Password Required")
        } else {
            fetch('https://helo-on-her-hair-api.onrender.com/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, password })
            }).then(res => res.json()).then(
                async data => {
                    console.log(data);
                    if (data.success == false) {
                        setError(data.message);
                    } else if (data.success == true) {
                        console.log(data,data.token);
                        // await AsyncStorage.setItem("currentUser", JSON.stringify(data))
                        localStorage.setItem("token",data.token);
                        window.location.replace("/");
                    }
                }
            )
        }
    }

    return (
        <>
            {/* <Form> */}
                <fieldset className='col-md-8 m-auto dan'>
                    <Form.Group className="mb-3 mt-4">
                        <Form.Control placeholder="User Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3 mt-2">
                        <Form.Control type='password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Button type="submit" onClick={onsubmit}>Login</Button>
                </fieldset>
            {/* </Form> */}
        </>
    )
}

export default Login;
