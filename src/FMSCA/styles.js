import styled from "styled-components";
import {
	Typography,
	Table,
	Paper,
	TableContainer,
	TableHead,
	TableCell,
	TableSortLabel,
	TextField,
	TableBody,
	TableRow,
	TablePagination,
} from "@mui/material";

export const StyledTitle = styled(Typography)`
  padding: 10px 0 10px 10px !important;
  height: 25px;
  font-size: 1.3rem !important;
  font-weight: 700 !important;
  color: #ffff;
  background: #079ae3;
  margin-bottom: 20px;
  // text-align: center;
  align-content: center !important;
`;

export const StyledPaper = styled(Paper)`
  height: 100%;
  width: 100%;
  // margin: 20px;
  // padding: 20px;
  // box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  background-color: #ffffff;
`;

export const StyledTextField = styled(TextField)`
  background-color: white !important;
  border-radius: 10px !important;
  & .MuiInputBase-root {
    // color: #4a4a4a;
  }
  & .MuiOutlinedInput-root {
    border-radius: 4px;
    fieldset {
      // border-color: #b0b0b0;
    }
    &:hover fieldset {
      // border-color: #007bff;
    }
    &.Mui-focused fieldset {
      // border-color: #0056b3;
    }
  }
`;

export const StyledTableContainer = styled(TableContainer)`
  width: 100%;
  max-height: 78vh;
  min-height: fit-content;
  overflow-x: auto;
  scroll-width: none !important;
  background-color: #fafafa;
`;

export const StyledTable = styled(Table)`
  // min-width: 650px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  thead {
    position: sticky;
    top: 0;
    z-index: 10;
  }

  tbody tr {
    transition: background-color 0.3s;
  }

  tbody tr:hover {
    background-color: #f5f5f5;
  }

  td,
  th {
    text-align: left;
  }
`;

export const StyledTableHead = styled(TableHead)`
  // background: #079ae3;
  padding: 0 !important;
  font-size: 14px !important;
  background: #1c6da6 !important;
  color: #ffffff !important;
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const StyledTableBody = styled(TableBody)`
  & .MuiTableRow-root:hover {
    background-color: #f5f5f5;
  }
`;

export const StyledTableRow = styled(TableRow)`
  padding: 0 !important;
  transition: background-color 0.3s;
  height: 5vh !important;
`;

export const StyledTableCell = styled(TableCell)`
  padding: 8px 10px !important;
  line-height: 1rem !important;
  color: #333;
  border-bottom: 1px solid #e0e0e0;
  font-size: 12px !important;
`;

export const StyledSortLabel = styled(TableSortLabel)`
  font-weight: 600;
  color: #ffff !important;
  &.Mui-active {
    color: #ffff;
  }
  & .MuiTableSortLabel-icon {
    color: #ffff !important;
  }
`;

export const StyledTablePagination = styled(TablePagination)`
  .MuiTablePagination-selectRoot {
    margin-right: 16px;
  }

  .MuiTablePagination-toolbar {
    background-color: #f5f5f5;
    border-top: 1px solid #e0e0e0;
  }

  .MuiTablePagination-displayedRows {
    color: #333;
  }

  .MuiTablePagination-actions {
    color: #007bff;
  }
`;
