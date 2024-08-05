/**
 =========================================================
 * Material Dashboard 2 React - v2.2.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2023 Creative Tim (https://www.creative-tim.com)

 Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

// @mui material components
import Card from "@mui/material/Card";
import Api from "../../../../utils/http-common";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";

function Orders() {
  const [rowDefs, setRowDefs] = useState([]);
  const [colDefs] = useState([
    { field: "id", headerName: "ID", flex: 1 },
    { field: "user_id", hide: true },
    { field: "date", headerName: "Дата", flex: 3 },
    { field: "sum", headerName: "Сумма", flex: 3 },
    {
      field: "status",
      headerName: "Статус",
      flex: 3,
      cellStyle: (params) => {
        switch (params.value) {
          case "EXPIRED":
            return { color: "orange" };
          case "COMPLETED":
            return { color: "green" };
          case "CANCELED":
            return { color: "red" };
        }
      },
    },
  ]);

  useEffect(() => {
    Api.get("order/getAll").then(({ data: orders }) => setRowDefs(orders));
  }, []);

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Заказы
        </MDTypography>
      </MDBox>
      <MDBox className="ag-theme-quartz" style={{ height: 650 }} p={3}>
        <AgGridReact columnDefs={colDefs} rowData={rowDefs} />
      </MDBox>
    </Card>
  );
}

export default Orders;
