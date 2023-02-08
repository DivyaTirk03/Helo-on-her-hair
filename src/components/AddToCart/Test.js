import React, { useEffect, useState } from "react";
import KochoComp from "../KochoComp";
let sd;
function Test() {
    const [cart,setCart]=useState('');
    const [product, setProduct] = useState([]);

    const da = () => {

        let pre = localStorage.getItem("Cart");
        // console.log(pre);
        var pieces = pre.split("\\");
        var s = pre.replace(/\"/g, "");
        // console.log(pieces[1], "dhskdja");

        pieces.map(async (item, index) => {
            let ds=item.split('');
            if (ds.length == 25) {
                var s1 = item.replace(/"/g, "");
                // console.log(item);
                sd=s1;
                console.log(s1);


                // let result = await fetch(`http://localhost:5000/v1/upload/product?id=${s1}`, {
                //     method: 'GET',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     }
                // }
                // );
                // result = await result.json();
        
                // if (result) {
                //     console.log(result);
                //     var data1 = result.data;
                //     setProduct(data1);
                // }
            } else {
                // console.log("da");
            }
        })
        console.log(pieces);
        // console.log(ss);
        // console.log(d);

    }


    da();

    return (
        <>
            <p>hi</p>
            {/* <p>{cart}</p> */}
            <p>{sd}</p>
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
        </>
    )
}

export default Test;