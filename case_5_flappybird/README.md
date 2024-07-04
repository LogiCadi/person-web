# FlappyBird

> h5版FlappyBird

## 源码目录介绍

```text

./js
├── base                                   // 定义游戏开发基础类
│   ├── DataStore.js                       // 变量缓存器，方便我们在不同的类中访问和修改变量
│   ├── ResourceLoader.js                  // 资源加载器 canvas在图片资源加载完毕后进行渲染
│   ├── Resource.js                        // 资源和路径
│   └── Sprite.js                          // 精灵的基类，负责初始化精灵加载的资源和大小以及位置
├── player
│   ├── Birds.js                           // 小鸟类
│   ├── Score.js                           // 记分器类
│   └── StartButton.js                     // 游戏开始按钮类
├── runtime
│   ├── BackGround.js                      // 背景
│   ├── UpPencil.js                        // 上障碍物
│   ├── DownPencil.js                      // 下障碍物
│   └── Land.js                            // 陆地
├── Director.js                            // 导演类
|
├── game.js                                // 游戏类
└── main.js                                // 游戏入口主函数

```