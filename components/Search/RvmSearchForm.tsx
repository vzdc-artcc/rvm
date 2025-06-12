'use client';
import React from 'react';
import {usePathname, useSearchParams} from "next/navigation";
import Form from "next/form";
import {Button, Grid, MenuItem, TextField} from "@mui/material";
import { Search } from '@mui/icons-material';
import {useRouter} from "next/navigation";

export default function RvmSearchForm({ facilities }: { facilities: string[] }) {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        const query = formData.get('q')?.toString() || '';
        const inFacility = formData.get('in')?.toString() || '';
        const params = new URLSearchParams(searchParams);

        params.set('q', query);
        params.set('in', inFacility === 'all' ? '' : inFacility);


        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <Form action={handleSubmit}>
            <Grid container columns={3} spacing={1}>
                <Grid size={{ sm: 2, md: 1}}>
                    <TextField fullWidth variant="filled" label="Search" name="q" placeholder="Short name OR Long name" defaultValue={searchParams.get('q') || ''} />
                </Grid>
                <Grid size={{ sm: 2, md: 1}}>
                    <TextField
                        select
                        fullWidth
                        variant="filled"
                        label="In Facility"
                        name="in"
                        defaultValue={searchParams.get('in') || 'all'}
                    >
                        <MenuItem value="all">
                            All Facilities
                        </MenuItem>
                        {facilities.map((facility) => (
                            <MenuItem key={facility} value={facility}>
                                {facility}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid size={{sm: 3, md: 1}} alignItems="center">
                    <Button type="submit" size="large" variant="contained" startIcon={<Search/>}
                            sx={{width: '100%', height: '100%'}}>Search</Button>
                </Grid>
            </Grid>
        </Form>
    );
}