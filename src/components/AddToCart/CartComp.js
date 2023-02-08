import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../css/KochoComp.css'
function CartComp(props) {
    const auth = localStorage.getItem('token');
    const [carts, setCarts] = useState([]);
    const [item, setItem] = useState([]);
    console.log(props);



    return (
        <>

            <div className="col-md-3 p-3">
                <Card bsPrefix className='cards'>

                    <NavLink exact to={`/DetailProjectComp/${props.id}`} bsPrefix className="navlink">
                        <Card.Img variant="top" src={props.productImage} className="img w-100" bsPrefix />
                    </NavLink>

                    <Card.Body>
                        <Card.Title className="title" style={{ width: "108%" }}>{props.productDetail} and {props.productCategori}</Card.Title>
                        <Card.Text className="price">Rs. {props.productPrice}</Card.Text>
                        {auth ? <Button variant="dark" onClick={() => {
                            fetch(`https://helo-on-her-hair-api.onrender.com/v1/user/deletecart/${props.id}`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            })
                                .then(res => res.json())
                            // window.location.replace("/")
                            window.location.replace("/cart");
                        }}>Delete</Button> : <Button variant="dark" onClick={ds}>Add To Cart</Button>}

                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default KochoComp;