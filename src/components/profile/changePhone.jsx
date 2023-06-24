import { Box, Button, Flex, InputGroup, Text } from "@chakra-ui/react"
import InputField from "../form/inputField"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Form, Formik } from "formik"
import Axios from "axios"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"


export const PhoneChange = () => {
    const data = useSelector((state) => state.user.value.phone)
    const token = localStorage.getItem("token")
    const phoneRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const navigate = useNavigate()
    console.log(data);

    const PhoneSchema = Yup.object().shape({
        currentPhone: Yup.string()
            .required('Phone number is required')
            .matches(phoneRegex, 'Invalid phone number')
            .min(11),
        newPhone: Yup.string()
            .required('Phone number is required')
            .matches(phoneRegex, 'Invalid phone number')
            .min(11),
    })

    const headers = {
        Authorization: `Bearer ${token}`
    }

    const onPhone = async (data) => {
        try {
            const response = await Axios.patch("https://minpro-blog.purwadhikabootcamp.com/api/auth/changePhone", data, {headers})
            navigate("/profile")
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <Formik initialValues={{currentPhone: "", newPhone: ""}} validationSchema={PhoneSchema}
        onSubmit={(value, action) => {
            onPhone(value)
        }}>
            {() => {
                return (
                    <Box as={Form} mt="20px">
                        <Text color="#FF4C29">Phone number</Text>
                        <Flex alignItems="center">
                            <InputGroup>
                                <InputField name="currentPhone" type="text" defaultValue={data} h="35px" w="300px" color="#FF4C29" placeholder="Current phone number" _placeholder={{color: "#FF4C29"}} _hover={{borderColor: "white"}} focusBorderColor="#FF4C29"/>
                                <InputField name="newPhone" type="text" h="35px" w="300px" color="#FF4C29" placeholder="New phone number" _placeholder={{color: "#FF4C29"}} _hover={{borderColor: "white"}} focusBorderColor="#FF4C29"/>
                                <Button type="submit" mt="8px" h="35px" w="150px">Submit</Button>
                            </InputGroup>
                        </Flex>
                    </Box>
                )
            }}
        </Formik>
    )
}