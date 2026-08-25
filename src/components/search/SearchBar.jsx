import React from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import StyledInput from '../styledInput'
import StyledBtn from '../styledBtn'
import { Margin, WidthFull } from '@mui/icons-material'


export default function SearchBar({ searchBook, setSearchBook }) {

    const handleChange = (e) => {
        setSearchBook(e.target.value)

    }
    return (
        <Box className="!rounded-xl !bg-(--bg-white) !flex !flex-row !flex-wrap !items-center !justify-between h-auto w-[88%] mx-auto !p-4 sm:!p-6 md:!p-10 !shadow-sm">

            <Box className="w-full lg:w-[70%] !h-auto !flex flex-col !items-start !justify-center">

                <Box className="w-full !flex !flex-row !items-center !justify-between lg:!block">

                    <Box className="w-[62%] sm:w-[65%] lg:w-full !flex flex-col !items-start !justify-center">
                        <Typography
                            variant='h4'
                            className='!font-extrabold !text-(--blue-clr) !pt-2 !pb-2 !px-1 lg:!px-4 !text-[clamp(1rem,2.2vw,2.2rem)] leading-tight'
                        >
                            WELCOME TO
                            <strong className='!text-(--purple-clr)'> BOOKSTORE</strong>
                        </Typography>

                        <Typography
                            className='text-(--gray-clr) !px-1 lg:!px-4 !py-1 !text-[clamp(0.7rem,1.2vw,1rem)] leading-snug'
                        >
                            A house to millions of digital and non-digital books from around the world
                        </Typography>
                    </Box>

                    <Box className="w-[35%] sm:w-[32%] lg:!hidden !flex !items-center !justify-center">
                        <Box
                            component="img"
                            src="/books.jpg"
                            alt='error'
                            className='!object-cover w-[100px] h-[85px] sm:w-[130px] sm:h-[110px] md:w-[150px] md:h-[130px] !rounded-xl'
                        />
                    </Box>

                </Box>

                <Stack className='!flex !w-full sm:!w-[85%] lg:!w-full !flex-row !items-center !mt-4 !px-1 lg:!px-4 gap-2'>
                    <Box className="w-[65%] sm:w-[70%]  !rounded-full overflow-hidden bg-white">
                        <StyledInput
                            type="text"
                            value={searchBook}
                            onChange={handleChange}
                            sx={{
                                "& fieldset": { border: "none" },
                                width: "100%"
                            }}
                            placeholder="Write Title Here"
                            className="!px-3 !py-1.5 sm:!py-2 !text-[clamp(0.75rem,1.1vw,1rem)] w-full"
                        />
                    </Box>

                    <Button
                        onClick={handleChange}
                        variant='contained'
                        sx={{
                            background: "var(--blue-clr)",
                            textTransform: "none",
                            color: "var(--bg-white)",
                            paddingX: { xs: 2, sm: 3, md: 4 }
                        }}
                        className='!rounded-full !h-8 sm:!h-9 md:!h-10 !text-[clamp(0.75rem,1.1vw,1rem)] whitespace-nowrap'
                    >
                        Search
                    </Button>
                </Stack>

            </Box>

            <Box className="hidden lg:!flex w-[28%] !h-47 !items-center !justify-center">
                <Box
                    component="img"
                    src='/src/assets/books.jpg'
                    alt='error'
                    className='!object-cover !w-35 !h-40 !rounded-xl'
                />
            </Box>

        </Box>
    )
}
