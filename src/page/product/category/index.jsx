import React      from 'react';
import PageTitle  from 'component/page-title/index.jsx';
import MUtil      from 'util/mm.jsx';
import Product    from 'service/product-service.jsx';

const _mm      =   new MUtil();
const _product =   new Product();

class CategoryList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            categoryId: 0,
            list: [],
            firstLoading: true
        }
    }
    componentDidMount(){
        this.loadCategoryList();
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.categoryId !== this.state.categoryId){
            this.loadCategoryList(this.state.categoryId)
        }

    }
    loadCategoryList(){
        _product.getCategoryList(this.state.categoryId).then(
            res => {
                this.setState(res,()=>{
                    this.setState({
                        list: res,
                        firstLoading: false
                    })
                })
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

    onChildCategory(categoryId){
        this.setState({
            categoryId : categoryId
        })
    }

    render(){
        let listBody = this.state.list.map((category,index) => {
            return (
                <tr key={index}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td><a href="javascript:;" 
                        onClick={() => this.onChangeCategoryName(category.id,category.name)}>修改名称 </a>
                        {category.parentId === 0 ? (<a /* href={'/product-category/index/' + category.id} */ href="javascript:;" 
                        onClick={()=>{this.onChildCategory(category.id)}}> 查看子分类</a>): null}
                        
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
            <p>当前的品类ID：{this.state.categoryId}</p>
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