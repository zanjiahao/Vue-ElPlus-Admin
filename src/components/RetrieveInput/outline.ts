export const outline = {
  retrieveIptTip: `查询语法是由术语和运算符组成。<br>
      其中术语可以是单个单词或由双引号包围的短语，运算符可以自定义搜索。<br>
      举例如下：<br>
      1.status字段包含active      status:active<br>
      2.title字段包括quick或者brown     title:(quick OR brown) 或者 title:(quick brown)<br>
      3.author字段包含短语john smith   author:"John Smith"<br>
      4.first name字段包含Alice（请注意我们需要如何用反斜杠转义空格） first\ name:Alice<br>
      5.任何字段book.title、book content或者含quick或brown（请注意我们如何用反斜杠转义*) book.\*:(quick brown)<br>
      6.字段title具有任何非空值 _exists_:title<br>
      7.通配符搜索(?替换单个字符,*替换零个或多个字符)      qu?ck bro*<br>
      8.正则表达式搜索(正斜杠包装查询字符串)    name:/joh?n(ath[oa]n)/<br>
      9.模糊匹配(使用编辑距离来查找单词)    quikc~1 quikc~ brwn~ foks~<br>
      10.邻近搜索(使用编辑距离来查找短语)   "fox quick"~5<br>
      11.双范围查询(包含范围用方括号[最小值到最大值]指定，独占范围用花括号{min到max}指定)  <br>
      date:[2012-01-01 TO 2012-12-31] count:[1 TO 5]  tag:{alpha TO omega} count:[10 TO *] date:{* TO 2012-01-01}  count:[1 TO 5}、<br>
      12.单范围查询  age:>10 age:>=10 age:<10 age:<=10<br>
      13.推断查询(使用^)  quick^2 fox<br>
      14.分组查询(使用括号组合形成子查询)   status:(active OR pending)  title:(full text search)^2<br>
      15.布尔运算符(+,-,AND,OR ,NOT,&,| |,!)      quick brown +fox -news  ((quick AND fox) OR (brown AND fox) OR fox) AND NOT news<br>
      16.使用前导反斜杠对保留字,其中保留字为+、-、=、 &&、 ||、 > 、< 、! 、(、 )、 {、 }、 [、 ]、 ^、 "、 ~ 、*、 ?、 :、 \、 /。<br>`,
  placeholder: '请输入搜索内容，例如：message: "ERROR" AND source: "/var/log/message"'
}
