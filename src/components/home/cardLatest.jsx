import { Card, SimpleGrid } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Axios from 'axios'

export const LatestBlog = () => {
    const [blog, setBlog] = useState([])

    const getContent = async (content) => {
        try {
            const response = await Axios.get('https://minpro-blog.purwadhikabootcamp.com/api/blog', content)
            setBlog(response.data.result)
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getContent()
    }, [])

    return (
        <SimpleGrid>
            {blog.map((item, index) => {
                return (
                    <Card key={index}>

                    </Card>
                )
            })}
        </SimpleGrid>
    )
}