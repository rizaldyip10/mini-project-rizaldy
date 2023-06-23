import { EmailIcon, LockIcon, PhoneIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Alert, AlertDescription, AlertIcon, Box, Button, Flex,  Heading, InputGroup, InputLeftElement, InputRightElement, Stack, Text, VStack } from "@chakra-ui/react"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import InputField from "../components/form/inputField"
import  Axios  from "axios"


export const ResetPass = () => {
    const { token } = useParams()
    const [success, setSuccess] = useState(false)
    const ResetSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
    })

    const onReset = async (data) => {
        try {
            const response = await Axios.put('https://minpro-blog.purwadhikabootcamp.com/api/auth/forgotPass', data)
            setSuccess(true)
            console.log(response);
        } catch (err) {
            setSuccess(false)
            alert(err.response.data);
        }
    }
    return (
        <Formik initialValues={{email: ""}} validationSchema={ResetSchema}
        onSubmit={(value, action) => {
            onReset(value)
            if(success) {
                action.resetForm()
            }

        }}>
            {(props) => {
                return(
                    <Flex as={Form} minH="100vh" align="center" justify="center" bgColor="#2C394B">
                        <VStack>
                            <Stack textAlign="center">
                                <Heading>Reset your password</Heading>
                                <Text color="#FF4C29">We'll send you an email to chnage your password</Text>
                            </Stack>
                            <Flex justifyContent="space-between" color="#FF4C29" mt="20px">
                                <Text as={Link} to="/loginbyname" color="#FF4C29">Already have an account?</Text>
                            </Flex>
                            <Box rounded='lg' bg='#082032' boxShadow='lg' p={8} mt="5px">
                                <Stack spacing={4}>
                                    <InputGroup className="username-form">
                                        <InputLeftElement pointerEvents="none">
                                            <Box mt="5px">
                                                <EmailIcon color="#FF4C29" mb="3px" />
                                            </Box>
                                        </InputLeftElement>
                                        <InputField name="email" htmlFor="email" className="email" type="text" pl="35px" placeholder="Enter your email" _placeholder={{color: "#FF4C29"}}  h="30px" w="350px" fontSize="16px" borderColor="#FF4C29" _hover={{borderColor: "white"}} focusBorderColor="#FF4C29"/>
                                    </InputGroup>
                                    
                                </Stack>
                                <Button type="submit" bgColor="#FF4C29" color="#082032" _hover={{bgColor: "white"}} _active={{transform: "scale(1.1)"}} w="350px" mt="20px">Submit</Button>
                            </Box>
                        </VStack>
                    </Flex>
                )
            }}
        </Formik>
    )
}