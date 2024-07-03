# window-ai

使用 window.ai 创建 ai 聊天

## 下载 chrome dev

[chrome dev](https://www.google.cn/intl/zh-CN/chrome/dev/next-steps.html)

## 启用 Gemini Nano 和 Prompt API

1、打开 `Chrome`， 在地址栏输入: `chrome://flags/#optimization-guide-on-device-model`，选择 `enable BypassPerfRequirement`，这步是绕过性能检查，确保 `Gemini Nano`能顺利下载。

2、再输入 `chrome://flags/#prompt-api-for-gemini-nano`，选择 `enable`。

3、重启 `Chrome` 浏览器。

## 确认 Gemini Nano 是否可用

1、按 `F12` 打开开发者工具， 在控制台输入 `await window.ai.canCreateTextSession()`，如果返回 `readily`，就说明 OK 了。

2、如果上面的步骤不成功，重启 `Chrome` 后继续下面的操作:

- 新开一个标签页，输入 `chrome://components`

- 找到 `Optimization Guide On Device Model`，点击 `Check for update`，等待一个世纪直到 `Status - Component updated` 出现就是模型下载完成。（模型版本号不低于 `2024.5.21.1031`）

3、模型下载完成后, 再次在开发者工具的控制台中输入`await window.ai.canCreateTextSession()`，如果这次返回 `readily`，那就 OK 了。

4、如果还是不行，可以等一会儿再试。多次尝试后仍然失败，请关闭此文章🐶。

# 感谢

```
作者：小明大白菜
链接：https://juejin.cn/post/7384997062415843339
来源：稀土掘金
```
