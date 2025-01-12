import { _ as _export_sfc, r as resolveComponent, o as openBlock, c as createElementBlock, e as createStaticVNode, b as createBaseVNode, d as createTextVNode, a as createVNode } from "./app-657f6655.js";
const _imports_0 = "/assets/image-1-5ff3c5eb.png";
const _imports_1 = "/assets/image-3-8131356b.png";
const _sfc_main = {};
const _hoisted_1 = {
  href: "https://github.com/jamiehannaford/what-happens-when-k8s",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_2 = {
  href: "https://open.oceanbase.com/",
  target: "_blank",
  rel: "noopener noreferrer"
};
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _cache[14] || (_cache[14] = createStaticVNode('<h1 id="开源之夏——记录一次收获颇丰的开源实践" tabindex="-1"><a class="header-anchor" href="#开源之夏——记录一次收获颇丰的开源实践" aria-hidden="true">#</a> 开源之夏——记录一次收获颇丰的开源实践</h1><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>今年的七月份，我在常听的播客《开源面对面》中了解到了开源之夏这项活动，了解到活动的持续时间是7-10月，并且可以完整，深入的参与一个社区，这使我非常兴奋。和在实习工作的同学和学长聊天后，他们一致认为，这样的经历相当于一次高质量的实习，因此我决定了要参与的决心。</p><p>参与这次活动，对我而言，优势在于我有一些项目合作的经验，也大大小小参与过一些开源项目。但劣势也很明显，就是我没有太深入的参与过一个社区，也没有完整的互联网公司实习经历，但好很多时候恰好学习都是 <em>learn by doing</em>的过程。</p><p>当然，非常幸运的是我入选了OceanBase社区的项目，这里也感谢ob-cloud-naive sig的导师和各位成员的帮助，让我能够顺利的参与到这次活动中来。</p><h2 id="项目基本信息" tabindex="-1"><a class="header-anchor" href="#项目基本信息" aria-hidden="true">#</a> 项目基本信息</h2><p><strong>项目名称:</strong> ob-operator 命令行工具</p><p><strong>项目导师:</strong> 与义</p><p><strong>项目描述:</strong> 目前用户管理 ob-operator 中 CRD 的主要方式是直接管理 YAML 配置文件，虽然用户可以使用 Dashboard 进行直观的、图形化的管理，但有些用户为了更高的灵活性倾向于使用命令行进行运维。ob-operator 的用户通常对 Kubernetes 的运维工作有一定的了解，如果能够开发 ob-operator 配套的命令行工具为他们提供必要组件的安装升级，核心 CRD 的编辑和管理以及 OceanBase 集群的简单诊断等功能，将带来较大的便利。</p><p><strong>项目链接：</strong> https://summer-ospp.ac.cn/org/prodetail/24f5f0064?list=org&amp;navpage=org</p><h2 id="项目实现思路" tabindex="-1"><a class="header-anchor" href="#项目实现思路" aria-hidden="true">#</a> 项目实现思路</h2><p>目前来说ob-operator用户去使用该工具搭建ob集群，主要有两种方式，采用dashboard部署和采用yaml文件部署。而我要实现的是一个命令行工具，用户可以通过命令行工具来搭建ob集群，这样用户可以更加方便的搭建ob集群。</p><p>命令行工具主要的特点是简便，用户可以通过简单的命令来完成复杂的操作，因此大部分配置将会采用默认值的形式写好，用户往往只需要更改极个别的配置即可完成搭建。</p><p>通过查看Dashboard部分对集群资源进行管理的代码，可以看到非常清晰的资源创建逻辑：</p><ol><li>前端通过api请求后端，设置表单数D</li><li>后端接收到请求，并调用k8s的client-go中的api进行资源的创建</li><li>k8s接收到请求，根据请求的数据创建资源</li><li>前端接收到后端的返回信息，展示给用户</li></ol><p>采用命令行工具创建时，实际上我们只需要2和3两个步骤，思路上主要是采用Cobra框架去实现，在经过几轮讨论后，我们主要提供以下几种命令：</p><ul><li>集群管理: cluster</li><li>租户管理: tenant</li><li>备份策略管理: backup-policy</li><li>组件的安装和升级: install, upgrade</li><li>交互式创建单节点集群和多节点集群: demo</li></ul><p>这些命令也是用户使用该工具时的主要需求，整体实现上不难，我认为难点主要在于设计上如何让每一个命令的设计都尽量清晰明了，整体的流程遵循一套范式，这样也便于后续的扩展，同时也需要考虑到用户输入的几种不同情况带来的影响（尤其是租户管理部分，可能出现较多的配置情况）。</p><p>因此，基于cobra，我定义了这一套命令行处理范式，如下图所示： <img src="' + _imports_0 + '" alt="alt text"><code>Parse</code>主要负责<code>Cobra</code>中的PreRunE部分，负责解析用户输入的命令，并解析为相应的结构体，<code>Complete</code>主要负责根据用户的输入，补全其他不提供输入的默认值，<code>Validate</code>主要负责对资源进行校验，在资源创建请求不合规后，应当立即返回错误给前台，而无需将请求发送到k8s中。最后是<code>Run</code>部分，目前还没有完全把所有命令的主要功能都移到这部分，后续会进行重构修改，主要是负责每一个命令的运行操作，最后，请求都会发送给k8s的client-go中的api进行资源的管理。 创建集群的部分代码如下所示：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// NewCreateCmd create an ob cluster</span>\n<span class="token keyword">func</span> <span class="token function">NewCreateCmd</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>cobra<span class="token punctuation">.</span>Command <span class="token punctuation">{</span>\n	o <span class="token operator">:=</span> cluster<span class="token punctuation">.</span><span class="token function">NewCreateOptions</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n	logger <span class="token operator">:=</span> utils<span class="token punctuation">.</span><span class="token function">GetDefaultLoggerInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n	cmd <span class="token operator">:=</span> <span class="token operator">&amp;</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">{</span>\n		Use<span class="token punctuation">:</span>     <span class="token string">&quot;create &lt;cluster_name&gt;&quot;</span><span class="token punctuation">,</span>\n		Short<span class="token punctuation">:</span>   <span class="token string">&quot;Create an ob cluster&quot;</span><span class="token punctuation">,</span>\n		Args<span class="token punctuation">:</span>    cobra<span class="token punctuation">.</span><span class="token function">ExactArgs</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n		PreRunE<span class="token punctuation">:</span> o<span class="token punctuation">.</span>Parse<span class="token punctuation">,</span>\n		Run<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>cmd <span class="token operator">*</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">,</span> args <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n			<span class="token keyword">if</span> err <span class="token operator">:=</span> o<span class="token punctuation">.</span><span class="token function">Complete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>\n				logger<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>\n			<span class="token punctuation">}</span>\n			<span class="token keyword">if</span> err <span class="token operator">:=</span> o<span class="token punctuation">.</span><span class="token function">Validate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>\n				logger<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>\n			<span class="token punctuation">}</span>\n			obcluster<span class="token punctuation">,</span> err <span class="token operator">:=</span> cluster<span class="token punctuation">.</span><span class="token function">CreateOBCluster</span><span class="token punctuation">(</span>cmd<span class="token punctuation">.</span><span class="token function">Context</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> o<span class="token punctuation">)</span>\n			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>\n				logger<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>\n			<span class="token punctuation">}</span>\n			logger<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Create OBCluster instance: %s&quot;</span><span class="token punctuation">,</span> o<span class="token punctuation">.</span>ClusterName<span class="token punctuation">)</span>\n			logger<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Run `echo $(kubectl get secret %s -o jsonpath=&#39;{.data.password}&#39;|base64 --decode)` to get the secrets&quot;</span><span class="token punctuation">,</span> obcluster<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>UserSecrets<span class="token punctuation">.</span>Root<span class="token punctuation">)</span>\n		<span class="token punctuation">}</span><span class="token punctuation">,</span>\n	<span class="token punctuation">}</span>\n	o<span class="token punctuation">.</span><span class="token function">AddFlags</span><span class="token punctuation">(</span>cmd<span class="token punctuation">)</span>\n	<span class="token keyword">return</span> cmd\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="在开发中的挑战" tabindex="-1"><a class="header-anchor" href="#在开发中的挑战" aria-hidden="true">#</a> 在开发中的挑战</h2><p>在开发过程中我也遇到了一些小问题，但好在有老师的沟通和社区的帮助下，我都得以解决。总的来说问题都处于对于ob-operator运行机制和k8s运行机制的不熟悉，作为开发者，除了技术层面，还需要对于整个系统的运行机制和业务逻辑有一个清晰的认识，这样才能更好的进行开发。 举一个例子，比如创建租户时，除了要明确租户的概念，还需要明确大概有几种可能存在的场景，例如：</p><ol><li>创建主租户</li><li>创建空备租户(对应from flag)</li><li>创建主租户或备租户用于恢复(对应restore flag) 这几种实际上是不同的场景，因此需要提供不同的flag来鉴别租户的role，并加以一系列校验逻辑。</li></ol>', 23)),
    createBaseVNode("p", null, [
      _cache[1] || (_cache[1] = createTextVNode("由于我的机器配置较低，在配置环境和部署集群时，也遇到了一些小问题，比如在创建集群时把内存大小设置为10Gi，租户的unitconfig中的memory设置为5Gi，理论上这里是可以创建的，但实际上仍旧是无法创建，这是由于OB在没有创建任何租户的情况下也会占用不少的内存（系统租户等），因此，最终剩余的空间其实是不足5Gi需要在集群定义时加入")),
      _cache[2] || (_cache[2] = createBaseVNode(
        "code",
        null,
        "system_memory",
        -1
        /* HOISTED */
      )),
      _cache[3] || (_cache[3] = createTextVNode("和")),
      _cache[4] || (_cache[4] = createBaseVNode(
        "code",
        null,
        "__min_full_resource_pool_memory",
        -1
        /* HOISTED */
      )),
      _cache[5] || (_cache[5] = createTextVNode("这两个参数配置传递进去，在对于小型机器创建集群时是非常必要的，这个问题也是我在查找OB官方文档，尝试解决无果之后，和老师讨论得到的结果。")),
      _cache[6] || (_cache[6] = createBaseVNode(
        "em",
        null,
        "因此遇事不决先多看文档，然后学会提问是非常重要的 : )",
        -1
        /* HOISTED */
      )),
      _cache[7] || (_cache[7] = createTextVNode(" 对于k8s的运行机制可以查看这篇文章")),
      createBaseVNode("a", _hoisted_1, [
        _cache[0] || (_cache[0] = createBaseVNode(
          "code",
          null,
          "what-happens-when-k8s",
          -1
          /* HOISTED */
        )),
        createVNode(_component_ExternalLinkIcon)
      ]),
      _cache[8] || (_cache[8] = createTextVNode(" ps：此处感谢与义老师。"))
    ]),
    _cache[15] || (_cache[15] = createStaticVNode('<h2 id="为什么选择oceanbase" tabindex="-1"><a class="header-anchor" href="#为什么选择oceanbase" aria-hidden="true">#</a> 为什么选择OceanBase</h2><p>在开发的过程中，我遇到了一些OB中常见的概念，这过程中我去官网中查阅文档和博客，大致的了解了这款数据库，同时思考其中的设计理念，OceanBase是一个非常庞大的数据库，在这里我只谈一谈我对于一些概念的浅薄理解，写的不好的地方还请多多指正。</p><p>对一个分布式系统了解并不多的人而言，我们简单的去想如何实现分布式数据库，大概就是一个采用分片策略，将一个大表的数据分散存储到多个数据库服务器上的设计（这里的分片通常是水平分片），同时采用一致性哈希算法等来管理数据的分布和路由，等等。</p><p>然而，真正的分布式数据库系统远不止如此，它需要考虑数据复制、事务管理、故障恢复、数据一致性保证等多个方面。一个分布式数据库系统的目标之一是提供一个统一的接口给用户，使得用户可以像操作单一数据库一样操作分布在多个节点上的数据，并且必须保证<strong>高可用性</strong>，当部分节点失败时，应该能够保证系统的正常运行。</p><p>不同于其他分布式数据库的设计，OceanBase采用<strong>Share-Nothing</strong>的架构，没有任何共享存储结构。这意味着每个节点都是完全对等的，各自拥有 SQL 引擎和存储引擎，采用负载均衡策略将数据分片到多个observer上，每一个observer就是一个节点，节点间通过网络通信。</p><p>另外，OceanBase还采用<strong>多租户隔离</strong>的结构，租户是逻辑概念，也是OceanBase数据库中的核心，从用户的角度而言，相当于一个数据库实例，租户之间的资源是完全隔离的，这就做到了可以在同一套物理资源上部署和管理多个独立的数据库实例，同时这种设计也使得它天然支持<strong>云数据库架构</strong>。 总的来说，可以理解为每一个节点有一个observer进程，为租户完成资源分配，租户是逻辑概念，而集群是部署层面的物理概念，是zone和节点的租户，zone是逻辑概念，代表着一批相似硬件可用性的节点，针对不同使用场景有不同的意义。 不得不说实现一个分布式数据库要考虑的问题很多，但OB将设计抽象为租户、zone、observer等概念，使得用户可以更加方便的管理和使用数据库，无论是对于企业开发还是学生阶段的学习了解来说，都是非常有意义的。 此外，OB的社区也是非常活跃的，有很多的博客和文档，我在完成实验室的一些工作时也使用到了OB，在社区中提ISSUE和PR，回复都非常及时，大大的提升了我的参与感，因此我非常建议大家在学习和工作中尝试使用OB。</p><h2 id="为什么选择ob-operator" tabindex="-1"><a class="header-anchor" href="#为什么选择ob-operator" aria-hidden="true">#</a> 为什么选择ob-operator</h2><p>关于这部分我有很大感悟，这是因为，在完成实验室的科研任务时，我曾经部署过单节点和三节点的OB，虽说文档已经非常详细，但还是需要消耗一些时间，如果是更大规模的部署，可能对运维人员的要求会更高。因此更加觉得目前ob-operator的开发是非常有意义的。</p><p>ob-operator采用Kubernetes Operator框架搭建，部署集群实际上只需要在集群中部署ob-operator后，采用yaml文件，dashboard，cli（in the future）三种方式就可以即为简便的部署ob集群，并以最快速度投入生产中。 ob-operator的架构也非常清晰巧妙，和kubebuilder的架构类似，主要采用controller来对特定的资源进行响应，依据实现好的逻辑将资源的实际状态（Status）和期望状态（Spec）对齐；并采用Webhook实现了设定默认值和进行资源规约校验两部分功能。</p><p>由于OB相关的工作流涉及到一系列长调度操作，因此k8s的 Operator 模式（单一解调worker机制）往往是不适合的，因此ob-operator非常巧妙的采用了任务流和全局任务管理器，任务流包含了当前执行的任务索引和任务状态，可以通过查看<code>obcluster_flow.go</code>等文件了解到每一个资源的所创建的任务流对应的任务列表，通过<code>obcluster_task.go</code>了解每个任务具体的操作流程，其他资源同理。同时，全局任务管理器中也包含了工作集映射和结果缓存映射，可以查看<code>task_manager.go</code>来了解。</p><p>总的来说，通过k8s提供的极强的抽象能力，使得资源的管理对用户的透明度更高，也更为简便，因此非常希望大家如果有兴趣可以尝试使用一下ob-operator，也可以参与到ob-operator的开发中来！！</p><h2 id="收获与感悟" tabindex="-1"><a class="header-anchor" href="#收获与感悟" aria-hidden="true">#</a> 收获与感悟</h2><p>在本次开发中，最大的提升就是对于k8s的理解，如k8s的资源管理和控制器的设计有了更深入的了解，同时，自己对于资源的检查等命令也变得更加熟练，在遇到问题时往往很快能通过查看资源对应的状态和pod对应的日志来很快的解决问题。另外，在项目的开发中，我也学到了很多工程上的知识，比如对于git尤其是git rebase等命令使用更加规范，以及CI/CD自动化部署，版本号注入等流程等。</p><p>在每一次提交PR后，老师们都会对代码的可读性和架构的规范性提出建议，这也使得我在代码的规范上有了更高要求。在日常的科研过程里，我也用到了ob，这段经历加深了我对ob的理解，也使得我在ob-operator的开发中更加有动力。</p>', 14)),
    createBaseVNode("p", null, [
      _cache[10] || (_cache[10] = createTextVNode("另外，在全文的最后，一定要感谢我的导师与义**，由于我在实验室的工作，很多时候都要利用周末的时间，和工作日晚上的时间进行开发，很多次都是一直做到深夜，但与义几乎都会很快给予我回复，并且在我遇到问题时给予我很多的帮助，除此以外，还对整个计算机技术的学习，职业发展等都给予了很多指导，这是我回想起来都非常难得的一段经历（")),
      _cache[11] || (_cache[11] = createBaseVNode(
        "em",
        null,
        "下图为一次讨论后的赛博合影一张）",
        -1
        /* HOISTED */
      )),
      _cache[12] || (_cache[12] = createBaseVNode(
        "img",
        {
          src: _imports_1,
          alt: "alt text"
        },
        null,
        -1
        /* HOISTED */
      )),
      _cache[13] || (_cache[13] = createTextVNode(" 最后，希望大家也积极的参与到开源中来！多多关注")),
      createBaseVNode("a", _hoisted_2, [
        _cache[9] || (_cache[9] = createTextVNode("OB社区")),
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
const kaiyuanzhixia_Jiluyicishouhuopofengdekaiyuanshijian_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "kaiyuanzhixia--jiluyicishouhuopofengdekaiyuanshijian.html.vue"]]);
export {
  kaiyuanzhixia_Jiluyicishouhuopofengdekaiyuanshijian_html as default
};
