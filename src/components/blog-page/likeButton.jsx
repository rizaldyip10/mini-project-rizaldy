import { Box, Button } from "@chakra-ui/react"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Axios from "axios"
import { Formik } from "formik"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"


export const LikeButton = ({blogId}) => {
    const [isLiked, setIsLiked] = useState(false)
    const token = localStorage.getItem("token")
    const { id } = useParams()

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
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }

    return(
        <Formik>
            <Box>
                <Button variant="unstyled" onClick={onClick}>{isLiked ? <FontAwesomeIcon icon={faHeart} style={{color: "#FF4C29"}}/> : <FontAwesomeIcon icon={faHeart} style={{color: "white"}}/> }</Button>
            </Box>
        </Formik>
    )
}