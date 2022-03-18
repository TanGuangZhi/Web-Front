import React,{Component} from 'react';
//引入组件
import Inner from './Inner';
import SlotComp from './SlotComp';

export default class Wrapper extends Component {
    render() {
        return (
            <div>Wrapper <Inner
                msg="哈哈哈哈  我是来自Wrapper组件的数据"
                name="张三"
                obj={ {msg:'哈哈哈 对象里面的msg'} }
            />
                {/* <SlotComp>
                    <div>这里是插槽内容</div>
                    <div>这里是插槽内容</div>
                </SlotComp> */}
            </div>
        )
    }
}