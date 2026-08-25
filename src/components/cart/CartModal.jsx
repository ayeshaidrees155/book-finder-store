import { Modal, Box, Stack, Typography, IconButton, Button } from '@mui/material';
import React, { use } from 'react';
import { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import defaultImg from "/src/assets/default.jpg"
import DeleteIcon from '@mui/icons-material/Delete';
import Counter from './counter';
import { Link } from 'react-router-dom';


export default function CartModal({ handleCartClose, handleCartOpen, book }) {
    const [cartItems, setCartItems] = useState([]);



    useEffect(() => {
        if (handleCartOpen) {

            const storedCart = localStorage.getItem("My Book");
            if (storedCart) {
                setCartItems(JSON.parse(storedCart));

            }
        }

    }, [handleCartOpen])
    const handleQuantityChange = (key, delta) => {
        const updatedCart = cartItems.map((item) => {
            if (item.key === key) {
                const currentQty = item.qty || 1;
                const newQty = currentQty + delta;
                return { ...item, qty: newQty > 0 ? newQty : 1 };
            }
            return item;
        });
        setCartItems(updatedCart);
        localStorage.setItem("My Book", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const handleDelete = (key) => {
        const updatedCart = cartItems.filter((book) => book.key !== key)
        setCartItems(updatedCart)
        localStorage.setItem("My Book", JSON.stringify(updatedCart))

    }
    // toalprice
    const totalPrice = cartItems.reduce((acc, book) => {
        const price = book.price || 0;
        const qty = book.qty || 1;
        return acc + (price * qty);
    }, 0); return (
        <Modal open={handleCartOpen} onClose={handleCartClose}>

            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 340,
                bgcolor: 'var(--bg-white)',
                boxShadow: 24,
                p: 3,
                borderRadius: 3,
                outline: 'none',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '75vh',
            }}>
                {/* Close Button Header */}
                <Box className="!flex !items-end !justify-end !mb-1">
                    <CloseIcon onClick={handleCartClose} className='text-(--gray-clr) cursor-pointer' />
                </Box>

                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Your Cart
                </Typography>


                <Box sx={{
                    overflowY: 'auto',
                    maxHeight: '55vh',
                    pr: 1,
                    '&::-webkit-scrollbar': {
                        width: '5px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'var(--gray-clr)',
                        borderRadius: '10px',
                    }
                }}>
                    {cartItems.length === 0 ? (
                        <Typography className='text-center py-4'>Cart is empty.</Typography>
                    ) : (
                        cartItems.map((book, index) => (
                            <Box
                                key={book.key || index}
                                sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}
                                className="!flex !flex-row !items-start !justify-between !w-full !gap-3"
                            >
                                <Box
                                    component="img"
                                    src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : defaultImg}
                                    alt={book.title}
                                    className='!w-12 !h-16 !object-cover !rounded'
                                />
                                <Box className="!w-[75%] !flex !flex-col !justify-between">
                                    <Typography className='!text-xs !font-bold '>{book.title}</Typography>
                                    <Typography className='!text-(--blue-clr) !text-[10px]'>{book.author_name ? book.author_name[0] : "Mark Lutz"}</Typography>
                                    <Typography className='!text-(--blue-clr) !text-xs !font-bold'>${book.price ? book.price.toFixed(2) : "0.00"}</Typography>

                                    {/* Delete Button Row */}
                                    <Box className="!w-full !flex !items-center !justify-between !mt-1">
                                        <Counter
                                            count={book.qty || 1}
                                            onIncrease={() => handleQuantityChange(book.key, 1)}
                                            onDecrease={() => handleQuantityChange(book.key, -1)}
                                        />
                                        <IconButton
                                            onClick={() => handleDelete(book.key)}
                                            sx={{
                                                background: "var(--purple-clr)",
                                                width: "24px",
                                                height: "24px",
                                                "&:hover": {
                                                    background: "var(--purple-clr)"
                                                }
                                            }}
                                        >
                                            <DeleteIcon className='!text-(--bg-white) !text-xs' />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Box>
                        ))
                    )}
                </Box>

                {cartItems.length > 0 && (

                    <Stack className="my-1  h-20 w-full  !flex !flex-col !items-center !justify-evenly">
                        <Box className="w-full !flex  !flex-row !items-center !justify-between">
                            <Typography className='text-(--purple-clr) !font-bold !flex !text-sm'>Total</Typography>
                            <Typography className='text-(--purple-clr) !font-bold !flex !text-sm'>${totalPrice}</Typography>
                        </Box>
                        <Link to={`/checkout/${totalPrice}`} className='w-full'>
                            <Button className="!w-full !bg-(--purple-clr) !text-(--bg-white) !text-sm !font-bold" variant="contained " sx={{ textTransform: "none" }}>Checkout</Button>
                        </Link>

                    </Stack>
                )}

            </Box>
        </Modal>
    )
}
