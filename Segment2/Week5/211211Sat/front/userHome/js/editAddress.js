let addressInfoJson = [];

// 生成用户地址
let userAddressList = [];
let temp;
function queryUserAddress(params) {
    let userInfo = JSON.parse(localStorage.getItem("loginUserInfo"));
    let userId = userInfo.userId;
    $.ajax({
        type: "post",
        url: "/end/userHome/queryAddress",
        data: { userId: userId },
        dataType: "json",
        success: function (response) {
            try {
                let str = ``;
                temp = response;
                userAddressList = response.userAddressList;
                userAddressList.forEach((element, index) => {
                    // 地址拼接
                    let addressDetailInfo = `${element.province}${element.city}${element.county}`;
                    str += ` <tr>
                    <td>
                        <label><input type="checkbox" data-index=${index} onclick="checkChildFlag(this.checked)" class="sel form-check-input mt-0"></label>
                    </td>
                    <th scope="row">${index + 1}</th>
                    <td>${addressDetailInfo}</td>
                    <td>${element.zip}</td>
                    <td>${element.name}</td>
                    <td>${element.phone}</td>
                    <td> <button class="btn btn-primary changeAddressBtn" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight" data-index=${index} data-id="">修改</button></td>
                    <td><button class="btn btn-warning delAddressBtn" onclick="delAddressBtn(this,${index})" data-index="${index}">删除</button> </td>
                </tr>`;
                });
                $("#showAddressBody").html(str);
            } catch (error) {

            }

        }
    });
}

// 添加地址按钮触发事件
$(" [data-bs-target='#addAddreModal']").click(function (e) {
    clearPrevAddressInput();
});

// 添加模态框内添加按钮触发事件
$('#addAddreModal #addAddressBtn').click(function (e) {
    // allRegCheckAddAddressList[3] = check3LevelAddress();
    let addressInfo = {};
    let province = $('[name="province"]').val();
    let city = $('[name="city"]').val();
    let district = $('[name="district"]').val();
    addressInfo.name = $('[name="consignee"]').val();
    addressInfo.phone = $('[name="phone"]').val();
    addressInfo.zip = $('[name="zipCode"]').val();

    addressInfo.province = $('[name="province"]').val();
    addressInfo.city = $('[name="city"]').val();
    addressInfo.county = $('[name="district"]').val();

    userAddressList.push(addressInfo);
    temp.userAddressList = userAddressList;
    localStorage.setItem("userAddressList", JSON.stringify(temp));
    queryUserAddress();
});

// 删除地址
function delAddressBtn(params, index) {
    // $(params).parent().parent().remove();
    userAddressList.splice(index, 1);
    temp.userAddressList = userAddressList;
    localStorage.setItem("userAddressList", JSON.stringify(temp));
    queryUserAddress();
}

function clearPrevAddressInput() {
    $('[name="consignee"]').val("");
    $('[name="phone"]').val("");
    $('[name="zipCode"]').val("");
    $('[name="province"]').val("");
    $('[name="city"]').val("");
    $('[name="district"]').val("");
    $('#detailAddress').val("");
    $("#addAddreModal form span").html("*");
    $("#addAddreModal form span").css("color", "");

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


function addressMain() {
    getProvince();
    queryUserAddress();
}

addressMain();
