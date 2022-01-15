export let count=100;
export let name="jack";
export let show=function () {
        console.log(count,name);
}
export let user={count,name};

let age=18;
let address="上海市黄浦区";
//暴露默认的对象 只能暴露一个对象
export default {
        age,
        address,
        stuShow(){
                console.log(address,age);
        }
}