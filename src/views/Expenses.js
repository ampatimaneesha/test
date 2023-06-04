import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import axios from "axios";
import { Button } from '@mui/base';
import { GridApi } from 'ag-grid-community';

const App = () => {
    const [rowData, setRowData] = useState([
        { name: "Toyota", description: "Celica", amount: 35000, tags: "" },
        { name: "Ford", description: "Mondeo", amount: 32000, tags: "" },
        { name: "Porsche", description: "Boxster", amount: 72000, tags: "" }
    ]);
    const initData = async () => {
        const resp = await axios.get("http://localhost:5001/expenses", {
            headers: {
                authorization: `Bearer ${window.localStorage.getItem('token')}`
            }
        })
        // resp.data = resp.data.map()
        setRowData(resp.data)
    }
    useEffect(() => {
        initData();
    }, [])

    const [columnDefs] = useState([
        { field: 'name', editable: true },
        { field: 'description', editable: true },
        { field: 'amount', editable: true },
        { field: 'tags', editable: true, valueFormatter: (params)=>{return params?.tags?.join(",")} }
    ])

    const handleRowSave = async (e) => {
        console.log(e.data)
        if(e.data.id){
        await axios.patch(`http://localhost:5001/expenses/${e.data.id}`, { name: e.data.name, description: e.data.description, amount: e.data.amount, tags: e.data.tags }, {
            headers: {
                authorization: `Bearer ${window.localStorage.getItem('token')}`
            }
        })}
        else{
            await axios.post(`http://localhost:5001/expenses/`, { name: e.data.name, description: e.data.description, amount: e.data.amount, tags: e.data.tags || [] }, {
                headers: {
                    authorization: `Bearer ${window.localStorage.getItem('token')}`
                }
            })
        }
        initData();
    }

    return (
        <div className="ag-theme-alpine" style={{ height: 500, padding: 20 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar />
            </LocalizationProvider>
            <Button onClick={()=> { setRowData([...rowData, {name: 'default'}])}}> Add row</Button>
            <AgGridReact
            fullWidth={true}
                rowData={rowData}
                editType={'fullRow'}
                columnDefs={columnDefs}
                onRowEditingStopped={handleRowSave}
                >
            </AgGridReact>
        </div>


    );
};
export default App;