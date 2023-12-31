import { Flex, Box } from "@chakra-ui/react"
import { NavBar } from "../components/global/navbar"
import { Footer } from "../components/global/footer"
import { ToTop } from "../components/global/toTop"
import { UserTabs } from "../components/profile/userTabs"
import { UserCard } from "../components/profile/userProfile"
import { Navigate, useNavigate } from "react-router-dom"


export const UserProfile = () => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    return token ? (
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
    ) : (<Navigate to="/loginbyname" />)
}