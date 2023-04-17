
import { Link } from '@mui/material'
import { GridRenderEditCellParams } from '@mui/x-data-grid'
import { useState, ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useRenderCell = () => {

    const [selectedRow, setSelectedRow] = useState<any>(null)

    const navigate = useNavigate();

    const handleSelectRow = async (params: GridRenderEditCellParams | React.SetStateAction<null>) => {
        setSelectedRow(params)
    }

    useEffect(() => {
        if (selectedRow !== null) {
            navigate(`/projects/${selectedRow.id}`)
        }
    }, [selectedRow])


    const linkCell: ReactNode = (params: GridRenderEditCellParams) => {
        return (
            <Link color="inherit" onClick={() => {
                console.log('params.row', params.row)
                handleSelectRow(params.row)
            }}>
                {params.formattedValue}
            </Link>
        );
    };

    return (
        [linkCell, selectedRow]
    )
}

