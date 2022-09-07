import React from 'react'
import Hompage from './homePage/hompage';
import {BrowserRouter, Route,Routes } from 'react-router-dom';
import Signup from './signup/signup';
import InfluencerSignUP from './signup/forms/influencerSignUpPage';
import BusinessSignUP from './signup/forms/businessSignUpForm';
import Bdashboard from './businessModules/businessModule/dashboard/Bdashboard';
import Bnotification from './businessModules/businessModule/bnotification';
import CreateCampaign from './businessModules/businessModule/createCamapign/createCampaign';
import BusinessProfile from './businessModules/businessModule/businessProfile/businessProfile';
import Idashboard from './influencerModule/influencerModules/dashboard/Idashboard';
import EligibleCampaign from './influencerModule/influencerModules/influencerEligibleCampaign/influencerEligibleCampaign';
import Inotification from './influencerModule/influencerModules/inotification';
import InfluencerProfile from './influencerModule/influencerModules/influencerProfile/influencerProfile';
import EditCampaign from './businessModules/businessModule/dashboard/editCampaign';
import ShowCampaign from './businessModules/businessModule/dashboard/showCampaign';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/'       element={<Hompage />}/>
        <Route exact path='/signup' element={<Signup />}/>
        <Route exact path='/signup/business' element={<BusinessSignUP />}/>
        <Route exact path='/signup/influencer' element={<InfluencerSignUP />}/>
        <Route exact path="/Bdashboard" element={<Bdashboard />} />
        <Route exact path="/notification" element={<Bnotification />} />
        <Route exact path="/newCampaign" element={<CreateCampaign />} />
        <Route exact path="/bdashboard/showCamapign/editcampaign" element={<EditCampaign />} />
        <Route exact path="/Bdashboard/showCamapign" element={<ShowCampaign />} />
        <Route exact path="/bprofile" element={<BusinessProfile />} />
        <Route exact path="/Idashboard" element={<Idashboard />} />
        <Route exact path="/Iprofile" element={<InfluencerProfile />} />
        <Route exact path="/eligibleCampaign" element={<EligibleCampaign />} />
        <Route exact path="/Inotification" element={<Inotification />} />


      </Routes>
    </BrowserRouter>    
  )
}

export default App;