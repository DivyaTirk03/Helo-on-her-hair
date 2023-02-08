import React, { useState, useEffect } from 'react'
import KochoComp from './KochoComp';
import '../css/Kocho.css'

function Kocho() {
    const [itemno, setItemno] = useState(0);
    const [product, setProduct] = useState([]);
    const [selects,setSelects]=useState('Organza');
 
 
 
    console.log(itemno);

    let getProduct = async () => {

        let result = await fetch(`https://helo-on-her-hair-api.onrender.com/v1/upload`, {
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
    },[])
    if (itemno === 0) {
        return (
            <div className='ds2'>
                <div className="container pb-5">
                    <div className='row'>
                        <h1 className='best'> Best Scunchies</h1>
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
}

export default Kocho;