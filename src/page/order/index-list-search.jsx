import React        from 'react';

class OrderSearch extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            orderNo : ''
        }
    }
    onValueChange(e){
        this.setState({
            orderNo : e.target.value
        })
    }
    onSearch(){
        this.props.onSearch(this.state.orderNo)
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
                        <div className="form-group">
                            <input 
                            type="text" 
                            className="form-control" 
                            placeholder="订单号"
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

export default OrderSearch;