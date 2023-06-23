import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { Field, useField } from "formik";
  
const InputField2 = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
    <FormControl isInvalid={meta.error && meta.touched}>
        <FormLabel>{label}</FormLabel>
        <Input as={Input} {...field} {...props} />
        <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
    );
};

export default InputField2