<template>
	<div>
		<div id="main"></div>
	</div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-gl";
import coordinates from "./data.json";

export default {
	mounted() {
		const chartDom = document.getElementById("main");
		const myChart = echarts.init(chartDom);

		// const ROOT_PATH =
		// 	"https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples";

		echarts.registerMap("buildings", coordinates);
		const regions = coordinates.features.map(function (feature) {
			return {
				name: feature.properties.name,
				value: 0.1,
				height: 4,
			};
		});
		console.log(regions);
		let area = "";
		myChart.setOption({
			tooltip: {
				trigger: "item",
				textAlign: "left",
			},
			series: [
				{
					name: "余杭区",
					type: "map3D",
					map: "buildings",
					shading: "realistic",
					realisticMaterial: {
						roughness: 0.6,
						textureTiling: 20,
						// detailTexture: ROOT_PATH + "/data-gl/asset/woods.jpg",
					},

					environment: "#ffffff", //

					postEffect: {
						enable: true,
						bloom: {
							enable: false,
						},
						SSAO: {
							enable: true,
							quality: "medium",
							radius: 10,
							intensity: 1.2,
						},
						depthOfField: {
							enable: false,
							focalRange: 5,
							fstop: 1,
							blurRadius: 6,
						},
					},
					groundPlane: {
						show: false,
						color: "#000",
					},
					light: {
						main: {
							intensity: 6,
							shadow: true,
							shadowQuality: "high",
							alpha: 30,
						},
						ambient: {
							intensity: 0,
						},
						// ambientCubemap: {
						// 	texture: ROOT_PATH + "/data-gl/asset/canyon.hdr",
						// 	exposure: 2,
						// 	diffuseIntensity: 1,
						// 	specularIntensity: 1,
						// },
					},
					viewControl: {
						minBeta: -180,
						maxBeta: 180,
						autoRotate: false,
						center: [0, -15, 0],
						rotateSensitivity: 0, // 0 无法旋转
					},
					itemStyle: {
						color: "#0000ff",
						borderWidth: 2,
						borderColor: "#FFFFFF",
					},
					label: {
						textStyle: {
							color: "#FFF",
						},
						show: true,
					},
					emphasis: {
						label: {
							show: true,
							formatter: function (params) {
								area = params.name;
								return params.name;
							},
						},
						itemStyle: {
							color: "#6600cc",
						},
					},
					// silent: true,
					instancing: true,
					boxWidth: 90,
					boxHeight: 1,
					data: regions,
				},
			],
		});
		myChart.getZr().on("click", function (params) {
			console.log(params, area);
		});
	},
};
</script>

<style>
#main {
	height: 700px;
	height: 800px;
}
</style>
