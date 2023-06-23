import { Avatar, Box, Flex, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react"
import { NavBar } from "../components/global/navbar"
import { ToTop } from "../components/global/toTop"
import { Footer } from "../components/global/footer"
import { CategoryList } from "../components/category-page/categorySelect"
import { BisnisCard } from "../components/category-page/bisnis"


export const CatPage = () => {
    return (
        <Box id="page-bg-color" bgColor="#2C394B">
            <Box id="header">
                <NavBar />
            </Box>
            <ToTop />
            <Flex justifyContent="center" margin="20px auto" color="black">
                <Box className="search-section" bgColor="#2C394B" h="300px" w="250px" mr="30px">
                    <CategoryList />
                </Box>
                <Box className="search-content" bgColor="white" w="570px" h="600px" mr="30px">
                    <BisnisCard />
                </Box>
                <Box className="search-section" bgColor="white" h="300px" w="250px">
                    Ini category trending
                </Box>
            </Flex>
            <Footer />
        </Box>
    )
}