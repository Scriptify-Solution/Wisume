import { Route, Routes } from "react-router-dom";
import Header from "./pages/Header-Footer/Header";
import Footer from "./pages/Header-Footer/Footer";
import Login from "./login/Login";
import Signup from "./login/Signup";
import ResetPassword from "./login/resetPassword";
import { Index } from "./pages/index";
import "./App.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import LinkedInCallback from "./components/LinkedInCallback";
import { CreateResume } from "./pages/create-resume/create-resume";
import CoverLetter from "./pages/coverletter/CoverLetter";
import LandingPage from "./pages/LandingPage";
import Template from "./pages/templetepages/Templete";
import { useEffect } from "react";
import LoadingPage from "./pages/LoadingPage";
import LoginRouteChecking from "./context/LoginRouteChecking";
import ContactPage from "./pages/ContactPage";
import { axiosInstance } from "./services/axiosInstance";
import ATSScoreCheckingPage from "./pages/atsScoreChecking/ATSScoreCheckingPage";
function App() {
  const { startLoading, stopLoading, setTemplateList, setCoverLetterList } =
    useAuth();

  useEffect(() => {
    // get all resume templates
    getAllTemplates();
  }, []);

  const getAllTemplates = async () => {
    try {
      startLoading();
      const response = await axiosInstance.get("auth/templates");
      console.log(response.data.data);

      if (response && response.status === 200 && response.data?.data) {
        const templateData = response.data.data.filter(
          (item) => item.Type === "template"
        );
        setTemplateList(templateData);

        //filter cover letter
        const coverletterData = response.data.data.filter(
          (item) => item.Type === "coverLetter"
        );
        setCoverLetterList(coverletterData);
      }
      stopLoading();
    } catch (e) {
      stopLoading();
    }
  };

  return (
    <>
      <Routes>
        <Route element={<LoginRouteChecking />}>
          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        <Route
          path="/"
          element={
            <>
              <Header />
              <Index />
              <Footer />
            </>
          }
        />

        <Route
          path="/contact"
          element={
            <>
              <Header />
              <ContactPage />
              <Footer />
            </>
          }
        />

        <Route
          path="/ats-checker"
          element={
            <>
              <Header />
              <ATSScoreCheckingPage />
              <Footer />
            </>
          }
        />

        <Route
          path="/loading"
          element={
            <>
              <LoadingPage />
            </>
          }
        />
        <Route
          path="/templates"
          element={
            <>
              <Header />
              <Template />
              <Footer />
            </>
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/create-resume"
            element={
              <>
                <CreateResume />
              </>
            }
          />

          <Route
            path="/edit-resume/:id"
            element={
              <>
                <CreateResume />
              </>
            }
          />

          <Route
            path="/edit-cover-letter/:id"
            element={
              <>
                <CoverLetter />
              </>
            }
          />
          <Route path="/cover-letter" element={<CoverLetter />} />

          <Route
            path="/landingpage"
            element={
              <>
                <Header />
                <LandingPage />
                <Footer />
              </>
            }
          />
        </Route>

        <Route path="/auth/linkedin/callback" element={<LinkedInCallback />} />
      </Routes>
    </>
  );
}

export default App;
