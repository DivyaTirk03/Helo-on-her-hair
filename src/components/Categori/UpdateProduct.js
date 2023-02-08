import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../css/AddProduct.css'
import { useParams } from 'react-router-dom'

function UpdateProduct() {
    const [productDetail, setProductDetail] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCategori, setProductCategori] = useState('');
    const [error, setError] = useState('');

    const params = useParams();

    const getProduct = async () => {
        let result = await fetch(`https://helo-on-her-hair-api.onrender.com/v1/upload/product?id=${params.id}`)
        result = await result.json();
        // console.log(result.data.productCategori);
        setProductDetail(result.data.productDetail)
        setProductPrice(result.data.productPrice)
        setProductCategori(result.data.productCategori)

    }

    const onsubmit = async () => {
        console.log(productDetail, productPrice, productCategori );
        let result = await fetch(`https://helo-on-her-hair-api.onrender.com/v1/upload/updateProduct/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify({ productDetail, productPrice, productCategori }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        window.location.replace("/");

    }



    useEffect(() => {
        getProduct();
        // console.log(params.id);
    }, [])
    return (
        <>
            {/* <Form> */}
            <fieldset className='col-md-8 m-auto dan'>
                {error && <h1>{error}</h1>}
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
                        <option selected disabled >Add Categori</option>
                        <option value="Organza">Organza</option>
                        <option value="Printed">Printed</option>
                        <option value="Double layered Hair bows">Double layered Hair bows</option>
                        <option value="Wristlets">Wristlets</option>
                    </Form.Select>
                </Form.Group>
                <Button type="submit" onClick={onsubmit}>Update Product</Button>
            </fieldset>
            {/* </Form> */}
        </>
    )
}

export default UpdateProduct;