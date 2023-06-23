import { HStack, VStack, Tab, TabList, TabPanel, TabPanels, Tabs, Box, Image, Text, Flex, Divider } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Axios from 'axios'
import { useNavigate } from "react-router-dom"


export const CardSide = () => {
    const [blog, setBlog] = useState([])
    const [fav, setFav] = useState([])
    const navigate = useNavigate()

    const onClick = (id) => {
        navigate(`/blog/${id}`)
        window.location.reload()
    }

    const getContent = async (content) => {
        try {
            const response = await Axios.get('https://minpro-blog.purwadhikabootcamp.com/api/blog?size=8', content)
            const resFav = await Axios.get('https://minpro-blog.purwadhikabootcamp.com/api/blog/pagFav?size=8', content)
            setBlog(response.data.result)
            setFav(resFav.data.result)
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getContent()
    }, [])
    return (
        <Tabs variant="enclosed" isFitted bgColor="#082032" borderRadius="20px" boxShadow="2px 2px 5px black">
            <TabList color="#FF4C29">
                <Tab>Latest</Tab>
                <Tab>Popular</Tab>
            </TabList>
            <TabPanels className="latest">
                <TabPanel maxH="500px">
                    {blog.map((item, index) => {
                        return(
                            <Flex p="5px" mt="5px" key={index} onClick={() => onClick(item.id)} cursor="pointer">
                                <Box>
                                    <Image w="40px" h="40px" borderRadius="50%" objectFit="cover" src={`https://minpro-blog.purwadhikabootcamp.com/${item.imageURL}`} />
                                </Box>
                                <Box ml="10px" color="#FF4C29">
                                    <Text fontSize="12px">{item.User.username}</Text>
                                    <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" maxW="100px">{item.title}</Text>
                                </Box>
                            </Flex>
                        )
                    })}
                </TabPanel>
                <TabPanel maxH="500px">
                {fav.map((item, index) => {
                        return(
                            <Flex p="5px" mt="5px" key={index} onClick={() => onClick(item.id)} cursor="pointer">
                                <Box>
                                    <Image w="40px" h="40px" borderRadius="50%" objectFit="cover" src={`https://minpro-blog.purwadhikabootcamp.com/${item.imageURL}`} />
                                </Box>
                                <Box ml="10px" color="#FF4C29">
                                    <Text fontSize="12px">{item.User.username}</Text>
                                    <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" maxW="100px">{item.title}</Text>
                                </Box>
                            </Flex>
                        )
                    })}
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}