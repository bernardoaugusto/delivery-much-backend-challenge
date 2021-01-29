import * as yup from 'yup';

export const orderCreateSchema = yup.object().shape({
    products: yup
        .array()
        .of(
            yup.object().shape({
                name: yup
                    .string()
                    .strict(true)
                    .required('The property name is required'),
                quantity: yup
                    .number()
                    .strict(true)
                    .required('The property quantity is required'),
            }),
        )
        .required('The property products is required'),
});
