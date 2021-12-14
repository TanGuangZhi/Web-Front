let addressInfoJson = [{
    "id": 1,
    "address": "上海市浦东新区",
    "detailAddress": "张东路2281弄xxxx号",
    "zipCode": 1111,
    "consignee": "jack",
    "phone": 18110739061,
}, {
    "id": 2,
    "address": "上海市浦东新区",
    "detailAddress": "王西路1188弄xxxx号",
    "zipCode": 1112,
    "consignee": "mary",
    "phone": 18110736666,
}]

let allRegCheckAddAddressList = [false];

// 添加按钮触发事件
$(" [data-bs-target='#addAddreModal']").click(function (e) {
    clearPrevAddressInput();
});

// 添加地址模态框正则检测
$("#addAddreModal form input").eq(0).on("keyup focus blur", function () {
    checkAddAddress(0);
})
$("#addAddreModal form input").eq(1).on("keyup focus blur", function () {
    checkAddAddress(1);
})
$("#addAddreModal form input").eq(2).on("keyup focus blur", function () {
    checkAddAddress(2);
})
$("#detailAddress").on("keyup focus blur", function () {
    checkAddAddress(4);
})

function check3LevelAddressAndDetail(params) {
    // let flag = [...$("#addAddreModal select")].some(value=>value.val().include("请选择"));
    let flag = true;
    $("#addAddreModal select").each(function (index, element) {
        if ($(this).val() === "") {
            $("#detailAddress").next().html("请检查地址填写");
            $("#detailAddress").next().css("color", "red");
            return flag = false;
        }
    })
    if ($("#detailAddress").val() === "") {
        $("#detailAddress").next().html("请检查地址填写");
        $("#detailAddress").next().css("color", "red");
        return flag = false;
    }

    return flag;
    // console.log(flag);
}

function checkIsCanAddAddress() {
    let flag1 = true;
    for (let index = 0; index < 3; index++) {
        const element = allRegCheckAddAddressList[index];
        if (!element) {
            flag1 = false;
            break;
        }
    }
    let flag2 = check3LevelAddressAndDetail();
    if (!flag1 || !flag2) {
        // 提示用户哪里没通过
        for (let index = 0; index < 3; index++) {
            checkAddAddress(index);
        }
        return false;
    }
    return true;
}

// 添加模态框内添加按钮触发事件
$('#addAddreModal #addAddressBtn').click(function (e) {
    // allRegCheckAddAddressList[3] = check3LevelAddress();
    if (!checkIsCanAddAddress()) return;
    let addressInfo = {};
    let province = $('[name="province"]').val();
    let city = $('[name="city"]').val();
    let district = $('[name="district"]').val();
    addressInfo.id = addressInfoJson.length + 1;
    let temp = $('[name="consignee"]');
    addressInfo.consignee = $('[name="consignee"]').val();
    addressInfo.phone = $('[name="phone"]').val();
    addressInfo.zipCode = $('[name="zipCode"]').val();
    addressInfo.address = province + "省" + city + "市" + district + "区\县"

    addressInfo.detailAddress = $('#detailAddress').val();

    addressInfoJson.push(addressInfo);
    queryAddress();
    disabledBtnInit();

});

function clearPrevAddressInput() {
    $('[name="consignee"]').val("");
    $('[name="phone"]').val("");
    $('[name="zipCode"]').val("");
    $('[name="province"]').val("");
    $('[name="city"]').val("");
    $('[name="district"]').val("");
    $('#detailAddress').val("");
    $("#addAddreModal form span").html("*");
    $("#addAddreModal form span").css("color","");

}

// 用户注册-地址三级联动组
let provinceDom = document.querySelector(".province");
let cityDom = document.querySelector(".city");
let districtDom = document.querySelector(".district");

function getProvince() {
    let provinceArr = [];
    let provinceTempStr = '<option value="">请选择省份</option>';

    for (let i = 0; i < cityData.length; i++) {
        if (provinceArr.indexOf(cityData[i].province) === -1) {
            provinceArr.push(cityData[i].province);
            provinceTempStr += `<option value=${cityData[i].province}>${cityData[i].province}</option>`;
        }
    }

    provinceDom.innerHTML = provinceTempStr;

}

function getCity() {
    // 清空县级数据,防止干扰界面
    districtDom.innerHTML = `<option value="">请选择县/区</option>`;
    let cityArray = [];
    for (let i = 0; i < cityData.length; i++) {
        //1.找到对应省份的市，并且将城市去重
        if (provinceDom.value === cityData[i].province && cityArray.indexOf(cityData[i].city) === -1) {
            cityArray.push(cityData[i].city);
        }
    }
    //2.将去重之后的城市全部放入对应的option中
    let cityStr = `<option value="">请选择城市</option>`;
    for (let city of cityArray) {
        cityStr += ` <option value="${city}">${city}</option>`;
    }
    cityDom.innerHTML = cityStr;
}

function getDistrict() {
    let districtStr = `<option value="">请选择县/区</option>`;
    for (let i = 0; i < cityData.length; i++) {
        if (cityDom.value === cityData[i].city) {
            districtStr += `<option value="${cityData[i].district}">${cityData[i].district}</option>`;
        }
    }
    districtDom.innerHTML = districtStr;
}

// function getDetailAddress() {
//     let detailAddrDom = document.querySelector("#detailAddress");

//     detailAddrDom.innerHTML = `中国${provinceDom.value}${cityDom.value}${districtDom.value}`;
// }


// 全选全消
function selAll(flag) {
    $('.sel').prop("checked", flag);
}

function checkChildFlag() {
    let flag = true;
    $('.sel').each(function () {
        if (!$(this).prop("checked")) {
            return flag = false;
        }
    })
    $('#all-id').prop("checked", flag);
}

// 上移下移特殊行置灰
function disabledBtnInit() {
    $('tbody tr .upMove,.downMove').prop("disabled", false);
    $('tbody tr .upMove').first().prop("disabled", true);
    $('tbody tr .downMove').last().prop("disabled", true);
}

// ================查询地址================
function queryAddress() {
    let str = ``;
    addressInfoJson.forEach((element, index) => {
        str += ` <tr>
                        <td>
                            <label><input type="checkbox" data-index=${index} onclick="checkChildFlag(this.checked)" class="sel form-check-input mt-0"></label>
                        </td>
                        <th scope="row">${element.id}</th>
                        <td>${element.address}</td>
                        <td>${element.detailAddress}</td>
                        <td>${element.zipCode}</td>
                        <td>${element.consignee}</td>
                        <td>${element.phone}</td>
                        <td> <button class="btn btn-primary changeAddressBtn" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight" data-index=${index} data-id=${element.id}>修改</button></td>
                        <td><button class="btn btn-warning delAddressBtn" data-index="${index}">删除</button> </td>
                        <td><button class="btn btn-light upMove" >上移</button>
                            <button class="btn btn-light downMove" >下移</button>
                            </td>
                    </tr>`;
    });
    $("#showAddressBody").html(str);

    // 修改地址
    $('tbody .changeAddressBtn').on("click", function () {
        // alert('此为Vip独享功能,请先开通Vip');
    });

    // 删除地址
    $('tbody .delAddressBtn').on("click", function () {
        addressInfoJson.splice($(this).attr("data-index"), 1);
        queryAddress();
        disabledBtnInit();
    });

    // 上移下移行
    $('.upMove').on("click", function () {
        let nowTr = $(this).parent().parent();
        let prevTr = nowTr.prev();
        prevTr.before(nowTr);
        disabledBtnInit();
    });

    $('.downMove').on("click", function () {
        let nowTr = $(this).parent().parent();
        let nextTr = nowTr.next();
        nowTr.before(nextTr);
        disabledBtnInit();
    });

}


function addressMain() {
    getProvince();
    queryAddress();
    disabledBtnInit();

}

addressMain();
