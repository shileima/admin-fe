import React          from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'; 

import ProductList    from 'page/product/index/index.jsx';
import CategoryList   from 'page/product/category/index.jsx';
import CategoryAdd   from 'page/product/category/add.jsx';
import ProductSave    from 'page/product/index/save.jsx';
import ProductDetail  from 'page/product/index/detail.jsx';

class ProductRouter extends React.Component{
    render(){
        return (
            <Switch>
                <Route exact path="/product/index" component={ProductList} />
                <Route exact path="/product-category/index/:cid?" component={CategoryList} />
                <Route exact path="/product-category/add" component={CategoryAdd} />
                <Route exact path="/product/save" component={ProductSave} />
                <Route exact path="/product/edit/:pid" component={ProductSave} />
                <Route exact path="/product/detail/:pid" component={ProductDetail} />
                <Redirect exact from="/product" to="/product/index" />
            </Switch>
        )
    }
}

export default ProductRouter;