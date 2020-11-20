import React, { Fragment, useEffect } from "react"
import { Navbar, Nav ,Container} from "react-bootstrap"
import { Link } from "react-router-dom"
import { LogoutUser } from "../../redux/actions/authActions"
import { useSelector, useDispatch } from "react-redux"
import { LoadUser } from "../../redux/actions/authActions"
import Backdrop from "../../Components/Backdrop/Backdrop"
import parseCookie from "../../utils/parseCookie"
import '../../App.scss';
const Header = () => {
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { loading, user, isAuthenticated } = auth
  useEffect(() => {
    async function fetchUser() {
      await dispatch(LoadUser())
    }
    let cookieObject = parseCookie(document.cookie)
    if (cookieObject && cookieObject["token"]) fetchUser()
  }, [])
  return (
    <>
      {loading ? <Backdrop /> : null}
      <div className="Header">
        <Navbar
        
          collapseOnSelect
          expand="lg"
          variant="dark"
          className="color-nav px-4 py-2"
        >
        
          <Link to="/">
            <Navbar.Brand className="brand-size">Fluteco</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              {!user ? (
                <Fragment>
                 
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                    <i className="fas fa-user"></i> Login
                    </Link>
                  </li>
                </Fragment>
              ) : (
                <Fragment>
                  <li className="nav-item">
                    <Link to="/" className="nav-link pr-3">
                   <i className="fas fa-user"></i>   Hello, {user.name.split(" ")[0]}
                    </Link>
                  </li>
                  <li className="nav-item ">
                <Link to="/" className="nav-link pr-3">
                <i className="fas fa-shopping-cart"></i> Cart
                </Link>
              </li>
                  <li className="nav-item">
                    <a
                      onClick={() => dispatch(LogoutUser())}
                      style={{ cursor: "pointer" }}
                      className="nav-link"
                    >
                    <i className="fas fa-sign-out-alt"></i> Logout
                    </a>
                  </li>
                 
                </Fragment>
              )}
             
            </Nav>
          </Navbar.Collapse>
          
        </Navbar>
      </div>
    </>
  )
}

Header.propTypes = {}

export default Header
