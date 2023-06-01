import { Box, Button, Checkbox, Fade, FormControlLabel, FormGroup, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function FilterItem({ title, options, setFilterOption, key_name }: ItemInterface) {
    const [open, setOpen] = useState(true);
    const [selectedItems, setSelectedItems] = useState([] as string[]
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
        let options = selectedItems;
        if (event.target.checked) {
            options.push(value);
        } else {
            options = options.filter(function (option) {
                return option != value
            })
        }
        setSelectedItems(
            options
        );

        setFilterOption(key_name, options);
    }


    return (
        <Paper sx={{ m: 1 }} elevation={1}>
            <Button endIcon={open ? <KeyboardArrowUpIcon /> : <ExpandMoreIcon />}
                sx={{ width: "100%", "&:hover": { backgroundColor: "transparent", } }} onClick={() => { setOpen(!open) }}>
                <Typography
                    variant='h6'
                    color={"primary"}
                    sx={{ fontFamily: "Apis-Bold", textAlign: 'left', width: "100%" }}>
                    {title}
                </Typography>
            </Button>

            {open ? <>
                <Fade in={open}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(open ? { timeout: 1000 } : {})}
                >
                    <Box component={"div"}>
                        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', pl: 1, pr: 1 }}>
                            <List>
                                {options?.map((item: OptionInterface, index: number) => (
                                    <ListItem key={index} disablePadding>
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox onChange={(e) => { handleChange(e, item.id) }} />} label={item.title} />
                                        </FormGroup>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Box>
                </Fade>
            </> : null}
        </Paper>
    );
}

export default FilterItem;