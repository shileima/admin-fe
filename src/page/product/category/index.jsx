import React      from 'react';
import { Link }   from 'react-router-dom';
import PageTitle  from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import 'rc-pagination/dist/rc-pagination.min.css';

import MUtil      from 'util/mm.jsx';
import Product    from 'service/product-service.jsx';

const _mm      =   new MUtil();
const _product =   new Product();

class ProductList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            list: [],
            pageNum: 1,
            firstLoading: true
        }
    }
    componentDidMount(){
        this.loadProductList();
    }
    loadProductList(){
        _product.getProductList(this.state.pageNum).then(
            res => {
                this.setState(res,()=>{
                    this.setState({
                        firstLoading: false
                    })
                })
            },
            errMsg => {
                _mm.errTips(errMsg)
            })
    }
    onPageNumChange(pageNum){
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadProductList();
        })
    }
    render(){
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
        let listError = (
            <tr>
                <td colSpan="5" className="text-center">
                    {this.state.firstLoading?'正在加载数据...':'没有找到相应的结果'}
                </td>
            </tr>
        )
        let tableBody = this.state.list.length > 0? listBody : listError;
        return <div id="page-wrapper">
            <PageTitle title="用户列表"></PageTitle>
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>用户名</th>
                                <th>邮箱</th>
                                <th>电话</th>
                                <th>注册时间</th>
                            </tr>
                        </thead>
                        <tbody>
                        { tableBody }
                        </tbody>
                    </table>
                </div>
            </div>
            <Pagination 
                current={this.state.pageNum} 
                total={this.state.total} 
                onChange={ pageNum => this.onPageNumChange(pageNum) } 
            />
        </div>
    }
}

export default ProductList;