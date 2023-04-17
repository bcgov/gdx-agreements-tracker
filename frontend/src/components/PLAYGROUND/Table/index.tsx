import { DataGrid } from '@mui/x-data-grid'

export const Table = ({ columns, rows, initialState }: any) => {

    return (
        <>
            <DataGrid
                columns={columns}
                rows={rows}
                disableSelectionOnClick
                initialState={initialState}
            />
        </>


    )
}

