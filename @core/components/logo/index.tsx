import Image from 'next/image';
import React from 'react';
import Button from '@mui/material/Button';
import LogoInterface from './logo.interface';

function Logo({ onClick, active, height, width, name }: LogoInterface) {

    return (
        <>

            <Button onClick={onClick} className={active == 'home' ? 'logo-curve' : ''}>
                <Image priority={true}
                    src={name == "white" ? "/static/images/logo-white.png" : "/static/images/logo.png"}
                    alt={"Diabafrica logo"}
                    width={width} height={height} />
            </Button>

        </>
    );
}

export default Logo;