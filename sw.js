/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/person_blogs/2018/05/21/git/0.png","bd069bbbca4e2d1c0e2b4416df5dd14b"],["/person_blogs/2018/05/21/git/fetch_HEAD.png","10831dc4bae97a7504b7ff5209368861"],["/person_blogs/2018/05/21/git/gitlog.png","76841726e0cc211fbfaac8d9b273281a"],["/person_blogs/2018/05/21/git/git基本流程.png","ec6c0c1f69c4ed94b8ad0b881e40d469"],["/person_blogs/2018/05/21/git/git版本.png","42235a95fa69d23fee78b7ccf57af822"],["/person_blogs/2018/05/21/git/index.html","6388f2ec058c7d6833fbc3d40d2a4c52"],["/person_blogs/2018/05/21/git/no-ff.png","4fae485fb0062c35d7ac9ea36f16b0d9"],["/person_blogs/2018/05/21/git/tracking.png","a1fb55bd83f8930da4cd25ee7b393180"],["/person_blogs/2018/05/21/git/分布式.png","36811a240cf686b00787ace6a723e2bf"],["/person_blogs/2018/05/21/git/集中式.png","5bbcfb2d2a77f7770f937a6a26cb3413"],["/person_blogs/2018/05/21/hexo建站指南/index.html","ee7231f07af6dda32c12947f0881d323"],["/person_blogs/2018/05/21/hexo建站指南/js.png","fd78c647158c594390d124b234f23ac8"],["/person_blogs/2018/05/21/nodemon/index.html","c73675a88f31910159d7a4b6c6260ed5"],["/person_blogs/2018/05/25/npx/index.html","88691a9f7f5775b6cce92a9f4a6f50b3"],["/person_blogs/2018/05/25/微信公众号/index.html","66b37fc1dffe5d26bf5d599da8e53dde"],["/person_blogs/2018/05/25/微信公众号/公众号权限.jpg","5307779292b4d88c413aca4b5d6242c7"],["/person_blogs/2018/05/25/微信公众号/微信交互过程.jpg","bb87b9e4b5001779dd4d365cbe6af33d"],["/person_blogs/2018/05/25/微信公众号/验证公众号.jpg","72540fb2be5ced94c709b6a8f1a1b85b"],["/person_blogs/2018/05/29/gulp/index.html","9e6abcf2df3c4eaa56f5b4d0625c1cf0"],["/person_blogs/2018/05/30/gulp插件/index.html","da9df8904bf2ae69bb7192d9247fc6da"],["/person_blogs/2018/05/31/es6快学/index.html","d53217dd14b844080e7a407d00b9f7a2"],["/person_blogs/2018/06/11/小程序/index.html","3bd39621e6a712926fcea2986bf7f6f0"],["/person_blogs/2018/06/11/小程序/图片1.png","a70e2059dbd63d02de44cb09783642f7"],["/person_blogs/2018/06/11/小程序/图片10.png","253b5cb5d64d8a085a939479cbd82c61"],["/person_blogs/2018/06/11/小程序/图片11.png","2394147ba042004e52c563dab2566e86"],["/person_blogs/2018/06/11/小程序/图片12.png","15685ed43535dcd8f669a3a62d0c944c"],["/person_blogs/2018/06/11/小程序/图片13.png","6ddfee2874af19fdda5457a6ebb07a4a"],["/person_blogs/2018/06/11/小程序/图片2.png","17cf31e03a529dd16d30cdba237d261b"],["/person_blogs/2018/06/11/小程序/图片3.png","4c418c305ea29c2652073b3fb2f60e9c"],["/person_blogs/2018/06/11/小程序/图片4.png","1dd0a93c3455171775630e16ba06d315"],["/person_blogs/2018/06/11/小程序/图片5.png","9b2af48344d07f6b52939b2f7f411eeb"],["/person_blogs/2018/06/11/小程序/图片6.png","2113900dc3174e66b31dce4265e8b3e4"],["/person_blogs/2018/06/11/小程序/图片7.png","5a03ad0f423874e9a55ea00ab5fe7567"],["/person_blogs/2018/06/11/小程序/图片8.png","a6e291f21158b3c9ea65cba5ca508458"],["/person_blogs/2018/06/11/小程序/图片9.png","ce85efe0c14262c802704c8a87df61fa"],["/person_blogs/2018/06/12/css/TIM截图20180612152920.jpg","90ec841c094cba227458755449a4cee2"],["/person_blogs/2018/06/12/css/index.html","959f4ca4ce4d40110e5d59275dfc95a2"],["/person_blogs/2018/06/12/微信直播/index.html","acc7c91ca58b8d0a1c578f77c3d2cc30"],["/person_blogs/2018/06/12/文本样式/font-weight.jpg","5ff1244ea47b3c5561e587036c66c695"],["/person_blogs/2018/06/12/文本样式/index.html","0b94a13c4aa6552f2ca939dd12d895b0"],["/person_blogs/2018/06/12/文本样式/字体.png","c38e59b8c80d76400ee9802270ad0034"],["/person_blogs/2018/06/12/文本样式/字体族.jpg","b2de214630030f8e2e50a13b670f9ac8"],["/person_blogs/2018/06/12/文本样式/通用字体族.jpg","c0496ec92b179d44b46f60c10fdf285d"],["/person_blogs/2018/06/13/浮动/float.jpg","195047130f66f69bd8e14a7b2ae85f2e"],["/person_blogs/2018/06/13/浮动/index.html","6e21b74af5cfb120c22bfd9b48aad3c0"],["/person_blogs/2018/06/14/定位与堆叠/absolute.jpg","2371e331ad81280b2788fd2e56aad0c7"],["/person_blogs/2018/06/14/定位与堆叠/index.html","9ed414c9bd68a0acbf131bc56eda0e2e"],["/person_blogs/2018/06/14/定位与堆叠/z-index.png","c148506f5397247c847de3514432b6dd"],["/person_blogs/2018/06/14/定位与堆叠/堆叠上下文.jpg","283475ec7454d34584f1c9c7f7526345"],["/person_blogs/2018/06/14/定位与堆叠/堆叠上下文2.jpg","f0e76597c4d8e71daa40deae8f450624"],["/person_blogs/2018/06/14/层叠继承和css单位/hsl.jpg","daf4d3b2f7a4e41fc4c7b9b3fd187537"],["/person_blogs/2018/06/14/层叠继承和css单位/index.html","9764490dc9a849daf4ce96c5e8f8c658"],["/person_blogs/2018/06/14/层叠继承和css单位/specificityimg.png","c409c760c0bee888743dc2697303bbf2"],["/person_blogs/2018/06/14/盒模型/boxmodel.jpg","182d83d8c0f7ed736753d56aeb33f9f5"],["/person_blogs/2018/06/14/盒模型/index.html","ff6baefdc87ef5a9e9ba69f7fcb4b252"],["/person_blogs/2018/06/14/盒模型/块级元素.png","ac0f46d33990a8c334393f2756c8b566"],["/person_blogs/2018/06/14/盒模型/盒子.jpg","f24b489edc37893b648f204bd09e6b59"],["/person_blogs/2018/06/14/盒模型/行级盒子.png","1de67777abd275e145a9d723540b8696"],["/person_blogs/2018/06/15/排版细节/index.html","476eaa63cd7798eb9cb667061af1fa36"],["/person_blogs/2018/06/15/排版细节/line-box.png","804f848fe0559f5878bbec084365c0c7"],["/person_blogs/2018/06/15/排版细节/line-height.jpg","8579db767ab7a063d10d9d08f808d61f"],["/person_blogs/2018/06/15/排版细节/list-style-position.jpg","8b4712167cf42e8912e4e7104df16c54"],["/person_blogs/2018/06/15/排版细节/ver.jpg","4113f24f1cedc05e125402dd2f4e0929"],["/person_blogs/2018/06/15/排版细节/vertical-box.jpg","9affd804dcbba504208259ab28cded5e"],["/person_blogs/2018/06/15/排版细节/行级格式化上下文.png","be81f02d35b6a40fa70bc5ac660b457e"],["/person_blogs/2018/06/19/动画/index.html","63243f7888805362319cb73a905f7fbe"],["/person_blogs/2018/06/19/布局/Grid.jpg","26a0d2148046f3b32296322161e49b1b"],["/person_blogs/2018/06/19/布局/align-content.png","d037edf6132bfcde471a8758368c7afe"],["/person_blogs/2018/06/19/布局/align-items.png","390dc826058dea5b0c438b756f76efa0"],["/person_blogs/2018/06/19/布局/flex-direction.jpg","032c7d0177e1e7f7dc80ff544401ee66"],["/person_blogs/2018/06/19/布局/index.html","e4eae0c4f5eb567d4cb2aa876307c988"],["/person_blogs/2018/06/19/布局/justify-content.png","808ddfdbafc273f8e5a67a5200779709"],["/person_blogs/2018/06/19/布局/主轴.png","c5d1828f3d186ca4b7dc4f7f94262b96"],["/person_blogs/2018/06/19/布局/伪等高.jpg","4869df0907a355d589c8472206df4124"],["/person_blogs/2018/06/19/布局/兼容性.jpg","84f9642da96a50308abf0b5199823fe4"],["/person_blogs/2018/06/19/布局/展示.jpg","282e4e875fc3c895c8cc83316c64d664"],["/person_blogs/2018/06/20/兼容性/index.html","b0063c593dcea4f486198d1aba54ed75"],["/person_blogs/2018/06/20/兼容性/supports.jpg","f58791c8f5287c8038a47fefc95734b5"],["/person_blogs/2018/06/20/响应式设计/index.html","2e649962761527e7a73ee38a43996241"],["/person_blogs/2018/06/20/响应式设计/网格.png","42bc34cd435f54ca5a82e600ebc2cf60"],["/person_blogs/2018/06/20/工程化/Media.jpg","add9300d6b7e82aa209213a6af4e58a3"],["/person_blogs/2018/06/20/工程化/index.html","37ac812afd073cc2ef7ce7392c6c9c5d"],["/person_blogs/2018/06/20/工程化/文件结构.png","01319361f90fdbce13db10a654699be2"],["/person_blogs/2018/06/20/高级选择器/index.html","e703406dfa7955710603edd097864090"],["/person_blogs/2018/06/21/html简述与文本/index.html","d9659f451045f4a8e471a60c587c6b93"],["/person_blogs/2018/06/21/html简述与文本/网页总体结构.png","525e10b1bbf3187d956442d069429ead"],["/person_blogs/2018/06/21/text-size-adjust使用汇总/index.html","a448ac6158976f3e189a228ba73f78ea"],["/person_blogs/2018/06/21/表单/index.html","820bddf626aabe5f1ad3c2b8a55c91b6"],["/person_blogs/2018/06/21/表格/index.html","0d3b794898d64c92a276d810e0db0c94"],["/person_blogs/2018/06/21/表格/table.png","246ed67c73c604feeb989e33a04f85d8"],["/person_blogs/2018/06/21/连接与图片/href.jpg","35d9804506bd416ba61bd8aaadc60b44"],["/person_blogs/2018/06/21/连接与图片/index.html","3619218c328f7a6e87a70a7fcea3452c"],["/person_blogs/2018/06/24/HTML补充知识/index.html","11d337bd38b8155507589fe2ee088dba"],["/person_blogs/2018/06/26/node深研/index.html","b1ee89c5dc1a2ce13222cd61016f3950"],["/person_blogs/2018/06/26/node深研/node.jpg","3a772fd012b29957cb58e9f970a57ed0"],["/person_blogs/2018/06/26/node深研/nodeloop.png","3228e8674a48daffa748ec1bbe57005c"],["/person_blogs/2018/06/26/node深研/nodepoll.png","b9b30c76b65c0bd5a5c15fd293f736c0"],["/person_blogs/2018/06/26/node深研/node中执行.png","a55b9b539d01c5d80b307ed6d00b4f99"],["/person_blogs/2018/06/26/node深研/浏览器EventLoop.jpg","75b404807ad79b3c6793e22b7bb4fa99"],["/person_blogs/2018/06/26/node深研/浏览器执行.png","261c1097d6ddb15ccaab17f1e7146ccd"],["/person_blogs/2018/06/26/node深研/非node.jpg","60799224a7296b67e6aab80cfff07cfb"],["/person_blogs/2018/07/05/css预处理器/index.html","4cc5f8779aa566d86d18b1f03195a103"],["/person_blogs/2018/07/06/css框架bootstarp/index.html","a5814a81bbb90eef0cef1ac00de3f301"],["/person_blogs/2018/07/06/css框架bootstarp/响应式.png","344bbc8c625bdaf12adacf6e486839ea"],["/person_blogs/2018/07/06/框架中的css/index.html","313fd24e0b4b9b71ddcd543e9e5bc296"],["/person_blogs/2018/07/06/框架中的css/video.jpg","e2beddb9d11146a7dd7f6fbc25449e71"],["/person_blogs/2018/07/06/框架中的css/开启shadowDom.png","4f5696d1d56bcdad51ff818a5a355620"],["/person_blogs/2018/07/09/HTML汇总/HTML版本.jpg","a2de2f22a0e5e32c132b9e194b124e3f"],["/person_blogs/2018/07/09/HTML汇总/flow.jpg","cc556f4c7918f1084c078fadc496bf56"],["/person_blogs/2018/07/09/HTML汇总/index.html","4be5f426a449a01419494e3a55fc2672"],["/person_blogs/2018/07/09/HTML汇总/viewport.jpg","3433e5a1a8d68dca799f8de98090616e"],["/person_blogs/2018/07/09/css动画/index.html","95598a8c0dcd8bcea9c96afb23afe2dd"],["/person_blogs/2018/07/09/css动画/timing.jpg","11381af2541edf17105dc5fb78a78595"],["/person_blogs/2018/07/09/css动画/关键帧动画.png","8b97823ef80053e1e4bf5be149f5b442"],["/person_blogs/2018/07/09/css动画/补间动画.jpg","fd1fe81cdad4b55be69df95e3564b2ff"],["/person_blogs/2018/07/09/css动画/逐帧动画.png","979dcead8f1267ae3ffd9dd7baba04f3"],["/person_blogs/2018/07/10/css工程化/BrowserList.jpg","531d83232ff6665f1923b88bc0e0cc93"],["/person_blogs/2018/07/10/css工程化/cssnext.jpg","7335e813a1c17987a0abceebf5f3aae9"],["/person_blogs/2018/07/10/css工程化/index.html","9e7f6fe3ee15a2da3a1fa1cc38cd1069"],["/person_blogs/2018/07/10/css工程化/postcss.jpg","04bcb1c638cc01f4bee3aa8f00ee0794"],["/person_blogs/2018/07/10/css效果/3d.jpg","cf03dc97e063fbbbfbe94a3e7a13f742"],["/person_blogs/2018/07/10/css效果/box-shadow.png","df23506b9fe84b10b30e51a1e255301c"],["/person_blogs/2018/07/10/css效果/index.html","1e928289398b9b8b2ebedfb4d56bb34c"],["/person_blogs/2018/07/10/css效果/svg.jpg","eb4d637e191675b85c0015a9d27ce0eb"],["/person_blogs/2018/07/10/css效果/transform.jpg","a80701f47cf5ecda171d3506cce6933a"],["/person_blogs/2018/07/23/promise详解/generator.png","f4fcfef52f06a98d5a75871a8597673c"],["/person_blogs/2018/07/23/promise详解/index.html","1d08daf8e095e3269c41e0f6566bc0ef"],["/person_blogs/2018/07/25/babel/index.html","7b691ff66c7698f1f9ae0d54786da896"],["/person_blogs/2018/07/25/mobx/index.html","eacc0eba5f138dfcac2eaca6d421ed50"],["/person_blogs/2018/08/08/TCP/index.html","de7932301825e53a208c0105cf8d8e24"],["/person_blogs/2018/08/08/TCP/osi7层模型.jpg","c381afbb827d435be07280d3853cf850"],["/person_blogs/2018/08/29/vscode插件/00-400x264.png","e90d695457081461db2b05d952d61366"],["/person_blogs/2018/08/29/vscode插件/01-400x445.png","87c3e3f2fefb71eadde6352424f423a0"],["/person_blogs/2018/08/29/vscode插件/02-400x189.png","b9edb62ee6cf2463e9b81dafff455033"],["/person_blogs/2018/08/29/vscode插件/03-400x75.png","8abe946ffe1e5a0098bfcf775c17fde8"],["/person_blogs/2018/08/29/vscode插件/04.png","2067b3880ffe4e5aea78a4c6721a7d3e"],["/person_blogs/2018/08/29/vscode插件/1.png","6d96b9deb30059b657aeb654b30fee26"],["/person_blogs/2018/08/29/vscode插件/2.png","1bad6dfb64a3994a83f026261efd4cbd"],["/person_blogs/2018/08/29/vscode插件/20180815183752751.png","9527477ba23943ba6374f97308b18786"],["/person_blogs/2018/08/29/vscode插件/20180815183812965.png","9c4f06e8431751d5a2db56107a1dc3c2"],["/person_blogs/2018/08/29/vscode插件/20180815183830941.png","0451b90e09e7a1d6ba9e1de539c65a97"],["/person_blogs/2018/08/29/vscode插件/index.html","1e45c87d371e4ed0d2200e98a0f3d977"],["/person_blogs/2018/09/05/浏览器渲染/chromium.jpg","24d65d9aea03aad1b6b61fec5e14fa38"],["/person_blogs/2018/09/05/浏览器渲染/index.html","c7379135fe38f63b07c38606da0e8c31"],["/person_blogs/2018/09/05/浏览器渲染/webkit架构图.jpg","4e8c7ccf92374f0f5480d0c8cef265a3"],["/person_blogs/2018/09/05/浏览器渲染/浏览器渲染.jpg","688510d10251aeeb7aebe99cac44785a"],["/person_blogs/2018/09/05/浏览器渲染/渲染引擎.jpg","0e5bd1558438622e0f387518198b85c9"],["/person_blogs/2018/09/05/浏览器渲染/网络栈.jpg","4f6fb8c4708d291eba0160bbde00bce4"],["/person_blogs/2018/09/05/浏览器渲染/进程.jpg","4a870c3f4bf74468496142621b70643b"],["/person_blogs/2018/09/06/前端性能优化/index.html","7d58530be6b9438d5f596c6b8ff9185e"],["/person_blogs/404.html","fc095f75a41fc05297a202c8fb0f82c3"],["/person_blogs/archives/2018/05/index.html","36212801b3564d452a8205859886da95"],["/person_blogs/archives/2018/06/index.html","6061be2b8d709f2444cea1c0e01fbc26"],["/person_blogs/archives/2018/06/page/2/index.html","099783fd54f6898c5b66d5c6950b3bdf"],["/person_blogs/archives/2018/06/page/3/index.html","55590a6825ba7636d840460ad8d7e2d8"],["/person_blogs/archives/2018/07/index.html","1711e0f96f10a1cfc856d3d4a84d2861"],["/person_blogs/archives/2018/08/index.html","8c10b7cf4db4313c1d867b799acb03d3"],["/person_blogs/archives/2018/09/index.html","d5ec8cd62f617bc6909ecd62a6bcece5"],["/person_blogs/archives/2018/index.html","fb667eabfdb76ecfe069a3cbe924fdf1"],["/person_blogs/archives/2018/page/2/index.html","23dfc4e0178f42a155ee42011bb2d47b"],["/person_blogs/archives/2018/page/3/index.html","9e6016c74493e192650567e9ee951fe0"],["/person_blogs/archives/2018/page/4/index.html","7662b88951bb8edb968e68b74c32a519"],["/person_blogs/archives/2018/page/5/index.html","196e0ddf8c4b34a9bb695eccc98ad64d"],["/person_blogs/archives/index.html","0ae7d75e1c328a29a1bbb33bcaa779bc"],["/person_blogs/archives/page/2/index.html","ff8cc830a04b4bcd5f5a7c3d2f4f82ee"],["/person_blogs/archives/page/3/index.html","f3b6bc6b9ca59a1f8426109c8403698d"],["/person_blogs/archives/page/4/index.html","8924658d82dde737210df591fcee974a"],["/person_blogs/archives/page/5/index.html","61abeb85dce7c790b63630c82eeb6e24"],["/person_blogs/css/main.css","b9fcd63de0eca2e8d7e66d9bf4f09bf6"],["/person_blogs/images/algolia_logo.svg","fd40b88ac5370a5353a50b8175c1f367"],["/person_blogs/images/apple-touch-icon-next.png","fce961f0bd3cd769bf9c605ae6749bc0"],["/person_blogs/images/avatar.gif","2bed513bc5f13733cf9a8a12c4e1a971"],["/person_blogs/images/cc-by-nc-nd.svg","1c681acc4a150e7236254c464bb5a797"],["/person_blogs/images/cc-by-nc-sa.svg","12b4b29e8453be5b7828b524d3feabce"],["/person_blogs/images/cc-by-nc.svg","dd9cfe99ed839a4a548114f988d653f4"],["/person_blogs/images/cc-by-nd.svg","2d80546af20128215dc1e23ef42d06c2"],["/person_blogs/images/cc-by-sa.svg","c696b3db81cbbfba32f66c1dc88b909a"],["/person_blogs/images/cc-by.svg","6c4f8422b3725cb9f26b6c00e95fc88b"],["/person_blogs/images/cc-zero.svg","79deee77a07fcb79ff680ac0125eacb9"],["/person_blogs/images/favicon-16x16-next.png","b8975923a585dbaa8519a6068e364947"],["/person_blogs/images/favicon-32x32-next.png","5a029563fe3214c96f68b46556670ea1"],["/person_blogs/images/loading.gif","c2196de8ba412c60c22ab491af7b1409"],["/person_blogs/images/logo.svg","ddad9027e42111ccd5b466bc18188970"],["/person_blogs/images/placeholder.gif","c2196de8ba412c60c22ab491af7b1409"],["/person_blogs/images/quote-l.svg","1238a4baccd02c6025ec85b58f4282d4"],["/person_blogs/images/quote-r.svg","85787c6fa27965c81f7be70252b43bed"],["/person_blogs/images/searchicon.png","3d6b5c9d6d6c26a2b76a14b8fdf3438a"],["/person_blogs/index.html","2d5c88e002cf831b1c8001f431793776"],["/person_blogs/js/src/affix.js","683c19859764baf0d17538897ea1eba2"],["/person_blogs/js/src/algolia-search.js","f5fa392318805997089ceb3a925979ba"],["/person_blogs/js/src/bootstrap.js","2a1083772854ae2663748e0a25c17285"],["/person_blogs/js/src/exturl.js","2b444179b3145e5007b4d371dac07cd3"],["/person_blogs/js/src/hook-duoshuo.js","45997b0c06abff3cd88efd901f614065"],["/person_blogs/js/src/js.cookie.js","6e9eb1f53afb135aedaf90739c867738"],["/person_blogs/js/src/motion.js","0f6add86607c451269d0b3d286c84d8b"],["/person_blogs/js/src/post-details.js","b8e8e27c27c697567879c52888ffc24c"],["/person_blogs/js/src/schemes/pisces.js","827b5ad25e1142277c1e7dfe0cacebe5"],["/person_blogs/js/src/scroll-cookie.js","890406ae3539e4721ef5f314542e5e46"],["/person_blogs/js/src/scrollspy.js","fafdd7ab6af233b701506c733910b7f5"],["/person_blogs/js/src/utils.js","24512c3455f976730b7bf75e1222c533"],["/person_blogs/lib/Han/dist/font/han-space.woff","b09f2dd7d3ad8ad07f3b8495133909d9"],["/person_blogs/lib/Han/dist/font/han.woff","e841c6b547bc06a06f60f4de52bf906e"],["/person_blogs/lib/Han/dist/font/han.woff2","2b06aa1c952a2dfaf00d99218689d147"],["/person_blogs/lib/Han/dist/han.css","cfcc552e7aebaef5e2f34aee030b956b"],["/person_blogs/lib/Han/dist/han.js","575b6c1667c01798730fbd972e959c9c"],["/person_blogs/lib/Han/dist/han.min.css","cab466d758269b437167422c4a16b364"],["/person_blogs/lib/Han/dist/han.min.js","96482c9c2b3c5ea9bf5a40db162c7f34"],["/person_blogs/lib/algolia-instant-search/instantsearch.min.css","029a13b44e6807955106ff3c075a02f9"],["/person_blogs/lib/algolia-instant-search/instantsearch.min.js","0db46eba0c8133693ee839507b1612f2"],["/person_blogs/lib/canvas-nest/canvas-nest.min.js","36e103d2a05bc706bac40f9ab8881eb7"],["/person_blogs/lib/canvas-ribbon/canvas-ribbon.js","16dc214240913551986593808c2efcfc"],["/person_blogs/lib/fancybox/source/blank.gif","325472601571f31e1bf00674c368d335"],["/person_blogs/lib/fancybox/source/fancybox_loading.gif","328cc0f6c78211485058d460e80f4fa8"],["/person_blogs/lib/fancybox/source/fancybox_loading@2x.gif","f92938639fa894a0e8ded1c3368abe98"],["/person_blogs/lib/fancybox/source/fancybox_overlay.png","77aeaa52715b898b73c74d68c630330e"],["/person_blogs/lib/fancybox/source/fancybox_sprite.png","783d4031fe50c3d83c960911e1fbc705"],["/person_blogs/lib/fancybox/source/fancybox_sprite@2x.png","ed9970ce22242421e66ff150aa97fe5f"],["/person_blogs/lib/fancybox/source/helpers/fancybox_buttons.png","b448080f8615e664b7788c7003803b59"],["/person_blogs/lib/fancybox/source/helpers/jquery.fancybox-buttons.css","cac75538c2e3ddfadef839feaca8e356"],["/person_blogs/lib/fancybox/source/helpers/jquery.fancybox-buttons.js","f53c246661fb995a3f12e67fa38e0fa0"],["/person_blogs/lib/fancybox/source/helpers/jquery.fancybox-media.js","c017067f48d97ec4a077ccdf056e6a2e"],["/person_blogs/lib/fancybox/source/helpers/jquery.fancybox-thumbs.css","52ddd84a9f42c1d4cd86d518a7f7e8bc"],["/person_blogs/lib/fancybox/source/helpers/jquery.fancybox-thumbs.js","cf1fc1df534eede4cb460c5cbd71aba6"],["/person_blogs/lib/fancybox/source/jquery.fancybox.css","6c55951ce1e3115711f63f99b7501f3a"],["/person_blogs/lib/fancybox/source/jquery.fancybox.js","921e9cb04ad6e2559869ec845c5be39b"],["/person_blogs/lib/fancybox/source/jquery.fancybox.pack.js","cc9e759f24ba773aeef8a131889d3728"],["/person_blogs/lib/fastclick/README.html","b3cd6e7f930bf6e410a2e7eab8a148a8"],["/person_blogs/lib/fastclick/lib/fastclick.js","6e9d3b0da74f2a4a7042b494cdaa7c2e"],["/person_blogs/lib/fastclick/lib/fastclick.min.js","a0fc6c24d1f3ff9ac281887c92b24acd"],["/person_blogs/lib/font-awesome/css/font-awesome.css","c495654869785bc3df60216616814ad1"],["/person_blogs/lib/font-awesome/css/font-awesome.min.css","269550530cc127b6aa5a35925a7de6ce"],["/person_blogs/lib/font-awesome/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["/person_blogs/lib/font-awesome/fonts/fontawesome-webfont.svg","912ec66d7572ff821749319396470bde"],["/person_blogs/lib/font-awesome/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["/person_blogs/lib/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["/person_blogs/lib/font-awesome/fonts/fontawesome-webfont.woff2","af7ae505a9eed503f8b8e6982036873e"],["/person_blogs/lib/jquery/index.js","32015dd42e9582a80a84736f5d9a44d7"],["/person_blogs/lib/jquery_lazyload/CONTRIBUTING.html","7287727950845c8a1010f3933691afef"],["/person_blogs/lib/jquery_lazyload/README.html","d89aa4afe316331a25b636b5ead4716e"],["/person_blogs/lib/jquery_lazyload/jquery.lazyload.js","8b427f9e86864ee3aaf1ae33e6e14263"],["/person_blogs/lib/jquery_lazyload/jquery.scrollstop.js","f163fd8f02361928853668a96f8a1249"],["/person_blogs/lib/needsharebutton/font-embedded.css","dd8861d10d1ed6b5e0c0011adfb39be9"],["/person_blogs/lib/needsharebutton/needsharebutton.css","30f2f800e13f7b6b83629a4cbd9749ef"],["/person_blogs/lib/needsharebutton/needsharebutton.js","6c6f855f7d50f4bc3c804f52b03bbfbb"],["/person_blogs/lib/pace/pace-theme-barber-shop.min.css","e8dc66cf2d88abc25fbc89b8a0529abb"],["/person_blogs/lib/pace/pace-theme-big-counter.min.css","db2b8fe31e60f19021545277d2f6e05e"],["/person_blogs/lib/pace/pace-theme-bounce.min.css","ad954aa0bace4b213eeb19d6e89a0bda"],["/person_blogs/lib/pace/pace-theme-center-atom.min.css","8f6bc803acefc6f93afc98fb38201456"],["/person_blogs/lib/pace/pace-theme-center-circle.min.css","93c72298781226a80a9c66b27b21a57d"],["/person_blogs/lib/pace/pace-theme-center-radar.min.css","f0099bdd1cd42e9476bd7abc417c0328"],["/person_blogs/lib/pace/pace-theme-center-simple.min.css","eddff4756dbf21dbbff1c543bd894dde"],["/person_blogs/lib/pace/pace-theme-corner-indicator.min.css","776826157cb28ac1ee5e78771292b9ba"],["/person_blogs/lib/pace/pace-theme-fill-left.min.css","965859b39001da08e1e92327fe3d8e12"],["/person_blogs/lib/pace/pace-theme-flash.min.css","aab39b436e1fa0fdc51df06f2d53c38a"],["/person_blogs/lib/pace/pace-theme-loading-bar.min.css","4e05877f1f9efb9c1e7dd75cb78c764f"],["/person_blogs/lib/pace/pace-theme-mac-osx.min.css","29ae030ceaa8158352c5472218375b91"],["/person_blogs/lib/pace/pace-theme-minimal.min.css","f48f04d370993b55a2745e548cc82743"],["/person_blogs/lib/pace/pace.min.js","24d2d5e3e331c4efa3cda1e1851b31a7"],["/person_blogs/lib/three/canvas_lines.min.js","1324174ae6190fbf63b7bf0ad0a8a5bd"],["/person_blogs/lib/three/canvas_sphere.min.js","5c6bc45b137448b5b9df152ccfb2659c"],["/person_blogs/lib/three/three-waves.min.js","41059bd5e5c7aa520b1b411919e5121f"],["/person_blogs/lib/three/three.min.js","3298078bce82bdb1afadf5b1a280915e"],["/person_blogs/lib/ua-parser-js/dist/ua-parser.min.js","a6e833266c4b41fabb9ba94a145322d8"],["/person_blogs/lib/ua-parser-js/dist/ua-parser.pack.js","6b627e4d61a7135952824bb9c1a4a134"],["/person_blogs/lib/velocity/velocity.js","0361fa6dcf4cf4d19c593cdab0937dd0"],["/person_blogs/lib/velocity/velocity.min.js","c1b8d079c7049879838d78e0b389965e"],["/person_blogs/lib/velocity/velocity.ui.js","f55d22cc592c9f8d4ffd3b41a6b90081"],["/person_blogs/lib/velocity/velocity.ui.min.js","444faf512fb24d50a5dec747cbbe39bd"],["/person_blogs/live2dw/assets/moc/hibiki.2048/texture_00.png","730252369524e7a1c21308cb84acd465"],["/person_blogs/live2dw/lib/L2Dwidget.0.min.js","7d6ea3548b666c761bfb3a01f25ae87d"],["/person_blogs/live2dw/lib/L2Dwidget.min.js","0c58a1486de42ac6cc1c59c7d98ae887"],["/person_blogs/page/2/index.html","51e8f462cd061fba37c1cad704ea52aa"],["/person_blogs/page/3/index.html","277a489bd59ab3855737f36e8887b68e"],["/person_blogs/page/4/index.html","9b7ef01894d8c9e5ee46b00f1cad86cd"],["/person_blogs/page/5/index.html","224c65771ef7dbb6e0af1403d8c68dbe"],["/person_blogs/sw-register.js","181c644e75ee2dc26803de59037d2683"],["/person_blogs/tags/Event-Loop/index.html","927498596bf9741163ef4c3cbdb74e45"],["/person_blogs/tags/HTML汇总/index.html","26a7ef7c20a0e97ea0b2cd9627bc6dac"],["/person_blogs/tags/babel/index.html","59a8bb0750bd78eb4661fc5cd778d921"],["/person_blogs/tags/blog/index.html","8dfae5f6e8568389a0e31431f4e9ec97"],["/person_blogs/tags/bootstrap/index.html","1bfb53a1a3205a3a0be0c71c6c963822"],["/person_blogs/tags/css/index.html","93d5752804e8c899700dbcb1eafdd2c6"],["/person_blogs/tags/css/page/2/index.html","3126e2ead5d016a2c871a3b72e9eccc8"],["/person_blogs/tags/css动画/index.html","216e5c955db1d2343fa37f7ba7ef78b6"],["/person_blogs/tags/css工程化/index.html","f87a2b7efecd902416c5c4a919fb3d60"],["/person_blogs/tags/css效果/index.html","a4fad3a147f79cfc79efc85df311cc32"],["/person_blogs/tags/es6/index.html","4d90c3c045102a90a47a19176d3296ac"],["/person_blogs/tags/git/index.html","5a9800c2e8e11629b38501e4d82c8203"],["/person_blogs/tags/global/index.html","9ac9c4084aadb3b4873601e4e0b32ed9"],["/person_blogs/tags/gulp/index.html","9aaf83dcad551e2835261ba4704ce7f1"],["/person_blogs/tags/hexo/index.html","66805eb5ad6ea1b6502d1edbd9b57d3f"],["/person_blogs/tags/html/index.html","77466d5d3d567b55cb5049c660967455"],["/person_blogs/tags/http/index.html","2a0f72bf6dac3e6bfce953453a33748d"],["/person_blogs/tags/index.html","281aae0f3b093abfbbf417982ba9258c"],["/person_blogs/tags/js/index.html","a5e35b4221f358a881287c69aaf840d7"],["/person_blogs/tags/node/index.html","9dd3e3986b0a2b5efbc1c773ac83f1e7"],["/person_blogs/tags/nodemon/index.html","860b987f5089dcf6768f7d3472e4267f"],["/person_blogs/tags/npx/index.html","e46b127776909d309893fd64cc530141"],["/person_blogs/tags/promise/index.html","0c045b2ec944398c700e602b76a15749"],["/person_blogs/tags/tcp/index.html","195bbc912f74384f7e0c3494aff8668d"],["/person_blogs/tags/vscode/index.html","be25a71214aba601c5de3e5b9306267f"],["/person_blogs/tags/vscode插件/index.html","0635de00fc7970336f01aab1b423d65b"],["/person_blogs/tags/前端基础/index.html","e35496373c4e5003b8c0938d91d33c97"],["/person_blogs/tags/前端基础/page/2/index.html","9314490c899889fe070b858dd70b88d8"],["/person_blogs/tags/前端基础/page/3/index.html","1273c18c6631eecea1e04f9acc5bd957"],["/person_blogs/tags/小程序/index.html","b4dc95603b4472ce72009193aa852c7a"],["/person_blogs/tags/异步/index.html","551f93195e077bbaec89e335b08a87a3"],["/person_blogs/tags/微信/index.html","53e21b43e3f2684bcd253547ad827d8d"],["/person_blogs/tags/性能优化/index.html","26741d2c88b002cb8578e3af827db1b7"],["/person_blogs/tags/插件/index.html","425616a6a2e535774b672035dfde208c"],["/person_blogs/tags/构建工具/index.html","5bf8144afc4ad31fcbde4c7effe0a5dd"],["/person_blogs/tags/框架中的css/index.html","5ac307868c8f6da2e02fe49c44a4ad96"],["/person_blogs/tags/浏览器/index.html","fa033d5bd27c7785f8f48046031d285a"],["/person_blogs/tags/浏览器渲染/index.html","7187f1aee11be5fb1affda7d1ad7aaf0"],["/person_blogs/tags/网路/index.html","ae2dec165bda9fec4137e2f2922e7480"],["/person_blogs/tags/预处理器/index.html","dae5ae6a00cbf6ba9eb41a69eb24b5fe"],["/person_blogs/uploads/avatar.jpg","19392dd66f6175e4ea17280adf4db7e8"],["/person_blogs/uploads/wechatpay.jpg","dc08d8b0df0a37e3e11e78174709ba0f"]];
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
