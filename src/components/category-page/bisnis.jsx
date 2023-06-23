import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react"
import Axios from "axios"
import { useEffect, useState } from "react"


export const BisnisCard = () => {
    const [blog, setBlog] = useState()

    const getBlog = async () => {
        try {
            const response = await Axios.get("https://minpro-blog.purwadhikabootcamp.com/api/blog")
            setBlog(response.data.result)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getBlog()
    }, [])
    return (
        <Box>
            {blog?.map((item, index) => {
                return (
                    <>
                    {item.CategoryId === 1 ? (
                        <Box key={index} bgColor="black" w="100%" h="150px">
                        <Box />
                        <Flex p="10px 20px">
                            <Avatar size="lg" mr="20px" src={`https://minpro-blog.purwadhikabootcamp.com/${item.User.imgProfile}`}/>
                            <Box color="white">
                                <Text fontSize="12px">{item.username}</Text>
                                <Heading fontSize="22px">{item.title}</Heading>
                                <Text>{new Date(`${item.createdAt}`).toLocaleDateString("en-us", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric"
                                })}</Text>
                            </Box>
                        </Flex>
                    </Box>
                    ): null     }
                    </>
                )
            })}
        </Box>
    )
}