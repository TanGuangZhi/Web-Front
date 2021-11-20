let questionList = [{
    title: "语义化标签的作用是",
    index: 1,
    choose: {
        A: "网页结构层次更清晰",
        B: "更容器被搜索引擎收录",
        C: "更容易让屏幕阅读器独处网页内容",
        D: "网页代码更美观"
    }
}, {
    title: "用于播放HTML5音频文件的正确HTML5元素是",
    index: 2,
    choose: {
        A: " <movie>",
        B: "<media>",
        C: "<video>",
        D: "<audio>"
    }
}, {
    title: "__标签用于指定内联框架（即行内框架）",
    index: 3,
    choose: {
        A: "<iframe>",
        B: " <hrameset>",
        C: "<iframer>",
        D: "<frame>"
    }
}, {
    title: "下列的HTML中哪个可以产生超链接",
    index: 4,
    choose: {
        A: "<a url=”网页”>网页名称</a>",
        B: "<a>网页</a>",
        C: "<a href=”网页”>网页名称</a>",
        D: "<a>网页</a>"
    }
}, {
    title: "请选择产生粗体字的HTML标签",
    index: 5,
    choose: {
        A: " <bb>",
        B: " <b>",
        C: "<bld>",
        D: "<bold>"
    }
}]

let index = 0;

function preQueClick(params) {
    if (index > 0) {
        index--;
        getQuestionTitle(index);
        getRandomQuestionSort(index);
    }
}

function nextQueClick(params) {
    if (index < questionList.length - 1) {
        index++;
        getQuestionTitle(index);
        getRandomQuestionSort(index);
    }
}

function getQuestionTitle(index) {
    window.document.getElementById("questionTitle").innerText = questionList[index].index + ". " + questionList[index].title;
}

function getRandomQuestionSort(index) {
    let inputQuestionList = window.document.getElementsByClassName("form-control");
    let chooseList = questionList[index].choose;
    chooseList = Object.values(chooseList);
    // 随机排序选项
    chooseList.sort((a, b) => Math.random() - 0.5);
    chooseList.forEach((element, index) => {
        inputQuestionList[index].value = element;
    });
}