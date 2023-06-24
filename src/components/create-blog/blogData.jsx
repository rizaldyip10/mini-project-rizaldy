import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Select, SelectField, Text, Textarea } from "@chakra-ui/react"
import { Field, Form, Formik, useField } from "formik"
import InputField from "../form/inputField"
import Axios from "axios"
import { useEffect, useState } from "react"
import { AreaField } from "../form/areaField"
import * as Yup from "yup"
import InputField2 from "../form/inputField2"
import { useNavigate } from "react-router-dom"


export const BlogData = () => {
    const [cat, setCat] = useState()
    const [file, setFile] = useState(null)
    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    const BlogSchema = Yup.object().shape({
        title: Yup.string()
            .required("Please fill your blog title"),
        keywords: Yup.string()
            .required("Please fill your keyword"),
        country: Yup.string()
            .required("Please enter your country"),
        CategoryId: Yup.string()
            .required("Please select your category"),
        content: Yup.string()
            .required("Please enter your content"),
        file: Yup.mixed()
            .required("Image is required")
            .test("fileSize", "File size too large", (value) => {
                
            })
        
    })

    const getCat = async (data) => {
        try {
            const response = await Axios.get("https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory", data)
            setCat(response.data)
        } catch (err) {
            console.log(err);
        }
    }

    const onCreate = async (value) => {
        try {
            const data = new FormData()
            const {title, keywords, country, CategoryId, url, content} = value
            data.append("data", JSON.stringify({title, keywords, country, CategoryId, url, content}))
            data.append("file", file)
            console.log([...data]);
            const response = await Axios.post("https://minpro-blog.purwadhikabootcamp.com/api/blog", data, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                "Content-Type": "multipart/form-data"
            })
            navigate('/')
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }

    const initialValues = {
        title: "",
        keywords: "",
        country: "",
        CategoryId: "",
        url: "",
        content: "",
        file: null
    }

    useEffect(() => {
        getCat()
    }, [])
    return (
        <Formik initialValues={initialValues} validationSchema={BlogSchema}
        onSubmit={(value, action) => {
            onCreate(value)
        }}>
            {() => {
                return (
                    <Form>

                    <Flex >
                        <Box className="blog-detail" bgColor="#082032" w="350px" p="20px" color="#FF4C29" boxShadow="2px 2px 5px black" borderRadius="20px">
                            <Box className="blog-title" >
                                <Text>Title</Text>
                                <InputField name="title" htmlFor="title" className="title" type="text" placeholder="Enter your blog title" color="#FF4C29" _placeholder={{color: "#FF4C29"}} borderColor="white" focusBorderColor="#FF4C29"/>
                            </Box>
                            <Box className="blog-keywords" mt="20px">
                                <Text>Keywords</Text>
                                <InputField name="keywords" htmlFor="keywords" className="keywords" type="text" placeholder="Enter your blog keywords" color="#FF4C29" _placeholder={{color: "#FF4C29"}} borderColor="white" focusBorderColor="#FF4C29"/>
                            </Box>
                            <Box className="blog-country" mt="20px">
                                <Text>Country</Text>
                                <InputField name="country" htmlFor="country" className="country" type="text" placeholder="Enter your country" color="#FF4C29" _placeholder={{color: "#FF4C29"}} borderColor="white" focusBorderColor="#FF4C29"/>
                            </Box>
                            <Box className="blog-category" mt="20px">
                                <FormControl>
                                    <FormLabel fontSize="14px">
                                        Category
                                    </FormLabel>
                                    <Field as={Select} name="CategoryId" placeholder="Select category" borderColor="white" focusBorderColor="#FF4C29" bgColor="#334756" >
                                        {cat?.map((value, index) => {
                                            return (
                                                <option key={index} value={value.id}>
                                                    {value.name}
                                                </option>
                                            )
                                        })}
                                    </Field>
                                </FormControl>
                            </Box>
                            <Box className="url" mt="20px">
                                <Text>URL</Text>
                                <InputField name="url"  htmlFor="url" className="url" type="text" placeholder="Enter your url" color="#FF4C29" _placeholder={{color: "#FF4C29"}} borderColor="white" focusBorderColor="#FF4C29"/>
                            </Box>
                            <Box className="blog-pic" mt="20px">
                                <Field name="file">
                                    {({field}) => (
                                        <FormControl>
                                           
                                            <FormLabel htmlFor="file">Image</FormLabel>
                                            <Input
                                            {...field}
                                            
                                            onChange={(e) => {
                                                field.onChange(e)
                                                setFile(e.target.files[0])
                                            }} type="file" id="file" size="s"
                                            borderRadius="5px" borderColor="white" focusBorderColor="#FF4C29"/>

                                        </FormControl>
                                    )}
                                </Field>
                                    <FormErrorMessage 
                                    style={{color: "red"}}
                                    name="file"
                                    component="div"/>
                            </Box>
                        </Box>
                        <Box className="blog-content" bgColor="#082032" w="760px" ml="30px" p="20px" color="#FF4C29" boxShadow="2px 2px 5px black" borderRadius="20px">
                            <Text>Blog content</Text>
                            <AreaField name="content" placeholder="Your content" h="200px" color="#FF4C29" _placeholder={{color: "#FF4C29"}} borderColor="white" focusBorderColor="#FF4C29"/>
                            <Button type="submit" mt="20px" color="#082032" bgColor="#FF4C29" _hover={{transform: "scale(1.1)"}} transition="0.5s" >Submit</Button>
                        </Box>
                    </Flex>
                    </Form>
                )
            }}
        </Formik>
    )
}