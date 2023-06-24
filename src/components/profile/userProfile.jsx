import { Avatar, Box, Flex, Link, Text } from "@chakra-ui/react"
import { useSelector } from "react-redux"


export const UserCard = () => {
    const data = useSelector((state) => state.user.value)
    console.log(data);
    return (
        <Flex justifyContent="center" className="profile" bgColor="#082032" borderRadius="20px" 
        boxShadow="2px 2px 5px black" w="25%" h="400px" ml="64px" textAlign="center" alignItems="center">
            <Box>
                <Avatar as={Link} href={`https://minpro-blog.purwadhikabootcamp.com/${data.imgProfile}`} target="_blank" bg="#FF4C29" size="2xl" src={`https://minpro-blog.purwadhikabootcamp.com/${data.imgProfile}`} />
                <Text color="#FF4C29" mt="20px" fontSize="30px">{data.username}</Text>
                <Text color="#FF4C29" mt="5px">{data.email}</Text>
                <Text color="#FF4C29" mt="5px">{data.phone}</Text>
            </Box>
        </Flex>
    )
}