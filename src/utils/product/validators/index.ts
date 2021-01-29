import * as yup from 'yup';

export const nameParamSchema = yup.object().shape({
    name: yup.string().strict(true).required('The property name is required'),
});

export const productSchema = yup.object().shape({
    price: yup.number().strict(true).required('The property price is required'),
    quantity: yup
        .number()
        .strict(true)
        .required('The property quantity is required'),
    ...nameParamSchema.fields,
});
