
import XLSX from 'sheetjs-style'
import * as FileSaver from 'file-saver'

const ExportToXlsx = async (fileName, jsonData, defaultColumns) => { //with columns selection

    const fileType = 'application/vnd.openxmIformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const columnLabels = defaultColumns.map(column => column.label);
    const columnKeys = defaultColumns.map(column => column.key);
    const dataExport = []

    const header = []
    columnLabels.forEach(label => {
        header.push(label)
    });
    dataExport.push(header)
    jsonData.forEach(data => {
        var dataEntries = []
        columnKeys.forEach(keys =>{
            // dataEntries.keys = data[`${keys}`]
            dataEntries.push(data[`${keys}`])
        })
        dataExport.push(dataEntries)
    });
    const ws = XLSX.utils.aoa_to_sheet(dataExport);

    var abc = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "U", "V", "W", "X", "Y", "Z", "AA", "AB", "AC", "AD", "AE", "AF", "AG", "AH", "AI", "AJ", "AK", "AL", "AM", "AN", "AO", "AP", "AQ", "AR", "AS", "AU", "AV", "AW", "AX", "AY", "AZ"];
    let indexC = 0
    //style for the data (subject to change)
    columnLabels.forEach(element => {
        ws[`${abc[indexC]}1`].s = {// set the style for target cell
            font: {
                sz: 14,
                bold: true,
                color: { rgb: "FFFFFF" }
            },
            fill: {
                bgColor: { rgb: '163A59' } 
            },
            alignment: {
                vertical: "bottom"
            }
        };
        ws[`${abc[indexC]}1`] = { wch: 40 }
        indexC++;
    });
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] }; //edit sheet name parameter
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
}


export default ExportToXlsx