import MUtil from 'util/mm.jsx';
const _mm = new MUtil();

class Product {
    // 用户登录
    login(loginInfo){
        //return _mm.request({

        return _mm.request({ // 这里加不加 return 都会成功返回，因为_mm 的构造函数就是 promise 对象
            type: 'post',
            url: '/manage/user/login.do',
            data: loginInfo
        })
    }

    // 获取产品列表
    getProductList(listParam){
        let url = '';
        let data = {};
        if(listParam.listType === 'list' ){
            url  = '/manage/product/list.do';
            data = {
                pageNum: listParam.pageNum
            }
        }else if(listParam.listType === 'search'){
            url  = '/manage/product/search.do';
            data = {
                pageNum              : listParam.pageNum,
                [listParam.searchType] : listParam.searchKeywords
            }
        }

        return _mm.request({
            type: 'post',
            url : url,
            data: data
        })
    }

    // 变更产品销售状态
    setProductStatus(productInfo){
        return _mm.request({
            type: 'post',
            url : '/manage/product/set_sale_status.do',
            data: productInfo
        })
    }

    // 检查保存商品的表单数据
    checkProduct(product){
        let result = {
            status: true,
            msg: "验证通过"
        }

        // 判断商品提交表单合法性
        if(typeof product.name != 'string' || product.name.length === 0){
            return {
                status: false,
                msg: '商品名称不能为空'
            }
        }
        if(typeof product.subtitle != 'string' || product.subtitle.length === 0){
            return {
                status: false,
                msg: '商品简介不能为空'
            }
        }
        if(typeof product.categoryId != 'number' || !(product.categoryId > 0)){
            return {
                status: false,
                msg: '请选择正确的库商品品类'
            }
        }
        if(typeof product.price != 'number' || !(product.price >= 0)){
            return {
                status: false,
                msg: '请输入正确的商品价格'
            }
        }
        if(typeof product.stock != 'number' || !(product.stock >= 0)){
            return {
                status: false,
                msg: '请输入正确的库存数量'
            }
        }

        return result;
    }

    // 保存商品
    saveProduct(product){
        return _mm.request({
            type : 'POST',
            url : '/manage/product/save.do',
            data : product
        });
    }

    // 获取一、二级分类列表
    getCategoryList(parentCategoryId){
        return _mm.request({
            type : 'POST',
            url : '/manage/category/get_category.do',
            data : {
                categoryId : parentCategoryId || 0
            }
        })
    }

    // 获取商品详情信息
    getProductDetail(productId){
        return _mm.request({
            type : 'POST',
            url : '/manage/product/detail.do',
            data : {
                productId : productId
            }
        })
    }

    // 修改品类名称
    updateCategoryName(categoryInfo){
        return _mm.request({
            type : 'POST',
            url : '/manage/category/set_category_name.do',
            data : categoryInfo
        })
    }
}

export default Product;