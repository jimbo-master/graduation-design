//  Author：JianBo (1353429820@qq.com)
//  Filename：main.cpp
//  Date：2024/1/27
//  Description：测试KV存储引擎基本功能
//  Copyrights（c）JianBo. All rights reserved

#include <iostream>
#include "skiplist.h"
#define FILE_PATH "../store/dumpFile"

int main() 
{
    std::cout<<"----------测试KV存储引擎：插入数据----------"<<std::endl;
    SkipList<int, std::string> skipList(6);
	skipList.insert_element(1, "测试"); 
	skipList.insert_element(3, "KV"); 
	skipList.insert_element(7, "存储"); 
	skipList.insert_element(8, "引擎"); 
	skipList.insert_element(9, "基本"); 
	skipList.insert_element(19, "功能"); 
	skipList.insert_element(19, "测试完毕"); 
    std::cout<<std::endl;

    std::cout<<"----------测试KV存储引擎：返回数据规模------"<<std::endl;
    std::cout<<"当前KV存储数据规模为："<<skipList.size()<<std::endl;
    std::cout<<std::endl;

    std::cout<<"----------测试KV存储引擎：落盘数据----------"<<std::endl;
    skipList.dump_file();
    std::cout << "当前KV存储数据规模为:" << skipList.size() << std::endl;
    std::cout<<std::endl;

    std::cout<<"----------测试KV存储引擎：加载数据----------"<<std::endl;
    skipList.load_file();
    std::cout<<std::endl;
    std::cout<<"以下为加载后的dumpFile文件跳跃列表"<<std::endl;
    skipList.display_list();
    std::cout << "当前KV存储数据规模为：" << skipList.size() << std::endl;
    std::cout<<std::endl;
    
    std::cout<<"----------测试KV存储引擎：查询数据----------"<<std::endl;
    skipList.search_element(9);
    skipList.search_element(18);
    std::cout<<std::endl;

    std::cout<<"----------测试KV存储引擎：显示跳跃列表-------"<<std::endl;
    skipList.display_list();
    std::cout << "当前KV存储数据规模为：" << skipList.size() << std::endl;
    std::cout<<std::endl;

    std::cout<<"----------测试KV存储引擎：删除数据----------"<<std::endl;
    skipList.delete_element(3);
    skipList.delete_element(7);
    std::cout<<"以下为删除数据后的跳跃列表"<<std::endl;
    skipList.display_list();
    std::cout << "当前KV存储数据规模为：" << skipList.size() << std::endl;
    return 0;
}
