import { Component } from "react";
import wishlist from'../assets/wishlist.png';
import notification from '../assets/bell.png';
import "./NavbarStyles.css";
import cart from '../assets/shopping-cart.png';
import { Link } from "react-router-dom";
class Navbar extends Component {
  state = { clicked: false };
  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };
  render() {
    return (
      <>
        <nav id="fullnav">

        <div style={{marginLeft:"20px"}} className="name">FODITO</div>
        <div className="navimages">
        <Link to="./Notify"><img src={notification} id="cartimg"></img></Link>
        <Link to="./Wishlist"> <img style={{marginLeft:"10px",marginRight:"10px"}} src={wishlist} id="cartimg"></img></Link>
       <Link to="./Cart"><img style={{marginRight:"20px"}} src={cart} id="cartimg"></img></Link>
              </div>
            <div id="mobile" onClick={this.handleClick}>  
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
