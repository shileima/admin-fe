import React from 'react';
import ReactDom from 'react-dom';

class DidMountFor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            count : 0
        }
    }
    // componentDidMount() {
    //     for(let i=0;i<10;i++){
    //         this.setState({
    //             count: this.state.count + 1
    //         });
    //         console.log(this.state.count) // 10个 0 说明 setState()是异步执行函数
    //     }
    //     console.log(this.state.count) // 0 
    // }

    //这是React的优化手段，但是显然它也会在导致一些不符合直觉的问题（就如上面这个例子），
    //所以针对这种情况，React给出了一种解决方案：setState接收的参数还可以是一个函数，
    //在这个函数中可以拿先前的状态，并通过这个函数的返回值得到下一个状态。

    componentDidMount() {
        for(let i=0;i<10;i++){
            this.setState(preState => {
                console.log(preState.count) // 0....9
                return {
                    count: preState.count + 1
                }
                
            });
            
        }
    }
    render(){
        return (
            <div>
                <p>Result: {this.state.count}</p>
            </div>
        )
    }
}
                
export default DidMountFor;