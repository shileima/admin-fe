import React      from 'react';
import { Link }   from 'react-router-dom';
import PageTitle  from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import 'rc-pagination/dist/rc-pagination.min.css';

import MUtil      from 'util/mm.jsx';
import Product    from 'service/product-service.jsx';

const _mm      =   new MUtil();
const _product =   new Product();

class CategoryList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            list: [],
            categoryId : 0
        }
    }

    // 第一次加载执行
    componentDidMount(){
        this.loadCategoryList();
    }

    // 组件更新执行
    componentDidUpdate(prevProps, prevState){
        let childCategoryId = this.props.match.params.categoryId,
            oldPath         = prevProps.location.pathname,
            newpath         = this.props.location.pathname;

        if(oldPath !== newpath){
            this.setState({
                categoryId : childCategoryId
            }, () => {
                this.loadCategoryList();
            });
        }

    }
    loadCategoryList(){
        _product.getCategoryList(this.state.categoryId).then(
            res => {
                this.setState(res,()=>{
                    this.setState({
                        list : res
                    })
                })
                 // console.log(this.state.list)
            },
            errMsg => {
                _mm.errTips(errMsg)
            })

    }
    // 更新品类的名字
    onUpdateName(categoryId, categoryName){
        let newName = window.prompt("请输入新的品类名称", categoryName);
        _product.updateCategoryName({
            categoryId   : categoryId,
            categoryName : newName
        }).then(res => {
            _mm.successTips(res.msg)
            this.loadCategoryList();
        }, errMsg => {
            _mm.errTips(errMsg)
        })
    }

    render(){
        let listBody = this.state.list.map((category,index) => {
            return (
                <tr key={index}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>
                        <a className="opera"
                            onClick={ e => this.onUpdateName(category.id, category.name) }>
                        修改名称 </a>
                        {category.parentId === 0 ?
                            <Link to={`/product-category/index/${category.id}`}>子品类</Link>: ""}
                    </td>

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
            <PageTitle title="品类列表"></PageTitle>
            <div className="row">
                <div className="col-md-12">
                    <p>父品类ID : {this.state.categoryId}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>品类ID</th>
                                <th>品类名称</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                        { tableBody }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
}

export default CategoryList;