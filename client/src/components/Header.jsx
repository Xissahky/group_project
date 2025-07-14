import "./Header.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInitials, setUserInitials] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(open => !open);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const user = JSON.parse(localStorage.getItem("user")); 
    if (user?.firstName && user?.lastName) {
      const initials = user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase();
      setUserInitials(initials);
    }
  }, [location]);

  return (
    <>
      <header className="header desktop-header">
        <div className="header-title">
          <Link to="/" className="nav-link">
            STUDY BUDDY
          </Link>
        </div>

        <nav className="center-links-desktop">
          <Link to="/" className="nav-link">
            Home
          </Link>

          {isLoggedIn ? (
            <>
              <Link to="/teammates" className="nav-link">
                Matches
              </Link>
              <Link to="/chats" className="nav-link">
                Messages
              </Link>
            </>
          ) : (
            <>
              <Link to="/features" className="nav-link">
                Features
              </Link>
              <Link to="/contact" className="nav-link">
                Contact Us
              </Link>
            </>
          )}
        </nav>

        <div className="right-buttons">
          {isLoggedIn ? (
            <Link to="/profile" className="profile-btn desktop-profile">
              {userInitials}
            </Link>
          ) : (
            <>
              <Link to="/login" className="log-btn">
                Login
              </Link>
              <Link to="/register" className="log-btn">
                Register
              </Link>
            </>
          )}
        </div>
      </header>
      <header className="header mobile-header">
        <div className="mobile-header-content">
          <div className="header-title">
            <Link to="/" className="nav-link" onClick={closeMenu}>
              STUDY BUDDY
            </Link>
          </div>

          <div
            className={`burger-icon${menuOpen ? ' open' : ''}`}
            onClick={toggleMenu}
          >
            <div className="burger-line" />
            <div className="burger-line" />
            <div className="burger-line" />
          </div>
        </div>
        


          <nav className={`center-links-mobile${menuOpen ? ' open' : ''}`}>
            <Link to="/" className="nav-link" onClick={closeMenu}>
              Home
            </Link>

            {isLoggedIn ? (
              <>
                <Link to="/teammates" className="nav-link" onClick={closeMenu}>
                  Matches
                </Link>
                <Link to="/chats" className="nav-link" onClick={closeMenu}>
                  Messages
                </Link>
                <Link to="/profile" className="nav-link" onClick={closeMenu}>
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link to="/features" className="nav-link" onClick={closeMenu}>
                  Features
                </Link>
                <Link to="/contact" className="nav-link" onClick={closeMenu}>
                  Contact Us
                </Link>
                <Link to="/login" className="nav-link" onClick={closeMenu}>
                  Login
                </Link>
                <Link to="/register" className="nav-link" onClick={closeMenu}>
                  Register
                </Link>
              </>
            )}
          </nav>

      </header>

    </>



    
    
  );
};

export default Header;
