import React        from 'react';
import Simditor     from  'simditor';
import 'simditor/styles/simditor.scss';
import './index.scss';

// 通用的富文本编辑器，依赖 jquery
class RichEditor extends React.Component{

    componentDidMount(){
        this.loadEditor()
    }

    loadEditor(){
        let element = this.refs['textarea'];
        this.simditor = new Simditor({
            textarea : element,
            defaultValue : this.props.placeholder || "请输入内容",
            upload : {
                url : '/manage/product/richtext_img_upload.do'
            }
        })
        this.bindEditorEvent()
    }

    bindEditorEvent(){
        this.simditor.on('valuechanged', e => {
            this.props.onValueChange(this.simditor.getValue())
        })
    }

    componentWillReceiveProps(nextProps){
        let detailChange = this.props.detail !== nextProps.detail;
        if(!detailChange){
            return;
        }
        this.simditor.setValue(nextProps.detail)
    }

    render(){
        return (
            <div className="rich-editor">
                <textarea ref="textarea"></textarea>
            </div>
        )	        
    }
}

export default RichEditor;
