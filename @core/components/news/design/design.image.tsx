import { Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';

interface ItemInterface {
    item: any, key: number
}
function ImageDesign({ item, key }: ItemInterface) {
    return (
        <Grid key={key} item md={12} p={1}>
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item md={4} sx={{
                            position: 'relative', width: "100%", height: 250, mb: 2,
                            backgroundImage: `url(${item?.image?.url})`,
                            backgroundPosition: "center"
                        }}>
                        </Grid>
                        <Grid item md={item?.image && item?.image?.url ? 8 : 12} sx={{ pl: 3, pr: 3, position: 'relative' }}>
                            <Typography color={"primary"}>
                                {item.title}
                            </Typography>
                            <Grid display={"flex"} justifyContent={"flex-end"}>
                                <Typography sx={{
                                    fontSize: 10,
                                    mb: 1,
                                    textAlign: "right",
                                    fontStyle: 'italic'
                                }}>{item.source}</Typography>
                                <Typography sx={{
                                    fontSize: 10,
                                    mb: 1,
                                    textAlign: "right",
                                    fontStyle: 'italic'
                                }}> / {item.section_name}</Typography>
                            </Grid>
                            <Typography sx={{
                                fontSize: 12,
                                mb: 1,
                                textAlign: "right",
                                fontStyle: 'italic'
                            }}>{item.date}</Typography>

                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default ImageDesign;