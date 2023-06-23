import { Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"


const LatestBlog = () => {
    const [blog, setBlog] = useState([])

    const getContent = async (data1) => {
        try {
          const response = await Axios.get('https://minpro-blog.purwadhikabootcamp.com/api/blog', data1)
          setBlog(response.data.result)
          // console.log(response.data.result);
        }
        catch (err) {
          console.log(err);
        }
      }

      useEffect(() => {
        getContent()
      }, [])
    return (
        <Box id="latest">
             <Box color="#2C394B" className="new-blog" w="67%" h="400px" bgColor="white" mt="60px" ml="64px" borderRadius="20px">
                
             </Box>
        </Box>
    )
}