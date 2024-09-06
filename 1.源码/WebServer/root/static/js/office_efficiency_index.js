var g_custType="1";
var g_dataDate=""
var g_channelInfo={};
var g_channelCode="";
var g_channelName="";

function channelReportContent(rePortData){}

//WebServer并发性能测试结果分析(门店受理详情)
function loadChannelHandleDetail(data){
	var option = {
		    tooltip: {trigger: 'axis',axisPointer: {lineStyle: {color: '#fff'}}},
		    legend: {
		        icon: 'rect',
		        itemWidth: 30,itemHeight: 10,itemGap:10,
		        data: ['速度(pages/min)', '传输量(bytes/sec)', '请求量(个)','QPS'],
		        right: '10px',top: '0px',
		        textStyle: {fontSize: 12,color: '#fff'}
		    },
		    grid: {x:30,y:30,x2:50,y2:50},
		    xAxis: [{
		        type: 'category',boundaryGap: false,axisLine: {lineStyle: {color: '#57617B'}},axisLabel: {textStyle: {color:'#fff'}},
		        data: data.dataDateArr
		    }],
		    yAxis: [{
		        type: 'value',
		        axisTick: {
		            show: false
		        },
		        axisLine: {lineStyle: {color: '#57617B'}},
		        axisLabel: {margin: 0,textStyle: {fontSize: 12},textStyle: {color:'#fff'},formatter:'{value}',show:false},
		        splitLine: {lineStyle: {color: '#57617B'}}
		    },{
		        type: 'value',
		        axisTick: {
		            show: false
		        },
		        axisLine: {lineStyle: {color: '#57617B'}},
		        axisLabel: {margin: 10,textStyle: {fontSize: 12},textStyle: {color:'#fff'},formatter:'{value}',show:false},
		        splitLine: {show: false,lineStyle: {color: '#57617B'}}
		    }],
		    series: [{
		        name: '速度(pages/min)',type: 'line',smooth: true,lineStyle: {normal: {width: 2}},
		        yAxisIndex:0,
		        areaStyle: {
		            normal: {
		                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                    offset: 0,
		                    color: 'rgba(185,150,248,0.3)'
		                }, {
		                    offset: 0.8,
		                    color: 'rgba(185,150,248,0)'
		                }], false),
		                shadowColor: 'rgba(0, 0, 0, 0.1)',
		                shadowBlur: 10
		            }
		        },
		        itemStyle: {normal: { color: '#B996F8'}},
		        data: data.handleTimeData

		    }, {
		        name: '传输量(bytes/sec)',type: 'line',smooth: true,lineStyle: { normal: {width: 2}},
		        yAxisIndex:0,
		        areaStyle: {
		            normal: {
		                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                    offset: 0,
		                    color: 'rgba(3, 194, 236, 0.3)'
		                }, {
		                    offset: 0.8,
		                    color: 'rgba(3, 194, 236, 0)'
		                }], false),
		                shadowColor: 'rgba(0, 0, 0, 0.1)',
		                shadowBlur: 10
		            }
		        },
		        itemStyle: {normal: {color: '#03C2EC'}},
		        data: data.lineUpData
		    }, {
		        name: '请求量(个)',type: 'line',smooth: true,lineStyle: {normal: {width: 2}},
		        yAxisIndex:1,
		        areaStyle: {
		            normal: {
		                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                    offset: 0,
		                    color: 'rgba(218, 57, 20, 0.3)'
		                }, {
		                    offset: 0.8,
		                    color: 'rgba(218, 57, 20, 0)'
		                }], false),
		                shadowColor: 'rgba(0, 0, 0, 0.1)',
		                shadowBlur: 10
		            }
		        },
		        itemStyle: {normal: {color: '#DA3914'}},
		        data: data.orderNumData
		    },{
		        name: 'QPS',type: 'line',smooth: true,lineStyle: {normal: {width: 2}},
		        yAxisIndex:1,
		        areaStyle: {
		            normal: {
		                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                    offset: 0,
		                    color: 'rgba(232, 190, 49, 0.3)'
		                }, {
		                    offset: 0.8,
		                    color: 'rgba(232, 190, 49, 0)'
		                }], false),
		                shadowColor: 'rgba(0, 0, 0, 0.1)',
		                shadowBlur: 10
		            }
		        },
		        itemStyle: {normal: {color: '#E8BE31'}},
		        data:data.custNumData
		    }
		]
		    
		    
	};
	var myChart = echarts.init(document.getElementById('channel_handle_detail'));
	myChart.clear();
	if(data.handleTimeData.length>0){
		myChart.setOption(option);
	}else{
		noDataTip($("#channel_handle_detail"));
	}
}

//WebServer并发性能测试结果分析加载(加载营业员受理详情)
function loadStaffHandleDetail(data){
	var staffWgInfo=data.staffWgInfo;
	var channelJfMap=data.channelJfMap;
	var channelStaffLen=data.channelStaffLen;
	var staffHandleInfo=data.staffHandleInfo || [],staffHandleInfoLen=staffHandleInfo.length;
	var html=[],index=0;
	for(var key in staffHandleInfo){
		var itemArr=staffHandleInfo[key];
		index++;
		var indexClass=(1==index)?"first":"";
		var wgCount=staffWgInfo[itemArr[0].staffCode] || "0";
		var tr1=[
			'<tr class="td-avg-time">',
			'<td colspan="3">',
					'<div class="index '+indexClass+'">'+itemArr[0].index+'</div>',
					'<div class="staff-name">'+itemArr[0].staffName+'</div>',
					'<div class="avg-time-label">|&nbsp;&nbsp;性能排名：</div>',
					'<div class="avg-time-value">&nbsp;&nbsp;&nbsp;&nbsp;'+itemArr[0].index+'/'+channelStaffLen+'</div>',
				'</td>',
			'</tr>',
			'<tr>',
				'<td> ',
					'<div class="staff-cust-time">',
					   '<span style="font-size:15px;">平均速度</span><br/><span style="color:#00A8FE;font-size:18px;font-weight:600;">'+itemArr[0].avgTime+'</span>',
					'</div>',
				'</td>',
				'<td>',
					'<div class="staff-order-count">',
					    '<span style="font-size:15px;">最大并发量</span><br/><span style="color:#00A8FE;font-size:18px;font-weight:600;">'+itemArr[0].orderNum+'</span>',
					'</div>',
				'</td>',
				'<td>',
					'<div class="staff-alarm">',
					   '<span style="font-size:15px;">平均QPS</span><br/><span style="color:#00A8FE;font-size:18px;font-weight:600;">'+wgCount+'</span>',
					'</div>',
			    '</td>',
			'</tr> ',
			'<tr class="td-integral"> ',
				'<td colspan="3"> ',
				'<div class="integral-label">平均传输量：</div> ',
				'<div class="integral-value">'+(channelJfMap[itemArr[0].staffCode+'_charge'])+'</div> ',
				'<div class="integral-label" style="width:60px;">平均CPU占用率：</div>',
				'<div class="integral-value">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+(channelJfMap[itemArr[0].staffCode+'_charge2'] || 0)+'%'+'</div> ',
				'</td> ',
			'</tr> ',
		];
		var tr2=[];
		if(itemArr.length>1){
			index++;
			var indexClass=(2==index)?"second":"";
			var wgCount=staffWgInfo[itemArr[1].staffCode] || "0";
			tr2=[
				'<tr><td colspan="3"><div class="split-line"></div></td></tr>',
				'<tr class="td-avg-time"> ',
						'<td colspan="3"> ',
							'<div class="index '+indexClass+'">'+itemArr[1].index+'</div>',
							'<div class="staff-name">'+itemArr[1].staffName+'</div>',
							'<div class="avg-time-label">|&nbsp;&nbsp;性能排名：</div>',
							'<div class="avg-time-value">&nbsp;&nbsp;&nbsp;&nbsp;'+itemArr[1].index+'|'+channelStaffLen+'</div>',
						'</td>',
				'</tr>',
				'<tr>',
						'<td> ',
							'<div class="staff-cust-time">',
							   '<span style="font-size:15px;">平均速度</span><br/><span style="color:#00A8FE;font-size:18px;font-weight:600;">'+itemArr[1].avgTime+'</span>',
							'</div>',
						'</td>',
						'<td>',
							'<div class="staff-order-count">',
							    '<span style="font-size:15px;">最大并发量</span><br/><span style="color:#00A8FE;font-size:18px;font-weight:600;">'+itemArr[1].orderNum+'</span>',
							'</div>',
						'</td>',
						'<td>',
							'<div class="staff-alarm">',
							   '<span style="font-size:15px;">QPS</span><br/><span style="color:#00A8FE;font-size:18px;font-weight:600;">'+wgCount+'</span>',
							'</div>',
					    '</td>',
				'</tr> ',
				'<tr class="td-integral"> ',
					'<td colspan="3"> ',
					'<div class="integral-label">平均传输量：</div> ',
					'<div class="integral-value">'+(channelJfMap[itemArr[1].staffCode+'_charge'] || 0)+'</div> ',
					'<div class="integral-label" style="width:60px;">平均CPU占用率：</div>',
					'<div class="integral-value">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+(channelJfMap[itemArr[1].staffCode+'_charge2'] || 0)+'%'+'</div> ',
					'</td> ',
			   '</tr> ',
			]
		}
		var staffHtml=[
            '<div class="swiper-slide">',
                '<table>',
	                tr1.join(""),
	                tr2.join(""),
			    '</table>',
            '</div> '
		];
		html.push(staffHtml.join(""));
	}
	$("#staff-info").html("");
	if(html.length>0){
		var dataHtml="<div class='swiper-container visual_swiper_staffInfo'><div class='swiper-wrapper'>"+html.join("")+"</div>"
		$("#staff-info").html(dataHtml);
		var mySwiper1 = new Swiper('.visual_swiper_staffInfo', {
			autoplay: true,//可选选项，自动滑动
			speed:1500,//可选选项，滑动速度
			autoplay: {
			    delay: 15000,//毫秒
			} 
		});
	}else{
		noDataTip($("#staff-info"));
	}
}

//KV存储引擎测试结果分析(加载耗时步骤详情)
function loadTimeStepDetail(data){
	var option = {
		    tooltip: {trigger: 'axis',},
		    grid: {left:'6%',right: '5%',bottom:'10%'},
		    legend: {
		    	icon: 'rect',
		        itemWidth: 14,itemHeight: 5,itemGap:10,
		        data:data.legendArr,
		        left: '10px',top: '0px',
		        textStyle: {fontSize: 12,color: '#fff'}
		    },
		    xAxis: [
		        {
		            type: 'category',
		            axisLine: {lineStyle: {color: '#57617B'}},axisLabel: {interval:0,textStyle: {color:'#fff',}},
		            data:data.categoryArr
		        }
		    ],
		    yAxis: [{
        		type: 'value',
 		        axisTick: {
 		            show: false
 		        },
 		        axisLine: {lineStyle: {color: '#57617B'}},
 		        axisLabel: {margin: 10,textStyle: {fontSize: 12},textStyle: {color:'#fff'},formatter:'{value}秒'},
 		        splitLine: {
 	                show: true,
 	                lineStyle:{
 	                    type:'dashed',
 	                    color: ['#25CEF3']
 	                }
 	            }

		     }],
		    series: [
		        {
		            name:'10W数据量',
		            type:'bar',
		            barWidth:8,
		            itemStyle : { 
		            	normal: {
				        	barBorderRadius:[10, 10, 0, 0],
				            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
				                offset: 0,
				                color: "#009AFD"
				            }, {
				                offset: 0.8,
				                color: "#33DAFF" 
				            }], false),
				            shadowColor: 'rgba(0, 0, 0, 0.1)',
				        }
		            },
		            data:data.channelTime
		        },
		        {
		            name:'50W数据量',
		            type:'bar',
		            barWidth:8,
		            barGap:2,
		            itemStyle : { 
		            	normal: {
				        	barBorderRadius:[10, 10, 0, 0],
				            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
				                offset: 0,
				                color: "#E57230"
				            }, {
				                offset: 0.8,
				                color: "#D8AE22" 
				            }], false),
				            shadowColor: 'rgba(0, 0, 0, 0.1)',
				        }
		            },
		            data:data.provinceTime
		        },
				{
		            name:'100W数据量',
		            type:'bar',
		            barWidth:8,
		            barGap:2,
		            itemStyle : { 
		            	normal: {
				        	barBorderRadius:[10, 10, 0, 0],
				            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
				                offset: 0,
				                color: "#00CD00"
				            }, {
				                offset: 0.8,
				                color: "#00CD00" 
				            }], false),
				            shadowColor: 'rgba(0, 0, 0, 0.1)',
				        }
		            },
		            data:data.provinceTime2
		        }
		    ]
	};
	var myChart = echarts.init(document.getElementById('time-step-detial'));
	myChart.clear();
	if(data.channelTime.length>0){
		myChart.setOption(option);
	}else{
		noDataTip($("#time-step-detial"));
	}
	
}

//KV存储引擎测试性能分析(加载业务类型耗时详情)
function loadBusinessTypeTimeDetail(data){
	var maxOrder=Math.max.apply(null,data.orderNum);
	var option = {
			title : {text:'',subtext:'',top:'3',right:'0'},
            tooltip: {trigger: 'axis'},
            grid: {left: '8%',right: '8%',bottom: '10%'},
			legend: {
		    	icon: 'rect',
		        itemWidth: 14,itemHeight: 5,itemGap:10,
		        data:data.legendArr,
		        left: '10px',top: '0px',
		        textStyle: {fontSize: 12,color: '#fff'}
		    },
            xAxis: {type: 'category',axisLine: {lineStyle: {color: '#57617B'}},axisLabel: {interval:0,textStyle: {color:'#fff',}},data: data.categoryArr},
            yAxis:[
       	        {
       	          type: 'value',name: '',
       	          axisLine: {lineStyle: {color: '#57617B'}},
  		          axisLabel: {margin: 10,textStyle: {fontSize: 12},textStyle: {color:'#fff'},formatter:'{value}秒'},
	  		      splitLine: {show: false}	
       	        },
    	        {
       	          type: 'value',name: '',max:maxOrder+parseInt(maxOrder*0.2),
 		          axisLabel: {margin: 0,textStyle: {fontSize: 12},textStyle: {color:'#fff'},formatter:'{value}',show:false},
 		          splitLine: {
	  	                show: true,
	  	                lineStyle:{
	  	                    type:'dashed',
	  	                    color: ['#25CEF3']
	  	                }
	  	          }	
    	        }
    		],
            series: [
   		        {
		            name:'耗时时长',
		            type:'line',
		            yAxisIndex:0,
		            smooth: true,
		            symbolSize:7,
		            lineStyle: { normal: {width: 2}},
		            areaStyle: {
			            normal: {
			                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
			                    offset: 0,
			                    color: 'rgba(230, 48, 123, 0.8)'
			                }, {
			                    offset: 0.8,
			                    color: 'rgba(230, 48, 123, 0)'
			                }], false),
			                shadowColor: 'rgba(0, 0, 0, 0.1)',
			                shadowBlur: 10
			            }
			        },
			        itemStyle: {normal: { color: '#DA2F78'}},
		            data:data.avgTime
		        },
		        {
		            name:'QPS',
		            type:'bar',
		            barWidth:12,
		            yAxisIndex:1,
		            itemStyle : { 
				        normal: {
				        	barBorderRadius:[10, 10, 0, 0],
				            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
				                offset: 0,
				                color: "#4033F9"
				            }, {
				                offset: 0.8,
				                color: "#BA97F9" 
				            }], false),
				            shadowColor: 'rgba(0, 0, 0, 0.1)',
				        }
		            },
		            data:data.orderNum
		        }
          ]
    };
	var myChart = echarts.init(document.getElementById('business-type-time-detial'));
	myChart.clear();
	if(data.orderNum.length>0){
		myChart.setOption(option);
	}else{
		noDataTip($("#business-type-time-detial"));
	}
	
}

//时间初始化
function initBaseInfo(){
   var dataDate = new Date();
   var options = { year: 'numeric', month: 'long', day: 'numeric' };
   $("#td-data-date").text(dataDate.toLocaleDateString('zh-CN', options));

	$(".cust-type-default").on("click",function(){
		$(this).addClass("active").siblings().removeClass("active");
		g_custType=$(this).attr("type");
		$("#query-page-data").trigger("click");
	});
	
}

//获取渠道参数
function getGroupChannelParam(){
	var areaCode="";
	try{
	    var cityId=$('#selectCity').combobox("getValue");
		var countyId=$('#selectCounty').combobox("getValue");
		if(""==areaCode && ""!=countyId){
			areaCode=countyId;
		}else if(""==areaCode && ""!=cityId){
			areaCode=cityId;
		}
	}catch(e){
	}
	var channelName=$.trim($("#channel_name").val());
	var channelParam={'areaCode':areaCode,"channelName":channelName};
	return channelParam;
}

function noDataTip($selector){
	var currModH=$selector.height();
	var top=currModH>180?"35%":"13%";
	var $li=[
        "<div class='no-data' style='width:90%;position: absolute;top:"+top+";text-align:center;color:#a59999;'>",
		   "<img src='../static/images/no-data.png' style='width:200px;height:200px;'/>",
		   "<div style='font-size:16px;opacity:0.7;color:#fff;'>暂无数据</div>",
        "</div>"
    ]
	$selector.append($li.join(""));
}

function keepTwoDecimal(currVal){
		 var result = parseFloat(currVal);
		 if (isNaN(result)) {
		   return false;
		 }
		 result = Math.round(currVal *100) / 100;
		 return result;
}

//初始化页面
function loadPageData(){
	 //获取渠道信息
	 var groupChannelInfo=g_channelInfo;
	 //第一步：优先判断url请求参数里面
	 let param=JSON.parse(gDataGather.param);
	 if(Object.keys(param).length>0){
		 groupChannelInfo=param;
		 gDataGather.param="{}";
	 }
	 if(Object.keys(groupChannelInfo).length==0){
		 groupChannelInfo=window.localStorage.getItem("group-channel-info");
		 if(undefined==groupChannelInfo || null==groupChannelInfo){
			 groupChannelInfo={"channelCode":"11228790","groupChannelCode":"3201001965930","channelName":"中国电信南京分公司@玄武大钟亭营业厅"};
	     }else{
	    	 groupChannelInfo=JSON.parse(groupChannelInfo);
	     }
	 }else{
		 window.localStorage.setItem("group-channel-info",JSON.stringify(groupChannelInfo));
	 }
     //设置全局渠道编码、渠道名称
	 g_channelCode=groupChannelInfo.channelCode;
	 g_channelName=groupChannelInfo.channelName;
	 //开始动画特效
	 $('#load').show();
	 $('#load').fadeOut(500,function(){
	 });
	
	 //引入office_efficiency_data.js缓存假数据
	 if(data.code==0){
	 	  $(".no-data").remove();
		  //加载门店历史受理详情
		  loadChannelHandleDetail(data.channelHandleInfo);
		  //加载营业员受理详情
		  loadStaffHandleDetail(data.staffHandleInfo);
		  //加载门店台席健康度详情
		  //加载耗时步骤分析
		  loadTimeStepDetail(data.timeStepAnalysis);
		  //加载业务类型耗时详情
		  loadBusinessTypeTimeDetail(data.businessTypeAnalysis);
	 }
	
}
$(function(){
	//加载基础信息
	initBaseInfo();
	//加载页面数据
	loadPageData();
})