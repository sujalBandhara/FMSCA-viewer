import React, { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import Papa from "papaparse";
import { StyledHeader, StyledTitle, CustomSkeleton } from "./styles";
import moment from "moment";

const FMSCAView = () => {
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);

  useEffect(() => {
    fetch("/data/FMSCA.csv")
      .then((response) => response.text())
      .then((csvData) => {
        Papa.parse(csvData, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            const data = results.data.map((row) => {
              const formattedDate = row.out_of_service_date
                ? moment(row.out_of_service_date, "MM/DD/YYYY").format(
                    "YYYY-MM-DD"
                  )
                : null;
              return {
                ...row,
                out_of_service_date: formattedDate,
                month_year: formattedDate
                  ? moment(formattedDate, "YYYY-MM-DD").format("YYYY-MM")
                  : null,
              };
            });

            setRowData(data);

            if (data.length > 0) {
              const keys = Object.keys(data[0]);
              setColumnDefs(
                keys.map((key) => ({
                  headerName: key,
                  field: key,
                  sortable: true,
                  filter: true,
                  enableRowGroup: true,
                  enablePivot: true,
                  enableValue: true,
                  cellRenderer:
                    key === "out_of_service_date"
                      ? (params) =>
                          moment(params.value, "YYYY-MM-DD").format(
                            "YYYY-MM-DD"
                          )
                      : undefined,
                }))
              );
            }
            setLoading(false);
          },
          error: (error) => {
            console.error("Error parsing CSV file:", error);
            setLoading(false);
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching CSV file:", error);
        setLoading(false);
      });
  }, []);

  const memoizedColumnDefs = useMemo(() => columnDefs, [columnDefs]);

  return (
    <div style={{ height: "100vh", width: "100%", overflow: "auto" }}>
      <StyledHeader>
        <StyledTitle>FMSCA</StyledTitle>
      </StyledHeader>

      <div className="ag-theme-alpine" style={{ height: "92%", width: "100%" }}>
        {loading ? (
          <div style={{ padding: "15px" }}>
            <CustomSkeleton variant="rectangular" width="100%" height={50} />
            {Array.from({ length: 18 }).map((_, index) => (
              <CustomSkeleton
                key={index}
                variant="rectangular"
                width="100%"
                height={30}
              />
            ))}
          </div>
        ) : (
          <AgGridReact
            columnDefs={memoizedColumnDefs}
            rowData={rowData}
            pivotMode={false}
            sideBar={{
              toolPanels: ["columns", "filters", "chart"],
            }}
            enableCharts={true}
            animateRows={true}
            // groupIncludeFooter={true}
            // groupIncludeTotalFooter={true}
            pagination={true}
            paginationPageSize={100}
            rowGroupPanelShow="always"
          />
        )}
      </div>
    </div>
  );
};

export default FMSCAView;
