<template>
	<div>
		<button class="button">
			<input
				class="upload-input"
				type="file"
				@change="onFileChange($event.target)"
			/>
			上传文件
		</button>
	</div>
</template>

<script>
import Excel from "exceljs/dist/exceljs.bare";

console.log(Excel);

function makeExcel() {
	var workbook = new Excel.Workbook(); //创建一个文件

	workbook.xlsx.readFile("./data.json").then((res) => {
		console.log(res);
	});

	// workbook.creator = "BertaData-API";
	// workbook.lastModifiedBy = "BertaData-API";
	// workbook.created = new Date();
	// workbook.modified = new Date();

	// var sheet = workbook.addWorksheet("预警名单"); //创建一个工作组
	// //创建列
	// sheet.columns = [
	// 	{ header: "用户名", key: "userName", width: 25 },
	// 	{ header: "方法名", key: "methodName", width: 25 },
	// 	{ header: "到期时间", key: "expiredDate", width: 25 },
	// ];
	// sheet.addRows(result); //创建行
	// var filename = "Api用户接口到期名单.xlsx";

	// workbook.xlsx.writeFile(filename).then(
	// 	function () {
	// 		console.log("success");
	// 	},
	// 	function (err) {
	// 		console.log(err);
	// 	}
	// );
}

makeExcel();
// [
// { userName: "阮垚", methodName: "getYear", expiredDate: "2099-12-31" },
// ]
export default {
	methods: {
		onFileChange(event) {
			console.log(event);
		},
	},
};
</script>

<style lang="less"></style>
