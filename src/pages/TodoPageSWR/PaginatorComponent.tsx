
import { Paginator } from "primereact/paginator";
import { useState,  } from "react";
  
export function PaginatorComponent({tasks, setPage}) {

    
    const [first, setFirst] = useState(tasks?.first);
    const [rows, setRows] = useState(10);



    const onPageChange = (event) => {
        console.log('PaginatorComponent onPageChange event',event)

        setFirst(event.first);
        setRows(event.rows);

        setPage(event.page+1);
    };
    
    return (
        <Paginator first={first} rows={rows} totalRecords={tasks?.items} onPageChange={onPageChange} />

    );
}
        