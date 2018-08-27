import React      from 'react';
import PageTitle  from 'component/page-title/index.jsx';
import MUtil      from 'util/mm.jsx';
import Product    from 'service/product-service.jsx';

const _mm      =  new MUtil();
const _product =  new Product();

class CategoryAdd extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            categoryList   : [],
            parentId       : 0,
            categoryName   : ''
        }
    }

    // 第一次加载执行
    componentDidMount(){
        this.loadCategoryList();
    }

    // 加载父品类列表
    loadCategoryList(){
        _product.getCategoryList().then(
            res => {
                this.setState({
                    categoryList : res
                }, ()=>{console.log('分类过多，加载完毕！')})
            },
            errMsg => {
                _mm.errTips(errMsg)
            })

    }

    onValueChange(e){
        /*if(e.target.name === 'select'){
            let parentId     = e.target.value;
            this.setState({
                parentId
            })
        }else{
            let categoryName = e.target.value;
            this.setState({
                categoryName
            })
        }*/
        let name   = e.target.name,
            value  = e.target.value;

        this.setState({
            [name] : value
        })
    }

    onAddCategory(){
        let categoryName = this.state.categoryName.trim();
        if(!categoryName){
            _mm.errTips('请输入品类名称')
            return;
        }else{
            let addCategoryInfo = {
                parentId      : this.state.parentId || 0,
                categoryName  : categoryName
            }
            _product.addCategory(addCategoryInfo).then(res=>{
                _mm.successTips(res.msg)
                this.props.history.push('/product-category/index')
            }, errMsg=>{
                _mm.errTips(errMsg)
            })
        }
    }

    render(){
        return <div id="page-wrapper">
            <PageTitle title="品类列表"></PageTitle>
            <div className="row">
                <div className="col-md-12">
                    <div className="form-horizontal">
                        <div className="form-group">
                            <label className="col-md-2 control-label">所属品类</label>
                            <div className="col-md-5">
                                <select className="form-control"
                                    onChange={e=>this.onValueChange(e)}
                                    name="parentId">
                                    <option value="0">根品类</option>
                                    {
                                        this.state.categoryList.map(
                                            (category,index) => <option key={index} value={category.id}>{category.name}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">商品名称</label>
                            <div className="col-md-5">
                                <input type="text"
                                       className="form-control"
                                       placeholder="请输入商品名称"
                                       name="categoryName"
                                       value={this.state.categoryName}
                                       onChange={e=>{this.onValueChange(e)}}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-offset-2 col-md-5">
                                <button type="submit" className="btn btn-primary"
                                        onClick={(e)=>{this.onAddCategory()}}>提交</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default CategoryAdd;