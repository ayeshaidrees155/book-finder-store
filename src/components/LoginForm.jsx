import React, { useState } from 'react'
import { Box, Typography, Stack } from '@mui/material'
import StyledInput from './styledInput';
import StyledBtn from './styledBtn';
import { Link, useNavigate } from "react-router-dom"

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function LoginForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
        setErrors({ ...errors, [name]: "" })
    }

    const validationFunc = () => {
        const newErrors = {}

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!formData.email.trim()) {
            newErrors.email = "Enter email address here";
        } else if (!emailPattern.test(formData.email)) {
            newErrors.email = "Email address is incorrect";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Enter password here";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleLogin = () => {
        const isValid = validationFunc();
        if (isValid) {
            localStorage.setItem("token", "LoggedIn")
            navigate('/home')
        }
    }

    return (
        <Box className="!bg-(--bg-gray) !w-full !h-dvh !flex !items-center !justify-center ">
            <Box className="!cursor-pointer !flex !flex-col !items-center !bg-(--bg-white) !rounded-lg !w-70 !h-auto !shadow-lg !shadow-cyan-300/5 !pt-10 !pb-5 !px-5">
                <Typography variant='h5' className='text-(--purple-clr) !font-extrabold !my-4'>Login</Typography>

                {/* email */}
                <StyledInput
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    name="email"
                    onChange={handleChange}
                    icon={<EmailOutlinedIcon className='!text-sm me-2' />}
                    inputProps={{ style: { fontSize: '16px' } }}
                    sx={{ '& input': { fontSize: '16px' } }}
                />
                {errors.email && <p style={{ color: "red", fontSize: "12px" }}>{errors.email}</p>}

                {/* password */}
                <StyledInput
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    icon={<LockOutlinedIcon className='!text-sm me-2' />}
                    inputProps={{ style: { fontSize: '16px' } }}
                    sx={{ '& input': { fontSize: '16px' } }}
                />
                {errors.password && <p style={{ color: "red", fontSize: "12px" }}>{errors.password}</p>}


                <StyledBtn text="Login" onClick={handleLogin} />


                <Stack className="!flex !flex-row !items-center !justify-center">
                    <Typography className='text-(color:--purple-clr) !m-3 !text-xs'><Link to='/forget'>Forgot password?</Link></Typography>
                    <Typography className='text-(color:--purple-clr) !m-3 !text-xs'><Link to='/signup'>Sign up</Link></Typography>
                </Stack>
            </Box>
        </Box>
    )
}