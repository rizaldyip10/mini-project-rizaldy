import { Box, Flex } from "@chakra-ui/react"
import { NavBar } from "../components/global/navbar"
import { Footer } from "../components/global/footer"
import { Carousel } from "../components/home/carousel"
import { ToTop } from "../components/global/toTop"
import { CardSide } from "../components/home/cardSide"
import { AllBlogCard } from "../components/home/allBlog"


export const Home = () => {
    return (
        <Box id="bg-color" bgColor="#2C394B">
            <Box id="header">
                <NavBar />
            </Box>
            <ToTop />
            <Flex className="carousel" justifyContent="center">
                <Box w="90%" h="400px" color="#2C394B" mt="30px" borderRadius="20px" boxShadow="2px 2px 5px black">
                    <Carousel />
                </Box>
            </Flex>
            <Box display="flex" className="blog-content">
                <Box color="#2C394B" className="new-blog" w="67%" h="630px" bgColor="white" mt="60px" ml="64px" borderRadius="20px" boxShadow="2px 2px 5px black">
                    <AllBlogCard />
                </Box>
                <Box color="#2C394B" className="trending-blog" w="20%" h="400px" mt="60px" ml="37px" borderRadius="20px">
                    <CardSide />
                </Box>
            </Box>
            <Footer />
        </Box>
    )
}