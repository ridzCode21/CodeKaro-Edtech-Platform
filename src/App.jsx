import "./App.css";
import { Home } from "./pages/Home";
import { Route,Routes} from "react-router-dom";
import Signup from "./pages/Signup";
import Navbar from "./components/Common/Navbar";
import OpenRoute from "./components/core/auth/OpenRoute";
import ForgetPassword from "./pages/ForgetPassword";
import VerifyOtp from "./pages/VerifyOtp";
import Login from './pages/Login'
import PrivateRoute from "./components/core/auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Myprofile from "./components/core/Dashboard/Myprofile";
import Settings from "./components/core/Dashboard/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart/index";
import AddCourse from "./components/core/Dashboard/addCourse";
import MyCourses from "./components/core/Dashboard/MyCourses/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse/EditCourse";
import CatlogCard from "./components/core/Catlog/CatalogCard";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import InstructorDashboard from "./components/core/Dashboard/InstructorDashboard/InstructorDashboard";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import { ACCOUNT_TYPE } from "./utils/constants";
import ViewCourse from "./pages/ViewCourse";
import { useSelector } from "react-redux";
import ContactUs from "./pages/ContactUs";
import About from "./pages/About";
function App() {
  const user = useSelector((state) => state.profile.user);
  return (
   <div className="min-w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path='/' element = {<Home/>}></Route>
        <Route path='/signup' 
         element = {
          <OpenRoute>
            <Signup/>
          </OpenRoute>
         }/>
        
        <Route path='/forget-password' 
         element = {
          <OpenRoute>
            <ForgetPassword/>
          </OpenRoute>
         }/>
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<About/>} />

          <Route path='/login' 
         element = {
          <OpenRoute>
            <Login/>
          </OpenRoute>
         }/>
          <Route path='/catalog/:catalog' 
         element = {
          <PrivateRoute>
               <Catalog/>
            </PrivateRoute>
         }/>
          <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path="/verify-email" element={<VerifyOtp />}/>
        <Route 
            element ={
            <PrivateRoute>
               <Dashboard/>
            </PrivateRoute>
           }>
        <Route path="dashboard/my-profile" element ={<Myprofile/>}/>
        <Route path="dashboard/settings" element ={<Settings/>}/>
        <Route path="dashboard/enrolled-courses" element ={<EnrolledCourses/>}/>
        <Route path="dashboard/cart" element ={<Cart/>}/>
        <Route path="dashboard/add-course" element ={<AddCourse/>}/>
        <Route path="dashboard/my-courses" element ={<MyCourses/>}/>
        <Route path="dashboard/edit-course/:courseId" element={<EditCourse />}/>
        <Route
                path="dashboard/instructor"
                element={<InstructorDashboard />}
              />
            </Route>

            <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="/dashboard/enrolled-courses/view-course/:courseId/section/:sectionId/sub-section/:subsectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>
            
      </Routes>
     </div> 
  );
}

export default App;
