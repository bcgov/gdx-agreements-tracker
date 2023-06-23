import React, { useState } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Card, CardContent, Button, CardActions, Typography } from '@mui/material';
import { Form, Formik, FormikProvider, useFormik } from 'formik';
import { categoriesAndTypes, categoryOptions, parameterOptions } from './reportSelectorConfig';
import Grid from '@mui/material/Unstable_Grid2';
import { RenderParameters } from "./RenderParameters"
import { useSearchParams } from 'react-router-dom';



const RadioSelect = () => {
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [typeDescription, setTypeDescription] = useState("")
    const [fileType, setFileType] = useState("")
    const initialValues = { date: null }

    const formik = useFormik({
        onSubmit: async (values) => {
            handleExport(values)
        },
        initialValues: initialValues,
    });
    const { resetForm, handleSubmit, setFieldValue, values } = formik

    //TODO: This state is for a future ticket where we will incorparte the url for running reports
    //
    //example use case useState(searchParams.get('category'));
    const [searchParams, setSearchParams] = useSearchParams()


    const handleCategoryChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setCategory(event.target.value);
        setType('');
        setTypeDescription('')
        resetForm()
    };


    const handleTypeChange = (event: { target: { value: string }; }) => {
        const selectedType = event.target.value;
        setTypeDescription(parameterOptions[selectedType].description);
        setType(event.target.value);
        resetForm()
    };
    //TODO: This Function is for a future ticket where we will incorparte the url for running reports
    //
    // const handleParameterChange = (parameterName: any, value: any) => {
    //     setSearchParams((prevState: any) => {
    //         console.log('prevState', prevState)
    //         return ({
    //             ...prevState,
    //             [parameterName]: value,
    //         })
    //     });
    // };
    const handleExport = (values: any) => {
        // var search = new URLSearchParams(ids.map(s=>['id',s]))
        setSearchParams(() => {
            // for (const [key, value] of Object.entries(values)) {
            //     if (typeof value === 'object') {

            //     }
            //     return `${key}: ${value}`
            // }
            // return {}
            Object.keys(values).forEach(function (key) { values[key] = "redacted" });
            return values;
        })




        const querystringParams = new URLSearchParams();
        console.log('querystringParams', querystringParams)
        console.log('values', values)
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid xs={12} sm={6} md={6} >
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography color="text.secondary" gutterBottom>
                                Category
                            </Typography>
                            <FormControl component="fieldset">
                                <RadioGroup name="category" value={category} onChange={handleCategoryChange}>
                                    {categoryOptions.map((category: string) => {
                                        return <FormControlLabel value={category} control={<Radio />} label={category} />
                                    })}
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                    </Card>

                </Grid>
                <Grid xs={12} sm={6} md={6}>
                    {category && (
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography color="text.secondary" gutterBottom>
                                    Type
                                </Typography>
                                <FormControl component="fieldset">
                                    <RadioGroup name="type" value={type} onChange={handleTypeChange}>
                                        {categoriesAndTypes[category].map((option: any) => (
                                            <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
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
                    {type && (
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography color="text.secondary" gutterBottom>
                                    Parameters
                                </Typography>
                                <FormikProvider value={formik}>
                                    <form onSubmit={handleSubmit}>
                                        {parameterOptions[type] &&
                                            parameterOptions[type].parameters.map((parameterName: any) => {
                                                { return RenderParameters(parameterName, values, setFieldValue) }
                                            })}

                                        <CardActions>
                                            <Button variant="contained" type="submit">Export xls</Button>
                                            <Button variant="contained" type="submit">Export pdf</Button>
                                        </CardActions>
                                    </form>
                                </FormikProvider>

                            </CardContent>

                        </Card>
                    )
                    }
                </Grid>
            </Grid>
        </ >
    );
};

export default RadioSelect;
