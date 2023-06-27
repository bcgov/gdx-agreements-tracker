import { FormControlLabel, Radio } from '@mui/material';
import React from 'react'

export const ReportTypes = ({ values, categoriesAndTypes }: any) => {
    const selectedCategory = categoriesAndTypes.find((item: { value: any; }) => {
        return item.value === values.category
    });

    return selectedCategory.types.map((type: any) => {
        return <FormControlLabel key={type.label} value={type.value} control={<Radio />} label={type.label} />
    })

}



