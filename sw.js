/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2018/05/21/git/0.png","bd069bbbca4e2d1c0e2b4416df5dd14b"],["/2018/05/21/git/fetch_HEAD.png","10831dc4bae97a7504b7ff5209368861"],["/2018/05/21/git/gitlog.png","76841726e0cc211fbfaac8d9b273281a"],["/2018/05/21/git/git基本流程.png","ec6c0c1f69c4ed94b8ad0b881e40d469"],["/2018/05/21/git/git版本.png","42235a95fa69d23fee78b7ccf57af822"],["/2018/05/21/git/index.html","04b80324e1d1ce23482dc3efe14265e1"],["/2018/05/21/git/no-ff.png","4fae485fb0062c35d7ac9ea36f16b0d9"],["/2018/05/21/git/tracking.png","a1fb55bd83f8930da4cd25ee7b393180"],["/2018/05/21/git/分布式.png","36811a240cf686b00787ace6a723e2bf"],["/2018/05/21/git/集中式.png","5bbcfb2d2a77f7770f937a6a26cb3413"],["/2018/05/21/hexo建站指南/index.html","580c0ea86c4ed00154447423ad4b29b4"],["/2018/05/21/hexo建站指南/js.png","fd78c647158c594390d124b234f23ac8"],["/2018/05/21/nodemon/index.html","b184fae201b12f735dc625e868884f97"],["/2018/05/25/npx/index.html","e429db62f88bd2fdb9a6d6b2c050ee62"],["/2018/05/25/微信公众号/index.html","b2a9d9d17468bb78570ab7bcef75d5af"],["/2018/05/25/微信公众号/公众号权限.jpg","5307779292b4d88c413aca4b5d6242c7"],["/2018/05/25/微信公众号/微信交互过程.jpg","bb87b9e4b5001779dd4d365cbe6af33d"],["/2018/05/25/微信公众号/验证公众号.jpg","72540fb2be5ced94c709b6a8f1a1b85b"],["/2018/05/29/gulp/index.html","5bf67f89f2c369313b62bcbd3e4a3645"],["/2018/05/30/gulp插件/index.html","fbe2c89caac9f351e6273155f6974beb"],["/2018/05/31/es6快学/index.html","e5a8fc390b8d5ab512661a3cc63c3692"],["/2018/06/11/小程序/index.html","9614a6c84674547723ff6f4b7e992e14"],["/2018/06/11/小程序/图片1.png","a70e2059dbd63d02de44cb09783642f7"],["/2018/06/11/小程序/图片10.png","253b5cb5d64d8a085a939479cbd82c61"],["/2018/06/11/小程序/图片11.png","2394147ba042004e52c563dab2566e86"],["/2018/06/11/小程序/图片12.png","15685ed43535dcd8f669a3a62d0c944c"],["/2018/06/11/小程序/图片13.png","6ddfee2874af19fdda5457a6ebb07a4a"],["/2018/06/11/小程序/图片2.png","17cf31e03a529dd16d30cdba237d261b"],["/2018/06/11/小程序/图片3.png","4c418c305ea29c2652073b3fb2f60e9c"],["/2018/06/11/小程序/图片4.png","1dd0a93c3455171775630e16ba06d315"],["/2018/06/11/小程序/图片5.png","9b2af48344d07f6b52939b2f7f411eeb"],["/2018/06/11/小程序/图片6.png","2113900dc3174e66b31dce4265e8b3e4"],["/2018/06/11/小程序/图片7.png","5a03ad0f423874e9a55ea00ab5fe7567"],["/2018/06/11/小程序/图片8.png","a6e291f21158b3c9ea65cba5ca508458"],["/2018/06/11/小程序/图片9.png","ce85efe0c14262c802704c8a87df61fa"],["/2018/06/12/css/TIM截图20180612152920.jpg","90ec841c094cba227458755449a4cee2"],["/2018/06/12/css/index.html","1fecd3dd3c605b6d8b99a6d5eb52aec8"],["/2018/06/12/微信直播/index.html","4f12c5f1000a3252481e5d043c24daa6"],["/2018/06/12/文本样式/font-weight.jpg","5ff1244ea47b3c5561e587036c66c695"],["/2018/06/12/文本样式/index.html","f7d5f5e004e9e4f9cd377906e0354566"],["/2018/06/12/文本样式/字体.png","c38e59b8c80d76400ee9802270ad0034"],["/2018/06/12/文本样式/字体族.jpg","b2de214630030f8e2e50a13b670f9ac8"],["/2018/06/12/文本样式/通用字体族.jpg","c0496ec92b179d44b46f60c10fdf285d"],["/2018/06/13/浮动/float.jpg","195047130f66f69bd8e14a7b2ae85f2e"],["/2018/06/13/浮动/index.html","4b55252727bf08f7898cf74a001b3fa5"],["/2018/06/14/定位与堆叠/absolute.jpg","2371e331ad81280b2788fd2e56aad0c7"],["/2018/06/14/定位与堆叠/index.html","98dc021abd2a469592fa1f34a21a13a5"],["/2018/06/14/定位与堆叠/z-index.png","c148506f5397247c847de3514432b6dd"],["/2018/06/14/定位与堆叠/堆叠上下文.jpg","283475ec7454d34584f1c9c7f7526345"],["/2018/06/14/定位与堆叠/堆叠上下文2.jpg","f0e76597c4d8e71daa40deae8f450624"],["/2018/06/14/层叠继承和css单位/hsl.jpg","daf4d3b2f7a4e41fc4c7b9b3fd187537"],["/2018/06/14/层叠继承和css单位/index.html","b8e2b09e0dea41795f83eb614c381b14"],["/2018/06/14/层叠继承和css单位/specificityimg.png","c409c760c0bee888743dc2697303bbf2"],["/2018/06/14/盒模型/boxmodel.jpg","182d83d8c0f7ed736753d56aeb33f9f5"],["/2018/06/14/盒模型/index.html","7ac85bf26d5ad6b29076625e22468182"],["/2018/06/14/盒模型/块级元素.png","ac0f46d33990a8c334393f2756c8b566"],["/2018/06/14/盒模型/盒子.jpg","f24b489edc37893b648f204bd09e6b59"],["/2018/06/14/盒模型/行级盒子.png","1de67777abd275e145a9d723540b8696"],["/2018/06/15/排版细节/index.html","709d0a659e31ce845b32e5f367381632"],["/2018/06/15/排版细节/line-box.png","804f848fe0559f5878bbec084365c0c7"],["/2018/06/15/排版细节/line-height.jpg","8579db767ab7a063d10d9d08f808d61f"],["/2018/06/15/排版细节/list-style-position.jpg","8b4712167cf42e8912e4e7104df16c54"],["/2018/06/15/排版细节/ver.jpg","4113f24f1cedc05e125402dd2f4e0929"],["/2018/06/15/排版细节/vertical-box.jpg","9affd804dcbba504208259ab28cded5e"],["/2018/06/15/排版细节/行级格式化上下文.png","be81f02d35b6a40fa70bc5ac660b457e"],["/2018/06/19/动画/index.html","309e8b5d6b817ac6b247c5585b8aadbd"],["/2018/06/19/布局/Grid.jpg","26a0d2148046f3b32296322161e49b1b"],["/2018/06/19/布局/align-content.png","d037edf6132bfcde471a8758368c7afe"],["/2018/06/19/布局/align-items.png","390dc826058dea5b0c438b756f76efa0"],["/2018/06/19/布局/flex-direction.jpg","032c7d0177e1e7f7dc80ff544401ee66"],["/2018/06/19/布局/index.html","5a8806fd2875c49a98cdc33cfe3fe5f4"],["/2018/06/19/布局/justify-content.png","808ddfdbafc273f8e5a67a5200779709"],["/2018/06/19/布局/主轴.png","c5d1828f3d186ca4b7dc4f7f94262b96"],["/2018/06/19/布局/伪等高.jpg","4869df0907a355d589c8472206df4124"],["/2018/06/19/布局/兼容性.jpg","84f9642da96a50308abf0b5199823fe4"],["/2018/06/19/布局/展示.jpg","282e4e875fc3c895c8cc83316c64d664"],["/2018/06/20/兼容性/index.html","b2700a43909d2e580f7a69eb371a1181"],["/2018/06/20/兼容性/supports.jpg","f58791c8f5287c8038a47fefc95734b5"],["/2018/06/20/响应式设计/index.html","b314928df066a1cc42ee6b8ea8ec2415"],["/2018/06/20/响应式设计/网格.png","42bc34cd435f54ca5a82e600ebc2cf60"],["/2018/06/20/工程化/Media.jpg","add9300d6b7e82aa209213a6af4e58a3"],["/2018/06/20/工程化/index.html","d13334dcc1c1ed96a4872d8ac21c2244"],["/2018/06/20/工程化/文件结构.png","01319361f90fdbce13db10a654699be2"],["/2018/06/20/高级选择器/index.html","9344fe0850af211ceaaf675165298e99"],["/2018/06/21/html简述与文本/index.html","2f4bb68ff14cc154680f46ae2fe8d85e"],["/2018/06/21/html简述与文本/网页总体结构.png","525e10b1bbf3187d956442d069429ead"],["/2018/06/21/text-size-adjust使用汇总/index.html","b4d514a3c1db997301643d63fcd64fa9"],["/2018/06/21/表单/index.html","14830ea4cf8e43958cc5540db6e3431a"],["/2018/06/21/表格/index.html","4f9ba078cb79ac7e06a228e294bd2bd1"],["/2018/06/21/表格/table.png","246ed67c73c604feeb989e33a04f85d8"],["/2018/06/21/连接与图片/href.jpg","35d9804506bd416ba61bd8aaadc60b44"],["/2018/06/21/连接与图片/index.html","ea699cd6eefad2b4d8d078e82ff35a99"],["/2018/06/24/HTML补充知识/index.html","38a6e4b831245f3151ea9d2be4966398"],["/2018/06/26/node深研/index.html","27c10caf509c44a533944c867c1963f4"],["/2018/06/26/node深研/node.jpg","3a772fd012b29957cb58e9f970a57ed0"],["/2018/06/26/node深研/nodeloop.png","3228e8674a48daffa748ec1bbe57005c"],["/2018/06/26/node深研/nodepoll.png","b9b30c76b65c0bd5a5c15fd293f736c0"],["/2018/06/26/node深研/node中执行.png","a55b9b539d01c5d80b307ed6d00b4f99"],["/2018/06/26/node深研/浏览器EventLoop.jpg","75b404807ad79b3c6793e22b7bb4fa99"],["/2018/06/26/node深研/浏览器执行.png","261c1097d6ddb15ccaab17f1e7146ccd"],["/2018/06/26/node深研/非node.jpg","60799224a7296b67e6aab80cfff07cfb"],["/2018/07/05/css预处理器/index.html","6a18a558d5400a8af48ee70e74161f1b"],["/2018/07/06/css框架bootstarp/index.html","86e8740de8625bd3e40d883748b13dd5"],["/2018/07/06/css框架bootstarp/响应式.png","344bbc8c625bdaf12adacf6e486839ea"],["/2018/07/06/框架中的css/index.html","f32b5d69350c64a9adf60a89d2d7d1fd"],["/2018/07/06/框架中的css/video.jpg","e2beddb9d11146a7dd7f6fbc25449e71"],["/2018/07/06/框架中的css/开启shadowDom.png","4f5696d1d56bcdad51ff818a5a355620"],["/2018/07/09/HTML汇总/HTML版本.jpg","a2de2f22a0e5e32c132b9e194b124e3f"],["/2018/07/09/HTML汇总/flow.jpg","cc556f4c7918f1084c078fadc496bf56"],["/2018/07/09/HTML汇总/index.html","cd629542d2b550bc8cd39b76f1ff4ab8"],["/2018/07/09/HTML汇总/viewport.jpg","3433e5a1a8d68dca799f8de98090616e"],["/2018/07/09/css动画/index.html","b81d97d5c0ab6715c5b1441e10dcc535"],["/2018/07/09/css动画/timing.jpg","11381af2541edf17105dc5fb78a78595"],["/2018/07/09/css动画/关键帧动画.png","8b97823ef80053e1e4bf5be149f5b442"],["/2018/07/09/css动画/补间动画.jpg","fd1fe81cdad4b55be69df95e3564b2ff"],["/2018/07/09/css动画/逐帧动画.png","979dcead8f1267ae3ffd9dd7baba04f3"],["/2018/07/10/css工程化/BrowserList.jpg","531d83232ff6665f1923b88bc0e0cc93"],["/2018/07/10/css工程化/cssnext.jpg","7335e813a1c17987a0abceebf5f3aae9"],["/2018/07/10/css工程化/index.html","53519828ba491c486dbf7f71e1ae5132"],["/2018/07/10/css工程化/postcss.jpg","04bcb1c638cc01f4bee3aa8f00ee0794"],["/2018/07/10/css效果/3d.jpg","cf03dc97e063fbbbfbe94a3e7a13f742"],["/2018/07/10/css效果/box-shadow.png","df23506b9fe84b10b30e51a1e255301c"],["/2018/07/10/css效果/index.html","3a3e90ecc11e0119fc8cc6e3d5803c4a"],["/2018/07/10/css效果/svg.jpg","eb4d637e191675b85c0015a9d27ce0eb"],["/2018/07/10/css效果/transform.jpg","a80701f47cf5ecda171d3506cce6933a"],["/2018/07/23/promise详解/generator.png","f4fcfef52f06a98d5a75871a8597673c"],["/2018/07/23/promise详解/index.html","e3099e6534c46a05338fd567b4697321"],["/2018/07/25/babel/index.html","6086f5038a4db4537a5be89ce0286be4"],["/2018/07/25/mobx/index.html","0cf516a35087c7fe9619b619c08c0ec6"],["/2018/08/08/TCP/index.html","0cf18f916643187ebfb156e73526c57a"],["/2018/08/08/TCP/osi7层模型.jpg","c381afbb827d435be07280d3853cf850"],["/2018/08/29/vscode插件/00-400x264.png","e90d695457081461db2b05d952d61366"],["/2018/08/29/vscode插件/01-400x445.png","87c3e3f2fefb71eadde6352424f423a0"],["/2018/08/29/vscode插件/02-400x189.png","b9edb62ee6cf2463e9b81dafff455033"],["/2018/08/29/vscode插件/03-400x75.png","8abe946ffe1e5a0098bfcf775c17fde8"],["/2018/08/29/vscode插件/04.png","2067b3880ffe4e5aea78a4c6721a7d3e"],["/2018/08/29/vscode插件/1.png","6d96b9deb30059b657aeb654b30fee26"],["/2018/08/29/vscode插件/2.png","1bad6dfb64a3994a83f026261efd4cbd"],["/2018/08/29/vscode插件/20180815183752751.png","9527477ba23943ba6374f97308b18786"],["/2018/08/29/vscode插件/20180815183812965.png","9c4f06e8431751d5a2db56107a1dc3c2"],["/2018/08/29/vscode插件/20180815183830941.png","0451b90e09e7a1d6ba9e1de539c65a97"],["/2018/08/29/vscode插件/index.html","b6ba6ec56ab90fbd7bfd3037abfc5478"],["/2018/09/05/浏览器渲染/chromium.jpg","24d65d9aea03aad1b6b61fec5e14fa38"],["/2018/09/05/浏览器渲染/index.html","790bdfb96929041fa94aa476b6708a83"],["/2018/09/05/浏览器渲染/webkit架构图.jpg","4e8c7ccf92374f0f5480d0c8cef265a3"],["/2018/09/05/浏览器渲染/浏览器渲染.jpg","688510d10251aeeb7aebe99cac44785a"],["/2018/09/05/浏览器渲染/渲染引擎.jpg","0e5bd1558438622e0f387518198b85c9"],["/2018/09/05/浏览器渲染/网络栈.jpg","4f6fb8c4708d291eba0160bbde00bce4"],["/2018/09/05/浏览器渲染/进程.jpg","4a870c3f4bf74468496142621b70643b"],["/2018/09/06/前端性能优化/index.html","01bad9ea1c7dc27c77325533373796df"],["/2018/09/17/前端设计模式/index.html","d8d2abb964a4d3842a4ba702a57c3aa9"],["/404.html","dcbc8f26884308ebbc8b533c45608587"],["/archives/2018/05/index.html","cbc843e3300d2e8a5b04a445aa1948bb"],["/archives/2018/06/index.html","dff930a816930b47eecc1b77a4c92a31"],["/archives/2018/06/page/2/index.html","10b97d030fec4445a9a4f98b55ca4fa9"],["/archives/2018/06/page/3/index.html","b18baaa6dbab3082c23ae91647df1b1c"],["/archives/2018/07/index.html","103abc3b8dadb503b0edef7796187cb6"],["/archives/2018/08/index.html","f4ba0713722c5c5cbc8ab2404c3d5ead"],["/archives/2018/09/index.html","930d0eb90ac866db11289d3d676e0422"],["/archives/2018/index.html","33967061c090db759e18c319cbaa18b2"],["/archives/2018/page/2/index.html","cf8c641396d1921086766f6c5f2b1dd2"],["/archives/2018/page/3/index.html","8fe299b7ee2da8dac74e1097dff3af4e"],["/archives/2018/page/4/index.html","31e07c7f9c33135ce7424c086ce80c52"],["/archives/2018/page/5/index.html","f0da100e611465108a12826215a1a7d2"],["/archives/index.html","5192495a551390690365e481da7f8614"],["/archives/page/2/index.html","54f6b902ad86a5ba66c42eaa3ec9f8e5"],["/archives/page/3/index.html","5f337c9f8f17855e9207713194dbd7d2"],["/archives/page/4/index.html","d6438f5322d2f5aa94573e0cb742992c"],["/archives/page/5/index.html","2e2ee79044994a505dfe7ceb78c1c61b"],["/bundle.js","3cf8ab2eedb168aa56078bfb5b719543"],["/css/main.css","07769ae31d43bc79a6a82d886c8c1ac9"],["/images/algolia_logo.svg","fd40b88ac5370a5353a50b8175c1f367"],["/images/apple-touch-icon-next.png","fce961f0bd3cd769bf9c605ae6749bc0"],["/images/avatar.gif","2bed513bc5f13733cf9a8a12c4e1a971"],["/images/cc-by-nc-nd.svg","1c681acc4a150e7236254c464bb5a797"],["/images/cc-by-nc-sa.svg","12b4b29e8453be5b7828b524d3feabce"],["/images/cc-by-nc.svg","dd9cfe99ed839a4a548114f988d653f4"],["/images/cc-by-nd.svg","2d80546af20128215dc1e23ef42d06c2"],["/images/cc-by-sa.svg","c696b3db81cbbfba32f66c1dc88b909a"],["/images/cc-by.svg","6c4f8422b3725cb9f26b6c00e95fc88b"],["/images/cc-zero.svg","79deee77a07fcb79ff680ac0125eacb9"],["/images/favicon-16x16-next.png","b8975923a585dbaa8519a6068e364947"],["/images/favicon-32x32-next.png","5a029563fe3214c96f68b46556670ea1"],["/images/loading.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/logo.svg","ddad9027e42111ccd5b466bc18188970"],["/images/placeholder.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/quote-l.svg","1238a4baccd02c6025ec85b58f4282d4"],["/images/quote-r.svg","85787c6fa27965c81f7be70252b43bed"],["/images/searchicon.png","3d6b5c9d6d6c26a2b76a14b8fdf3438a"],["/index.html","51a16e5dab01ebcd559b19c4131140b4"],["/js/src/affix.js","683c19859764baf0d17538897ea1eba2"],["/js/src/algolia-search.js","f5fa392318805997089ceb3a925979ba"],["/js/src/bootstrap.js","2a1083772854ae2663748e0a25c17285"],["/js/src/exturl.js","2b444179b3145e5007b4d371dac07cd3"],["/js/src/hook-duoshuo.js","45997b0c06abff3cd88efd901f614065"],["/js/src/js.cookie.js","6e9eb1f53afb135aedaf90739c867738"],["/js/src/motion.js","0f6add86607c451269d0b3d286c84d8b"],["/js/src/post-details.js","b8e8e27c27c697567879c52888ffc24c"],["/js/src/schemes/pisces.js","827b5ad25e1142277c1e7dfe0cacebe5"],["/js/src/scroll-cookie.js","890406ae3539e4721ef5f314542e5e46"],["/js/src/scrollspy.js","fafdd7ab6af233b701506c733910b7f5"],["/js/src/utils.js","24512c3455f976730b7bf75e1222c533"],["/lib/Han/dist/font/han-space.woff","b09f2dd7d3ad8ad07f3b8495133909d9"],["/lib/Han/dist/font/han.woff","e841c6b547bc06a06f60f4de52bf906e"],["/lib/Han/dist/font/han.woff2","2b06aa1c952a2dfaf00d99218689d147"],["/lib/Han/dist/han.css","cfcc552e7aebaef5e2f34aee030b956b"],["/lib/Han/dist/han.js","575b6c1667c01798730fbd972e959c9c"],["/lib/Han/dist/han.min.css","cab466d758269b437167422c4a16b364"],["/lib/Han/dist/han.min.js","96482c9c2b3c5ea9bf5a40db162c7f34"],["/lib/algolia-instant-search/instantsearch.min.css","029a13b44e6807955106ff3c075a02f9"],["/lib/algolia-instant-search/instantsearch.min.js","0db46eba0c8133693ee839507b1612f2"],["/lib/canvas-nest/canvas-nest.min.js","36e103d2a05bc706bac40f9ab8881eb7"],["/lib/canvas-ribbon/canvas-ribbon.js","16dc214240913551986593808c2efcfc"],["/lib/fancybox/source/blank.gif","325472601571f31e1bf00674c368d335"],["/lib/fancybox/source/fancybox_loading.gif","328cc0f6c78211485058d460e80f4fa8"],["/lib/fancybox/source/fancybox_loading@2x.gif","f92938639fa894a0e8ded1c3368abe98"],["/lib/fancybox/source/fancybox_overlay.png","77aeaa52715b898b73c74d68c630330e"],["/lib/fancybox/source/fancybox_sprite.png","783d4031fe50c3d83c960911e1fbc705"],["/lib/fancybox/source/fancybox_sprite@2x.png","ed9970ce22242421e66ff150aa97fe5f"],["/lib/fancybox/source/helpers/fancybox_buttons.png","b448080f8615e664b7788c7003803b59"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.css","cac75538c2e3ddfadef839feaca8e356"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.js","f53c246661fb995a3f12e67fa38e0fa0"],["/lib/fancybox/source/helpers/jquery.fancybox-media.js","c017067f48d97ec4a077ccdf056e6a2e"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.css","52ddd84a9f42c1d4cd86d518a7f7e8bc"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.js","cf1fc1df534eede4cb460c5cbd71aba6"],["/lib/fancybox/source/jquery.fancybox.css","6c55951ce1e3115711f63f99b7501f3a"],["/lib/fancybox/source/jquery.fancybox.js","921e9cb04ad6e2559869ec845c5be39b"],["/lib/fancybox/source/jquery.fancybox.pack.js","cc9e759f24ba773aeef8a131889d3728"],["/lib/fastclick/README.html","b3cd6e7f930bf6e410a2e7eab8a148a8"],["/lib/fastclick/lib/fastclick.js","6e9d3b0da74f2a4a7042b494cdaa7c2e"],["/lib/fastclick/lib/fastclick.min.js","a0fc6c24d1f3ff9ac281887c92b24acd"],["/lib/font-awesome/css/font-awesome.css","c495654869785bc3df60216616814ad1"],["/lib/font-awesome/css/font-awesome.min.css","269550530cc127b6aa5a35925a7de6ce"],["/lib/font-awesome/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["/lib/font-awesome/fonts/fontawesome-webfont.svg","912ec66d7572ff821749319396470bde"],["/lib/font-awesome/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["/lib/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["/lib/font-awesome/fonts/fontawesome-webfont.woff2","af7ae505a9eed503f8b8e6982036873e"],["/lib/jquery/index.js","32015dd42e9582a80a84736f5d9a44d7"],["/lib/jquery_lazyload/CONTRIBUTING.html","7287727950845c8a1010f3933691afef"],["/lib/jquery_lazyload/README.html","d89aa4afe316331a25b636b5ead4716e"],["/lib/jquery_lazyload/jquery.lazyload.js","8b427f9e86864ee3aaf1ae33e6e14263"],["/lib/jquery_lazyload/jquery.scrollstop.js","f163fd8f02361928853668a96f8a1249"],["/lib/needsharebutton/font-embedded.css","dd8861d10d1ed6b5e0c0011adfb39be9"],["/lib/needsharebutton/needsharebutton.css","30f2f800e13f7b6b83629a4cbd9749ef"],["/lib/needsharebutton/needsharebutton.js","6c6f855f7d50f4bc3c804f52b03bbfbb"],["/lib/pace/pace-theme-barber-shop.min.css","e8dc66cf2d88abc25fbc89b8a0529abb"],["/lib/pace/pace-theme-big-counter.min.css","db2b8fe31e60f19021545277d2f6e05e"],["/lib/pace/pace-theme-bounce.min.css","ad954aa0bace4b213eeb19d6e89a0bda"],["/lib/pace/pace-theme-center-atom.min.css","8f6bc803acefc6f93afc98fb38201456"],["/lib/pace/pace-theme-center-circle.min.css","93c72298781226a80a9c66b27b21a57d"],["/lib/pace/pace-theme-center-radar.min.css","f0099bdd1cd42e9476bd7abc417c0328"],["/lib/pace/pace-theme-center-simple.min.css","eddff4756dbf21dbbff1c543bd894dde"],["/lib/pace/pace-theme-corner-indicator.min.css","776826157cb28ac1ee5e78771292b9ba"],["/lib/pace/pace-theme-fill-left.min.css","965859b39001da08e1e92327fe3d8e12"],["/lib/pace/pace-theme-flash.min.css","aab39b436e1fa0fdc51df06f2d53c38a"],["/lib/pace/pace-theme-loading-bar.min.css","4e05877f1f9efb9c1e7dd75cb78c764f"],["/lib/pace/pace-theme-mac-osx.min.css","29ae030ceaa8158352c5472218375b91"],["/lib/pace/pace-theme-minimal.min.css","f48f04d370993b55a2745e548cc82743"],["/lib/pace/pace.min.js","24d2d5e3e331c4efa3cda1e1851b31a7"],["/lib/three/canvas_lines.min.js","1324174ae6190fbf63b7bf0ad0a8a5bd"],["/lib/three/canvas_sphere.min.js","5c6bc45b137448b5b9df152ccfb2659c"],["/lib/three/three-waves.min.js","41059bd5e5c7aa520b1b411919e5121f"],["/lib/three/three.min.js","3298078bce82bdb1afadf5b1a280915e"],["/lib/ua-parser-js/dist/ua-parser.min.js","a6e833266c4b41fabb9ba94a145322d8"],["/lib/ua-parser-js/dist/ua-parser.pack.js","6b627e4d61a7135952824bb9c1a4a134"],["/lib/velocity/velocity.js","0361fa6dcf4cf4d19c593cdab0937dd0"],["/lib/velocity/velocity.min.js","c1b8d079c7049879838d78e0b389965e"],["/lib/velocity/velocity.ui.js","f55d22cc592c9f8d4ffd3b41a6b90081"],["/lib/velocity/velocity.ui.min.js","444faf512fb24d50a5dec747cbbe39bd"],["/live2dw/assets/moc/hibiki.2048/texture_00.png","730252369524e7a1c21308cb84acd465"],["/live2dw/lib/L2Dwidget.0.min.js","7d6ea3548b666c761bfb3a01f25ae87d"],["/live2dw/lib/L2Dwidget.min.js","0c58a1486de42ac6cc1c59c7d98ae887"],["/page/2/index.html","ed43ab5052fcfff503ac4c335bbe4fad"],["/page/3/index.html","4c82d341c21392428b3db4286e658f4c"],["/page/4/index.html","2d1cabe7fc8bcb55cab8ff80862e08fd"],["/page/5/index.html","75679b632fd97c0ebd52237bd6cf3c13"],["/style.css","59382be79f56314919541bbbcd43722e"],["/sw-register.js","81020be7eb47e453d8acfba0180c2064"],["/tags/Event-Loop/index.html","8c5843ce2285a4f5b84d8a8b6f08af33"],["/tags/HTML/index.html","b3e18efab04e6eaa1d5328891853ec92"],["/tags/HTML汇总/index.html","5231e6f0d8c90bb7d296ee8673cc7cd8"],["/tags/babel/index.html","0acbe235bf22296eeb4c445b63b926f8"],["/tags/blog/index.html","8511abdcb3871d75db5f3d71e3cd1d45"],["/tags/bootstrap/index.html","5b6236cbd98e8ea29e30d57c45d0b107"],["/tags/css/index.html","baf9d2139d1f006f3f44474dfbc1e90e"],["/tags/css/page/2/index.html","d878acf48942bea69c2583605adf9d57"],["/tags/css动画/index.html","d4c9132ebc964645ff66271eb82811f0"],["/tags/css工程化/index.html","212ffc442960cef372ac1e733896107e"],["/tags/css效果/index.html","66ca7382bee74f7a06978f654303a5f5"],["/tags/es6/index.html","bd8ef4ac7909576865710cdc69306662"],["/tags/git/index.html","51d707db763263f28574981a0d6c307d"],["/tags/global/index.html","02e4ee4a82fab2f8e1a0672974ac7d36"],["/tags/gulp/index.html","287e8b1d41e75e3f9ee4f91905e24046"],["/tags/hexo/index.html","89e741f37604d2634ee7f2af2f3f8c10"],["/tags/http/index.html","5a2add3c06986161f79580362862e286"],["/tags/index.html","337a16326dce10e94d3edb1abbb4655f"],["/tags/js/index.html","fec84321ce48ae7ce24270e8fc2bd9eb"],["/tags/node/index.html","b582cc65ee73eb2e5d9d12e1c892d150"],["/tags/nodemon/index.html","23363814e364ef901062356fe3e4a1ae"],["/tags/npx/index.html","33b1bde6f1642f6db98b176a65a9c98d"],["/tags/promise/index.html","e286fd2fd970a73d4e9997322e8db69d"],["/tags/tcp/index.html","d21c6adc86eccbb4b314d4815aa0f7d1"],["/tags/vscode/index.html","8086dfd0c9ebd11ed9cc7ae367f7e044"],["/tags/vscode插件/index.html","a7c0f8cb67fdf8092b9eb6fde68c7003"],["/tags/前端基础/index.html","3eafbfc7a3808b62c4c594ff43fed7e3"],["/tags/前端基础/page/2/index.html","18eba002d468d5b65b681a42da8a2a19"],["/tags/前端基础/page/3/index.html","e5a46f4c41480004d174b2607129cbef"],["/tags/小程序/index.html","78de53933dc1b4d319b33aa5134dafc4"],["/tags/异步/index.html","ba188a3795c5bbd005e33898498172ee"],["/tags/微信/index.html","8ce0cc8238ffc5036e76e8fc709210d8"],["/tags/性能优化/index.html","667777b78ce15614c469e12dfe6f8a67"],["/tags/插件/index.html","61e44792d9b0c8a5f82c6977d2df6e16"],["/tags/构建工具/index.html","0e30141da8bdc793e6a03f76eec997fa"],["/tags/架构/index.html","5a42abc7a62db71dd85a5805874a3242"],["/tags/框架中的css/index.html","8f3aa152c12c1a857f0e1585abf93444"],["/tags/浏览器/index.html","340a132e112eea21d94d9dd332b403a5"],["/tags/浏览器渲染/index.html","07757d2c4995699f179c952abb4035b8"],["/tags/网路/index.html","18eec25fd58e0c49bba12d8b138bd51a"],["/tags/设计模式/index.html","6d865f5472b47227395b30b5561f6c5a"],["/tags/预处理器/index.html","d4e06e2f3ad63e4935761ac557e83620"],["/uploads/avatar.jpg","19392dd66f6175e4ea17280adf4db7e8"],["/uploads/wechatpay.jpg","dc08d8b0df0a37e3e11e78174709ba0f"]];
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
