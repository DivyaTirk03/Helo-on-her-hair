import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../css/KochoComp.css'
function KochoComp(props) {
    const auth = localStorage.getItem('token');
    const [carts, setCarts] = useState([]);
    const [item, setItem] = useState([]);
    // console.log(props);
    let auth1 = localStorage.getItem("id");
    let productImage = props.productImage;
    let productDetail = props.productDetail;
    let productCategori = props.productCategori;
    let productPrice = props.productPrice;
    let postedBy = auth1;

    let result
    const uploadcart = () => {
        result = fetch('https://helo-on-her-hair-api.onrender.com/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productCategori, productDetail, productImage, productPrice, postedBy })
        }).then(res => res.json()).then(
            data => {
                console.log(data);
                if (data.error) {
                    alert(data.error)
                    // alert("Select the Category");
                } else {
                    // navigation.navigate('Home');
                    alert("Added to cart");
                    window.location.replace("/Cart");

                }
            }
        )

        console.log(props.productImage);
        console.log(props.productDetail);
        console.log(props.productCategori);
        console.log(props.productPrice);
        console.log(auth1);


    }

    const ds = () => {
        // let pre = localStorage.getItem("Cart");
        // localStorage.setItem("Cart", JSON.stringify(props.id + pre));
        if (!auth1) {
            window.location.replace("/User");
        } else {
            console.log("hii");
            uploadcart();

        }

    }

    return (
        <>

            <div className="col-md-3 p-3">
                <Card bsPrefix className='cards'>

                    {/* <NavLink exact to={`/DetailProjectComp/${props.id}`} bsPrefix className="navlink"> */}
                    <Card.Img variant="top" src={props.productImage} className="img w-100" bsPrefix />
                    {/* </NavLink> */}

                    <Card.Body>
                        <Card.Title className="title" style={{ width: "108%" }}>{props.productDetail} and {props.productCategori}</Card.Title>
                        <Card.Text className="price">Rs. {props.productPrice}</Card.Text>
                        {auth ? <><Button variant="dark" onClick={() => {
                            fetch(`https://helo-on-her-hair-api.onrender.com/v1/upload/delete/${props.id}`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                                .then(res => res.json().then(
                                    async task => {
                                        console.log(task);
                                        if (task.success == false) {
                                            alert("Error")
                                        } else {
                                            window.location.replace("/")

                                        }

                                    }))
                        }}>Delete</Button>
                            <NavLink exact to={`/UpdateProduct/${props.id}`} className="add-to-cart">
                                <Button variant="dark" style={{ marginLeft: "40px" }}>Edit</Button>
                            </NavLink>
                        </> : <Button variant="dark" onClick={ds}>Add To Cart</Button>}

                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default KochoComp;
