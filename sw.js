/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2018/05/21/git/0.png","bd069bbbca4e2d1c0e2b4416df5dd14b"],["/2018/05/21/git/fetch_HEAD.png","10831dc4bae97a7504b7ff5209368861"],["/2018/05/21/git/gitlog.png","76841726e0cc211fbfaac8d9b273281a"],["/2018/05/21/git/git基本流程.png","ec6c0c1f69c4ed94b8ad0b881e40d469"],["/2018/05/21/git/git版本.png","42235a95fa69d23fee78b7ccf57af822"],["/2018/05/21/git/index.html","dbabb8f671211edd079ef934422b07a4"],["/2018/05/21/git/no-ff.png","4fae485fb0062c35d7ac9ea36f16b0d9"],["/2018/05/21/git/tracking.png","a1fb55bd83f8930da4cd25ee7b393180"],["/2018/05/21/git/分布式.png","36811a240cf686b00787ace6a723e2bf"],["/2018/05/21/git/集中式.png","5bbcfb2d2a77f7770f937a6a26cb3413"],["/2018/05/21/hexo建站指南/index.html","ed75c9bc93e41823d21b04db723f2dfd"],["/2018/05/21/hexo建站指南/js.png","fd78c647158c594390d124b234f23ac8"],["/2018/05/21/nodemon/index.html","aa648427488c4cf710e5726a695f0f6b"],["/2018/05/25/npx/index.html","5563111dec60f883d46a4dc3d319e9c9"],["/2018/05/25/微信公众号/index.html","bef06232fd2fab5ba8c3e872cd53dc16"],["/2018/05/25/微信公众号/公众号权限.jpg","5307779292b4d88c413aca4b5d6242c7"],["/2018/05/25/微信公众号/微信交互过程.jpg","bb87b9e4b5001779dd4d365cbe6af33d"],["/2018/05/25/微信公众号/验证公众号.jpg","72540fb2be5ced94c709b6a8f1a1b85b"],["/2018/05/29/gulp/index.html","5231b1b4ce5e28d91ca088c76e5dfdd9"],["/2018/05/30/gulp插件/index.html","0c784469292ad4f817f0e1a688ff69ab"],["/2018/05/31/es6快学/index.html","4b9a2afa62c87eb0a992b072089b07e6"],["/2018/06/11/小程序/index.html","dbdfd167dca06b2062a8b57ea6958026"],["/2018/06/11/小程序/图片1.png","a70e2059dbd63d02de44cb09783642f7"],["/2018/06/11/小程序/图片10.png","253b5cb5d64d8a085a939479cbd82c61"],["/2018/06/11/小程序/图片11.png","2394147ba042004e52c563dab2566e86"],["/2018/06/11/小程序/图片12.png","15685ed43535dcd8f669a3a62d0c944c"],["/2018/06/11/小程序/图片13.png","6ddfee2874af19fdda5457a6ebb07a4a"],["/2018/06/11/小程序/图片2.png","17cf31e03a529dd16d30cdba237d261b"],["/2018/06/11/小程序/图片3.png","4c418c305ea29c2652073b3fb2f60e9c"],["/2018/06/11/小程序/图片4.png","1dd0a93c3455171775630e16ba06d315"],["/2018/06/11/小程序/图片5.png","9b2af48344d07f6b52939b2f7f411eeb"],["/2018/06/11/小程序/图片6.png","2113900dc3174e66b31dce4265e8b3e4"],["/2018/06/11/小程序/图片7.png","5a03ad0f423874e9a55ea00ab5fe7567"],["/2018/06/11/小程序/图片8.png","a6e291f21158b3c9ea65cba5ca508458"],["/2018/06/11/小程序/图片9.png","ce85efe0c14262c802704c8a87df61fa"],["/2018/06/12/css/TIM截图20180612152920.jpg","90ec841c094cba227458755449a4cee2"],["/2018/06/12/css/index.html","e8e9af7118fe041dcbf0d371eed2f2f4"],["/2018/06/12/微信直播/index.html","e7e0fa1a7a76858fd28580dac8f92f18"],["/2018/06/12/文本样式/font-weight.jpg","5ff1244ea47b3c5561e587036c66c695"],["/2018/06/12/文本样式/index.html","0cfb634fd54039b6c36637821eec5e0d"],["/2018/06/12/文本样式/字体.png","c38e59b8c80d76400ee9802270ad0034"],["/2018/06/12/文本样式/字体族.jpg","b2de214630030f8e2e50a13b670f9ac8"],["/2018/06/12/文本样式/通用字体族.jpg","c0496ec92b179d44b46f60c10fdf285d"],["/2018/06/13/浮动/float.jpg","195047130f66f69bd8e14a7b2ae85f2e"],["/2018/06/13/浮动/index.html","9a05ff97db9dd9159864a5c2cee0e349"],["/2018/06/14/定位与堆叠/absolute.jpg","2371e331ad81280b2788fd2e56aad0c7"],["/2018/06/14/定位与堆叠/index.html","ad5adb9d221ca32c7091e86b5bcaf55d"],["/2018/06/14/定位与堆叠/z-index.png","c148506f5397247c847de3514432b6dd"],["/2018/06/14/定位与堆叠/堆叠上下文.jpg","283475ec7454d34584f1c9c7f7526345"],["/2018/06/14/定位与堆叠/堆叠上下文2.jpg","f0e76597c4d8e71daa40deae8f450624"],["/2018/06/14/层叠继承和css单位/hsl.jpg","daf4d3b2f7a4e41fc4c7b9b3fd187537"],["/2018/06/14/层叠继承和css单位/index.html","d2c9a2c1b428adf866fabbff52e811a1"],["/2018/06/14/层叠继承和css单位/specificityimg.png","c409c760c0bee888743dc2697303bbf2"],["/2018/06/14/盒模型/boxmodel.jpg","182d83d8c0f7ed736753d56aeb33f9f5"],["/2018/06/14/盒模型/index.html","54d6cabd9d1ab445f9588d455fb5e5d4"],["/2018/06/14/盒模型/块级元素.png","ac0f46d33990a8c334393f2756c8b566"],["/2018/06/14/盒模型/盒子.jpg","f24b489edc37893b648f204bd09e6b59"],["/2018/06/14/盒模型/行级盒子.png","1de67777abd275e145a9d723540b8696"],["/2018/06/15/排版细节/index.html","6acd19b7b999a2e749f3eb776eebba45"],["/2018/06/15/排版细节/line-box.png","804f848fe0559f5878bbec084365c0c7"],["/2018/06/15/排版细节/line-height.jpg","8579db767ab7a063d10d9d08f808d61f"],["/2018/06/15/排版细节/list-style-position.jpg","8b4712167cf42e8912e4e7104df16c54"],["/2018/06/15/排版细节/ver.jpg","4113f24f1cedc05e125402dd2f4e0929"],["/2018/06/15/排版细节/vertical-box.jpg","9affd804dcbba504208259ab28cded5e"],["/2018/06/15/排版细节/行级格式化上下文.png","be81f02d35b6a40fa70bc5ac660b457e"],["/2018/06/19/动画/index.html","d50b7612bea8819425f29133a346ecc4"],["/2018/06/19/布局/Grid.jpg","26a0d2148046f3b32296322161e49b1b"],["/2018/06/19/布局/align-content.png","d037edf6132bfcde471a8758368c7afe"],["/2018/06/19/布局/align-items.png","390dc826058dea5b0c438b756f76efa0"],["/2018/06/19/布局/flex-direction.jpg","032c7d0177e1e7f7dc80ff544401ee66"],["/2018/06/19/布局/index.html","dc4c83ca26d1d2852b93db9e0d758bf8"],["/2018/06/19/布局/justify-content.png","808ddfdbafc273f8e5a67a5200779709"],["/2018/06/19/布局/主轴.png","c5d1828f3d186ca4b7dc4f7f94262b96"],["/2018/06/19/布局/伪等高.jpg","4869df0907a355d589c8472206df4124"],["/2018/06/19/布局/兼容性.jpg","84f9642da96a50308abf0b5199823fe4"],["/2018/06/19/布局/展示.jpg","282e4e875fc3c895c8cc83316c64d664"],["/2018/06/20/兼容性/index.html","bb639e774d82c2e30d4dc277b2448023"],["/2018/06/20/兼容性/supports.jpg","f58791c8f5287c8038a47fefc95734b5"],["/2018/06/20/响应式设计/index.html","e0e7b2164ddd0dd793bbcb70858b9ed4"],["/2018/06/20/响应式设计/网格.png","42bc34cd435f54ca5a82e600ebc2cf60"],["/2018/06/20/工程化/Media.jpg","add9300d6b7e82aa209213a6af4e58a3"],["/2018/06/20/工程化/index.html","483a755f522fef9b33d99dc1f5f46f40"],["/2018/06/20/工程化/文件结构.png","01319361f90fdbce13db10a654699be2"],["/2018/06/20/高级选择器/index.html","2a041676b86c5f7334472647e5af1d06"],["/2018/06/21/html简述与文本/index.html","881cc0bbb8d49fa4e620d01e18f44d48"],["/2018/06/21/html简述与文本/网页总体结构.png","525e10b1bbf3187d956442d069429ead"],["/2018/06/21/text-size-adjust使用汇总/index.html","3bc6aaa44674a8a5940a3c6bda893bb6"],["/2018/06/21/表单/index.html","2ba466b43f1944c8b627e6a0bfd375ca"],["/2018/06/21/表格/index.html","a99e6b9269b9193f21bf17acac8bb16f"],["/2018/06/21/表格/table.png","246ed67c73c604feeb989e33a04f85d8"],["/2018/06/21/连接与图片/href.jpg","35d9804506bd416ba61bd8aaadc60b44"],["/2018/06/21/连接与图片/index.html","500ef304947fddcdfe5ff25751ba1db0"],["/2018/06/24/HTML补充知识/index.html","04c06cf7be3784bb54ad48463c0b48f9"],["/2018/06/26/node深研/index.html","6844855addc3eed38f8c0d314835825a"],["/2018/06/26/node深研/node.jpg","3a772fd012b29957cb58e9f970a57ed0"],["/2018/06/26/node深研/nodeloop.png","3228e8674a48daffa748ec1bbe57005c"],["/2018/06/26/node深研/nodepoll.png","b9b30c76b65c0bd5a5c15fd293f736c0"],["/2018/06/26/node深研/node中执行.png","a55b9b539d01c5d80b307ed6d00b4f99"],["/2018/06/26/node深研/浏览器EventLoop.jpg","75b404807ad79b3c6793e22b7bb4fa99"],["/2018/06/26/node深研/浏览器执行.png","261c1097d6ddb15ccaab17f1e7146ccd"],["/2018/06/26/node深研/非node.jpg","60799224a7296b67e6aab80cfff07cfb"],["/2018/07/05/css预处理器/index.html","15c7c675da248acdea560b6180600a84"],["/2018/07/06/css框架bootstarp/index.html","a9217cc829765c23828f5c9e64d0a7fb"],["/2018/07/06/css框架bootstarp/响应式.png","344bbc8c625bdaf12adacf6e486839ea"],["/2018/07/06/框架中的css/index.html","aa0224e8cfe4b2cb2666f5705cb6b283"],["/2018/07/06/框架中的css/video.jpg","e2beddb9d11146a7dd7f6fbc25449e71"],["/2018/07/06/框架中的css/开启shadowDom.png","4f5696d1d56bcdad51ff818a5a355620"],["/2018/07/09/HTML汇总/HTML版本.jpg","a2de2f22a0e5e32c132b9e194b124e3f"],["/2018/07/09/HTML汇总/flow.jpg","cc556f4c7918f1084c078fadc496bf56"],["/2018/07/09/HTML汇总/index.html","d9d081f803989a093495ad32799a829f"],["/2018/07/09/HTML汇总/viewport.jpg","3433e5a1a8d68dca799f8de98090616e"],["/2018/07/09/css动画/index.html","ace7308860388938a3f63b573785b559"],["/2018/07/09/css动画/timing.jpg","11381af2541edf17105dc5fb78a78595"],["/2018/07/09/css动画/关键帧动画.png","8b97823ef80053e1e4bf5be149f5b442"],["/2018/07/09/css动画/补间动画.jpg","fd1fe81cdad4b55be69df95e3564b2ff"],["/2018/07/09/css动画/逐帧动画.png","979dcead8f1267ae3ffd9dd7baba04f3"],["/2018/07/10/css工程化/BrowserList.jpg","531d83232ff6665f1923b88bc0e0cc93"],["/2018/07/10/css工程化/cssnext.jpg","7335e813a1c17987a0abceebf5f3aae9"],["/2018/07/10/css工程化/index.html","437951cee750dc63a82112baa66f739e"],["/2018/07/10/css工程化/postcss.jpg","04bcb1c638cc01f4bee3aa8f00ee0794"],["/2018/07/10/css效果/3d.jpg","cf03dc97e063fbbbfbe94a3e7a13f742"],["/2018/07/10/css效果/box-shadow.png","df23506b9fe84b10b30e51a1e255301c"],["/2018/07/10/css效果/index.html","0b47b8c23b1c3128a430a817ec46fb70"],["/2018/07/10/css效果/svg.jpg","eb4d637e191675b85c0015a9d27ce0eb"],["/2018/07/10/css效果/transform.jpg","a80701f47cf5ecda171d3506cce6933a"],["/2018/07/23/promise详解/generator.png","f4fcfef52f06a98d5a75871a8597673c"],["/2018/07/23/promise详解/index.html","5dcabdad0bfbcee0f232a64432931f6f"],["/2018/07/25/babel/index.html","7429578b3eb488a43fb457d88565e5f3"],["/2018/07/25/mobx/index.html","bb9eeaefa27ee69f397461cf2914c5de"],["/2018/08/08/TCP/index.html","3875cded1d39a93bbdac6ae9b9dc66c4"],["/2018/08/08/TCP/osi7层模型.jpg","c381afbb827d435be07280d3853cf850"],["/2018/08/29/vscode插件/00-400x264.png","e90d695457081461db2b05d952d61366"],["/2018/08/29/vscode插件/01-400x445.png","87c3e3f2fefb71eadde6352424f423a0"],["/2018/08/29/vscode插件/02-400x189.png","b9edb62ee6cf2463e9b81dafff455033"],["/2018/08/29/vscode插件/03-400x75.png","8abe946ffe1e5a0098bfcf775c17fde8"],["/2018/08/29/vscode插件/04.png","2067b3880ffe4e5aea78a4c6721a7d3e"],["/2018/08/29/vscode插件/1.png","6d96b9deb30059b657aeb654b30fee26"],["/2018/08/29/vscode插件/2.png","1bad6dfb64a3994a83f026261efd4cbd"],["/2018/08/29/vscode插件/20180815183752751.png","9527477ba23943ba6374f97308b18786"],["/2018/08/29/vscode插件/20180815183812965.png","9c4f06e8431751d5a2db56107a1dc3c2"],["/2018/08/29/vscode插件/20180815183830941.png","0451b90e09e7a1d6ba9e1de539c65a97"],["/2018/08/29/vscode插件/index.html","ba5aad8730c640ac1bfea8c515a7132e"],["/2018/09/05/浏览器渲染/chromium.jpg","24d65d9aea03aad1b6b61fec5e14fa38"],["/2018/09/05/浏览器渲染/index.html","fbb817240371c8345eb40a2d758476fc"],["/2018/09/05/浏览器渲染/webkit架构图.jpg","4e8c7ccf92374f0f5480d0c8cef265a3"],["/2018/09/05/浏览器渲染/浏览器渲染.jpg","688510d10251aeeb7aebe99cac44785a"],["/2018/09/05/浏览器渲染/渲染引擎.jpg","0e5bd1558438622e0f387518198b85c9"],["/2018/09/05/浏览器渲染/网络栈.jpg","4f6fb8c4708d291eba0160bbde00bce4"],["/2018/09/05/浏览器渲染/进程.jpg","4a870c3f4bf74468496142621b70643b"],["/2018/09/06/前端性能优化/index.html","e2161f7fea7c0dc66618ead83adb816e"],["/2018/09/17/前端设计模式/index.html","f02ad566e3137ee455986f41d7ce3f96"],["/2018/09/20/vue-MVVM实现/index.html","f68958d3092f9c117b07b4aab0035607"],["/2018/12/03/Mocha与chai/index.html","fb789f315a359021f5685a9a666f3953"],["/2018/12/03/test-1/index.html","d9b974a2397f8a87063f2ab1c100044d"],["/2018/12/04/Jest/index.html","8947f6cbeb437dc2379a1cc77bc3c30d"],["/2018/12/04/enzyme/index.html","f816e268facdd5bbf603932db437850e"],["/2018/12/06/cypress/index.html","c9a067f28aba9179c57f076ecc12505f"],["/404.html","dcbc8f26884308ebbc8b533c45608587"],["/archives/2018/05/index.html","ef351c17f5d94a04a844933b79424524"],["/archives/2018/06/index.html","5d4b832e411d4055f477c094ae0bf70a"],["/archives/2018/06/page/2/index.html","ad5210676687ebdf6c1f4732095025c1"],["/archives/2018/06/page/3/index.html","b2907728f4ffa1a08ae77f33418e882c"],["/archives/2018/07/index.html","6a5485a285d3bc4415a3eb95d8d22907"],["/archives/2018/08/index.html","e72e55163cb50c015561f4c896f1b83d"],["/archives/2018/09/index.html","444f97de84297ae6cf5fc36013106699"],["/archives/2018/12/index.html","595d6538e4927bd7c09f69ece0805721"],["/archives/2018/index.html","6a5b80393d70a8adb4fc84d49d79812e"],["/archives/2018/page/2/index.html","060d102b8a1e0769932117ce8a6ece48"],["/archives/2018/page/3/index.html","569b33587f4fb31aef1eaf572e6b7b25"],["/archives/2018/page/4/index.html","e208622e1f51d6a6553a341c318d2be6"],["/archives/2018/page/5/index.html","4301cf6b9a9cbf79e3d26e41e8bcd2e8"],["/archives/2018/page/6/index.html","1283c89704d31f40fd31b694b8701a70"],["/archives/index.html","034bada53a73be9cd3b5e58dd47031b3"],["/archives/page/2/index.html","1b2664e83f60328792005b726331c363"],["/archives/page/3/index.html","82a5f685b6c037a3e09431e6ec02962c"],["/archives/page/4/index.html","14025ff94cd9c2e0381f2b579ae9eee1"],["/archives/page/5/index.html","3c3cf52ceac831832e4f622006e0ac19"],["/archives/page/6/index.html","c85156435c2cb4f19e2d4322e2cf1f20"],["/bundle.js","3cf8ab2eedb168aa56078bfb5b719543"],["/css/main.css","2191fdbcb7da6cbfaacc712dad232b17"],["/images/algolia_logo.svg","fd40b88ac5370a5353a50b8175c1f367"],["/images/apple-touch-icon-next.png","fce961f0bd3cd769bf9c605ae6749bc0"],["/images/avatar.gif","2bed513bc5f13733cf9a8a12c4e1a971"],["/images/cc-by-nc-nd.svg","1c681acc4a150e7236254c464bb5a797"],["/images/cc-by-nc-sa.svg","12b4b29e8453be5b7828b524d3feabce"],["/images/cc-by-nc.svg","dd9cfe99ed839a4a548114f988d653f4"],["/images/cc-by-nd.svg","2d80546af20128215dc1e23ef42d06c2"],["/images/cc-by-sa.svg","c696b3db81cbbfba32f66c1dc88b909a"],["/images/cc-by.svg","6c4f8422b3725cb9f26b6c00e95fc88b"],["/images/cc-zero.svg","79deee77a07fcb79ff680ac0125eacb9"],["/images/favicon-16x16-next.png","b8975923a585dbaa8519a6068e364947"],["/images/favicon-32x32-next.png","5a029563fe3214c96f68b46556670ea1"],["/images/loading.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/logo.svg","ddad9027e42111ccd5b466bc18188970"],["/images/placeholder.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/quote-l.svg","1238a4baccd02c6025ec85b58f4282d4"],["/images/quote-r.svg","85787c6fa27965c81f7be70252b43bed"],["/images/searchicon.png","3d6b5c9d6d6c26a2b76a14b8fdf3438a"],["/index.html","bbee0b9dbf435ff60b39a4c70488ac75"],["/js/src/affix.js","683c19859764baf0d17538897ea1eba2"],["/js/src/algolia-search.js","f5fa392318805997089ceb3a925979ba"],["/js/src/bootstrap.js","2a1083772854ae2663748e0a25c17285"],["/js/src/exturl.js","2b444179b3145e5007b4d371dac07cd3"],["/js/src/hook-duoshuo.js","45997b0c06abff3cd88efd901f614065"],["/js/src/js.cookie.js","6e9eb1f53afb135aedaf90739c867738"],["/js/src/motion.js","0f6add86607c451269d0b3d286c84d8b"],["/js/src/post-details.js","b8e8e27c27c697567879c52888ffc24c"],["/js/src/schemes/pisces.js","827b5ad25e1142277c1e7dfe0cacebe5"],["/js/src/scroll-cookie.js","890406ae3539e4721ef5f314542e5e46"],["/js/src/scrollspy.js","fafdd7ab6af233b701506c733910b7f5"],["/js/src/utils.js","24512c3455f976730b7bf75e1222c533"],["/lib/Han/dist/font/han-space.woff","b09f2dd7d3ad8ad07f3b8495133909d9"],["/lib/Han/dist/font/han.woff","e841c6b547bc06a06f60f4de52bf906e"],["/lib/Han/dist/font/han.woff2","2b06aa1c952a2dfaf00d99218689d147"],["/lib/Han/dist/han.css","cfcc552e7aebaef5e2f34aee030b956b"],["/lib/Han/dist/han.js","575b6c1667c01798730fbd972e959c9c"],["/lib/Han/dist/han.min.css","cab466d758269b437167422c4a16b364"],["/lib/Han/dist/han.min.js","96482c9c2b3c5ea9bf5a40db162c7f34"],["/lib/algolia-instant-search/instantsearch.min.css","029a13b44e6807955106ff3c075a02f9"],["/lib/algolia-instant-search/instantsearch.min.js","0db46eba0c8133693ee839507b1612f2"],["/lib/canvas-nest/canvas-nest.min.js","36e103d2a05bc706bac40f9ab8881eb7"],["/lib/canvas-ribbon/canvas-ribbon.js","16dc214240913551986593808c2efcfc"],["/lib/fancybox/source/blank.gif","325472601571f31e1bf00674c368d335"],["/lib/fancybox/source/fancybox_loading.gif","328cc0f6c78211485058d460e80f4fa8"],["/lib/fancybox/source/fancybox_loading@2x.gif","f92938639fa894a0e8ded1c3368abe98"],["/lib/fancybox/source/fancybox_overlay.png","77aeaa52715b898b73c74d68c630330e"],["/lib/fancybox/source/fancybox_sprite.png","783d4031fe50c3d83c960911e1fbc705"],["/lib/fancybox/source/fancybox_sprite@2x.png","ed9970ce22242421e66ff150aa97fe5f"],["/lib/fancybox/source/helpers/fancybox_buttons.png","b448080f8615e664b7788c7003803b59"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.css","cac75538c2e3ddfadef839feaca8e356"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.js","f53c246661fb995a3f12e67fa38e0fa0"],["/lib/fancybox/source/helpers/jquery.fancybox-media.js","c017067f48d97ec4a077ccdf056e6a2e"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.css","52ddd84a9f42c1d4cd86d518a7f7e8bc"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.js","cf1fc1df534eede4cb460c5cbd71aba6"],["/lib/fancybox/source/jquery.fancybox.css","6c55951ce1e3115711f63f99b7501f3a"],["/lib/fancybox/source/jquery.fancybox.js","921e9cb04ad6e2559869ec845c5be39b"],["/lib/fancybox/source/jquery.fancybox.pack.js","cc9e759f24ba773aeef8a131889d3728"],["/lib/fastclick/README.html","b3cd6e7f930bf6e410a2e7eab8a148a8"],["/lib/fastclick/lib/fastclick.js","6e9d3b0da74f2a4a7042b494cdaa7c2e"],["/lib/fastclick/lib/fastclick.min.js","a0fc6c24d1f3ff9ac281887c92b24acd"],["/lib/font-awesome/css/font-awesome.css","c495654869785bc3df60216616814ad1"],["/lib/font-awesome/css/font-awesome.min.css","269550530cc127b6aa5a35925a7de6ce"],["/lib/font-awesome/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["/lib/font-awesome/fonts/fontawesome-webfont.svg","912ec66d7572ff821749319396470bde"],["/lib/font-awesome/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["/lib/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["/lib/font-awesome/fonts/fontawesome-webfont.woff2","af7ae505a9eed503f8b8e6982036873e"],["/lib/jquery/index.js","32015dd42e9582a80a84736f5d9a44d7"],["/lib/jquery_lazyload/CONTRIBUTING.html","7287727950845c8a1010f3933691afef"],["/lib/jquery_lazyload/README.html","d89aa4afe316331a25b636b5ead4716e"],["/lib/jquery_lazyload/jquery.lazyload.js","8b427f9e86864ee3aaf1ae33e6e14263"],["/lib/jquery_lazyload/jquery.scrollstop.js","f163fd8f02361928853668a96f8a1249"],["/lib/needsharebutton/font-embedded.css","dd8861d10d1ed6b5e0c0011adfb39be9"],["/lib/needsharebutton/needsharebutton.css","30f2f800e13f7b6b83629a4cbd9749ef"],["/lib/needsharebutton/needsharebutton.js","6c6f855f7d50f4bc3c804f52b03bbfbb"],["/lib/pace/pace-theme-barber-shop.min.css","e8dc66cf2d88abc25fbc89b8a0529abb"],["/lib/pace/pace-theme-big-counter.min.css","db2b8fe31e60f19021545277d2f6e05e"],["/lib/pace/pace-theme-bounce.min.css","ad954aa0bace4b213eeb19d6e89a0bda"],["/lib/pace/pace-theme-center-atom.min.css","8f6bc803acefc6f93afc98fb38201456"],["/lib/pace/pace-theme-center-circle.min.css","93c72298781226a80a9c66b27b21a57d"],["/lib/pace/pace-theme-center-radar.min.css","f0099bdd1cd42e9476bd7abc417c0328"],["/lib/pace/pace-theme-center-simple.min.css","eddff4756dbf21dbbff1c543bd894dde"],["/lib/pace/pace-theme-corner-indicator.min.css","776826157cb28ac1ee5e78771292b9ba"],["/lib/pace/pace-theme-fill-left.min.css","965859b39001da08e1e92327fe3d8e12"],["/lib/pace/pace-theme-flash.min.css","aab39b436e1fa0fdc51df06f2d53c38a"],["/lib/pace/pace-theme-loading-bar.min.css","4e05877f1f9efb9c1e7dd75cb78c764f"],["/lib/pace/pace-theme-mac-osx.min.css","29ae030ceaa8158352c5472218375b91"],["/lib/pace/pace-theme-minimal.min.css","f48f04d370993b55a2745e548cc82743"],["/lib/pace/pace.min.js","24d2d5e3e331c4efa3cda1e1851b31a7"],["/lib/three/canvas_lines.min.js","1324174ae6190fbf63b7bf0ad0a8a5bd"],["/lib/three/canvas_sphere.min.js","5c6bc45b137448b5b9df152ccfb2659c"],["/lib/three/three-waves.min.js","41059bd5e5c7aa520b1b411919e5121f"],["/lib/three/three.min.js","3298078bce82bdb1afadf5b1a280915e"],["/lib/ua-parser-js/dist/ua-parser.min.js","a6e833266c4b41fabb9ba94a145322d8"],["/lib/ua-parser-js/dist/ua-parser.pack.js","6b627e4d61a7135952824bb9c1a4a134"],["/lib/velocity/velocity.js","0361fa6dcf4cf4d19c593cdab0937dd0"],["/lib/velocity/velocity.min.js","c1b8d079c7049879838d78e0b389965e"],["/lib/velocity/velocity.ui.js","f55d22cc592c9f8d4ffd3b41a6b90081"],["/lib/velocity/velocity.ui.min.js","444faf512fb24d50a5dec747cbbe39bd"],["/live2dw/assets/moc/hibiki.2048/texture_00.png","730252369524e7a1c21308cb84acd465"],["/live2dw/lib/L2Dwidget.0.min.js","7d6ea3548b666c761bfb3a01f25ae87d"],["/live2dw/lib/L2Dwidget.min.js","0c58a1486de42ac6cc1c59c7d98ae887"],["/page/2/index.html","2740152d035a53bed8bd0b1b073d5961"],["/page/3/index.html","b84a58b143bdd1f421d1c4fdbdf44f7e"],["/page/4/index.html","90120c08cc054996705ca2ebfb597a48"],["/page/5/index.html","414f809d47fc8cdd563dd96745a0cd4b"],["/page/6/index.html","e9066d95ad867ff914e2f3d321368d8e"],["/style.css","59382be79f56314919541bbbcd43722e"],["/sw-register.js","784bfe9c3d8f5fe70241203f97107512"],["/tags/Event-Loop/index.html","f93eee7c88b5cbf5b203f0997b4208f8"],["/tags/HTML汇总/index.html","8b8375d7b141fc93f739fb40d0b82aee"],["/tags/MVVM/index.html","2327d681cf004afa0de2f52aef18bb02"],["/tags/babel/index.html","4488e775d1c608668066768e48093813"],["/tags/blog/index.html","e89f98cfd9ccb4c31fc63d0d33f5f096"],["/tags/bootstrap/index.html","281036f1abf5af32d5b22811beada63f"],["/tags/css/index.html","dc4c97aea2538eb551495f6a1256615d"],["/tags/css/page/2/index.html","3ea02fe3c357184150bf2bd715aa6637"],["/tags/css动画/index.html","e7e501572e827940e801095e91f32591"],["/tags/css工程化/index.html","04142e1105eb1afda35e0a3430212ad5"],["/tags/css效果/index.html","3b494c030fd3828d2c9578ad1dd35e9c"],["/tags/cypress/index.html","2107c92761849c67690bb1883548e44e"],["/tags/e2e/index.html","1525f1bf084cb8c8990d6e8048ce4148"],["/tags/enzyme/index.html","f5cc47c9989f7f109825d798d86e456b"],["/tags/es6/index.html","279cb4d4076f3efface8670e67918d67"],["/tags/git/index.html","d759ee9193401e70d45eda83aae68c96"],["/tags/global/index.html","24f307d3bc9a81ba6fa4b259c5ddd3b1"],["/tags/gulp/index.html","d5594e479f69a57f867c5aade6c4f3d3"],["/tags/hexo/index.html","ee0b980946e09430c4660104c9b1f395"],["/tags/html/index.html","1b9c4132a937021d816f960c6063321b"],["/tags/http/index.html","d8b04a689617e17af2de07ffd2d3635d"],["/tags/index.html","0d60fc5fbdda51ae6a34c4cd8634f641"],["/tags/jest/index.html","e74997e7ae39ad6cd08800c78f632c5a"],["/tags/js/index.html","0524834deeb99812e0aa2531eecc3c78"],["/tags/node/index.html","0191e5cb496753040e0a0f4c10d70661"],["/tags/nodemon/index.html","cba929318d4c077b91d8cd9762922f7c"],["/tags/npx/index.html","26f48918e7b93b1bdd477f95d3e04789"],["/tags/promise/index.html","10e76a682e93c30b6051f9f0d31265b6"],["/tags/react/index.html","d30ad6b8932df84abeebea2b02e2349e"],["/tags/tcp/index.html","01eea6956145bf3f5f79d1ccdb85772e"],["/tags/test/index.html","8c3a7c2a1372ed8c5a8dcd76a01d9b0f"],["/tags/vscode/index.html","9d727555857b732c20eab7c413453d67"],["/tags/vscode插件/index.html","68d66e18d118111abd7e17f4ecfc9282"],["/tags/vue/index.html","0fb208fde54894fd2383a2f0104b9246"],["/tags/前端基础/index.html","0c43bd2150b5768220f59179c78bcd1f"],["/tags/前端基础/page/2/index.html","40f34f91c3b621ed6dd5b6f239f4afb6"],["/tags/前端基础/page/3/index.html","6ee92eff0de6533a90c43dc5b6c9dffa"],["/tags/单元测试/index.html","d15a1d92c559b0aa2bed02ec1e9f9c90"],["/tags/小程序/index.html","4b45ff30942c82fb7134d79717753eb5"],["/tags/异步/index.html","fc0ea6309fd6414a55ea7b1620f98816"],["/tags/微信/index.html","3690831fb199c64cc96414bb8abc1266"],["/tags/性能优化/index.html","68285bbf188692fe339a5caf8673d0b4"],["/tags/插件/index.html","c70e7c5667b13e6ca33b7e13ec2067a6"],["/tags/构建工具/index.html","fde2c88a881dcd4d9032afe97c319620"],["/tags/架构/index.html","b3626907c23b47dc84203528b2854f74"],["/tags/框架中的css/index.html","3c001791f2962c6563d740e5049a4b0a"],["/tags/测试/index.html","d9283bd8c0050587c6585a02f0dc440e"],["/tags/浏览器/index.html","96286c9e706ddd76b976001d28afef52"],["/tags/浏览器渲染/index.html","1f3ea0454a0ae5717cf93fbd8d186bee"],["/tags/网路/index.html","42bfdacb2b12c2b8750fef629c63e76b"],["/tags/设计模式/index.html","f9858cf6d67bb9a977e052df9b4e36e4"],["/tags/预处理器/index.html","4a9bedd3934dbe86f96854c8bb8dabc2"],["/uploads/avatar.jpg","19392dd66f6175e4ea17280adf4db7e8"],["/uploads/wechatpay.jpg","dc08d8b0df0a37e3e11e78174709ba0f"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');
var firstRegister = 1; // 默认1是首次安装SW， 0是SW更新


var ignoreUrlParametersMatching = [/^utm_/];


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function (originalResponse) {
    // 如果没有重定向响应，不需干啥
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 及以下不知处 Response.body 流, 所以我们需要读取整个body以blob形式返回。
    var bodyPromise = 'body' in originalResponse ?
        Promise.resolve(originalResponse.body) :
        originalResponse.blob();

    return bodyPromise.then(function (body) {
        // new Response() 可同时支持 stream or Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};

var createCacheKey = function (originalUrl, paramName, paramValue,
    dontCacheBustUrlsMatching) {

    // 创建一个新的URL对象，避免影响原始URL
    var url = new URL(originalUrl);

    // 如果 dontCacheBustUrlsMatching 值没有设置，或是没有匹配到，将值拼接到url.serach后
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // 如果 whitelist 是空数组，则认为全部都在白名单内
    if (whitelist.length === 0) {
        return true;
    }

    // 否则逐个匹配正则匹配并返回
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function (whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // 移除 hash; 查看 https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // 是否包含 '?'
        .split('&') // 分割成数组 'key=value' 的形式
        .map(function (kv) {
            return kv.split('='); // 分割每个 'key=value' 字符串成 [key, value] 形式
        })
        .filter(function (kv) {
            return ignoreUrlParametersMatching.every(function (ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // 如果 key 没有匹配到任何忽略参数正则，就 Return true
            });
        })
        .map(function (kv) {
            return kv.join('='); // 重新把 [key, value] 格式转换为 'key=value' 字符串
        })
        .join('&'); // 将所有参数 'key=value' 以 '&' 拼接

    return url.toString();
};


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function (item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache.keys().then(function (requests) {
        // 如果原cacheName中没有缓存任何收，就默认是首次安装，否则认为是SW更新
        if (requests && requests.length > 0) {
            firstRegister = 0; // SW更新
        }
        return requests.map(function (request) {
            return request.url;
        });
    }).then(function (urls) {
        return new Set(urls);
    });
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return setOfCachedUrls(cache).then(function (cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
                        // 如果缓存中没有匹配到cacheKey，添加进去
                        if (!cachedUrls.has(cacheKey)) {
                            var request = new Request(cacheKey, { credentials: 'same-origin' });
                            return fetch(request).then(function (response) {
                                // 只要返回200才能继续，否则直接抛错
                                if (!response.ok) {
                                    throw new Error('Request for ' + cacheKey + ' returned a ' +
                                        'response with status ' + response.status);
                                }

                                return cleanResponse(response).then(function (responseToCache) {
                                    return cache.put(cacheKey, responseToCache);
                                });
                            });
                        }
                    })
                );
            });
        })
            .then(function () {
            
            // 强制 SW 状态 installing -> activate
            return self.skipWaiting();
            
        })
    );
});

self.addEventListener('activate', function (event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.keys().then(function (existingRequests) {
                return Promise.all(
                    existingRequests.map(function (existingRequest) {
                        // 删除原缓存中相同键值内容
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function () {
            
            return self.clients.claim();
            
        }).then(function () {
                // 如果是首次安装 SW 时, 不发送更新消息（是否是首次安装，通过指定cacheName 中是否有缓存信息判断）
                // 如果不是首次安装，则是内容有更新，需要通知页面重载更新
                if (!firstRegister) {
                    return self.clients.matchAll()
                        .then(function (clients) {
                            if (clients && clients.length) {
                                clients.forEach(function (client) {
                                    client.postMessage('sw.update');
                                })
                            }
                        })
                }
            })
    );
});



    self.addEventListener('fetch', function (event) {
        if (event.request.method === 'GET') {

            // 是否应该 event.respondWith()，需要我们逐步的判断
            // 而且也方便了后期做特殊的特殊
            var shouldRespond;


            // 首先去除已配置的忽略参数及hash
            // 查看缓存简直中是否包含该请求，包含就将shouldRespond 设为true
            var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
            shouldRespond = urlsToCacheKeys.has(url);

            // 如果 shouldRespond 是 false, 我们在url后默认增加 'index.html'
            // (或者是你在配置文件中自行配置的 directoryIndex 参数值)，继续查找缓存列表
            var directoryIndex = 'index.html';
            if (!shouldRespond && directoryIndex) {
                url = addDirectoryIndex(url, directoryIndex);
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 仍是 false，检查是否是navigation
            // request， 如果是的话，判断是否能与 navigateFallbackWhitelist 正则列表匹配
            var navigateFallback = '';
            if (!shouldRespond &&
                navigateFallback &&
                (event.request.mode === 'navigate') &&
                isPathWhitelisted([], event.request.url)
            ) {
                url = new URL(navigateFallback, self.location).toString();
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 被置为 true
            // 则 event.respondWith()匹配缓存返回结果，匹配不成就直接请求.
            if (shouldRespond) {
                event.respondWith(
                    caches.open(cacheName).then(function (cache) {
                        return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
                            if (response) {
                                return response;
                            }
                            throw Error('The cached response that was expected is missing.');
                        });
                    }).catch(function (e) {
                        // 如果捕获到异常错误，直接返回 fetch() 请求资源
                        console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                        return fetch(event.request);
                    })
                );
            }
        }
    });









/* eslint-enable */
