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

    // 获取一级分类列表
    getCategoryList(parentCategoryId){
        return _mm.request({
            type : 'POST',
            url : '/manage/category/get_category.do',
            data : {
                categoryId : parentCategoryId || 0
            }
        })
    }
}

export default Product;