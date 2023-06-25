import { Box, Flex, Heading, VStack } from "@chakra-ui/react"
import { NavBar } from "../components/global/navbar"
import { Footer } from "../components/global/footer"
import { BlogData } from "../components/create-blog/blogData"
import { useNavigate } from "react-router-dom"


export const CreateBlog = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    return token ? (
        <Box id="page-bgcolor" bgColor="#2C394B">
            <Box id="header">
                <NavBar />
            </Box>
            <Flex justifyContent="center" mt="20px">
                <VStack>
                    <Heading mb="50px" color="#FF4C29">Create blog</Heading>
                    <BlogData />
                </VStack>
            </Flex>
            <Footer />
        </Box>
    ) : navigate("/loginbyname")
}