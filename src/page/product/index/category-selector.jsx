import React        from 'react';
import './category-selector.scss'

class CategorySelector extends React.Component{
    render(){
        return (
            <div>
                <div className="col-md-10">
                <select name="" id="" className="form-control cate-select">
                    <option value="">请选择一级分类</option>
                </select>
                <select name="" id="" className="form-control cate-select">
                    <option value="">请选择二级分类</option>
                </select>
                </div>
            </div>
        )
    }
}

export default CategorySelector;