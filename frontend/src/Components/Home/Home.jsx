import React, { useState,useEffect} from "react"
// import PropTypes from "prop-types"
import {Row,Col,Container} from 'react-bootstrap'
import Product from '../Product/Product'
import { useSelector,useDispatch } from "react-redux"
import Loader from "../Loader/Loader";
import {fetchProducts} from '../../redux/actions/productActions'
import ErrorMessage from "../ErrorMessage/ErrorMessage";
const Home = () => {
  const Products = useSelector((state) => state.products)
  const { loading,products,error } = Products;
  const dispatch = useDispatch();
  useEffect(() => {
    async function getProducts() {
      await dispatch(fetchProducts())
    }
    getProducts()
  }, [])
  const auth = useSelector((state) => state.auth)
  const { user } = auth
  return (
    <>
      {user && !user.confirmed ? (
        <div
          style={{ textAlign: "center" }}
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          Confirmation mail send to{" "}
          <a href={"mailto:" + user.email}>{user.email}</a>. Please confirm your
          account to get started.
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      ) : null}
      <Container>
      <h3>Latest Products</h3>
      {loading?<Loader/>:error!=''?(<ErrorMessage variant="danger">{error}</ErrorMessage>):<Row>
      {products.map((product)=>
        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
          <Product product={product}></Product>
        </Col>
      )}
      </Row>
      }
      </Container>
    </>
  )
}

// Home.propTypes = {}

export default Home
