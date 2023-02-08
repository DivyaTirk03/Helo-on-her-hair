import { wait } from '@testing-library/user-event/dist/utils';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../css/AddProduct.css'

function AddProduct() {
    const [productDetail, setProductDetail] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCategori, setProductCategori] = useState('');
    // const [productImage, setProductImage] = useState('');
    const [error, setError] = useState('');

    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState("")
    console.log(image);


    const onSubmit = async () => {

        const data = new FormData();
        data.append('file', image)
        data.append('upload_preset', 'Helohair')
        setLoading(true)

        const res = await fetch("https://api.cloudinary.com/v1_1/dbz8cdpis/image/upload", {
            method: 'POST',
            body: data
        })
        const file = await res.json()
        console.log(file.url);
        // setProductImage(file.url)
        console.log(productDetail, productPrice, productCategori, file.url);
        let productImage;
        if (file.url) {
            productImage = file.url;
            console.log("uploaded");
            fetch('https://helo-on-her-hair-api.onrender.com/v1/upload/upload', {
                method: 'POST',
                body: JSON.stringify({ productDetail, productPrice, productCategori, productImage }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json()).then(
                    data => {
                        console.log(data);
                        if (data.error) {
                            setError(data.error);
                            alert(data.error)
                            // alert("Select the Category");
                        } else {
                            // navigation.navigate('Home');
                            alert("Submit successfully");
                            window.location.replace("/");
                        }
                    }
                )

        } else {
            console.log("uploaded");
        }
    }



    return (
        <>
            {/* <Form> */}
            <fieldset className='col-md-8 m-auto dan'>
                {error && <h1 style={{ margin: "50px" }}>{error}</h1>}
                <Form.Group className="mb-3 mt-2">
                    <Form.Label htmlFor="disabledTextInput">Product Detail</Form.Label>
                    <Form.Control placeholder="Product Detail" value={productDetail} onChange={(e) => setProductDetail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 mt-2">
                    <Form.Label>Product Price</Form.Label>
                    <Form.Control type="number" maxLength={10} placeholder="Product Price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="disabledTextInput">Product Categori</Form.Label>
                    <Form.Select value={productCategori} onChange={(e) => setProductCategori(e.target.value)}>
                        <option selected>Add Categori</option>
                        <option value="Organza">Organza</option>
                        <option value="Printed">Printed</option>
                        <option value="Double layered Hair bows">Double layered Hair bows</option>
                        <option value="Wristlets">Wristlets</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Product Image</Form.Label>
                    <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
                </Form.Group>
                <Button type="submit" onClick={onSubmit}>Submit</Button>
            </fieldset>
            {/* </Form> */}
        </>
    )
}

export default AddProduct;