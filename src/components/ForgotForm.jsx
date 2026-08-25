import React from 'react'
import { Box, Typography, Stack } from '@mui/material'
import { purple } from '@mui/material/colors'
import StyledInput from './styledInput';
import StyledBtn from './styledBtn';
import { Link } from "react-router-dom"

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function ForgotForm() {
    return (
        <Box className=" !bg-(--bg-gray) !w-full !h-dvh !flex !items-center !justify-center">

            <Box className="!cursor-pointer !flex  !flex-col !items-center !bg-(--bg-white) !rounded-lg   !w-70  !h-auto !shadow-lg !shadow-cyan-300/5   !pt-10 !pb-5 !px-5">
                <Typography variant='h5' className='text-(--purple-clr) !font-extrabold !my-4'>Forgot Password?</Typography>
                {/* email */}
                <StyledInput
                    type="email"
                    placeholder="Enter your email"
                    icon={<EmailOutlinedIcon className='!text-sm me-2' />}
                />


                {/* btn */}
                <StyledBtn text="Send Reset Link" />

                {/* FORGET& SIGNIN */}
                <Stack className="!flex !flex-row !items-center !justify-center">


                    <Typography className='text-(color:--purple-clr) !m-3 !text-xs'><Link to='/'>Back to Login</Link></Typography>
                </Stack>


            </Box>
        </Box >
    )
}
