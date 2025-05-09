import { useState, useEffect, Component } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Tooltip,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Error Boundary Component
class ErrorBoundary extends Component {
  state = { error: null, errorInfo: null };

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("Error in Account component:", error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <Box sx={{ textAlign: "center", py: 3 }}>
          <Typography
            variant="h5"
            color="error"
            sx={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
          >
            Oops, Something Went Wrong
          </Typography>
          <Typography
            variant="body1"
            color="#A3BFFA"
            sx={{ mt: 1, fontFamily: "Inter, sans-serif", fontSize: { xs: "1rem", md: "1.25rem" } }}
          >
            We couldn’t load your accounts. Try again!
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            sx={{
              mt: 2,
              bgcolor: "#3AB4B5",
              "&:hover": { bgcolor: "#2A8A8B" },
              fontFamily: "Inter, sans-serif",
              textTransform: "none",
              fontSize: "1rem",
              px: 3,
              py: 1,
            }}
          >
            Retry
          </Button>
        </Box>
      );
    }
    return this.props.children;
  }
}

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hover: { scale: 1.03, boxShadow: "0 16px 32px rgba(0, 0, 0, 0.2)", transition: { duration: 0.3 } },
};

const balanceVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const Account = () => {
  const [accountData, setAccountData] = useState({
    accountNumber: "*86233",
    balance: "$12,345.67",
    investments: "$5,678.90",
    earnings: "$1,234.56",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBalances, setShowBalances] = useState(true);

  // Fetch account data from Firestore (v9 modular)
  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const userId = localStorage.getItem("userDocId");
        console.log("userDocId:", userId);
        if (!userId) {
          console.warn("No userDocId found in localStorage");
          setError("Please sign in to view your accounts");
          setLoading(false);
          return;
        }

        const docRef = doc(db, "accounts", userId);
        const docSnap = await getDoc(docRef);
        console.log("Firestore data:", docSnap.exists() ? docSnap.data() : "No document found");

        if (docSnap.exists()) {
          setAccountData({
            accountNumber: docSnap.data().accountNumber || "*86233",
            balance: docSnap.data().currentBalance || "$12,345.67",
            investments: docSnap.data().brokerage || "$5,678.90",
            earnings: docSnap.data().dividend || "$1,234.56",
          });
        } else {
          console.log("Using fallback data: No account document found");
        }
        setLoading(false);
      } catch (error) {
        console.error("Firestore error:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAccountData();
  }, []);

  // Toggle balance visibility
  const toggleBalances = () => {
    setShowBalances((prev) => !prev);
  };

  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 3 }}>
        <Typography
          variant="h5"
          color="error"
          sx={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
        >
          Error: {error}
        </Typography>
        <Typography
          variant="body1"
          color="#A3BFFA"
          sx={{ mt: 1, fontFamily: "Inter, sans-serif", fontSize: { xs: "1rem", md: "1.25rem" } }}
        >
          Please try again or contact support.
        </Typography>
        <Button
          variant="contained"
          onClick={() => window.location.reload()}
          sx={{
            mt: 2,
            bgcolor: "#3AB4B5",
            "&:hover": { bgcolor: "#2A8A8B" },
            fontFamily: "Inter, sans-serif",
            textTransform: "none",
            fontSize: "1rem",
            px: 3,
            py: 1,
          }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <ErrorBoundary>
      <Box
        component="section"
        sx={{
          bgcolor: "#0F1A2A", // Dark navy background
          borderRadius: "20px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
          maxWidth: "1600px",
          mx: "auto",
          mt: 8,
          overflow: "hidden",
          fontFamily: "Inter, sans-serif",
          py: 3,
          px: { xs: 2, md: 4 },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 2, md: 4 },
            py: 2,
            bgcolor: "linear-gradient(to right, #1A3C5A, #2A5A7A)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.75rem", md: "2.5rem" },
              color: "#E6F0FA",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Your Banking Dashboard
          </Typography>
          <Tooltip title={showBalances ? "Hide Values" : "Show Values"}>
            <IconButton
              onClick={toggleBalances}
              sx={{
                color: "#E6F0FA",
                "&:hover": { color: "#D4A017", bgcolor: "rgba(212, 160, 23, 0.1)" },
                transition: "all 0.3s",
              }}
            >
              {showBalances ? <VisibilityOffIcon sx={{ fontSize: "1.5rem" }} /> : <VisibilityIcon sx={{ fontSize: "1.5rem" }} />}
            </IconButton>
          </Tooltip>
        </Box>

        {/* Main Content */}
        <Box sx={{ px: { xs: 2, md: 4 }, py: 3 }}>
          {loading ? (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <CircularProgress sx={{ color: "#3AB4B5", fontSize: "3rem" }} size={60} />
              </motion.div>
              <Typography
                variant="body1"
                color="#A3BFFA"
                sx={{ mt: 2, fontFamily: "Inter, sans-serif", fontSize: { xs: "1rem", md: "1.25rem" } }}
              >
                Loading your accounts...
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {/* Account Info Card */}
              <Grid item xs={12} md={4}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  transition={{ delay: 0.1 }}
                >
                  <Card
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      borderRadius: "16px",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                      color: "#E6F0FA",
                      p: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <CardContent sx={{ p: 0 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontSize: { xs: "1.5rem", md: "1.75rem" },
                          fontFamily: "Inter, sans-serif",
                          color: "#E6F0FA",
                        }}
                      >
                        Account: {accountData.accountNumber}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#A3BFFA",
                          mt: 1,
                          fontFamily: "Inter, sans-serif",
                          fontSize: { xs: "1rem", md: "1.25rem" },
                        }}
                      >
                        Your Banking Overview
                      </Typography>
                    </CardContent>
                    <Box sx={{ mt: 2, textAlign: "right" }}>
                      <Tooltip title="View Full Details">
                        <IconButton
                          component={Link}
                          to="/account-details"
                          sx={{
                            color: "#D4A017",
                            "&:hover": { bgcolor: "rgba(212, 160, 23, 0.1)" },
                            p: 1.5,
                          }}
                        >
                          <ArrowForwardIcon sx={{ fontSize: "1.5rem" }} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>

              {/* Balance Card */}
              <Grid item xs={12} md={2.66}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  transition={{ delay: 0.2 }}
                >
                  <Card
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      borderRadius: "16px",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                      color: "#E6F0FA",
                      p: 3,
                      height: "100%",
                      textAlign: "center",
                    }}
                  >
                    <CardContent sx={{ p: 0 }}>
                      <Tooltip title="Your available money in the account">
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            color: "#A3BFFA",
                            fontFamily: "Inter, sans-serif",
                            fontSize: { xs: "0.875rem", md: "1rem" },
                          }}
                        >
                          Balance
                        </Typography>
                      </Tooltip>
                      <motion.div
                        key={showBalances ? "visible" : "hidden"}
                        variants={balanceVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 700,
                            color: "#34C759",
                            fontSize: { xs: "1.75rem", md: "2.5rem" },
                            fontFamily: "Inter, sans-serif",
                            mt: 1,
                            textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          {showBalances ? accountData.balance : "••••••"}
                        </Typography>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>

              {/* Investments Card */}
              <Grid item xs={12} md={2.66}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  transition={{ delay: 0.3 }}
                >
                  <Card
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      borderRadius: "16px",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                      color: "#E6F0FA",
                      p: 3,
                      height: "100%",
                      textAlign: "center",
                    }}
                  >
                    <CardContent sx={{ p: 0 }}>
                      <Tooltip title="Money invested in stocks or funds">
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            color: "#A3BFFA",
                            fontFamily: "Inter, sans-serif",
                            fontSize: { xs: "0.875rem", md: "1rem" },
                          }}
                        >
                          Investments
                        </Typography>
                      </Tooltip>
                      <motion.div
                        key={showBalances ? "visible" : "hidden"}
                        variants={balanceVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 700,
                            color: "#D4A017",
                            fontSize: { xs: "1.75rem", md: "2.5rem" },
                            fontFamily: "Inter, sans-serif",
                            mt: 1,
                            textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          {showBalances ? accountData.investments : "••••••"}
                        </Typography>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>

              {/* Earnings Card */}
              <Grid item xs={12} md={2.66}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  transition={{ delay: 0.4 }}
                >
                  <Card
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      borderRadius: "16px",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                      color: "#E6F0FA",
                      p: 3,
                      height: "100%",
                      textAlign: "center",
                    }}
                  >
                    <CardContent sx={{ p: 0 }}>
                      <Tooltip title="Extra money earned from investments">
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            color: "#A3BFFA",
                            fontFamily: "Inter, sans-serif",
                            fontSize: { xs: "0.875rem", md: "1rem" },
                          }}
                        >
                          Earnings
                        </Typography>
                      </Tooltip>
                      <motion.div
                        key={showBalances ? "visible" : "hidden"}
                        variants={balanceVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 700,
                            color: "#E6F0FA",
                            fontSize: { xs: "1.75rem", md: "2.5rem" },
                            fontFamily: "Inter, sans-serif",
                            mt: 1,
                            textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          {showBalances ? accountData.earnings : "••••••"}
                        </Typography>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </ErrorBoundary>
  );
};

export default Account;