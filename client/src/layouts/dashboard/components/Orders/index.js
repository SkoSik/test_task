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
import { useCallback, useEffect, useRef, useState } from "react";
import MDButton from "../../../../components/MDButton";

function Orders({ userRef }) {
  const orderRef = useRef();
  const [rowDefs, setRowDefs] = useState([]);
  const [colDefs] = useState([
    { field: "id", headerName: "ID", flex: 1 },
    { field: "user_id", hide: true },
    { field: "user_name", headerName: "Пользователь", flex: 3 },
    {
      field: "date",
      headerName: "Дата",
      editable: true,
      cellEditor: "agDateStringCellEditor",
      valueFormatter: (params) => {
        if (!params.value) return "";
        const date = new Date(params.value);

        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${day < 10 ? "0" + day : day}-${
          month < 10 ? "0" + month : month
        }-${date.getFullYear()}`;
      },
      flex: 3,
    },
    {
      field: "sum",
      headerName: "Сумма",
      editable: true,
      cellEditor: "agTextCellEditor",
      flex: 3,
    },
    {
      field: "status",
      headerName: "Статус",
      cellStyle: (params) => {
        switch (params.value) {
          case "PENDING":
            return { color: "var(--ag-data-color)" };
          case "EXPIRED":
            return { color: "orange" };
          case "COMPLETED":
            return { color: "green" };
          case "CANCELED":
            return { color: "red" };
        }
      },
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["PENDING", "EXPIRED", "COMPLETED", "CANCELED"],
      },
      editable: true,
      flex: 3,
    },
  ]);
  const [inputRow, setInputRow] = useState({});
  const [isNewRow, setIsNewRow] = useState(false);

  useEffect(() => {
    Api.get("order/getAll").then(({ data: orders }) => setRowDefs(orders));
  }, []);

  const deleteRow = useCallback(() => {
    const row = orderRef.current.api.getSelectedRows()[0];
    if (row)
      Api.post("order/delete", { id: row.id })
        .then(() => {
          setRowDefs((rows) => rows.filter((r) => r.id !== row.id));
        })
        .catch((e) => console.log(e));
  }, []);

  const onRowValueChanged = useCallback(
    (params) => {
      const order = params.data;
      if (params?.rowPinned !== "top") {
        Api.post("order/update", order).catch((e) => console.log(e));
      } else {
        if (order.user_id && order.date && order.sum && order.status)
          Api.post("order/create", order)
            .then(({ data: order }) => {
              setRowDefs([...rowDefs, { ...inputRow, id: order.id }]);
              setIsNewRow(false);
            })
            .catch((e) => console.log(e));
      }
    },
    [rowDefs, inputRow]
  );

  const addRow = () => {
    const row = userRef?.current?.api?.getSelectedRows()[0];
    if (row) {
      setInputRow({ user_id: row.id, user_name: row.firstname + " " + row.surname });
      setIsNewRow(true);
    }
  };

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Заказы
        </MDTypography>
        <MDBox display="flex" gap={3}>
          <MDBox>
            <MDButton color={"dark"} p={3} onClick={addRow}>
              Добавить запись
            </MDButton>
          </MDBox>
          <MDBox>
            <MDButton color={"error"} p={3} onClick={deleteRow}>
              Удалить
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
      <MDBox className="ag-theme-quartz" style={{ height: 650 }} p={3}>
        <AgGridReact
          columnDefs={colDefs}
          rowData={rowDefs}
          rowSelection={"single"}
          ref={orderRef}
          editType="fullRow"
          onRowValueChanged={onRowValueChanged}
          pinnedTopRowData={isNewRow ? [inputRow] : []}
          getRowStyle={({ node }) =>
            node.rowPinned ? { fontWeight: "bold", fontStyle: "italic" } : 0
          }
        />
      </MDBox>
    </Card>
  );
}

export default Orders;
