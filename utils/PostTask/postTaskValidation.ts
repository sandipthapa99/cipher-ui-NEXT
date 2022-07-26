import * as Yup from "yup";

export const postTaskValidationSchema = Yup.object().shape({
    title:Yup.string().required("Required Title Field"),
    titleDescription :Yup.string().required("Required Title Description"),
    category:Yup.string().required("Required category should be selected"),
    subcategory: Yup.string().required("Required sub-category should be selected"),
    dateTime: Yup.string().required("Required date and time"),
    estimatedHour: Yup.number().required('Feild Required').min(1),
    budgetType:Yup.mixed().oneOf(['range', 'fixed']) ,
    minBudget:Yup.number().min(0).required("required"),
    maxBudget:Yup.number().max(1000000).required("required"),
    address: Yup.string().required("Required Address"),
    requirements :Yup.array().of(Yup.object().shape({id:Yup.number(), name:Yup.string()})),
    
   
})
