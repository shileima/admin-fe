import React      from 'react';
import PageTitle  from 'component/page-title/index.jsx' 
import CategorySelector from 'page/product/index/category-selector.jsx';
import FileUploader from 'util/file-uploader/index.jsx';
import RichEditor from 'util/rich-editor/index.jsx'

import '../save.scss';

import MUtil      from 'util/mm.jsx';
import Product    from 'service/product-service.jsx';

const _mm      =   new MUtil();
const _product =   new Product();

class ProductSave extends React.Component{

    constructor(props){
        super(props)
        this.state = {
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

    onValueChange(e){
        let name  = e.target.name,
            value = e.target.value;
        this.setState({
            [name] : value
        })
    }

    onCategoryChange(categoryId, parentCategoryId){
        this.setState({
            categoryId       : categoryId,
            parentCategoryId : parentCategoryId
        })
    }

    onUploadSeccess(res){
        let subImages = this.state.subImages;
        subImages.push(res)
        this.setState({
            subImages : subImages
        })
    }

    onUploadError(errMsg){
        _mm.errTips(errMsg)
    }

    deleteImg(e){
        let index = e.target.getAttribute('index');
        let subImages = this.state.subImages;
        subImages.splice(index,1)
        this.setState({
            subImages : subImages
        })
    }

    onDetailValueChange(value){
        this.setState({
            detail : value
        })
    }

    getSubImages(){
        return this.state.subImages.map(image => image.uri ).join(',');
    }

    // 提交表单
    onSubmit(){
        let product = {
            name : this.state.name,
            subtitle   : this.state.subtitle,
            categoryId : parseInt(this.state.categoryId),
            subImages  : this.getSubImages(),
            detail     : this.state.detail,
            price      : parseFloat(this.state.price),
            stock      : parseInt(this.state.stock),
            status     : this.state.status,
        }
        // console.log(product);
        
        let productCheckResult = _product.checkProduct(product);
        if(productCheckResult.status){
            _product.saveProduct(product).then(res=>{
                _mm.successTips(res)
                this.props.history.push('/product/index')
            }, errMsg => {
                _mm.errTips(errMsg)
            })
        }else{
            _mm.errTips(productCheckResult.msg)
        }
    }

    render(){
        return  (
            <div id="page-wrapper">
                    <PageTitle title="商品添加" />
                    <div className="form-horizontal">
                        <div className="form-group">
                            <label className="col-md-2 control-label">商品名称</label>
                            <div className="col-md-5">
                            <input type="text" className="form-control" placeholder="请输入商品名称"
                            name = "name"
                            onChange={e=>{this.onValueChange(e)}}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">商品描述</label>
                            <div className="col-md-5">
                            <input type="text" className="form-control" placeholder="请输入商品描述"
                            name = "subtitle"
                            onChange={e=>{this.onValueChange(e)}}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">所属分类</label>
                            <CategorySelector onCategoryChange={
                                (categoryId, parentCategoryId) => {this.onCategoryChange(categoryId, parentCategoryId)}
                            }/>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">商品价格</label>
                            <div className="col-md-3">
                                <div className="input-group">
                                    <input type="number" className="form-control" placeholder="价格"
                                    name = "price"
                                    onChange={e=>{this.onValueChange(e)}}/>
                                    <span className="input-group-addon">元</span>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">商品库存</label>
                            <div className="col-md-3">
                                <div className="input-group">
                                    <input type="number" className="form-control" placeholder="库存"
                                    name = "stock"
                                    onChange={e=>{this.onValueChange(e)}}/>
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
                                        <i className="fa fa-close" index={index} onClick={(e)=>{this.deleteImg(e)}}></i>
                                    </div>)
                                ) : (<div>请上传图片！</div>)
                                }
                            </div>
                            <div className="col-md-10 col-md-offset-2 file-upload-con">
                                <FileUploader 
                                    onSuccess={(res) => {this.onUploadSeccess(res)}}
                                    onerror={(err) => {this.onUploadError(err)}}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">商品详情</label>
                            <div className="col-md-8">
                                <RichEditor placeholder="请输入内容" 
                                onValueChange={(value)=>{this.onDetailValueChange(value)}}
                                name = "subtitle"
                                onChange={e=>{this.onValueChange(e)}}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-offset-2 col-md-5">
                                <button type="submit" className="btn btn-primary"
                                onClick={e=>{this.onSubmit()}}>提交</button>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default ProductSave;