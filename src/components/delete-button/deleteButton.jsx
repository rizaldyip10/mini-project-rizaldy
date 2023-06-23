import { Box, Button } from "@chakra-ui/react"
import Axios from "axios"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"


export const DeleteButton = () => {
    const navigate = useNavigate()
    const { blogId } = useParams()
    const onDelete = async () => {
        try {
            const response = await Axios.patch(`https://minpro-blog.purwadhikabootcamp.com/api/blog/remove/${blogId}`)
            console.log(response);
            navigate('/')
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Box>
            <Button onClick={onDelete}>Delete</Button>
        </Box>
    )
}