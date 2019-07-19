参数
<table>
        <tr>
            <th>参数</th>
            <th>类型</th>
            <th>说明</th>
            <th>默认值</th>
        </tr>
        <tr>
            <th>header</th>
            <th>Boolean</th>
            <th>是否显示头部操作栏</th>
            <th>true</th>
        </tr>
        <tr>
            <th>preMonth</th>
            <th>Boolean</th>
            <th>是否显示上个月按钮</th>
            <th>true</th>
        </tr>
         <tr>
            <th>nextMonth</th>
            <th>Boolean</th>
            <th>是否显示下个月按钮</th>
            <th>true</th>
        </tr>
         <tr>
            <th>preYear</th>
            <th>Boolean</th>
            <th>是否显示上一年按钮</th>
            <th>false</th>
        </tr>
         <tr>
            <th>nextYear</th>
            <th>Boolean</th>
            <th>是否显示下一年按钮</th>
            <th>false</th>
        </tr>
         <tr>
            <th>today</th>
            <th>Boolean</th>
            <th>是否显示今天按钮</th>
            <th>false</th>
        </tr>
        <tr>
            <th>weeks</th>
            <th>Boolean</th>
            <th>是否显示周标题</th>
            <th>true</th>
        </tr>
        <tr>
            <th>weeksType</th>
            <th>String</th>
            <th>周标题类型</th>
            <th>cn</th>
        </tr>
        <tr>
            <th>showMoreDays</th>
            <th>Boolean</th>
            <th>是否显示前后月份残余数据</th>
            <th>false</th>
        </tr>
        <tr>
            <th>formatType</th>
            <th>String</th>
            <th>日期连接符</th>
            <th>-</th>
        </tr>
    </table>
    
事件

|事件名称|说明  |
|--|--|
|  select|在选择日期时触发，返回选中的日期  |

示例

index.wxml

```
<calendar today="{{true}}" bind:select="select"></calendar>
```

index.json

```
"usingComponents": {
        "calendar": "../../../components/calendar/index"
    }
```
index.js

```
select(e) {
        console.log(e)
    },
```