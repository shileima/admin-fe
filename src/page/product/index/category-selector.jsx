import React        from 'react';
import './category-selector.scss'
import MUtil        from 'util/mm.jsx';
import Product      from 'service/product-service.jsx';

const _mm      =   new MUtil();
const _product =   new Product();

class CategorySelector extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            firstCategoryList : [],
            firstCategoryId   : 0,
            secondCategoryList : [],
            secondCategoryId   : 0
        }
    }

    componentDidMount(){
        this.loadFirstCategory()
    }
    
    // 加载一级分类
    loadFirstCategory(){
        _product.getCategoryList().then(res => {
            this.setState({
                firstCategoryList : res
            }, errMsg => {
                _mm.errTips(errMsg)
            })
        })
    }

    // 加载二级分类
    loadSecondCategoryList(){
        _product.getCategoryList(this.state.firstCategoryId).then(res => {
            this.setState({
                secondCategoryList : res
            }, errMsg => {
                _mm.errTips(errMsg)
            })
        })
    }

    onFirstCategoryChange(e){
        let newValue = e.target.value || 0;
        console.log('first:',newValue)
        this.setState({
            firstCategoryId : newValue,
            secondCategoryId : 0,
            secondCategoryList : []
        }, () => {
            // 更新二级分类并传值
            this.loadSecondCategoryList();
            this.onPropsCategoryChange()
        })
    }

    onSecondCategoryChange(e){
        let newValue = e.target.value || 0;
        console.log('first:',newValue)
        this.setState({
            secondCategoryId : newValue
        }, () => {
            // 传值
            this.onPropsCategoryChange()
        })
    }

    // 传给父组件选中的 categoryId
    onPropsCategoryChange(){
        // 判断 父组件 props 里的回调函数存在
        let categoryChangeable = typeof this.props.onCategoryChange === 'function';
        // 如果有二级分类
        if(this.state.secondCategoryId){
            categoryChangeable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId)
        }else{
            categoryChangeable && this.props.onCategoryChange(this.state.firstCategoryId, 0)
        }
    }
    
    render(){
        return (
            <div>
                <div className="col-md-10">
                <select id="" className="form-control cate-select"
                    onChange = {(e) => this.onFirstCategoryChange(e)}>
                    <option value="">请选择一级分类</option>
                    {
                        this.state.firstCategoryList.map(
                            (category,index) => {
                                return <option key={index} value={category.id}>{category.name}</option>  
                            })
                    }
                </select>
                    {
                        this.state.secondCategoryList.length ? (
                            <select id="" className="form-control cate-select"
                                onChange = {(e) => this.onSecondCategoryChange(e)}>
                                <option value="">请选择二级分类</option>
                                {
                                    this.state.secondCategoryList.map(
                                        (category,index) => {
                                            return <option key={index} value={category.id}>{category.name}</option>  
                                        })
                                }
                            </select>
                        ) : null
                    }
                </div>
            </div>
        )
    }
}

export default CategorySelector;