import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useTable } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'

import '../../assets/css/tables.css'

const StudentAssistantTable = () => {

    const { assistanceSelected } = useSelector(state => state.assistance)

    const data = useMemo(() => assistanceSelected.details, [assistanceSelected.details])

    const columns = useMemo(
        () => [
            {
                Header: '',
                accessor: 'student.sex',
                Cell: ({ value }) => <img style={{ backgroundColor: '#FFFFFF', borderRadius: 10, padding: 3 }} height={45} src={value === 1 ? require('../../assets/img/student_man.png') : require('../../assets/img/student_woman.png')} alt="avatar estudiante" />
            },
            {
                Header: 'Apellidos',
                accessor: 'student.last_name'
            },
            {
                Header: 'Nombres',
                accessor: 'student.first_name'
            },
            {
                Header: 'Telefono',
                accessor: 'student.phone'
            },
            {
                Header: 'Correo',
                accessor: 'student.email'
            },
            {
                Header: 'Cobertura',
                accessor: 'student.coverage',
                Cell: ({value}) => value ? 'Si' : 'No' 
            },
            {
                Header: 'Asistencia',
                accessor: 'attended',
                Cell: ({value}) => value ? <FontAwesomeIcon color='#1CCD9D' icon={faCircleCheck} size="2x" /> : <FontAwesomeIcon color='#FF6951' icon={faCircleExclamation} size="2x" />
            }
        ],
        []
    )

    const tableInstance = useTable({ columns, data })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance


    return (
        <table {...getTableProps()} className='animate__animated animate__fadeInUp' style={{marginTop: 40, width: '100%'}}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()} style={{height: 300}}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()} >
                            {row.cells.map(cell => {
                                return (
                                    <td {...cell.getCellProps()} >
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default StudentAssistantTable