import React from 'react';
import './homepage.css';
import {BsArrowRight} from 'react-icons/bs';
import {AiFillCheckCircle} from 'react-icons/ai';
import { useNavigate,Link} from 'react-router-dom';


const Hompage = () => {
    const navigate = useNavigate();
   

    const handleSignup = (event) => {
        navigate('/signUp');
    }

 
    return (
        <div className='HomePage'>
            <header className='header'>
                <div className='celebstudio'>Celebstudio</div>
                
                <div className='getStarted'>
            
                    <ul className='headerList'>
                       <li> <Link to='/about'>How it works</Link></li>
                        <li>Become a creator</li>
                    </ul>
        
                    <button className='startedButton' onClick={handleSignup}>Get Started <span className='arrowIcon'><BsArrowRight/></span></button>
                </div>
            </header>
            <div className='container'>
                <div className='first'>
                    <div>
                <div className='firstHeader'>Get customers talking about your brand </div>
                        <div className='firstHeader2'>and buying your product with creator marketing</div>            
                        <div className='firstContent'>
                             <div className='FCcontent'> <div><AiFillCheckCircle/> </div>Quickly launch<br/>campaign </div>
                             <div className='FCcontent'> <div><AiFillCheckCircle/> </div>Match with <br/>creator     </div>
                             <div className='FCcontent'> <div><AiFillCheckCircle/> </div>Lisence creator<br/> content</div>
                        </div>       
                </div>
                </div>


                <div className='second'>
                    <div className='SeconContent'> 
                    <div className='SCcontent'>Match with 
                        creators who love 
                        your brand
                        </div> 
                        <div className='SCcontent2'><br/>
                            Stop using search tools. Try Handraise, it finds creators who are the top match for your campaign.
                            <br/><a href='/about'>LearnMore</a></div>
                    </div>
                    <div className='SecondImage'>
                    <img src='homepage1.PNG' alt='creator'></img>
                    </div>
                </div>


                <div className='third'>
                    <div className='thirdTtile'>Run a test campaign today! </div><br/>
                        <div className='thirdDesc'>Try a new channel to reach your customers<br/> 
                        and grow your business.<br/>
                        <button className='getStarted2' onClick={()=>navigate('/signUp')}>Get Started <span className='arrowIcon'><BsArrowRight/></span></button>
                        </div>
                </div>

                <div className='fourth'>
                    <div className='fourthImage'>
                    <img src='./homepage2.PNG' alt='canoono'/>
                    </div>
                    <div className='fourthReview'>
                    <h2>Buy paid social through creator handles</h2>
                        Turn content into paid social ads using<br/>
                        the creator's handle—performs better than
                        the ads you're used to.<br/>
                        
                        <hr/>
                        "With celebStudio, the results have been 
                         fantastic. We’ve seen our CPA and ROI come
                         in well above the bar, and we’ve seen thousands
                          of leads generated."
                         <div><br/>Zang Wang, Marketing Manager,Cononn</div>
                    </div>
                </div>
                <div><hr/></div>
                

                <footer className='footer'>
                    <div className='footerDiv'>first list</div>
                    <div className='footerDiv'>second list</div>
                    <div className='footerDiv'>third list</div>
                </footer>

            </div>
        </div>
    )
}

export default Hompage;