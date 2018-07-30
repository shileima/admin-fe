import React        from 'react';

// 通用列表
class TableList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            firstLoading: true
        }
    }
    componentWillReceiveProps(){
        this.setState({
            firstLoading: false
        })
    }
    render(){
        let listInfo = (
            <tr>
                <td colSpan = {this.props.tableHeads.length} className="text-center">
                    {this.state.firstLoading?'正在加载数据...':'没有找到相应的结果'}
                </td>
            </tr>
        )
        let listBody = this.props.children;
        
        let tableHeader = this.props.tableHeads.map(
            (tableHead,index) => {
                if(typeof tableHead === 'object'){
                    return <th key = {index} width={tableHead.width}>{tableHead.name}</th>
                }else if(typeof tableHead === 'string'){
                    return <th key = {index}>{tableHead}</th>
                }
            }
        )
    
        let tableBody = listBody.length > 0? listBody : listInfo;
        return (
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                {tableHeader}
                            </tr>
                        </thead>
                        <tbody>
                        { tableBody }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }  
}

export default TableList;