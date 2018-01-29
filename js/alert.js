
//自定义警告框

function Alert(message){
	//展示的提示信息
	this.message=message;
	var cunstomAlert = new Alert('弹弹更开心！')
	alert('弹弹弹，弹走悲伤和寂寞');
	
}


//在原型中添加方法

//创建最外层的 透明灰色背景
Alert.prototype.showMask=function(){
	//弹出警告框的时候禁止使用
	document.documentElement.style.overflow='hidden';
	//添加一个遮罩层
	var = document.createElement('div');
	mak.className=
	document.body.appendChild(mask);
	
}





//展示警告框的方法
Alert.prototype.show=function(){
	
	this.showMask();
	
}

































