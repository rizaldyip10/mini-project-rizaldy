import { Box, Button, Flex } from "@chakra-ui/react"
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export const ToTop = () => {
    const scrollTop = () => {
        const id = document.getElementById('header')
        if (id) {
            id.scrollIntoView({behavior: 'smooth'})
        }
    }
    return (
        <Flex flexDirection="row-reverse" mr="50px" lineHeight="130vh">
            <Box position="fixed" zIndex={"999"}>
                <Button onClick={scrollTop} borderRadius="50%" h="60px" w="60px" bgColor="#FF4C29" _hover={{bgColor: "#FF4C29"}} _active={{bgColor:"white"}}><FontAwesomeIcon icon={faArrowUp} color="#082032"/></Button>
            </Box>
        </Flex>
    )
}