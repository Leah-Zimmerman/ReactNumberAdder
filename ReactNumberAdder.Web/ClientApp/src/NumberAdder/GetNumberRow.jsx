import React from "react";

class GetNumberRow extends React.Component {

    select = (thisRow)=>{
        this.props.changeSelection(thisRow)
    }
    render() {
        return (<>
            {this.props.rows && this.props.rows.map((row,i)=>(
                             <tr key={i}>
                             <td>{row.number}</td>
                             <td>
                                 <button className={'btn ' +(row.selected?'btn-danger':'btn-primary')} disabled={row.locked} onClick={()=>this.select(row)}>{row.selected?'Remove from Selected':'Add to Selected'}</button>
                             </td>
                         </tr>                                                  
                                   
                            ))}
           
        </>)
    }
}
export default GetNumberRow;

