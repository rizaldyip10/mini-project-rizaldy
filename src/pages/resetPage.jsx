import { LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, Heading, InputGroup, InputLeftElement, InputRightElement, Stack, Text, VStack, useToast } from "@chakra-ui/react"
import  Axios  from "axios"
import * as Yup from "yup"
import { Form, Formik } from "formik"
import { useNavigate, useParams } from "react-router-dom"
import InputField from "../components/form/inputField"
import { useState } from "react"


export const ResetPage = () => {
    const { resetToken } = useParams()
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const toast = useToast()
    console.log(resetToken);

    const PasswordResetSchema = Yup.object().shape({
        password: Yup.string()
            .min(6, 'Password contains minimal 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Password did not match')
            .required('Please confirm your password')
    })

    const PassReset = async (data) => {
        try {
            console.log(data);
            const response = await Axios.patch('https://minpro-blog.purwadhikabootcamp.com/api/auth/resetPass', data, {
                headers: {
                    "Authorization": `Bearer ${resetToken}`
                }
            })
            setSuccess(true)
            toast({
                title: "Success",
                description: "Successfuly reset password!",
                status: 'success',
                duration: 1500,
                isClosable: true
              })
              setTimeout(() => {
                navigate("/login")
              }, 2000)
            console.log(response);
        } catch (err) {
            console.log(err);
            setSuccess(false)
            toast({
                title: "Error",
                description: err.response.data,
                status: 'error',
                duration: 3500,
                isClosable: true
              })
        }
    }
    return (
        <Formik initialValues={{password: '', confirmPassword: ''}} validationSchema={PasswordResetSchema}
        onSubmit={(value, action) => {
            PassReset(value)
            if(success) {
                action.resetForm()
            }
        }}>
            {(props) => {
                return (
                    <Flex as={Form} minH="100vh" align="center" justify="center" bgColor="#2C394B">
                        <VStack>
                            <Stack textAlign="center">
                                <Heading>Reset your password</Heading>
                                <Text color="#FF4C29">Enter your new password</Text>
                            </Stack>
                            <Box rounded="lg" bgColor="#082032" boxShadow='lg' p={8} mt="5px">
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
                        <Button type="submit" bgColor="#FF4C29" color="#082032" _hover={{bgColor: "white"}} _active={{transform: "scale(1.1)"}} w="350px" mt="20px">Submit</Button>
                            </Box>
                        </VStack>
                    </Flex>
                )
            }}
        </Formik>
    )
}