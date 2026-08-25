import { useState } from 'react'
import React from 'react'
import Summary from '../../components/cart/Summary'
import OrderForm from '../../components/cart/orderForm'
import { Box, Snackbar, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Checkout() {
    localStorage.setItem("token", "abc123")
    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackBar] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        address: "",
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const isformValid =
        formData.name.trim() !== "" &&
        formData.lastName.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.phone.trim() !== "" &&
        formData.city.trim() !== "" &&
        formData.address.trim() !== ""


    const handlePlaceOrder = () => {

        if (isformValid) {
            setOpenSnackBar(true)
            localStorage.removeItem("My Book")


            window.dispatchEvent(new Event("cartCountUpdated"));
            window.dispatchEvent(new Event("cartUpdated"));
            setFormData({
                name: "",
                lastName: "",
                email: "",
                phone: "",
                city: "",
                address: "",
            })
            setTimeout(() => {
                navigate('/home');
            }, 2000);

        }

    }
    return (
        <>
            <Box className="  !px-4 !w-full !h-dvh !flex !flex-row !flex-wrap  md:!flex-row">
                <Box className="!w-[65%]  max-md:!w-full ">

                    <OrderForm formData={formData} handleChange={handleChange} />
                </Box>

                <Box className="!w-[35%]  max-md:!w-full ">

                    <Summary
                        isformValid={isformValid} handlePlaceOrder={handlePlaceOrder}
                    />
                </Box>
            </Box>


            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
            >
                <Alert severity="success" variant="filled" className="!w-full !rounded-xl">
                    Order placed successfully!
                </Alert>
            </Snackbar>
        </>
    )
}
