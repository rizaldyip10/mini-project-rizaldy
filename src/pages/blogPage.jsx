import { Avatar, Box, Divider, Flex, HStack, Heading, Image, Popover, Text, VStack } from "@chakra-ui/react"
import { NavBar } from "../components/global/navbar"
import { Footer } from "../components/global/footer"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import  Axios  from "axios"
import { CardSide } from "../components/home/cardSide"
import { DeleteButton } from "../components/delete-button/deleteButton"
import { useSelector } from "react-redux"


export const BlogPage = () => {
    const { blogId } = useParams()
    const username = useSelector((state) => state.user.value.username)
    const [blog, setBlog] = useState()
    const [user, setUser] = useState()

    const getBlog = async () => {
        try {
            const response = await Axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/blog/${blogId}`)
            console.log(response.data[0]);
            setBlog(response.data[0])
            setUser(response.data[0].User.username)
        } catch (err) {
            console.log(err);
        }
    }
    
    useEffect(() => {
        getBlog()
    }, [])
    return (
        <Box id="page-bgColor" bgColor="#2C394B" h="100%">
            <Box id="header">
                <NavBar />
            </Box>
            <Flex justifyContent="space-between" m="auto 65px">
                <Box mr="30px">
                    <Flex>
                        <Box bgColor="#2C394B" h="350px" w="800px">
                            <Image h="100%" display="flex" src={`https://minpro-blog.purwadhikabootcamp.com/${blog?.imageURL}`} />
                        </Box>
                        {user === username ? <DeleteButton /> : null}
                    </Flex>
                    <Heading mt="10px">{blog?.title}</Heading>
                    <HStack mt="10px">
                        <Avatar src={`https://minpro-blog.purwadhikabootcamp.com/${blog?.User.imgProfile}`} size="sm" />
                        <Text>{blog?.User.username}</Text>
                        <Divider orientation="vertical" />
                        <Text>{blog?.Category.name}</Text>
                        <Divider orientation="vertical" />
                        <Text>{new Date(`${blog?.createdAt}`).toLocaleDateString("en-us", {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                        })}</Text>
                    </HStack>
                    <Box w="700px">
                        <Text mt="30px">{blog?.content}</Text>
                    </Box>
                </Box>
                <Box color="#2C394B" className="trending-blog" w="20%" h="400px" borderRadius="20px">
                    <CardSide />
                </Box>
            </Flex>
            <Footer />
        </Box>
    )
}