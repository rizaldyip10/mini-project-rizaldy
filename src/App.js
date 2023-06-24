import { Home } from "./pages/home";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { SignUp } from "./pages/signUp";
import { LogInByName } from "./pages/logInName";
import { LogInByPhone } from "./pages/logInPhone";
import { LogInByEmail } from "./pages/logInMail";
import { UserProfile } from "./pages/profile";
import { ResetPass } from "./pages/resetPass";
import { SearchPage } from "./pages/search";
import { VerifyPage } from "./pages/verify";
import { useDispatch } from "react-redux";
import  Axios  from "axios";
import { useEffect } from "react";
import { setValue } from "./redux/userSlice";
import { ResetPage } from "./pages/resetPage";
import { CreateBlog } from "./pages/createBlog";
import { BlogPage } from "./pages/blogPage";

const router = createBrowserRouter([
  {path: '/', element: <Home />},
  {path: '/signup', element: <SignUp />},
  {path: '/loginbyname', element: <LogInByName />},
  {path: '/loginbyphone', element: <LogInByPhone />},
  {path: '/loginbyemail', element: <LogInByEmail />},
  {path: '/profile', element: <UserProfile />},
  {path: '/reset', element: <ResetPass />},
  {path: '/search', element: <SearchPage />},
  {path: '/verification/:token', element: <VerifyPage />},
  {path: '/verification-change-email/:token', element: <VerifyPage />},
  {path: '/reset-password/:resetToken', element: <ResetPage />},
  {path: '/create-blog/', element: <CreateBlog />},
  {path: '/blog/:blogId', element: <BlogPage />},
])

function App() {
  const token = localStorage.getItem("token")
  console.log(token);
  const dispatch = useDispatch()

  const keepLogin = async () => {
    try {
      const response = await Axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/auth/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      dispatch(setValue(response.data))
      console.log(response.data);
    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    keepLogin()
  }, [])
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
