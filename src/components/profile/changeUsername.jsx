import { Box, Button, Flex, InputGroup, Text, useToast } from "@chakra-ui/react"
import InputField from "../form/inputField"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Form, Formik } from "formik"
import Axios from "axios"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"


export const UsernameChange = () => {
    const data = useSelector((state) => state.user.value.username)
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const toast = useToast()
    console.log(data);

    const UsernameSchema = Yup.object().shape({
        currentUsername: Yup.string()
            .required('Your current username is required'),
        newUsername: Yup.string()
            .required("Please enter your new username")
    })

    const headers = {
        Authorization: `Bearer ${token}`
    }

    const onUser = async (data) => {
        try {
            data.FE_URL = window.location.origin
            await Axios.patch("https://minpro-blog.purwadhikabootcamp.com/api/auth/changeUsername", data, {headers})
            localStorage.removeItem("token")
            toast({
                title: "Success!",
                description: "We've sent you verification email",
                status: "success",
                duration: 1500,
                isClosable: true
            })
            setTimeout(() => {
                navigate("/loginbyname")
              }, 2000)
        } catch (err) {
            toast({
                title: "Failed!",
                description: err.response.data.err,
                status: "error",
                duration: 3500,
                isClosable: true
            })
        }
    }
    return (
        <Formik initialValues={{currentUsername: "", newUsername: ""}} validationSchema={UsernameSchema}
        onSubmit={(value, action) => {
            onUser(value)
        }}>
            {() => {
                return (
                    <Box as={Form} mt="20px">
                        <Text color="#FF4C29">Username</Text>
                        <Flex alignItems="center">
                            <InputGroup>
                                <InputField name="currentUsername" type="text" defaultValue={data} h="35px" w="300px" color="#FF4C29" placeholder="Current username" _placeholder={{color: "#FF4C29"}} _hover={{borderColor: "white"}} focusBorderColor="#FF4C29"/>
                                <InputField name="newUsername" type="text" h="35px" w="300px" color="#FF4C29" placeholder="New username" _placeholder={{color: "#FF4C29"}} _hover={{borderColor: "white"}} focusBorderColor="#FF4C29"/>
                                <Button type="submit" mt="8px" h="35px" w="150px">Submit</Button>
                            </InputGroup>
                        </Flex>
                    </Box>
                )
            }}
        </Formik>
    )
}