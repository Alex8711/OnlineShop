import React ,{useState,useEffect}from 'react';
import { Table, Button,Row,Col} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts,deleteProduct,createProduct } from "../../actions/productActions";
import { Link, useHistory } from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap';

const AdminProductListPage = ({match}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const productList = useSelector(state=>state.productList);
    const productDelete = useSelector(state=>state.productDelete);
    const productCreate = useSelector(state=>state.productCreate);
    const userLogin = useSelector(state=>state.userLogin);
    const {loading,error,products} = productList;
    const {loading:loadingDelete,error:errorDelete,success:successDelete} = productDelete;
    const {loading:loadingCreate,error:errorCreate,success:successCreate,product:createdProduct} = productCreate;
    const {userInfo} = userLogin;
    useEffect(()=>{
        dispatch({type:"PRODUCT_CREATE_RESET"})
        if(!userInfo || !userInfo.isAdmin ){
            history.push('/login')
        }
        if(successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts());
        }
       
    },[dispatch,history,userInfo,successDelete,successCreate,createdProduct])

    const deleteHandler=(id)=>{
        if(window.confirm('Are you sure')){
           dispatch(deleteProduct(id))
        }
        
    }
    const createProductHandler=()=>{
        dispatch(createProduct());
    }

    return ( <>
    <Row className="align-items-center">
        <Col> <h1>Products</h1> </Col>
        <Col className="text-right"> <Button className='my-3' onClick={createProductHandler}><i className='fas fa-plus'></i>Create Product</Button> </Col>
    </Row>
          {loading?(<h2>loading</h2>):(
              <Table striped hover responsive bordered className="table-sm">
               <thead>
                   <tr>
                       <th>ID</th>
                       <th>NAME</th>
                       <th>PRICE</th>
                       <th>CATEGORY</th>
                       <th>BRAND</th>
                       <th></th>
                   </tr>
               </thead>
               <tbody>
                   {products.map(product=>(
                       <tr key={product._id}>
                           <td>{product._id}</td>
                           <td>{product.name}</td>
                           <td>${product.price}</td>
                           <td>{product.category}</td>
                           <td>{product.brand}</td>
                           <td><LinkContainer to={`/admin/product/${product._id}/edit`}>
                               <Button variant='light' className="btn-sm">
                                   <i className="fas fa-edit"></i>
                               </Button>
                           </LinkContainer>
                           <Button variant='danger' className="btn-sm" onClick={()=>{deleteHandler(product._id)}}>
                               <i className='fas fa-trash'></i>
                           </Button>
                           </td>
                       </tr>
                   ))}
               </tbody>
              </Table>
          )}
    </> );
}
 
export default AdminProductListPage;