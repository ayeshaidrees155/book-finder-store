import React from 'react';
import { Typography, Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Counter({ count, onIncrease, onDecrease }) {
    return (
        <Box className="!flex !flex-row !items-center !justify-center gap-2">
            <IconButton
                onClick={onDecrease}
                sx={{
                    background: "var(--purple-clr)",
                    width: "24px",
                    height: "24px",
                    "&:hover": { background: "var(--purple-clr)" }
                }}
            >
                <RemoveIcon className='!text-(--bg-white) !text-xs' />
            </IconButton>
            <Typography className='!text-xs '>{count}</Typography>
            <IconButton
                onClick={onIncrease}
                sx={{
                    background: "var(--purple-clr)",
                    width: "24px",
                    height: "24px",
                    "&:hover": { background: "var(--purple-clr)" }
                }}
            >
                <AddIcon className='!text-(--bg-white) !text-xs' />
            </IconButton>
        </Box>
    );
}