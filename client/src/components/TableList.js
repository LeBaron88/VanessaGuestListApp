import React from 'react';
import TableItems from './TableItems';

const TableList = ({ guests, tables, onGuestSelected }) => {

    const renderedTables = tables.map(table => {
        if(table !== null) {
            return <TableItems 
                        key={table.Id} 
                        table={table.Name} 
                        guests={guests} 
                        places={table.Places}
                        onGuestSelected={onGuestSelected}
                    />
        }
    });

    return (
        <div>
            <div className="tabSelector-wrapper tables">
                <div className="tabSelector">   
                    {renderedTables}
                </div>
            </div>
        </div>
    );
}

export default TableList;