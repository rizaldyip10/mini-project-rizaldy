import { Avatar, Box, Button, Divider, Flex, FormControl, FormLabel, HStack, Heading, Input, Menu, MenuButton, MenuItem, MenuList, Select, Text } from "@chakra-ui/react"
import { NavBar } from "../components/global/navbar"
import { ToTop } from "../components/global/toTop"
import { Footer } from "../components/global/footer"
import Axios from "axios"
import { useEffect, useState } from "react"
import { CardSide } from "../components/home/cardSide"
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons"
import { useNavigate } from "react-router-dom"


export const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState();
    const [searchResults, setSearchResults] = useState([]);
    const [sorting, setSorting] = useState("DESC")
    const [page, setPage] = useState(null)
    const [totalPage, setTotalPage] = useState(null)
    const navigate = useNavigate()
  
    useEffect(() => {
      fetchCategories();
    }, []);
    
    const onClick = (blogId) => {
        navigate(`/blog/${blogId}`)
    }
    const handleLatest = () => {
        setSorting("DESC")
    }

    const handleEarliest = () => {
        setSorting("ASC")
    }

    const goToPrevPage = () => {
        if(page > 1) {
            handleSearch(page - 1)
        }
    }

    const goToNextPage = () => {
        if(page < totalPage) {
            handleSearch(page + 1)
        }
    }
    const fetchCategories = async () => {
      try {
        const response = await Axios.get('https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory');
        setCategories(response.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    const handleSearch = async (page) => {
      try {
        const response = await Axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/blog?id_cat=${selectedCategory}&sort=${sorting}&size=6&page=${page}`, {
          params: {
            search: searchTerm,
          },
        });
  
        setSearchResults(response.data.result);
        setPage(response.data.blogPage)
        setTotalPage(response.data.page)
      } catch (err) {
        console.log(err);
      }
    };
  
    const handleInputChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const handleCategoryChange = (event) => {
      setSelectedCategory(event.target.value);
    };
    return (
        <Box id="page-bg-color" bgColor="#2C394B">
            <Box id="header">
                <NavBar />
            </Box>
            <ToTop />
            <Flex justifyContent="center" margin="20px auto">
                <Box className="search-section" bgColor="#082032" h="300px" w="250px" mr="30px" p="15px" borderRadius="20px" boxShadow="2px 2px 5px black">
                    <FormControl>
                        <FormLabel color="#FF4C29">Search</FormLabel>
                        <Input color="#FF4C29" type="text" value={searchTerm} onChange={handleInputChange} borderColor="white" focusBorderColor="#FF4C29" placeholder="Search..." _placeholder={{color: "#FF4C29"}} />
                        <Select color="#FF4C29" value={selectedCategory} onChange={handleCategoryChange} mt="10px" borderColor="white" focusBorderColor="#FF4C29" placeholder="Category">
                            <option bgColor="#334756" value="">All</option>
                            {categories?.map((category) => (
                                <option bgColor="#334756" key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </Select>
                        <Button mt={4} onClick={handleSearch} bgColor="#FF4C29" color="#082032" _hover={{transform: "scale(1.1)"}}>
                            Search
                        </Button>
                    </FormControl>
                </Box>
                <Box className="search-content" bgColor="#082032" w="570px" h="700px" mr="30px" p="10px 20px" borderRadius="20px" boxShadow="2px 2px 5px black">
                    <Flex justifyContent="space-between">
                        <Heading color="#FF4C29" fontSize="18px">Here are your search results</Heading>
                        <Menu>
                            <MenuButton >
                                <Button bgColor="#FF4C29" color="#082032" h="20px"  >Sort</Button>
                            </MenuButton>
                            <MenuList bgColor="#334756">
                                <MenuItem _hover={{bgColor: "#082032"}} bgColor="#334756" color="#FF4C29" cursor="pointer" onClick={handleEarliest}>Earliest</MenuItem>
                                <Divider color="gray.900" />
                                <MenuItem _hover={{bgColor: "#082032"}} bgColor="#334756" color="#FF4C29" cursor="pointer" onClick={handleLatest}>Latest</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                    {searchResults?.map((item) => (
                        <Box key={item.id} mt="15px" onClick={() => onClick(item?.id)} cursor="pointer">
                            <Box>
                                <HStack spacing={1} color="#FF4C29">
                                    <Avatar bg="#FF4C29" size="lg" src={`https://minpro-blog.purwadhikabootcamp.com/${item.imageURL}`} mr="20px" />
                                    <Box>
                                        <Text fontSize="14px">{item.User.username}</Text>
                                        <Heading fontSize="24px" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" maxW="400px">{item.title}</Heading>
                                        <Text fontSize="12px">{new Date(`${item.createdAt}`).toLocaleDateString("en-us", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric"
                                        })}</Text>
                                    </Box>
                                </HStack>
                            </Box>
                            <Divider mt="10px" color="gray.900" />
                        </Box>
                    ))}
                     {page === null ? null : (
                        <Flex mt="20px" justifyContent="center">
                            <Button bgColor="#FF4C29" color="#082032" onClick={goToPrevPage} disabled={page === 1}><ArrowBackIcon /></Button>
                            <Button mx="5px" disabled bgColor="#FF4C29" color="#082032">{page}</Button>
                            <Button onClick={goToNextPage} disabled={page === totalPage} bgColor="#FF4C29" color="#082032" ><ArrowForwardIcon /></Button>
                        </Flex>
                     )}
                </Box>
                <Box className="search-section" h="630px" w="250px">
                    <CardSide />
                </Box>
            </Flex>
            <Footer />
        </Box>
    )
}