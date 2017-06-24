var cheerio = require("cheerio");
var superagent = require("superagent");
var fs = require("fs");


superagent.get('http://news.xidian.edu.cn/xwjh/jx.htm')
    .end(function(err,sres){
        if(err){
            console.log("error" + err);
            return;
        }
        var items = [];
        var $ = cheerio.load(sres.text);
        $('.m-news-list .m-li-li ').each(function(idx, element){
            var fileName = $(".pc-news-li .pc-news-bt", element).text();
            console.log(fileName);
            var url = $("a", element).attr("href");
            url = "http://news.xidian.edu.cn" + url.substring(2);
            console.log(url);
       
            superagent.get(url)
                .end(function(err,sres){
                    if(err){
                        console.log("error" + err);
                        return;
                    }
                    
                    var content = $("#wz_zw",sres.text);
                    var writecontent = $(content).text();
                    console.log(writecontent);
                    
                    fs.writeFile(fileName+".txt",writecontent,function(err){
                        if(err){
                            console.log(err);
                            return;
                        }
                        console.log(fileName+"  下载完成！");
                    });
                    
            });
           
        });
    });