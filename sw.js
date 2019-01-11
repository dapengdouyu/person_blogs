/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2018/05/21/git/0.png","bd069bbbca4e2d1c0e2b4416df5dd14b"],["/2018/05/21/git/fetch_HEAD.png","10831dc4bae97a7504b7ff5209368861"],["/2018/05/21/git/gitlog.png","76841726e0cc211fbfaac8d9b273281a"],["/2018/05/21/git/git基本流程.png","ec6c0c1f69c4ed94b8ad0b881e40d469"],["/2018/05/21/git/git版本.png","42235a95fa69d23fee78b7ccf57af822"],["/2018/05/21/git/index.html","13d42967b52652c79366501a1da224ee"],["/2018/05/21/git/no-ff.png","4fae485fb0062c35d7ac9ea36f16b0d9"],["/2018/05/21/git/tracking.png","a1fb55bd83f8930da4cd25ee7b393180"],["/2018/05/21/git/分布式.png","36811a240cf686b00787ace6a723e2bf"],["/2018/05/21/git/集中式.png","5bbcfb2d2a77f7770f937a6a26cb3413"],["/2018/05/21/hexo建站指南/index.html","36584662e42d87b3848eba5642bc46e1"],["/2018/05/21/hexo建站指南/js.png","fd78c647158c594390d124b234f23ac8"],["/2018/05/21/nodemon/index.html","18837e2ce718b7fbd6b7923540e4410c"],["/2018/05/25/npx/index.html","748b53eef31d7805a3dd12c054d99eb1"],["/2018/05/25/微信公众号/index.html","d8f39a019ec006cc5884dbb464d84b01"],["/2018/05/25/微信公众号/公众号权限.jpg","5307779292b4d88c413aca4b5d6242c7"],["/2018/05/25/微信公众号/微信交互过程.jpg","bb87b9e4b5001779dd4d365cbe6af33d"],["/2018/05/25/微信公众号/验证公众号.jpg","72540fb2be5ced94c709b6a8f1a1b85b"],["/2018/05/29/gulp/index.html","0aa85245d7c56a7e462af26a2ec09ce8"],["/2018/05/30/gulp插件/index.html","7abb5954b591f913410f69601b5c9d7f"],["/2018/05/31/es6快学/index.html","372ac6684d810b278a58556ce718cce7"],["/2018/06/11/小程序/index.html","63427d8c9f691d0c1756282e12c503fc"],["/2018/06/11/小程序/图片1.png","a70e2059dbd63d02de44cb09783642f7"],["/2018/06/11/小程序/图片10.png","253b5cb5d64d8a085a939479cbd82c61"],["/2018/06/11/小程序/图片11.png","2394147ba042004e52c563dab2566e86"],["/2018/06/11/小程序/图片12.png","15685ed43535dcd8f669a3a62d0c944c"],["/2018/06/11/小程序/图片13.png","6ddfee2874af19fdda5457a6ebb07a4a"],["/2018/06/11/小程序/图片2.png","17cf31e03a529dd16d30cdba237d261b"],["/2018/06/11/小程序/图片3.png","4c418c305ea29c2652073b3fb2f60e9c"],["/2018/06/11/小程序/图片4.png","1dd0a93c3455171775630e16ba06d315"],["/2018/06/11/小程序/图片5.png","9b2af48344d07f6b52939b2f7f411eeb"],["/2018/06/11/小程序/图片6.png","2113900dc3174e66b31dce4265e8b3e4"],["/2018/06/11/小程序/图片7.png","5a03ad0f423874e9a55ea00ab5fe7567"],["/2018/06/11/小程序/图片8.png","a6e291f21158b3c9ea65cba5ca508458"],["/2018/06/11/小程序/图片9.png","ce85efe0c14262c802704c8a87df61fa"],["/2018/06/12/css/TIM截图20180612152920.jpg","90ec841c094cba227458755449a4cee2"],["/2018/06/12/css/index.html","cb55940f68b4cded6a9ea00085115f2d"],["/2018/06/12/微信直播/index.html","1ac4025f0e735f4b85521bd5358bd0ff"],["/2018/06/12/文本样式/font-weight.jpg","5ff1244ea47b3c5561e587036c66c695"],["/2018/06/12/文本样式/index.html","6e3ad35f4a4b6011c2c16da9fe272f07"],["/2018/06/12/文本样式/字体.png","c38e59b8c80d76400ee9802270ad0034"],["/2018/06/12/文本样式/字体族.jpg","b2de214630030f8e2e50a13b670f9ac8"],["/2018/06/12/文本样式/通用字体族.jpg","c0496ec92b179d44b46f60c10fdf285d"],["/2018/06/13/浮动/float.jpg","195047130f66f69bd8e14a7b2ae85f2e"],["/2018/06/13/浮动/index.html","a65a1bada4ed6c1129ba4bcaf438c2f7"],["/2018/06/14/定位与堆叠/absolute.jpg","2371e331ad81280b2788fd2e56aad0c7"],["/2018/06/14/定位与堆叠/index.html","867c097f6050a541b8c00886a006a263"],["/2018/06/14/定位与堆叠/z-index.png","c148506f5397247c847de3514432b6dd"],["/2018/06/14/定位与堆叠/堆叠上下文.jpg","283475ec7454d34584f1c9c7f7526345"],["/2018/06/14/定位与堆叠/堆叠上下文2.jpg","f0e76597c4d8e71daa40deae8f450624"],["/2018/06/14/层叠继承和css单位/hsl.jpg","daf4d3b2f7a4e41fc4c7b9b3fd187537"],["/2018/06/14/层叠继承和css单位/index.html","cf069cb2c3ce0a79d6a6f132707285aa"],["/2018/06/14/层叠继承和css单位/specificityimg.png","c409c760c0bee888743dc2697303bbf2"],["/2018/06/14/盒模型/boxmodel.jpg","182d83d8c0f7ed736753d56aeb33f9f5"],["/2018/06/14/盒模型/index.html","3a6468a7c88c090f7fa0a80255d979e0"],["/2018/06/14/盒模型/块级元素.png","ac0f46d33990a8c334393f2756c8b566"],["/2018/06/14/盒模型/盒子.jpg","f24b489edc37893b648f204bd09e6b59"],["/2018/06/14/盒模型/行级盒子.png","1de67777abd275e145a9d723540b8696"],["/2018/06/15/排版细节/index.html","b3c20c4659cfe357e8c1467742b87fef"],["/2018/06/15/排版细节/line-box.png","804f848fe0559f5878bbec084365c0c7"],["/2018/06/15/排版细节/line-height.jpg","8579db767ab7a063d10d9d08f808d61f"],["/2018/06/15/排版细节/list-style-position.jpg","8b4712167cf42e8912e4e7104df16c54"],["/2018/06/15/排版细节/ver.jpg","4113f24f1cedc05e125402dd2f4e0929"],["/2018/06/15/排版细节/vertical-box.jpg","9affd804dcbba504208259ab28cded5e"],["/2018/06/15/排版细节/行级格式化上下文.png","be81f02d35b6a40fa70bc5ac660b457e"],["/2018/06/19/动画/index.html","f0f4506091c4e9f8d64d856307214532"],["/2018/06/19/布局/Grid.jpg","26a0d2148046f3b32296322161e49b1b"],["/2018/06/19/布局/align-content.png","d037edf6132bfcde471a8758368c7afe"],["/2018/06/19/布局/align-items.png","390dc826058dea5b0c438b756f76efa0"],["/2018/06/19/布局/flex-direction.jpg","032c7d0177e1e7f7dc80ff544401ee66"],["/2018/06/19/布局/index.html","41e49eace91ac891ca2154da3eb753c7"],["/2018/06/19/布局/justify-content.png","808ddfdbafc273f8e5a67a5200779709"],["/2018/06/19/布局/主轴.png","c5d1828f3d186ca4b7dc4f7f94262b96"],["/2018/06/19/布局/伪等高.jpg","4869df0907a355d589c8472206df4124"],["/2018/06/19/布局/兼容性.jpg","84f9642da96a50308abf0b5199823fe4"],["/2018/06/19/布局/展示.jpg","282e4e875fc3c895c8cc83316c64d664"],["/2018/06/20/兼容性/index.html","cc91edb87f7e983af9156aa84536f1e5"],["/2018/06/20/兼容性/supports.jpg","f58791c8f5287c8038a47fefc95734b5"],["/2018/06/20/响应式设计/index.html","d65f77044d5f43660110d167be6b1d32"],["/2018/06/20/响应式设计/网格.png","42bc34cd435f54ca5a82e600ebc2cf60"],["/2018/06/20/工程化/Media.jpg","add9300d6b7e82aa209213a6af4e58a3"],["/2018/06/20/工程化/index.html","5afc243e9bade2fc65ff3b043f15d016"],["/2018/06/20/工程化/文件结构.png","01319361f90fdbce13db10a654699be2"],["/2018/06/20/高级选择器/index.html","5d8c6930daf016e3e6819924e942e9a8"],["/2018/06/21/html简述与文本/index.html","ba210605ed3282aa2614baa0198122f8"],["/2018/06/21/html简述与文本/网页总体结构.png","525e10b1bbf3187d956442d069429ead"],["/2018/06/21/text-size-adjust使用汇总/index.html","423e8da962b8e139b62303c806a7226d"],["/2018/06/21/表单/index.html","5659b7abe4191eebed88cec17bb9e688"],["/2018/06/21/表格/index.html","dc586947ee8a2d883d0f0ea27eb18366"],["/2018/06/21/表格/table.png","246ed67c73c604feeb989e33a04f85d8"],["/2018/06/21/连接与图片/href.jpg","35d9804506bd416ba61bd8aaadc60b44"],["/2018/06/21/连接与图片/index.html","a7d0cc7a23a71e73dc586ba2aa912b53"],["/2018/06/24/HTML补充知识/index.html","32011b9f5b30372f57a6166eeff08551"],["/2018/06/26/node深研/index.html","d8e9ec0907480391c83d5c50ac25a2db"],["/2018/06/26/node深研/node.jpg","3a772fd012b29957cb58e9f970a57ed0"],["/2018/06/26/node深研/nodeloop.png","3228e8674a48daffa748ec1bbe57005c"],["/2018/06/26/node深研/nodepoll.png","b9b30c76b65c0bd5a5c15fd293f736c0"],["/2018/06/26/node深研/node中执行.png","a55b9b539d01c5d80b307ed6d00b4f99"],["/2018/06/26/node深研/浏览器EventLoop.jpg","75b404807ad79b3c6793e22b7bb4fa99"],["/2018/06/26/node深研/浏览器执行.png","261c1097d6ddb15ccaab17f1e7146ccd"],["/2018/06/26/node深研/非node.jpg","60799224a7296b67e6aab80cfff07cfb"],["/2018/07/05/css预处理器/index.html","26295e3e00bde16960c3e3b9aa00e04e"],["/2018/07/06/css框架bootstarp/index.html","86c3f341428cef61a19095cb5a99b250"],["/2018/07/06/css框架bootstarp/响应式.png","344bbc8c625bdaf12adacf6e486839ea"],["/2018/07/06/框架中的css/index.html","2ac8d0749fbc160f48986df6849b262a"],["/2018/07/06/框架中的css/video.jpg","e2beddb9d11146a7dd7f6fbc25449e71"],["/2018/07/06/框架中的css/开启shadowDom.png","4f5696d1d56bcdad51ff818a5a355620"],["/2018/07/09/HTML汇总/HTML版本.jpg","a2de2f22a0e5e32c132b9e194b124e3f"],["/2018/07/09/HTML汇总/flow.jpg","cc556f4c7918f1084c078fadc496bf56"],["/2018/07/09/HTML汇总/index.html","92db3bcae6be7245c1dd4872db32bb83"],["/2018/07/09/HTML汇总/viewport.jpg","3433e5a1a8d68dca799f8de98090616e"],["/2018/07/09/css动画/index.html","7197d332a31162e2aaa8d0b05b20b47c"],["/2018/07/09/css动画/timing.jpg","11381af2541edf17105dc5fb78a78595"],["/2018/07/09/css动画/关键帧动画.png","8b97823ef80053e1e4bf5be149f5b442"],["/2018/07/09/css动画/补间动画.jpg","fd1fe81cdad4b55be69df95e3564b2ff"],["/2018/07/09/css动画/逐帧动画.png","979dcead8f1267ae3ffd9dd7baba04f3"],["/2018/07/10/css工程化/BrowserList.jpg","531d83232ff6665f1923b88bc0e0cc93"],["/2018/07/10/css工程化/cssnext.jpg","7335e813a1c17987a0abceebf5f3aae9"],["/2018/07/10/css工程化/index.html","aca5f989a066f24a24f6482a8d24e06b"],["/2018/07/10/css工程化/postcss.jpg","04bcb1c638cc01f4bee3aa8f00ee0794"],["/2018/07/10/css效果/3d.jpg","cf03dc97e063fbbbfbe94a3e7a13f742"],["/2018/07/10/css效果/box-shadow.png","df23506b9fe84b10b30e51a1e255301c"],["/2018/07/10/css效果/index.html","159533ed97d52249de7d156322999df5"],["/2018/07/10/css效果/svg.jpg","eb4d637e191675b85c0015a9d27ce0eb"],["/2018/07/10/css效果/transform.jpg","a80701f47cf5ecda171d3506cce6933a"],["/2018/07/23/promise详解/generator.png","f4fcfef52f06a98d5a75871a8597673c"],["/2018/07/23/promise详解/index.html","3d3f045255fd18f7109df561471f26dc"],["/2018/07/25/babel/index.html","0f8380dc75b9f465704a01b1bc183d29"],["/2018/07/25/mobx/index.html","9c3232eed11a832a344b1511af7f3194"],["/2018/08/08/TCP/index.html","92da94c4380e9dd20cfee3938600b708"],["/2018/08/08/TCP/osi7层模型.jpg","c381afbb827d435be07280d3853cf850"],["/2018/08/29/vscode插件/00-400x264.png","e90d695457081461db2b05d952d61366"],["/2018/08/29/vscode插件/01-400x445.png","87c3e3f2fefb71eadde6352424f423a0"],["/2018/08/29/vscode插件/02-400x189.png","b9edb62ee6cf2463e9b81dafff455033"],["/2018/08/29/vscode插件/03-400x75.png","8abe946ffe1e5a0098bfcf775c17fde8"],["/2018/08/29/vscode插件/04.png","2067b3880ffe4e5aea78a4c6721a7d3e"],["/2018/08/29/vscode插件/1.png","6d96b9deb30059b657aeb654b30fee26"],["/2018/08/29/vscode插件/2.png","1bad6dfb64a3994a83f026261efd4cbd"],["/2018/08/29/vscode插件/20180815183752751.png","9527477ba23943ba6374f97308b18786"],["/2018/08/29/vscode插件/20180815183812965.png","9c4f06e8431751d5a2db56107a1dc3c2"],["/2018/08/29/vscode插件/20180815183830941.png","0451b90e09e7a1d6ba9e1de539c65a97"],["/2018/08/29/vscode插件/index.html","25fdc703ead512b4fe4d77437bd2b68f"],["/2018/09/05/浏览器渲染/chromium.jpg","24d65d9aea03aad1b6b61fec5e14fa38"],["/2018/09/05/浏览器渲染/index.html","c41627f6ecf35afd6495bf6d140fa7e9"],["/2018/09/05/浏览器渲染/webkit架构图.jpg","4e8c7ccf92374f0f5480d0c8cef265a3"],["/2018/09/05/浏览器渲染/浏览器渲染.jpg","688510d10251aeeb7aebe99cac44785a"],["/2018/09/05/浏览器渲染/渲染引擎.jpg","0e5bd1558438622e0f387518198b85c9"],["/2018/09/05/浏览器渲染/网络栈.jpg","4f6fb8c4708d291eba0160bbde00bce4"],["/2018/09/05/浏览器渲染/进程.jpg","4a870c3f4bf74468496142621b70643b"],["/2018/09/06/前端性能优化/index.html","89b2a918bbe9f712ddae59f54e137702"],["/2018/09/17/前端设计模式/index.html","fb14cd0d595ec55d41898c09bff2bdb6"],["/2018/09/20/vue-MVVM实现/index.html","15d2df6d8850aca8819953578714eea0"],["/2018/12/03/Mocha与chai/index.html","404d2fbf5ed19d956dc987fa0ef191b4"],["/2018/12/03/test-1/index.html","df7f612b067ca9272c257b8fe6f0df2a"],["/2018/12/04/Jest/index.html","a84e40d7f05f2e225bc750e2bc4bd50b"],["/2018/12/04/enzyme/index.html","821ddbebfeb31f6e22c95bd7c0ad97af"],["/2018/12/06/cypress/index.html","6df57ad192f604ed4785a4ff16ef4884"],["/2018/12/12/跨域/index.html","0499085a5927e209d33f2b75dc8ff06f"],["/2019/01/08/webpack-1/index.html","6470ebd341024a44fddf74edad29bf7b"],["/2019/01/11/webpack-bundle-源码/index.html","e8096bc2b0b062142c0fc48f32f3cdbf"],["/2019/01/11/webpack优化/index.html","6995409d10cf48fd9bea06ca5bdfbd88"],["/404.html","dcbc8f26884308ebbc8b533c45608587"],["/archives/2018/05/index.html","fa9f15b6d1cfb1f01f6283303264a063"],["/archives/2018/06/index.html","6417bf4089bb5b5c62db670893c4d317"],["/archives/2018/06/page/2/index.html","4ec2017efbe53bdd4d3bb7aed972856b"],["/archives/2018/06/page/3/index.html","82200d1d8519eda4fd1945ceb4159185"],["/archives/2018/07/index.html","ab82114142ce4ddeea45dffdb49deb43"],["/archives/2018/08/index.html","f27ed9228f181c4f957ac7e2d1df066f"],["/archives/2018/09/index.html","9a69f9ce98a2b93f426ad27abba1d030"],["/archives/2018/12/index.html","4dfd01c48d2bff77c7c66b41999cf7f9"],["/archives/2018/index.html","1409bb69c2afcecd2dabf0e7941fdbf0"],["/archives/2018/page/2/index.html","cff5db88c08fa043fa781c45951e44e5"],["/archives/2018/page/3/index.html","052defedd2cf68b1a1ba8ffd4f82ee63"],["/archives/2018/page/4/index.html","7e7fb877f8d9b07aa38994efa0386e85"],["/archives/2018/page/5/index.html","aa8c6e28ef469faa2db8b00e192629d6"],["/archives/2018/page/6/index.html","ccb37d3012d1bc83361e2936e148fc9f"],["/archives/2019/01/index.html","37b9b94b8da782530e48935ce8218877"],["/archives/2019/index.html","97b637c7cbc34295b5732d796be9a1b1"],["/archives/index.html","e61e7a8de2649df4fc92a308a3f148c2"],["/archives/page/2/index.html","74c99c92ec02bfe2e16aaa8a981995b4"],["/archives/page/3/index.html","2cca6febfe171440955ebfdd18debf07"],["/archives/page/4/index.html","0080c07183a33bfce48a2144c9fa0cff"],["/archives/page/5/index.html","6a4c5a1b9ad65fb27687ed59f69da0ff"],["/archives/page/6/index.html","b8e26843eaa96245028b725bde293b82"],["/bundle.js","3cf8ab2eedb168aa56078bfb5b719543"],["/css/main.css","163cf8a8b33d5ffa7592c787466cf729"],["/images/algolia_logo.svg","fd40b88ac5370a5353a50b8175c1f367"],["/images/apple-touch-icon-next.png","fce961f0bd3cd769bf9c605ae6749bc0"],["/images/avatar.gif","2bed513bc5f13733cf9a8a12c4e1a971"],["/images/cc-by-nc-nd.svg","1c681acc4a150e7236254c464bb5a797"],["/images/cc-by-nc-sa.svg","12b4b29e8453be5b7828b524d3feabce"],["/images/cc-by-nc.svg","dd9cfe99ed839a4a548114f988d653f4"],["/images/cc-by-nd.svg","2d80546af20128215dc1e23ef42d06c2"],["/images/cc-by-sa.svg","c696b3db81cbbfba32f66c1dc88b909a"],["/images/cc-by.svg","6c4f8422b3725cb9f26b6c00e95fc88b"],["/images/cc-zero.svg","79deee77a07fcb79ff680ac0125eacb9"],["/images/favicon-16x16-next.png","b8975923a585dbaa8519a6068e364947"],["/images/favicon-32x32-next.png","5a029563fe3214c96f68b46556670ea1"],["/images/loading.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/logo.svg","ddad9027e42111ccd5b466bc18188970"],["/images/placeholder.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/quote-l.svg","1238a4baccd02c6025ec85b58f4282d4"],["/images/quote-r.svg","85787c6fa27965c81f7be70252b43bed"],["/images/searchicon.png","3d6b5c9d6d6c26a2b76a14b8fdf3438a"],["/index.html","4aeb730b4206be2620e15c0a81912b7e"],["/js/src/affix.js","683c19859764baf0d17538897ea1eba2"],["/js/src/algolia-search.js","f5fa392318805997089ceb3a925979ba"],["/js/src/bootstrap.js","2a1083772854ae2663748e0a25c17285"],["/js/src/exturl.js","2b444179b3145e5007b4d371dac07cd3"],["/js/src/hook-duoshuo.js","45997b0c06abff3cd88efd901f614065"],["/js/src/js.cookie.js","6e9eb1f53afb135aedaf90739c867738"],["/js/src/motion.js","0f6add86607c451269d0b3d286c84d8b"],["/js/src/post-details.js","b8e8e27c27c697567879c52888ffc24c"],["/js/src/schemes/pisces.js","827b5ad25e1142277c1e7dfe0cacebe5"],["/js/src/scroll-cookie.js","890406ae3539e4721ef5f314542e5e46"],["/js/src/scrollspy.js","fafdd7ab6af233b701506c733910b7f5"],["/js/src/utils.js","24512c3455f976730b7bf75e1222c533"],["/lib/Han/dist/font/han-space.woff","b09f2dd7d3ad8ad07f3b8495133909d9"],["/lib/Han/dist/font/han.woff","e841c6b547bc06a06f60f4de52bf906e"],["/lib/Han/dist/font/han.woff2","2b06aa1c952a2dfaf00d99218689d147"],["/lib/Han/dist/han.css","cfcc552e7aebaef5e2f34aee030b956b"],["/lib/Han/dist/han.js","575b6c1667c01798730fbd972e959c9c"],["/lib/Han/dist/han.min.css","cab466d758269b437167422c4a16b364"],["/lib/Han/dist/han.min.js","96482c9c2b3c5ea9bf5a40db162c7f34"],["/lib/algolia-instant-search/instantsearch.min.css","029a13b44e6807955106ff3c075a02f9"],["/lib/algolia-instant-search/instantsearch.min.js","0db46eba0c8133693ee839507b1612f2"],["/lib/canvas-nest/canvas-nest.min.js","36e103d2a05bc706bac40f9ab8881eb7"],["/lib/canvas-ribbon/canvas-ribbon.js","16dc214240913551986593808c2efcfc"],["/lib/fancybox/source/blank.gif","325472601571f31e1bf00674c368d335"],["/lib/fancybox/source/fancybox_loading.gif","328cc0f6c78211485058d460e80f4fa8"],["/lib/fancybox/source/fancybox_loading@2x.gif","f92938639fa894a0e8ded1c3368abe98"],["/lib/fancybox/source/fancybox_overlay.png","77aeaa52715b898b73c74d68c630330e"],["/lib/fancybox/source/fancybox_sprite.png","783d4031fe50c3d83c960911e1fbc705"],["/lib/fancybox/source/fancybox_sprite@2x.png","ed9970ce22242421e66ff150aa97fe5f"],["/lib/fancybox/source/helpers/fancybox_buttons.png","b448080f8615e664b7788c7003803b59"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.css","cac75538c2e3ddfadef839feaca8e356"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.js","f53c246661fb995a3f12e67fa38e0fa0"],["/lib/fancybox/source/helpers/jquery.fancybox-media.js","c017067f48d97ec4a077ccdf056e6a2e"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.css","52ddd84a9f42c1d4cd86d518a7f7e8bc"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.js","cf1fc1df534eede4cb460c5cbd71aba6"],["/lib/fancybox/source/jquery.fancybox.css","6c55951ce1e3115711f63f99b7501f3a"],["/lib/fancybox/source/jquery.fancybox.js","921e9cb04ad6e2559869ec845c5be39b"],["/lib/fancybox/source/jquery.fancybox.pack.js","cc9e759f24ba773aeef8a131889d3728"],["/lib/fastclick/README.html","b3cd6e7f930bf6e410a2e7eab8a148a8"],["/lib/fastclick/lib/fastclick.js","6e9d3b0da74f2a4a7042b494cdaa7c2e"],["/lib/fastclick/lib/fastclick.min.js","a0fc6c24d1f3ff9ac281887c92b24acd"],["/lib/font-awesome/css/font-awesome.css","c495654869785bc3df60216616814ad1"],["/lib/font-awesome/css/font-awesome.min.css","269550530cc127b6aa5a35925a7de6ce"],["/lib/font-awesome/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["/lib/font-awesome/fonts/fontawesome-webfont.svg","912ec66d7572ff821749319396470bde"],["/lib/font-awesome/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["/lib/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["/lib/font-awesome/fonts/fontawesome-webfont.woff2","af7ae505a9eed503f8b8e6982036873e"],["/lib/jquery/index.js","32015dd42e9582a80a84736f5d9a44d7"],["/lib/jquery_lazyload/CONTRIBUTING.html","7287727950845c8a1010f3933691afef"],["/lib/jquery_lazyload/README.html","d89aa4afe316331a25b636b5ead4716e"],["/lib/jquery_lazyload/jquery.lazyload.js","8b427f9e86864ee3aaf1ae33e6e14263"],["/lib/jquery_lazyload/jquery.scrollstop.js","f163fd8f02361928853668a96f8a1249"],["/lib/needsharebutton/font-embedded.css","dd8861d10d1ed6b5e0c0011adfb39be9"],["/lib/needsharebutton/needsharebutton.css","30f2f800e13f7b6b83629a4cbd9749ef"],["/lib/needsharebutton/needsharebutton.js","6c6f855f7d50f4bc3c804f52b03bbfbb"],["/lib/pace/pace-theme-barber-shop.min.css","e8dc66cf2d88abc25fbc89b8a0529abb"],["/lib/pace/pace-theme-big-counter.min.css","db2b8fe31e60f19021545277d2f6e05e"],["/lib/pace/pace-theme-bounce.min.css","ad954aa0bace4b213eeb19d6e89a0bda"],["/lib/pace/pace-theme-center-atom.min.css","8f6bc803acefc6f93afc98fb38201456"],["/lib/pace/pace-theme-center-circle.min.css","93c72298781226a80a9c66b27b21a57d"],["/lib/pace/pace-theme-center-radar.min.css","f0099bdd1cd42e9476bd7abc417c0328"],["/lib/pace/pace-theme-center-simple.min.css","eddff4756dbf21dbbff1c543bd894dde"],["/lib/pace/pace-theme-corner-indicator.min.css","776826157cb28ac1ee5e78771292b9ba"],["/lib/pace/pace-theme-fill-left.min.css","965859b39001da08e1e92327fe3d8e12"],["/lib/pace/pace-theme-flash.min.css","aab39b436e1fa0fdc51df06f2d53c38a"],["/lib/pace/pace-theme-loading-bar.min.css","4e05877f1f9efb9c1e7dd75cb78c764f"],["/lib/pace/pace-theme-mac-osx.min.css","29ae030ceaa8158352c5472218375b91"],["/lib/pace/pace-theme-minimal.min.css","f48f04d370993b55a2745e548cc82743"],["/lib/pace/pace.min.js","24d2d5e3e331c4efa3cda1e1851b31a7"],["/lib/three/canvas_lines.min.js","1324174ae6190fbf63b7bf0ad0a8a5bd"],["/lib/three/canvas_sphere.min.js","5c6bc45b137448b5b9df152ccfb2659c"],["/lib/three/three-waves.min.js","41059bd5e5c7aa520b1b411919e5121f"],["/lib/three/three.min.js","3298078bce82bdb1afadf5b1a280915e"],["/lib/ua-parser-js/dist/ua-parser.min.js","a6e833266c4b41fabb9ba94a145322d8"],["/lib/ua-parser-js/dist/ua-parser.pack.js","6b627e4d61a7135952824bb9c1a4a134"],["/lib/velocity/velocity.js","0361fa6dcf4cf4d19c593cdab0937dd0"],["/lib/velocity/velocity.min.js","c1b8d079c7049879838d78e0b389965e"],["/lib/velocity/velocity.ui.js","f55d22cc592c9f8d4ffd3b41a6b90081"],["/lib/velocity/velocity.ui.min.js","444faf512fb24d50a5dec747cbbe39bd"],["/live2dw/assets/moc/hibiki.2048/texture_00.png","730252369524e7a1c21308cb84acd465"],["/live2dw/lib/L2Dwidget.0.min.js","7d6ea3548b666c761bfb3a01f25ae87d"],["/live2dw/lib/L2Dwidget.min.js","0c58a1486de42ac6cc1c59c7d98ae887"],["/page/2/index.html","6be7c043aa5ae9bc0ee0c16155f001cd"],["/page/3/index.html","b014ed232a976972c0ec303630df8d69"],["/page/4/index.html","8bd3ddb28ca805f29eb5d4359794e8dd"],["/page/5/index.html","ac8880d984b564b5729123231e8ff359"],["/page/6/index.html","93502c15e0fd63a506b93fc7080e146f"],["/style.css","59382be79f56314919541bbbcd43722e"],["/sw-register.js","f09f596c447336eab5cfca350e5a5725"],["/tags/Event-Loop/index.html","ecf956ac2f33a5d2c8bd8a2ec3fbd3a9"],["/tags/HTML汇总/index.html","85b5831184fd5c89be6dae00be2eadae"],["/tags/MVVM/index.html","11bec828dabdc32da2edbee243de3620"],["/tags/babel/index.html","00ca3b34647401792b39205f48dafb43"],["/tags/blog/index.html","149cba42a308424a06e4c96c4b5ff299"],["/tags/bootstrap/index.html","3881abd00e599e2705cd29fe6a785527"],["/tags/css/index.html","30c57ee901878777ef50e2c90ed8ceb0"],["/tags/css/page/2/index.html","b07260a33ae411abc0224ec0e7626b57"],["/tags/css动画/index.html","5bee11639fb34b76239572a1dff4dd53"],["/tags/css工程化/index.html","91e9800d5f8c60b91ce10683d694d3d6"],["/tags/css效果/index.html","1a49d1db95062ba2d5138b540abd1b9c"],["/tags/cypress/index.html","90293a6b0d2ea24f1e5e973feebaa782"],["/tags/e2e/index.html","869171f2281c1765f67190255e5ea63f"],["/tags/enzyme/index.html","404b881db4b8af450b39dc0f6062fbe1"],["/tags/es6/index.html","9aefdbe80aa576013e5cd53e87fe9ef4"],["/tags/git/index.html","c894519e2c2c9ee80e814912bf6de2aa"],["/tags/global/index.html","485698687504e563889d8365fc4fc109"],["/tags/gulp/index.html","b578554ddb26c5acb7703d80ddc82458"],["/tags/hexo/index.html","7b4465dcc42a0aea386be1fcc2dea22d"],["/tags/html/index.html","9a3c416c69330c33632fa5d1aeb0dce8"],["/tags/http/index.html","99fd4418977009258eb46e2bd41fbea5"],["/tags/index.html","d569459837dd108aa5af40691f609151"],["/tags/jest/index.html","ea53638f076020b444ca6cbd47ab5a8d"],["/tags/js/index.html","c0b3c8d6caa65df31470d07ce11957aa"],["/tags/node/index.html","f4759eb0f3f4a1155da219818cd8aba1"],["/tags/nodemon/index.html","301a5741ac86f0659ea57370dff7b1d0"],["/tags/npx/index.html","bb6944bd0a5100c76aaabb8ff04e7e31"],["/tags/promise/index.html","68d217f167a15600aa17197d2b0cdf5d"],["/tags/react/index.html","afc062b9b757350106f15e3751275528"],["/tags/tcp/index.html","5431a9bc48ce6f02813d544ba45dd3b0"],["/tags/test/index.html","89c1ead6e40759cadc87dea3674829c0"],["/tags/vscode/index.html","f60766a120144a77060e1eb7f11f447c"],["/tags/vscode插件/index.html","3b16602a904df94e18005ab81eb1b793"],["/tags/vue/index.html","b2d4e72e7c43e0f3999c686a00b6723c"],["/tags/webpack/index.html","3d4b73e29bade72eee310440e296b729"],["/tags/webpack优化/index.html","1192fb0f6531a6359afcacc17797d14f"],["/tags/webpack实战/index.html","d1d7433fbefe60514af1ab728eaebc88"],["/tags/webpack源码/index.html","8a882ca89e5e610437b8e7df01f274cb"],["/tags/webpack系列/index.html","3a24d53784e80337ca31c6cae66bd8ad"],["/tags/前端/index.html","fb64ffedbaa33b78a7a424e6c2eae0b5"],["/tags/前端基础/index.html","00d7dafdff65c604f0fbb70c05ac2f20"],["/tags/前端基础/page/2/index.html","6da4340999b0ee5dc5336247de6e243e"],["/tags/前端基础/page/3/index.html","57b98a621140c39c03686548a3134dd0"],["/tags/单元测试/index.html","2a7823236861aedc2d312961a9e0053c"],["/tags/小程序/index.html","777189b887019f07e3d3857706822ab1"],["/tags/异步/index.html","e22bdaa527b80b5d7dd789a078a52651"],["/tags/微信/index.html","9fefdce47a0047e5f00a928896905d97"],["/tags/性能优化/index.html","74621bb9c11bb54da348c5112b8a71a2"],["/tags/插件/index.html","6e671ae72e27c07fc190cbbe116d143f"],["/tags/构建工具/index.html","1a292ac9db37a757a40e939931c029b8"],["/tags/架构/index.html","fcc8c80472618af72a1b8fca94cadfde"],["/tags/框架中的css/index.html","4d266b679a08dc9abda408c69edd4547"],["/tags/测试/index.html","b2e9ec329b27e2c7d6a9e36e240bf777"],["/tags/浏览器/index.html","5f679dc4e50507852ab84fed32009254"],["/tags/浏览器渲染/index.html","ef2786de7066a95c1e2b0129259111cf"],["/tags/网路/index.html","07d734df2a3a87988d5417b08c4109ab"],["/tags/设计模式/index.html","f9001664f3d275c48e4fd7be2a9ff480"],["/tags/跨域/index.html","5af09f31c45e6a000d1f2bc598dbf544"],["/tags/预处理器/index.html","56b99fa2cf14ec08810bc0f028344a4b"],["/uploads/avatar.jpg","19392dd66f6175e4ea17280adf4db7e8"],["/uploads/wechatpay.jpg","dc08d8b0df0a37e3e11e78174709ba0f"]];
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
