import { FormControl, FormErrorMessage, FormLabel, Textarea } from "@chakra-ui/react"
import { useField, Field } from "formik"


export const AreaField = ({label, ...props}) => {
    const [field, meta] = useField(props)

    return (
        <FormControl isInvalid={meta.error && meta.touched}>
            <FormLabel>{label}</FormLabel>
            <Field as={Textarea} {...field} {...props} />
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    )
}