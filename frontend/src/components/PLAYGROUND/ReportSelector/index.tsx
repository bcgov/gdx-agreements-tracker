import React, { useState } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Card, CardContent, Button, CardActions, Typography } from '@mui/material';
import { Field, FormikProvider, useFormik } from 'formik';
import { categoriesAndTypes, categoryOptions, parameterOptions } from './reportSelectorConfig';
import Grid from '@mui/material/Unstable_Grid2';
import { RenderParameters } from "./RenderParameters"
import { useSearchParams } from 'react-router-dom';
import {handleExport} from './handleExport';



const RadioSelect = () => {
    const [typeDescription, setTypeDescription] = useState("")
    const initialValues = { date: null, category: '', type: '', exportType: '' }
    const [searchParams, setSearchParams] = useSearchParams()

    const formik = useFormik({
        onSubmit: async (values) => {
            handleExport({ values, setSearchParams, searchParams })
        },
        initialValues: initialValues,
    });

    const { setFieldValue, values, handleSubmit, resetForm } = formik

    const handleCategoryChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setFieldValue('category', event.target.value)
        setFieldValue('type', "")
        setTypeDescription('')
    };


    const handleTypeChange = (event: { target: { value: string }; }) => {
        const targetObject = categoriesAndTypes[values.category].find((categoryObj: { value: string; }) => categoryObj.value === event.target.value);
        setTypeDescription(targetObject.description);
        setFieldValue('type', event.target.value)
    };

    const handleExportType = (exportType: string) => {
        setFieldValue(exportType, exportType)
    }
    return (
        <> <FormikProvider value={formik}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid xs={12} sm={6} md={6} >
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography color="text.secondary" gutterBottom>
                                    Category
                                </Typography>
                                <FormControl component="fieldset">
                                    <RadioGroup name="category" value={values.category} onChange={handleCategoryChange}>
                                        {categoryOptions.map((category: string) => {
                                            return <FormControlLabel value={category} control={<Radio />} label={category} />
                                        })}
                                    </RadioGroup>
                                </FormControl>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs={12} sm={6} md={6}>
                        {values.category && (
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography color="text.secondary" gutterBottom>
                                        Type
                                    </Typography>
                                    <FormControl component="fieldset">
                                        <RadioGroup name="type" value={values.type} onChange={handleTypeChange}>
                                            {categoriesAndTypes[values.category].map((option: { label: string, value: unknown }) => (
                                                <FormControlLabel key={option.label} value={option.value} control={<Radio />} label={option.label} />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </CardContent>
                            </Card>
                        )}
                    </Grid>
                    <Grid xs={12} sm={12} md={12}>

                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography color="text.secondary" gutterBottom>
                                    Description
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {typeDescription}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs={12} sm={12} md={12}>
                        {values.type && (
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography color="text.secondary" gutterBottom>
                                        Parameters
                                    </Typography>

                                    {parameterOptions[values.type] &&
                                        parameterOptions[values.type].parameters.map((parameterName: any) => {
                                            { return RenderParameters(parameterName, values, setFieldValue) }
                                        })}
                                    <CardActions>
                                        <Button variant="contained" type="submit" onClick={() => { handleExportType("xlsx") }} >Export xls</Button>
                                        <Button variant="contained" type="submit" onClick={() => { handleExportType("pdf") }}>Export pdf</Button>
                                    </CardActions>
                                </CardContent>
                            </Card>
                        )
                        }
                    </Grid>
                </Grid>
            </form>
        </FormikProvider>
        </ >
    );
};

export default RadioSelect;
