import { Box, Button, useToast } from "@chakra-ui/react"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Axios from "axios"
import { useNavigate, useParams } from "react-router-dom"


export const DeleteButton = () => {
    const navigate = useNavigate()
    const { blogId } = useParams()
    const toast = useToast()
    const onDelete = async () => {
        try {
            const response = await Axios.patch(`https://minpro-blog.purwadhikabootcamp.com/api/blog/remove/${blogId}`)
            console.log(response);
            toast({
                title: "Success",
                description: "Delete blog success!",
                status: 'success',
                duration: 1500,
                isClosable: true,
                position: "top"
              })
            setTimeout(() => {
                navigate('/')
            }, 2000)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Box>
            <Button w="0px" onClick={onDelete} variant="unstyled"><FontAwesomeIcon icon={faTrash} color="#FF4C29" /></Button>
        </Box>
    )
}