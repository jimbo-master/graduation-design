/*大屏*/
var data={
	"code":0,
	"businessTypeAnalysis":{
		"orderNum":[
			"31327",
			"23724",
			"60832",
			"114321"	
		],
		"categoryArr":[
			"插入数据",
			"查询数据",
			"删除数据",
			"落盘数据"
		],
		"avgTime":[
			"3.23",
			"4.29",
			"1.65",
			"8.73",
		],
		"legendArr":[
			"耗时时长",
			"QPS"
		]
	},

	"timeStepAnalysis":{
		"channelTime":[
			"0.22",
			"0.32",
			"0.10",
			"0.07"
		],
		"categoryArr":[
			"插入数据",
			"查询数据",
			"删除数据",
			"落盘数据"
		],
		"legendArr":[
			"10W数据量",
			"50W数据量",
			"100W数据量"
		],
		"provinceTime":[
			"1.46",
			"1.96",
			"0.76",
			"0.39"
		],
		"provinceTime2":[
			"3.23",
			"4.29",
			"1.65",
			"8.73"
		]
	},
	"staffHandleInfo":{
		/*平均传输量*/
		"channelJfMap":{
			"9901500010_charge":13145866,	//1
			"9901500010_charge2":68,	    //1

			"9901660106_charge":12221082,   //2
			"9901660106_charge2":63,        //2

			"NJ11032099_charge":7804137,    //3
			"NJ11032099_charge2":74,		//3

			"NJ11032500_charge":6962009,	//4
			"NJ11032500_charge2":76,		//4

			"NJ156677_charge":2707308,		//5
			"NJ156677_charge2":72,		    //5

			"NJ36038678_charge":2535217,	//6
			"NJ36038678_charge2":68,		//6
			
			"NJ37709514_charge":2144060,	//7
			"NJ37709514_charge2":76,		//7

			"NJ37825052_charge":2230614,	//8
			"NJ37825052_charge2":80,		//8

			"NJ51789168_charge":1847888,	//9
			"NJ51789168_charge2":73,		//9

			"NJ72000095_charge":1994451,	//10
			"NJ72000095_charge2":81,		//10

			"NJ90906337_charge":2213411,	//11
			"NJ90906337_charge2":64,		//11

			"NJ90906338_charge":1980630,	//12
			"NJ90906338_charge2":70,		//12


		},
		"channelStaffLen":12,
		"channelStartWeiGui":1,
		"channelOrderNum":"233",

		"staffHandleInfo":{
			"map_201912311524067392":[
				{
					"staffCode":"9901500010",
					"index":1,
					"orderNum":"18721",
					"avgTime":"6578544",
					"staffName":"LT+LT+Proactor+关闭日志"
				},
				{
					"staffCode":"9901660106",
					"index":2,
					"orderNum":"17832",
					"avgTime":"5793900",
					"staffName":"ET+ET+Proactor+关闭日志"
				}
			],
			"map_201912311524064349":[
				{
					"staffCode":"NJ11032099",
					"index":3,
					"orderNum":"18001",
					"avgTime":"3578964",
					"staffName":"LT+LT+Reactor+关闭日志"
				},
				{
					"staffCode":"NJ11032500",
					"index":4,
					"orderNum":"17950",
					"avgTime":"3309396",
					"staffName":"ET+ET+Reactor+关闭日志"
				}
			],
			"map_201912311524064395":[
				{
					"staffCode":"NJ156677",
					"index":5,
					"orderNum":"17360",
					"avgTime":"1483560",
					"staffName":"LT+LT+Proactor+打开日志+同步写入"
				},
				{
					"staffCode":"NJ36038678",
					"index":6,
					"orderNum":"17320",
					"avgTime":"1358712",
					"staffName":"ET+ET+Proactor+打开日志+同步写入"
				}
			],
			"map_201912311524063662":[
				{
					"staffCode":"NJ37709514",
					"index":7,
					"orderNum":"17500",
					"avgTime":"1058676",
					"staffName":"LT+LT+Reactor+打开日志+同步写入"
				},
				{
					"staffCode":"NJ37825052",
					"index":8,
					"orderNum":"16780",
					"avgTime":"1337796",
					"staffName":"LT+LT+Proactor+打开日志+异步写入"
				}
			],
			"map_201912311524062632":[
				{
					"staffCode":"NJ51789168",
					"index":9,
					"orderNum":"17920",
					"avgTime":"894144",
					"staffName":"ET+ET+Reactor+打开日志+异步写入"
				},
				{
					"staffCode":"NJ72000095",
					"index":10,
					"orderNum":"18000",
					"avgTime":"909192",
					"staffName":"ET+ET+Reactor+打开日志+同步写入"
				}
			],
			"map_201912311524063302":[
				{
					"staffCode":"NJ90906337",
					"index":11,
					"orderNum":"18024",
					"avgTime":"1175304",
					"staffName":"ET+ET+Proactor+打开日志+异步写入"
				},
				{
					"staffCode":"NJ90906338",
					"index":12,
					"orderNum":"17630",
					"avgTime":"976332",
					"staffName":"LT+LT+Reactor+打开日志+异步写入"
				}
			]
		},
		
		/*QPS*/
		"staffWgInfo":{
			"9901500010":122257,//1
			"9901660106":114691,//2
			"NJ11032099":73061, //3
			"NJ11032500":59854, //4
			"NJ156677":24979,	//5
			"NJ36038678":22647, //6
			"NJ37709514":19355, //7
			"NJ37825052":18719, //8
			"NJ51789168":14667, //9
			"NJ72000095":14157, //10
			"NJ90906337":13537, //11
			"NJ90906338":13485	//12   
		},
		"channelAvgTime":"1.28"
	},
	
	/*各组并发性能结果分析*/
	"channelHandleInfo":{
		/*请求量*/
		"orderNumData":[
			"99581",
			"98814",
			"116135",
			"99951",
			"581676",
			"545584",
			"89442",
			"82495",
			"97104",
			"89037",
			"348400",
			"310804",
		],

		/*传输量*/
		"lineUpData":[
			"2230614",
			"2213411",
			"2707308",
			"2536217",
			"13145866",
			"12221082",
			"1980630",
			"1847888",
			"2144060",
			"1994451",
			"7804137",
			"6962009",
		],

		/*QPS*/
		"custNumData":[
			"18719",
			"13537",
			"24979",
			"22647",
			"122257",
			"114691",
			"13485",
			"14667",
			"19355",
			"14157",
			"73061",
			"59854"
		],

		/*坐标组别*/
		"dataDateArr":[
			"第一组",
			"第二组",
			"第三组",
			"第四组",
			"第五组",
			"第六组",
			"第七组",
			"第八组",
			"第九组",
			"第十组",
			"第十一组",
			"第十二组",
		],
		
		/*速度*/
		"handleTimeData":[
			"1337796",
			"1175304",
			"1483560",
			"1358712",
			"6578544",
			"5793900",
			"976332",
			"894144",
			"1058676",
			"909192",
			"3578964",
			"3309396",		
		]
	}
}