import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import {Message} from './Message'
import { listTopProducts } from '../actions/productActions'

function ProductCarousel() {

    const dispatch = useDispatch()
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    const productTopRated = useSelector(state => state.productTopRated)
    const { error, loading, products } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return (loading ? <Loader />
        : error
            ? <Message variant='danger'>{error}</Message>
            : (
                <>
                    <Carousel fade interval={1000} activeIndex={index} onSelect={handleSelect}  variant="dark" className='m-3'>
                       {products.map(product=>(
                        <Carousel.Item key={product._id}>
                            <img
                            className="d-block w-100"
                            src={product.image}
                            alt="First slide"
                            />
                            <Carousel.Caption>
                            <h3>{product.name}</h3>
                            <p style={{"color":'black'}}>{product.description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>

                       ))}
                    </Carousel>
                                

                </>

            )

    )
}

export default ProductCarousel
