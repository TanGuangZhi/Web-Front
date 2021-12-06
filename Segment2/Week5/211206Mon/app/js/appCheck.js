let checkList = [{
    id: "1",
    name: "王者荣耀1",
    size: "10M",
    type: "办公",
    img: "",
    checkStatus: "待审核",
}, {
    id: "2",
    name: "王者荣耀2",
    size: "11M",
    type: "娱乐",
    img: "",
    checkStatus: "待审核",
}, {
    id: "21",
    name: "王者荣耀21",
    size: "11M",
    type: "娱乐",
    img: "",
    checkStatus: "待审核",
}, {
    id: "3",
    name: "王者荣耀3",
    size: "10M",
    type: "娱乐",
    img: "",
    checkStatus: "审核中",
}, {
    id: "31",
    name: "王者荣耀31",
    size: "10M",
    type: "学习",
    img: "",
    checkStatus: "审核中",
}]

function queryByRules(name, type, checkStatus) {
    if (type === "全部" && checkStatus === "全部") {
        query();
        return;
    }

    let str = ``;
    checkList.forEach(element => {
        // 使用indexof实现名字模糊查询
        let nameTemp = element.name.indexOf(name)!=-1  || !name;
        // 此处逻辑:如果已有数组中类型等于界面输入,OK
        // 或者界面输入的是空字符串,代表查询全部,则也OK
        let typeTemp = element.type == type || !type;
        let statusTemp = element.checkStatus == checkStatus || !checkStatus;
        if (nameTemp && typeTemp && statusTemp) {
            str += `
            <tr>
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td>${element.size}</td>
                <td>${element.type}</td>
                <td>
                    <img src="../images/2-110R2093034L7.png"  >
                </td>

                <td>
                ${element.checkStatus}
                </td>
                <td>
                    <button class="btn btn-success">
                        <span class="glyphicon glyphicon-search"></span>确认通过
                    </button>
                </td>

            </tr>
        </table>
`
        }

    });
    // $('tbody').html(str);
    document.querySelector("#tbody").innerHTML = str;
}

// 搜索方法绑定事件

$("#searchBtn").click(function (e) {
    // 获取限制条件
    let name = $('#softName').val();
    let type = $('#selectType').val();
    let checkStatus = $('#checkStatus').val();
    // console.log(`${type}`);
    // console.log(`${checkStatus}`);

    queryByRules(name, type, checkStatus);
});

function getAllTypes(params) {
    let typeArr = [];
    let str = `<option  value="">全部</option>`;
    checkList.forEach(element => {
        if (typeArr.indexOf(element.type) === -1) {
            typeArr.push(element.type);
            str += `<option>${element.type}</option>`;
        }
    });
    $("#selectType").html(str);
    // return typeArr;
}

function getAllStatus(params) {
    let statusArr = [];
    let str = `<option  value="">全部</option>`;
    checkList.forEach(element => {
        if (statusArr.indexOf(element.checkStatus) === -1) {
            statusArr.push(element.checkStatus);
            str += `<option>${element.checkStatus}</option>`;
        }
    });
    $("#checkStatus").html(str);
    // return statusArr;
}

// query();
queryByRules();
getAllTypes();
getAllStatus();