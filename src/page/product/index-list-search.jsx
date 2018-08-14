import React        from 'react';

class ProductSearch extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            searchType : 'productId',
            searchKeywords : ''
        }
    }
    onValueChange(e){
        let name = e.target.name;
        let value = e.target.value.trim();

        this.setState({
            [name] : value
        })

    }
    onSearch(){
        this.props.onSearch(this.state.searchType,this.state.searchKeywords)
    }
    onSearchKeyUp(e){
        if(e.keyCode === 13){
            this.onSearch()
        }
    }

    render(){
        return (
            <div className="row search-wrap">
                <div className="col-md-12">
                    <div className="form-inline">
                        <select name="" id="" 
                            className="form-control" 
                            name = "searchType"
                            onChange={e=>this.onValueChange(e)}
                        >
                            <option value="productId">按产品ID查询</option>
                            <option value="productName">按产品名称查询</option>
                        </select>
                        <div className="form-group">
                            <input 
                            type="text" 
                            className="form-control" 
                            placeholder="关键词"
                            name = "searchKeywords"
                            onKeyUp={e=>this.onSearchKeyUp(e)}
                            onChange={e=>this.onValueChange(e)}
                            />
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={e=>this.onSearch()}    
                        >搜索</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductSearch;