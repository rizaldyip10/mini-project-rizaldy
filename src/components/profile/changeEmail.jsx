import { Box, Button, Flex, InputGroup, Text } from "@chakra-ui/react"
import InputField from "../form/inputField"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Form, Formik } from "formik"
import Axios from "axios"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"


export const EmailChange = () => {
    const data = useSelector((state) => state.user.value.email)
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    console.log(data);

    const EmailSchema = Yup.object().shape({
        currentEmail: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        newEmail: Yup.string()
            .email('Email is invalid')
            .required('Email is required')
    })

    const headers = {
        Authorization: `Bearer ${token}`
    }

    const onEmail = async (data) => {
        try {
            const response = await Axios.patch("https://minpro-blog.purwadhikabootcamp.com/api/auth/changeEmail", data, {headers})
            console.log(response);
            localStorage.removeItem("token")
            navigate("/login")
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <Formik initialValues={{currentEmail: "", newEmail: ""}} validationSchema={EmailSchema}
        onSubmit={(value, action) => {
            onEmail(value)
        }}>
            {() => {
                return (
                    <Box as={Form} mt="20px">
                        <Text>Email</Text>
                        <Flex alignItems="center">
                            <InputGroup>
                                <InputField name="currentEmail" type="text" defaultValue={data} h="35px" w="300px" color="#FF4C29" placeholder="Current email" _placeholder={{color: "#FF4C29"}} _hover={{borderColor: "white"}} focusBorderColor="#FF4C29"/>
                                <InputField name="newEmail" type="text" h="35px" w="300px" color="#FF4C29" placeholder="New email" _placeholder={{color: "#FF4C29"}} _hover={{borderColor: "white"}} focusBorderColor="#FF4C29"/>
                                <Button type="submit" mt="8px" h="35px" w="150px">Submit</Button>
                            </InputGroup>
                        </Flex>
                    </Box>
                )
            }}
        </Formik>
    )
}