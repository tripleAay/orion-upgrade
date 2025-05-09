import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Chart from "chart.js/auto"; // Ensure chart.js is installed
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  CircularProgress,
  Button, // Added missing Button import
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hover: { scale: 1.02, boxShadow: "0 16px 32px rgba(0, 0, 0, 0.2)" },
};

const CryptoChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [timeRange, setTimeRange] = useState("7");
  const [showChart, setShowChart] = useState(true);
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  // Fetch crypto data (mock data for demo)
  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setLoading(true);
        // Mock data for demonstration
        const mockData = {
          labels: Array.from({ length: parseInt(timeRange) }, (_, i) => `Day ${i + 1}`),
          prices: Array.from({ length: parseInt(timeRange) }, () =>
            (Math.random() * 1000 + (selectedCoin === "bitcoin" ? 30000 : 1500)).toFixed(2)
          ),
        };
        setChartData(mockData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching crypto data:", err);
        setError("Failed to load chart data");
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, [selectedCoin, timeRange]);

  // Initialize Chart.js
  useEffect(() => {
    if (!chartData || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: `${selectedCoin.charAt(0).toUpperCase() + selectedCoin.slice(1)} Price (USD)`,
            data: chartData.prices,
            borderColor: "#3AB4B5",
            backgroundColor: "rgba(58, 180, 181, 0.2)",
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#1A3C5A",
            titleFont: { family: "Inter, sans-serif" },
            bodyFont: { family: "Inter, sans-serif" },
            callbacks: { label: (context) => `$${context.parsed.y}` },
          },
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: "#A3BFFA", font: { family: "Inter, sans-serif" } } },
          y: {
            grid: { borderColor: "rgba(255, 255, 255, 0.1)" },
            ticks: {
              color: "#A3BFFA",
              font: { family: "Inter, sans-serif" },
              callback: (value) => `$${value}`,
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [chartData, showChart]);

  // Toggle chart visibility
  const toggleChart = () => {
    setShowChart((prev) => !prev);
  };

  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 3, fontFamily: "Inter, sans-serif" }}>
        <Typography variant="h5" color="error" sx={{ fontWeight: 600 }}>
          Error: {error}
        </Typography>
        <Typography variant="body1" color="#A3BFFA" sx={{ mt: 1, fontSize: { xs: "1rem", md: "1.25rem" } }}>
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
    <motion.div // Changed from motion.section to motion.div for valid JSX
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      sx={{
        bgcolor: "#0F1A2A",
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
      <Box
        sx={{
          bgcolor: "linear-gradient(to right, #1A3C5A, #2A5A7A)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          px: { xs: 2, md: 4 },
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
          
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              value={selectedCoin}
              onChange={(e) => setSelectedCoin(e.target.value)}
              sx={{
                color: "#E6F0FA",
                bgcolor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                "& .MuiSelect-icon": { color: "#E6F0FA" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255, 255, 255, 0.2)" },
                fontFamily: "Inter, sans-serif",
                fontSize: "1rem",
              }}
            >
              <MenuItem value="bitcoin">Bitcoin</MenuItem>
              <MenuItem value="ethereum">Ethereum</MenuItem>
              <MenuItem value="litecoin">Litecoin</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 80 }}>
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              sx={{
                color: "#E6F0FA",
                bgcolor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                "& .MuiSelect-icon": { color: "#E6F0FA" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255, 255, 255, 0.2)" },
                fontFamily: "Inter, sans-serif",
                fontSize: "1rem",
              }}
            >
              <MenuItem value="1">1 Day</MenuItem>
              <MenuItem value="7">7 Days</MenuItem>
              <MenuItem value="30">30 Days</MenuItem>
            </Select>
          </FormControl>
          <Tooltip title={showChart ? "Hide Chart" : "Show Chart"}>
            <IconButton
              onClick={toggleChart}
              sx={{
                color: "#E6F0FA",
                "&:hover": { color: "#D4A017", bgcolor: "rgba(212, 160, 23, 0.1)" },
                transition: "all 0.3s",
              }}
            >
              {showChart ? <VisibilityOffIcon sx={{ fontSize: "1.5rem" }} /> : <VisibilityIcon sx={{ fontSize: "1.5rem" }} />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box sx={{ px: { xs: 2, md: 4 }, py: 3 }}>
        {loading ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <CircularProgress sx={{ color: "#3AB4B5" }} size={60} />
            </motion.div>
            <Typography
              variant="body1"
              color="#A3BFFA"
              sx={{ mt: 2, fontFamily: "Inter, sans-serif", fontSize: { xs: "1rem", md: "1.25rem" } }}
            >
              Loading chart data...
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "16px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
              p: 3,
              height: { xs: "300px", sm: "400px", md: "500px" },
              position: "relative",
              overflow: "hidden",
            }}
          >
            <canvas
              ref={canvasRef}
              style={{ display: showChart ? "block" : "none", width: "100%", height: "100%" }}
            />
            {!showChart && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "rgba(15, 26, 42, 0.8)",
                  borderRadius: "16px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#A3BFFA",
                    fontFamily: "Inter, sans-serif",
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                  }}
                >
                  Chart Hidden
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </motion.div>
  );
};

export default CryptoChart;