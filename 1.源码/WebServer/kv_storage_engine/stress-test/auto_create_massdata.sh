#!/bin/bash

MAX_NUM=100000       # 生成10W个KV数据
MAX_NUM2=500000      # 生成50W个KV数据
MAX_NUM3=1000000     # 生成100W个KV数据
MAX_NUM4=10000000    # 生成1000W个KV数据

OUTPUT_FILE="../store/massFile"  # 输出文件名

# 删除原文件
rm -f "$OUTPUT_FILE"

# 生成K的范围数组
keys=($(seq 1 $MAX_NUM))

# 使用printf和shuf管道处理
printf "%s\n" "${keys[@]}" | shuf -o "$OUTPUT_FILE"

echo "生成完成"
