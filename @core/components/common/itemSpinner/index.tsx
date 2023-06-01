import { Grid } from '@mui/material';
import React from 'react';
import FadeLoader from "react-spinners/FadeLoader";

interface ItemSpinnerInterface {
    loading: boolean
}
function ItemSpinner({ loading }: ItemSpinnerInterface) {
    return (
        <>
            <Grid display={"flex"} justifyContent={'center'} >
                <FadeLoader
                    color={"#001965"}
                    loading={loading}

                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </Grid>
        </>
    );
}

export default ItemSpinner;