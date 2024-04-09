import React from "react";

class GetSelectedTable extends React.Component {

    backgroundStyle = {
        backgroundColor: 'rgb(233,236,239)',
        display: 'flex'
    }
    changeIfLocked = (thisRow)=>{
        this.props.changeLocking(thisRow)
    }

    render() {
        return (<>
            <div className="row p-5 rounded" style={this.backgroundStyle}>
                <div className="col-md-6 col-md-offset-3">
                    <h3>Selected Numbers</h3>
                </div>
                <ul className="list-group">
                    {this.props.selectedRows.map((row, i) => (
                        <div key={i}>
                            <li className="list-group-item">{row.number}
                                <button className='ms-5 btn btn-primary' onClick={()=>this.changeIfLocked(row)}>{row.locked?'Unlock':'Lock'}</button>
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
        </>)
    }
}
export default GetSelectedTable;