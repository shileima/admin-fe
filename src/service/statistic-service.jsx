import MUtil from 'util/mm.jsx';
const _mm = new MUtil();

class Statistic {
    // 用户登录
    getHomeCount(){
        return _mm.request({ 
            type: 'post',
            url: '/manage/statistic/base_count.do'
        })
    }
}

export default Statistic;