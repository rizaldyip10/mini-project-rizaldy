import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import './style.css'
import { Pagination, Navigation, Autoplay } from 'swiper'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import { Box, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export const Carousel = () => {
  const [blog, setBlog] = useState([])

  const navigate = useNavigate()

  const onSwiperClick = (blogId) => {
    navigate(`blog/${blogId}`)
  }

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

  return(
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {blog.map((item, index) => {
          return (
            <SwiperSlide key={index} onClick={() => onSwiperClick(item.id)} cursor="pointer">
              <Image position="relative" src={`https://minpro-blog.purwadhikabootcamp.com/${item.imageURL}`} 
              zIndex="0" justifyContent="center" display="flex" />
              <Flex bgColor='rgba(0, 0, 0, .7)' h="100%" w="100%" className='blog-desc' position='absolute' 
              borderRadius='20px' cursor="pointer">
                <Box margin="auto" p="0px 50px" color="white">
                  <Heading color="white">{item.title}</Heading>
                  <Text mt="20px" color="white">by: {item.User.username}</Text>
                </Box>
              </Flex>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  );
}