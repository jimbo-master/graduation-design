//  Author：JianBo (1353429820@qq.com)
//  Filename：stress_test.cpp
//  Date：2024/1/27
//  Description：测试KV存储引擎操作海量数据
//  Copyrights（c）JianBo. All rights reserved

#include <iostream>
#include <chrono>
#include <cstdlib>
#include <pthread.h>
#include <time.h>
#include "../main/skiplist.h"
#define MASS_FILE "../store/massFile"
#define NUM_THREADS 1
#define TEST_COUNT 1000000   //数据规模：10W、50W、100W、1000W
SkipList<int, std::string> skipList(18);


//测试海量数据插入效率
void *insertElement(void* threadid) 
{
    long tid; 
    tid = (long)threadid; 
    int tmp = TEST_COUNT/NUM_THREADS; 
	for (int i=tid*tmp, count=0; count<tmp; i++) 
    {
        count++;
		skipList.insert_element(rand() % TEST_COUNT, "a"); 
	}
    pthread_exit(NULL);
}

//测试海量数据查找效率
void *getElement(void* threadid) 
{
    long tid; 
    tid = (long)threadid;  
    int tmp = TEST_COUNT/NUM_THREADS; 
	for (int i=tid*tmp, count=0; count<tmp; i++) 
    {
        count++;
		skipList.search_element(rand() % TEST_COUNT); 
	}
    pthread_exit(NULL);
}

//测试海量数据落盘效率
void dumpElement()
{
    // 落盘数据
    srand(time(NULL));
    {
        auto start = std::chrono::high_resolution_clock::now();

        std::cout << "------开始落盘数据------" << std::endl;
        skipList.dump_file_mass("../store/massFile2");

        auto finish = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double> elapsed = finish - start;
        std::cout << "数据落盘耗时:" << elapsed.count() << std::endl;
    }
}

//测试海量数据删除效率
void *deleteElement(void* threadid) 
{
    long tid; 
    tid = (long)threadid;  
    int tmp = TEST_COUNT/NUM_THREADS; 
	for (int i=tid*tmp, count=0; count<tmp; i++) 
    {
        count++;
		skipList.delete_element(rand() % TEST_COUNT); 
	}
    pthread_exit(NULL);
}

int main() 
{

    //插入数据
    srand (time(NULL));  
    {

        pthread_t threads[NUM_THREADS];
        int rc;
        int i;

        auto start = std::chrono::high_resolution_clock::now();

        for( i = 0; i < NUM_THREADS; i++ ) 
        {
            std::cout << "------开始插入数据------"<< std::endl;
            rc = pthread_create(&threads[i], NULL, insertElement, (void *)i);
            if (rc) 
            {
                std::cout << "Error:unable to create thread"<< std::endl;
                exit(-1);
            }
        }

        void *ret;
        for( i = 0; i < NUM_THREADS; i++ ) 
        {
            if (pthread_join(threads[i], &ret) !=0 )  
            {
                perror("pthread_create() error"); 
                exit(3);
            }
        }
        auto finish = std::chrono::high_resolution_clock::now(); 
        std::chrono::duration<double> elapsed = finish - start;
        std::cout << "数据插入耗时:" << elapsed.count() << std::endl;
        std::cout<<std::endl;
    }


    //查找数据
    // srand (time(NULL));  
    // {
    //     pthread_t threads[NUM_THREADS];
    //     int rc;
    //     int i;
    //     auto start = std::chrono::high_resolution_clock::now();

    //     for( i = 0; i < NUM_THREADS; i++ ) 
    //     {
    //         std::cout << "------开始查找数据------"<< std::endl;
    //         rc = pthread_create(&threads[i], NULL, getElement, (void *)i);

    //         if (rc) 
    //         {
    //             std::cout << "Error:unable to create thread," << rc << std::endl;
    //             exit(-1);
    //         }
    //     }

    //     void *ret;
    //     for( i = 0; i < NUM_THREADS; i++ ) 
    //     {
    //         if (pthread_join(threads[i], &ret) !=0 )  
    //         {
    //             perror("pthread_create() error"); 
    //             exit(3);
    //         }
    //     }

    //     auto finish = std::chrono::high_resolution_clock::now(); 
    //     std::chrono::duration<double> elapsed = finish - start;
    //     std::cout << "数据查找耗时:" << elapsed.count() << std::endl;
    //     std::cout<<std::endl;
    // }


    //落盘数据
    //dumpElement();


    //删除数据
    srand (time(NULL));  
    {
        pthread_t threads[NUM_THREADS];
        int rc;
        int i;
        auto start = std::chrono::high_resolution_clock::now();

        for( i = 0; i < NUM_THREADS; i++ ) 
        {
            std::cout << "------开始删除数据------"<< std::endl;
            rc = pthread_create(&threads[i], NULL, deleteElement, (void *)i);

            if (rc) 
            {
                std::cout << "Error:unable to create thread," << rc << std::endl;
                exit(-1);
            }
        }

        void *ret;
        for( i = 0; i < NUM_THREADS; i++ ) 
        {
            if (pthread_join(threads[i], &ret) !=0 )  
            {
                perror("pthread_create() error"); 
                exit(3);
            }
        }

        auto finish = std::chrono::high_resolution_clock::now(); 
        std::chrono::duration<double> elapsed = finish - start;
        std::cout << "100W数据删除耗时:" << elapsed.count() << std::endl;
    }
	pthread_exit(NULL);
    return 0;

}
