import React, { useState, useEffect } from 'react'
import KochoComp from '../KochoComp';
import '../../css/Kocho.css'
import GetCartComp from './GetCartComp';
import { Button } from 'react-bootstrap';


function GetCart() {
    const [itemno, setItemno] = useState(0);
    const [product, setProduct] = useState([]);
    const [price, setPrice] = useState();
    const auth = localStorage.getItem("id");
    let count = 0;
    let category=',';



    console.log(itemno);

    let getProduct = async () => {

        let result = await fetch(`https://helo-on-her-hair-api.onrender.com/v1/user/getCartById?postedBy=${auth}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        );
        result = await result.json();

        if (result) {
            console.log(result);
            var data1 = result.data.reverse();
            setProduct(data1);
        }
    }


    const send = () => {
        product.map((val, ind) => {
            console.log(val.productPrice, ind);
            count = count + val.productPrice;
            category=category+val.productCategori+':-'+val.productPrice+',';

        })
        console.log("danish ansari" + count+"caetogr"+category);
        setPrice(count)

       
        let url="https://wa.me/9471784941?text="
        +`item:${category}`
        +`total:${count}`
        window.open(url,'_blank').focus();
    }


    useEffect(() => {
        getProduct()
    }, [])

    if (itemno === 0) {
        return (
            <div className='ds2'>
                <div className="container pb-5">
                    <div className='row'>
                        <h1 className='best'> Your Cart</h1>
                        {
                            product.map((val, ind) => {
                                return <GetCartComp
                                    productImage={val.productImage}
                                    productDetail={val.productDetail}
                                    productPrice={val.productPrice}
                                    productCategori={val.productCategori}
                                    id={val._id}
                                />
                            })
                        }
                    </div>
                    <p>Total {price}</p>
                    <Button onClick={send}>Buy</Button>

                </div>

            </div>
        )
    }
}

export default GetCart;
