import { FormInput } from 'components/FormInput';
import React from 'react'

export const ReportParameters = ({ values, setFieldValue, categoriesAndTypes }: any) => {
    const renderComponent = (parameterName: string) => {
        switch (parameterName) {
            case 'fiscal':
                return (
                    <FormInput
                        fieldName="fiscal"
                        fieldType={'select'}
                        fieldLabel="Fiscal"
                        width={'half'}
                        pickerName='fiscal_year_option'
                        fieldValue={values.fiscal}
                        setFieldValue={setFieldValue}

                    />
                );

            case 'portfolio':
                return (
                    <FormInput
                        fieldName="portfolio"
                        fieldType={'multiselect'}
                        fieldLabel="Portfolio"
                        width={'half'}
                        pickerName='portfolio_option'
                        fieldValue={values.portfolio}
                        setFieldValue={setFieldValue}

                    />
                );

            case 'contract':
                return (
                    <FormInput
                        fieldName="contract"
                        fieldType={'select'}
                        fieldLabel="Contract"
                        width={'half'}
                        pickerName='contract_option'
                        fieldValue={values.contract}
                        setFieldValue={setFieldValue}
                    />
                );
            case 'date':
                return (
                    <FormInput
                        fieldName="date"
                        fieldType={'date'}
                        fieldLabel="Date"
                        width={'half'}
                        fieldValue={values.date}
                        setFieldValue={setFieldValue}
                    />
                );

            case 'quarter':
                return (
                    <FormInput
                        fieldName="quarter"
                        fieldType={'select'}
                        fieldLabel="Quarter"
                        width={'half'}
                        tableName='generic'
                        fieldValue={values.quarter}
                        setFieldValue={setFieldValue}

                    />
                )
            case 'project':
                return (
                    <FormInput
                        fieldName="project"
                        fieldType={'select'}
                        fieldLabel="Project"
                        width={'half'}
                        pickerName='project_option'
                        fieldValue={values.project}
                        setFieldValue={setFieldValue}
                    />
                )
        }
    }
    const selectedCategory = categoriesAndTypes.find((item: { value: any; }) => {
        return item.value === values.category
    });
    const selectedType = selectedCategory.types.find((item: { value: any; }) => {
        return item.value === values.type
    });

    return selectedType.parameters.map((parameterName: any) => {
        return renderComponent(parameterName)
    })

};

