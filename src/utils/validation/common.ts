import * as yup from 'yup';

export const idParamSchema = yup.object().shape({
    id: yup.string().length(24).strict(true).required('The property id is required'),
});
