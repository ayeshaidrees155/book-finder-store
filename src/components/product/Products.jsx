import React, { useState } from 'react'
import { Box, IconButton, Typography, } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import Api from '../../apis/Api';
import { useEffect } from 'react';
import defaultImg from "/src/assets/default.jpg"
import CircularProgress from '@mui/material/CircularProgress';
import Details from './Details';

export default function Products({ searchBook }) {
    const [books, setBooks] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            setLoader(true);
            try {
                const response = await Api.get("/search.json", {
                    params: {
                        q: "programming"
                    }
                });
                const booksWithPrice = response.data.docs.map((book, index) => ({
                    ...book,
                    price: 15.50 + index
                }));
                setBooks(booksWithPrice);

            } catch (error) {
                console.log("eror occuered:", error);
            }
            finally {
                setLoader(false);
            }
        }
        fetchBooks();
    }, []);


    const goToCart = (book) => {
        const prevData = JSON.parse(localStorage.getItem("My Book")) || [];


        const existingIndex = prevData.findIndex((cartItem) => cartItem.key === book.key || cartItem.id === book.id);

        let finalData;
        if (existingIndex !== -1) {
            finalData = prevData.map((item, index) => {
                if (index === existingIndex) {
                    return { ...item, qty: (item.qty || 1) + 1 };
                }
                return item;
            });
        } else {
            finalData = [...prevData, { ...book, qty: 1 }];
        }

        localStorage.setItem("My Book", JSON.stringify(finalData));
        window.dispatchEvent(new Event("cartCountUpdated"));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const handlemodalOpen = (book) => {
        setModalOpen(true);
        setSelectedBook(book);
    };

    const filteredBooks = books.filter((book) => {
        const title = book?.title ? book.title.toLowerCase() : "";
        const query = searchBook ? searchBook.toLowerCase() : "";
        return title.includes(query);
    });

    return (
        <Box className="!flex !items-center !justify-center !w-full">
            {loader ? (
                <CircularProgress sx={{ color: "var(--purple-clr)", margin: 10 }} />
            ) : (
                <Box className="!w-[88%] !h-auto !flex !flex-wrap !flex-row !items-center !justify-evenly !bg-(--bg-white) !rounded-xl !mt-10 !mb-3 !p-3 !shadow-sm">

                    {/* Agar search query se koi book match na ho */}
                    {filteredBooks.length === 0 ? (
                        <Typography className="!py-10 !text-(--gray-clr) !font-medium">
                            No books found matching your search.
                        </Typography>
                    ) : (
                        filteredBooks.map((book) => (
                            <Box key={book.key || book.id}
                                className="!shadow-md !rounded-xl !w-45 !h-100 !flex !flex-col !items-center !justify-evenly !px-4 !py-2 !my-3 cursor-pointer">

                                {/* img */}
                                <Box
                                    component="img"
                                    src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : defaultImg}
                                    alt={book.title}
                                    className='!w-[70%] !h-[50%] !mt-5 !rounded-md !object-cover'
                                />

                                {/* desc */}
                                <Box className="!m-2 px-2 w-full !h-[45%] !flex !flex-col !items-center !justify-evenly">
                                    <Typography onClick={() => handlemodalOpen(book)}
                                        className='text-(color:--blue-clr) !font-semibold !text-sm !text-center'>
                                        {book.title}
                                    </Typography>
                                    <Typography className='text-(color:--gray-clr) !my-2 !text-xs !text-center'>
                                        {book.author_name ? book.author_name[0] : "Mark Lutz"}
                                    </Typography>

                                    {/* price and cart */}
                                    <Box className="!w-full !px-2 !flex !flex-row !items-center !justify-between">
                                        <Typography variant="h6" className='!text-(--blue-clr) !font-bold'>
                                            ${book.price.toFixed(2)}
                                        </Typography>
                                        <IconButton
                                            onClick={() => goToCart(book)}
                                            sx={{
                                                background: "var(--purple-clr)", width: "30px", height: "30px", "&:hover": {
                                                    background: "var(--purple-clr)"
                                                }
                                            }}>
                                            <AddIcon className='!text-(--bg-white)' />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Box>
                        ))
                    )}
                </Box>
            )}

            <Details
                handleOpen={modalOpen}
                handleClose={() => setModalOpen(false)}
                book={selectedBook}
            />
        </Box>
    );
}