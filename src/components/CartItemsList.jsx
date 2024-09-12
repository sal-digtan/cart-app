import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CartData } from '../data'
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import addtocartIcon from '../assets/images/icon-add-to-cart.svg'
import incrementIcon from '../assets/images/icon-increment-quantity.svg'
import decrementIcon from '../assets/images/icon-decrement-quantity.svg'
import removeIcon from '../assets/images/icon-remove-item.svg'
import Card from 'react-bootstrap/Card'
import carbonIcon from '../assets/images/icon-carbon-neutral.svg'
import Modal from 'react-bootstrap/Modal'
import confirmIcon from '../assets/images/icon-order-confirmed.svg'
import emptyCart from '../assets/images/illustration-empty-cart.svg'

const CartItemsList = () => {

    const [showcartincrement, setshowcartincrement] = useState(false)
    const [cartbg, setcartbg] = useState("#fff")
    const [borderColor, setborderColor] = useState("")

    const [store, setStore] = useState([])

    const [products, SetProducts] = useState(CartData);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // -----Increment Event------
    const increaseQuantity = (i) => {
        SetProducts((preValue) =>
            preValue.map((data, o) => {
                if (i === o) {
                    return {
                        ...data,
                        qty: data.qty + 1
                    };
                }
                return data;
            })
        );
    };

    // State to hold cart items
    const [cart, setCart] = useState([]);

    // Function to add or update an item in the cart
    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);

            if (existingItem) {
                // Update quantity of the existing item
                return prevCart.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                // Add new item with quantity 1
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    // Function to remove an item from the cart
    const removeFromCart = (itemId) => {
        setCart((prevCart) =>
            prevCart.filter(item => item.id !== itemId)
        );
    };

    // Function to decrease the quantity of an item
    const decreaseQuantity = (itemId) => {
        setCart((prevCart) =>
            prevCart.map(cartItem =>
                cartItem.id === itemId
                    ? {
                        ...cartItem,
                        quantity: cartItem.quantity > 1
                            ? cartItem.quantity - 1
                            : 1
                    }
                    : cartItem
            ).filter(item => item.quantity > 0) // Remove items with quantity 0
        );
    };

    // Function to calculate the total number of items in the cart
    const getTotalItemCount = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + item.quantity * item.price, 0);
    };

    return (
        <Container className='py-5'>
            <Row>
                <Col lg={8} md={8} >
                    <h2 className='fw-semibold'>Desserts</h2>
                    <Row>
                        {CartData.map((item, index) =>
                            <Col lg={4} md={6} key={index} className='mb-4'>
                                <div className='position-relative'>
                                    <Image src={item.image.desktop} fluid rounded style={{ border: borderColor === index ? "2px solid #c73a0f" : borderColor }} />
                                    <div className='position-absolute top-100 start-50 translate-middle'>
                                        <Button variant="light" style={{ backgroundColor: cartbg === index ? "#c73a0f" : "#fff", color: "#fff!important" }}
                                            className="cartbtn" onClick={() => { setshowcartincrement(index); setcartbg(index); setborderColor(index) }} >
                                            {showcartincrement === index ? <span className='d-flex justify-content-between'>
                                                <Image src={decrementIcon} fluid onClick={() => decreaseQuantity(index)} className='border p-1' roundedCircle />
                                                {<span className='text-white'>{cart.length > 0 ? cart.map(item => { return showcartincrement === item.id ? item.quantity : "" }) : 1}</span>}
                                                <Image src={incrementIcon} className='border p-1' roundedCircle fluid onClick={() => { increaseQuantity(index); addToCart(item); getTotalItemCount() }} />
                                            </span> :
                                                <span><Image src={addtocartIcon} fluid className='pe-2' />Add to Cart</span>}
                                        </Button>
                                    </div>
                                </div>
                                <div className='pt-5'>
                                    <span className='d-block'>{item.category}</span>
                                    <span className='d-block'>{item.name}</span>
                                    <span className='d-block'>${item.price}</span>
                                </div>
                            </Col>
                        )}
                    </Row>
                </Col>
                <Col lg={4} md={4}>
                    <Card className='border-0'>
                        <div>
                            <Card.Body>
                                <h4 style={{ color: '#c73a0f' }} className='fw-semibold'>Your Cart ({getTotalItemCount()})</h4>
                                {cart && cart.length > 0 ?
                                    <div>
                                        <ul className='list-unstyled'>
                                            {cart.map(item => (
                                                <li key={item.id} className='border-bottom py-3'>
                                                    <span className='d-block fw-semibold'>{item.name}</span>
                                                    <span className='d-flex justify-content-between align-items-start'>
                                                        <span className='d-block'>{item.quantity}x @ ${item.price} ${item.quantity * item.price}</span>
                                                        <a href='#' onClick={() => removeFromCart(item.id)}><Image src={removeIcon} fluid roundedCircle className='border p-1' /></a>
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                        <span className='d-flex justify-content-between align-items-baseline'>
                                            <span>Order Total</span>
                                            <h3 className='fw-semibold'>${getCartTotal()}</h3>
                                        </span>
                                        <div className='text-center py-4 rounded-2' style={{ backgroundColor: '#f4edeb' }}>
                                            <span><Image src={carbonIcon} fluid className='pe-2' />
                                                This is a <span className='fw-semibold'>carbon-neutral</span> delivery
                                            </span>
                                        </div>
                                        <Button onClick={handleShow} className='w-100 my-4 border-0 p-3 fw-semibold' style={{ borderRadius: '50px', backgroundColor: '#c73a0f' }}>Confirm Order</Button>
                                    </div> :
                                    <div className='text-center'>
                                        <Image src={emptyCart} fluid />
                                        <p>Your added items will appear here</p>
                                    </div>
                                }
                            </Card.Body>
                        </div>
                    </Card>
                </Col>
                <>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                        size='lg'>
                        <Modal.Header className='border-0 px-4'>
                            <Modal.Title>
                                <Image src={confirmIcon} fluid />
                                <h3 className='fw-semibold'>Order Confirmed</h3>
                                <p style={{ fontSize: '16px' }}>We hope you enjoy your food</p>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ backgroundColor: '#f4edeb' }} className='mx-4 px-4 rounded-2'>
                            <ul className='list-unstyled'>
                                {cart.map(item => (
                                    <li key={item.id} className='border-bottom py-3'>
                                        <span className='d-flex justify-content-between align-items-center'>
                                            <span className='d-flex'><Image src={item.image.desktop} fluid width={50} rounded />
                                                <span className='d-flex flex-column ps-3'>
                                                    <span className='d-block fw-semibold'>{item.name}</span>
                                                    <span className='d-block'>{item.quantity}x @ ${item.price}</span>
                                                </span>
                                            </span>
                                            <span>${item.quantity * item.price}</span>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <span className='d-flex justify-content-between align-items-baseline'>
                                <span>Order Total</span>
                                <h3 className='fw-semibold'>${getCartTotal()}</h3>
                            </span>
                        </Modal.Body>
                        <Modal.Footer className='border-0'>
                            <Button onClick={() => { handleClose(); setCart([]); setshowcartincrement(); setborderColor(); setcartbg() }} className='w-100 my-4 border-0 p-3 fw-semibold'
                                style={{ borderRadius: '50px', backgroundColor: '#c73a0f' }}>
                                Start New Order
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            </Row>
        </Container>

    )
}

export default CartItemsList