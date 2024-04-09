import React from "react";
import GetSelectedTable from "./GetSelectedTable";
import GetNumberRow from "./GetNumberRow";
import { v4 as uuidv4 } from 'uuid';


class TopTable extends React.Component {
    state = {
        row: {
            number: '',
            id: '',
            selected: false,
            locked: false
        },
        rows: [],
        selectedRows: [],
        lockedRows: []
    }
    marginTop = {
        marginTop: 60
    }
    tableStyle = {
        maxHeight: '500px',
        overflowY: 'scroll'
    }
    headerStyle = {
        width: '25%'
    }

    onAddClick = () => {
        const num = Math.floor(Math.random() * (500 - 1 + 1) + 1);
        const row = {
            number: num,
            id: uuidv4()
        };
        this.setState({ rows: [...this.state.rows, row] });
    }
    changeSelection = (thisRow) => {
        const { selectedRows, rows, lockedRows } = this.state;
        const existingRow = selectedRows.find(r => r.id === thisRow.id);
        if (existingRow) {
            const row = rows.find(r => r.id === thisRow.id);
            const rowCopy = { ...row, selected: false };
            const selRows = selectedRows.filter(r => r.id !== thisRow.id);
            const locRows = lockedRows.filter(r => r.id !== thisRow.id);
            const filteredRows = rows.filter(r => r.id !== row.id);
            filteredRows.push(rowCopy);
            this.setState({ rows: filteredRows, selectedRows: selRows, lockedRows: locRows });
        } else {
            const row = rows.find(r => r.id === thisRow.id);
            const rowCopy = { ...row, selected: true };
            const filteredRows = rows.filter(r => r.id !== thisRow.id);
            filteredRows.push(rowCopy);
            this.setState({ rows: filteredRows, selectedRows: [...this.state.selectedRows, rowCopy] });
        }
    }
    changeLocking = (thisRow) => {
        const { lockedRows, rows, selectedRows } = this.state;
        console.log(thisRow.locked);
        const existingRow = lockedRows.find(r => r.id === thisRow.id);
        if (existingRow) {
            const row = rows.find(r => r.id === thisRow.id);
            const rowCopy = { ...row, locked: false };
            const locRows = lockedRows.filter(r => r.id !== thisRow.id);
            const selRows=selectedRows.filter(r=>r.id!==thisRow.id);
            selRows.push(rowCopy);
            const filteredRows = rows.filter(r => r.id !== thisRow.id);
            filteredRows.push(rowCopy);
            this.setState({ rows: filteredRows, lockedRows: locRows,selectedRows:selRows });
        } else {
            const row = rows.find(r => r.id === thisRow.id);
            const rowCopy = { ...row, locked: true };
            const selRows=selectedRows.filter(r=>r.id!==thisRow.id);
            selRows.push(rowCopy);
            const filteredRows = rows.filter(r => r.id !== thisRow.id);
            filteredRows.push(rowCopy);
            this.setState({ rows: filteredRows, lockedRows: [...this.state.lockedRows, rowCopy], selectedRows:selRows });
        }
        console.log(thisRow.locked);
    }

    render() {
        return (<>
            <div className="container" style={this.marginTop}>
                <div className="row">
                    <div className="col-md-12">
                        <button className="btn btn-success btn-lg w-100"
                            onClick={this.onAddClick}
                        >Add</button>

                        <div style={this.tableStyle}>
                            <table className="table table-hover table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th style={this.headerStyle}>Number</th>
                                        <th>Add/Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <GetNumberRow
                                        rows={this.state.rows}
                                        changeSelection={this.changeSelection}
                                    />

                                </tbody>
                            </table>
                        </div>
                    </div>
                    {!!this.state.selectedRows.length && <GetSelectedTable
                        selectedRows={this.state.selectedRows}
                        changeLocking={this.changeLocking}
                    />}
                </div>
            </div>
        </>)
    }
}
export default TopTable;

