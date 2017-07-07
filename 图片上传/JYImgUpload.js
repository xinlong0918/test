/**
 * Created by fan.xinlong on 2017/6/9.
 */
function imgUpload(file,cb,isCompression) {
    if(isCompression){
        lrz(file)
            .then(function (rst) {
                rst.formData.append('file', rst.fileLen);
                imgUploadRequest(rst.formData,cb)
            })
            .catch(function (err) {
                cb(err)
            })
    }else{
        // 未压缩
        imgUploadRequest(file,cb,true);
    }
}
function imgUploadRequest(file,cb,flag) {
    var fd;
    if(flag){
        fd = new FormData();
        fd.append('file', file);
    }else{
        fd = file;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://m.pay.jyall.com/affiliated/image');
    xhr.onload = function () {
        var data = JSON.parse(xhr.response);
        cb(data)
    };
    xhr.send(fd);
}

