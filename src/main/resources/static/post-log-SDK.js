/**
 * 记录访客日志
 */
function post_log_of_visit() {
    var params = {};
    if (remote_ip_info['ret'] == 1) {
        params.country = remote_ip_info['country'];
        params.province = remote_ip_info['province'];
        params.city = remote_ip_info['city'];
        params.district = remote_ip_info['district'];
    }
    if (document) {
        params.domain = document.domain || '';
        params.url = document.URL || '';
        params.title = document.title || '';
        params.referrer = document.referrer || '';
    }
    if (window && window.screen) {
        params.sh = window.screen.height || 0;
        params.sw = window.screen.width || 0;
        params.cd = window.screen.colorDepth || 0;
    }
    if (navigator) {
        params.lang = navigator.language || '';
    }
    console.log(params)
    $.ajax({
        url: log_server_url + '/log/visit',
        type: 'POST',
        dataType: 'text',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(params),
        success: function (data) {
            console.log(data);
        }
    });
}

/**
 * 传输用户行为日志
 * @param studentCode 学生id
 * @param pageKind 当前所在页面(学习页面，知识森林页面，未知)
 * @param actionType 行为分类（点击-1级分面，点击-2级分面，点击-主题，点击-碎片）
 * @param courseId 课程id
 * @param courseName 课程名字
 * @param topicName 主题名字
 * @param topicId 主题id
 * @param facetNameLevel1Name 1级分面名字
 * @param facetNameLevel1Id 1级分面id
 * @param facetNameLevel2Name 2级分面名字
 * @param facetNameLevel2Id 2级分面id
 * @param fragmentId 碎片id
 * @param jumpTargetType 跳转url类型（内部文件，内部视频，外部网页链接，本系统链接）
 * @param jumpTargetUrl 跳转url
 */
function post_log_of_action(studentCode, pageKind, actionType,
                            courseId, courseName, topicName,topicId,
                            facetNameLevel1Name, facetNameLevel1Id,facetNameLevel2Name, facetNameLevel2Id,
                            fragmentId, jumpTargetType, jumpTargetUrl) {
    var params = {};
    params.user_id = studentCode;
    params.operationSourceId = pageKind;
    params.operationId = actionType;
    params.courseId = courseId;
    params.courseName = courseName;
    params.topicName = topicName;
    params.topicId = topicId;
    params.facetNameLevel1Name = facetNameLevel1Name;
    params.facetNameLevel1Id = facetNameLevel1Id;
    params.facetNameLevel2Name = facetNameLevel2Name;
    params.facetNameLevel2Id = facetNameLevel2Id;
    params.fragmentId = fragmentId;
    params.jumpTargetType = jumpTargetType;
    params.jumpTargetUrl = jumpTargetUrl;
    switch(params.operationSourceId)
    {
        case "学习页面":
            params.operationSourceId=1;
            break;
        case "知识森林页面":
            params.operationSourceId=2;
            break;
        default:
            //未知
            params.operationSourceId=0;
    }
    switch(params.operationId)
    {
        case "点击-主题":
            params.operationId=1;
            break;
        case "点击-1级分面":
            params.operationId=2;
            break;
        case "点击-2级分面":
            params.operationId=3;
            break;
        case "点击-碎片":
            params.operationId=4;
            break;
        default:
            //未知
            params.operationId=0;
    }
    switch(params.jumpTargetType)
        {
            case "内部文件":
                params.jumpTargetType=1;
                break;
            case "内部视频":
                params.jumpTargetType=2;
                break;
            case "本系统链接":
                params.jumpTargetType=3;
                break;
            case "外部网页链接":
                params.jumpTargetType=4;
                break;
            default:
                //未知
                params.jumpTargetType=0;
        }
    // console.log(JSON.stringify(params))
    $.ajax({
        url: log_server_url + "/log/action",
        type: 'POST',
        dataType: 'text',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(params),
        success: function (data) {
            console.log(data);
        }
    });
}