import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './product.css'

const Product = () => {
    const [product, setProduct] = useState([]);
    const [searchbyname, setSearchbyname] = useState([]);
    const [item, setItem] = useState(0);
    const handleClick = () => {
        setItem(item + 1);
    }

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => setProduct(data.products));
        // console.log(product)
    }, []);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/search?q=${searchbyname}&select=title,price`)
            .then(res => res.json())
            .then(data => setProduct(data.products));
        //  .then(data => console.log("Searched Data:", data))
    }, [searchbyname])

    const token = localStorage.getItem("token");
    // console.log({ token });

    const navigate = useNavigate();
    if (!token) {
        navigate("/");
        return;
    }

    const logoutHandler = () => {
        localStorage.clear();
        navigate("/");
    }

    return (
        <>
            <div>
                <div className="top-links">
                    <div className="search">
                        <p>Product Search </p>
                        <div>
                            <label htmlFor="searchbyname" ></label>
                            <input type="search" name="search" onChange={event => setSearchbyname(event.target.value)} value={searchbyname} />
                        </div>
                    </div>
                    <div className='user-controls'>
                        <button className='btn-logout' onClick={logoutHandler}>Logout</button>
                        <div className="cart">
                            <a href="/">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M80 0C87.47 0 93.95 5.17 95.6 12.45L100 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H158.2L172.8 352H496C504.8 352 512 359.2 512 368C512 376.8 504.8 384 496 384H160C152.5 384 146.1 378.8 144.4 371.5L67.23 32H16C7.164 32 0 24.84 0 16C0 7.164 7.164 0 16 0H80zM107.3 64L150.1 256H487.8L541.8 64H107.3zM128 456C128 425.1 153.1 400 184 400C214.9 400 240 425.1 240 456C240 486.9 214.9 512 184 512C153.1 512 128 486.9 128 456zM184 480C197.3 480 208 469.3 208 456C208 442.7 197.3 432 184 432C170.7 432 160 442.7 160 456C160 469.3 170.7 480 184 480zM512 456C512 486.9 486.9 512 456 512C425.1 512 400 486.9 400 456C400 425.1 425.1 400 456 400C486.9 400 512 425.1 512 456zM456 432C442.7 432 432 442.7 432 456C432 469.3 442.7 480 456 480C469.3 480 480 469.3 480 456C480 442.7 469.3 432 456 432z" /></svg>
                                <div>
                                    <p><b>Cart</b></p>
                                    <p><b>{item}</b> item(s)</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="product-list">
                    {product.map((productCard, index) => {
                        return (
                            <div className="list" key={index} >
                                <div className="list-item">
                                    <div>
                                        <h2>{productCard.title}</h2>
                                    </div>

                                    <div>
                                        <p className='text-price'>$<b>{productCard.price}</b></p>
                                        <button className="btn" onClick={handleClick}>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>

    )
}

export default Product
