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

import { useState, useCallback, useRef } from "react";
import Api from "../../../../utils/http-common";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Data
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const sortData = (sortModel, data) => {
  const sortPresent = sortModel && sortModel.length > 0;
  if (!sortPresent) {
    return data;
  }
  const resultOfSort = data.slice();
  resultOfSort.sort(function (a, b) {
    for (let k = 0; k < sortModel.length; k++) {
      const sortColModel = sortModel[k];
      const valueA = a[sortColModel.colId];
      const valueB = b[sortColModel.colId];
      if (valueA == valueB) {
        continue;
      }
      const sortDirection = sortColModel.sort === "asc" ? 1 : -1;
      if (valueA > valueB) {
        return sortDirection;
      } else {
        return sortDirection * -1;
      }
    }
    return 0;
  });
  return resultOfSort;
};

function Users() {
  const gridRef = useRef();
  const [colDefs] = useState([
    { field: "id", headerName: "ID", flex: 1 },
    { field: "firstname", headerName: "Имя", flex: 3 },
    { field: "surname", headerName: "Фамилия", flex: 3 },
    { field: "email", flex: 3 },
  ]);
  const getRowId = useCallback((params) => String(params.data.id) || 1, []);

  const onGridReady = useCallback((params) => {
    const dataSource = {
      rowCount: undefined,
      getRows: (params) => {
        Api.get(`user/getAll/${params.endRow - params.startRow}/${params.startRow}`).then(
          ({ data: users }) => {
            let lastRow = -1;
            if (users?.length < 100) lastRow = params.startRow + users?.length;

            users = sortData(params.sortModel, users);

            users?.length ? params.successCallback(users, lastRow) : params.failCallback();
          }
        );
      },
    };
    params.api.setGridOption("datasource", dataSource);
  }, []);

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={3}>
        <MDBox>
          <MDTypography variant="h6">Пользователи</MDTypography>
        </MDBox>
      </MDBox>
      <MDBox className="ag-theme-quartz" style={{ height: 650 }} p={3}>
        <AgGridReact
          columnDefs={colDefs}
          rowSelection={"single"}
          pagination={true}
          paginationPageSize={25}
          paginationPageSizeSelector={[10, 25, 50]}
          rowModelType={"infinite"}
          cacheBlockSize={100}
          cacheOverflowSize={25}
          maxConcurrentDatasourceRequests={2}
          infiniteInitialRowCount={1}
          getRowId={getRowId}
          onGridReady={onGridReady}
        />
      </MDBox>
    </Card>
  );
}

export default Users;
