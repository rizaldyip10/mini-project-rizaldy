import {
    EmailIcon,
    LockIcon,
    PhoneIcon,
    ViewIcon,
    ViewOffIcon,
  } from "@chakra-ui/icons";
  import {
    Box,
    Button,
    Flex,
    Heading,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Text,
    VStack,
    Stack,
  
  } from "@chakra-ui/react";
  import { faUser } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import Axios from "axios";
  import { Form, Formik } from "formik";
  import * as Yup from "yup";
  import InputField from "../components/form/inputField";
import { useDispatch } from "react-redux";
import { setValue } from "../redux/userSlice";
  
  export const LogInByPhone = () => {
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false)
    const handleClick = () => setShow(!show);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const phoneRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  
    const RegisterSchema = Yup.object().shape({
      phone: Yup.string()
        .required('Phone number is required')
        .matches(phoneRegex, 'Invalid phone number')
        .min(11),
      password: Yup.string()
        .min(6, "Password contains minimal 6 characters")
        .required("Password is required"),
    });
  
    const handleSubmit = async (data) => {
      try {
        const response = await Axios.post(
          "https://minpro-blog.purwadhikabootcamp.com/api/auth/login",
          data
        );
        console.log(response.data.isAccountExist);
        dispatch(setValue(response.data.isAccountExist))
        localStorage.setItem("token", response.data.token)
        setSuccess(true)
        setTimeout(() => {
          navigate("/")
        }, 2000)
      } catch (err) {
        console.log(err.response.data);
        setSuccess(false)
        alert(err.response.data)
      }
    };
    return (
      <Formik
        initialValues={{
          phone: "",
          password: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values, action) => {
          handleSubmit(values);
          if (success) {
            action.resetForm();
          }
        }}
      >
        {(props) => {
          return (
              <Flex as={Form} minH="100vh" align="center" justify="center" bgColor="#2C394B">
              <VStack>
                  <Stack textAlign="center">
                      <Heading color="white">Welcome!</Heading>
                      <Text as={Link} to="/signup" color="#FF4C29">Don't have an account?</Text>
                  </Stack>
                  <Flex justifyContent="space-between" w="75px" color="#FF4C29" mt="20px">
                      <Box as={Link} to="/loginbyname">
                          <FontAwesomeIcon icon={faUser} />
                      </Box>
                      <Box as={Link} to="/loginbyphone">
                          <PhoneIcon />
                      </Box>
                      <Box as={Link} to="/loginbyemail">
                          <EmailIcon />
                      </Box>
                  </Flex>
                  <Box rounded='lg' bg='#082032' boxShadow='lg' p={8} mt="5px">
                      <Stack spacing={4}>
                          <InputGroup className="username-form">
                              <InputLeftElement pointerEvents="none">
                                  <Box mt="5px">
                                      <PhoneIcon mb="3px" color="#FF4C29" />
                                  </Box>
                              </InputLeftElement>
                              <InputField name="phone" htmlFor="phone" className="phone" type="text" pl="35px" placeholder="Phone number" color="#FF4C29" _placeholder={{color: "#FF4C29"}}  h="30px" w="350px" fontSize="16px" borderColor="#FF4C29" _hover={{borderColor: "white"}} focusBorderColor="#FF4C29"/>
                          </InputGroup>
                      <InputGroup>
                          <InputLeftElement>
                              <LockIcon mt="5px" color="#FF4C29" />
                          </InputLeftElement>
                          <InputField name="password" htmlFor="password" className="password" type={show ? 'text' : 'password'} pl="35px" placeholder="Enter your password" color="#FF4C29" _placeholder={{color: "#FF4C29"}} h="30px" w="350px" fontSize="16px" borderColor="#FF4C29" _hover={{borderColor: "white"}} focusBorderColor="#FF4C29"/>
                          <InputRightElement>
                              <Box>
                                  <Button onClick={handleClick} variant="none" color="#FF4C29" mt="5px">{show ? <ViewOffIcon /> : <ViewIcon />}</Button>
                              </Box>
                          </InputRightElement>
                      </InputGroup>
                      <Text as={Link} to="/reset" color="#FF4C29">Forgot password?</Text>
                      </Stack>
                      <Button type="submit" bgColor="#FF4C29" color="#082032" _hover={{bgColor: "white"}} _active={{transform: "scale(1.1)"}} w="350px" mt="20px">Submit</Button>
                  </Box>
              </VStack>
          </Flex>
          );
        }}
      </Formik>
    );
  };
  