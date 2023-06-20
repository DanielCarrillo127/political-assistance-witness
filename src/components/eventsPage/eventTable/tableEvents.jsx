import React, { useEffect } from 'react'
import { useState } from 'react'
import { Table, TagPicker, Pagination, Input, InputGroup, SelectPicker, Whisper, Tooltip, } from 'rsuite';
import './table.css'
import { FaRegFileExcel } from "react-icons/fa";
import ExportToXlsx from '../../../utils/exportToXlsx';

//receives as parameters the headers {columns ~ defaultColumns}, the corresponding data as {data}, the prop "activeColumnSort" is a boolean to not/active the sortColumn component
const TableEvents = (props) => {


    const defaultColumns = props.defaultColumns
    const [data, setData] = useState(props.data);
    const dataKeyLabel = props.dataKey
    const [loading, setLoading] = useState(false);
    const [hasData, setHasData] = useState(false);
    const height = props.heightTable ? props.heightTable : 310
    const autoHeight = false;
    const [columnKeys, setColumnKeys] = useState(defaultColumns.map(column => column.key));

    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();

    const { Column, HeaderCell, Cell } = Table;
    const columns = defaultColumns.filter(column => columnKeys.some(key => key === column.key));

    const [limit, setLimit] = React.useState(props.pageLimit ? props.pageLimit : 10);
    const [page, setPage] = React.useState(1);

    useEffect(() => {
        if (props.data.length > 0) { setHasData(true) }
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
            setData(props.data)
        }, 500);
    }, [props.data]);


    const [filterColumn, setFilterColumn] = useState("");
    const [hasOptionError, setHasOptionError] = useState(false);
    const handleChangeInputFilter = (e) => { filterData(e) }
    const handleChangeSelectFilter = (e) => { setFilterColumn(e); if (e === null) { setHasOptionError(true) } else { setHasOptionError(false) } }

    const filterData = (value) => {
        if (filterColumn === "") {
            setHasOptionError(true)
        }

        if (value !== "" && (filterColumn !== "" || filterColumn !== null)) {

            const filtered = props.data.filter(item => {
                if (item[`${filterColumn}`].toString().toLowerCase().includes(value.toLowerCase())) {
                    return true;
                }
                return false;
            });
            setLoading(true)
            setTimeout(() => {
                setLoading(false);
                setData(filtered)
            }, 500);

        } else {
            setData(props.data)
        }
    };

    const handleChangeLimit = dataKey => {
        setPage(1);
        setLimit(dataKey);
    };

    const paginationData = () => {
        const dataPage = data.filter((v, i) => {
            const start = limit * (page - 1);
            const end = start + limit;
            return i >= start && i < end;
        });
        return dataPage
    }

    const getData = () => {
        if (sortColumn && sortType) {
            const pageData = paginationData()
            return pageData.sort((a, b) => {
                let x = a[sortColumn];
                let y = b[sortColumn];
                if (typeof x === 'string') {
                    x = x.charCodeAt();
                }
                if (typeof y === 'string') {
                    y = y.charCodeAt();
                }
                if (sortType === 'asc') {
                    return x - y;
                } else {
                    return y - x;
                }
            });
        }
        return paginationData()
    };

    const handleExportData = async () => {
        let dataExport = getData()
        //when filter is apply get data filter, if not all data, 
        if (filterColumn === "") {
            dataExport = props.data
        } else {
            dataExport = getData()
            if (data.length > limit) {
                alert("Al exportar información filtrada el archivo resultante contendra la informacion de la pagina inicial, para exportar toda la información filtrada ampliar la paginación.");
            }
        }
        ExportToXlsx('ExportEventos', dataExport, columns)
    }

    const handleSortColumn = (sortColumn, sortType) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSortColumn(sortColumn);
            setSortType(sortType);
        }, 500);
    };

    const handlerNavigation = (key,name) => {
        props.handlerNav(key,name)
    }

    const AttendaceCell = ({ rowData, dataKey, ...props }) => (
        <Cell {...props} style={{ padding: 4 }} dataKey={dataKey}>
            <p className='detailCell' onClick={() => handlerNavigation(rowData["eventid"], rowData["eventName"])}>
                {rowData[dataKeyLabel]}
            </p>
        </Cell>
    );

    return (
        <div className='table'>
            <hr />
            {/* data len {props.data} */}
            <Whisper speaker={<Tooltip> descargar xlsx</Tooltip>} trigger="hover" placement="top">
                <button className='button__actions right' onClick={handleExportData}><FaRegFileExcel className='exportIcon' size={20} /></button>
            </Whisper>

            <div className='columns-wrapper'>
                {props.activeColumnSort ? <>
                    <div>
                        Columnas：
                        <TagPicker
                            data={defaultColumns}
                            labelKey="label"
                            valueKey="key"
                            value={columnKeys}
                            onChange={setColumnKeys}
                            cleanable={false}
                        />
                    </div> </> : <></>}
                <div className='input-filter'>
                    Buscar:
                    <InputGroup>
                        <Input type="text" placeholder='ingresa' onChange={handleChangeInputFilter} />
                        <InputGroup.Addon>En</InputGroup.Addon>
                        <SelectPicker data={columns} placeholder='Columnas' onChange={handleChangeSelectFilter} />
                    </InputGroup>
                    {hasOptionError ? <p className='error-message'>Debes seleccionar una columna para realiar la busqueda.</p> : <></>}
                </div>

            </div>
            <div style={{ paddingBottom: 10 }}>
                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    maxButtons={5}
                    size="xs"
                    layout={['-', 'total', '|', 'limit', '|', 'pager']}
                    total={data.length}
                    limit={limit}
                    limitOptions={[10, 20, 30, 40, 50, data.length]}
                    activePage={page}
                    onChangePage={setPage}
                    onChangeLimit={handleChangeLimit}
                />
            </div>
            <div style={{ height: autoHeight ? 'auto' : height, marginBottom: '10px' }}>
                <Table
                    loading={loading}
                    height={250}
                    hover={true}
                    fillHeight={true}
                    showHeader={true}
                    autoHeight={autoHeight}
                    data={hasData ? getData() : []}
                    bordered={true}
                    cellBordered={true}
                    rowHeight={30}
                    headerHeight={30}
                    sortColumn={sortColumn}
                    sortType={sortType}
                    onSortColumn={handleSortColumn}
                >
                    {columns.map(column => {
                        const { key, label, hasDetail, ...rest } = column;
                        return (
                            <Column {...rest} key={key}>
                                <HeaderCell style={{ padding: 4, fontWeight: 'bold', color: '#000' }} > {label}</HeaderCell>
                                {hasDetail ? <AttendaceCell dataKey={"eventid"} /> : <Cell dataKey={key} style={{ padding: 4 }} />}
                            </Column>
                        );
                    })}
                </Table>

            </div>
        </div>
    )
}
export default TableEvents