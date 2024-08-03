import React, { useState, useEffect, useMemo, useCallback } from "react";
import { visuallyHidden } from "@mui/utils";
import Papa from "papaparse";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import {
	StyledPaper,
	StyledTextField,
	StyledTableContainer,
	StyledTableHead,
	StyledTitle,
	StyledTable,
	StyledTableBody,
	StyledTableCell,
	StyledTableRow,
	StyledSortLabel,
	StyledTablePagination,
} from "./styles";

const columns = [
	{ id: "created_dt", label: "Created DT" },
	{ id: "data_source_modified_dt", label: "Modified DT" },
	{ id: "entity_type", label: "Entity" },
	{ id: "operating_status", label: "Operating Status" },
	{ id: "legal_name", label: "Legal Name" },
	{ id: "dba_name", label: "DBA Name" },
	{ id: "physical_address", label: "Physical Address" },
	{ id: "phone", label: "Phone" },
	{ id: "usdot_number", label: "DOT" },
	{ id: "mc_mx_ff_number", label: "MC/MX/FF" },
	{ id: "power_units", label: "Power Units" },
	{ id: "out_of_service_date", label: "Out of Service Date" },
];

const useDebounce = (value, delay) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
};

const useFilteredSortedData = (data, filter, order, orderBy, setLoading) => {
	const debouncedFilter = useDebounce(filter, 300);

	useEffect(() => {
		if (!data.length) return;
		setLoading(true);

		const timer = setTimeout(() => {
			setLoading(false);
		}, 500);

		return () => clearTimeout(timer);
	}, [debouncedFilter, data.length, setLoading]);

	const filteredData = useMemo(() => {
		if (!debouncedFilter) return data;
		return data.filter(row =>
			Object.values(row).some(val =>
				String(val).toLowerCase().includes(debouncedFilter.toLowerCase())
			)
		);
	}, [data, debouncedFilter]);

	const sortedData = useMemo(() => {
		return filteredData.sort((a, b) => {
			if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
			if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
			return 0;
		});
	}, [filteredData, order, orderBy]);

	return sortedData;
};

const FMSCAViewer = () => {
	const [data, setData] = useState([]);
	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState("created_dt");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(50);
	const [filter, setFilter] = useState("");
	const [loading, setLoading] = useState(false);

	const memoizedSetLoading = useCallback((value) => {
		setLoading(value);
	}, []);

	useEffect(() => {
		fetch("/data/FMSCA.csv")
			.then(response => response.text())
			.then(csvData => {
				Papa.parse(csvData, {
					header: true,
					dynamicTyping: true,
					complete: results => {
						setData(results.data);
					},
					error: error => {
						console.error("Error parsing CSV file:", error);
					},
				});
			})
			.catch(error => {
				console.error("Error fetching CSV file:", error);
			});
	}, []);

	const sortedData = useFilteredSortedData(data, filter, order, orderBy, memoizedSetLoading);

	const handleRequestSort = property => {
		const isAscending = orderBy === property && order === "asc";
		setOrder(isAscending ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleFilterChange = event => {
		const value = event?.target?.value;
		if (value.length <= 100) {
			setFilter(value);
		}
	};

	return (
		<StyledPaper>
			<StyledTitle>FMSCA</StyledTitle>
			<div style={{ display: 'flex', alignItems: 'center', margin: '10px', width: '60%' }}>
				<label htmlFor="search-field" style={{ marginRight: '10px' }}>Search:</label>
				<StyledTextField
					id="search-field"
					size="small"
					variant="outlined"
					onChange={handleFilterChange}
					value={filter}
					style={{ width: '100%', height: '40px' }}
				/>
			</div>
			<Backdrop style={{ zIndex: 1000, color: '#fff' }} open={loading}>
				<CircularProgress color="inherit" />
			</Backdrop>
			<StyledTableContainer>
				<StyledTable>
					<StyledTableHead>
						<StyledTableRow>
							{columns.map(column => (
								<StyledTableCell
									style={{ color: "#ffff" }}
									key={column.id}
									sortDirection={orderBy === column.id ? order : false}
								>
									<StyledSortLabel
										active={orderBy === column.id}
										direction={orderBy === column.id ? order : "asc"}
										onClick={() => handleRequestSort(column.id)}
										className={StyledSortLabel}
									>
										{column.label}
										{orderBy === column.id ? (
											<span style={visuallyHidden}>
												{order === "asc" ? "sorted ascending" : "sorted descending"}
											</span>
										) : null}
									</StyledSortLabel>
								</StyledTableCell>
							))}
						</StyledTableRow>
					</StyledTableHead>
					<StyledTableBody>
						{sortedData
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row, index) => (
								<StyledTableRow key={index}>
									{columns.map(column => (
										<StyledTableCell key={column.id}>{row[column.id]}</StyledTableCell>
									))}
								</StyledTableRow>
							))}
					</StyledTableBody>
				</StyledTable>
			</StyledTableContainer>
			<StyledTablePagination
				rowsPerPageOptions={[10, 25, 50, 100]}
				component="div"
				count={sortedData.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</StyledPaper>
	);
};

export default FMSCAViewer;