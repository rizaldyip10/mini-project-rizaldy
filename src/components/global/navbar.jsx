import { Avatar, Box, Button, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from "@chakra-ui/react"
import { AddIcon, SearchIcon } from '@chakra-ui/icons'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell } from "@fortawesome/free-solid-svg-icons"
import { useSelector } from "react-redux"

export const NavBar = () => {
    const token = localStorage.getItem("token")
    const data = useSelector((state) => state.user.value)
    console.log(data);
    const navigate = useNavigate()

    const onLogOut = () => {
        localStorage.removeItem("token")
        setTimeout(() => {
            navigate('/')
        }, 2000)
    }

    console.log(data);
    return (
        <Flex justifyContent="center">
            <Flex id="navbar" justifyContent="space-between" w="90%" h="70px" margin="20px auto 40px"
            padding="13px 30px" border="1px solid" borderColor="transparent" borderRadius="20px" bgColor="#082032" boxShadow="2px 2px 5px black">
                <Box className="logo" display="flex" color="#FF4C29" lineHeight="37px">
                    <Text as={Link} to="/" fontSize="30px" _hover={{cursor: "pointer"}}>BloggerSpot</Text> 
                </Box>
                <Box className="nav-item" color="#FF4C29" mt="3px" display="flex" lineHeight="37px" fontWeight="semibold">
                    <Text as={Link} to="/" mr="20px" transition="0.5s" _hover={{transform: "scale(1.1)", cursor: "pointer"}} _active={{color: "white", transition: "0s"}}>Home</Text>
                    <Text as={Link} to="/search" mr="20px" transition="0.5s" _hover={{transform: "scale(1.1)", cursor: "pointer"}} _active={{color: "white", transition: "0s"}}>Category</Text>
                    <Text as={Link} to="/search" mr="20px" transition="0.5s" _hover={{transform: "scale(1.1)", cursor: "pointer"}} _active={{color: "white", transition: "0s"}}><SearchIcon /></Text>
                    {token ? (
                        <Flex>
                            <Text mr="20px" transition="0.5s" _hover={{transform: "scale(1.1)", cursor: "pointer"}} _active={{color: "white", transition: "0s"}}><FontAwesomeIcon icon={faBell}/></Text>
                            <Flex mr="15px" zIndex={9999}>
                                <Menu >
                                    <MenuButton as={Button} rounded="full" variant='link' cursor='pointer' minW={0}>
                                        <Avatar size="sm" src={`https://minpro-blog.purwadhikabootcamp.com/${data.imgProfile}`}/>
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem as={Link} to="/profile">Profile</MenuItem>
                                        <MenuDivider />
                                        <MenuItem onClick={onLogOut}>Log Out</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Flex>
                            <Box mr="15px">
                             <Text>{data.username}</Text>
                            </Box>
                            <Menu>
                                <MenuButton mb="5px">
                                    <AddIcon />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem as={Link} to="/create-blog">Create Blog</MenuItem>
                                </MenuList>
                            </Menu>
                        </Flex>
                    ) : (
                        <Flex className="account-manage">
                            <Text as={Link} to="/loginbyname" mr="20px" transition="0.5s" _hover={{transform: "scale(1.1)", cursor: "pointer"}} _active={{color: "white", transition: "0s"}}>Log in</Text>
                            <Box as={Link} to="/signup" bgColor="#FF4C29" borderRadius="20px" w="90px" justifyContent="center" alignItems="center" display="flex" transition="0.5s" _hover={{transform: "scale(1.1)", cursor: "pointer"}} _active={{bgColor: "white", transition: "0s"}}>
                                <Text color="#082032">Sign Up</Text>
                            </Box>
                        </Flex>
                    )}
                    
                </Box>
            </Flex>
        </Flex>
    )
}