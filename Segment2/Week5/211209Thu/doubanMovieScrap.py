#!/usr/bin/env python
# -- coding = 'utf-8' --
# @Python  : 3.7
# @OS      : Windows 10 kiton.
# @Time    : 2021/2/26 9:42
# @Author  : Ai Qiangyun
# @IE-mail : 1154282938@qq.com
# @File    : spider1.py
# @Software: PyCharm
from bs4 import BeautifulSoup   # 网页解析，获取数据
import re                       # 正则，匹配提取
import urllib.request           # 网页请求
import urllib.error             # 网页请求错误处理
import xlwt                     # excel操作保存数据


def main():
    # 1.爬取网页和解析数据
    base_url = "https://movie.douban.com/top250?start="
    data_list = get_data(base_url)
    # 3.保存数据
    save_path = "./豆瓣电影Top250.xls"
    save_data(data_list, save_path)


def get_data(base_url):
    # 数据提取，通过正则提取相应数据存入内存

    # 匹配模式，用于提取特定元素
    # 影片详情的链接的匹配规则
    findLink = re.compile(r'<a href="(.*?)">')  # 生成正则表达式对象，表示规则（）
    # 电影图片链接
    findImgSrc = re.compile(r'<img.*src="(.*?)"', re.S)  # 忽略换行符
    # 电影名称
    findTitle = re.compile(r'<span class="title">(.*)</span>')
    # 影片评分
    findRating = re.compile(r'<span class="rating_num" property="v:average">(.*)</span>')
    # 评价人数
    findJudge = re.compile(r'<span>(\d*)人评价</span>')
    # 找到概况
    findInq = re.compile(r'<span class="inq">(.*)</span>')
    # 找到影片相关内容
    findBd = re.compile(r'<p class="">(.*?)</p>', re.S)

    # 创建一个总表
    data_list = []

    # 用于循环爬取网页，总共十页。# 根据豆瓣网页get请求规律，发现start=0为 1-25部电影
    for i in range(0, 10):          # 调用获取页面信息 的函数
        # 根据豆瓣网页get请求规律，发现start=0为 1-25部电影
        url = base_url + str(i*25)

        # 调用网页爬取函数，获取网页源码
        html = ask_url(url)

        # 逐一解析，生成soup树形结构
        soup = BeautifulSoup(html, "html.parser")

        # 分类查找符合要求的信息元素，在一个页面的25部电影循环，生成列表
        for item in soup.find_all('div', class_="item"):
            # 创建一个空列表，用于保存一个网页上25部电影的所有信息
            data = []
            item = str(item)

            # 影片详情的链接
            link = re.findall(findLink, item)[0]            # 通过正则查找指定的字符串，只要第一个
            data.append(link)

            # 图片链接
            imgSrc = re.findall(findImgSrc, item)[0]        # 只要第一个
            data.append(imgSrc)

            # 名称 有两个(中国和外国名）
            titles = re.findall(findTitle, item)
            if len(titles) == 2:
                # 添加中国名
                titles[0] = "".join(titles[0].split())      # 去掉\xa0空格
                c_title = titles[0]
                data.append(c_title)
                # 添加外国名
                titles[1] = "".join(titles[1].split())      # 去掉\xa0空格
                o_title = titles[1].replace("/", "")        # 去掉无关字符
                data.append(o_title)
            else:
                # 外国名留空,因为有可能没有
                data.append(titles[0])                      # 只要第一个
                data.append('  ')                           # 空白补位

            # 评分
            rating = re.findall(findRating, item)[0]        # 只要第一个
            data.append(rating)

            # 评价人数
            judgeNum = re.findall(findJudge, item)[0]       # 只要第一个
            data.append(judgeNum)

            # 概述
            inq = re.findall(findInq, item)
            if len(inq) != 0:                               # 判断是否为空
                inq[0] = "".join(inq[0].split())
                inq = inq[0].replace("。", "")
                data.append(inq)
            else:
                # 为空的情况下，占位添加进列表
                data.append(" ")

            # 相关内容
            bd = re.findall(findBd, item)[0]
            bd = "".join(bd.split())
            bd = re.sub('<br(\s+)?/>(\s+)?',"", bd)     # 去掉br
            bd = re.sub('/', "", bd)                    # 去掉斜杠
            data.append(bd.strip())

            # 把处理好的一部电影信息放入data_list
            data_list.append(data)

    # 该函数返回一个列表，保存有所有处理后的爬取信息
    return data_list

    # 在控制台打印爬取所有信息列表
    print(data_list)


def ask_url(url):
    # 爬取网页，得到一个指定url的网页内容

    # 请求头，伪装成浏览器（谷歌）
    head = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36"
    }

    # 创建请求
    request = urllib.request.Request(url, headers=head)

    # 尝试获取请求响应
    try:
        response = urllib.request.urlopen(request)
        html = response.read().decode("utf-8")

    except urllib.error.URLError as e:
        #   报错打印
        if hasattr(e, "code"):
            print(e.code)
        if hasattr(e, "reason"):
            print(e.reason)

    # 该函数返回请求的网页源信息
    return html


def save_data(data_list, save_path):
    # 3.保存数据

    # 提示进入爬取信息保存环节
    print("saveing...")

    # 创建电子表格句柄，在内存中
    book = xlwt.Workbook(encoding="utf-8", style_compression=0)

    # 在上述基础上创建工作薄sheet
    sheet = book.add_sheet('豆瓣电影Top250', cell_overwrite_ok=True)

    # 将表头写入工作薄
    col = ("电影详情链接", "图片链接", "影片中文名", "影片外文名", "评分", "评价数",  "概况", "相关信息")
    for i in range(0, 8):
        sheet.write(0, i, col[i])  # 列名

    # 将爬取的信息写入工作薄
    for i in range(0, 250):
        print("第%d条" % i)
        data = data_list[i]
        for j in range(0, 8):
            sheet.write(i+1, j, data[j])   # 数据

    # 将内存中的工作薄保存到硬盘中的电子表格文件中
    book.save(save_path)  # 保存


if __name__ == "__main__":

    # 主程序入口
    main()

    # 提醒爬取和保存完毕
    print("爬取完毕并已保存为电子表格")
