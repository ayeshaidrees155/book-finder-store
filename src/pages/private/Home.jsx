import React, { useState } from 'react'
import SearchBar from '../../components/search/SearchBar'
import { Box } from '@mui/material'
import Nav from '../../components/header/Nav'
import Products from '../../components/product/Products'

export default function Home() {

    const [searchBook, setSearchBook] = useState("");
    return (
        <>
            <Nav />
            <Box className=" !w-full !h-auto !top-20 !pt-10 !bg-(--bg-gray) !px-10 !flex !flex-col !items-center !justify-center !pb-5 !relative !border-[red] max-sm:!px-2">
                <SearchBar searchBook={searchBook} setSearchBook={setSearchBook} />
                <Products searchBook={searchBook} />

            </Box>
        </>
    )
}
