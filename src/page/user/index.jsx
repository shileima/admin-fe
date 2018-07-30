import React      from 'react';
import { Link }   from 'react-router-dom';
import PageTitle  from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import 'rc-pagination/dist/rc-pagination.min.css';

import MUtil      from 'util/mm.jsx';
import User       from 'service/user-service.jsx';

import TableList  from 'util/table-list/index.jsx'
const _mm     =   new MUtil();
const _user   =   new User();

class UserList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            list: [],
            pageNum: 1
        }
    }
    componentDidMount(){
        this.loadUserList();
    }
    loadUserList(){
        _user.getUserList(this.state.pageNum).then(
            res => {
                this.setState(res)
            },
            errMsg => {
                _mm.errTips(errMsg)
            })
    }
    onPageNumChange(pageNum){
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadUserList();
        })
    }
    
    render(){
        let tableHeads = [
            {name:'ID',width:'10%'},
            {name:'用户名',width:'50%'},
            {name:'邮箱',width:'10%'},
            {name:'电话',width:'15%'},
            {name:'注册时间',width:'15%'}
        ];
        let listBody = this.state.list.map((user,index) => {
            return (
                <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    
                    {/* toLocaleDateString() 只返回日期 2018/6/10 */}
                    {/* <td>{new Date(user.createTime).toLocaleDateString()}</td> */
}

                    {/* toLocaleString() 返回日期和时间 2018/6/10 下午9:21:33 */}
                    <td>{new Date(user.createTime).toLocaleString()}</td>

                </tr>
            )
        })
    
        return <div id="page-wrapper">
            <PageTitle title="用户列表"></PageTitle>
            <TableList tableHeads = {tableHeads}>
                {listBody}
            </TableList>
            <Pagination 
                current={this.state.pageNum} 
                total={this.state.total} 
                onChange={ pageNum => this.onPageNumChange(pageNum) } 
            />
        </div>
    }
}

export default UserList;