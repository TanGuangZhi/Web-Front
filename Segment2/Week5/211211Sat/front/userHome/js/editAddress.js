let addressInfoJson = [];

// 生成用户地址
let userAddressList = [];
function generUserAddress(params) {
    $.ajax({
        type: "get",
        url: "/end/userHome/queryAddress",
        dataType: "json",
        success: function (response) {
            let str = ``;
            let loginerAddress = JSON.parse(localStorage.getItem("loginerAddressList"));
            let addressCount = parseInt(Math.random() * 3) + 1;
            if (loginerAddress) {
                response = loginerAddress;
                addressCount = loginerAddress.length;
                loginerAddress.forEach((element, index) => {
                    str += ` <tr>
                    <td>
                        <label><input type="checkbox" data-index=${index} onclick="checkChildFlag(this.checked)" class="sel form-check-input mt-0"></label>
                    </td>
                    <th scope="row">${index + 1}</th>
                    <td>${element.province}</td>
                    <td>${element.city}</td>
                    <td>${element.zip}</td>
                    <td>${element.name}</td>
                    <td>${element.phone}</td>
                    <td> <button class="btn btn-primary changeAddressBtn" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight" data-index=${index} data-id=${element.id}>修改</button></td>
                    <td><button class="btn btn-warning delAddressBtn" onclick="delAddressBtn(this,${index})" data-index="${index}">删除</button> </td>
                </tr>`;
                });
                $("#showAddressBody").html(str);
                return;
            }

            

            for (let index = 0; index < addressCount; index++) {
                let randomIndex = parseInt(Math.random() * response.length);
                // let userAddress = {
                //     province: response[randomIndex].province,
                //     city: response[randomIndex].city,
                //     county: response[randomIndex].county,
                //     zip: response[randomIndex].zip,
                //     phone: response[randomIndex].phone,
                //     name: response[randomIndex].name,
                // };
                const element = response[randomIndex];
                str += ` <tr>
                        <td>
                            <label><input type="checkbox" data-index=${index} onclick="checkChildFlag(this.checked)" class="sel form-check-input mt-0"></label>
                        </td>
                        <th scope="row">${index + 1}</th>
                        <td>${element.province}</td>
                        <td>${element.city}</td>
                        <td>${element.zip}</td>
                        <td>${element.name}</td>
                        <td>${element.phone}</td>
                        <td> <button class="btn btn-primary changeAddressBtn" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight" data-index=${index} data-id=${element.id}>修改</button></td>
                        <td><button class="btn btn-warning delAddressBtn" onclick="delAddressBtn(this,${index})" data-index="${index}">删除</button> </td>
                    </tr>`;

                userAddressList.push(element);
            }
            $("#showAddressBody").html(str);
            localStorage.setItem("loginerAddressList", JSON.stringify(userAddressList));
        }

    });
}

generUserAddress();

// 添加按钮触发事件
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

    addressInfo.detailAddress = $('#detailAddress').val();

    userAddressList.push(addressInfo);
    localStorage.setItem("loginerAddressList", JSON.stringify(userAddressList));
    generUserAddress();
    disabledBtnInit();

});

// 删除地址
function delAddressBtn(params, index) {
    $(params).parent().parent().remove();
    userAddressList.splice(index, 1);
    localStorage.setItem("loginerAddressList", JSON.stringify(userAddressList));
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

// ================查询地址================
// function queryAddress() {
//     let str = ``;
//     addressInfoJson.forEach((element, index) => {
//         str += ` <tr>
//                         <td>
//                             <label><input type="checkbox" data-index=${index} onclick="checkChildFlag(this.checked)" class="sel form-check-input mt-0"></label>
//                         </td>
//                         <th scope="row">${element.id}</th>
//                         <td>${element.address}</td>
//                         <td>${element.detailAddress}</td>
//                         <td>${element.zipCode}</td>
//                         <td>${element.consignee}</td>
//                         <td>${element.phone}</td>
//                         <td> <button class="btn btn-primary changeAddressBtn" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
//                         aria-controls="offcanvasRight" data-index=${index} data-id=${element.id}>修改</button></td>
//                         <td><button class="btn btn-warning delAddressBtn" data-index="${index}">删除</button> </td>
//                     </tr>`;
//     });
//     $("#showAddressBody").html(str);

//     // 修改地址
//     $('tbody .changeAddressBtn').on("click", function () {
//         // alert('此为Vip独享功能,请先开通Vip');
//     });

//     // 删除地址
//     $('tbody .delAddressBtn').on("click", function () {
//         addressInfoJson.splice($(this).attr("data-index"), 1);
//         queryAddress();
//         disabledBtnInit();
//     });

//     // 上移下移行
//     $('.upMove').on("click", function () {
//         let nowTr = $(this).parent().parent();
//         let prevTr = nowTr.prev();
//         prevTr.before(nowTr);
//         disabledBtnInit();
//     });

//     $('.downMove').on("click", function () {
//         let nowTr = $(this).parent().parent();
//         let nextTr = nowTr.next();
//         nowTr.before(nextTr);
//         disabledBtnInit();
//     });

// }


function addressMain() {
    getProvince();
    // queryAddress();
    disabledBtnInit();

}

addressMain();
