import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button,Container,Row,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct,updateProduct} from '../../actions/productActions'

const ProductCreatePage = ({match,history}) => {
    const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  
  const dispatch = useDispatch()
  const  productDetail = useSelector((state)=>state.productDetail)
  const{loading,error,product} =productDetail

  const  productUpdate = useSelector((state)=>state.productUpdate)
  const{loading:loadingUpdate,error:errorUpdate,success:successUpdate} =productUpdate
  console.log(product);
  console.log(successUpdate);

 useEffect(()=>{
    console.log(successUpdate);
     if(successUpdate){
        console.log(successUpdate);
         dispatch({type:"PRODUCT_UPDATE_RESET"})
         history.push('/admin/productlist')
     }else{
        if(!product.name || product._id !==productId)
     {
         console.log(product);
         dispatch(getProduct(productId));
     }
     else{
        console.log(product);
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
     }
     }
     
 },[dispatch,product._id,successUpdate,history])

  const submitHandler =(e)=>{
      e.preventDefault();
      dispatch(updateProduct({
          _id:productId,
          name,
          price,
          image,
          brand,
          category,
          description,
          countInStock
      }))
  }
    return ( 
        <>
     <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
        <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h1>Edit/Create Product</h1>
            {error}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="countInStock">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter countInStock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary">
                {" "}
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
        </>
     );
}
 
export default ProductCreatePage;