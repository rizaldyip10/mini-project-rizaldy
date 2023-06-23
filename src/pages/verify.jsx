import { Flex, VStack, Heading, Text, Spinner, HStack, Button } from "@chakra-ui/react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Axios from 'axios'
import { Formik } from "formik"


export const VerifyPage = () => {
    const { token } = useParams() 
    const navigate = useNavigate()
    const header = {
        Authorization: `Bearer ${token}`
    }
    const getVerified = async () => {
        try {
            const response = await Axios.patch('https://minpro-blog.purwadhikabootcamp.com/api/auth/verify', {}, {headers: header})
            navigate('/loginbyname')
            console.log(response);
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <Formik>
            <Flex justifyContent="center" h="100vh" bgColor="#2C394B">
            <Flex w="400px" h="200px" color="#FF4C29" justifyContent="center" p="20px" borderRadius="20px"
            boxShadow="2px 2px 10px black" bgColor="#082032" margin="auto">
                <VStack>
                    <VStack>
                        <Heading fontSize="28px">Please verify your account</Heading>
                        <Text>Click to verify your account</Text>
                    </VStack>
                    <Button type="button" onClick={getVerified} mt="30px" bgColor="#FF4c29" color="#082032" _hover={{transform: "scale(1.1)"}} _active={{bgColor: "white"}}>Verify</Button>
                    {/* <HStack mt="30px">
                        <Spinner mr="10px" size="md" />
                        <Text>Check your email</Text>
                    </HStack> */}
                </VStack>
            </Flex>
        </Flex>
        </Formik>
    )
}