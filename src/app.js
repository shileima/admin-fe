import React from 'react';
import ReactDom from 'react-dom';

const element = (<div>
    <div>Hello World!</div>
    <h1>这是 h1</h1>
</div>)
                
ReactDom.render(element,document.getElementById('root'))