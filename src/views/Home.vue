<template>
	<div class="home">
		<button class="button">
			<input
				class="upload-input"
				type="file"
				@change="onFileChange($event.target)"
			/>
			上传文件
		</button>

		<button @click="exportExcel" class="button">导出文件</button>

		<table>
			<tr v-for="(row, rowIndex) in data" :key="rowIndex">
				<template v-for="(cell, cellIndex) in row" :key="cellIndex">
					<td
						v-if="cellShow({ r: rowIndex, c: cellIndex })"
						:colspan="
							colspan(merges, { r: rowIndex, c: cellIndex })
						"
						:rowspan="
							rowspan(merges, { r: rowIndex, c: cellIndex })
						"
					>
						{{ cell }}
					</td>
				</template>
			</tr>
		</table>
	</div>
</template>

<script>
import XlsxPopulate from "xlsx-populate";
import { saveAs } from "file-saver";
import { reactive } from "@vue/reactivity";
import { colspan, rowspan, transformRange, cellVisible } from "@/utils";

import "./style.less";

export default {
	name: "Home",
	setup() {
		const data = reactive([
			["标题", "", ""],
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		]);

		const merges = reactive([
			{ s: { c: 1, r: 1 }, e: { c: 3, r: 1 } },
			{ s: { c: 3, r: 2 }, e: { c: 3, r: 4 } },
		]);

		const onFileChange = (file) => {
			XlsxPopulate.fromDataAsync(file.files[0]).then((workbook) => {
				const sheet = workbook.sheet(0);

				const result = [];

				sheet._rows.forEach((row) => {
					const cellValue = [];

					row._cells.forEach((cell) => {
						cellValue.push(cell.value());
					});

					result.push(cellValue);
				});

				const range = sheet.usedRange(); // 获取合并的单元格
				range._endCell.columnName(); // 获取列名

				return workbook.outputAsync({ type: "" });
			});
		};

		const exportExcel = () => {
			XlsxPopulate.fromBlankAsync()
				.then((workbook) => {
					const sheet = workbook.sheet(0);

					sheet
						.cell("A1")
						.value(data)
						.style("border", true)
						.style("fontSize", 18); // 设置样式

					sheet
						.cell("A1")
						.style("fill", {
							type: "pattern",
							pattern: "darkDown",
							foreground: "ff0000",
							background: {
								theme: 3,
								tint: 0.4,
							},
						})
						.style("horizontalAlignment", "center")
						.style("verticalAlignment", "center");
					// 设置样式

					const range = sheet.range("A1:C1"); //获取区间

					// range.merged(true); // 合并单元格
					transformRange(merges).forEach((val) => {
						sheet.range(val).merged(true);
					});

					// 获取区间的单元格
					range.cells().map((cell) => {
						return cell.map((val) => val.value());
					});

					sheet.cell("B1").style("fill", "ff33ff");
					sheet.cell("B2").style("fill", "9933ff");

					sheet.column("B").width(20); // 设置列宽

					data.forEach((val, index) => {
						sheet.row(index + 1).height(30); // 设置行高
					});

					// sheet
					//     .cell("A1")
					//     .value("bold")
					//     .style("bold", true)
					//     .relativeCell(1, 0)
					//     .value("italic")
					//     .style("italic", true)
					//     .relativeCell(1, 0)
					//     .value("underline")
					//     .style("underline", true);

					// return workbook.toFileAsync("./out.xlsx");
					return workbook.outputAsync({ type: "" });
				})
				.then((blob) => {
					saveAs(blob, "导出.xlsx");
				});
		};

		const cellShow = (current) => {
			return cellVisible(current, merges);
		};

		return {
			onFileChange,
			exportExcel,
			data,
			merges,
			colspan,
			rowspan,
			cellShow,
		};
	},
};
</script>
