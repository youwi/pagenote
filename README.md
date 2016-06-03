# pagenote
-  基于node+express开发
- 用来代替wiki的个人文档系统
- 安装说明:

        npm install express
        node server.js
 
#特点
 * 支持粘贴截图,
 * 可以上传图片(base64模式)
 * 支持粘贴doc (暂不支持图文混合,依赖浏览器自身)
 
#安装
 * 安装node,安装express,jade (如果提示依赖请按提示操作就行了)
 * git clone https://github.com/youwi/pagenote.git
 * cd pagenote
 * node bin/server.js
 
# 文件说明
- public 前端html加js
- routes 后端接口加js
- views  jade使用的,暂时没有使用到
- doc 保存的笔记,测试用的
  

#配置
- 端口 默认为8008,配置在bin/www中,或者环境变量中
- 保存文件的位置 ,配置在 routes/wiki.js中 (默认没有配置)
-
#关于维护
- 没有时间维护,将就吧

#新配置
- 引入react....算了...不用它了.
