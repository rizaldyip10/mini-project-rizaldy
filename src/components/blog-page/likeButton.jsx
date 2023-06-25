import { Box, Button, useToast } from "@chakra-ui/react"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Axios from "axios"
import { Formik } from "formik"
import { useState } from "react"
import { useParams } from "react-router-dom"


export const LikeButton = ({blogId}) => {
    const [isLiked, setIsLiked] = useState(false)
    const token = localStorage.getItem("token")
    const { id } = useParams()
    const toast = useToast()

    const onClick = async () => {
        try {
            const data = {
                "BlogId": blogId
            }
            const response = await Axios.post("https://minpro-blog.purwadhikabootcamp.com/api/blog/like", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            setIsLiked(true)
            toast({
                title: "Liked",
                description: "You've liked this page",
                status: "success",
                duration: 2500,
                position: "top"
            })
            console.log(response);
        } catch (err) {
            console.log(err);
            toast({
                title: "Error",
                description: "Oopss.. there's something wrong",
                status: "error",
                duration: 2500,
                position: "top"
            })
        }
    }

    return(
        <Formik>
            <Box>
                <Button variant="unstyled" _active={{transform: "scale(1.1)"}} onClick={onClick}>{isLiked ? <FontAwesomeIcon icon={faHeart} style={{color: "#FF4C29"}}/> : <FontAwesomeIcon icon={faHeart} style={{color: "white"}}/> }</Button>
            </Box>
        </Formik>
    )
}