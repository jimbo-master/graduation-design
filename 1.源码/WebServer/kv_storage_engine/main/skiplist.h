//  Author：JianBo (1353429820@qq.com)
//  Filename：main.cpp
//  Date：2024/1/27
//  Description：声明和定义KV存储引擎基本功能和结构
//  Copyrights（c）JianBo. All rights reserved

#include <iostream> 
#include <cstdlib>
#include <cmath>
#include <cstring>
#include <mutex>
#include <fstream>

#define STORE_FILE "../store/dumpFile"
#define LOAD_STORE_FILE "../store/loadFile"

std::mutex mtx;     //关键部分的互斥
std::string delimiter = ":";

//实现节点的类模板
template<typename K, typename V> 
class Node 
{

public:
    
    Node() {} 

    Node(K k, V v, int); 

    ~Node();

    K get_key() const;

    V get_value() const;

    void set_value(V);
    
    //线性数组，用于保存指向不同级别的下一个节点的指针
    Node<K, V> **forward;

    int node_level;

private:
    K key;
    V value;
};

template<typename K, typename V> 
Node<K, V>::Node(const K k, const V v, int level) 
{
    this->key = k;
    this->value = v;
    this->node_level = level; 

    //级别+1，因为数组索引来自0级别
    this->forward = new Node<K, V>*[level+1];
    
	//用0（NULL）填充正向数组
    memset(this->forward, 0, sizeof(Node<K, V>*)*(level+1));
};

template<typename K, typename V> 
Node<K, V>::~Node() 
{
    delete []forward;
};

template<typename K, typename V> 
K Node<K, V>::get_key() const 
{
    return key;
};

template<typename K, typename V> 
V Node<K, V>::get_value() const 
{
    return value;
};

template<typename K, typename V> 
void Node<K, V>::set_value(V value) 
{
    this->value=value;
};

//跳过列表的类模板
template <typename K, typename V> 
class SkipList 
{

public: 
    SkipList(int);
    ~SkipList();
    int get_random_level();
    Node<K, V>* create_node(K, V, int);
    int insert_element(K, V);
    void display_list();
    bool search_element(K);
    void delete_element(K);
    void dump_file();
    void dump_file_mass(const std::string& file_path);
    void load_file();
    int size();

private:
    void get_key_value_from_string(const std::string& str, std::string* key, std::string* value);
    bool is_valid_string(const std::string& str);

private:    
    //跳过列表的最大级别
    int _max_level;

    //当前级别的跳过列表
    int _skip_list_level;

    //指向标头节点的指针
    Node<K, V> *_header;

    //文件运算符
    std::ofstream _file_writer;
    std::ifstream _file_reader;

    //skiplist当前元素计数
    int _element_count;
};

//创建新节点
template<typename K, typename V>
Node<K, V>* SkipList<K, V>::create_node(const K k, const V v, int level) 
{
    Node<K, V> *n = new Node<K, V>(k, v, level);
    return n;
}

template<typename K, typename V>
int SkipList<K, V>::insert_element(const K key, const V value) 
{
    
    mtx.lock();
    Node<K, V> *current = this->_header;

    //创建更新数组并对其进行初始化
    //update是一个数组，用于放置稍后应该操作的node->forward[i]的节点
    Node<K, V> *update[_max_level+1];
    memset(update, 0, sizeof(Node<K, V>*)*(_max_level+1));  

    //从跳过列表的最高级别开始
    for(int i = _skip_list_level; i >= 0; i--) 
    {
        while(current->forward[i] != NULL && current->forward[i]->get_key() < key) 
        {
            current = current->forward[i]; 
        }
        update[i] = current;
    }

    //已达到级别0，并将指针向前指针指向右节点，该节点需要插入键
    current = current->forward[0];

    //如果当前节点的关键字等于搜索到的关键字，我们得到它
    if (current != NULL && current->get_key() == key) 
    {
        std::cout << "key: " << key << ", 已存在，不再插入" << std::endl;
        mtx.unlock();
        return 1;
    }

    //如果current为NULL，则表示我们已到达级别的末尾
    //如果current的key不等于key，则意味着我们必须在update[0]和当前节点之间插入node 
    if (current == NULL || current->get_key() != key ) 
    {
        
        //为节点生成随机级别
        int random_level = get_random_level();

        //如果随机级别大于跳过列表的当前级别，则使用指向标头的指针初始化更新值
        if (random_level > _skip_list_level) 
        {
            for (int i = _skip_list_level+1; i < random_level+1; i++) 
            {
                update[i] = _header;
            }
            _skip_list_level = random_level;
        }

        //使用生成的随机级别创建新节点
        Node<K, V>* inserted_node = create_node(key, value, random_level);
        
        // insert node 
        for (int i = 0; i <= random_level; i++) 
        {
            inserted_node->forward[i] = update[i]->forward[i];
            update[i]->forward[i] = inserted_node;
        }
        std::cout << "Successfully inserted key:" << key << ", value:" << value << std::endl;
        _element_count ++;
    }
    mtx.unlock();
    return 0;
}

//显示跳过列表
template<typename K, typename V> 
void SkipList<K, V>::display_list() 
{
    for (int i = 0; i <= _skip_list_level; i++) 
    {
        Node<K, V> *node = this->_header->forward[i]; 
        std::cout << "Level " << i << ": ";
        while (node != NULL) 
        {
            std::cout << node->get_key() << ":" << node->get_value() << ";";
            node = node->forward[i];
        }
        std::cout << std::endl;
    }
}

//将内存中的数据转储到文件
template<typename K, typename V> 
void SkipList<K, V>::dump_file() 
{
    _file_writer.open(STORE_FILE);
    std::cout<<"以下为写入dumpFile的文件内容"<<std::endl;
    Node<K, V> *node = this->_header->forward[0]; 

    while (node != NULL) 
    {
        _file_writer << node->get_key() << ":" << node->get_value() << "\n";
        std::cout << node->get_key() << ":" << node->get_value() << ";\n";
        node = node->forward[0];
    }

    _file_writer.flush();
    _file_writer.close();
    return ;
}

//测试海量数据进行数据落盘测试时的dump_file
template<typename K, typename V>
void SkipList<K, V>::dump_file_mass(const std::string& file_path) 
{
    // 使用 file_path 替换 STORE_FILE
    _file_writer.open(file_path);
    Node<K, V>* node = this->_header->forward[0];
    while (node != NULL) 
    {
        _file_writer << node->get_key() << ":" << node->get_value() << "\n";
        std::cout << node->get_key() << ":" << node->get_value() << ";\n";
        node = node->forward[0];
    }

    _file_writer.flush();
    _file_writer.close();
}

//从磁盘加载数据
template<typename K, typename V> 
void SkipList<K, V>::load_file() 
{
    _file_reader.open(LOAD_STORE_FILE);
    std::cout<<"以下为加载loadFile的文件内容"<<std::endl;
    std::string line;
    std::string* key = new std::string();
    std::string* value = new std::string();
    while (getline(_file_reader, line)) 
    {
        get_key_value_from_string(line, key, value);
        if (key->empty() || value->empty()) 
        {
            continue;
        }
        int intkey = std::stoi(*key);
        insert_element(intkey, *value);
        std::cout << "key:" << intkey << "   value:" << *value << std::endl;
    }
    _file_reader.close();
}

//获取当前SkipList大小 
template<typename K, typename V> 
int SkipList<K, V>::size() 
{ 
    return _element_count;
}

template<typename K, typename V>
void SkipList<K, V>::get_key_value_from_string(const std::string& str, std::string* key, std::string* value) 
{

    if(!is_valid_string(str)) 
    {
        return;
    }
    *key = str.substr(0, str.find(delimiter));
    *value = str.substr(str.find(delimiter)+1, str.length());
}

template<typename K, typename V>
bool SkipList<K, V>::is_valid_string(const std::string& str) 
{

    if (str.empty()) 
    {
        return false;
    }
    if (str.find(delimiter) == std::string::npos) 
    {
        return false;
    }
    return true;
}

//从跳过列表中删除元素 
template<typename K, typename V> 
void SkipList<K, V>::delete_element(K key) 
{

    mtx.lock();
    Node<K, V> *current = this->_header; 
    Node<K, V> *update[_max_level+1];
    memset(update, 0, sizeof(Node<K, V>*)*(_max_level+1));

    //从跳过列表的最高级别开始
    for (int i = _skip_list_level; i >= 0; i--) 
    {
        while (current->forward[i] !=NULL && current->forward[i]->get_key() < key) 
        {
            current = current->forward[i];
        }
        update[i] = current;
    }

    current = current->forward[0];
    if (current != NULL && current->get_key() == key) 
    {
       
        //启动最低级别并删除每个级别的当前节点
        for (int i = 0; i <= _skip_list_level; i++) 
        {

            //如果在级别i，下一个节点不是目标节点，则中断循环
            if (update[i]->forward[i] != current) 
                break;

            update[i]->forward[i] = current->forward[i];
        }

        //删除没有元素的标高
        while (_skip_list_level > 0 && _header->forward[_skip_list_level] == 0) 
        {
            _skip_list_level --; 
        }

        std::cout << "Successfully deleted key "<< key << std::endl;
        _element_count --;
    }
    mtx.unlock();
    return;
}

template<typename K, typename V> 
bool SkipList<K, V>::search_element(K key) 
{

    std::cout << "开始查询数据..." << std::endl;
    Node<K, V> *current = _header;

    //从跳过列表的最高级别开始
    for (int i = _skip_list_level; i >= 0; i--) 
    {
        while (current->forward[i] && current->forward[i]->get_key() < key) 
        {
            current = current->forward[i];
        }
    }

    //达到级别0，并将指针前进到右侧节点，我们进行搜索
    current = current->forward[0];

    //如果当前节点的关键字等于搜索到的关键字，我们得到它
    if (current and current->get_key() == key) 
    {
        std::cout << "Found key: " << key << ", value: " << current->get_value() << std::endl;
        return true;
    }

    std::cout << "Not Found Key:" << key << std::endl;
    return false;
}

//构造跳过列表
template<typename K, typename V> 
SkipList<K, V>::SkipList(int max_level) 
{

    this->_max_level = max_level;
    this->_skip_list_level = 0;
    this->_element_count = 0;

    //创建头节点并将键和值初始化为null
    K k;
    V v;
    this->_header = new Node<K, V>(k, v, _max_level);
};

template<typename K, typename V> 
SkipList<K, V>::~SkipList() 
{

    if (_file_writer.is_open()) 
    {
        _file_writer.close();
    }
    if (_file_reader.is_open()) 
    {
        _file_reader.close();
    }
    delete _header;
}

template<typename K, typename V>
int SkipList<K, V>::get_random_level()
{

    int k = 1;
    while (rand() % 2) 
    {
        k++;
    }
    k = (k < _max_level) ? k : _max_level;
    return k;
};