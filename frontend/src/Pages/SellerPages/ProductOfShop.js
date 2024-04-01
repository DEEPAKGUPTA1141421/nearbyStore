import { Badge, Box, Image } from '@chakra-ui/react'
import React from 'react'
import BackIcon from '../../BackIcon'

const ProductOfShop = ({product}) => {
    const property = {
        imageUrl: 'https://bit.ly/2Z4KKcF',
        imageAlt: 'Rear view of modern home with pool',
        beds: 3,
        baths: 2,
        title: 'Modern home in city center in the heart of historic Los Angeles',
        formattedPrice: '$1,900.00',
        reviewCount: 34,
        rating: 4,
      }
  return (
    <>
    <BackIcon/>
    <Box  maxW='sm' maxH='lg' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <Image src={product.images[0]} alt={property.imageAlt}  style={{width: "100%",height: "50%"}}/>
  
        <Box p='6'>
          <Box display='flex' alignItems='baseline'>
            <Badge borderRadius='full' px='2' colorScheme='teal'>
              New
            </Badge>
            <Box
              color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='xs'
              textTransform='uppercase'
              ml='2'
            >
              {product.category} Category &bull; Lunched{product.createdAt} 
            </Box>
          </Box>
  
          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            noOfLines={1}
          >
            {product.description}
          </Box>
  
          <Box>
            {product.sellingPrice}
            <Box as='span' color='gray.600' fontSize='sm'>
              / Pics
            </Box>
          </Box>
  
          <Box display='flex' mt='2' alignItems='center'>
            {Array(5)
              .fill('')
              .map((_, i) => (
                // <StarIcon
                //   key={i}
                //   color={i < property.rating ? 'teal.500' : 'gray.300'}
                // />
                <></>
              ))}
              <Box as='span' ml='2' color='gray.600' fontSize='sm'>
              {product.totalRating} Rating
            </Box>
            <Box as='span' ml='2' color='gray.600' fontSize='sm'>
              {product.rating.length} reviews
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default ProductOfShop

