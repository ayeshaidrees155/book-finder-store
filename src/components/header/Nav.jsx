import React, { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import StyledInput from '../styledInput';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import Badge, { badgeClasses } from '@mui/material/Badge';
import CartModal from '../cart/CartModal';
import { styled } from '@mui/material/styles';
import { Navigate, useNavigate } from 'react-router-dom';


export default function Nav() {
    const navigate = useNavigate();
    const [cartOpen, setCartOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(Boolean(localStorage.getItem("token")));

    const handleLogin = () => {
        if (isLogin) {
            localStorage.removeItem("token");
            setIsLogin(false);
            navigate('/');
        }
        else {
            navigate('/')
        }
    }

    const handleSignUp = () => {
        navigate('/signup')
        setIsLogin(false)
    }


    const handleCartOpen = () => {
        if (!isLogin) {
            return
        }
        setCartOpen(true)

    }


    const [cartCount, setCartCount] = useState(0)
    useEffect(() => {

        const updateCount = () => {
            const storedCart = localStorage.getItem("My Book");
            if (storedCart) {
                const items = JSON.parse(storedCart);
                const totalQty = items.reduce((acc, item) => acc + (item.qty || 1), 0);
                setCartCount(totalQty);
            }
        };
        updateCount();
        window.addEventListener("cartCountUpdated", updateCount);

        return () => window.removeEventListener("cartCountUpdated", updateCount);


    }, [])

    const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -15px;
    right: 15px;
  }
`;




    return (
        <Box className=" !z-40 !bg-(--bg-white) !w-full !h-20 !fixed">
            <Stack className="!flex !flex-row !items-center !justify-evenly !h-full !w-full !border-gray-500 !px-7 max-sm:!justify-between">
                <Box className=" !h-full !w-1/3 !flex !items-center">
                    <Typography variant='h5' className='text-(--purple-clr) !font-extrabold max-sm:!text-lg'>BOOKSTORE</Typography>
                </Box>
                <Box className=" !h-full !w-1/3 !flex !flex-row !items-center max-md:!w-40 max-sm:!hidden">
                    <StyledInput
                        sx={{ "& fieldset": { border: "none" } }}
                        endIcon={<SearchIcon className='text-(--purple-clr)' />}
                        placeholder="Search books.."
                    />

                </Box>
                <Box className=" !h-full !w-1/3 !flex !flex-row !items-center !justify-end !gap-3 max-md:!gap-1">
                    <Button
                        onClick={handleLogin}
                        variant="contained" className="!bg-(--bg-gray) !text-xs !font-semibold  !h-7 !rounded-full !text-(color:--purple-clr) max-md:!text-[10px] max-md:!w-auto max-md:!px-1 max-sm:!h-6" sx={{ textTransform: "none" }}> {isLogin ? "Logout" : "Login"}
                    </Button>

                    <Button onClick={handleSignUp}
                        variant="contained" className="!text-(color:--bg-white)  !text-xs !font-semibold !h-7 !rounded-full !bg-(--purple-clr) max-md:!text-[10px] max-md:!w-auto max-md:!px-1 max-sm:!h-6" sx={{ textTransform: "none" }}>
                        Sign Up
                    </Button>

                    <ShoppingCartIcon
                        onClick={() => handleCartOpen()}
                        className='!text-(--purple-clr) !text-md ' />
                    <CartBadge badgeContent={cartCount} overlap="circular" sx={{
                        "& .MuiBadge-badge": {
                            backgroundColor: "var(--purple-clr)",
                            color: "var(--bg-white)",
                            fontWeight: "bold",
                            borderRadius: "50%",
                            padding: "0 4px",

                        }
                    }} />
                </Box>
            </Stack>
            <CartModal

                handleCartOpen={cartOpen}
                handleCartClose={() => setCartOpen(false)}

            />
        </Box>
    )
}
