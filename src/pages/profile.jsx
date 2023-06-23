import { Flex, Box, Text, Tabs, TabList, Tab, TabPanel, TabPanels, TabIndicator, InputGroup, Input, Heading, InputRightElement, Button } from "@chakra-ui/react"
import { NavBar } from "../components/global/navbar"
import { Footer } from "../components/global/footer"
import { ToTop } from "../components/global/toTop"
import { useState } from "react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { useSelector } from "react-redux"
import { UserTabs } from "../components/profile/userTabs"
import { UserCard } from "../components/profile/userProfile"


export const UserProfile = () => {
    return (
        <Box id="bg-color" bgColor="#2C394B">
            <Box id="header">
                <NavBar />
            </Box>
            <ToTop />
            <Flex className="profile-container">
                <UserCard />
                <Box className="profile-content" ml="60px" w="60%">
                    <UserTabs />
                </Box>
            </Flex>
            <Footer />
        </Box>
    )
}