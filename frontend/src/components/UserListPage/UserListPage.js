import React ,{useState,useEffect}from 'react';
import { Table, Button} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../../actions/userActions";
import { Link, useHistory } from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap';

const UserListPage = () => {

    const dispatch = useDispatch();
    const userList = useSelector(state=>state.userList);
    const {loading,error,users} = userList;
    useEffect(()=>{
       dispatch(listUsers())
    },[dispatch])

    const deleteHandler=()=>{
        console.log('object');
    }

    return ( <>
          <h1>Users</h1>
          {loading?(<h2>loading</h2>):(
              <Table striped hover responsive bordered className="table-sm">
               <thead>
                   <tr>
                       <th>ID</th>
                       <th>NAME</th>
                       <th>EMAIL</th>
                       <th>ADMIN</th>
                       <th></th>
                   </tr>
               </thead>
               <tbody>
                   {users.map(user=>(
                       <tr key={user._id}>
                           <td>{user._id}</td>
                           <td>{user.name}</td>
                           <td>{user.email}</td>
                           <td>{user.isAdmin? (<i className='fas fa-check' style={{color:'green'}}/>):(<i className='fas fa-times' style={{color:'red'}}/>)}</td>
                           <td><LinkContainer to={`/user/${user._id}/edit`}>
                               <Button variant='light' className="btn-sm">
                                   <i className="fas fa-edit"></i>
                               </Button>
                           </LinkContainer>
                           <Button variant='danger' className="btn-sm" onClick={()=>{deleteHandler(user._id)}}>
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
 
export default UserListPage;