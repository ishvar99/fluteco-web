import React, { Fragment } from "react"
// import PropTypes from "prop-types"
import {Row,Col} from 'react-bootstrap'
import products from  '../../utils/products'
import { useSelector } from "react-redux"
const Home = (props) => {
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
      <h3>Latest Products</h3>
      <Row>
        <Col sm={12} md={6} lg={4}>
          {products.forEach((product)=>
           <p>{product.name}</p> 
          )}
        </Col>
      </Row>
    </>
  )
}

// Home.propTypes = {}

export default Home
