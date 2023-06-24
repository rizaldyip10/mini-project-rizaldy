import { Box, Button } from "@chakra-ui/react"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Axios from "axios"
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
            <Button w="0px" onClick={onDelete} variant="unstyled"><FontAwesomeIcon icon={faTrash} /></Button>
        </Box>
    )
}