import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';


interface ItemInterface {
    item: any, key: number
}
function TextDesign({ item, key }: ItemInterface) {
    return (
        <Grid key={key} item md={6} p={1}>
            <Card>
                <CardContent>
                    <Grid sx={{ minHeight: 100 }}>
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
                            }}>/{item.section_name}</Typography>
                        </Grid>
                        <Typography sx={{
                            fontSize: 12,
                            mb: 1,
                            textAlign: "right",
                            fontStyle: 'italic'
                        }}>{item.date}</Typography>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default TextDesign;