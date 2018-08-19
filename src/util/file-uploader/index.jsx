import React from 'react'
import FileUpload from './FileUpload.jsx';

class FileUploader extends React.Component{
    render(){
        const options={
            baseUrl         : '/manage/product/upload.do',
            fileFieldName   : 'upload_file',
            dataType        : 'json',
            chooseAndUpload : true,
            accept          : 'image/*',
            uploadSuccess   : (res) => {
                this.props.onSuccess(res.data)
            },
            uploadError     : (err) => { this.props.onError(err.message || '上传图片失败') }
        }
        /*Use FileUpload with options*/
        /*Set two dom with ref*/
        return (
            <FileUpload options={options}>
                <button className="btn btn-xs btn-default" ref="chooseAndUpload">请选择图片</button>
            </FileUpload>
        )	        
    }
}

export default FileUploader;
