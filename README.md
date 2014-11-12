routes
======

监听&lt;a>标签点击事件，ajax调用

类似于backbone里面的routes，不过功能没有那么强大，  
因为开始设计时候只是想到路径能在网址栏显示就行了，  
后端直接ajax返回html，append；

支持浏览器历史history

####用法：  
    defaults config
    
    Routes.defaults = {
        indexRoutes:'#index',  //首个要加载执行的函数
        item:'a.ajax',         //jquery能判断的元素
        routes:{},             //路径格式{href:functionName}
        func:{}                //执行函数{functionName:function(){}}
    }
    
    demo
    
    seajs.use(['./routes'],function(Routes){
        var RoutesAll;
        var options = {
            indexRoutes:'#url1',   //初始的执行url当路径没有#时，调用的函数
            routes:{
                'url1':'url1',     //herf:function(执行的func里面的function name)
                'url2':'url2',
                'url3':'url3',
                'url4':'url4'
            },
            func:{
                url1:function(){
                    console.log('url1');
                },
                url2:function(){
                    console.log('url2');
                },
                url3:function(){
                    console.log('url3');
                },
                url4:function(){
                    console.log('url4');
                }
            }
        }
        RoutesAll = new Routes(options);
        RoutesAll.init();
    })
    在function里面的直接写个包含$.get的公共函数，把返回来的html append
