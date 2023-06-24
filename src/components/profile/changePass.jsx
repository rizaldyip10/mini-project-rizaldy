import { Box, Button, Flex, InputGroup, InputRightElement, Text, VStack, useToast } from "@chakra-ui/react"
import InputField from "../form/inputField"
import { useState } from "react"
import { Form, Formik } from "formik"
import Axios from "axios"
import * as Yup from "yup"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { useNavigate } from "react-router-dom"


export const PasswordChange = () => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const toast = useToast()

    const PasswordSchema = Yup.object().shape({
        currentPassword: Yup.string()
            .min(6, 'Password contains minimal 6 characters')
            .required('Password is required'),
        password: Yup.string()
            .min(6, 'Password contains minimal 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Password did not match')
            .required('Please confirm your password')
    })

    const headers = {
        Authorization: `Bearer ${token}`
    }

    const onPass = async (data) => {
        try {
            data.FE_URL = window.location.origin
            const response = await Axios.patch("https://minpro-blog.purwadhikabootcamp.com/api/auth/changePass", data, {headers})
            localStorage.removeItem("token")
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
            console.log(response);
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
        <Formik initialValues={{currentPassword: "", password: "", confirmPassword: ""}} validationSchema={PasswordSchema}
        onSubmit={(value, action) => {
            onPass(value)
            console.log(value);
        }}>
            {() => {
                return (
                    <Box as={Form} mt="20px">
                        <Text color="#FF4C29">Password</Text>
                        <Flex alignItems="center">
                            <VStack>
                                <InputGroup>
                                <InputField name="currentPassword" type={show ? 'text' : 'password'} h="35px" w="300px" color="#FF4C29" placeholder="Current password" _placeholder={{color: "#FF4C29"}} _hover={{borderColor: "white"}} focusBorderColor="#FF4C29"/>
                                    <InputRightElement>
                                        <Button onClick={handleClick} variant="none" mt="10px">
                                            {show ? <ViewOffIcon color="#FF4C29" /> : <ViewIcon color="#FF4C29" />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <InputGroup>
                                <InputField name="password" type={show ? 'text' : 'password'} h="35px" w="300px" color="#FF4C29" placeholder="New password" _placeholder={{color: "#FF4C29"}} _hover={{borderColor: "white"}} focusBorderColor="#FF4C29"/>
                                    <InputRightElement>
                                        <Button onClick={handleClick} variant="none" mt="10px">
                                            {show ? <ViewOffIcon color="#FF4C29" /> : <ViewIcon color="#FF4C29" />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <InputGroup>
                                <InputField name="confirmPassword" type={show ? 'text' : 'password'} h="35px" w="300px" color="#FF4C29" placeholder="Confirm new password" _placeholder={{color: "#FF4C29"}} _hover={{borderColor: "white"}} focusBorderColor="#FF4C29"/>
                                    <InputRightElement>
                                        <Button onClick={handleClick} variant="none" mt="10px">
                                            {show ? <ViewOffIcon color="#FF4C29" /> : <ViewIcon color="#FF4C29" />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <Button type="submit" mt="8px" h="35px" w="150px">Submit</Button>
                            </VStack>
                        </Flex>
                    </Box>
                )
            }}
        </Formik>
    )
}