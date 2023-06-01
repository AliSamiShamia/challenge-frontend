import React, { useEffect, useState } from 'react';
import { Layout } from '../../@core/components/common/layout';
import BannerImage from '../../@core/components/common/coloredBanner';
import { get, post } from '../../handler';
import { useSession } from 'next-auth/react';
import authConfig from '../../@core/config/auth'
import { Button, Card, CardContent, Checkbox, FormControlLabel, FormGroup, Grid, List, ListItem, Typography } from '@mui/material';
import ItemSpinner from '../../@core/components/common/itemSpinner';

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

function Preference() {

    const { data: session, status } = useSession();
    const [sources, setSources] = useState([]);
    const [myCategories, setMyCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    //
    const [preferenceList, setPreferenceList] = useState([]);

    const init = async () => {
        try {
            setLoading(true)
            let res = await get(authConfig.preference, session?.user?.token) as ResponseInterface;
            if (res && res.status_code == 200) {
                initData(res.data);
            }
            setLoading(false);
        } catch (e) {
            setLoading(false);
        }
    }

    const initData = (data: any) => {
        setSources(data.sources);
        // Sources  
        data?.sources?.forEach((item: any) => {
            if (item.selected) {
                handleChange(true, "sources", item.id);
            }
        });
        //Categories
        setMyCategories(data.categories);
        data?.categories?.forEach((item: any) => {
            handleChange(true, "categories", item);
        });
    }

    useEffect(() => {
        if (session?.user) {
            init();
        }
    }, [status]);

    const submit = async () => {
        try {
            setLoading(true)
            let res = await post(authConfig.preference, preferenceList, session?.user?.token) as ResponseInterface;
            if (res && res.status_code == 200) {
                setLoading(false);
                initData(res.data);
            } else {
                setLoading(false);
            }
        } catch (e) {
            setLoading(false);
        }
    }

    const handleChange = (checked: boolean, key: string, value: any) => {
        let data = preferenceList[key] ? preferenceList[key] : []
        if (checked) {
            data.push(value);
        } else {
            data = data.filter((item: any) => item != value)
        }
        setPreferenceList({
            ...preferenceList,
            [key]: data
        });
    }

    return (
        <Layout page={'preferance'} head={"Preferance"}>
            <BannerImage
                sx={{
                    minHeight: { xl: "100vh ", md: "100vh", xs: "100%" },
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                }}
            >
                <Grid container maxWidth={'md'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item md={12} >
                        {loading ? <>
                            <Grid sx={{ height: "100%" }} display={'flex'} justifyContent={"center"} alignItems={"center"}>
                                <ItemSpinner loading={loading} />
                            </Grid>
                        </> : <>
                            <Card>
                                <CardContent>
                                    <Typography
                                        sx={{ fontFamily: "Apis-Bold", }}
                                        color={"primary"}>
                                        Sources
                                    </Typography>
                                    <List sx={{ p: 3 }}>
                                        {sources?.map((item: any, index: number) => (
                                            <ListItem key={index} disablePadding>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox defaultChecked={item.selected} onChange={(e) => { handleChange(e.target.checked, "sources", item.id) }} />} label={item.title} />
                                                </FormGroup>
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>
                            <Card sx={{ mt: 2 }}>
                                <CardContent>
                                    <Typography
                                        sx={{ fontFamily: "Apis-Bold", }}
                                        color={"primary"}>
                                        Categories
                                    </Typography>
                                    <List sx={{ p: 3 }}>
                                        {categories?.map((item: OptionInterface, index: number) => (
                                            <ListItem key={index} disablePadding>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox defaultChecked={myCategories.some(val => val === item.id)}
                                                        onChange={(e) => { handleChange(e.target.checked, "categories", item.id) }} />} label={item.title} />
                                                </FormGroup>
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>
                            <Grid mt={1} display={'flex'} justifyContent={"center"}>
                                {submitLoading ? (<>
                                    <ItemSpinner loading={submitLoading} />
                                </>) : (
                                    <>
                                        <Button variant='contained' onClick={submit} color='primary' size='large' sx={{}} >
                                            Save
                                        </Button>
                                    </>)
                                }
                            </Grid>
                        </>}

                    </Grid>
                </Grid>
            </BannerImage>
        </Layout>
    );
}

export default Preference;

Preference.auth = true
