import React, { useState, useEffect } from 'react'
import KochoComp from '../KochoComp';
import '../../css/Kocho.css'

function Wristlet() {
    const [product, setProduct] = useState([]);


    let getProduct = async () => {

        let result = await fetch(`https://helo-on-her-hair-api.onrender.com/v1/upload/search?name=Wristlet`, {
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
    useEffect(() => {
        getProduct()
    }, [])

    return (
        <div className='ds2'>
            <div className="container pb-5">
                <div className='row'>
                    <h1 className='best'> Best Scunchies</h1>
                    <div className='navigationbtn'>
                        {/* <Filter /> */}
                    </div>
                    {
                        product.map((val, ind) => {
                            return <KochoComp
                                productImage={val.productImage}
                                productDetail={val.productDetail}
                                productPrice={val.productPrice}
                                productCategori={val.productCategori}
                                id={val._id}
                            />
                        })
                    }

                </div>
            </div>
        </div>
    )

}

export default Wristlet;