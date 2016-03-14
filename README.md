# myTab
这是一个react-native 应用，小牛初试，但是试下来觉得性能还是不怎么行。
主要有navigator，drawer,tab之前跳转，进入webView,及自定义drawer的封装。
未解决的问题是：drawer当中捕捉move事件会影响子模块的onpress的功能。
如何安装：
1.copy下来后，npm install把相应的依赖下载下来
2.npm start 启动服务 http://localhost:8081/index.android.bundle?platform=android可看是否编译成功
3.react-native run-android 安装到手机端 如果出现报错，可用debug调试一下出错在哪里http://localhost:8081/debugger-ui
