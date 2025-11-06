# 小程序编译管线（uni-app → mp-weixin）

## 流程
- pages.json → 生成 app.json/page.json
- .vue：script(babel) / template(uni-mp-loader→wxml) / style(wxss)
- 分包与 usingComponents、资源处理

## 调试
- --watch 增量编译 → 开发者工具监听 dist 刷新

## 常见兼容
- 禁用 eval 的 devtool、regeneratorRuntime、setData 优化
