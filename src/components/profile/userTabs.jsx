import { Avatar, Box, Flex, HStack, Heading, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Axios from 'axios'
import { UsernameChange } from "./changeUsername"
import { EmailChange } from "./changeEmail"
import { PhoneChange } from "./changePhone"
import { PasswordChange } from "./changePass"
import { PicChange } from "./changePic"
import { useNavigate } from "react-router-dom"

export const UserTabs = () => {
    const [blog, setBlog] = useState()
    const [like, setLike] = useState()
    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    const goToBlog = (blogId) => {
        navigate(`/blog/${blogId}`)
    }
    const getBlog = async () => {
        try {
            const response = await Axios.get("https://minpro-blog.purwadhikabootcamp.com/api/blog/pagUser", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const response2 = await Axios.get("https://minpro-blog.purwadhikabootcamp.com/api/blog/pagLike", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setLike(response2.data.result)
            setBlog(response.data.result)
            console.log(response.data.result);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getBlog()
    }, [])
    return (
        <Tabs variant="enclosed" bg="#082032" borderRadius="5px" boxShadow="2px 2px 5px black" >
            <TabList color="#FF4C29" _selected={{color:"white"}} >
                <Tab>My blog</Tab>
                <Tab>Liked blog</Tab>
                <Tab>Setting</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Flex justifyContent="flex-start" flexDirection="row" flexWrap="wrap">
                        {blog?.map((item, index) => {
                            return (
                                <Box w="300px" h="300px" bgColor="#082032" p="10px" mt="20px" mb="20px" mr="20px" key={index} onClick={() => goToBlog(item?.id)} cursor="pointer">
                                    <Flex w="250x" h="200px" bgColor="#082032">
                                        <Image src={`https://minpro-blog.purwadhikabootcamp.com/${item.imageURL}`} objectFit="cover"/>
                                    </Flex>
                                    <Heading fontSize="20px" mt="10px" color="#FF4C29"
                                    overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" maxW="300px">{item.title}</Heading>
                                    <HStack mt="10px">
                                        <Avatar src={`https://minpro-blog.purwadhikabootcamp.com/${item.User.imgProfile}`} size="sm" />
                                        <Text color="#FF4C29">{item.User.username}</Text>
                                        <Text color="#FF4C29">{new Date(`${item.createdAt}`).toLocaleDateString("en-us", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric"
                                        })}</Text>
                                    </HStack>
                                </Box>
                            )
                        })}
                    </Flex>
                </TabPanel>
                <TabPanel>
                <Flex justifyContent="flex-start" flexDirection="row" flexWrap="wrap">
                        {like?.map((item, index) => {
                            return (
                                <Box w="300px" bgColor="#082032" p="10px" mt="20px" mb="20px" mr="20px" key={index} onClick={() => goToBlog(item.BlogId)} cursor="pointer">
                                    <Heading color="#FF4C29" fontSize="28px" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" maxW="300px">{item.Blog.title}</Heading>
                                    <Text color="#FF4C29">{new Date(`${item.createdAt}`).toLocaleDateString("en-us", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric"
                                    })}</Text>
                                </Box>
                            )
                        })}
                    </Flex>
                </TabPanel>
                <TabPanel>
                    <Text fontWeight="bold" fontSize="18px" color="#FF4C29">Profile setting</Text>
                    <PicChange />
                    <UsernameChange />
                    <EmailChange />
                    <PhoneChange />
                    <PasswordChange />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}
        