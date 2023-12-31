import { Box, Button, Flex, InputGroup, Text, useToast } from "@chakra-ui/react"
import InputField from "../form/inputField"
import { useSelector } from "react-redux"
import { Form, Formik } from "formik"
import Axios from "axios"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"


export const EmailChange = () => {
    const data = useSelector((state) => state.user.value.email)
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const toast = useToast()
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
            data.FE_URL = window.location.origin
            const response = await Axios.patch("https://minpro-blog.purwadhikabootcamp.com/api/auth/changeEmail", data, {headers})
            console.log(response);
            localStorage.removeItem("token")
            toast({
                title: "Success!",
                description: "We've sent you verification email",
                status: "success",
                duration: 1500,
                isClosable: true,
                position: "top"
            })
            setTimeout(() => {
                navigate("/loginbyname")
              }, 2000)
        } catch (err) {
            console.log(err);
            toast({
                title: "Failed!",
                description: err.response.data.err,
                status: "error",
                duration: 3500,
                isClosable: true,
                position: "top"
            })
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
                        <Text color="#FF4C29">Email</Text>
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