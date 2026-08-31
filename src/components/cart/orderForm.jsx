import { Box, Typography, Divider, TextField, Stack } from '@mui/material'
import React, { useState } from 'react'
import StyledInput from '../styledInput'


export default function OrderForm({ formData, handleChange }) {
    return (
        <Box className="!w-full !h-auto  !py-8 !px-4 !flex !justify-center !items-start max-md:!h-auto">

            <Box className="!w-full   !p-6  !flex !flex-col !justify-between">
                <Box>
                    <Typography variant="h6" className="!font-extrabold !text-gray-800 !mb-4">
                        BILLING DETAILS
                    </Typography>
                    <Divider className="!mb-4" />
                </Box>

                {/* //inputs */}
                <Box className="">
                    <Stack className='!flex !lfex-col !my-2'>
                        <Typography variant="" className='text-(--gray-clr) text-sm '>First Name <span className='text-red-500'>*</span></Typography>
                        <StyledInput
                            type="text"
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            sx={{
                                marginX: 0,
                                "& input": { fontSize: "16px" }
                            }}
                            inputProps={{ style: { fontSize: "16px" } }}
                        />
                    </Stack>
                    <Stack className='!flex !lfex-col !my-2'>
                        <Typography variant="" className='text-(--gray-clr) text-sm '>Last Name <span className='text-red-500'>*</span></Typography>
                        <StyledInput
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            sx={{
                                marginX: 0,
                                "& input": { fontSize: "16px" }
                            }}
                            inputProps={{ style: { fontSize: "16px" } }} />
                    </Stack>
                    <Stack className='!flex !lfex-col !my-2'>
                        <Typography variant="" className='text-(--gray-clr) text-sm'>Email  <span className='text-red-500'>*</span></Typography>
                        <StyledInput
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            sx={{
                                marginX: 0,
                                "& input": { fontSize: "16px" }
                            }}
                            inputProps={{ style: { fontSize: "16px" } }} />
                    </Stack>
                    <Stack className='!flex !lfex-col !my-2'>
                        <Typography variant="" className='text-(--gray-clr) text-sm '>Phone <span className='text-red-500'>*</span></Typography>
                        <StyledInput
                            type="number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            sx={{
                                marginX: 0,
                                "& input": { fontSize: "16px" }
                            }}
                            inputProps={{ style: { fontSize: "16px" } }} />
                    </Stack>
                    <Stack className='!flex !lfex-col !my-2'>
                        <Typography variant="" className='text-(--gray-clr) text-sm'>City <span className='text-red-500'>*</span></Typography>
                        <StyledInput
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            sx={{
                                marginX: 0,
                                "& input": { fontSize: "16px" }
                            }}
                            inputProps={{ style: { fontSize: "16px" } }} />
                    </Stack>
                    <Stack className='!flex !lfex-col !my-2'>
                        <Typography variant="" className='text-(--gray-clr) text-sm'>Address <span className='text-red-500'>*</span></Typography>
                        <StyledInput
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            sx={{
                                marginX: 0,
                                "& input": { fontSize: "16px" }
                            }}
                            inputProps={{ style: { fontSize: "16px" } }} />
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}
