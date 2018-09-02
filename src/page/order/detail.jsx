import React      from 'react';
import PageTitle  from 'component/page-title/index.jsx'
import TableList   from 'util/table-list/index.jsx'


import MUtil      from 'util/mm.jsx';
import Order      from 'service/order-service.jsx';

const _mm       =   new MUtil();
const _order    =   new Order();

class OrderDetail extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            orderNo  : this.props.match.params.oid
        }
    }

    componentDidMount(){
        if(this.state.orderNo) {
            this.loadOrder()
        }
    }

    loadOrder(){
        _order.getOrderDetail(this.state.orderNo).then(res => {
            this.setState(res);
        }, errMsg => {
            _mm.errTips(errMsg)
        })
    }

    onSendGoods(){
        if(window.confirm('是否该订单已经发货？')){
            _order.sendGoods(this.state.orderNo).then(res => {
                _mm.successTips('发货成功！')
                this.loadOrder()
            }, errMsg => {
                _mm.errTips(errMsg)
            })
        }
    }

    render(){
        let tableHeads = ['商品图片','商品信息','单价','数量','合计']
        return  (
            <div id="page-wrapper">
                <PageTitle title="订单详情" />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单编号</label>
                        <div className="input-group">
                            <input type="text" className="form-control"
                               value={this.state.orderNo || ''}
                               readOnly />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">创建时间</label>
                        <div className="input-group">
                            <input type="text" className="form-control"
                               value={this.state.createTime || ''}
                               readOnly />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">收件人</label>
                        <div className="input-group">
                            <input type="text" className="form-control"
                               value={this.state.receiverName || ''}
                               readOnly />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单状态</label>
                        <div className="col-md-3">
                            <div className="input-group" style={{display:"flex"}}>
                                <input type="text" className="form-control"
                                       value={this.state.statusDesc || ''}
                                       readOnly />
                                {
                                    this.state.status === 30 ?
                                    <button onClick={e => this.onSendGoods(e)} 
                                        className="btn btn-default btn-sm">立即发货</button>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">支付方式</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="text" className="form-control"
                                       value={this.state.paymentTypeDesc || ''}
                                       readOnly />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单金额</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control"
                                       value={this.state.payment || ''}
                                       readOnly />
                                <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <TableList tableHeads={tableHeads} >
                        {
                            this.state.orderItemVoList ? 
                            this.state.orderItemVoList.map((order,index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <img style={{maxWidth:'100px'}} src={this.state.imageHost + order.productImage} alt=""/>
                                        </td>
                                        <td>
                                            <p>{order.productName}</p>
                                        </td>
                                        <td>￥{order.currentUnitPrice}</td>
                                        <td>{order.quantity}</td>
                                        <td>
                                        ￥{order.currentUnitPrice * order.quantity}
                                        </td>
                                    </tr>
                                )
                            })
                            : (<tr>没有相应的商品</tr>)
                        }
                    </TableList>
                </div>
            </div>
        )
    }
}

export default OrderDetail;