import React      from 'react';
import { Link }   from 'react-router-dom';
import PageTitle  from 'component/page-title/index.jsx';
import MUtil      from 'util/mm.jsx';
import Product    from 'service/product-service.jsx';

const _mm      =   new MUtil();
const _product =   new Product();

class CategoryList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            categoryId: this.props.match.params.cid || 0,
            list: [],
            firstLoading: true
        }
    }

    // 第一次加载执行
    componentDidMount(){
        this.loadCategoryList();
    }
    componentDidUpdate(prevProps, prevState){
        /* console.log(prevProps.match.params.cid)
        console.log(this.props.match.params.cid) */
        if(this.props.location !== prevProps.location){
            this.setState({
                categoryId : this.props.match.params.cid
            }, ()=>{
                this.loadCategoryList()
            })
            
            /* this.props.history.push('/product-category/index/' + this.state.categoryId)
            console.log(this.props.history) */
        }

    }
    loadCategoryList(){
        _product.getCategoryList(this.state.categoryId).then(
            res => {
                this.setState({
                    list: res,
                    firstLoading: false
                })
                 // console.log(this.state.list)
            },
            errMsg => {
                _mm.errTips(errMsg)
            })

    }

    onChangeCategoryName(categoryId, categoryName){
        let newName = window.prompt('请输入修改名称', categoryName)
        let categoryInfo ={
            categoryId   : categoryId,
            categoryName : newName
        }
        _product.setCategoryName(categoryInfo).then(res=>{
            _mm.successTips(res.msg);
            this.loadCategoryList();

        }, errMsg => {
            _mm.errTips(errMsg)
        })
    }

    /* onChildCategory(categoryId){
        this.setState({
            categoryId : categoryId
        })
    } */

    render(){
        let listBody = this.state.list.map((category,index) => {
            return (
                <tr key={index}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>

                    <td><a href="javascript:;" 
                        onClick={() => this.onChangeCategoryName(category.id,category.name)}>修改名称 </a>
                        {category.parentId === 0 
                        ? (<Link to = {`/product-category/index/${category.id}`} /* href="javascript:;" */ 
                        /* onClick={()=>{this.onChildCategory(category.id)}} */> 查看子分类</Link>)
                        : null}
                        
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
            <PageTitle title="品类列表">
                <div className="page-header-right">
                    <Link className="btn btn-primary" to="/product-category/add">
                        <i className="fa fa-plus"></i>
                        <span>添加品类</span>
                    </Link>
                </div>
            </PageTitle>
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>品类ID</th>
                                <th>品类名称</th>
                                <th>品类操作</th>
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