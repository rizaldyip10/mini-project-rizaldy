import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons"
import { Avatar, Box, Button, Flex, HStack, Heading, Image, Text } from "@chakra-ui/react"
import Axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const AllBlogCard = () => {
    const [blog, setBlog] = useState()
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const navigate = useNavigate()

    const onCLick = (blogId) => {
        navigate(`blog/${blogId}`)
    }

    const getBlog = async (pageNum) => {
        try {
            const response = await Axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/blog?page=${pageNum}&size=6`)
            setBlog(response.data.result)
            setPage(response.data.blogPage)
            setTotalPage(response.data.page)
        } catch (err) {
            console.log(err);
        }
    }

    const goToPage = (pageNum) => {
        getBlog(pageNum)
    }

    const goToPrevPage = () => {
        if(page > 1) {
            getBlog(page - 1)
        }
    }

    const goToNextPage = () => {
        if(page < totalPage) {
            getBlog(page + 1)
        }
    }

    useEffect(() => {
        getBlog(page)
    }, [])

    return (
        <Flex bgColor="#082032" p="20px" flexWrap="wrap" h="100%" justifyContent="center" borderRadius="20px">
            {blog?.map((item, index) => {
                return (
                    <Box h="250px" w="250px" bgColor="#082032" p="10px" mr="18px"  mt="12px" key={index} onClick={() => onCLick(item.id)} cursor="pointer">
                        <Flex className="img" h="170px" w="230px" bgColor="black" justifyContent="center">
                            <Image src={`https://minpro-blog.purwadhikabootcamp.com/${item.imageURL}`} w="100" maxH="170px" objectFit="cover" />
                        </Flex>
                        <Heading  color="#FF4C29"mt="5px" fontSize="20px" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">{item.title}</Heading>
                        <HStack mt="5px" color="#FF4C29">
                            <Avatar size="xs" bg="#FF4C29" src={`https://minpro-blog.purwadhikabootcamp.com/${item.User.imgProfile}`}/>
                            <Text overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" maxW="100px" mr="10px">{item.User.username}</Text>
                            <Text>{new Date(`${item.createdAt}`).toLocaleDateString("en-us", {
                                year: "numeric",
                                month: "short",
                                day: "numeric"
                            })}</Text>
                        </HStack>
                    </Box>
                )
            })}
            <Flex mt="20px">
                <Button bgColor="#FF4C29" color="#082032" onClick={goToPrevPage} disabled={page === 1}><ArrowBackIcon /></Button>
                {page < 2 ? null : <Button mx="5px" onClick={() => goToPage(page -1)} bgColor="#FF4C29" color="#082032">{page - 1 }</Button>}
                <Button mx="5px" disabled bgColor="#FF4C29" color="#082032">{page}</Button>
                <Button mx="5px" onClick={() => goToPage(page + 1)} bgColor="#FF4C29" color="#082032">{page + 1 }</Button>
                <Button onClick={goToNextPage} disabled={page === totalPage} bgColor="#FF4C29" color="#082032"><ArrowForwardIcon /></Button>
            </Flex>
        </Flex>
    )
}