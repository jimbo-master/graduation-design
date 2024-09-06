#!/bin/bash

# Webbench测试目标URL
TARGET_URL="http://127.0.0.1:9006/"

# Webbench并发用户数
CONCURRENT_USERS=10500

# Webbench测试时间（单位：秒）
TEST_DURATION=5

# 循环次数
NUM_TESTS=100

# 输出文件  
# 第一组：webbench_results.txt
# 第二组：webbench_results2.txt
# 依次类推
OUTPUT_FILE="webbench_results.txt"

# 初始化结果文件
echo -n "" > $OUTPUT_FILE

# 执行Webbench测试循环
for i in $(seq 1 $NUM_TESTS)
do
    # 执行Webbench测试
    TEST_RESULT=$(webbench -c $CONCURRENT_USERS -t $TEST_DURATION $TARGET_URL | grep -E 'Speed|Requests')
    
    # 将结果追加到总体结果文件中，带有"第几次测试"的信息
    echo "第 $i 次测试:" >> $OUTPUT_FILE
    echo "$TEST_RESULT" | sed 's/^/    /' >> $OUTPUT_FILE  # 在每行前加四个空格
    echo "" >> $OUTPUT_FILE  # 添加一行空行
    
    # 打印当前测试完成信息
    echo "Webbench测试 $i 完成，结果已保存到 $OUTPUT_FILE"
    
    # 等待5秒进行下一组
    sleep 5
done

echo "所有Webbench测试完成，结果已保存到 $OUTPUT_FILE"
