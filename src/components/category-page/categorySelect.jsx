import { Card, CardBody, CardHeader, Heading, Stack, StackDivider, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import Axios from "axios"


export const CategoryList = () => {
    const [cat, setCat] = useState()
    const getCat = async () => {
        try {
            const response = await Axios.get("https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory")
            setCat(response.data) 
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getCat()
    }, [])
    return (
        <Card>
            <CardHeader>
                <Heading size="md">Category</Heading>
            </CardHeader>
            <CardBody>
                <Stack divider={<StackDivider />} spacing={2} >
                    {cat?.map((item, index) => {
                        return (
                            <Text key={index}>{item.name}</Text>
                        )
                    })}
                </Stack>
            </CardBody>
        </Card>
    )
}