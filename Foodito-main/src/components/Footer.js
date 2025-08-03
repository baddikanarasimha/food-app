import React from "react";
import arrow from "../assets/down-arrow.png";
import "./footer.css";
import app from '../assets/appstore.png';
import play from '../assets/playstore.png';
import linkedin from'../assets/linkedin.png';
import facebook from'../assets/facebook.png';
import twitter from'../assets/twitter.png';
function Footer(){
    return(
        <>
        <div id="exp">Explore options near me</div><br></br>


        <div className="cards1"
        >
        <div id="explore">
        Popular cusiness near me
        </div>
        <div >
            <img id="downarrow" src={arrow}></img>
        </div>
       </div>

             <br></br>

       <div className="cards1">
        <div id="explore">
            Popular restaurants near me
        </div>
        <div >
            <img id="downarrow" src={arrow}></img>
        </div>
       </div>

            <br></br>

       <div className="cards1">
        <div id="explore">
          Cities we deliver to
        </div>
        <div >
            <img id="downarrow" src={arrow}></img>
        </div>
       </div> <br></br>

       
       <div>
        <center style={{fontWeight:"bold", fontSize:"18px"}}>For Better Experience Download</center>
        <center style={{fontWeight:"bold", fontSize:"18px"}}>Fodito App</center>
       </div>
       <center>
        <img style={{height:"100px", width:"260px" }}src={play} ></img>
        <img style={{height:"100px", width:"270px"}} src={app} ></img>
       </center>


       <div className="footercontent">
        <div id="name">Fodito..</div>
        <div style={{color:"white",padding:"0px 20px"}}>The href attribute is required for an anchor to be keyboard accessible. Provide a valid, navigable address as the href value. If you cannot provide an href, but still
        </div>


        <div className="mediaimages">
            <img style={{margin:"0px 0px 0px 15px"}} id="media" src={facebook}></img>
            <img id="media" src={twitter}></img>
            <img id="media" src={linkedin}></img>
        </div>

        <div id="name1">
            COMPANY
        </div>
        <div className="content">
            <div>Home</div>
            <div>About</div>
            <div>Delivery</div>
            <div>Privacy policy</div>
        </div>
        
        <div id="name1">GET IN TOUCH</div>
        <div className="content">
        <div>+1-232-243-3566</div>
        <div>contact@fodito.com</div>
        </div>
            <hr style={{margin:"35px"}}/>
        <div id="lastcontent">Copyright2024 &copy Fodito.com-All Right Reversed</div>
       </div>
        </>

        )
}
export default Footer;