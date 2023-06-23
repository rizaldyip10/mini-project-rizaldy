import { Avatar, Box, Flex, HStack, Heading, Image, Text } from "@chakra-ui/react"
import Axios from "axios"
import { useEffect, useState } from "react"
import Paginate from "./pagination"
import { useNavigate } from "react-router-dom"


export const AllBlogCard = () => {
    const [blog, setBlog] = useState()
    const [postPerPage, setPostPerPage] = useState()
    const [currPage, setCurrPage] = useState(1)
    const [totalPost, setTotalPost] = useState()
    const navigate = useNavigate()

    const indexOFLastPost = currPage * postPerPage
    const indexofFirstPost = indexOFLastPost - postPerPage
    // const currPost = blog.slice(indexofFirstPost, indexOFLastPost)

    const onCLick = (blogId) => {
        navigate(`blog/${blogId}`)
    }

    const getBlog = async () => {
        try {
            const response = await Axios.get("https://minpro-blog.purwadhikabootcamp.com/api/blog/?size=6")
            setBlog(response.data.result)
            setPostPerPage(response.data.listLimit)
            setCurrPage(response.data.blogPage)
            setTotalPost(response.data.rows)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getBlog()
    }, [])
    return (
        <Flex bgColor="#082032" p="20px" flexWrap="wrap" h="100%" justifyContent="center" borderRadius="20px">
            {blog?.map((item, index) => {
                return (
                    <Box h="250px" w="250px" bgColor="white" p="10px" mr="18px"  mt="12px" key={index} onClick={() => onCLick(item.id)} cursor="pointer">
                        <Flex className="img" h="170px" w="230px" bgColor="black">
                            <Image src={`https://minpro-blog.purwadhikabootcamp.com/${item.imageURL}`} w="100" maxH="170px" objectFit="cover" />
                        </Flex>
                        <Heading mt="5px" fontSize="20px" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">{item.title}</Heading>
                        <HStack mt="5px">
                            <Avatar size="xs" />
                            <Text>{item.User.username}</Text>
                            <Text>{new Date(`${item.createdAt}`).toLocaleDateString("en-us", {
                                year: "numeric",
                                month: "short",
                                day: "numeric"
                            })}</Text>
                        </HStack>
                        <Paginate postPerPage={postPerPage} totalPost={totalPost} paginate={currPage}/>
                    </Box>
                )
            })}
        </Flex>
    )
}