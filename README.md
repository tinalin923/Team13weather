# Team13weather 
- css for 琬喧 (檔名交給你取了XD)  
- data.js for 筑筠  
- map.js for 佳俞 (images內有台灣地圖，如果你需要)  

- images可以放png等圖片資料  

- 要fetch的資料:   
  -  /v1/rest/datastore/F-C0032-001  一般天氣預報-今明 36 小時天氣預報 (取第一個時段的即可)  
        => 各縣市的:  
            - Wx:天氣現象  (根據天氣現象決定顯示的天氣圖樣)  
            - MinT:最低溫度  
            - MaxT:最高溫度  
            - PoP:降雨機率  
  
	紫外線: 二擇一           
  -  /v1/rest/datastore/F-D0047-071 鄉鎮天氣預報-新北市未來1週天氣預報 (預報)  
        => UVI  
				*這個比較麻煩，需要去fetch每個縣市各自的未來1週天氣預報  

	-  /v1/rest/datastore/O-A0003-001 局屬氣象站-現在天氣觀測報告 (當下一小時)  
				=> H_UVI (測站站號的ID 晚點給)  
				*對於呈現方式還不確定  

				*紫外線指數 => 曝曬級數:
					0-2 => 低量級
					3-5 => 中量級
					6-7 => 高量級
					8-10 => 過量級
					11以上 => 危險級