import React        from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'; 

import ProductList  from 'page/product/index/index.jsx';
import ProductSave  from 'page/product/index/save.jsx';

class ProductRouter extends React.Component{
    render(){
        return (
            <Switch>
                <Route exact path="/product/index" component={ProductList} />
                <Route exact path="/product/save" component={ProductSave} />
                <Redirect exact from="/product" to="/product/index" />                            
            </Switch>
        )
    }
}

export default ProductRouter;