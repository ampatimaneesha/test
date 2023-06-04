import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const App = () => {
   const [rowData] = useState([
       {name: "Toyota", description: "Celica", amount: 35000,tags:""},
       {name: "Ford", description: "Mondeo", amount: 32000,tags:""},
       {name: "Porsche", description: "Boxster", amount: 72000,tags:""}
   ]);
   
   const [columnDefs] = useState([
       { field: 'name' },
       { field: 'description' },
       { field: 'amount' },
       { field: 'tags' }
   ])

   return (
       <div className="ag-theme-alpine" style={{height: 400, width: 600}}>
           <AgGridReact
               rowData={rowData}
               columnDefs={columnDefs}>
           </AgGridReact>
       </div>
   );
};



export default App;