import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Divider,
    Radio,
    RadioGroup,
    FormControlLabel,
    Checkbox,
    FormControl
} from '@mui/material';

export default function Summary({ isformValid, handlePlaceOrder }) {
    const [cartItems, setCartItems] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('creditCard');


    const fetchCart = () => {
        const storedCart = localStorage.getItem("My Book");
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        } else {
            setCartItems([]);
        }
    };

    useEffect(() => {
        fetchCart();


        window.addEventListener("cartUpdated", fetchCart);

        return () => {
            window.removeEventListener("cartUpdated", fetchCart);
        };
    }, []);

    // Subtotal Calculation (Price * Qty)
    const subtotal = cartItems.reduce((acc, book) => {
        const price = book.price || 0;
        const qty = book.qty || 1;
        return acc + (price * qty);
    }, 0);

    const shipping = 200; // Fixed shipping like Rs. 200
    const total = subtotal > 0 ? subtotal + shipping : 0;



    return (
        <Box className="!w-full !h-auto  !py-8 !px-4 !flex !justify-center !items-start max-md:!h-auto  mx-md:!px-2 max-md:!py-4">

            <Box className="!w-full  !bg-(--bg-white) mx-md:!p-2 !p-6 !rounded-2xl !shadow-sm !flex !flex-col !justify-between">
                <Box>
                    <Typography variant="h6" className="!font-extrabold !text-gray-800 !mb-4">
                        YOUR ORDER
                    </Typography>
                    <Divider className="!mb-4" />

                    <Box className="!flex !justify-between !font-bold !text-sm !text-gray-700 !mb-3">
                        <Typography className="!text-xs">Product</Typography>
                        <Typography className="!text-xs">Total</Typography>
                    </Box>
                    <Divider className="!mb-4" />


                    <Box className=" !h-auto !pr-1 !mb-4">
                        {cartItems.length === 0 ? (
                            <Typography className="!text-xs !text-gray-500 !text-center !py-2">No items in cart</Typography>
                        ) : (
                            cartItems.map((book, idx) => (
                                <Box key={book.key || idx} className="!flex !justify-between !items-center !mb-3">
                                    <Typography className="!text-xs !text-gray-600  !w-[70%]">
                                        {book.title} <span className="!text-[10px] !text-purple-600 !font-bold">(x{book.qty || 1})</span>
                                    </Typography>
                                    <Typography className="!text-xs !font-semibold !text-(--blue-clr)">
                                        Rs. {((book.price || 0) * (book.qty || 1)).toFixed(2)}
                                    </Typography>
                                </Box>
                            ))
                        )}
                    </Box>

                    <Divider className="!mb-4" />

                    <Box className="!flex !justify-between !mb-2">
                        <Typography className="!text-sm !text-gray-600">Subtotal</Typography>
                        <Typography className="!text-sm !font-semibold !text-(--blue-clr)">Rs. {subtotal.toFixed(2)}</Typography>
                    </Box>
                    <Box className="!flex !justify-between !mb-4">
                        <Typography className="!text-sm !text-gray-600">Shipping</Typography>
                        <Typography className="!text-sm !font-semibold !text-(--blue-clr)">Rs. {shipping}.00</Typography>
                    </Box>

                    <Divider className="!mb-4" />

                    <Box className="!flex !justify-between !mb-6">
                        <Typography className="!text-base !font-bold !text-gray-800">Total</Typography>
                        <Typography className="!text-base !font-extrabold !text-(--purple-clr)">Rs. {total.toFixed(2)}</Typography>
                    </Box>

                    {/* Payment Methods */}
                    <Typography className="!text-xs !font-bold !text-gray-700 !mb-2">
                        Payment Method <span className="!text-red-500">*</span>
                    </Typography>
                    <FormControl component="fieldset" className="!w-full !mb-4">
                        <RadioGroup
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <FormControlLabel value="creditCard" control={<Radio size="small" />} label={<Typography className="!text-xs">Credit Card</Typography>} />
                            <FormControlLabel value="cheque" control={<Radio size="small" />} label={<Typography className="!text-xs">COD</Typography>} />

                        </RadioGroup>
                    </FormControl>


                </Box>

                {/* Place Order Button */}
                <Button
                    variant="contained"
                    onClick={handlePlaceOrder}
                    disabled={!isformValid}

                    className="!w-full !bg-(--purple-clr) !text-(--bg-white) !py-3 !rounded-xl !font-bold !text-sm !shadow-none "
                    sx={{
                        cursor: isformValid ? "disabled" : "pointer",
                        backgroundColor: isformValid ? "var(--purple-clr) !important" : "var(--gray-clr) !important",
                        textTransform: "none",
                        "&:hover": {
                            backgroundColor: isformValid ? "var(--purple-clr) !important" : "var(--gray-clr) !important",
                        }
                    }}

                >
                    PLACE ORDER
                </Button>
            </Box>
        </Box>
    );
}