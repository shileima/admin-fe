import React from 'react';
import ReactDom from 'react-dom';

import './index.css';
import './index.scss';
import 'font-awesome/css/font-awesome.min.css'

class Wrapper extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
               <h1>Hello</h1>
               <i className="fa fa-address-book"></i>
            </div>
        )
    }
}

                
ReactDom.render(<Wrapper />,document.getElementById('app'))