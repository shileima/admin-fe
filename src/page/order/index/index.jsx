import React       from 'react';
import { Link }    from 'react-router-dom';
import PageTitle   from 'component/page-title/index.jsx';
import Pagination  from 'util/pagination/index.jsx';
import 'rc-pagination/dist/rc-pagination.min.css';

import MUtil       from 'util/mm.jsx';
import Order       from 'service/order-service.jsx';

import TableList   from 'util/table-list/index.jsx'
import OrderSearch from '../index-list-search.jsx';
const _mm      =   new MUtil();
const _order   =   new Order();

class OrderList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            list: [],
            pageNum: 1,
            listType: 'list'
        }
    }
    componentDidMount(){
        this.loadOrderList();
    }
    loadOrderList(){
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum = this.state.pageNum;

        if(this.state.listType === 'search'){
            listParam.orderNo = this.state.orderNo
        }

        _order.getOrderList(listParam).then(res => 
            {
                this.setState(res)
            },
            errMsg => {
                _mm.errTips(errMsg)
                this.setState({
                    list : []
                })
            })
    }
    onPageNumChange(pageNum){
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadOrderList();
        })
    }
    onSearch(orderNo){
        let listType = orderNo !== '' ? 'search' : 'list';
        this.setState({
            listType       : listType,
            pageNum        : 1,
            orderNo        : orderNo
        }, () => {
            this.loadOrderList();
        })
    }
    render(){
        let tableHeads = ['订单号','收件人','订单状态','订单总价','操作']
        return <div id="page-wrapper">
            <PageTitle title="订单列表" />
            <OrderSearch onSearch={(orderNo)=>{this.onSearch(orderNo)}} />
            <TableList tableHeads={tableHeads} >
                {
                    this.state.list.map((order,index) => {
                        return (
                            this.state.list.length == 0 ? '<tr>没有找到相应的结果</tr>' 
                            :
                            <tr key={index}>
                                <td>{order.orderNo}</td>
                                <td>
                                    <p>{order.receiverName}</p>
                                </td>
                                <td>{order.statusDesc}</td>
                                <td>￥{order.payment}</td>
                                <td>
                                    <Link to={ `/order/detail/${order.orderNo}` }>查看详情</Link>
                                    <br/>
                                    <Link to={ `/order/edit/${order.orderNo}` }>编辑</Link>
                                </td>
                            </tr>
                        )
                    })
                }
            </TableList>
            <Pagination 
                current={this.state.pageNum} 
                total={this.state.total} 
                onChange={ pageNum => this.onPageNumChange(pageNum) } 
            />
        </div>
    }
}

export default OrderList;