import React, { Fragment } from "react"
// import PropTypes from "prop-types"
import {Row,Col,Container} from 'react-bootstrap'
import products from '../../utils/products'
import Product from '../Product/Product'
import { useSelector } from "react-redux"
const Home = () => {
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
      <Row>
      {products.map((product)=>
        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
          <Product product={product}></Product>
        </Col>
      )}
      </Row>
      </Container>
    </>
  )
}

// Home.propTypes = {}

export default Home
