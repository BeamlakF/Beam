import Navbar from "./components/navbar";
import './navbar.css';
import Home from "./components/Home"
import './Home.css'
import Experience from "./components/Experience";
import './Experience.css'
import Services from "./components/Projects";
import Articles from "./components/Articles";
import './Articles.css';
import './projects.css';
import ArticleDetail from "./components/ArticleDetail";
import './ArticleDetail.css'
import { Routes, Route } from "react-router-dom";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import './footer.css'
import './contact.css'
import About from "./components/About";
import './About.css'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Home />
            <About/>
            <Experience />
            <Services />
            <Articles />
            <Contact />
          </>
        } />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
      </Routes>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
