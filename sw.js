/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2018/05/21/git/0.png","bd069bbbca4e2d1c0e2b4416df5dd14b"],["/2018/05/21/git/fetch_HEAD.png","10831dc4bae97a7504b7ff5209368861"],["/2018/05/21/git/gitlog.png","76841726e0cc211fbfaac8d9b273281a"],["/2018/05/21/git/git基本流程.png","ec6c0c1f69c4ed94b8ad0b881e40d469"],["/2018/05/21/git/git版本.png","42235a95fa69d23fee78b7ccf57af822"],["/2018/05/21/git/index.html","beccff9b4220cc106df2186ea4d7ccfd"],["/2018/05/21/git/no-ff.png","4fae485fb0062c35d7ac9ea36f16b0d9"],["/2018/05/21/git/tracking.png","a1fb55bd83f8930da4cd25ee7b393180"],["/2018/05/21/git/分布式.png","36811a240cf686b00787ace6a723e2bf"],["/2018/05/21/git/集中式.png","5bbcfb2d2a77f7770f937a6a26cb3413"],["/2018/05/21/hexo建站指南/index.html","d61e5ed924146249a6754d7c48c75842"],["/2018/05/21/hexo建站指南/js.png","fd78c647158c594390d124b234f23ac8"],["/2018/05/21/nodemon/index.html","295747f7f310f7c2336b49120053f084"],["/2018/05/25/npx/index.html","8c9e16c6f4bb604c0f4be176ab5f10cf"],["/2018/05/25/微信公众号/index.html","3ae1e098ffaa9d05a6215968551f4e55"],["/2018/05/25/微信公众号/公众号权限.jpg","5307779292b4d88c413aca4b5d6242c7"],["/2018/05/25/微信公众号/微信交互过程.jpg","bb87b9e4b5001779dd4d365cbe6af33d"],["/2018/05/25/微信公众号/验证公众号.jpg","72540fb2be5ced94c709b6a8f1a1b85b"],["/2018/05/29/gulp/index.html","b8218386bbf00591af1fa8d7907e5606"],["/2018/05/30/gulp插件/index.html","9f730feee4c00cc93bb308841e8f7a5f"],["/2018/05/31/es6快学/index.html","7914ad97a0080e690ccdb5723bfa80b9"],["/2018/06/11/小程序/index.html","a80aeb8e51e79f488468856c6c30dda3"],["/2018/06/11/小程序/图片1.png","a70e2059dbd63d02de44cb09783642f7"],["/2018/06/11/小程序/图片10.png","253b5cb5d64d8a085a939479cbd82c61"],["/2018/06/11/小程序/图片11.png","2394147ba042004e52c563dab2566e86"],["/2018/06/11/小程序/图片12.png","15685ed43535dcd8f669a3a62d0c944c"],["/2018/06/11/小程序/图片13.png","6ddfee2874af19fdda5457a6ebb07a4a"],["/2018/06/11/小程序/图片2.png","17cf31e03a529dd16d30cdba237d261b"],["/2018/06/11/小程序/图片3.png","4c418c305ea29c2652073b3fb2f60e9c"],["/2018/06/11/小程序/图片4.png","1dd0a93c3455171775630e16ba06d315"],["/2018/06/11/小程序/图片5.png","9b2af48344d07f6b52939b2f7f411eeb"],["/2018/06/11/小程序/图片6.png","2113900dc3174e66b31dce4265e8b3e4"],["/2018/06/11/小程序/图片7.png","5a03ad0f423874e9a55ea00ab5fe7567"],["/2018/06/11/小程序/图片8.png","a6e291f21158b3c9ea65cba5ca508458"],["/2018/06/11/小程序/图片9.png","ce85efe0c14262c802704c8a87df61fa"],["/2018/06/12/css/TIM截图20180612152920.jpg","90ec841c094cba227458755449a4cee2"],["/2018/06/12/css/index.html","bfb62d8af40bc1958a059d4267da1f52"],["/2018/06/12/微信直播/index.html","fe5c0a85e8425f3898da753d020fd874"],["/2018/06/12/文本样式/font-weight.jpg","5ff1244ea47b3c5561e587036c66c695"],["/2018/06/12/文本样式/index.html","4d68f767a7a743955c82c2645a43c297"],["/2018/06/12/文本样式/字体.png","c38e59b8c80d76400ee9802270ad0034"],["/2018/06/12/文本样式/字体族.jpg","b2de214630030f8e2e50a13b670f9ac8"],["/2018/06/12/文本样式/通用字体族.jpg","c0496ec92b179d44b46f60c10fdf285d"],["/2018/06/13/浮动/float.jpg","195047130f66f69bd8e14a7b2ae85f2e"],["/2018/06/13/浮动/index.html","fd4887afcb2031b41648e3d712fb066f"],["/2018/06/14/定位与堆叠/absolute.jpg","2371e331ad81280b2788fd2e56aad0c7"],["/2018/06/14/定位与堆叠/index.html","941afeeaf674a119ce702da7b6a3b606"],["/2018/06/14/定位与堆叠/z-index.png","c148506f5397247c847de3514432b6dd"],["/2018/06/14/定位与堆叠/堆叠上下文.jpg","283475ec7454d34584f1c9c7f7526345"],["/2018/06/14/定位与堆叠/堆叠上下文2.jpg","f0e76597c4d8e71daa40deae8f450624"],["/2018/06/14/层叠继承和css单位/hsl.jpg","daf4d3b2f7a4e41fc4c7b9b3fd187537"],["/2018/06/14/层叠继承和css单位/index.html","517ac7cb1041c8dee978e54735d59150"],["/2018/06/14/层叠继承和css单位/specificityimg.png","c409c760c0bee888743dc2697303bbf2"],["/2018/06/14/盒模型/boxmodel.jpg","182d83d8c0f7ed736753d56aeb33f9f5"],["/2018/06/14/盒模型/index.html","5028a4bb4b6b0357b26e8c0c54fd4b60"],["/2018/06/14/盒模型/块级元素.png","ac0f46d33990a8c334393f2756c8b566"],["/2018/06/14/盒模型/盒子.jpg","f24b489edc37893b648f204bd09e6b59"],["/2018/06/14/盒模型/行级盒子.png","1de67777abd275e145a9d723540b8696"],["/2018/06/15/排版细节/index.html","c7bcc0198a9598311e42ae498274ca17"],["/2018/06/15/排版细节/line-box.png","804f848fe0559f5878bbec084365c0c7"],["/2018/06/15/排版细节/line-height.jpg","8579db767ab7a063d10d9d08f808d61f"],["/2018/06/15/排版细节/list-style-position.jpg","8b4712167cf42e8912e4e7104df16c54"],["/2018/06/15/排版细节/ver.jpg","4113f24f1cedc05e125402dd2f4e0929"],["/2018/06/15/排版细节/vertical-box.jpg","9affd804dcbba504208259ab28cded5e"],["/2018/06/15/排版细节/行级格式化上下文.png","be81f02d35b6a40fa70bc5ac660b457e"],["/2018/06/19/动画/index.html","9cd53dc32dfdbd659b496148cbf53461"],["/2018/06/19/布局/Grid.jpg","26a0d2148046f3b32296322161e49b1b"],["/2018/06/19/布局/align-content.png","d037edf6132bfcde471a8758368c7afe"],["/2018/06/19/布局/align-items.png","390dc826058dea5b0c438b756f76efa0"],["/2018/06/19/布局/flex-direction.jpg","032c7d0177e1e7f7dc80ff544401ee66"],["/2018/06/19/布局/index.html","a2fb8b22d01341f52b544bc4509e25ce"],["/2018/06/19/布局/justify-content.png","808ddfdbafc273f8e5a67a5200779709"],["/2018/06/19/布局/主轴.png","c5d1828f3d186ca4b7dc4f7f94262b96"],["/2018/06/19/布局/伪等高.jpg","4869df0907a355d589c8472206df4124"],["/2018/06/19/布局/兼容性.jpg","84f9642da96a50308abf0b5199823fe4"],["/2018/06/19/布局/展示.jpg","282e4e875fc3c895c8cc83316c64d664"],["/2018/06/20/兼容性/index.html","be60a9dc34adc0aeeac3a331ad19b0e6"],["/2018/06/20/兼容性/supports.jpg","f58791c8f5287c8038a47fefc95734b5"],["/2018/06/20/响应式设计/index.html","6290f14264f29fb746680194c0062daa"],["/2018/06/20/响应式设计/网格.png","42bc34cd435f54ca5a82e600ebc2cf60"],["/2018/06/20/工程化/Media.jpg","add9300d6b7e82aa209213a6af4e58a3"],["/2018/06/20/工程化/index.html","ab285414aaa3a2aeeb7932dd3c4a66e0"],["/2018/06/20/工程化/文件结构.png","01319361f90fdbce13db10a654699be2"],["/2018/06/20/高级选择器/index.html","c480190e121f4927c1f8e906eb40f730"],["/2018/06/21/html简述与文本/index.html","728a025e29434319d0527ee2a5f49c64"],["/2018/06/21/html简述与文本/网页总体结构.png","525e10b1bbf3187d956442d069429ead"],["/2018/06/21/text-size-adjust使用汇总/index.html","ac3b00b3073148cbf54989629ab8925a"],["/2018/06/21/表单/index.html","7fc51c65569dd39b6544e6f53eb28cb8"],["/2018/06/21/表格/index.html","a99ab4cbb2c6e8bd4d5fe6875c32a429"],["/2018/06/21/表格/table.png","246ed67c73c604feeb989e33a04f85d8"],["/2018/06/21/连接与图片/href.jpg","35d9804506bd416ba61bd8aaadc60b44"],["/2018/06/21/连接与图片/index.html","25b917badccffbf3bd3b4ec78927ff61"],["/2018/06/24/HTML补充知识/index.html","28a46114bfe169f9e48bf6c198077de0"],["/2018/06/26/node深研/index.html","127d249f4546b81eefda9f7268d972d5"],["/2018/06/26/node深研/node.jpg","3a772fd012b29957cb58e9f970a57ed0"],["/2018/06/26/node深研/nodeloop.png","3228e8674a48daffa748ec1bbe57005c"],["/2018/06/26/node深研/nodepoll.png","b9b30c76b65c0bd5a5c15fd293f736c0"],["/2018/06/26/node深研/node中执行.png","a55b9b539d01c5d80b307ed6d00b4f99"],["/2018/06/26/node深研/浏览器EventLoop.jpg","75b404807ad79b3c6793e22b7bb4fa99"],["/2018/06/26/node深研/浏览器执行.png","261c1097d6ddb15ccaab17f1e7146ccd"],["/2018/06/26/node深研/非node.jpg","60799224a7296b67e6aab80cfff07cfb"],["/2018/07/05/css预处理器/index.html","d325c171e5ef117317ae2014be8d5b96"],["/2018/07/06/css框架bootstarp/index.html","c5ac17c202a5fac34bf8bcf5694ec6fd"],["/2018/07/06/css框架bootstarp/响应式.png","344bbc8c625bdaf12adacf6e486839ea"],["/2018/07/06/框架中的css/index.html","954d003026203acf928edba87aecbcd9"],["/2018/07/06/框架中的css/video.jpg","e2beddb9d11146a7dd7f6fbc25449e71"],["/2018/07/06/框架中的css/开启shadowDom.png","4f5696d1d56bcdad51ff818a5a355620"],["/2018/07/09/HTML汇总/HTML版本.jpg","a2de2f22a0e5e32c132b9e194b124e3f"],["/2018/07/09/HTML汇总/flow.jpg","cc556f4c7918f1084c078fadc496bf56"],["/2018/07/09/HTML汇总/index.html","8558961fd5c4b3044aa91a773b42ae0f"],["/2018/07/09/HTML汇总/viewport.jpg","3433e5a1a8d68dca799f8de98090616e"],["/2018/07/09/css动画/index.html","6e69287c0d5a60c42c2eb2ece9ff534c"],["/2018/07/09/css动画/timing.jpg","11381af2541edf17105dc5fb78a78595"],["/2018/07/09/css动画/关键帧动画.png","8b97823ef80053e1e4bf5be149f5b442"],["/2018/07/09/css动画/补间动画.jpg","fd1fe81cdad4b55be69df95e3564b2ff"],["/2018/07/09/css动画/逐帧动画.png","979dcead8f1267ae3ffd9dd7baba04f3"],["/2018/07/10/css工程化/BrowserList.jpg","531d83232ff6665f1923b88bc0e0cc93"],["/2018/07/10/css工程化/cssnext.jpg","7335e813a1c17987a0abceebf5f3aae9"],["/2018/07/10/css工程化/index.html","94d00476f0c9dae9b31f063eb519a64c"],["/2018/07/10/css工程化/postcss.jpg","04bcb1c638cc01f4bee3aa8f00ee0794"],["/2018/07/10/css效果/3d.jpg","cf03dc97e063fbbbfbe94a3e7a13f742"],["/2018/07/10/css效果/box-shadow.png","df23506b9fe84b10b30e51a1e255301c"],["/2018/07/10/css效果/index.html","7229abc267c86644aef7e88569b560f2"],["/2018/07/10/css效果/svg.jpg","eb4d637e191675b85c0015a9d27ce0eb"],["/2018/07/10/css效果/transform.jpg","a80701f47cf5ecda171d3506cce6933a"],["/2018/07/23/promise详解/generator.png","f4fcfef52f06a98d5a75871a8597673c"],["/2018/07/23/promise详解/index.html","a0ac85378912db8bdfece6395c8e1f20"],["/2018/07/25/babel/index.html","ac9644de4898ce354d141de1801d14c7"],["/2018/07/25/mobx/index.html","6066cd76a56833b47d72e0928f88b104"],["/2018/08/08/TCP/index.html","64a4106fb994d701e182e1c73c554ea9"],["/2018/08/08/TCP/osi7层模型.jpg","c381afbb827d435be07280d3853cf850"],["/2018/08/29/vscode插件/00-400x264.png","e90d695457081461db2b05d952d61366"],["/2018/08/29/vscode插件/01-400x445.png","87c3e3f2fefb71eadde6352424f423a0"],["/2018/08/29/vscode插件/02-400x189.png","b9edb62ee6cf2463e9b81dafff455033"],["/2018/08/29/vscode插件/03-400x75.png","8abe946ffe1e5a0098bfcf775c17fde8"],["/2018/08/29/vscode插件/04.png","2067b3880ffe4e5aea78a4c6721a7d3e"],["/2018/08/29/vscode插件/1.png","6d96b9deb30059b657aeb654b30fee26"],["/2018/08/29/vscode插件/2.png","1bad6dfb64a3994a83f026261efd4cbd"],["/2018/08/29/vscode插件/20180815183752751.png","9527477ba23943ba6374f97308b18786"],["/2018/08/29/vscode插件/20180815183812965.png","9c4f06e8431751d5a2db56107a1dc3c2"],["/2018/08/29/vscode插件/20180815183830941.png","0451b90e09e7a1d6ba9e1de539c65a97"],["/2018/08/29/vscode插件/index.html","eb8b7ea379ad1d3ba70ad5af31ed82ef"],["/2018/09/05/浏览器渲染/chromium.jpg","24d65d9aea03aad1b6b61fec5e14fa38"],["/2018/09/05/浏览器渲染/index.html","2766006459fd00c796f206d696710ffb"],["/2018/09/05/浏览器渲染/webkit架构图.jpg","4e8c7ccf92374f0f5480d0c8cef265a3"],["/2018/09/05/浏览器渲染/浏览器渲染.jpg","688510d10251aeeb7aebe99cac44785a"],["/2018/09/05/浏览器渲染/渲染引擎.jpg","0e5bd1558438622e0f387518198b85c9"],["/2018/09/05/浏览器渲染/网络栈.jpg","4f6fb8c4708d291eba0160bbde00bce4"],["/2018/09/05/浏览器渲染/进程.jpg","4a870c3f4bf74468496142621b70643b"],["/2018/09/06/前端性能优化/index.html","6321459c600268e278131042f794defd"],["/2018/09/17/前端设计模式/index.html","bfb180b00303a01107b78d9fa306f2c0"],["/2018/09/20/vue-MVVM实现/index.html","11bfa99e00a44b0db1c5ad1c97887bfd"],["/2018/12/03/Mocha与chai/index.html","02544fbacd4234c88368c15c5e23005a"],["/2018/12/03/test-1/index.html","d2f9941a698f2d7cea52d6aa2b235cdb"],["/2018/12/04/Jest/index.html","96058fc50304ed36d9a196290d2a0bcd"],["/2018/12/04/enzyme/index.html","4b38cc9e56b7b905a4047b73b9298825"],["/2018/12/06/cypress/index.html","dd7d0e308c1a459998e81d5c9f938f6a"],["/404.html","dcbc8f26884308ebbc8b533c45608587"],["/archives/2018/05/index.html","a961263fb2a0516b8b177a4b8af327ce"],["/archives/2018/06/index.html","6e71f31043c5787440c5bf4ef47bed7f"],["/archives/2018/06/page/2/index.html","8e0481185016096df2f8e03c918913e8"],["/archives/2018/06/page/3/index.html","13e9f104eceeca063c926434121150f0"],["/archives/2018/07/index.html","e6e83c48e516bce264f4cf9ea9184618"],["/archives/2018/08/index.html","cfffdc2025780163a51b0ed460ca26d8"],["/archives/2018/09/index.html","8db0dfdf3714a6e3a7e09369d9fc835f"],["/archives/2018/12/index.html","aa3fce105b29312b9615fa2d39866b0f"],["/archives/2018/index.html","2fc69ce19bfeb87fd80335462229d476"],["/archives/2018/page/2/index.html","466d88ae56984e8f10735157f1e5745f"],["/archives/2018/page/3/index.html","8d7cb08843dc8e93a543e48d8b855d61"],["/archives/2018/page/4/index.html","aae46753596eb78e6710185c1d82d2d8"],["/archives/2018/page/5/index.html","6d7bbf6c5f6be305839380e2c8982c4d"],["/archives/2018/page/6/index.html","446153ea2c5909f7b8018bd4796114fd"],["/archives/index.html","88e0d7eb163d67b879e235c343cb8641"],["/archives/page/2/index.html","5282698578c6feae57fad955f10f0c9d"],["/archives/page/3/index.html","2273da0d1a56623bfe2940571f620a2f"],["/archives/page/4/index.html","ae30931ca2b44e1cca4444dc1c498e45"],["/archives/page/5/index.html","dc3bcf27b44a72fd72d69a74de62aab0"],["/archives/page/6/index.html","351f60c0b5e8d173ca852e07181486a0"],["/bundle.js","3cf8ab2eedb168aa56078bfb5b719543"],["/css/main.css","e9be4b5eca7315f984529435624d0d4f"],["/images/algolia_logo.svg","fd40b88ac5370a5353a50b8175c1f367"],["/images/apple-touch-icon-next.png","fce961f0bd3cd769bf9c605ae6749bc0"],["/images/avatar.gif","2bed513bc5f13733cf9a8a12c4e1a971"],["/images/cc-by-nc-nd.svg","1c681acc4a150e7236254c464bb5a797"],["/images/cc-by-nc-sa.svg","12b4b29e8453be5b7828b524d3feabce"],["/images/cc-by-nc.svg","dd9cfe99ed839a4a548114f988d653f4"],["/images/cc-by-nd.svg","2d80546af20128215dc1e23ef42d06c2"],["/images/cc-by-sa.svg","c696b3db81cbbfba32f66c1dc88b909a"],["/images/cc-by.svg","6c4f8422b3725cb9f26b6c00e95fc88b"],["/images/cc-zero.svg","79deee77a07fcb79ff680ac0125eacb9"],["/images/favicon-16x16-next.png","b8975923a585dbaa8519a6068e364947"],["/images/favicon-32x32-next.png","5a029563fe3214c96f68b46556670ea1"],["/images/loading.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/logo.svg","ddad9027e42111ccd5b466bc18188970"],["/images/placeholder.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/quote-l.svg","1238a4baccd02c6025ec85b58f4282d4"],["/images/quote-r.svg","85787c6fa27965c81f7be70252b43bed"],["/images/searchicon.png","3d6b5c9d6d6c26a2b76a14b8fdf3438a"],["/index.html","8420448de500ca98467b042909048ced"],["/js/src/affix.js","683c19859764baf0d17538897ea1eba2"],["/js/src/algolia-search.js","f5fa392318805997089ceb3a925979ba"],["/js/src/bootstrap.js","2a1083772854ae2663748e0a25c17285"],["/js/src/exturl.js","2b444179b3145e5007b4d371dac07cd3"],["/js/src/hook-duoshuo.js","45997b0c06abff3cd88efd901f614065"],["/js/src/js.cookie.js","6e9eb1f53afb135aedaf90739c867738"],["/js/src/motion.js","0f6add86607c451269d0b3d286c84d8b"],["/js/src/post-details.js","b8e8e27c27c697567879c52888ffc24c"],["/js/src/schemes/pisces.js","827b5ad25e1142277c1e7dfe0cacebe5"],["/js/src/scroll-cookie.js","890406ae3539e4721ef5f314542e5e46"],["/js/src/scrollspy.js","fafdd7ab6af233b701506c733910b7f5"],["/js/src/utils.js","24512c3455f976730b7bf75e1222c533"],["/lib/Han/dist/font/han-space.woff","b09f2dd7d3ad8ad07f3b8495133909d9"],["/lib/Han/dist/font/han.woff","e841c6b547bc06a06f60f4de52bf906e"],["/lib/Han/dist/font/han.woff2","2b06aa1c952a2dfaf00d99218689d147"],["/lib/Han/dist/han.css","cfcc552e7aebaef5e2f34aee030b956b"],["/lib/Han/dist/han.js","575b6c1667c01798730fbd972e959c9c"],["/lib/Han/dist/han.min.css","cab466d758269b437167422c4a16b364"],["/lib/Han/dist/han.min.js","96482c9c2b3c5ea9bf5a40db162c7f34"],["/lib/algolia-instant-search/instantsearch.min.css","029a13b44e6807955106ff3c075a02f9"],["/lib/algolia-instant-search/instantsearch.min.js","0db46eba0c8133693ee839507b1612f2"],["/lib/canvas-nest/canvas-nest.min.js","36e103d2a05bc706bac40f9ab8881eb7"],["/lib/canvas-ribbon/canvas-ribbon.js","16dc214240913551986593808c2efcfc"],["/lib/fancybox/source/blank.gif","325472601571f31e1bf00674c368d335"],["/lib/fancybox/source/fancybox_loading.gif","328cc0f6c78211485058d460e80f4fa8"],["/lib/fancybox/source/fancybox_loading@2x.gif","f92938639fa894a0e8ded1c3368abe98"],["/lib/fancybox/source/fancybox_overlay.png","77aeaa52715b898b73c74d68c630330e"],["/lib/fancybox/source/fancybox_sprite.png","783d4031fe50c3d83c960911e1fbc705"],["/lib/fancybox/source/fancybox_sprite@2x.png","ed9970ce22242421e66ff150aa97fe5f"],["/lib/fancybox/source/helpers/fancybox_buttons.png","b448080f8615e664b7788c7003803b59"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.css","cac75538c2e3ddfadef839feaca8e356"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.js","f53c246661fb995a3f12e67fa38e0fa0"],["/lib/fancybox/source/helpers/jquery.fancybox-media.js","c017067f48d97ec4a077ccdf056e6a2e"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.css","52ddd84a9f42c1d4cd86d518a7f7e8bc"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.js","cf1fc1df534eede4cb460c5cbd71aba6"],["/lib/fancybox/source/jquery.fancybox.css","6c55951ce1e3115711f63f99b7501f3a"],["/lib/fancybox/source/jquery.fancybox.js","921e9cb04ad6e2559869ec845c5be39b"],["/lib/fancybox/source/jquery.fancybox.pack.js","cc9e759f24ba773aeef8a131889d3728"],["/lib/fastclick/README.html","b3cd6e7f930bf6e410a2e7eab8a148a8"],["/lib/fastclick/lib/fastclick.js","6e9d3b0da74f2a4a7042b494cdaa7c2e"],["/lib/fastclick/lib/fastclick.min.js","a0fc6c24d1f3ff9ac281887c92b24acd"],["/lib/font-awesome/css/font-awesome.css","c495654869785bc3df60216616814ad1"],["/lib/font-awesome/css/font-awesome.min.css","269550530cc127b6aa5a35925a7de6ce"],["/lib/font-awesome/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["/lib/font-awesome/fonts/fontawesome-webfont.svg","912ec66d7572ff821749319396470bde"],["/lib/font-awesome/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["/lib/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["/lib/font-awesome/fonts/fontawesome-webfont.woff2","af7ae505a9eed503f8b8e6982036873e"],["/lib/jquery/index.js","32015dd42e9582a80a84736f5d9a44d7"],["/lib/jquery_lazyload/CONTRIBUTING.html","7287727950845c8a1010f3933691afef"],["/lib/jquery_lazyload/README.html","d89aa4afe316331a25b636b5ead4716e"],["/lib/jquery_lazyload/jquery.lazyload.js","8b427f9e86864ee3aaf1ae33e6e14263"],["/lib/jquery_lazyload/jquery.scrollstop.js","f163fd8f02361928853668a96f8a1249"],["/lib/needsharebutton/font-embedded.css","dd8861d10d1ed6b5e0c0011adfb39be9"],["/lib/needsharebutton/needsharebutton.css","30f2f800e13f7b6b83629a4cbd9749ef"],["/lib/needsharebutton/needsharebutton.js","6c6f855f7d50f4bc3c804f52b03bbfbb"],["/lib/pace/pace-theme-barber-shop.min.css","e8dc66cf2d88abc25fbc89b8a0529abb"],["/lib/pace/pace-theme-big-counter.min.css","db2b8fe31e60f19021545277d2f6e05e"],["/lib/pace/pace-theme-bounce.min.css","ad954aa0bace4b213eeb19d6e89a0bda"],["/lib/pace/pace-theme-center-atom.min.css","8f6bc803acefc6f93afc98fb38201456"],["/lib/pace/pace-theme-center-circle.min.css","93c72298781226a80a9c66b27b21a57d"],["/lib/pace/pace-theme-center-radar.min.css","f0099bdd1cd42e9476bd7abc417c0328"],["/lib/pace/pace-theme-center-simple.min.css","eddff4756dbf21dbbff1c543bd894dde"],["/lib/pace/pace-theme-corner-indicator.min.css","776826157cb28ac1ee5e78771292b9ba"],["/lib/pace/pace-theme-fill-left.min.css","965859b39001da08e1e92327fe3d8e12"],["/lib/pace/pace-theme-flash.min.css","aab39b436e1fa0fdc51df06f2d53c38a"],["/lib/pace/pace-theme-loading-bar.min.css","4e05877f1f9efb9c1e7dd75cb78c764f"],["/lib/pace/pace-theme-mac-osx.min.css","29ae030ceaa8158352c5472218375b91"],["/lib/pace/pace-theme-minimal.min.css","f48f04d370993b55a2745e548cc82743"],["/lib/pace/pace.min.js","24d2d5e3e331c4efa3cda1e1851b31a7"],["/lib/three/canvas_lines.min.js","1324174ae6190fbf63b7bf0ad0a8a5bd"],["/lib/three/canvas_sphere.min.js","5c6bc45b137448b5b9df152ccfb2659c"],["/lib/three/three-waves.min.js","41059bd5e5c7aa520b1b411919e5121f"],["/lib/three/three.min.js","3298078bce82bdb1afadf5b1a280915e"],["/lib/ua-parser-js/dist/ua-parser.min.js","a6e833266c4b41fabb9ba94a145322d8"],["/lib/ua-parser-js/dist/ua-parser.pack.js","6b627e4d61a7135952824bb9c1a4a134"],["/lib/velocity/velocity.js","0361fa6dcf4cf4d19c593cdab0937dd0"],["/lib/velocity/velocity.min.js","c1b8d079c7049879838d78e0b389965e"],["/lib/velocity/velocity.ui.js","f55d22cc592c9f8d4ffd3b41a6b90081"],["/lib/velocity/velocity.ui.min.js","444faf512fb24d50a5dec747cbbe39bd"],["/live2dw/assets/moc/hibiki.2048/texture_00.png","730252369524e7a1c21308cb84acd465"],["/live2dw/lib/L2Dwidget.0.min.js","7d6ea3548b666c761bfb3a01f25ae87d"],["/live2dw/lib/L2Dwidget.min.js","0c58a1486de42ac6cc1c59c7d98ae887"],["/page/2/index.html","f0c2fd32450fdb79756a057d82f35bbd"],["/page/3/index.html","83d6f3b59dfa6c714457c525fae31bf6"],["/page/4/index.html","a2d4b2e4b45a46d0397a80a8749684a9"],["/page/5/index.html","d551c2ae87ea8ada8cbb2a393be51823"],["/page/6/index.html","c6ce33e0f152cb4c3d8979d26b8e4bad"],["/style.css","59382be79f56314919541bbbcd43722e"],["/sw-register.js","603bfb4b7ca4abfc9a996011c308a2a5"],["/tags/Event-Loop/index.html","77538c6b6182317b3f776f29f26b4c4e"],["/tags/HTML/index.html","0a0703248432a249878131da6f541610"],["/tags/HTML汇总/index.html","0eaee828914f2ed89d09c662699f9ddb"],["/tags/MVVM/index.html","07abb1aadb0ab6bf795e43284a0e74e0"],["/tags/babel/index.html","0f04ebfa8cbb1e5ab380ea202ccbf8aa"],["/tags/blog/index.html","c1877aeafe59adeb9c736a332890afab"],["/tags/bootstrap/index.html","8df29e0b56a539b63ba157f346f41b69"],["/tags/css/index.html","3858393a86b89e661c706ff4d69e6e7d"],["/tags/css/page/2/index.html","7169160913bef1c8761b3e86b6b97060"],["/tags/css动画/index.html","d7307f85bd5764bac4787732adf9e12b"],["/tags/css工程化/index.html","c3d6d7a83620a9d10dab49ae1d5b36f7"],["/tags/css效果/index.html","e09d47eb4e5c7a746527e1f150877fca"],["/tags/cypress/index.html","4eecd0aad85eba74e63486be01b6582e"],["/tags/e2e/index.html","5b06e7e938991a88032b962aa756a207"],["/tags/enzyme/index.html","b6ad2d156f67296bb71c694857d269c7"],["/tags/es6/index.html","c15f56625ab8f3da703ca98ec2f0f836"],["/tags/git/index.html","44790189c8b8b224d7f27b35bd9662c3"],["/tags/global/index.html","d007068da5d3ce6e7c78b11dbb775067"],["/tags/gulp/index.html","e3e7b7ec01eea9ea05006e1d638712ef"],["/tags/hexo/index.html","7d816beb3abfb4efd9a0bdb2b9f7f9ae"],["/tags/http/index.html","ef77c62418eca6abfd4e24179b09feb5"],["/tags/index.html","2ce2d9402e740e09838f390d0aecf516"],["/tags/jest/index.html","380c60f8c244827399f81f4f7c9c2274"],["/tags/js/index.html","9edd9fe93e0783fc3f65532309eecb3c"],["/tags/node/index.html","8bec8216ab8e2c31e290bb53edf28953"],["/tags/nodemon/index.html","9b8f799d356e2aff9d0885414c34e43b"],["/tags/npx/index.html","938e08251c16fe124808bc16caf1b477"],["/tags/promise/index.html","33f5f9567150b06cffbfd95b84042128"],["/tags/react/index.html","8fabcb15f3f0ed3041012e814c09bb2a"],["/tags/tcp/index.html","4223b93682a26edb7788bd5c853bb647"],["/tags/test/index.html","f35244b3faf81f7d13752ce8a48e96e2"],["/tags/vscode/index.html","ee29a92cd83c44a137d4c3186706e983"],["/tags/vscode插件/index.html","735b9508e8cc4c8c6456260101dfaeae"],["/tags/vue/index.html","ba0949d6c9b516a28b70ca7d38da6b12"],["/tags/前端基础/index.html","23fc96b0f3207a80bb27185b02b2e817"],["/tags/前端基础/page/2/index.html","4e389e453c8055d671b407da49e8e372"],["/tags/前端基础/page/3/index.html","b319a146f2829e95d76ab93e686567bb"],["/tags/单元测试/index.html","f4ccaf4701117d0f109769e08a4f21ef"],["/tags/小程序/index.html","220100e501f92ba9baafce2b731a3764"],["/tags/异步/index.html","d28b2dd98f687bcb8d6c227153d932d5"],["/tags/微信/index.html","750afd760bbb7f16b86b16320da249d6"],["/tags/性能优化/index.html","8008b8772d4dcbb3e7a65a2bcc7882e3"],["/tags/插件/index.html","66e2c58d1ffa6b411ba148b7d22412a6"],["/tags/构建工具/index.html","456ce125ddbd93e0087082dc93529df5"],["/tags/架构/index.html","f9a02cdd10acabd4c05101441010f833"],["/tags/框架中的css/index.html","a0c43711907352052a966fae9875cf76"],["/tags/测试/index.html","cc1fa1595090da01a787e6ba8bc82438"],["/tags/浏览器/index.html","02b7cee5f2cf02a52ac6255554ef4dbc"],["/tags/浏览器渲染/index.html","767ec1791c21e55d2dddf3ed1890d259"],["/tags/网路/index.html","ad3a16c56370b5e70f0fa7ebf7a9d40d"],["/tags/设计模式/index.html","672970cd72d7afd644dbca27039fd3d2"],["/tags/预处理器/index.html","26e5fe5d26abef520861731c85512ffd"],["/uploads/avatar.jpg","19392dd66f6175e4ea17280adf4db7e8"],["/uploads/wechatpay.jpg","dc08d8b0df0a37e3e11e78174709ba0f"]];
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
