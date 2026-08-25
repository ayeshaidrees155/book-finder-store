import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { use } from 'react'
import Api from '../../apis/Api';
import { Modal, Typography, Card, CardActions, CardContent, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import defaultImg from "/src/assets/default.jpg"


export default function Details({ handleOpen, handleClose, book }) {
    const [loader, setLoader] = useState(true);
    const [details, setDetails] = useState(null);
    useEffect(() => {
        if (book?.key) {
            const fetchDetails = async () => {
                setLoader(true);
                try {
                    const response = await Api.get(`${book.key}.json`);
                    setDetails(response.data);
                    console.log("Data is Fetched", response.data);


                } catch (error) {
                    console.log("Error Occured", error);

                }
                finally {
                    setLoader(false)
                }
            }
            fetchDetails();
        }


    }, [book])

    return (

        <Modal open={handleOpen} onClose={handleClose} className='!flex !flex-col !items-center !justify-start !pt-1 !h-full !outline-none'>
            {loader ? (
                <Box className='!bg-(--bg-white) !h-[400px] !w-[90%] !max-w-[450px] !flex !items-center !justify-center !shadow-none !border-none !outline-none'>
                    <CircularProgress sx={{ color: "var(--purple-clr)" }} />
                </Box>
            ) : (

                <Card className='!bg-(--bg-white) !max-h-[85vh] !w-[90%] !max-w-[450px] !flex !flex-col !p-4 !border-none !outline-none !overflow-y-auto !shadow-none !border-none'>
                    <CardActions className='!flex !flex-row  !w-full !items-end !justify-end '>
                        <CloseIcon onClick={handleClose} className='text-(--gray-clr)' />
                    </CardActions>

                    <CardContent className='!w-full !flex-col !flex !items-center !justify-center !object-cover '>
                        <Box
                            component="img"
                            src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : defaultImg}
                            alt={book.title}
                            className='!w-25 !h-40  !rounded-md !flex !items-center !justify-center !object-cover'

                        />
                        <Typography variant='h6'
                            className='text-(color:--black-clr) !font-extrabold !py-3  !text-center'>{book.title}</Typography>
                        <Typography
                            className='text-(color:--purple-clr) !text-sm  !py-1 !text-center'>{book.author_name ? book.author_name.join(" , ") : "MarkLutz , E.Balagurusammy"}</Typography>
                        <Typography
                            className='text-(color:--gray-clr) !text-sm  !text-center'>Publisher: {book.author_name ? book.author_name[0] : " E.Balagurusammy"}</Typography>
                        <Typography
                            className='text-(color:--gray-clr) !text-sm   !text-center'>Published:{book.first_publish_year + "-06-30"}</Typography>


                        <Typography className='text-(color:--black-clr) !rounded-xl !my-2 !py-3 !bg-(--bg-gray) !text-(size:--text-small) !py-2 !my-2 !min-h-20  !w-full'>{typeof details?.description === "string" ? details.description : details?.description?.value || details?.value || "Very well known, classic introduction to the  Programming Language. Both a text for learning, a reference, and, to some, the definition of proper C language features and use."}</Typography>

                    </CardContent>




                </Card>
            )
            }

        </Modal >
    )
}
