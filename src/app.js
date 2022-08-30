import React from 'react'
import Hompage from './homePage/hompage';
import {BrowserRouter, Route,Routes } from 'react-router-dom';
import Signup from './signup/signup';
import InfluencerSignUP from './signup/forms/influencerSignUpPage';
import BusinessSignUP from './signup/forms/businessSignUpForm';
import BusinessDashboard from './businessModules/businessDashboard';
import Notification from './businessModules/notification';
import CreateCampaign from './businessModules/createCampaign';
import Bprofile from './businessModules/bprofile';
import Idashboard from './influencerModule/influencerModules/dashboard/Idashboard';
import EligibleCampaign from './influencerModule/influencerModules/influencerEligibleCampaign/influencerEligibleCampaign';
import Inotification from './influencerModule/influencerModules/inotification';
import InfluencerProfile from './influencerModule/influencerModules/influencerProfile/influencerProfile';



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/'       element={<Hompage />}/>
        <Route exact path='/signup' element={<Signup />}/>
        <Route exact path='/signup/business' element={<BusinessSignUP />}/>
        <Route exact path='/signup/influencer' element={<InfluencerSignUP />}/>
        <Route exact path="/Bdashboard" element={<BusinessDashboard />} />
        <Route exact path="/notification" element={<Notification />} />
        <Route exact path="/newCampaign" element={<CreateCampaign />} />
        <Route exact path="/bprofile" element={<Bprofile />} />
        <Route exact path="/Idashboard" element={<Idashboard />} />
        <Route exact path="/Iprofile" element={<InfluencerProfile />} />
        <Route exact path="/eligibleCampaign" element={<EligibleCampaign />} />
        <Route exact path="/Inotification" element={<Inotification />} />


      </Routes>
    </BrowserRouter>    
  )
}

export default App;