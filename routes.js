define("./routes",function (require, exports, module) {
    require('jquery');
    var Routes = function(options){
        this.options = $.extend({}, Routes.defaults, typeof options == 'object' && options);
        this.isHistory = false;
    }
    Routes.defaults = {
        indexRoutes:'#index',  //首个要加载执行的函数
        item:'a.ajax',         //jquery能判断的元素,过滤元素
        routes:{},             //路径格式{href:functionName}
        func:{}                //执行函数{functionName:function(){}}
    }
    var hashRegExp = /#\S+/g,
        nameRegExp = /:\w+/g,
        locationUrl = location.href.replace(hashRegExp,""),
        pageInfo = {
            url : location.href
        };
    function urlToHash(url){
        return url.match(hashRegExp)[0];
    }
    Routes.prototype = {
        init:function() {
            var that = this;
            var hash = location.hash?location.hash:that.options.indexRoutes;
            that.routeExec(hash);
            window.onpopstate = function (e) {
                that.isHistory = true;
                if (e.state) {
                    that.routeExec(urlToHash(e.state.url));
                } else {
                    if (location.href == locationUrl) {
                        location.assign(locationUrl);
                    };
                };
            };
            $(document).on('click',that.options.item,function(){
                that.isHistory = false;
                return that.routeExec(urlToHash($(this).attr('href')));
            })
        },
        add:function(obj){
            this.options = $.extend(true, this.options, obj);
        },
        routeExec:function(href){
            var routes = this.options.routes,
                that = this;
            var check = true;
            $.each(routes, function(route, exec) {
                route = new RegExp('^#'+route.replace(/:\w+/g, '([^/?]+)')+'$');
                if (route.test(href)) {
                    check = false;
                    var match = href.match(route);
                        match.shift();
                    that.options.func[exec].apply(that, match);
                    if (!that.isHistory) {
                        pageInfo.url = locationUrl+href;
                        if (history.pushState) {
                            history.pushState(pageInfo, "", pageInfo.url);
                        }
                    };
                };
            });
            if (!history.pushState) {
                check = true;
            }
            return check;
        }
    }
    return Routes;
});