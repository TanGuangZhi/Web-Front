//计算当天销售额
const db = wx.cloud.database()
const _ = db.command


const seven = db.collection('seven_day_sales')

class analysis{
	constructor() {}
	
	async sameday(time,sales_value){
		try{
			let query = await seven.where({time}).get()
			console.log(query)
			if(query.data.length == 0){
				await seven.add({data:{time,sales_value}})
			}else{
				let total_amount = Number(query.data[0].sales_value) + sales_value
				let final_data = parseFloat((total_amount).toFixed(10))
				await seven.doc(query.data[0]._id).update({data:{sales_value:final_data}})
			}
		}catch(e){
			//TODO handle the exception
			throw '出错'
		}
	}
}

export{analysis}
