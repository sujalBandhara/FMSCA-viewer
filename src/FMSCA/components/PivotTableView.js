import React, { useState, useMemo } from "react";
import PivotTableUI from "react-pivottable/PivotTableUI";
import "react-pivottable/pivottable.css";
import TableRenderers from "react-pivottable/TableRenderers";
import Plot from "react-plotly.js";
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const PlotlyRenderers = createPlotlyRenderers(Plot);

const PivotTableView = ({ data }) => {
  const [pivotState, setPivotState] = useState({});
  const [loading, setLoading] = useState(false);

  const renderers = useMemo(() => {
    return {
      ...TableRenderers,
      ...(PlotlyRenderers || {})
    };
  }, []);

  const transformData = useMemo(() => {
    return data?.map((row) => {
      const transformedRow = { ...row };

      if (row.date) {
        transformedRow["Year"] = moment(row.date).format("YYYY");
        transformedRow["Month"] = moment(row.date).format("YYYY-MM");
        transformedRow["Week"] = moment(row.date).format("YYYY-WW");
      }

      return transformedRow;
    }) || [];
  }, [data]);

  const handlePivotChange = (s) => {
    setLoading(true);
    setTimeout(() => {
      setPivotState(s);
      setLoading(false);
    }, 300);
  };

  return (
    <div style={{ height: "92vh", width: "100%", overflow: "auto" }}>
      <Backdrop style={{ zIndex: 1000, color: "#fff" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <PivotTableUI
        data={transformData}
        onChange={handlePivotChange}
        renderers={renderers}
        {...pivotState}
      />
    </div>
  );
};

export default PivotTableView;
