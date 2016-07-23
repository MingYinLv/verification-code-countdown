# verification-code-countdown 验证码倒计时

### VCCD(config)

#### Arguments

1.`config:start` *(Number)*: 倒计时开始时间,默认值`59`.

2.`config:end` *(Number)*: 倒计时结束时间，默认值`0`.

3.`config:disabledCls` *(String)*: 倒计时过程中元素的样式，默认值`disabled`.

4.`config:inText` *(String)*: 倒计时过程中显示的文字，默认值`重发({i}s)`，会自动替换`{i}`为当前时间.

5.`config:callback` *(Function)*: 点击按钮后的回调函数，这里进行异步操作.

#### Returns `Object`

1.`destroy` *(Function)*: 销毁对象.

2.`start` *(Function)*: 开始倒计时，在`config:callback`中异步操作完成后调用.

3.`getNum` *(Function)*: 返回当前共进行过几次倒计时，每次调用`start`方法会加1.
