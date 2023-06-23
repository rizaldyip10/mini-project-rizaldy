import { FormControl, FormErrorMessage, FormLabel, Select } from "@chakra-ui/react"
import { Field, useField } from "formik"


export const SelectField = ({label, ...props}) => {
    const [field, meta] = useField(props)
    return (
        <FormControl isInvalid={meta.error && meta.touched}>
            <FormLabel>{label}</FormLabel>
            <Field as={Select} {...field} {...props} />
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    )
}