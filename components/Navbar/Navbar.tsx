import React from 'react';
import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import Link from "next/link";
import getConfig from 'next/config';
import ColorModeSwitcher from "@/components/Navbar/ColorModeSwitcher";
import Logo from "@/components/Navbar/Logo";
import AppPickerMenu from "@/components/AppPicker/AppPickerMenu";

export default async function Navbar() {

    const {publicRuntimeConfig} = getConfig();

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Box sx={{display: {xs: 'none', sm: 'flex',},}}>
                    <Logo/>
                </Box>
                <Link href="/" style={{textDecoration: 'none', color: 'inherit',}}>
                    <Typography variant="h6" sx={{ml: 2,}}>R.V.M. v{publicRuntimeConfig.version}</Typography>
                </Link>
                <span style={{flexGrow: 1,}}></span>
                <ColorModeSwitcher/>
                <AppPickerMenu />
            </Toolbar>
        </AppBar>
    );
}