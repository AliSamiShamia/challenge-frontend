import { Button, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { get } from '../../../../handler';
import authConfig from '../../../config/auth'
import { useSession } from 'next-auth/react';
import FilterItem from './item.filter';

import ItemSpinner from '../../common/itemSpinner';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment';

const categories = [
    {
        id: "arts",
        title: "Arts"
    },

    {
        id: "books",
        title: "Books"
    },
    {
        id: "business",
        title: "Business"
    },
    {
        id: "food",
        title: "Food"
    },
    {
        id: "law",
        title: "Law"
    },
    {
        id: "movies",
        title: "Movies"
    },
    {
        id: "sports",
        title: "Sports"
    },
    {
        id: "education",
        title: "Education"
    },
    {
        id: "learning",
        title: "Learning"
    },
    {
        id: "magazine",
        title: "Magazine"
    },
    {
        id: "opinion",
        title: "Opinion"
    },
    {
        id: "science",
        title: "Science"
    },
    {
        id: "U.S.",
        title: "U.S."
    },
    {
        id: "football",
        title: "Football"
    },
]
interface Props {
    window?: () => Window;
    search: boolean,
    setSearch: (status: boolean) => void,
    submit: (url: string) => void,
    setQueryString: (url: string) => void,
    queryString: string
}

function FilterList(props: Props) {

    const { window } = props;
    const container = window !== undefined ? () => window().document.body : undefined;
    const [startDate, setStartDate] = useState(moment());
    const [endDate, setEndDate] = useState(moment());

    const { data: session, status } = useSession();
    const [sources, setSources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterList, setFilterList] = useState({});

    const handleDrawerToggle = () => {
        props.setSearch(!props.search);
    };

    const prepareFilter = async () => {
        let data = {
            ...filterList,
            begin_date: (startDate.format("YYYY") + "-" + (startDate.format("MM")) + "-" + startDate.format("DD")).toString(),
            end_date: endDate.format("YYYY") + "-" + (endDate.format("MM")) + "-" + endDate.format("DD"),
        }
        const queryString = Object.keys(data)
            .map((key: string) => {
                return `${key}=${encodeURIComponent(data[key])}`;
            })
            .join('&'); //join final result with '&'

        props.submit(queryString);
    }

    const init = async () => {
        try {
            let queryString = props.queryString.split("&");
            setLoading(true)
            let res = await get(authConfig.sources, session?.user?.token ?? null) as ResponseInterface;
            if (res && res.status_code == 200) {
                setSources(res.data);
            }
            setLoading(false);
        } catch (e) {
            setLoading(false);
        }
    }

    const handleChange = (key: string, value: any) => {
        setFilterList({
            ...filterList,
            [key]: value
        });
    }



    useEffect(() => {
        init();
    }, [])

    return (
        <Grid sx={{ position: "relative", width: "100%", minHeight: "auto", }}>
            <Grid
                sx={{
                    position: 'relative',
                    backgroundColor: 'white',
                    // display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: "80%" },
                }}>

                <Drawer
                    container={container}
                    variant="temporary"
                    open={props.search}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}

                >
                    {loading ? <>
                        <Grid sx={{ height: "100%" }} display={'flex'} justifyContent={"center"} alignItems={"center"}>
                            <ItemSpinner loading={loading} />
                        </Grid>
                    </> : <>
                        <Typography color={'primary'}
                            sx={{
                                fontSize: 22,
                                textAlign: 'center',
                                mb: 1,
                            }}
                        >
                            Filter List
                        </Typography>
                        <Grid mt={5}>
                            <TextField fullWidth
                                label={"keywords"}
                                variant="outlined"
                                name='q'
                                onChange={(event: any) => {
                                    handleChange('q', event.target.value);
                                }}
                            />
                        </Grid>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <Grid mt={3}>
                                <DatePicker
                                    value={startDate}
                                    maxDate={(endDate)}
                                    onChange={
                                        (newValue, context) => {
                                            if (context.validationError == null) {
                                                setStartDate(moment(newValue))
                                            }
                                        }}
                                />
                            </Grid>
                            <Grid mt={3}>

                                <DatePicker
                                    value={endDate}
                                    minDate={(startDate)}
                                    onChange={(newValue, context) => {
                                        if (context.validationError == null) {
                                            setEndDate(moment(newValue))
                                        }
                                    }}
                                />
                            </Grid>
                        </LocalizationProvider>
                        <Grid mt={3}>
                            <FilterItem title={"Sources"} options={sources} setFilterOption={handleChange} key_name='sources' />
                        </Grid>
                        <Grid mt={3}>
                            <FilterItem title={"Categories"} options={categories} setFilterOption={handleChange} key_name='section_name' />
                        </Grid>
                        <Grid sx={{ backgroundColor: 'white', pt: 2, pb: 2, width: '100%' }} display={'flex'} justifyContent={"center"} alignItems={"center"}>
                            <Button onClick={prepareFilter} endIcon={<FilterAltIcon />} variant='contained'>
                                Filter
                            </Button>
                        </Grid>

                    </>
                    }
                </Drawer>
            </Grid>
            {/* <Grid
                sx={{
                    position: 'relative',
                    backgroundColor: 'white',
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: size.width * .2, minWidth: 230, maxWidth: 300, },
                }}>
                <Grid sx={{ height: "100%", minHeight: 300, p: 1 }} >

                    {loading ? <>
                        <Grid sx={{ height: "100%" }} display={'flex'} justifyContent={"center"} alignItems={"center"}>
                            <ItemSpinner loading={loading} />
                        </Grid>
                    </> : <>
                        <Typography color={'primary'}
                            sx={{
                                fontSize: 22,
                                textAlign: 'center',
                                mb: 1,
                            }}
                        >
                            Filter List
                        </Typography>
                        <Grid mt={5}>
                            <TextField fullWidth
                                label={"keywords"}
                                variant="outlined"
                                name='q'
                                onChange={(event: any) => {
                                    handleChange('q', event.target.value);
                                }}
                            />
                        </Grid>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <Grid mt={3}>
                                <DatePicker
                                    value={startDate}
                                    maxDate={(endDate)}
                                    onChange={
                                        (newValue, context) => {
                                            if (context.validationError == null) {
                                                setStartDate(moment(newValue))
                                            }
                                        }}
                                />
                            </Grid>
                            <Grid mt={3}>

                                <DatePicker
                                    value={endDate}
                                    minDate={(startDate)}
                                    onChange={(newValue, context) => {
                                        if (context.validationError == null) {
                                            setEndDate(moment(newValue))
                                        }
                                    }}
                                />
                            </Grid>
                        </LocalizationProvider>
                        <Grid mt={3}>
                            <FilterItem title={"Sources"} options={sources} setFilterOption={handleChange} key_name='sources' />
                        </Grid>
                        <Grid mt={3}>
                            <FilterItem title={"Categories"} options={categories} setFilterOption={handleChange} key_name='section_name' />
                        </Grid>
                        <Grid sx={{ backgroundColor: 'white', pt: 2, pb: 2, width: '100%' }} display={'flex'} justifyContent={"center"} alignItems={"center"}>
                            <Button onClick={prepareFilter} endIcon={<FilterAltIcon />} variant='contained'>
                                Filter
                            </Button>
                        </Grid>

                    </>
                    }
                </Grid>
            </Grid> */}
        </Grid>

    );
}

export default FilterList;

