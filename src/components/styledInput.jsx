import { TextField, InputAdornment } from "@mui/material"


export default function StyledInput({ label, icon, endIcon, type, sx, ...props }) {

    return (

        <TextField
            {...props}
            label={label}
            type={type}
            variant='outlined'
            className='!w-full '
            sx={sx}

            slotProps={{
                input: {
                    startAdornment: icon ? (
                        <InputAdornment postion="start">
                            {icon}
                        </InputAdornment>
                    ) : null,
                    //end icon in nar
                    endAdornment: endIcon ? (
                        <InputAdornment position="end">
                            {endIcon}
                        </InputAdornment>
                    ) : null,
                    sx: {

                        border: "1px solid var(--border-gray)",
                        // marginX: ,
                        marginY: 1,
                        height: 40,
                        background: "var(--bg-gray)",
                        "& fiedlset": {},
                        "&.Mui-focused fieldset": {
                            border: "1px solid var(--purple-clr) !important",

                        },
                        "&:hover fieldset": {
                            border: "1px solid var(--purple-clr) !important",
                        }

                    },
                    className: "!rounded-xl !text-(color:--gray-clr) !text-(size:--text-small)"
                }
            }}

        />
    )



}

