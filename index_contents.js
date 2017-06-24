var cheerio = require("cheerio");
var superagent = require("superagent");
var fs = require("fs");
var iconv = require('iconv-lite');
var http = require("http");

var out = fs.createWriteStream("temp.txt");
var flag = 0;
var temp = "";


superagent.get('http://news.xidian.edu.cn/xwjh/jx.htm')
    .end(function(err,sres){
        if(err){
            console.log("error" + err);
            return;
        }
        var items = [];
        var $ = cheerio.load(sres.text);
        $('.m-news-list .pc-news-li .pc-news-bt').each(function(idx, element){
            var $element = $(element);
            //console.log($element.text());
            items.push(
                $element.text()
            );
        });
        console.log(items);
        temp += items.join("\n")+"\n";
        flag += 1;
        if(flag == 4){
            out.write(temp);
            out.end();
            console.log("It is OK");
        }
    });
    for(var i = 1;i < 4;i++){
        superagent.get('http://news.xidian.edu.cn/xwjh/jx/'+i+'.htm')
            .end(function(err,sres){
            if(err){
                console.log("error" + err);
                return;
            }
            var items = [];
            var $ = cheerio.load(sres.text);
            $('.m-news-list .pc-news-li .pc-news-bt').each(function(idx, element){
                var $element = $(element);
                
                items.push(
                    $element.text()
                );
            });
            console.log(items);
            temp += items.join("\n")+"\n";
            flag += 1;
            if(flag == 4){
                out.write(temp);
                out.end();
                console.log("It is OK");
            }
    });
}
