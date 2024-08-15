import React, { useState, useMemo, useCallback, useEffect } from "react";
import { CustomDataGridPro, StyledTextField } from "../styles";
import { GridToolbar } from "@mui/x-data-grid-pro";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

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
    return data.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(debouncedFilter.toLowerCase())
      )
    );
  }, [data, debouncedFilter]);

  const sortedData = useMemo(() => {
    if (!orderBy) return filteredData;
    return [...filteredData].sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, order, orderBy]);

  return sortedData;
};

const columnWidths = {
  created_dt: 180,
  data_source_modified_dt: 220,
  entity_type: 130,
  operating_status: 220,
  legal_name: 250,
  dba_name: 250,
  physical_address: 400,
  p_street: 200,
  p_city: 190,
  p_state: 100,
  p_zip_code: 100,
  phone: 120,
  mailing_address: 400,
  m_street: 200,
  m_city: 190,
  m_state: 100,
  m_zip_code: 100,
  usdot_number: 150,
  mc_mx_ff_number: 150,
  power_units: 120,
  mcs_150_form_date: 160,
  out_of_service_date: 180,
  state_carrier_id_number: 210,
  duns_number: 150,
  drivers: 150,
  mcs_150_mileage_year: 180,
  id: 100,
  credit_score: 120,
  record_status: 150,
};

const TableView = ({ data }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("created_dt");
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const memoizedSetLoading = useCallback((value) => {
    setLoading(value);
  }, []);

  const sortedData = useFilteredSortedData(
    data,
    filter,
    order,
    orderBy,
    memoizedSetLoading
  );

  const handleFilterChange = (event) => {
    const value = event?.target?.value;
    if (value.length <= 100) {
      setFilter(value);
      if (!value) {
        setOrder("asc");
        setOrderBy("created_dt");
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const targetDiv = document.querySelector(
        'div[style*="position: absolute"][style*="pointer-events: none"]'
      );
      if (targetDiv) {
        targetDiv.style.width = "0%";
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Backdrop style={{ zIndex: 1000, color: "#fff" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "10px",
          width: "60%",
        }}
      >
        <label htmlFor="search-field" style={{ marginRight: "10px" }}>
          Search:
        </label>
        <StyledTextField
          id="search-field"
          size="small"
          variant="outlined"
          onChange={handleFilterChange}
          value={filter}
          style={{ width: "100%", height: "40px" }}
        />
      </div>
      <div style={{ height: "86vh", width: "100%" }}>
        <CustomDataGridPro
          rows={sortedData}
          columns={Object.keys(data[0] || {}).map((key) => ({
            field: key,
            headerName: key.replace(/_/g, " ").toUpperCase(),
            width: columnWidths[key],
            flex: 0,
          }))}
          pageSize={rowsPerPage}
          rowsPerPageOptions={[10, 25, 50, 100]}
          pagination
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
          onPageSizeChange={(newPageSize) => setRowsPerPage(newPageSize)}
          onSortModelChange={(sortModel) => {
            if (sortModel.length) {
              const { field, sort } = sortModel[0];
              setOrderBy(field);
              setOrder(sort);
            } else {
              setOrderBy("created_dt");
              setOrder("asc");
            }
          }}
          columnReorder
          columnResize
        />
      </div>
    </div>
  );
};

export default TableView;




// import React, { useState, useMemo, useCallback, useEffect } from "react";
// import { CustomDataGridPro, StyledTextField } from "../styles";
// import { GridToolbar } from "@mui/x-data-grid-pro";
// import CircularProgress from "@mui/material/CircularProgress";
// import Backdrop from "@mui/material/Backdrop";
// import { Bar } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const useDebounce = (value, delay) => {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);

//   return debouncedValue;
// };

// const useFilteredSortedData = (data, filter, order, orderBy, setLoading) => {
//   const debouncedFilter = useDebounce(filter, 300);

//   useEffect(() => {
//     if (!data.length) return;
//     setLoading(true);

//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [debouncedFilter, data.length, setLoading]);

//   const filteredData = useMemo(() => {
//     if (!debouncedFilter) return data;
//     return data.filter((row) =>
//       Object.values(row).some((val) =>
//         String(val).toLowerCase().includes(debouncedFilter.toLowerCase())
//       )
//     );
//   }, [data, debouncedFilter]);

//   const sortedData = useMemo(() => {
//     if (!orderBy) return filteredData;
//     return [...filteredData].sort((a, b) => {
//       if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
//       if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
//       return 0;
//     });
//   }, [filteredData, order, orderBy]);

//   return sortedData;
// };

// const columnWidths = {
//   created_dt: 180,
//   data_source_modified_dt: 220,
//   entity_type: 130,
//   operating_status: 220,
//   legal_name: 250,
//   dba_name: 250,
//   physical_address: 400,
//   p_street: 200,
//   p_city: 190,
//   p_state: 100,
//   p_zip_code: 100,
//   phone: 120,
//   mailing_address: 400,
//   m_street: 200,
//   m_city: 190,
//   m_state: 100,
//   m_zip_code: 100,
//   usdot_number: 150,
//   mc_mx_ff_number: 150,
//   power_units: 120,
//   mcs_150_form_date: 160,
//   out_of_service_date: 180,
//   state_carrier_id_number: 210,
//   duns_number: 150,
//   drivers: 150,
//   mcs_150_mileage_year: 180,
//   id: 100,
//   credit_score: 120,
//   record_status: 150,
// };

// const processChartData = (data, filter) => {
//   // Filter data based on current filters
//   const filteredData = data.filter((item) => {
//     return Object.entries(filter).every(([key, value]) =>
//       !value || item[key] === value
//     );
//   });

//   // Extract "Out of Service" dates and group them by month
//   const groupedByMonth = filteredData.reduce((acc, item) => {
//     const date = new Date(item.out_of_service_date);
//     const month = date.toLocaleString('default', { month: 'short' }) + ' ' + date.getFullYear();
//     acc[month] = (acc[month] || 0) + 1;
//     return acc;
//   }, {});

//   // Convert grouped data to chart format
//   const months = Object.keys(groupedByMonth);
//   const counts = months.map(month => groupedByMonth[month]);

//   return {
//     labels: months,
//     datasets: [
//       {
//         label: 'Companies Out of Service',
//         data: counts,
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };
// };

// const TableView = ({ data }) => {
//   const [order, setOrder] = useState("asc");
//   const [orderBy, setOrderBy] = useState("created_dt");
//   const [rowsPerPage, setRowsPerPage] = useState(100);
//   const [filter, setFilter] = useState("");
//   const [loading, setLoading] = useState(false);

//   const memoizedSetLoading = useCallback((value) => {
//     setLoading(value);
//   }, []);

//   const sortedData = useFilteredSortedData(
//     data,
//     filter,
//     order,
//     orderBy,
//     memoizedSetLoading
//   );

//   const handleFilterChange = (event) => {
//     const value = event?.target?.value;
//     if (value.length <= 100) {
//       setFilter(value);
//       if (!value) {
//         setOrder("asc");
//         setOrderBy("created_dt");
//       }
//     }
//   };

//   const chartData = processChartData(sortedData, { entity_type: filter });

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const targetDiv = document.querySelector(
//         'div[style*="position: absolute"][style*="pointer-events: none"]'
//       );
//       if (targetDiv) {
//         targetDiv.style.width = "0%";
//       }
//     }, 100);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div>
//       <Backdrop style={{ zIndex: 1000, color: "#fff" }} open={loading}>
//         <CircularProgress color="inherit" />
//       </Backdrop>
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           margin: "10px",
//           width: "60%",
//         }}
//       >
//         <label htmlFor="search-field" style={{ marginRight: "10px" }}>
//           Search:
//         </label>
//         <StyledTextField
//           id="search-field"
//           size="small"
//           variant="outlined"
//           onChange={handleFilterChange}
//           value={filter}
//           style={{ width: "100%", height: "40px" }}
//         />
//       </div>
//       <div style={{ height: "86vh", width: "100%" }}>
//         <CustomDataGridPro
//           rows={sortedData}
//           columns={Object.keys(data[0] || {}).map((key) => ({
//             field: key,
//             headerName: key.replace(/_/g, " ").toUpperCase(),
//             width: columnWidths[key],
//             flex: 0,
//           }))}
//           pageSize={rowsPerPage}
//           rowsPerPageOptions={[10, 25, 50, 100]}
//           pagination
//           disableSelectionOnClick
//           components={{ Toolbar: GridToolbar }}
//           onPageSizeChange={(newPageSize) => setRowsPerPage(newPageSize)}
//           onSortModelChange={(sortModel) => {
//             if (sortModel.length) {
//               const { field, sort } = sortModel[0];
//               setOrderBy(field);
//               setOrder(sort);
//             } else {
//               setOrderBy("created_dt");
//               setOrder("asc");
//             }
//           }}
//           columnReorder
//           columnResize
//         />
//       </div>
//       <div style={{ height: "50vh", width: "100%", marginTop: "20px" }}>
//         <Bar
//           data={chartData}
//           options={{
//             responsive: true,
//             plugins: {
//               legend: {
//                 position: 'top',
//               },
//               title: {
//                 display: true,
//                 text: 'Companies Out of Service per Month',
//               },
//             },
//             scales: {
//               x: {
//                 beginAtZero: true,
//               },
//             },
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default TableView;
