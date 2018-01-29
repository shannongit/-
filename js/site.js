// www.uuuti.com 创新学习网 xuenang@gmail.com
function showSite()
{
    var urlList = ($('#siteUrls').val()).split('\n');
    var listNum = urlList.length;
    var siteR ;
    var tr_class = '';
    var c = '';
    var dt = 0;
    var imgc = '<img src="images/l.gif" class="l">';

    $('#site').html('<div class="site-t">URL</div><div class="site-t">百度</div><div class="site-t">Google</div><div class="site-t">Yahoo</div><div class="site-t">Bing</div><div class="site-t">PR</div><div class="site-t">IP</div><div class="site-t">alexa(全球/中国)</div><div class="clear"></div>');

	for(var i = 0;i < listNum;i++)
    	{
	   

	    c = '';
        	webUrl = urlList[i];
		if ($.trim(webUrl) != '')
		    {
			webUrl = webUrl.replace('site:','');
			$('#site').html($('#site').html()+ '<div class="site-r" id="d_'+dt+'" name="d_'+dt+'">'+escape(webUrl)+'</div>');


			///////////baidu.com

			$('#site').html($('#site').html()+ '<div class="site-r" id="baidu_'+dt+'" name="baidu_'+dt+'"></div>');

			if ($("#cbaidu").attr("checked")==true)
			    {
				
				$('#baidu_'+dt).html(imgc);
				baidu(webUrl,'baidu_'+dt);
			    }
			
			
			
			



			////////google.cn
			
			$('#site').html($('#site').html()+ '<div class="site-r" id="google_'+dt+'" name="google_'+dt+'"></div>');
			if ($("#cgoogle").attr("checked")==true)
			    {
			    	
				$('#google_'+dt).html(imgc);
				googlecn(webUrl,'google_'+dt)
			    }

			






			//////////yahoo.cn
			$('#site').html($('#site').html()+ '<div class="site-r" id="yahoo_'+dt+'" name="yahoo_'+dt+'"></div>');
			if($("#cyahoo").attr("checked")==true)
			    {
			    	
				$('#yahoo_'+dt).html(imgc);
				yahoocn(webUrl,'yahoo_'+dt);
			    }

			
			/////////cn.bing.com
			$('#site').html($('#site').html()+ '<div class="site-r" id="bing_'+dt+'" name="bing_'+dt+'"></div>');
			if($("#cbing").attr("checked")==true)
			    {
			    				
				$('#bing_'+dt).html(imgc);
				bingcn(webUrl,'bing_'+dt);
			    }
			
			

			////////////pr
			$('#site').html($('#site').html()+ '<div class="site-r" id="pr_'+dt+'" name="pr_'+dt+'"></div>');
			if($("#cpr").attr("checked")==true)
			    {
			   	
				$('#pr_'+dt).html(imgc);
				PR(webUrl,'pr_'+dt);
			    }
			
			
			
			////////////ip
			$('#site').html($('#site').html()+ '<div class="site-r" id="ip_'+dt+'" name="ip_'+dt+'"></div>');
			if($("#cip").attr("checked")==true)
			    {
			    
				$('#ip_'+dt).html(imgc);
				ip(webUrl,'ip_'+dt);
			    }
			
			
			

			//alexa
			$('#site').html($('#site').html()+ '<div class="site-r" id="alexa_'+dt+'" name="alexa_'+dt+'"></div>');
			if($("#calexa").attr("checked")==true)
			    {
			    	
				$('#alexa_'+dt).html(imgc);
				alexa(webUrl,'alexa_'+dt);
			    }
			
			
			
			

			$('#site').html($('#site').html()+ '<div class="clear"></div>');
			dt++;
		    }    
	}
    	$('#site').html($('#site').html()+'</table>');
}

function baidu(s,did)
{
    
    var re = /找到相关网页.{1,18}篇/;
    var url = 'http://www.baidu.com/s?wd=site%3A'+s;
    getcode(url,re,true,did);

}

function googlecn(s,did)
{ 
    var re = /(获得约.{1,18}条结果)|(共有.{1,18}个)/;
  var url ='http://www.google.cn/search?q=site%3A'+s;
  
 getcode(url,re,true,did);
}

function yahoocn(s,did)
{
    var re = /找到相关网页约.{1,18}条/;
    var url ='http://one.cn.yahoo.com/s?p=site%3A'+s;
    getcode(url,re,true,did);
}


function bingcn(s,did)
{
    var re = /共.{1,18}条|(of.(1,18)results)/;
    var url ='http://cn.bing.com/search?q=site%3A'+s;
    getcode(url,re,true,did);
}

function PR(s,did)
{
    var re = /<pagerank>[\w\W]{1,18}<\/pagerank>/;
    var url='http://www.uuuti.com/www/pr.php?domain='+s;
    getcode(url,re,true,did);
}


function ip(s,did)
{
    var re = /[\w\W]+/;
    var url='http://www.uuuti.com/www/ip/?ip='+s;
    getcode(url,re,false,did);
}

function alexa(s,did)
{
    var re = /[\w\W]+/;
    var url='http://www.uuuti.com/www/ip/alexa.php?domain='+s;
    getcode(url,re,false,did);
}
function getcode(url,re,isnum,did)
    {
       
	var num = '';	
	
	 $.ajax({
		url:url,
		type:"GET",
		cache:false,
		dateType:"html",
		async:true,
		success:function(msg)
		{
			num = msg;
			
    			numstr = msg.match(re);
			if(isnum)
			    {

				if(numstr != null)
				    {
					getnum = numstr[0].match(/[\d,]+/);
					num = getnum[0].replace(/,/g,'');
					

				    }
				else
				    {
					num = 0;
				    }
			    }
			else
			    {
				
				num = numstr[0];
			    }

			
			$('#'+did).html(num);

		}

	   })
	     
    return num;
    }

	

