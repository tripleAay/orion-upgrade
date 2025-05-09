import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "../firebase/Firebase"; // Adjust path as needed
import { toast } from "react-toastify";
import {
  Box,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import logoPlaceholder from "../assets/images/logo.png"; // Replace with your logo

// Navigation links
const navLinks = [
  { name: "Accounts", href: "/accounts" },
  { name: "Card", href: "/card" },
  { name: "Transaction History", href: "/accounthistory" },
  { name: "Investment", href: "/investment" },
  { name: "Account Profile", href: "/accountprofile" },
];

// Animation variants for header, menu, and mobile menu
const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const menuVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
};

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.3, ease: "easeOut" } },
};

const Mainhead = () => {
  const [userData, setUserData] = useState({ firstName: "", lastName: "" });
  const [profileImage, setProfileImage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch user data and profile image
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        db.collection("Profile")
          .doc(userId)
          .get()
          .then((doc) => {
            if (doc.exists && doc.data().profileimage) {
              setProfileImage(doc.data().profileimage);
            }
          })
          .catch((error) => {
            console.error("Error retrieving profile image:", error);
          });

        const docId = localStorage.getItem("userDocId");
        if (docId) {
          db.collection("users")
            .doc(docId)
            .get() // Removed erroneous .get*T
            .then((doc) => {
              if (doc.exists) {
                setUserData({
                  firstName: doc.data().first_name || "",
                  lastName: doc.data().last_name || "",
                });
              }
            })
            .catch((error) => {
              console.error("Error retrieving user data:", error);
            });
        }
      } else {
        // navigate("/signin");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Handle sign-out
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        toast.success("You have successfully signed out.", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/signin");
      })
      .catch((error) => {
        toast.error(`Error signing out: ${error.message}`, {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  // Handle menu open/close
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Toggle mobile menu
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 w-full bg-[#423f90] dark:bg-[#0F2336] shadow-lg z-50 transition-all duration-300"
    >
      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          px: { xs: 2, md: 4 },
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "white",
        }}
      >
        {/* Logo Section */}
        <Box display="flex" alignItems="center" gap={2}>
          <motion.img
            src={logoPlaceholder}
            alt="Orion Investment Logo"
            className="h-10 w-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.25rem", md: "1.5rem" },
              color: "#E6F0FA",
              display: { xs: "none", md: "block" },
            }}
          >
            Orion Investment
          </Typography>
        </Box>

        {/* Navigation Links (Desktop) */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 4,
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          {navLinks.map((link) => (
            <motion.div
              key={link.name}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Typography
                component={Link}
                to={link.href}
                sx={{
                  color: "#E6F0FA",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: "medium",
                  "&:hover": { color: "#3AB4B5" },
                  transition: "color 0.2s",
                }}
              >
                {link.name}
              </Typography>
            </motion.div>
          ))}
        </Box>

        {/* Profile Section */}
        <Box display="flex" alignItems="center" gap={2}>
          <Tooltip title={`${userData.firstName} ${userData.lastName}`}>
            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
              <Avatar
                src={profileImage}
                alt="Profile"
                sx={{
                  width: { xs: 40, md: 48 },
                  height: { xs: 40, md: 48 },
                  bgcolor: "#3AB4B5",
                  border: "2px solid #E6F0FA",
                  cursor: "pointer",
                }}
                onClick={handleMenuOpen}
              />
            </motion.div>
          </Tooltip>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "#E6F0FA", fontSize: "0.9rem", fontWeight: "medium" }}
            >
              {userData.firstName} {userData.lastName}
            </Typography>
            <Typography
              component={Link}
              to="/accountprofile"
              sx={{
                color: "#A3BFFA",
                textDecoration: "none",
                fontSize: "0.75rem",
                "&:hover": { color: "#3AB4B5" },
                transition: "color 0.2s",
              }}
            >
              View Profile
            </Typography>
          </Box>

          <Tooltip title="Log Out">
            <IconButton
              onClick={handleSignOut}
              sx={{ color: "#E6F0FA", "&:hover": { color: "#3AB4B5" } }}
            >
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* Mobile Menu Toggle */}
          <IconButton
            onClick={toggleMobileMenu}
            sx={{
              display: { xs: "flex", md: "none" },
              color: "#E6F0FA",
              "&:hover": { color: "#3AB4B5" },
            }}
          >
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {anchorEl && (
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    bgcolor: "#1A3C5A",
                    color: "#E6F0FA",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                    borderRadius: "8px",
                  },
                }}
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                component={motion.div}
              >
                <MenuItem
                  onClick={handleMenuClose}
                  component={Link}
                  to="/accountprofile"
                  sx={{ color: "#E6F0FA", "&:hover": { bgcolor: "#3AB4B5" } }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={handleMenuClose}
                  sx={{ color: "#E6F0FA", "&:hover": { bgcolor: "#3AB4B5" } }}
                >
                  Settings
                </MenuItem>
                <MenuItem
                  onClick={handleSignOut}
                  sx={{ color: "#E6F0FA", "&:hover": { bgcolor: "#3AB4B5" } }}
                >
                  Log Out
                </MenuItem>
              </Menu>
            )}
          </AnimatePresence>
        </Box>
      </Box>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            className="bg-[#1A3C5A] dark:bg-[#0F2336] px-4 py-4 md:hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block py-2 text-[#E6F0FA] hover:bg-[#3AB4B5] hover:text-white rounded transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Mainhead;