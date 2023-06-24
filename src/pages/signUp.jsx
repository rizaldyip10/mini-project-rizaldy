import { EmailIcon, LockIcon, PhoneIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Alert, Box, Button, Flex, HStack, Heading, InputGroup, InputLeftElement, InputRightElement, Stack, Text, VStack, useToast } from "@chakra-ui/react"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import InputField from "../components/form/inputField"
import  Axios  from "axios"



export const SignUp = () => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const navigate = useNavigate()
    const [success, setSuccess] = useState(false)
    const { token } = useParams()
    const phoneRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const toast = useToast()

    const RegisterSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        phone: Yup.string()
            .required('Phone number is required')
            .matches(phoneRegex, 'Invalid phone number')
            .min(11),
        password: Yup.string()
            .min(6, 'Password contains minimal 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Password did not match')
            .required('Please confirm your password')
    })

    const handleSubmit = async (data) => {
        try {
            data.FE_URL = window.location.origin
            const response = await Axios.post('https://minpro-blog.purwadhikabootcamp.com/api/auth/', data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setSuccess(true)
            toast({
                title: "Success",
                description: "Success registering your account!",
                status: 'success',
                duration: 1500,
                isClosable: true,
                position: "top"
              })
              setTimeout(() => {
                navigate("/")
              }, 2000)
            console.log(response);
        }
        catch (err) {
            console.log(err);
            setSuccess(false)
            toast({
                title: "Error",
                description: err.response.data,
                status: 'error',
                duration: 3500,
                isClosable: true,
                position: "top"
              })
        }
    }
    return (
    <Formik initialValues={{username: '', email: '', phone: '', password: '', confirmPassword: ''}}
    validationSchema={RegisterSchema}
    onSubmit={(values, action) => {
        handleSubmit(values)
        if (success) {
            action.resetForm()
        }
    }}>
        {(props) => {
            return (
            <Flex as={Form} minH="100vh" align="center" justify="center" bgColor="#2C394B">
                <HStack>
                    <Alert>

                    </Alert>
                </HStack>
                <VStack>
                    <Stack textAlign="center">
                        <Heading color="white">Create your account!</Heading>
                        <Text as={Link} to="/loginbyname" color="#FF4C29">Already have an account?</Text>
                    </Stack>
                    <Box rounded='lg' bg='#082032' boxShadow='lg' p={8} mt="5px">
                        <Stack spacing={4}>
                            <InputGroup className="username-form">
                                <InputLeftElement pointerEvents="none">
                                    <Box mt="5px">
                                        <FontAwesomeIcon icon={faUser} color="#FF4C29" />
                                    </Box>
                                </InputLeftElement>
                                <InputField name="username" htmlFor="username" color="white" className="username" type="text" pl="35px" placeholder="Name or Username" _placeholder={{color: "#FF4C29"}}  h="30px" w="350px" fontSize="16px" borderColor="#FF4C29" _hover={{borderColor: "white"}} focusBorderColor="#FF4C29"/>
                            </InputGroup>
                            <InputGroup className="email-form">
                            <InputLeftElement pointerEvents="none">
                                <EmailIcon mt="5px" color="#FF4C29"/>   
                            </InputLeftElement>
                            <InputField name="email" htmlFor="email" color="white" className="email" type="email" pl="35px" placeholder="Enter your email" _placeholder={{color: "#FF4C29"}} h="30px" w="350px" fontSize="16px" borderColor="#FF4C29" _hover={{borderColor: "white"}} focusBorderColor="#FF4C29"/>
                        </InputGroup>
                        <InputGroup className="phone-form">
                            <InputLeftElement pointerEvents="none">
                                <PhoneIcon mt="5px" color="#FF4C29"/>
                            </InputLeftElement>
                            <InputField name="phone" htmlFor="phone" color="white" className="phone" type="text" pl="35px" placeholder="Enter your phone number" _placeholder={{color: "#FF4C29"}} h="30px" w="350px" fontSize="16px" borderColor="#FF4C29" _hover={{borderColor: "white"}} focusBorderColor="#FF4C29"/>
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement>
                                <LockIcon mt="5px" color="#FF4C29" />
                            </InputLeftElement>
                            <InputField name="password" htmlFor="password" color="white" className="password" type={show ? 'text' : 'password'} pl="35px" placeholder="Enter your password" _placeholder={{color: "#FF4C29"}} h="30px" w="350px" fontSize="16px" borderColor="#FF4C29" _hover={{borderColor: "white"}} focusBorderColor="#FF4C29"/>
                            <InputRightElement>
                                <Box>
                                    <Button onClick={handleClick} variant="none" color="#FF4C29" mt="5px">{show ? <ViewOffIcon /> : <ViewIcon />}</Button>
                                </Box>
                            </InputRightElement>
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement>
                                <LockIcon mt="5px" color="#FF4C29" />
                            </InputLeftElement>
                            <InputField name="confirmPassword" htmlFor="confirmPassword" color="white" className="confirmPassword" type={show ? 'text' : 'password'} pl="35px" placeholder="Re-enter your password" _placeholder={{color: "#FF4C29"}} h="30px" w="350px" fontSize="16px" borderColor="#FF4C29" _hover={{borderColor: "white"}} focusBorderColor="#FF4C29"/>
                            <InputRightElement>
                                <Box>
                                    <Button onClick={handleClick} variant="none" color="#FF4C29" mt="5px">{show ? <ViewOffIcon /> : <ViewIcon />}</Button>
                                </Box>
                            </InputRightElement>
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