import React, { useEffect } from 'react';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Field, Form, Formik, FormikHelpers } from 'formik';

interface URLParams {
    section1?: string;
    section2?: string;
    section3?: string;
}

const ReportSelector: React.FC = () => {
    const navigate = useNavigate();
    const { section1: section1Param, section2: section2Param, section3: section3Param } = useParams();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const section1Value = params.get('section1') || '';
        const section2Value = params.get('section2') || '';
        const section3Value = params.get('section3') || '';

        const initialValues: URLParams = {
            section1: section1Value || section1Param,
            section2: section2Value || section2Param,
            section3: section3Value || section3Param,
        };

        navigate(`?section1=${initialValues.section1}&section2=${initialValues.section2}&section3=${initialValues.section3}`);
    }, []);

    const handleFormSubmit = (values: URLParams, { resetForm }: FormikHelpers<URLParams>) => {
        const { section1, section2, section3 } = values;

        navigate(`?section1=${section1}&section2=${section2}&section3=${section3}`);
    };

    return (
        <Formik<URLParams>
            initialValues={{}}
            onSubmit={handleFormSubmit}
        >
            <Form>
                <Field name="section1">
                    {({ field }: any) => (
                        <RadioGroup {...field}>
                            <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
                            <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
                            <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
                        </RadioGroup>
                    )}
                </Field>

                <Field name="section2">
                    {({ field, form }: any) => (
                        <RadioGroup {...field} disabled={!form.values.section1}>
                            {form.values.section1 === 'option1' && (
                                <>
                                    <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
                                    <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
                                </>
                            )}
                            {form.values.section1 === 'option2' && (
                                <>
                                    <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
                                    <FormControlLabel value="option4" control={<Radio />} label="Option 4" />
                                </>
                            )}
                        </RadioGroup>
                    )}
                </Field>

                <Field name="section3">
                    {({ field, form }: any) => (
                        <RadioGroup {...field} disabled={!form.values.section2}>
                            {form.values.section2 === 'option1' && (
                                <>
                                    <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
                                    <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
                                </>
                            )}
                            {form.values.section2 === 'option2' && (
                                <>
                                    <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
                                    <FormControlLabel value="option4" control={<Radio />} label="Option 4" />
                                </>
                            )}
                        </RadioGroup>
                    )}
                </Field>

                <button type="submit">Submit</button>
            </Form>
        </Formik>
    );
};

export default ReportSelector;
