<div class="site-brand-wrapper">
  <div class="site-meta {% if theme.custom_logo.enabled %}custom-logo{% endif %}">
    {% if theme.custom_logo.image and theme.scheme === 'Muse' %}
      <div class="site-meta-headline">
        <a>
          <img class="custom-logo-image" src="{{ theme.custom_logo.image }}"
               alt="{{ config.title }}"/>
        </a>
      </div>
    {% endif %}

    <div class="custom-logo-site-title">
      <a href="{{ config.root }}"  class="brand" rel="start">
        <span class="logo-line-before"><i></i></span>
        <span class="site-title">{{ config.title }}</span>
        <span class="logo-line-after"><i></i></span>
      </a>
    </div>
      {% if theme.seo %}
        <h1 class="site-subtitle" itemprop="description">{{ config.subtitle }}</h1>
      {% else %}
        <p class="site-subtitle">{{ config.subtitle }}</p>
      {% endif %}
  </div>

  <div class="site-nav-toggle">
    <button>
      <span class="btn-bar"></span>
      <span class="btn-bar"></span>
      <span class="btn-bar"></span>
    </button>
  </div>
</div>

<nav class="site-nav">
  {% set hasSearch = theme.swiftype_key || theme.algolia_search.enable || theme.tinysou_Key || theme.local_search.enable %}

  {% if theme.menu %}
    <ul id="menu" class="menu">
      {% for name, path in theme.menu %}
        {% set itemName = name.toLowerCase() %}
        <li class="menu-item menu-item-{{ itemName | replace(' ', '-') }}">
          <a href="{{ url_for(path.split('||')[0]) | trim }}" rel="section">
            {% if theme.menu_icons.enable %}
              <i class="menu-item-icon fa fa-fw fa-{{ path.split('||')[1] | trim | default('question-circle') }}"></i> <br />
            {% endif %}
            {{ __('menu.' + name) | replace('menu.', '') }}
          </a>
        </li>
      {% endfor %}

      {% if hasSearch %}
        <li class="menu-item menu-item-search">
          {% if theme.swiftype_key %}
            <a href="javascript:;" class="st-search-show-outputs">
          {% elseif theme.local_search.enable || theme.algolia_search.enable %}
            <a href="javascript:;" class="popup-trigger">
          {% endif %}
            {% if theme.menu_icons.enable %}
              <i class="menu-item-icon fa fa-search fa-fw"></i> <br />
            {% endif %}
            {{ __('menu.search') }}
          </a>
        </li>
      {% endif %}
      {% if theme.Hmusic %}
<!-- 自定义High一下的功能 -->
    <li class="menu-item">
        <a id="high_music" title="把这个链接拖到你的工具栏中,任何网页都可以High" href='javascript:;'>
            <i class="menu-item-icon fa fa-music fa-fw"></i>High一下
        </a> 
        <script>
       function Music(){
        this.songs= [
        "http://bdyun.65dj.com:8090/2015/06/28/84791C997D8C55023DAD0D5690E48C28/%D1%A6%D6%AE%C7%AB%20-%20%D1%DD%D4%B1.mp3",
        "http://7xoiki.com1.z0.glb.clouddn.com/Music-sunburst.mp3",
        "http://www.aqgy.org/down/513.mp3"
    ];
    this.index=-1
    this.ele=null;
    }
    Music.prototype.create=function(){
       this.ele=document.createElement("video");
       this.ele.type="audio/mpeg"
       return this
    }
    Music.prototype.play=function(){
        this.high_music=document.querySelector("#high_music")
        this.high_music.addEventListener("click",()=>{
            this.index=this.index<this.songs.length-1?++this.index:0
            this.ele.src=this.songs[this.index]
            this.ele.play().then(()=>{
                console.log("播放成功")
            },()=>{
                console.log("播放失敗")
            })
        })
        this.high_music.addEventListener("dblclick",()=>{
            this.ele.pause()
        })
    }
    let music=new Music()
    music.create().play()
        </script>
        {% endif %}
    </ul>
  {% endif %}

  {% if hasSearch %}
    <div class="site-search">
      {% include 'search.swig' %}
    </div>
  {% endif %}
</nav>


{% include '../_custom/header.swig' %}
