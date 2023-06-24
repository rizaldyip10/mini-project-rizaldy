import { Avatar, Box, Divider, Flex, HStack, Heading, Image, Text } from "@chakra-ui/react"
import { NavBar } from "../components/global/navbar"
import { Footer } from "../components/global/footer"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import  Axios  from "axios"
import { CardSide } from "../components/home/cardSide"
import { DeleteButton } from "../components/blog-page/deleteButton"
import { useDispatch, useSelector } from "react-redux"
import { LikeButton } from "../components/blog-page/likeButton"
import { setAuthor } from "../redux/authorSlice"


export const BlogPage = () => {
    const { blogId } = useParams()
    const username = useSelector((state) => state.user.value.username)
    const [blog, setBlog] = useState()
    const [user, setUser] = useState()
    const dispatch = useDispatch()

    const getBlog = async () => {
        try {
            const response = await Axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/blog/${blogId}`)
            console.log(response.data[0].id);
            setBlog(response.data[0])
            setUser(response.data[0].User.username)
            dispatch(setAuthor(response.data[0]))
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
                    </Flex>
                    <Heading mt="10px" maxW="650px" color="#FF4C29">{blog?.title}</Heading>
                    <HStack mt="10px">
                        <Avatar color="#FF4C29" src={`https://minpro-blog.purwadhikabootcamp.com/${blog?.User.imgProfile}`} size="sm" />
                        <Text color="#FF4C29">{blog?.User.username}</Text>
                        <Divider orientation="vertical" />
                        <Text color="#FF4C29">{blog?.Category.name}</Text>
                        <Divider orientation="vertical" />
                        <Text color="#FF4C29"> {new Date(`${blog?.createdAt}`).toLocaleDateString("en-us", {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                        })}
                        </Text>
                        <Divider orientation="vertical" />
                        <LikeButton blogId={blog?.id} />
                        <Divider orientation="vertical" />
                        {user === username ? <DeleteButton /> : null}
                    </HStack>
                    <Box w="700px">
                        <Text mt="30px" color="#FF4C29">{blog?.content}</Text>
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