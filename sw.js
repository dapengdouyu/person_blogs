/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2018/05/21/git/0.png","bd069bbbca4e2d1c0e2b4416df5dd14b"],["/2018/05/21/git/fetch_HEAD.png","10831dc4bae97a7504b7ff5209368861"],["/2018/05/21/git/gitlog.png","76841726e0cc211fbfaac8d9b273281a"],["/2018/05/21/git/git基本流程.png","ec6c0c1f69c4ed94b8ad0b881e40d469"],["/2018/05/21/git/git版本.png","42235a95fa69d23fee78b7ccf57af822"],["/2018/05/21/git/index.html","6268410a707690f5c4dd09349721b61f"],["/2018/05/21/git/no-ff.png","4fae485fb0062c35d7ac9ea36f16b0d9"],["/2018/05/21/git/tracking.png","a1fb55bd83f8930da4cd25ee7b393180"],["/2018/05/21/git/分布式.png","36811a240cf686b00787ace6a723e2bf"],["/2018/05/21/git/集中式.png","5bbcfb2d2a77f7770f937a6a26cb3413"],["/2018/05/21/hexo建站指南/index.html","1ada360cbe2ff1032bfad1658084b831"],["/2018/05/21/hexo建站指南/js.png","fd78c647158c594390d124b234f23ac8"],["/2018/05/21/nodemon/index.html","43618e72d29b0ed6ed32e4218a141ffa"],["/2018/05/25/npx/index.html","70d8a8b234f6d40d387367c67660cd0d"],["/2018/05/25/微信公众号/index.html","d8225879196c80ba14436c5b221aac42"],["/2018/05/25/微信公众号/公众号权限.jpg","5307779292b4d88c413aca4b5d6242c7"],["/2018/05/25/微信公众号/微信交互过程.jpg","bb87b9e4b5001779dd4d365cbe6af33d"],["/2018/05/25/微信公众号/验证公众号.jpg","72540fb2be5ced94c709b6a8f1a1b85b"],["/2018/05/29/gulp/index.html","b60204a1a7fe1413d9167a6558e324e2"],["/2018/05/30/gulp插件/index.html","c4c2d7ee1ba04fcb070a63831c41cad5"],["/2018/05/31/es6快学/index.html","1f202e4503db559bd8e1fbab69397336"],["/2018/06/11/小程序/index.html","85bac8f86e909352b76656fe8b4efbee"],["/2018/06/11/小程序/图片1.png","a70e2059dbd63d02de44cb09783642f7"],["/2018/06/11/小程序/图片10.png","253b5cb5d64d8a085a939479cbd82c61"],["/2018/06/11/小程序/图片11.png","2394147ba042004e52c563dab2566e86"],["/2018/06/11/小程序/图片12.png","15685ed43535dcd8f669a3a62d0c944c"],["/2018/06/11/小程序/图片13.png","6ddfee2874af19fdda5457a6ebb07a4a"],["/2018/06/11/小程序/图片2.png","17cf31e03a529dd16d30cdba237d261b"],["/2018/06/11/小程序/图片3.png","4c418c305ea29c2652073b3fb2f60e9c"],["/2018/06/11/小程序/图片4.png","1dd0a93c3455171775630e16ba06d315"],["/2018/06/11/小程序/图片5.png","9b2af48344d07f6b52939b2f7f411eeb"],["/2018/06/11/小程序/图片6.png","2113900dc3174e66b31dce4265e8b3e4"],["/2018/06/11/小程序/图片7.png","5a03ad0f423874e9a55ea00ab5fe7567"],["/2018/06/11/小程序/图片8.png","a6e291f21158b3c9ea65cba5ca508458"],["/2018/06/11/小程序/图片9.png","ce85efe0c14262c802704c8a87df61fa"],["/2018/06/12/css/TIM截图20180612152920.jpg","90ec841c094cba227458755449a4cee2"],["/2018/06/12/css/index.html","94b046e3327373ac3ae43cad0eb8ff77"],["/2018/06/12/微信直播/index.html","49c807325e3a8b72054b4f9acc5215bd"],["/2018/06/12/文本样式/font-weight.jpg","5ff1244ea47b3c5561e587036c66c695"],["/2018/06/12/文本样式/index.html","a6b9bb37d24918dadf332f098b2c6cb8"],["/2018/06/12/文本样式/字体.png","c38e59b8c80d76400ee9802270ad0034"],["/2018/06/12/文本样式/字体族.jpg","b2de214630030f8e2e50a13b670f9ac8"],["/2018/06/12/文本样式/通用字体族.jpg","c0496ec92b179d44b46f60c10fdf285d"],["/2018/06/13/浮动/float.jpg","195047130f66f69bd8e14a7b2ae85f2e"],["/2018/06/13/浮动/index.html","903f0a78951c48838f4aaea7cc1e48b4"],["/2018/06/14/定位与堆叠/absolute.jpg","2371e331ad81280b2788fd2e56aad0c7"],["/2018/06/14/定位与堆叠/index.html","8e84e79bce510e0894faee4d2269cc34"],["/2018/06/14/定位与堆叠/z-index.png","c148506f5397247c847de3514432b6dd"],["/2018/06/14/定位与堆叠/堆叠上下文.jpg","283475ec7454d34584f1c9c7f7526345"],["/2018/06/14/定位与堆叠/堆叠上下文2.jpg","f0e76597c4d8e71daa40deae8f450624"],["/2018/06/14/层叠继承和css单位/hsl.jpg","daf4d3b2f7a4e41fc4c7b9b3fd187537"],["/2018/06/14/层叠继承和css单位/index.html","99c180d5122bd18b04a5072d1cf74dfc"],["/2018/06/14/层叠继承和css单位/specificityimg.png","c409c760c0bee888743dc2697303bbf2"],["/2018/06/14/盒模型/boxmodel.jpg","182d83d8c0f7ed736753d56aeb33f9f5"],["/2018/06/14/盒模型/index.html","bbf9a128e24a063f1dc5392efffb83b0"],["/2018/06/14/盒模型/块级元素.png","ac0f46d33990a8c334393f2756c8b566"],["/2018/06/14/盒模型/盒子.jpg","f24b489edc37893b648f204bd09e6b59"],["/2018/06/14/盒模型/行级盒子.png","1de67777abd275e145a9d723540b8696"],["/2018/06/15/排版细节/index.html","67bf9e77bca67569a8287a45bfd08ece"],["/2018/06/15/排版细节/line-box.png","804f848fe0559f5878bbec084365c0c7"],["/2018/06/15/排版细节/line-height.jpg","8579db767ab7a063d10d9d08f808d61f"],["/2018/06/15/排版细节/list-style-position.jpg","8b4712167cf42e8912e4e7104df16c54"],["/2018/06/15/排版细节/ver.jpg","4113f24f1cedc05e125402dd2f4e0929"],["/2018/06/15/排版细节/vertical-box.jpg","9affd804dcbba504208259ab28cded5e"],["/2018/06/15/排版细节/行级格式化上下文.png","be81f02d35b6a40fa70bc5ac660b457e"],["/2018/06/19/动画/index.html","b98d42f6ae634e919c4288d07feb41b4"],["/2018/06/19/布局/Grid.jpg","26a0d2148046f3b32296322161e49b1b"],["/2018/06/19/布局/align-content.png","d037edf6132bfcde471a8758368c7afe"],["/2018/06/19/布局/align-items.png","390dc826058dea5b0c438b756f76efa0"],["/2018/06/19/布局/flex-direction.jpg","032c7d0177e1e7f7dc80ff544401ee66"],["/2018/06/19/布局/index.html","66871e5676ee8038a858b5bf06cd30d1"],["/2018/06/19/布局/justify-content.png","808ddfdbafc273f8e5a67a5200779709"],["/2018/06/19/布局/主轴.png","c5d1828f3d186ca4b7dc4f7f94262b96"],["/2018/06/19/布局/伪等高.jpg","4869df0907a355d589c8472206df4124"],["/2018/06/19/布局/兼容性.jpg","84f9642da96a50308abf0b5199823fe4"],["/2018/06/19/布局/展示.jpg","282e4e875fc3c895c8cc83316c64d664"],["/2018/06/20/兼容性/index.html","b8eff300ea35c37192f017a4aea808bf"],["/2018/06/20/兼容性/supports.jpg","f58791c8f5287c8038a47fefc95734b5"],["/2018/06/20/响应式设计/index.html","b131f80b912a49f8fc3deecf86d44716"],["/2018/06/20/响应式设计/网格.png","42bc34cd435f54ca5a82e600ebc2cf60"],["/2018/06/20/工程化/Media.jpg","add9300d6b7e82aa209213a6af4e58a3"],["/2018/06/20/工程化/index.html","33cf117a8e704a6c5f5cd89da546481b"],["/2018/06/20/工程化/文件结构.png","01319361f90fdbce13db10a654699be2"],["/2018/06/20/高级选择器/index.html","6883459461a7f12862f27bccfbffd7a1"],["/2018/06/21/html简述与文本/index.html","f25a6fbdc17ddec288b1ea6431386893"],["/2018/06/21/html简述与文本/网页总体结构.png","525e10b1bbf3187d956442d069429ead"],["/2018/06/21/text-size-adjust使用汇总/index.html","e9f6f0f8f2e6fb1ac0664c614342645e"],["/2018/06/21/表单/index.html","33f38b967dc4f99c0c76d7b6cf367723"],["/2018/06/21/表格/index.html","4719773c102b51d5dc2557bd00d7eda5"],["/2018/06/21/表格/table.png","246ed67c73c604feeb989e33a04f85d8"],["/2018/06/21/连接与图片/href.jpg","35d9804506bd416ba61bd8aaadc60b44"],["/2018/06/21/连接与图片/index.html","b36789195517b6836da8b9c10f926cd5"],["/2018/06/24/HTML补充知识/index.html","09a3153511f31a137dfe08203cec1951"],["/2018/06/26/node深研/index.html","6aaac978ea3487027ad4ff9f0d7212d7"],["/2018/06/26/node深研/node.jpg","3a772fd012b29957cb58e9f970a57ed0"],["/2018/06/26/node深研/nodeloop.png","3228e8674a48daffa748ec1bbe57005c"],["/2018/06/26/node深研/nodepoll.png","b9b30c76b65c0bd5a5c15fd293f736c0"],["/2018/06/26/node深研/node中执行.png","a55b9b539d01c5d80b307ed6d00b4f99"],["/2018/06/26/node深研/浏览器EventLoop.jpg","75b404807ad79b3c6793e22b7bb4fa99"],["/2018/06/26/node深研/浏览器执行.png","261c1097d6ddb15ccaab17f1e7146ccd"],["/2018/06/26/node深研/非node.jpg","60799224a7296b67e6aab80cfff07cfb"],["/2018/07/05/css预处理器/index.html","fbb96a23d08c9efc161b6402410284b7"],["/2018/07/06/css框架bootstarp/index.html","6acefd794dee6af71d561a13f3240bc1"],["/2018/07/06/css框架bootstarp/响应式.png","344bbc8c625bdaf12adacf6e486839ea"],["/2018/07/06/框架中的css/index.html","81897630c1dd0bbe2bc1f3afbb783c19"],["/2018/07/06/框架中的css/video.jpg","e2beddb9d11146a7dd7f6fbc25449e71"],["/2018/07/06/框架中的css/开启shadowDom.png","4f5696d1d56bcdad51ff818a5a355620"],["/2018/07/09/HTML汇总/HTML版本.jpg","a2de2f22a0e5e32c132b9e194b124e3f"],["/2018/07/09/HTML汇总/flow.jpg","cc556f4c7918f1084c078fadc496bf56"],["/2018/07/09/HTML汇总/index.html","8eed6e5a4cb52f57a68d0435e0d6e078"],["/2018/07/09/HTML汇总/viewport.jpg","3433e5a1a8d68dca799f8de98090616e"],["/2018/07/09/css动画/index.html","77eab22a5e95c423163d7bbedc9505bb"],["/2018/07/09/css动画/timing.jpg","11381af2541edf17105dc5fb78a78595"],["/2018/07/09/css动画/关键帧动画.png","8b97823ef80053e1e4bf5be149f5b442"],["/2018/07/09/css动画/补间动画.jpg","fd1fe81cdad4b55be69df95e3564b2ff"],["/2018/07/09/css动画/逐帧动画.png","979dcead8f1267ae3ffd9dd7baba04f3"],["/2018/07/10/css工程化/BrowserList.jpg","531d83232ff6665f1923b88bc0e0cc93"],["/2018/07/10/css工程化/cssnext.jpg","7335e813a1c17987a0abceebf5f3aae9"],["/2018/07/10/css工程化/index.html","e3242bbdbf7ac90d35ccbed3987f5746"],["/2018/07/10/css工程化/postcss.jpg","04bcb1c638cc01f4bee3aa8f00ee0794"],["/2018/07/10/css效果/3d.jpg","cf03dc97e063fbbbfbe94a3e7a13f742"],["/2018/07/10/css效果/box-shadow.png","df23506b9fe84b10b30e51a1e255301c"],["/2018/07/10/css效果/index.html","1348b5ea5cc8dc76b71a3927c1ccadb5"],["/2018/07/10/css效果/svg.jpg","eb4d637e191675b85c0015a9d27ce0eb"],["/2018/07/10/css效果/transform.jpg","a80701f47cf5ecda171d3506cce6933a"],["/2018/07/23/promise详解/generator.png","f4fcfef52f06a98d5a75871a8597673c"],["/2018/07/23/promise详解/index.html","1f00dcb165c569d89605a9108b4df74f"],["/2018/07/25/babel/index.html","a5300af0aa6c6f44f542095aab2f0235"],["/2018/07/25/mobx/index.html","32c35dd310c1ae8d2d103c65aa911c4a"],["/2018/08/08/TCP/index.html","fd4e10bb61574b03fa8f0c0f466cf3cf"],["/2018/08/08/TCP/osi7层模型.jpg","c381afbb827d435be07280d3853cf850"],["/2018/08/29/vscode插件/00-400x264.png","e90d695457081461db2b05d952d61366"],["/2018/08/29/vscode插件/01-400x445.png","87c3e3f2fefb71eadde6352424f423a0"],["/2018/08/29/vscode插件/02-400x189.png","b9edb62ee6cf2463e9b81dafff455033"],["/2018/08/29/vscode插件/03-400x75.png","8abe946ffe1e5a0098bfcf775c17fde8"],["/2018/08/29/vscode插件/04.png","2067b3880ffe4e5aea78a4c6721a7d3e"],["/2018/08/29/vscode插件/1.png","6d96b9deb30059b657aeb654b30fee26"],["/2018/08/29/vscode插件/2.png","1bad6dfb64a3994a83f026261efd4cbd"],["/2018/08/29/vscode插件/20180815183752751.png","9527477ba23943ba6374f97308b18786"],["/2018/08/29/vscode插件/20180815183812965.png","9c4f06e8431751d5a2db56107a1dc3c2"],["/2018/08/29/vscode插件/20180815183830941.png","0451b90e09e7a1d6ba9e1de539c65a97"],["/2018/08/29/vscode插件/index.html","fd35d93358aea55d678c844a7b8edeef"],["/2018/09/05/浏览器渲染/chromium.jpg","24d65d9aea03aad1b6b61fec5e14fa38"],["/2018/09/05/浏览器渲染/index.html","ae0c5bd4909bf2db7edbf54c66f6d660"],["/2018/09/05/浏览器渲染/webkit架构图.jpg","4e8c7ccf92374f0f5480d0c8cef265a3"],["/2018/09/05/浏览器渲染/浏览器渲染.jpg","688510d10251aeeb7aebe99cac44785a"],["/2018/09/05/浏览器渲染/渲染引擎.jpg","0e5bd1558438622e0f387518198b85c9"],["/2018/09/05/浏览器渲染/网络栈.jpg","4f6fb8c4708d291eba0160bbde00bce4"],["/2018/09/05/浏览器渲染/进程.jpg","4a870c3f4bf74468496142621b70643b"],["/2018/09/06/前端性能优化/index.html","e8d71449f0cbc4ac93619aeb60ecb9a9"],["/2018/09/17/前端设计模式/index.html","3cf09e6a3cbc3edd77324916b5b69539"],["/2018/09/20/vue-MVVM实现/index.html","2996cd9f9ca47d108f0a0b749565ba4b"],["/2018/12/03/Mocha与chai/index.html","f5141ffe18b6b6a25be515c5c885619a"],["/2018/12/03/test-1/index.html","f25d792f5cac60a13965a1810f9ed055"],["/2018/12/04/Jest/index.html","db799f76a57d0a73f37a950657a579ca"],["/2018/12/04/enzyme/index.html","780a95f61cea2902f91a6d8421753c5d"],["/2018/12/06/cypress/index.html","cb468acfba733989d7a4d619f9d25f5a"],["/2018/12/12/跨域/index.html","1e9a8b6eff91e9e17fae1b17a198b50e"],["/2019/01/08/webpack-1/index.html","7a65d2920db61ae69c0cdd8241bc66fc"],["/2019/01/11/webpack-bundle-源码/index.html","363c0f5f8ee8146ed9e198196c5976f4"],["/2019/01/11/webpack优化/index.html","5bb8fd3875fd0c797f7a99ab67aa7fef"],["/2019/01/14/webpack-tapable/index.html","41e3948f994b0adefe91209aec2f13a4"],["/404.html","dcbc8f26884308ebbc8b533c45608587"],["/archives/2018/05/index.html","c9132a81b7879b2945342dcbf02ad9e6"],["/archives/2018/06/index.html","bee3d6db3ef2f81a3bc2e6f6b61134ff"],["/archives/2018/06/page/2/index.html","a6591267a48e2d156d980661db65c5ac"],["/archives/2018/06/page/3/index.html","368fec0e51e94dd172c345a85dd36e86"],["/archives/2018/07/index.html","b24725258e27ee7f1f7d7aea81a29267"],["/archives/2018/08/index.html","b408de1d040132b0249944d6b63bcb36"],["/archives/2018/09/index.html","4241e12a2315b48e369fea2d2ac8abc1"],["/archives/2018/12/index.html","2190550c422118253052964f11de3224"],["/archives/2018/index.html","fbdb1300be3ebba4976f2ad9d5159121"],["/archives/2018/page/2/index.html","5493f4208d94ab42bd4830fcd072cce0"],["/archives/2018/page/3/index.html","553912f556cbed414b782ef2f9797845"],["/archives/2018/page/4/index.html","82b2dd11e39d57e618a4d49f11ba1c03"],["/archives/2018/page/5/index.html","13fa3e15caee37ed7ecffa375415e1ce"],["/archives/2018/page/6/index.html","5fe56ddc11a176b266e272d588639c15"],["/archives/2019/01/index.html","7f626c5b59a94d61786435bdc03e0105"],["/archives/2019/index.html","ee3f58647d14f7ad9f7da3171c94239a"],["/archives/index.html","0f25a8788a4afbe340eb5f20628894e4"],["/archives/page/2/index.html","efac73cd9db7c59a8f6b033e6fc3d590"],["/archives/page/3/index.html","b1af75029d29990f875c9854b4046d2a"],["/archives/page/4/index.html","3d6c70fd75184c523d5c848d9b674dad"],["/archives/page/5/index.html","560bc2375f600e33fbc1467f47934ff9"],["/archives/page/6/index.html","89b016e99567666e311dae92183b0d36"],["/bundle.js","3cf8ab2eedb168aa56078bfb5b719543"],["/css/main.css","8e8ed6cedd0f19c40e3bc8cce6418007"],["/images/algolia_logo.svg","fd40b88ac5370a5353a50b8175c1f367"],["/images/apple-touch-icon-next.png","fce961f0bd3cd769bf9c605ae6749bc0"],["/images/avatar.gif","2bed513bc5f13733cf9a8a12c4e1a971"],["/images/cc-by-nc-nd.svg","1c681acc4a150e7236254c464bb5a797"],["/images/cc-by-nc-sa.svg","12b4b29e8453be5b7828b524d3feabce"],["/images/cc-by-nc.svg","dd9cfe99ed839a4a548114f988d653f4"],["/images/cc-by-nd.svg","2d80546af20128215dc1e23ef42d06c2"],["/images/cc-by-sa.svg","c696b3db81cbbfba32f66c1dc88b909a"],["/images/cc-by.svg","6c4f8422b3725cb9f26b6c00e95fc88b"],["/images/cc-zero.svg","79deee77a07fcb79ff680ac0125eacb9"],["/images/favicon-16x16-next.png","b8975923a585dbaa8519a6068e364947"],["/images/favicon-32x32-next.png","5a029563fe3214c96f68b46556670ea1"],["/images/loading.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/logo.svg","ddad9027e42111ccd5b466bc18188970"],["/images/placeholder.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/quote-l.svg","1238a4baccd02c6025ec85b58f4282d4"],["/images/quote-r.svg","85787c6fa27965c81f7be70252b43bed"],["/images/searchicon.png","3d6b5c9d6d6c26a2b76a14b8fdf3438a"],["/index.html","de7bc704cc894a39d75d596d2ca31c8a"],["/js/src/affix.js","683c19859764baf0d17538897ea1eba2"],["/js/src/algolia-search.js","f5fa392318805997089ceb3a925979ba"],["/js/src/bootstrap.js","2a1083772854ae2663748e0a25c17285"],["/js/src/exturl.js","2b444179b3145e5007b4d371dac07cd3"],["/js/src/hook-duoshuo.js","45997b0c06abff3cd88efd901f614065"],["/js/src/js.cookie.js","6e9eb1f53afb135aedaf90739c867738"],["/js/src/motion.js","0f6add86607c451269d0b3d286c84d8b"],["/js/src/post-details.js","b8e8e27c27c697567879c52888ffc24c"],["/js/src/schemes/pisces.js","827b5ad25e1142277c1e7dfe0cacebe5"],["/js/src/scroll-cookie.js","890406ae3539e4721ef5f314542e5e46"],["/js/src/scrollspy.js","fafdd7ab6af233b701506c733910b7f5"],["/js/src/utils.js","24512c3455f976730b7bf75e1222c533"],["/lib/Han/dist/font/han-space.woff","b09f2dd7d3ad8ad07f3b8495133909d9"],["/lib/Han/dist/font/han.woff","e841c6b547bc06a06f60f4de52bf906e"],["/lib/Han/dist/font/han.woff2","2b06aa1c952a2dfaf00d99218689d147"],["/lib/Han/dist/han.css","cfcc552e7aebaef5e2f34aee030b956b"],["/lib/Han/dist/han.js","575b6c1667c01798730fbd972e959c9c"],["/lib/Han/dist/han.min.css","cab466d758269b437167422c4a16b364"],["/lib/Han/dist/han.min.js","96482c9c2b3c5ea9bf5a40db162c7f34"],["/lib/algolia-instant-search/instantsearch.min.css","029a13b44e6807955106ff3c075a02f9"],["/lib/algolia-instant-search/instantsearch.min.js","0db46eba0c8133693ee839507b1612f2"],["/lib/canvas-nest/canvas-nest.min.js","36e103d2a05bc706bac40f9ab8881eb7"],["/lib/canvas-ribbon/canvas-ribbon.js","16dc214240913551986593808c2efcfc"],["/lib/fancybox/source/blank.gif","325472601571f31e1bf00674c368d335"],["/lib/fancybox/source/fancybox_loading.gif","328cc0f6c78211485058d460e80f4fa8"],["/lib/fancybox/source/fancybox_loading@2x.gif","f92938639fa894a0e8ded1c3368abe98"],["/lib/fancybox/source/fancybox_overlay.png","77aeaa52715b898b73c74d68c630330e"],["/lib/fancybox/source/fancybox_sprite.png","783d4031fe50c3d83c960911e1fbc705"],["/lib/fancybox/source/fancybox_sprite@2x.png","ed9970ce22242421e66ff150aa97fe5f"],["/lib/fancybox/source/helpers/fancybox_buttons.png","b448080f8615e664b7788c7003803b59"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.css","cac75538c2e3ddfadef839feaca8e356"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.js","f53c246661fb995a3f12e67fa38e0fa0"],["/lib/fancybox/source/helpers/jquery.fancybox-media.js","c017067f48d97ec4a077ccdf056e6a2e"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.css","52ddd84a9f42c1d4cd86d518a7f7e8bc"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.js","cf1fc1df534eede4cb460c5cbd71aba6"],["/lib/fancybox/source/jquery.fancybox.css","6c55951ce1e3115711f63f99b7501f3a"],["/lib/fancybox/source/jquery.fancybox.js","921e9cb04ad6e2559869ec845c5be39b"],["/lib/fancybox/source/jquery.fancybox.pack.js","cc9e759f24ba773aeef8a131889d3728"],["/lib/fastclick/README.html","b3cd6e7f930bf6e410a2e7eab8a148a8"],["/lib/fastclick/lib/fastclick.js","6e9d3b0da74f2a4a7042b494cdaa7c2e"],["/lib/fastclick/lib/fastclick.min.js","a0fc6c24d1f3ff9ac281887c92b24acd"],["/lib/font-awesome/css/font-awesome.css","c495654869785bc3df60216616814ad1"],["/lib/font-awesome/css/font-awesome.min.css","269550530cc127b6aa5a35925a7de6ce"],["/lib/font-awesome/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["/lib/font-awesome/fonts/fontawesome-webfont.svg","912ec66d7572ff821749319396470bde"],["/lib/font-awesome/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["/lib/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["/lib/font-awesome/fonts/fontawesome-webfont.woff2","af7ae505a9eed503f8b8e6982036873e"],["/lib/jquery/index.js","32015dd42e9582a80a84736f5d9a44d7"],["/lib/jquery_lazyload/CONTRIBUTING.html","7287727950845c8a1010f3933691afef"],["/lib/jquery_lazyload/README.html","d89aa4afe316331a25b636b5ead4716e"],["/lib/jquery_lazyload/jquery.lazyload.js","8b427f9e86864ee3aaf1ae33e6e14263"],["/lib/jquery_lazyload/jquery.scrollstop.js","f163fd8f02361928853668a96f8a1249"],["/lib/needsharebutton/font-embedded.css","dd8861d10d1ed6b5e0c0011adfb39be9"],["/lib/needsharebutton/needsharebutton.css","30f2f800e13f7b6b83629a4cbd9749ef"],["/lib/needsharebutton/needsharebutton.js","6c6f855f7d50f4bc3c804f52b03bbfbb"],["/lib/pace/pace-theme-barber-shop.min.css","e8dc66cf2d88abc25fbc89b8a0529abb"],["/lib/pace/pace-theme-big-counter.min.css","db2b8fe31e60f19021545277d2f6e05e"],["/lib/pace/pace-theme-bounce.min.css","ad954aa0bace4b213eeb19d6e89a0bda"],["/lib/pace/pace-theme-center-atom.min.css","8f6bc803acefc6f93afc98fb38201456"],["/lib/pace/pace-theme-center-circle.min.css","93c72298781226a80a9c66b27b21a57d"],["/lib/pace/pace-theme-center-radar.min.css","f0099bdd1cd42e9476bd7abc417c0328"],["/lib/pace/pace-theme-center-simple.min.css","eddff4756dbf21dbbff1c543bd894dde"],["/lib/pace/pace-theme-corner-indicator.min.css","776826157cb28ac1ee5e78771292b9ba"],["/lib/pace/pace-theme-fill-left.min.css","965859b39001da08e1e92327fe3d8e12"],["/lib/pace/pace-theme-flash.min.css","aab39b436e1fa0fdc51df06f2d53c38a"],["/lib/pace/pace-theme-loading-bar.min.css","4e05877f1f9efb9c1e7dd75cb78c764f"],["/lib/pace/pace-theme-mac-osx.min.css","29ae030ceaa8158352c5472218375b91"],["/lib/pace/pace-theme-minimal.min.css","f48f04d370993b55a2745e548cc82743"],["/lib/pace/pace.min.js","24d2d5e3e331c4efa3cda1e1851b31a7"],["/lib/three/canvas_lines.min.js","1324174ae6190fbf63b7bf0ad0a8a5bd"],["/lib/three/canvas_sphere.min.js","5c6bc45b137448b5b9df152ccfb2659c"],["/lib/three/three-waves.min.js","41059bd5e5c7aa520b1b411919e5121f"],["/lib/three/three.min.js","3298078bce82bdb1afadf5b1a280915e"],["/lib/ua-parser-js/dist/ua-parser.min.js","a6e833266c4b41fabb9ba94a145322d8"],["/lib/ua-parser-js/dist/ua-parser.pack.js","6b627e4d61a7135952824bb9c1a4a134"],["/lib/velocity/velocity.js","0361fa6dcf4cf4d19c593cdab0937dd0"],["/lib/velocity/velocity.min.js","c1b8d079c7049879838d78e0b389965e"],["/lib/velocity/velocity.ui.js","f55d22cc592c9f8d4ffd3b41a6b90081"],["/lib/velocity/velocity.ui.min.js","444faf512fb24d50a5dec747cbbe39bd"],["/live2dw/assets/moc/hibiki.2048/texture_00.png","730252369524e7a1c21308cb84acd465"],["/live2dw/lib/L2Dwidget.0.min.js","7d6ea3548b666c761bfb3a01f25ae87d"],["/live2dw/lib/L2Dwidget.min.js","0c58a1486de42ac6cc1c59c7d98ae887"],["/page/2/index.html","0535d3425031591b0a2b26b34ac4aa33"],["/page/3/index.html","b828e8db9dd980d07d60d708d5c3501f"],["/page/4/index.html","dcc10e0eb492d6e95a8e186f25a5604f"],["/page/5/index.html","244e1aeb9b51b44d10cec2c00a01b710"],["/page/6/index.html","3b01b7267f35c76ca2fc4e06c347b464"],["/style.css","59382be79f56314919541bbbcd43722e"],["/sw-register.js","1f5e48d8ca0420d1859cc53e6548717e"],["/tags/Event-Loop/index.html","beeb6a746ca99725661f4ebd82870ce6"],["/tags/HTML汇总/index.html","bdb399713e83e27901b17f9f7bc73527"],["/tags/MVVM/index.html","4065656ec66f65e80e55423281418f91"],["/tags/babel/index.html","31e11fc95af5fecdbea1ed05d7637717"],["/tags/blog/index.html","fdda3792d5bb7ca0db889a7107f10920"],["/tags/bootstrap/index.html","f6237ea9c9df83b17e21db94129a1b70"],["/tags/css/index.html","844bb702a491c8a0ca5cb37e5883daa2"],["/tags/css/page/2/index.html","da687ce404ca330450bed7cd7f7dab43"],["/tags/css动画/index.html","f53ab64bd7381c957c469875e4daff1d"],["/tags/css工程化/index.html","bc95930d7994591409c1768af5c43cdb"],["/tags/css效果/index.html","b03bea337b24c8305e12a590b4f93a82"],["/tags/cypress/index.html","bb3cec1fcbcc109a6fb6131014371df6"],["/tags/e2e/index.html","0a430e17f10d984a41e25e86cb124258"],["/tags/enzyme/index.html","cf60bda87cce66ad9a0a2f3ce397d2cf"],["/tags/es6/index.html","9b421674c7f08ed90920fb64ba33a3c6"],["/tags/git/index.html","1ca7be535c89d1c0354982f29ba166c3"],["/tags/global/index.html","4385c2acbc0b9a246fd3d52e8bd14aa6"],["/tags/gulp/index.html","c4639388cb0f483d24e9fea5127d1521"],["/tags/hexo/index.html","1c943b6faf1809a7e67069e419fa5290"],["/tags/html/index.html","045b3b52d228db14399681e6e47ec8d4"],["/tags/http/index.html","061b32edbf6607d1f16a6840fc2a2289"],["/tags/index.html","7555fe8a633f56a3fcf415e36dcd5aea"],["/tags/jest/index.html","6167d89893807883ffae2a1ba2537e6d"],["/tags/js/index.html","b8e5057c9090c970cf5c1373190d7cd5"],["/tags/node/index.html","1202d8e89f5a105c2e02e3a39c2987ed"],["/tags/nodemon/index.html","fdf89f1ec49bebf8208cc95553c2ae0c"],["/tags/npx/index.html","e25abb45a92afea8eb552fef1949b948"],["/tags/promise/index.html","b5383ae1a7f8f22eed6dbf40638332b7"],["/tags/react/index.html","c1e22d002bf665cda441a8b416b629af"],["/tags/tapable/index.html","ae3d7eef1c052de849b102502d29de66"],["/tags/tcp/index.html","a57eb623d16c1cb9537d24ffed7f70a6"],["/tags/test/index.html","3e7eafb0ae04814887e8ca77219f1f53"],["/tags/vscode/index.html","c95cd4658c40bed615c242cfd2e0778b"],["/tags/vscode插件/index.html","ecdd61fe6b2d993923903d6e47106a54"],["/tags/vue/index.html","50c337aabae4c6aa3d136241ab3b210c"],["/tags/webpack/index.html","33f6c19daf92f946289654891d1340c4"],["/tags/webpack优化/index.html","19536af648b8e76bfdebe5d087f1080e"],["/tags/webpack实战/index.html","ce9bbeeeefd5424973bfa0b86448ea7f"],["/tags/webpack源码/index.html","86f66ee670f95b8e2d0d61b525e81ca7"],["/tags/webpack系列/index.html","9332c3de2d8f2c449e7700bbdad710f4"],["/tags/前端/index.html","60ae7cc7c4cb1691ca3fcfdb2727985b"],["/tags/前端基础/index.html","a9878da170d0f4481e8006037b5e40a7"],["/tags/前端基础/page/2/index.html","ee685e6058ca73bc09bf1b1b3be8c3e5"],["/tags/前端基础/page/3/index.html","5b879336356d0e1def6de1076aa905b6"],["/tags/单元测试/index.html","f20b9907626be9c86ed1b11eb14b0eee"],["/tags/小程序/index.html","b98aad03726dc8c491323642985a90a7"],["/tags/异步/index.html","429d306972765c995a793f69bbd68560"],["/tags/微信/index.html","f15fda4de6e604b67abbf15e1a2872a8"],["/tags/性能优化/index.html","fc805c02a1101185d91a607d8db5fbb2"],["/tags/插件/index.html","e12566c21394a63d01414285086787c1"],["/tags/构建工具/index.html","21a58540a554a3fc920cf870f1e3623f"],["/tags/架构/index.html","551ddc7f5ed33b39fd8559f008ff309d"],["/tags/框架中的css/index.html","14cac42a95e990aadbdf9704a8245217"],["/tags/测试/index.html","4efd27c7835c335e9b419a53e2f55435"],["/tags/浏览器/index.html","2dc69b011c996816045e6809db5259d3"],["/tags/浏览器渲染/index.html","ce83f362df8a2e02bdc7657b9672dd89"],["/tags/网路/index.html","f0f67d021691c9f3040ddb4a565b93d1"],["/tags/设计模式/index.html","83e79405a0dd8c1abdfe07a7026c6bd6"],["/tags/跨域/index.html","c082bd15a77d8b8b3c3cad92bbc2c499"],["/tags/预处理器/index.html","8f1927fdf12510234134dc877938e1fe"],["/uploads/avatar.jpg","19392dd66f6175e4ea17280adf4db7e8"],["/uploads/wechatpay.jpg","dc08d8b0df0a37e3e11e78174709ba0f"]];
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
