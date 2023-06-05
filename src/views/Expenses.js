import React, { useEffect, useState, useCallback, useRef} from 'react';
import { AgGridReact } from 'ag-grid-react';
import {CSVLink, CSVDownload} from 'react-csv';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from "axios";
import { Button } from '@mui/base';
import NavBar from "./Nav";
const App = () => {
    const gridRef = useRef();
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
    const onDateChanged = async(val)=>{
        console.log(val)
    }
    const [columnDefs] = useState([
        { field: 'name', editable: true },
        { field: 'description', editable: true },
        { field: 'amount', editable: true },
        { field: 'tags', editable: true, valueFormatter: (params)=>{return params?.tags?.join(",")} },
        {field: 'createdAt', cellEditor: 'agDateInput' , onDateChanged: onDateChanged,  filter: 'agDateColumnFilter', editable: true}
    ])

    const headers = [
        { label: "Name", key: "name" },
        { label: "Description", key: "description" },
        { label: "Amount", key: "amount" },
        { label: "Tags", key: "tags" },
        { label: "Created At", key: "createdAt" }
      
    ]
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
    const onRemoveSelected = useCallback(async () => {
        const selectedData = gridRef.current.api.getSelectedRows();
        let id =selectedData[0].id;
        if(id){
           const resp =  await axios.delete(`http://localhost:5001/expenses/${id}`,{   headers: {
            authorization: `Bearer ${window.localStorage.getItem('token')}`
        }})
           if(resp.status==200)
                gridRef.current.api.applyTransaction({ remove: selectedData });
        }
      }, []);
      const getCSVData = ()=>{
        // const d = [['name', 'description', 'amount','tags', 'createdAt' ]];
        // d.push(rowData.map(i=>[i.name, i.description,i.amount, i.tags,i.createdAt ]))
        
        // console.log(d)
        return rowData;
      }

    return (
        <>
        <NavBar></NavBar>
        <div className="ag-theme-alpine" style={{ height: 500, padding: 20 }}>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar />
            </LocalizationProvider> */}
            
            <Button onClick={()=> { setRowData([...rowData, {name: 'new expense', amount: 0}])}}> Add row</Button>
            <Button onClick={onRemoveSelected}> Delete Selected</Button>
            <CSVLink headers = {headers} data={getCSVData()}  >Download CSV</CSVLink>
            <AgGridReact
              ref={gridRef}
                fullWidth={true}
                rowData={rowData}
                editType={'fullRow'}
                columnDefs={columnDefs}
                onRowEditingStopped={handleRowSave}
                rowSelection={'single'}
                >
            </AgGridReact>
        </div>

        </>
    );
};
export default App;