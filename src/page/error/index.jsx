import React     from 'react';
import { Link }  from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';

class Error extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="出错了！"></PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        <p className="error">出错啦，找不到该路径</p>
                        <Link to="/">点我返回</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Error;