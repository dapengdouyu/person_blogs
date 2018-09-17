/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/person_blogs/2018/05/21/git/0.png","bd069bbbca4e2d1c0e2b4416df5dd14b"],["/person_blogs/2018/05/21/git/fetch_HEAD.png","10831dc4bae97a7504b7ff5209368861"],["/person_blogs/2018/05/21/git/gitlog.png","76841726e0cc211fbfaac8d9b273281a"],["/person_blogs/2018/05/21/git/git基本流程.png","ec6c0c1f69c4ed94b8ad0b881e40d469"],["/person_blogs/2018/05/21/git/git版本.png","42235a95fa69d23fee78b7ccf57af822"],["/person_blogs/2018/05/21/git/index.html","7a5e5ebfbdda9d1d996b056f50933091"],["/person_blogs/2018/05/21/git/no-ff.png","4fae485fb0062c35d7ac9ea36f16b0d9"],["/person_blogs/2018/05/21/git/tracking.png","a1fb55bd83f8930da4cd25ee7b393180"],["/person_blogs/2018/05/21/git/分布式.png","36811a240cf686b00787ace6a723e2bf"],["/person_blogs/2018/05/21/git/集中式.png","5bbcfb2d2a77f7770f937a6a26cb3413"],["/person_blogs/2018/05/21/hexo建站指南/index.html","1dd66b1066a11118915e307d73bca4c3"],["/person_blogs/2018/05/21/hexo建站指南/js.png","fd78c647158c594390d124b234f23ac8"],["/person_blogs/2018/05/21/nodemon/index.html","e33079eaa07ab71bf2ec9e5f71fd9cc9"],["/person_blogs/2018/05/25/npx/index.html","f8be51a647f5d0b579f9dd07fffd34f1"],["/person_blogs/2018/05/25/微信公众号/index.html","57b020a33c82b3d6090c9d87b491d9c9"],["/person_blogs/2018/05/25/微信公众号/公众号权限.jpg","5307779292b4d88c413aca4b5d6242c7"],["/person_blogs/2018/05/25/微信公众号/微信交互过程.jpg","bb87b9e4b5001779dd4d365cbe6af33d"],["/person_blogs/2018/05/25/微信公众号/验证公众号.jpg","72540fb2be5ced94c709b6a8f1a1b85b"],["/person_blogs/2018/05/29/gulp/index.html","6ce0e92f6a8f1767494e8b76c2aa013a"],["/person_blogs/2018/05/30/gulp插件/index.html","42e5435e6966d99315b24064a7147ecc"],["/person_blogs/2018/05/31/es6快学/index.html","6f71ed865d7a7a96f6cceec7b85500af"],["/person_blogs/2018/06/11/小程序/index.html","e9d22ebe962b56d2bbf8aea59d92d6cb"],["/person_blogs/2018/06/11/小程序/图片1.png","a70e2059dbd63d02de44cb09783642f7"],["/person_blogs/2018/06/11/小程序/图片10.png","253b5cb5d64d8a085a939479cbd82c61"],["/person_blogs/2018/06/11/小程序/图片11.png","2394147ba042004e52c563dab2566e86"],["/person_blogs/2018/06/11/小程序/图片12.png","15685ed43535dcd8f669a3a62d0c944c"],["/person_blogs/2018/06/11/小程序/图片13.png","6ddfee2874af19fdda5457a6ebb07a4a"],["/person_blogs/2018/06/11/小程序/图片2.png","17cf31e03a529dd16d30cdba237d261b"],["/person_blogs/2018/06/11/小程序/图片3.png","4c418c305ea29c2652073b3fb2f60e9c"],["/person_blogs/2018/06/11/小程序/图片4.png","1dd0a93c3455171775630e16ba06d315"],["/person_blogs/2018/06/11/小程序/图片5.png","9b2af48344d07f6b52939b2f7f411eeb"],["/person_blogs/2018/06/11/小程序/图片6.png","2113900dc3174e66b31dce4265e8b3e4"],["/person_blogs/2018/06/11/小程序/图片7.png","5a03ad0f423874e9a55ea00ab5fe7567"],["/person_blogs/2018/06/11/小程序/图片8.png","a6e291f21158b3c9ea65cba5ca508458"],["/person_blogs/2018/06/11/小程序/图片9.png","ce85efe0c14262c802704c8a87df61fa"],["/person_blogs/2018/06/12/css/TIM截图20180612152920.jpg","90ec841c094cba227458755449a4cee2"],["/person_blogs/2018/06/12/css/index.html","2dd29099f73f1439d86768a0d9180d4f"],["/person_blogs/2018/06/12/微信直播/index.html","cf628c6a9376549840bb9e159de93131"],["/person_blogs/2018/06/12/文本样式/font-weight.jpg","5ff1244ea47b3c5561e587036c66c695"],["/person_blogs/2018/06/12/文本样式/index.html","7929e8cbb1b0e7c4ba0a6b97b284d096"],["/person_blogs/2018/06/12/文本样式/字体.png","c38e59b8c80d76400ee9802270ad0034"],["/person_blogs/2018/06/12/文本样式/字体族.jpg","b2de214630030f8e2e50a13b670f9ac8"],["/person_blogs/2018/06/12/文本样式/通用字体族.jpg","c0496ec92b179d44b46f60c10fdf285d"],["/person_blogs/2018/06/13/浮动/float.jpg","195047130f66f69bd8e14a7b2ae85f2e"],["/person_blogs/2018/06/13/浮动/index.html","8ae4274c44a423614d49d8d507672659"],["/person_blogs/2018/06/14/定位与堆叠/absolute.jpg","2371e331ad81280b2788fd2e56aad0c7"],["/person_blogs/2018/06/14/定位与堆叠/index.html","344f65ad2472e3519db922d302214e33"],["/person_blogs/2018/06/14/定位与堆叠/z-index.png","c148506f5397247c847de3514432b6dd"],["/person_blogs/2018/06/14/定位与堆叠/堆叠上下文.jpg","283475ec7454d34584f1c9c7f7526345"],["/person_blogs/2018/06/14/定位与堆叠/堆叠上下文2.jpg","f0e76597c4d8e71daa40deae8f450624"],["/person_blogs/2018/06/14/层叠继承和css单位/hsl.jpg","daf4d3b2f7a4e41fc4c7b9b3fd187537"],["/person_blogs/2018/06/14/层叠继承和css单位/index.html","f1a4bed7c1ab50a63039c800d130a1ac"],["/person_blogs/2018/06/14/层叠继承和css单位/specificityimg.png","c409c760c0bee888743dc2697303bbf2"],["/person_blogs/2018/06/14/盒模型/boxmodel.jpg","182d83d8c0f7ed736753d56aeb33f9f5"],["/person_blogs/2018/06/14/盒模型/index.html","5437a6abe049f0f15cc8befceb90ecfd"],["/person_blogs/2018/06/14/盒模型/块级元素.png","ac0f46d33990a8c334393f2756c8b566"],["/person_blogs/2018/06/14/盒模型/盒子.jpg","f24b489edc37893b648f204bd09e6b59"],["/person_blogs/2018/06/14/盒模型/行级盒子.png","1de67777abd275e145a9d723540b8696"],["/person_blogs/2018/06/15/排版细节/index.html","5dddd280942b2ca37ba93269e49679b2"],["/person_blogs/2018/06/15/排版细节/line-box.png","804f848fe0559f5878bbec084365c0c7"],["/person_blogs/2018/06/15/排版细节/line-height.jpg","8579db767ab7a063d10d9d08f808d61f"],["/person_blogs/2018/06/15/排版细节/list-style-position.jpg","8b4712167cf42e8912e4e7104df16c54"],["/person_blogs/2018/06/15/排版细节/ver.jpg","4113f24f1cedc05e125402dd2f4e0929"],["/person_blogs/2018/06/15/排版细节/vertical-box.jpg","9affd804dcbba504208259ab28cded5e"],["/person_blogs/2018/06/15/排版细节/行级格式化上下文.png","be81f02d35b6a40fa70bc5ac660b457e"],["/person_blogs/2018/06/19/动画/index.html","2d8bc6e4c284b2142ea624c3925bb63f"],["/person_blogs/2018/06/19/布局/Grid.jpg","26a0d2148046f3b32296322161e49b1b"],["/person_blogs/2018/06/19/布局/align-content.png","d037edf6132bfcde471a8758368c7afe"],["/person_blogs/2018/06/19/布局/align-items.png","390dc826058dea5b0c438b756f76efa0"],["/person_blogs/2018/06/19/布局/flex-direction.jpg","032c7d0177e1e7f7dc80ff544401ee66"],["/person_blogs/2018/06/19/布局/index.html","00c96fef92214e5b3110668ab9001127"],["/person_blogs/2018/06/19/布局/justify-content.png","808ddfdbafc273f8e5a67a5200779709"],["/person_blogs/2018/06/19/布局/主轴.png","c5d1828f3d186ca4b7dc4f7f94262b96"],["/person_blogs/2018/06/19/布局/伪等高.jpg","4869df0907a355d589c8472206df4124"],["/person_blogs/2018/06/19/布局/兼容性.jpg","84f9642da96a50308abf0b5199823fe4"],["/person_blogs/2018/06/19/布局/展示.jpg","282e4e875fc3c895c8cc83316c64d664"],["/person_blogs/2018/06/20/兼容性/index.html","0271f7c13814e98711b906cd61ae3adb"],["/person_blogs/2018/06/20/兼容性/supports.jpg","f58791c8f5287c8038a47fefc95734b5"],["/person_blogs/2018/06/20/响应式设计/index.html","6f064e64e061464405134cb837cec369"],["/person_blogs/2018/06/20/响应式设计/网格.png","42bc34cd435f54ca5a82e600ebc2cf60"],["/person_blogs/2018/06/20/工程化/Media.jpg","add9300d6b7e82aa209213a6af4e58a3"],["/person_blogs/2018/06/20/工程化/index.html","b45acff12a670437c82f9cae5512eed0"],["/person_blogs/2018/06/20/工程化/文件结构.png","01319361f90fdbce13db10a654699be2"],["/person_blogs/2018/06/20/高级选择器/index.html","cf5434cfa0eda15248aa4c420fdfa3c9"],["/person_blogs/2018/06/21/html简述与文本/index.html","c6ad140324214c37bc40a8bf5e6d2e59"],["/person_blogs/2018/06/21/html简述与文本/网页总体结构.png","525e10b1bbf3187d956442d069429ead"],["/person_blogs/2018/06/21/text-size-adjust使用汇总/index.html","a0c1600c956b4650e0f7932fa65a8afd"],["/person_blogs/2018/06/21/表单/index.html","a4178a851985002ca5e5ddea7a69902d"],["/person_blogs/2018/06/21/表格/index.html","c12c36a6c5514d98bd56cb1604671dbe"],["/person_blogs/2018/06/21/表格/table.png","246ed67c73c604feeb989e33a04f85d8"],["/person_blogs/2018/06/21/连接与图片/href.jpg","35d9804506bd416ba61bd8aaadc60b44"],["/person_blogs/2018/06/21/连接与图片/index.html","97da7b27754fe50d720e3efb645ce788"],["/person_blogs/2018/06/24/HTML补充知识/index.html","f1ad5c994fa728bf3f84923f1fcf3684"],["/person_blogs/2018/06/26/node深研/index.html","a39e3045b2084db9c5a0524b6d6fefcb"],["/person_blogs/2018/06/26/node深研/node.jpg","3a772fd012b29957cb58e9f970a57ed0"],["/person_blogs/2018/06/26/node深研/nodeloop.png","3228e8674a48daffa748ec1bbe57005c"],["/person_blogs/2018/06/26/node深研/nodepoll.png","b9b30c76b65c0bd5a5c15fd293f736c0"],["/person_blogs/2018/06/26/node深研/node中执行.png","a55b9b539d01c5d80b307ed6d00b4f99"],["/person_blogs/2018/06/26/node深研/浏览器EventLoop.jpg","75b404807ad79b3c6793e22b7bb4fa99"],["/person_blogs/2018/06/26/node深研/浏览器执行.png","261c1097d6ddb15ccaab17f1e7146ccd"],["/person_blogs/2018/06/26/node深研/非node.jpg","60799224a7296b67e6aab80cfff07cfb"],["/person_blogs/2018/07/05/css预处理器/index.html","529055e61c5e09506d920032500f9c24"],["/person_blogs/2018/07/06/css框架bootstarp/index.html","ca4e32d5e0dddc053817611e762688a0"],["/person_blogs/2018/07/06/css框架bootstarp/响应式.png","344bbc8c625bdaf12adacf6e486839ea"],["/person_blogs/2018/07/06/框架中的css/index.html","dd2b81b767ebd00579f6f2c24e811d91"],["/person_blogs/2018/07/06/框架中的css/video.jpg","e2beddb9d11146a7dd7f6fbc25449e71"],["/person_blogs/2018/07/06/框架中的css/开启shadowDom.png","4f5696d1d56bcdad51ff818a5a355620"],["/person_blogs/2018/07/09/HTML汇总/HTML版本.jpg","a2de2f22a0e5e32c132b9e194b124e3f"],["/person_blogs/2018/07/09/HTML汇总/flow.jpg","cc556f4c7918f1084c078fadc496bf56"],["/person_blogs/2018/07/09/HTML汇总/index.html","8daf3f41e0898d7afb476c1e7f328c26"],["/person_blogs/2018/07/09/HTML汇总/viewport.jpg","3433e5a1a8d68dca799f8de98090616e"],["/person_blogs/2018/07/09/css动画/index.html","788c93958f11b9f8541b4c77ffffb067"],["/person_blogs/2018/07/09/css动画/timing.jpg","11381af2541edf17105dc5fb78a78595"],["/person_blogs/2018/07/09/css动画/关键帧动画.png","8b97823ef80053e1e4bf5be149f5b442"],["/person_blogs/2018/07/09/css动画/补间动画.jpg","fd1fe81cdad4b55be69df95e3564b2ff"],["/person_blogs/2018/07/09/css动画/逐帧动画.png","979dcead8f1267ae3ffd9dd7baba04f3"],["/person_blogs/2018/07/10/css工程化/BrowserList.jpg","531d83232ff6665f1923b88bc0e0cc93"],["/person_blogs/2018/07/10/css工程化/cssnext.jpg","7335e813a1c17987a0abceebf5f3aae9"],["/person_blogs/2018/07/10/css工程化/index.html","f87d96c4017e1c4596237de8c39d154c"],["/person_blogs/2018/07/10/css工程化/postcss.jpg","04bcb1c638cc01f4bee3aa8f00ee0794"],["/person_blogs/2018/07/10/css效果/3d.jpg","cf03dc97e063fbbbfbe94a3e7a13f742"],["/person_blogs/2018/07/10/css效果/box-shadow.png","df23506b9fe84b10b30e51a1e255301c"],["/person_blogs/2018/07/10/css效果/index.html","069496e2e631d2e6a880d2eaaa7561e9"],["/person_blogs/2018/07/10/css效果/svg.jpg","eb4d637e191675b85c0015a9d27ce0eb"],["/person_blogs/2018/07/10/css效果/transform.jpg","a80701f47cf5ecda171d3506cce6933a"],["/person_blogs/2018/07/23/promise详解/generator.png","f4fcfef52f06a98d5a75871a8597673c"],["/person_blogs/2018/07/23/promise详解/index.html","d769ef624b111740a0969ac78ada9a7b"],["/person_blogs/2018/07/25/babel/index.html","be6592490fc098e62de0a7db8560db42"],["/person_blogs/2018/07/25/mobx/index.html","8824ecc70004ff8ed6f8331da6eb6169"],["/person_blogs/2018/08/08/TCP/index.html","0656cb2aeef45592d6db8e3b85b5b3c8"],["/person_blogs/2018/08/08/TCP/osi7层模型.jpg","c381afbb827d435be07280d3853cf850"],["/person_blogs/2018/08/29/vscode插件/00-400x264.png","e90d695457081461db2b05d952d61366"],["/person_blogs/2018/08/29/vscode插件/01-400x445.png","87c3e3f2fefb71eadde6352424f423a0"],["/person_blogs/2018/08/29/vscode插件/02-400x189.png","b9edb62ee6cf2463e9b81dafff455033"],["/person_blogs/2018/08/29/vscode插件/03-400x75.png","8abe946ffe1e5a0098bfcf775c17fde8"],["/person_blogs/2018/08/29/vscode插件/04.png","2067b3880ffe4e5aea78a4c6721a7d3e"],["/person_blogs/2018/08/29/vscode插件/1.png","6d96b9deb30059b657aeb654b30fee26"],["/person_blogs/2018/08/29/vscode插件/2.png","1bad6dfb64a3994a83f026261efd4cbd"],["/person_blogs/2018/08/29/vscode插件/20180815183752751.png","9527477ba23943ba6374f97308b18786"],["/person_blogs/2018/08/29/vscode插件/20180815183812965.png","9c4f06e8431751d5a2db56107a1dc3c2"],["/person_blogs/2018/08/29/vscode插件/20180815183830941.png","0451b90e09e7a1d6ba9e1de539c65a97"],["/person_blogs/2018/08/29/vscode插件/index.html","0ea0a459a1a9586b1e7c0e16b4aa7938"],["/person_blogs/2018/09/05/浏览器渲染/chromium.jpg","24d65d9aea03aad1b6b61fec5e14fa38"],["/person_blogs/2018/09/05/浏览器渲染/index.html","6868de71c6a39ea26b952678900172c2"],["/person_blogs/2018/09/05/浏览器渲染/webkit架构图.jpg","4e8c7ccf92374f0f5480d0c8cef265a3"],["/person_blogs/2018/09/05/浏览器渲染/浏览器渲染.jpg","688510d10251aeeb7aebe99cac44785a"],["/person_blogs/2018/09/05/浏览器渲染/渲染引擎.jpg","0e5bd1558438622e0f387518198b85c9"],["/person_blogs/2018/09/05/浏览器渲染/网络栈.jpg","4f6fb8c4708d291eba0160bbde00bce4"],["/person_blogs/2018/09/05/浏览器渲染/进程.jpg","4a870c3f4bf74468496142621b70643b"],["/person_blogs/2018/09/06/前端性能优化/index.html","f9d07d4a5181fcfd70772a29c2b2b538"],["/person_blogs/404.html","fc095f75a41fc05297a202c8fb0f82c3"],["/person_blogs/archives/2018/05/index.html","e4979dcfb13e0e15138116090b40a151"],["/person_blogs/archives/2018/06/index.html","b5b66a7f0ba44e26bd63665bf28a2ec5"],["/person_blogs/archives/2018/06/page/2/index.html","769a74657fb21d76746adfc231335133"],["/person_blogs/archives/2018/06/page/3/index.html","538ab98578865cb34fce54044959c52b"],["/person_blogs/archives/2018/07/index.html","76a3c2f9382dceaedee5c07101c520ed"],["/person_blogs/archives/2018/08/index.html","c06218091610c8bf24fc7de642a12a48"],["/person_blogs/archives/2018/09/index.html","1a515f00c3e7cd95256452f19d695848"],["/person_blogs/archives/2018/index.html","58e5fff097c02cf4741b233602a97b16"],["/person_blogs/archives/2018/page/2/index.html","fc8cce2a7d05926b221272e15162d7aa"],["/person_blogs/archives/2018/page/3/index.html","e88c240d3187252ff09d10f5cd104e2b"],["/person_blogs/archives/2018/page/4/index.html","127a34bebd182075d4c08af899ac8e59"],["/person_blogs/archives/2018/page/5/index.html","1e76a7b314ed202e977c09202301db3b"],["/person_blogs/archives/index.html","c96027b105cf6e0006a306bb995b6de8"],["/person_blogs/archives/page/2/index.html","eff405f33abf139e28594e1610061020"],["/person_blogs/archives/page/3/index.html","299ee1ad2519b2e22d888540227d4443"],["/person_blogs/archives/page/4/index.html","0fcf175eb439996eeaaaff5a4eb47052"],["/person_blogs/archives/page/5/index.html","aeb9e5d0661be10ed4df2718e75c2811"],["/person_blogs/css/main.css","ce90dd2f8ce00564737ecdf32c108b56"],["/person_blogs/images/algolia_logo.svg","fd40b88ac5370a5353a50b8175c1f367"],["/person_blogs/images/apple-touch-icon-next.png","fce961f0bd3cd769bf9c605ae6749bc0"],["/person_blogs/images/avatar.gif","2bed513bc5f13733cf9a8a12c4e1a971"],["/person_blogs/images/cc-by-nc-nd.svg","1c681acc4a150e7236254c464bb5a797"],["/person_blogs/images/cc-by-nc-sa.svg","12b4b29e8453be5b7828b524d3feabce"],["/person_blogs/images/cc-by-nc.svg","dd9cfe99ed839a4a548114f988d653f4"],["/person_blogs/images/cc-by-nd.svg","2d80546af20128215dc1e23ef42d06c2"],["/person_blogs/images/cc-by-sa.svg","c696b3db81cbbfba32f66c1dc88b909a"],["/person_blogs/images/cc-by.svg","6c4f8422b3725cb9f26b6c00e95fc88b"],["/person_blogs/images/cc-zero.svg","79deee77a07fcb79ff680ac0125eacb9"],["/person_blogs/images/favicon-16x16-next.png","b8975923a585dbaa8519a6068e364947"],["/person_blogs/images/favicon-32x32-next.png","5a029563fe3214c96f68b46556670ea1"],["/person_blogs/images/loading.gif","c2196de8ba412c60c22ab491af7b1409"],["/person_blogs/images/logo.svg","ddad9027e42111ccd5b466bc18188970"],["/person_blogs/images/placeholder.gif","c2196de8ba412c60c22ab491af7b1409"],["/person_blogs/images/quote-l.svg","1238a4baccd02c6025ec85b58f4282d4"],["/person_blogs/images/quote-r.svg","85787c6fa27965c81f7be70252b43bed"],["/person_blogs/images/searchicon.png","3d6b5c9d6d6c26a2b76a14b8fdf3438a"],["/person_blogs/index.html","b69a3a30b58d65cd94faf62cf8e78552"],["/person_blogs/js/src/affix.js","683c19859764baf0d17538897ea1eba2"],["/person_blogs/js/src/algolia-search.js","f5fa392318805997089ceb3a925979ba"],["/person_blogs/js/src/bootstrap.js","2a1083772854ae2663748e0a25c17285"],["/person_blogs/js/src/exturl.js","2b444179b3145e5007b4d371dac07cd3"],["/person_blogs/js/src/hook-duoshuo.js","45997b0c06abff3cd88efd901f614065"],["/person_blogs/js/src/js.cookie.js","6e9eb1f53afb135aedaf90739c867738"],["/person_blogs/js/src/motion.js","0f6add86607c451269d0b3d286c84d8b"],["/person_blogs/js/src/post-details.js","b8e8e27c27c697567879c52888ffc24c"],["/person_blogs/js/src/schemes/pisces.js","827b5ad25e1142277c1e7dfe0cacebe5"],["/person_blogs/js/src/scroll-cookie.js","890406ae3539e4721ef5f314542e5e46"],["/person_blogs/js/src/scrollspy.js","fafdd7ab6af233b701506c733910b7f5"],["/person_blogs/js/src/utils.js","24512c3455f976730b7bf75e1222c533"],["/person_blogs/lib/Han/dist/font/han-space.woff","b09f2dd7d3ad8ad07f3b8495133909d9"],["/person_blogs/lib/Han/dist/font/han.woff","e841c6b547bc06a06f60f4de52bf906e"],["/person_blogs/lib/Han/dist/font/han.woff2","2b06aa1c952a2dfaf00d99218689d147"],["/person_blogs/lib/Han/dist/han.css","cfcc552e7aebaef5e2f34aee030b956b"],["/person_blogs/lib/Han/dist/han.js","575b6c1667c01798730fbd972e959c9c"],["/person_blogs/lib/Han/dist/han.min.css","cab466d758269b437167422c4a16b364"],["/person_blogs/lib/Han/dist/han.min.js","96482c9c2b3c5ea9bf5a40db162c7f34"],["/person_blogs/lib/algolia-instant-search/instantsearch.min.css","029a13b44e6807955106ff3c075a02f9"],["/person_blogs/lib/algolia-instant-search/instantsearch.min.js","0db46eba0c8133693ee839507b1612f2"],["/person_blogs/lib/canvas-nest/canvas-nest.min.js","36e103d2a05bc706bac40f9ab8881eb7"],["/person_blogs/lib/canvas-ribbon/canvas-ribbon.js","16dc214240913551986593808c2efcfc"],["/person_blogs/lib/fancybox/source/blank.gif","325472601571f31e1bf00674c368d335"],["/person_blogs/lib/fancybox/source/fancybox_loading.gif","328cc0f6c78211485058d460e80f4fa8"],["/person_blogs/lib/fancybox/source/fancybox_loading@2x.gif","f92938639fa894a0e8ded1c3368abe98"],["/person_blogs/lib/fancybox/source/fancybox_overlay.png","77aeaa52715b898b73c74d68c630330e"],["/person_blogs/lib/fancybox/source/fancybox_sprite.png","783d4031fe50c3d83c960911e1fbc705"],["/person_blogs/lib/fancybox/source/fancybox_sprite@2x.png","ed9970ce22242421e66ff150aa97fe5f"],["/person_blogs/lib/fancybox/source/helpers/fancybox_buttons.png","b448080f8615e664b7788c7003803b59"],["/person_blogs/lib/fancybox/source/helpers/jquery.fancybox-buttons.css","cac75538c2e3ddfadef839feaca8e356"],["/person_blogs/lib/fancybox/source/helpers/jquery.fancybox-buttons.js","f53c246661fb995a3f12e67fa38e0fa0"],["/person_blogs/lib/fancybox/source/helpers/jquery.fancybox-media.js","c017067f48d97ec4a077ccdf056e6a2e"],["/person_blogs/lib/fancybox/source/helpers/jquery.fancybox-thumbs.css","52ddd84a9f42c1d4cd86d518a7f7e8bc"],["/person_blogs/lib/fancybox/source/helpers/jquery.fancybox-thumbs.js","cf1fc1df534eede4cb460c5cbd71aba6"],["/person_blogs/lib/fancybox/source/jquery.fancybox.css","6c55951ce1e3115711f63f99b7501f3a"],["/person_blogs/lib/fancybox/source/jquery.fancybox.js","921e9cb04ad6e2559869ec845c5be39b"],["/person_blogs/lib/fancybox/source/jquery.fancybox.pack.js","cc9e759f24ba773aeef8a131889d3728"],["/person_blogs/lib/fastclick/README.html","b3cd6e7f930bf6e410a2e7eab8a148a8"],["/person_blogs/lib/fastclick/lib/fastclick.js","6e9d3b0da74f2a4a7042b494cdaa7c2e"],["/person_blogs/lib/fastclick/lib/fastclick.min.js","a0fc6c24d1f3ff9ac281887c92b24acd"],["/person_blogs/lib/font-awesome/css/font-awesome.css","c495654869785bc3df60216616814ad1"],["/person_blogs/lib/font-awesome/css/font-awesome.min.css","269550530cc127b6aa5a35925a7de6ce"],["/person_blogs/lib/font-awesome/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["/person_blogs/lib/font-awesome/fonts/fontawesome-webfont.svg","912ec66d7572ff821749319396470bde"],["/person_blogs/lib/font-awesome/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["/person_blogs/lib/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["/person_blogs/lib/font-awesome/fonts/fontawesome-webfont.woff2","af7ae505a9eed503f8b8e6982036873e"],["/person_blogs/lib/jquery/index.js","32015dd42e9582a80a84736f5d9a44d7"],["/person_blogs/lib/jquery_lazyload/CONTRIBUTING.html","7287727950845c8a1010f3933691afef"],["/person_blogs/lib/jquery_lazyload/README.html","d89aa4afe316331a25b636b5ead4716e"],["/person_blogs/lib/jquery_lazyload/jquery.lazyload.js","8b427f9e86864ee3aaf1ae33e6e14263"],["/person_blogs/lib/jquery_lazyload/jquery.scrollstop.js","f163fd8f02361928853668a96f8a1249"],["/person_blogs/lib/needsharebutton/font-embedded.css","dd8861d10d1ed6b5e0c0011adfb39be9"],["/person_blogs/lib/needsharebutton/needsharebutton.css","30f2f800e13f7b6b83629a4cbd9749ef"],["/person_blogs/lib/needsharebutton/needsharebutton.js","6c6f855f7d50f4bc3c804f52b03bbfbb"],["/person_blogs/lib/pace/pace-theme-barber-shop.min.css","e8dc66cf2d88abc25fbc89b8a0529abb"],["/person_blogs/lib/pace/pace-theme-big-counter.min.css","db2b8fe31e60f19021545277d2f6e05e"],["/person_blogs/lib/pace/pace-theme-bounce.min.css","ad954aa0bace4b213eeb19d6e89a0bda"],["/person_blogs/lib/pace/pace-theme-center-atom.min.css","8f6bc803acefc6f93afc98fb38201456"],["/person_blogs/lib/pace/pace-theme-center-circle.min.css","93c72298781226a80a9c66b27b21a57d"],["/person_blogs/lib/pace/pace-theme-center-radar.min.css","f0099bdd1cd42e9476bd7abc417c0328"],["/person_blogs/lib/pace/pace-theme-center-simple.min.css","eddff4756dbf21dbbff1c543bd894dde"],["/person_blogs/lib/pace/pace-theme-corner-indicator.min.css","776826157cb28ac1ee5e78771292b9ba"],["/person_blogs/lib/pace/pace-theme-fill-left.min.css","965859b39001da08e1e92327fe3d8e12"],["/person_blogs/lib/pace/pace-theme-flash.min.css","aab39b436e1fa0fdc51df06f2d53c38a"],["/person_blogs/lib/pace/pace-theme-loading-bar.min.css","4e05877f1f9efb9c1e7dd75cb78c764f"],["/person_blogs/lib/pace/pace-theme-mac-osx.min.css","29ae030ceaa8158352c5472218375b91"],["/person_blogs/lib/pace/pace-theme-minimal.min.css","f48f04d370993b55a2745e548cc82743"],["/person_blogs/lib/pace/pace.min.js","24d2d5e3e331c4efa3cda1e1851b31a7"],["/person_blogs/lib/three/canvas_lines.min.js","1324174ae6190fbf63b7bf0ad0a8a5bd"],["/person_blogs/lib/three/canvas_sphere.min.js","5c6bc45b137448b5b9df152ccfb2659c"],["/person_blogs/lib/three/three-waves.min.js","41059bd5e5c7aa520b1b411919e5121f"],["/person_blogs/lib/three/three.min.js","3298078bce82bdb1afadf5b1a280915e"],["/person_blogs/lib/ua-parser-js/dist/ua-parser.min.js","a6e833266c4b41fabb9ba94a145322d8"],["/person_blogs/lib/ua-parser-js/dist/ua-parser.pack.js","6b627e4d61a7135952824bb9c1a4a134"],["/person_blogs/lib/velocity/velocity.js","0361fa6dcf4cf4d19c593cdab0937dd0"],["/person_blogs/lib/velocity/velocity.min.js","c1b8d079c7049879838d78e0b389965e"],["/person_blogs/lib/velocity/velocity.ui.js","f55d22cc592c9f8d4ffd3b41a6b90081"],["/person_blogs/lib/velocity/velocity.ui.min.js","444faf512fb24d50a5dec747cbbe39bd"],["/person_blogs/live2dw/assets/moc/hibiki.2048/texture_00.png","730252369524e7a1c21308cb84acd465"],["/person_blogs/live2dw/lib/L2Dwidget.0.min.js","7d6ea3548b666c761bfb3a01f25ae87d"],["/person_blogs/live2dw/lib/L2Dwidget.min.js","0c58a1486de42ac6cc1c59c7d98ae887"],["/person_blogs/page/2/index.html","676f8f54f6896cb823a6fdf1bf5f4440"],["/person_blogs/page/3/index.html","e0af99d2139e05d5f622c0dc72227c25"],["/person_blogs/page/4/index.html","43e1a49968e629efcc215050c8e09307"],["/person_blogs/page/5/index.html","764bd87b8f8de22e4c4f2957e84fea2d"],["/person_blogs/sw-register.js","79ca5d4df22b087bfb6c244c4dbd2447"],["/person_blogs/tags/Event-Loop/index.html","1767edd9c65e29859ea2fda20e66bd38"],["/person_blogs/tags/HTML汇总/index.html","bdadb6a28fcada681fc9035fec7fc909"],["/person_blogs/tags/babel/index.html","cd370795770f9f17d3550132827e40ae"],["/person_blogs/tags/blog/index.html","3e73c35ae99dd562581ea5d2ff8326f6"],["/person_blogs/tags/bootstrap/index.html","c6f6960da9cb71ae1fe364ff3ad88478"],["/person_blogs/tags/css/index.html","57de83765475f083454e1c8d22480140"],["/person_blogs/tags/css/page/2/index.html","8a6abc7ecda0fdf1618fe48055b6c6bf"],["/person_blogs/tags/css动画/index.html","8588eead8f1048455f01278a800c9e19"],["/person_blogs/tags/css工程化/index.html","f7068771482780c3f4b731c0b00d72cc"],["/person_blogs/tags/css效果/index.html","56019c8231dd6f913486d16f3d1ac616"],["/person_blogs/tags/es6/index.html","0b4f8be503d189f1b718f4bf0167a733"],["/person_blogs/tags/git/index.html","9f735d7e37015054eb5caef96503ec9a"],["/person_blogs/tags/global/index.html","485d99d15f6e3ac656b0edbdcfc5a6c4"],["/person_blogs/tags/gulp/index.html","0434d41021bd1dd5cc303e51665bc312"],["/person_blogs/tags/hexo/index.html","0977667f58ff92baccc04222a0238bbf"],["/person_blogs/tags/html/index.html","dbfecedfecaf98eef5925265418c9dd0"],["/person_blogs/tags/http/index.html","f7e29df7d4bac500ebd4d00fe991228c"],["/person_blogs/tags/index.html","5da32e47cc3c4174c426c3c7fb3ab0d7"],["/person_blogs/tags/js/index.html","74a21c38c000fc8332ddc98c747607e5"],["/person_blogs/tags/node/index.html","3a74dfab95566adb5f6dd52cffb921ad"],["/person_blogs/tags/nodemon/index.html","13301be2aa377e65cf96655cad937958"],["/person_blogs/tags/npx/index.html","5852923510c88a75adad86b6ebe771a7"],["/person_blogs/tags/promise/index.html","1d848a24bd7316b2686b6b40920b6b8d"],["/person_blogs/tags/tcp/index.html","48681d1d89c3f4746d0e5a04af817cf0"],["/person_blogs/tags/vscode/index.html","51e831895391af7763f50d13c9efb6c9"],["/person_blogs/tags/vscode插件/index.html","1e15ebce943d8ebad276af7b7e24898b"],["/person_blogs/tags/前端基础/index.html","bd4f1418b397fa4e4d6d644c204d8799"],["/person_blogs/tags/前端基础/page/2/index.html","cad4317f5aa3cc36b2ce9e8b75e79328"],["/person_blogs/tags/前端基础/page/3/index.html","90856726641a9dce04a6cf013d8e96bf"],["/person_blogs/tags/小程序/index.html","2e99f5b997ed9c9c152b77037c9d12c7"],["/person_blogs/tags/异步/index.html","425a4912d0074f2855a16e51cbdfeaa7"],["/person_blogs/tags/微信/index.html","f9b0761226ca4f3c6af209c717dddbb9"],["/person_blogs/tags/性能优化/index.html","3a83386826827a1fd8275679a2a3770b"],["/person_blogs/tags/插件/index.html","2019da38c42daea3892a8499336eb71c"],["/person_blogs/tags/构建工具/index.html","d8c197f3684086964acbf5d50000a5ed"],["/person_blogs/tags/框架中的css/index.html","c378214dfa7cc53b900d069e3b2c04cb"],["/person_blogs/tags/浏览器/index.html","22a0758473e9ac2e66eacd7d97686c9e"],["/person_blogs/tags/浏览器渲染/index.html","d74c29783adcb1c0ae494dfd0deac809"],["/person_blogs/tags/网路/index.html","366de03fe82e96df92e2556d1f7b1290"],["/person_blogs/tags/预处理器/index.html","18d13b9e3ae01a822b991ce5aadb3857"],["/person_blogs/uploads/avatar.jpg","19392dd66f6175e4ea17280adf4db7e8"],["/person_blogs/uploads/wechatpay.jpg","dc08d8b0df0a37e3e11e78174709ba0f"]];
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
