import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../css/AddProduct.css'
import { useParams } from 'react-router-dom'

function User() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [error, setError] = useState('');

    const params = useParams();



    const onsubmit = async () => {
        console.log(name, email, phone, gender);
        let result = await fetch(`https://helo-on-her-hair-api.onrender.com/v1/user`, {
            method: 'POST',
            body: JSON.stringify({ name, email, phone, gender }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json(name, email, phone, gender);
        console.log(result);

        localStorage.setItem("id", result._id)
        localStorage.setItem("name", result.name)
        localStorage.setItem("email", result.email)
        localStorage.setItem("phone", result.phone)
        localStorage.setItem("gender", result.gender)


        window.location.replace("/");



    }



    useEffect(() => {

        // console.log(params.id);
    }, [])
    return (
        <>
            {/* <Form> */}
            <fieldset className='col-md-8 m-auto dan'>
                {error && <h1>{error}</h1>}
                <Form.Group className="mb-3 mt-2">
                    <Form.Label htmlFor="disabledTextInput">Product Detail</Form.Label>
                    <Form.Control placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 mt-2">
                    <Form.Label htmlFor="disabledTextInput">Product Detail</Form.Label>
                    <Form.Control placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 mt-2">
                    <Form.Label>Product Price</Form.Label>
                    <Form.Control type="number" maxLength={10} placeholder="Enter Phone no." value={phone} onChange={(e) => setPhone(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="disabledTextInput">Product Categori</Form.Label>
                    <Form.Select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option selected>Add Gender</option>
                        <option value="Male" selected>Male</option>
                        <option value="Female">Female</option>
                    </Form.Select>
                </Form.Group>
                <Button type="submit" onClick={onsubmit}>Register</Button>
            </fieldset>
            {/* </Form> */}
        </>
    )
}

export default User;
