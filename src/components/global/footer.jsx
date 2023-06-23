import { Box, Button, Flex, Heading, Input, InputGroup, InputRightElement, Link, Text } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faGithub, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export const Footer = () => {
    return (
    <Box className="footer" w="100%" h="300px" bgColor="#082032" mt="50px" justifyContent="space-between">
        <Flex justifyContent="space-between" margin="100px">
            <Box className="footer-logo" color="#FF4C29" mt="auto">
                <Heading>BloggerSpot</Heading>
                <Text mt="5px">est. 2023</Text>
                <Flex className="social-media" mt="15px">
                    <Box className="facebook" mr="10px">
                        <Link href="https://www.facebook.com" target="blank"><FontAwesomeIcon icon={faFacebook} color="#FF4C29"/></Link>
                    </Box>
                    <Box className="twitter" mr="10px">
                        <Link href="https://www.twitter.com" target="blank"><FontAwesomeIcon icon={faTwitter} color="#FF4C29"/></Link>
                    </Box>
                    <Box className="instagram" mr="10px">
                        <Link href="https://www.instagram.com" target="blank"><FontAwesomeIcon icon={faInstagram} color="#FF4C29"/></Link>
                    </Box>
                    <Box className="linkedin" mr="10px">
                        <Link href="https://www.linkedin.com" target="blank"><FontAwesomeIcon icon={faLinkedin} color="#FF4C29"/></Link>
                    </Box>
                    <Box className="github">
                        <Link href="https://www.github.com" target="blank"><FontAwesomeIcon icon={faGithub} color="#FF4C29"/></Link>
                    </Box>
                </Flex>
            </Box>
            <Box className="news-letter" color="#FF4C29" mt="40px">
                <Text fontSize="30px" fontWeight="bold"> Newsletter</Text>
                <Text>Get the latest post delivered to your inbox</Text>
                <InputGroup mt="30px">
                    <Input placeholder="Your email address" _placeholder={{color: "#FF4C29"}} _hover={{borderColor: "white"}} focusBorderColor="#FF4C29" type="text" w="400px" borderColor="#FF4C29" borderRadius="20px"/>
                    <InputRightElement w="100px">
                        <Button bgColor="#FF4C29" color="#082032" borderRadius="20px" right="-8px" _hover={{bgColor: "white", color: "#082032"}} _active={{transform: "scale(1.1)"}}>Submit</Button>
                    </InputRightElement>
                </InputGroup>
            </Box>
        </Flex>
    </Box>
    )
}