import { Button } from '@mui/material'
import React from 'react'

export default function styledBtn({ onClick, text, sx }) {
    return (
        <Button
            onClick={onClick}
            variant='contained'
            className='!text-(color:--bg-white) !bg-(--purple-clr) !rounded-xl !my-1 !text-xs !font-semibold  !w-59 !h-10'
            sx={{ textTransform: "none", ...sx }}
        >
            {text}
        </Button>
    )
}
