import styled from "styled-components";
import { Typography } from "@mui/material";
import { Skeleton } from "@mui/material";

export const StyledHeader = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  background: #079ae3;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 7px;
`;

export const StyledTitle = styled(Typography)`
  padding: 10px 0 !important;
  margin-left: 15px !important;
  height: 25px;
  font-size: 1.3rem !important;
  font-weight: 700 !important;
  color: #fff;
  background: #079ae3;
  text-align: center;
`;

export const CustomSkeleton = styled(Skeleton)(({ theme }) => ({
  backgroundColor: "#f5f5f5",
  borderRadius: 4,
  marginBottom: 10,
  position: "relative",
  overflow: "hidden",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(240,240,240,0.2) 50%, rgba(255,255,255,0) 100%)",
    animation: "wave 5s infinite",
  },

  "@keyframes wave": {
    "0%": { left: "-100%" },
    "100%": { left: "100%" },
  },
}));
