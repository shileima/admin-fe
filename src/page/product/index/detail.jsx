import React      from 'react';
import PageTitle  from 'component/page-title/index.jsx'
import CategorySelector from 'page/product/index/category-selector.jsx';


import MUtil      from 'util/mm.jsx';
import Product    from 'service/product-service.jsx';

const _mm      =   new MUtil();
const _product =   new Product();

class ProductDetail extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            id                : this.props.match.params.pid,
            name              : '',
            subtitle          : '',
            categoryId        : 0,
            parentCategoryId  : 0,
            subImages         : [],
            price             : '',
            stock             : '',
            detail            : '',
            price             : '',
            status            : 1 // 商品默认添加状态是在售
        }
    }

    componentDidMount(){
        if(this.state.id) {
            this.loadProduct()
        }
    }

    loadProduct(){
        _product.getProductDetail(this.state.id).then(res => {

            let images = res.subImages.split(',');
            res.subImages = images.map(image => {
                return {
                    uri : image,
                    url : res.imageHost + image
                }
            })
            this.setState(res);
        }, errMsg => {
            _mm.errTips(errMsg)
        })
    }

    render(){
        return  (
            <div id="page-wrapper">
                <PageTitle title="商品添加" />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.name}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.subtitle}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CategorySelector
                            readOnly
                            categoryId={this.state.categoryId}
                            parentCategoryId={this.state.parentCategoryId}
                        />
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control"
                                       value={this.state.price}
                                       readOnly />
                                <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control"
                                       value={this.state.stock}
                                       readOnly />
                                <span className="input-group-addon">件</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10">
                            {
                                this.state.subImages.length ? this.state.subImages.map((img,index)=>
                                    (<div className="img-con" key={index} >
                                        <img className="img" src={img.url} alt=""/>
                                    </div>)
                                ) : (<div>无图片！</div>)
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-8" dangerouslySetInnerHTML={{__html : this.state.detail}}></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductDetail;