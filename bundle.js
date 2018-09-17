/* global NexT: true */

NexT.utils = NexT.$u = {
  /**
   * Wrap images with fancybox support.
   */
  wrapImageWithFancyBox: function () {
    $('.content img')
      .not('[hidden]')
      .not('.group-picture img, .post-gallery img')
      .each(function () {
        var $image = $(this);
        var imageTitle = $image.attr('title');
        var $imageWrapLink = $image.parent('a');

        if ($imageWrapLink.size() < 1) {
	        var imageLink = ($image.attr('data-original')) ? this.getAttribute('data-original') : this.getAttribute('src');
          $imageWrapLink = $image.wrap('<a href="' + imageLink + '"></a>').parent('a');
        }

        $imageWrapLink.addClass('fancybox fancybox.image');
        $imageWrapLink.attr('rel', 'group');

        if (imageTitle) {
          $imageWrapLink.append('<p class="image-caption">' + imageTitle + '</p>');

          //make sure img title tag will show correctly in fancybox
          $imageWrapLink.attr('title', imageTitle);
        }
      });

    $('.fancybox').fancybox({
      helpers: {
        overlay: {
          locked: false
        }
      }
    });
  },

  lazyLoadPostsImages: function () {
    $('#posts').find('img').lazyload({
      //placeholder: '/images/loading.gif',
      effect: 'fadeIn',
      threshold : 0
    });
  },

  /**
   * Tabs tag listener (without twitter bootstrap).
   */
  registerTabsTag: function () {
    var tNav = '.tabs ul.nav-tabs ';

    // Binding `nav-tabs` & `tab-content` by real time permalink changing.
    $(function() {
      $(window).bind('hashchange', function() {
        var tHash = location.hash;
        if (tHash !== '') {
          $(tNav + 'li:has(a[href="' + tHash + '"])').addClass('active').siblings().removeClass('active');
          $(tHash).addClass('active').siblings().removeClass('active');
        }
      }).trigger('hashchange');
    });

    $(tNav + '.tab').on('click', function (href) {
      href.preventDefault();
      // Prevent selected tab to select again.
      if(!$(this).hasClass('active')){

        // Add & Remove active class on `nav-tabs` & `tab-content`.
        $(this).addClass('active').siblings().removeClass('active');
        var tActive = $(this).find('a').attr('href');
        $(tActive).addClass('active').siblings().removeClass('active');

        // Clear location hash in browser if #permalink exists.
        if (location.hash !== '') {
          history.pushState('', document.title, window.location.pathname + window.location.search);
        }
      }
    });

  },

  registerESCKeyEvent: function () {
    $(document).on('keyup', function (event) {
      var shouldDismissSearchPopup = event.which === 27 &&
        $('.search-popup').is(':visible');
      if (shouldDismissSearchPopup) {
        $('.search-popup').hide();
        $('.search-popup-overlay').remove();
        $('body').css('overflow', '');
      }
    });
  },

  registerBackToTop: function () {
    var THRESHOLD = 50;
    var $top = $('.back-to-top');

    $(window).on('scroll', function () {
      $top.toggleClass('back-to-top-on', window.pageYOffset > THRESHOLD);

      var scrollTop = $(window).scrollTop();
      var contentVisibilityHeight = NexT.utils.getContentVisibilityHeight();
      var scrollPercent = (scrollTop) / (contentVisibilityHeight);
      var scrollPercentRounded = Math.round(scrollPercent*100);
      var scrollPercentMaxed = (scrollPercentRounded > 100) ? 100 : scrollPercentRounded;
      $('#scrollpercent>span').html(scrollPercentMaxed);
    });

    $top.on('click', function () {
      $('body').velocity('scroll');
    });
  },

  /**
   * Transform embedded video to support responsive layout.
   * @see http://toddmotto.com/fluid-and-responsive-youtube-and-vimeo-videos-with-fluidvids-js/
   */
  embeddedVideoTransformer: function () {
    var $iframes = $('iframe');

    // Supported Players. Extend this if you need more players.
    var SUPPORTED_PLAYERS = [
      'www.youtube.com',
      'player.vimeo.com',
      'player.youku.com',
      'music.163.com',
      'www.tudou.com'
    ];
    var pattern = new RegExp( SUPPORTED_PLAYERS.join('|') );

    $iframes.each(function () {
      var iframe = this;
      var $iframe = $(this);
      var oldDimension = getDimension($iframe);
      var newDimension;

      if (this.src.search(pattern) > 0) {

        // Calculate the video ratio based on the iframe's w/h dimensions
        var videoRatio = getAspectRadio(oldDimension.width, oldDimension.height);

        // Replace the iframe's dimensions and position the iframe absolute
        // This is the trick to emulate the video ratio
        $iframe.width('100%').height('100%')
          .css({
            position: 'absolute',
            top: '0',
            left: '0'
          });


        // Wrap the iframe in a new <div> which uses a dynamically fetched padding-top property
        // based on the video's w/h dimensions
        var wrap = document.createElement('div');
        wrap.className = 'fluid-vids';
        wrap.style.position = 'relative';
        wrap.style.marginBottom = '20px';
        wrap.style.width = '100%';
        wrap.style.paddingTop = videoRatio + '%';
        // Fix for appear inside tabs tag.
        (wrap.style.paddingTop === '') && (wrap.style.paddingTop = '50%');

        // Add the iframe inside our newly created <div>
        var iframeParent = iframe.parentNode;
        iframeParent.insertBefore(wrap, iframe);
        wrap.appendChild(iframe);

        // Additional adjustments for 163 Music
        if (this.src.search('music.163.com') > 0) {
          newDimension = getDimension($iframe);
          var shouldRecalculateAspect = newDimension.width > oldDimension.width ||
                                        newDimension.height < oldDimension.height;

          // 163 Music Player has a fixed height, so we need to reset the aspect radio
          if (shouldRecalculateAspect) {
            wrap.style.paddingTop = getAspectRadio(newDimension.width, oldDimension.height) + '%';
          }
        }
      }
    });

    function getDimension($element) {
      return {
        width: $element.width(),
        height: $element.height()
      };
    }

    function getAspectRadio(width, height) {
      return height / width * 100;
    }
  },

  /**
   * Add `menu-item-active` class name to menu item
   * via comparing location.path with menu item's href.
   */
  addActiveClassToMenuItem: function () {
    var path = window.location.pathname;
    path = path === '/' ? path : path.substring(0, path.length - 1);
    $('.menu-item a[href^="' + path + '"]:first').parent().addClass('menu-item-active');
  },

  hasMobileUA: function () {
    var nav = window.navigator;
    var ua = nav.userAgent;
    var pa = /iPad|iPhone|Android|Opera Mini|BlackBerry|webOS|UCWEB|Blazer|PSP|IEMobile|Symbian/g;

    return pa.test(ua);
  },

  isTablet: function () {
    return window.screen.width < 992 && window.screen.width > 767 && this.hasMobileUA();
  },

  isMobile: function () {
    return window.screen.width < 767 && this.hasMobileUA();
  },

  isDesktop: function () {
    return !this.isTablet() && !this.isMobile();
  },

  /**
   * Escape meta symbols in jQuery selectors.
   *
   * @param selector
   * @returns {string|void|XML|*}
   */
  escapeSelector: function (selector) {
    return selector.replace(/[!"$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, '\\$&');
  },

  displaySidebar: function () {
    if (!this.isDesktop() || this.isPisces() || this.isGemini()) {
      return;
    }
    $('.sidebar-toggle').trigger('click');
  },

  isMist: function () {
    return CONFIG.scheme === 'Mist';
  },

  isPisces: function () {
    return CONFIG.scheme === 'Pisces';
  },

  isGemini: function () {
    return CONFIG.scheme === 'Gemini';
  },

  getScrollbarWidth: function () {
    var $div = $('<div />').addClass('scrollbar-measure').prependTo('body');
    var div = $div[0];
    var scrollbarWidth = div.offsetWidth - div.clientWidth;

    $div.remove();

    return scrollbarWidth;
  },

  getContentVisibilityHeight: function () {
    var docHeight = $('#content').height(),
        winHeight = $(window).height(),
        contentVisibilityHeight = (docHeight > winHeight) ? (docHeight - winHeight) : ($(document).height() - winHeight);
    return contentVisibilityHeight;
  },

  getSidebarb2tHeight: function () {
    //var sidebarb2tHeight = (CONFIG.sidebar.b2t) ? document.getElementsByClassName('back-to-top')[0].clientHeight : 0;
    var sidebarb2tHeight = (CONFIG.sidebar.b2t) ? $('.back-to-top').height() : 0;
    //var sidebarb2tHeight = (CONFIG.sidebar.b2t) ? 24 : 0;
    return sidebarb2tHeight;
  },

  getSidebarSchemePadding: function () {
    var sidebarNavHeight = ($('.sidebar-nav').css('display') == 'block') ? $('.sidebar-nav').outerHeight(true) : 0,
        sidebarInner = $('.sidebar-inner'),
        sidebarPadding = sidebarInner.innerWidth() - sidebarInner.width(),
        sidebarSchemePadding = this.isPisces() || this.isGemini() ?
          ((sidebarPadding * 2) + sidebarNavHeight + (CONFIG.sidebar.offset * 2) + this.getSidebarb2tHeight()) :
          ((sidebarPadding * 2) + (sidebarNavHeight / 2));
    return sidebarSchemePadding;
  }

  /**
   * Affix behaviour for Sidebar.
   *
   * @returns {Boolean}
   */
//  needAffix: function () {
//    return this.isPisces() || this.isGemini();
//  }
};

$(document).ready(function () {

  initSidebarDimension();

  /**
   * Init Sidebar & TOC inner dimensions on all pages and for all schemes.
   * Need for Sidebar/TOC inner scrolling if content taller then viewport.
   */
  function initSidebarDimension () {
    var updateSidebarHeightTimer;

    $(window).on('resize', function () {
      updateSidebarHeightTimer && clearTimeout(updateSidebarHeightTimer);

      updateSidebarHeightTimer = setTimeout(function () {
        var sidebarWrapperHeight = document.body.clientHeight - NexT.utils.getSidebarSchemePadding();

        updateSidebarHeight(sidebarWrapperHeight);
      }, 0);
    });

    // Initialize Sidebar & TOC Width.
    var scrollbarWidth = NexT.utils.getScrollbarWidth();
      if ($('.site-overview-wrap').height() > (document.body.clientHeight - NexT.utils.getSidebarSchemePadding())) {
        $('.site-overview').css('width', 'calc(100% + ' + scrollbarWidth + 'px)');
      }
      if ($('.post-toc-wrap').height() > (document.body.clientHeight - NexT.utils.getSidebarSchemePadding())) {
        $('.post-toc').css('width', 'calc(100% + ' + scrollbarWidth + 'px)');
      }

    // Initialize Sidebar & TOC Height.
    updateSidebarHeight(document.body.clientHeight - NexT.utils.getSidebarSchemePadding());
  }

  function updateSidebarHeight (height) {
    height = height || 'auto';
    $('.site-overview, .post-toc').css('max-height', height);
  }

});
;
/* global NexT: true */

$(document).ready(function () {
  NexT.motion = {};

  var sidebarToggleLines = {
    lines: [],
    push: function (line) {
      this.lines.push(line);
    },
    init: function () {
      this.lines.forEach(function (line) {
        line.init();
      });
    },
    arrow: function () {
      this.lines.forEach(function (line) {
        line.arrow();
      });
    },
    close: function () {
      this.lines.forEach(function (line) {
        line.close();
      });
    }
  };

  function SidebarToggleLine(settings) {
    this.el = $(settings.el);
    this.status = $.extend({}, {
      init: {
        width: '100%',
        opacity: 1,
        left: 0,
        rotateZ: 0,
        top: 0
      }
    }, settings.status);
  }

  SidebarToggleLine.prototype.init = function () {
    this.transform('init');
  };
  SidebarToggleLine.prototype.arrow = function () {
    this.transform('arrow');
  };
  SidebarToggleLine.prototype.close = function () {
    this.transform('close');
  };
  SidebarToggleLine.prototype.transform = function (status) {
    this.el.velocity('stop').velocity(this.status[status]);
  };

  var sidebarToggleLine1st = new SidebarToggleLine({
    el: '.sidebar-toggle-line-first',
    status: {
      arrow: {width: '50%', rotateZ: '-45deg', top: '2px'},
      close: {width: '100%', rotateZ: '-45deg', top: '5px'}
    }
  });
  var sidebarToggleLine2nd = new SidebarToggleLine({
    el: '.sidebar-toggle-line-middle',
    status: {
      arrow: {width: '90%'},
      close: {opacity: 0}
    }
  });
  var sidebarToggleLine3rd = new SidebarToggleLine({
    el: '.sidebar-toggle-line-last',
    status: {
      arrow: {width: '50%', rotateZ: '45deg', top: '-2px'},
      close: {width: '100%', rotateZ: '45deg', top: '-5px'}
    }
  });

  sidebarToggleLines.push(sidebarToggleLine1st);
  sidebarToggleLines.push(sidebarToggleLine2nd);
  sidebarToggleLines.push(sidebarToggleLine3rd);

  var SIDEBAR_WIDTH = '320px';
  var SIDEBAR_DISPLAY_DURATION = 200;
  var xPos, yPos;

  var sidebarToggleMotion = {
    toggleEl: $('.sidebar-toggle'),
    dimmerEl: $('#sidebar-dimmer'),
    sidebarEl: $('.sidebar'),
    isSidebarVisible: false,
    init: function () {
      this.toggleEl.on('click', this.clickHandler.bind(this));
      this.dimmerEl.on('click', this.clickHandler.bind(this));
      this.toggleEl.on('mouseenter', this.mouseEnterHandler.bind(this));
      this.toggleEl.on('mouseleave', this.mouseLeaveHandler.bind(this));
      this.sidebarEl.on('touchstart', this.touchstartHandler.bind(this));
      this.sidebarEl.on('touchend', this.touchendHandler.bind(this));
      this.sidebarEl.on('touchmove', function(e){e.preventDefault();});

      $(document)
        .on('sidebar.isShowing', function () {
          NexT.utils.isDesktop() && $('body').velocity('stop').velocity(
            {paddingRight: SIDEBAR_WIDTH},
            SIDEBAR_DISPLAY_DURATION
          );
        })
        .on('sidebar.isHiding', function () {
        });
    },
    clickHandler: function () {
      this.isSidebarVisible ? this.hideSidebar() : this.showSidebar();
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    mouseEnterHandler: function () {
      if (this.isSidebarVisible) {
        return;
      }
      sidebarToggleLines.arrow();
    },
    mouseLeaveHandler: function () {
      if (this.isSidebarVisible) {
        return;
      }
      sidebarToggleLines.init();
    },
    touchstartHandler: function(e) {
      xPos = e.originalEvent.touches[0].clientX;
      yPos = e.originalEvent.touches[0].clientY;
    },
    touchendHandler: function(e) {
      var _xPos = e.originalEvent.changedTouches[0].clientX;
      var _yPos = e.originalEvent.changedTouches[0].clientY;
      if (_xPos-xPos > 30 && Math.abs(_yPos-yPos) < 20) {
          this.clickHandler();
      }
    },
    showSidebar: function () {
      var self = this;

      sidebarToggleLines.close();

      this.sidebarEl.velocity('stop').velocity({
          width: SIDEBAR_WIDTH
        }, {
          display: 'block',
          duration: SIDEBAR_DISPLAY_DURATION,
          begin: function () {
            $('.sidebar .motion-element').velocity(
              'transition.slideRightIn',
              {
                stagger: 50,
                drag: true,
                complete: function () {
                  self.sidebarEl.trigger('sidebar.motion.complete');
                }
              }
            );
          },
          complete: function () {
            self.sidebarEl.addClass('sidebar-active');
            self.sidebarEl.trigger('sidebar.didShow');
          }
        }
      );

      this.sidebarEl.trigger('sidebar.isShowing');
    },
    hideSidebar: function () {
      NexT.utils.isDesktop() && $('body').velocity('stop').velocity({paddingRight: 0});
      this.sidebarEl.find('.motion-element').velocity('stop').css('display', 'none');
      this.sidebarEl.velocity('stop').velocity({width: 0}, {display: 'none'});

      sidebarToggleLines.init();

      this.sidebarEl.removeClass('sidebar-active');
      this.sidebarEl.trigger('sidebar.isHiding');

      // Prevent adding TOC to Overview if Overview was selected when close & open sidebar.
      if (!!$('.post-toc-wrap')) {
        if ($('.site-overview-wrap').css('display') === 'block') {
          $('.post-toc-wrap').removeClass('motion-element');
        } else {
          $('.post-toc-wrap').addClass('motion-element');
        }
      }
    }
  };
  sidebarToggleMotion.init();

  NexT.motion.integrator = {
    queue: [],
    cursor: -1,
    add: function (fn) {
      this.queue.push(fn);
      return this;
    },
    next: function () {
      this.cursor++;
      var fn = this.queue[this.cursor];
      $.isFunction(fn) && fn(NexT.motion.integrator);
    },
    bootstrap: function () {
      this.next();
    }
  };

  NexT.motion.middleWares =  {
    logo: function (integrator) {
      var sequence = [];
      var $brand = $('.brand');
      var $title = $('.site-title');
      var $subtitle = $('.site-subtitle');
      var $logoLineTop = $('.logo-line-before i');
      var $logoLineBottom = $('.logo-line-after i');

      $brand.size() > 0 && sequence.push({
        e: $brand,
        p: {opacity: 1},
        o: {duration: 200}
      });

      NexT.utils.isMist() && hasElement([$logoLineTop, $logoLineBottom]) &&
      sequence.push(
        getMistLineSettings($logoLineTop, '100%'),
        getMistLineSettings($logoLineBottom, '-100%')
      );

      hasElement($title) && sequence.push({
        e: $title,
        p: {opacity: 1, top: 0},
        o: { duration: 200 }
      });

      hasElement($subtitle) && sequence.push({
        e: $subtitle,
        p: {opacity: 1, top: 0},
        o: {duration: 200}
      });

      if (CONFIG.motion.async) {
        integrator.next();
      }

      if (sequence.length > 0) {
        sequence[sequence.length - 1].o.complete = function () {
          integrator.next();
        };
        $.Velocity.RunSequence(sequence);
      } else {
        integrator.next();
      }


      function getMistLineSettings (element, translateX) {
        return {
          e: $(element),
          p: {translateX: translateX},
          o: {
            duration: 500,
            sequenceQueue: false
          }
        };
      }

      /**
       * Check if $elements exist.
       * @param {jQuery|Array} $elements
       * @returns {boolean}
       */
      function hasElement ($elements) {
        $elements = Array.isArray($elements) ? $elements : [$elements];
        return $elements.every(function ($element) {
          return $.isFunction($element.size) && $element.size() > 0;
        });
      }
    },

    menu: function (integrator) {

      if (CONFIG.motion.async) {
        integrator.next();
      }

      $('.menu-item').velocity('transition.slideDownIn', {
        display: null,
        duration: 200,
        complete: function () {
          integrator.next();
        }
      });
    },

    postList: function (integrator) {
      //var $post = $('.post');
      var $postBlock = $('.post-block, .pagination, .comments');
      var $postBlockTransition = CONFIG.motion.transition.post_block;
      var $postHeader = $('.post-header');
      var $postHeaderTransition = CONFIG.motion.transition.post_header;
      var $postBody = $('.post-body');
      var $postBodyTransition = CONFIG.motion.transition.post_body;
      var $collHeader = $('.collection-title, .archive-year');
      var $collHeaderTransition = CONFIG.motion.transition.coll_header;
      var $sidebarAffix = $('.sidebar-inner');
      var $sidebarAffixTransition = CONFIG.motion.transition.sidebar;
      var hasPost = $postBlock.size() > 0;

      hasPost ? postMotion() : integrator.next();

      if (CONFIG.motion.async) {
        integrator.next();
      }

      function postMotion () {
        var postMotionOptions = window.postMotionOptions || {
            stagger: 100,
            drag: true
          };
        postMotionOptions.complete = function () {
          // After motion complete need to remove transform from sidebar to let affix work on Pisces | Gemini.
          if (CONFIG.motion.transition.sidebar && (NexT.utils.isPisces() || NexT.utils.isGemini())) {
            $sidebarAffix.css({ 'transform': 'initial' });
          }
          integrator.next();
        };

        //$post.velocity('transition.slideDownIn', postMotionOptions);
        if (CONFIG.motion.transition.post_block) {
          $postBlock.velocity('transition.' + $postBlockTransition, postMotionOptions);
        }
        if (CONFIG.motion.transition.post_header) {
          $postHeader.velocity('transition.' + $postHeaderTransition, postMotionOptions);
        }
        if (CONFIG.motion.transition.post_body) {
          $postBody.velocity('transition.' + $postBodyTransition, postMotionOptions);
        }
        if (CONFIG.motion.transition.coll_header) {
          $collHeader.velocity('transition.' + $collHeaderTransition, postMotionOptions);
        }
        // Only for Pisces | Gemini.
        if (CONFIG.motion.transition.sidebar && (NexT.utils.isPisces() || NexT.utils.isGemini())) {
          $sidebarAffix.velocity('transition.' + $sidebarAffixTransition, postMotionOptions);
        }
      }
    },

    sidebar: function (integrator) {
      if (CONFIG.sidebar.display === 'always') {
        NexT.utils.displaySidebar();
      }
      integrator.next();
    }
  };

});
;
/* ========================================================================
 * Bootstrap: affix.js v3.3.5
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.5'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
;
$(document).ready(function () {

  var sidebarInner = $('.sidebar-inner');

  initAffix();
  resizeListener();

  function initAffix () {
    var headerOffset = getHeaderOffset(),
        footerOffset = getFooterOffset(),
        sidebarHeight = $('#sidebar').height() + NexT.utils.getSidebarb2tHeight(),
        contentHeight = $('#content').height();

    // Not affix if sidebar taller then content (to prevent bottom jumping).
    if (headerOffset + sidebarHeight < contentHeight) {
      sidebarInner.affix({
        offset: {
          top: headerOffset - CONFIG.sidebar.offset,
          bottom: footerOffset
        }
      });
    }

    setSidebarMarginTop(headerOffset).css({ 'margin-left': 'initial' });
  }

  function resizeListener () {
    var mql = window.matchMedia('(min-width: 991px)');
    mql.addListener(function(e){
      if(e.matches){
        recalculateAffixPosition();
      }
    });
  }

  function getHeaderOffset () {
    return $('.header-inner').height() + CONFIG.sidebar.offset;
  }

  function getFooterOffset () {
    var footerInner = $('.footer-inner'),
        footerMargin = footerInner.outerHeight(true) - footerInner.outerHeight(),
        footerOffset = footerInner.outerHeight(true) + footerMargin;
    return footerOffset;
  }

  function setSidebarMarginTop (headerOffset) {
    return $('#sidebar').css({ 'margin-top': headerOffset });
  }

  function recalculateAffixPosition () {
    $(window).off('.affix');
    sidebarInner.removeData('bs.affix').removeClass('affix affix-top affix-bottom');
    initAffix();
  }

});
;
/* ========================================================================
* Bootstrap: scrollspy.js v3.3.2
* http://getbootstrap.com/javascript/#scrollspy
* ========================================================================
* Copyright 2011-2015 Twitter, Inc.
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
* ======================================================================== */

/**
 * Custom by iissnan
 *
 * - Add a `clear.bs.scrollspy` event.
 * - Esacpe targets selector.
 */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.2'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(NexT.utils.escapeSelector(href)) // Need to escape selector.

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })


  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      $(this.selector).trigger('clear.bs.scrollspy')  // Add a custom event.
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);
;
/* global NexT: true */

$(document).ready(function () {

  initScrollSpy();

  function initScrollSpy () {
    var tocSelector = '.post-toc';
    var $tocElement = $(tocSelector);
    var activeCurrentSelector = '.active-current';

    $tocElement
      .on('activate.bs.scrollspy', function () {
        var $currentActiveElement = $(tocSelector + ' .active').last();

        removeCurrentActiveClass();
        $currentActiveElement.addClass('active-current');

        // Scrolling to center active TOC element if TOC content is taller then viewport.
        $tocElement.scrollTop($currentActiveElement.offset().top - $tocElement.offset().top + $tocElement.scrollTop() - ($tocElement.height() / 2));
      })
      .on('clear.bs.scrollspy', removeCurrentActiveClass);

    $('body').scrollspy({ target: tocSelector });

    function removeCurrentActiveClass () {
      $(tocSelector + ' ' + activeCurrentSelector)
        .removeClass(activeCurrentSelector.substring(1));
    }
  }

});

$(document).ready(function () {
  var html = $('html');
  var TAB_ANIMATE_DURATION = 200;
  var hasVelocity = $.isFunction(html.velocity);

  $('.sidebar-nav li').on('click', function () {
    var item = $(this);
    var activeTabClassName = 'sidebar-nav-active';
    var activePanelClassName = 'sidebar-panel-active';
    if (item.hasClass(activeTabClassName)) {
      return;
    }

    var currentTarget = $('.' + activePanelClassName);
    var target = $('.' + item.data('target'));

    hasVelocity ?
      currentTarget.velocity('transition.slideUpOut', TAB_ANIMATE_DURATION, function () {
        target
          .velocity('stop')
          .velocity('transition.slideDownIn', TAB_ANIMATE_DURATION)
          .addClass(activePanelClassName);
      }) :
      currentTarget.animate({ opacity: 0 }, TAB_ANIMATE_DURATION, function () {
        currentTarget.hide();
        target
          .stop()
          .css({'opacity': 0, 'display': 'block'})
          .animate({ opacity: 1 }, TAB_ANIMATE_DURATION, function () {
            currentTarget.removeClass(activePanelClassName);
            target.addClass(activePanelClassName);
          });
      });

    item.siblings().removeClass(activeTabClassName);
    item.addClass(activeTabClassName);
  });

  // TOC item animation navigate & prevent #item selector in adress bar.
  $('.post-toc a').on('click', function (e) {
    e.preventDefault();
    var targetSelector = NexT.utils.escapeSelector(this.getAttribute('href'));
    var offset = $(targetSelector).offset().top;

    hasVelocity ?
      html.velocity('stop').velocity('scroll', {
        offset: offset  + 'px',
        mobileHA: false
      }) :
      $('html, body').stop().animate({
        scrollTop: offset
      }, 500);
  });

  // Expand sidebar on post detail page by default, when post has a toc.
  var $tocContent = $('.post-toc-content');
  var isSidebarCouldDisplay = CONFIG.sidebar.display === 'post' ||
      CONFIG.sidebar.display === 'always';
  var hasTOC = $tocContent.length > 0 && $tocContent.html().trim().length > 0;
  if (isSidebarCouldDisplay && hasTOC) {
    CONFIG.motion.enable ?
      (NexT.motion.middleWares.sidebar = function () {
          NexT.utils.displaySidebar();
      }) : NexT.utils.displaySidebar();
  }
});
;
/* global NexT: true */

$(document).ready(function () {

  $(document).trigger('bootstrap:before');

  NexT.utils.isMobile() && window.FastClick.attach(document.body);

  NexT.utils.lazyLoadPostsImages();

  NexT.utils.registerESCKeyEvent();

  NexT.utils.registerBackToTop();

  // Mobile top menu bar.
  $('.site-nav-toggle button').on('click', function () {
    var $siteNav = $('.site-nav');
    var ON_CLASS_NAME = 'site-nav-on';
    var isSiteNavOn = $siteNav.hasClass(ON_CLASS_NAME);
    var animateAction = isSiteNavOn ? 'slideUp' : 'slideDown';
    var animateCallback = isSiteNavOn ? 'removeClass' : 'addClass';

    $siteNav.stop()[animateAction]('fast', function () {
      $siteNav[animateCallback](ON_CLASS_NAME);
    });
  });

  /**
   * Register JS handlers by condition option.
   * Need to add config option in Front-End at 'layout/_partials/head.swig' file.
   */
  CONFIG.fancybox && NexT.utils.wrapImageWithFancyBox();
  CONFIG.tabs && NexT.utils.registerTabsTag();

  NexT.utils.embeddedVideoTransformer();
  NexT.utils.addActiveClassToMenuItem();


  // Define Motion Sequence.
  NexT.motion.integrator
    .add(NexT.motion.middleWares.logo)
    .add(NexT.motion.middleWares.menu)
    .add(NexT.motion.middleWares.postList)
    .add(NexT.motion.middleWares.sidebar);

  $(document).trigger('motion:before');

  // Bootstrap Motion.
  CONFIG.motion.enable && NexT.motion.integrator.bootstrap();

  $(document).trigger('bootstrap:after');
});
;
/***********************************************
  needShareButton
  - Version 1.0.0
  - Copyright 2015 Dzmitry Vasileuski
	- Licensed under MIT (http://opensource.org/licenses/MIT)
***********************************************/

(function () {

  // find closest
  function closest(elem, parent) {
    if (typeof (parent) == "string") {
      var matchesSelector = elem.matches || elem.webkitMatchesSelector ||
                            elem.mozMatchesSelector || elem.msMatchesSelector;

      if (!!matchesSelector) {
        while (elem) {
          if (matchesSelector.bind(elem)(parent)) {
            return elem;
          } else {
            elem = elem.parentElement;
          }
        }
      }
      return false;
    } else {
      while (elem) {
        if (elem == parent) {
          return elem;
        } else {
          elem = elem.parentElement;
        }
      }
      return false;
    }
  }

  // share button class
  window.needShareButton = function (elem, options) {
    // create element reference
    var root = this;
    root.elem = elem || "need-share-button";

    /* Helpers
     ***********************************************/

    // get title from html
    root.getTitle = function () {
      var content;
      // check querySelector existance for old browsers
      if (document.querySelector) {
        content = document.querySelector("title");
        if (content) {
          return content.innerText;
        }
      }
      return document.title;
    };

    // get image from html
    root.getImage = function () {
      var content;
      // check querySelector existance for old browsers
      if (document.querySelector) {
        content = document.querySelector("meta[property=\"og:image\"]") ||
                  document.querySelector("meta[name=\"twitter:image\"]");
        if (content) {
          return content.getAttribute("content");
        } else {
          return "";
        }
      } else {
        return "";
      }
    };

    // get description from html
    root.getDescription = function () {
      var content;
      // check querySelector existance for old browsers
      if (document.querySelector) {
        content = document.querySelector("meta[property=\"og:description\"]") ||
                  document.querySelector("meta[name=\"twitter:description\"]") ||
                  document.querySelector("meta[name=\"description\"]");
        if (content) {
          return content.getAttribute("content");
        } else {
          return "";
        }
      } else {
        content = document.getElementsByTagName("meta").namedItem("description");
        if (content) {
          return content.getAttribute("content");
        } else {
          return "";
        }
      }
    };

    // share urls for all networks
    root.share = {
      "weibo": function (el) {
        var myoptions = getOptions(el);
        var url = "http://v.t.sina.com.cn/share/share.php?title=" +
          encodeURIComponent(myoptions.title) +
          "&url=" + encodeURIComponent(myoptions.url) +
          "&pic=" + encodeURIComponent(myoptions.image);
        root.popup(url);
      },
      "wechat": function (el) {
        var myoptions = getOptions(el);
        var imgSrc = "https://api.qinco.me/api/qr?size=400&content=" + encodeURIComponent(myoptions.url);
        var dropdownEl = el.querySelector(".need-share-button_dropdown");
        var img = dropdownEl.getElementsByClassName("need-share-wechat-code-image")[0];
        if (img) {
          img.remove();
        } else {
          img = document.createElement("img");
          img.src = imgSrc;
          img.alt = "loading wechat image...";
          img.setAttribute("class", "need-share-wechat-code-image");
          dropdownEl.appendChild(img);
        }
      },
      "douban": function (el) {
        var myoptions = getOptions(el);
        var url = "https://www.douban.com/share/service?name=" +
          encodeURIComponent(myoptions.title) +
          "&href=" + encodeURIComponent(myoptions.url) +
          "&image=" + encodeURIComponent(myoptions.image);
        root.popup(url);
      },
      "qqzone": function (el) {
        var myoptions = getOptions(el);
        var url = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=" +
          encodeURIComponent(myoptions.title) +
          "&url=" + encodeURIComponent(myoptions.url) +
          "&pics=" + encodeURIComponent(myoptions.image) +
          "&desc=" + encodeURIComponent(myoptions.description);
        root.popup(url);
      },
      "renren": function (el) {
        var myoptions = getOptions(el);
        var url = "http://widget.renren.com/dialog/share?title=" +
          encodeURIComponent(myoptions.title) +
          "&resourceUrl=" + encodeURIComponent(myoptions.url) +
          "&pic=" + encodeURIComponent(myoptions.image) +
          "&description=" + encodeURIComponent(myoptions.description);
        root.popup(url);
      },
      "mailto": function (el) {
        var myoptions = getOptions(el);
        var url = "mailto:?subject=" + encodeURIComponent(myoptions.title) +
          "&body=Thought you might enjoy reading this: " + encodeURIComponent(myoptions.url) +
          " - " + encodeURIComponent(myoptions.description);

        window.location.href = url;
      },
      "twitter": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "twitter.com/intent/tweet?text=";
        url += encodeURIComponent(myoptions.title) + "&url=" + encodeURIComponent(myoptions.url);

        root.popup(url);
      },
      "pinterest": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "pinterest.com/pin/create/bookmarklet/?is_video=false";
        url += "&media=" + encodeURIComponent(myoptions.image);
        url += "&url=" + encodeURIComponent(myoptions.url);
        url += "&description=" + encodeURIComponent(myoptions.title);

        root.popup(url);
      },
      "facebook": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "www.facebook.com/share.php?";
        url += "u=" + encodeURIComponent(myoptions.url);
        url += "&title=" + encodeURIComponent(myoptions.title);

        root.popup(url);
      },
      "googleplus": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "plus.google.com/share?";
        url += "url=" + encodeURIComponent(myoptions.url);

        root.popup(url);
      },
      "reddit": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "www.reddit.com/submit?";
        url += "url=" + encodeURIComponent(myoptions.url);
        url += "&title=" + encodeURIComponent(myoptions.title);

        root.popup(url);
      },
      "delicious": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "del.icio.us/post?";
        url += "url=" + encodeURIComponent(myoptions.url);
        url += "&title=" + encodeURIComponent(myoptions.title);
        url += "&notes=" + encodeURIComponent(myoptions.description);

        root.popup(url);
      },
      "stumbleupon": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "www.stumbleupon.com/submit?";
        url += "url=" + encodeURIComponent(myoptions.url);
        url += "&title=" + encodeURIComponent(myoptions.title);

        root.popup(url);
      },
      "linkedin": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "www.linkedin.com/shareArticle?mini=true";
        url += "&url=" + encodeURIComponent(myoptions.url);
        url += "&title=" + encodeURIComponent(myoptions.title);
        url += "&source=" + encodeURIComponent(myoptions.source);

        root.popup(url);
      },
      "slashdot": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "slashdot.org/bookmark.pl?";
        url += "url=" + encodeURIComponent(myoptions.url);
        url += "&title=" + encodeURIComponent(myoptions.title);

        root.popup(url);
      },
      "technorati": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "technorati.com/faves?";
        url += "add=" + encodeURIComponent(myoptions.url);
        url += "&title=" + encodeURIComponent(myoptions.title);

        root.popup(url);
      },
      "posterous": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "posterous.com/share?";
        url += "linkto=" + encodeURIComponent(myoptions.url);

        root.popup(url);
      },
      "tumblr": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "www.tumblr.com/share?v=3";
        url += "&u=" + encodeURIComponent(myoptions.url);
        url += "&t=" + encodeURIComponent(myoptions.title);

        root.popup(url);
      },
      "googlebookmarks": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "www.google.com/bookmarks/mark?op=edit";
        url += "&bkmk=" + encodeURIComponent(myoptions.url);
        url += "&title=" + encodeURIComponent(myoptions.title);
        url += "&annotation=" + encodeURIComponent(myoptions.description);

        root.popup(url);
      },
      "newsvine": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "www.newsvine.com/_tools/seed&save?";
        url += "u=" + encodeURIComponent(myoptions.url);
        url += "&h=" + encodeURIComponent(myoptions.title);

        root.popup(url);
      },
      "evernote": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "www.evernote.com/clip.action?";
        url += "url=" + encodeURIComponent(myoptions.url);
        url += "&title=" + encodeURIComponent(myoptions.title);

        root.popup(url);
      },
      "friendfeed": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "www.friendfeed.com/share?";
        url += "url=" + encodeURIComponent(myoptions.url);
        url += "&title=" + encodeURIComponent(myoptions.title);

        root.popup(url);
      },
      "vkontakte": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "vkontakte.ru/share.php?";
        url += "url=" + encodeURIComponent(myoptions.url);
        url += "&title=" + encodeURIComponent(myoptions.title);
        url += "&description=" + encodeURIComponent(myoptions.description);
        url += "&image=" + encodeURIComponent(myoptions.image);
        url += "&noparse=true";

        root.popup(url);
      },
      "odnoklassniki": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1";
        url += "&st.comments=" + encodeURIComponent(myoptions.description);
        url += "&st._surl=" + encodeURIComponent(myoptions.url);

        root.popup(url);
      },
      "mailru": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "connect.mail.ru/share?";
        url += "url=" + encodeURIComponent(myoptions.url);
        url += "&title=" + encodeURIComponent(myoptions.title);
        url += "&description=" + encodeURIComponent(myoptions.description);
        url += "&imageurl=" + encodeURIComponent(myoptions.image);

        root.popup(url);
      }

    };

    // open share link in a popup
    root.popup = function (url) {
      // set left and top position
      var popupWidth = 600,
        popupHeight = 500,
        // fix dual screen mode
        dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left,
        dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top,
        width = window.innerWidth ?
                window.innerWidth :
                document.documentElement.clientWidth ?
                document.documentElement.clientWidth :
                screen.width,
        height = window.innerHeight ?
                 window.innerHeight :
                 document.documentElement.clientHeight ?
                 document.documentElement.clientHeight :
                 screen.height,
        // calculate top and left position
        left = ((width / 2) - (popupWidth / 2)) + dualScreenLeft,
        top = ((height / 2) - (popupHeight / 2)) + dualScreenTop,

        // show popup
        shareWindow = window.open(url, "targetWindow",
          "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=" + popupWidth +
          ", height=" + popupHeight + ", top=" + top + ", left=" + left);

      // Puts focus on the newWindow
      if (window.focus) {
        shareWindow.focus();
      }
    };

    /* Set options
     ***********************************************/

    // create default options
    root.options = {
      iconStyle: "default", // default or box
      boxForm: "horizontal", // horizontal or vertical
      position: "bottomCenter", // top / middle / bottom + Left / Center / Right
      protocol: ["http", "https"].indexOf(window.location.href.split(":")[0]) === -1 ? "https://" : "//",
      networks: "Weibo,Wechat,Douban,QQZone,Twitter,Pinterest,Facebook,GooglePlus,Reddit,Linkedin,Tumblr,Evernote"
    };

    // integrate custom options
    for (var i in options) {
      if (options.hasOwnProperty(i)) {
        root.options[i] = options[i];
      }
    }
    // convert networks string into array
    //root.options.networks = root.options.networks.toLowerCase().split(",");
    root.options.networks = root.options.networks.split(",");

    function getOptions(el) {
      // integrate data attribute options
      var ret = {};
      for (var i in root.options) {
        if (root.options.hasOwnProperty(i)) {
          ret[i] = root.options[i];
        }
      }

      // these attrs must get dynamically.
      ret.url = window.location.href;
      ret.title = root.getTitle();
      ret.image = root.getImage();
      ret.description = root.getDescription();

      for (var option in el.dataset) {
        // replace only 'share-' prefixed data-attributes
        if (option.match(/share/)) {
          var newOption = option.replace(/share/, "");
          if (!newOption.length) {
            continue;
          }
          newOption = newOption.charAt(0).toLowerCase() + newOption.slice(1);
          var val = el.dataset[option];
          if (newOption === "networks") {
            //val = val.toLowerCase().split(",");
            val = val.split(",");
          } else if (newOption === "url" && val && val[0] === "/") {
            // fix relative url problem.
            val = location.origin + val;
          }
          ret[newOption] = val;
        }
      }
      return ret;
    }

    function createDropdown(el) {
      // create dropdown
      var dropdownEl = document.createElement("span");
      dropdownEl.className = "need-share-button_dropdown";
      if (el.querySelector(".need-share-button_dropdown")) {
        return;
      }
      var myoptions = getOptions(el);

      // set dropdown row length
      if (myoptions.iconStyle == "box" && myoptions.boxForm == "horizontal") {
        dropdownEl.className += " need-share-button_dropdown-box-horizontal";
      } else if (myoptions.iconStyle == "box" && myoptions.boxForm == "vertical") {
        dropdownEl.className += " need-share-button_dropdown-box-vertical";
      }

      // set dropdown position
      setTimeout(function () {
        switch (myoptions.position) {
          case "topLeft":
            dropdownEl.className += " need-share-button_dropdown-top-left";
            break;
          case "topRight":
            dropdownEl.className += " need-share-button_dropdown-top-right";
            break;
          case "topCenter":
            dropdownEl.className += " need-share-button_dropdown-top-center";
            dropdownEl.style.marginLeft = -dropdownEl.offsetWidth / 2 + "px";
            break;
          case "middleLeft":
            dropdownEl.className += " need-share-button_dropdown-middle-left";
            dropdownEl.style.marginTop = -dropdownEl.offsetHeight / 2 + "px";
            break;
          case "middleRight":
            dropdownEl.className += " need-share-button_dropdown-middle-right";
            dropdownEl.style.marginTop = -dropdownEl.offsetHeight / 2 + "px";
            break;
          case "bottomLeft":
            dropdownEl.className += " need-share-button_dropdown-bottom-left";
            break;
          case "bottomRight":
            dropdownEl.className += " need-share-button_dropdown-bottom-right";
            break;
          case "bottomCenter":
            dropdownEl.className += " need-share-button_dropdown-bottom-center";
            dropdownEl.style.marginLeft = -dropdownEl.offsetWidth / 2 + "px";
            break;
          default:
            dropdownEl.className += " need-share-button_dropdown-bottom-center";
            dropdownEl.style.marginLeft = -dropdownEl.offsetWidth / 2 + "px";
            break;
        }
      }, 1);


      // fill fropdown with buttons
      var iconClass = myoptions.iconStyle == "default" ? 
                      "need-share-button_link need-share-button_" : 
                      "need-share-button_link-" + myoptions.iconStyle + " need-share-button_link need-share-button_";
      for (var network in myoptions.networks) {
        if (myoptions.networks.hasOwnProperty(network)) {
          var link = document.createElement("span");
          network = myoptions.networks[network].trim();
          var networkLC = network.toLowerCase();
          link.className = iconClass + networkLC;
          var fontello = ["weibo", "wechat", "douban", "qqzone", "renren"];
          if (fontello.indexOf(networkLC) === -1) {
            link.className += " social-" + networkLC;
          } else {
            link.className += " icon-" + networkLC;
          }
          link.dataset.network = networkLC;
          link.title = network;
          dropdownEl.appendChild(link);
        }
      }

      dropdownEl.addEventListener("click", function (event) {
        if (closest(event.target, ".need-share-button_link")) {
          event.preventDefault();
          event.stopPropagation();

          root.share[event.target.dataset.network](el);
          return false;
        }
      });

      el.appendChild(dropdownEl);
    }

    // close on click outside
    document.addEventListener("click", function (event) {
      var openedEl = document.querySelector(".need-share-button-opened");
      if (!closest(event.target, ".need-share-button-opened")) {
        if (openedEl) {
          openedEl.classList.remove("need-share-button-opened");

          // hide wechat code image when close the dropdown.
          if (openedEl.querySelector(".need-share-wechat-code-image")) {
            openedEl.querySelector(".need-share-wechat-code-image").remove();
          }
        } else {
          var el = closest(event.target, root.elem);
          if (el) {
            if (!el.classList.contains("need-share-button-opened")) {
              createDropdown(el);
              setTimeout(function () {
                el.classList.add("need-share-button-opened");
              }, 1);
            }
          }
        }
      } else {
        setTimeout(function () {
          openedEl.classList.remove("need-share-button-opened");

          // hide wechat code image when close the dropdown.
          if (openedEl.querySelector(".need-share-wechat-code-image")) {
            openedEl.querySelector(".need-share-wechat-code-image").remove();
          }
        }, 1);
      }
    });

  };
})();;
/*! https://github.com/xiazeyu/live2d-widget.js built@2018-2-15 23:35:19 */
var L2Dwidget=function(t){var n=window.webpackJsonpL2Dwidget;window.webpackJsonpL2Dwidget=function(e,o,i){for(var c,u,a=0,f=[];a<e.length;a++)u=e[a],r[u]&&f.push(r[u][0]),r[u]=0;for(c in o)Object.prototype.hasOwnProperty.call(o,c)&&(t[c]=o[c]);for(n&&n(e,o,i);f.length;)f.shift()()};var e={},r={1:0};function o(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}return o.e=function(t){var n=r[t];if(0===n)return new Promise(function(t){t()});if(n)return n[2];var e=new Promise(function(e,o){n=r[t]=[e,o]});n[2]=e;var i=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.charset="utf-8",c.async=!0,c.timeout=12e4,o.nc&&c.setAttribute("nonce",o.nc),c.src=o.p+"L2Dwidget."+t+".min.js";var u=setTimeout(a,12e4);c.onerror=c.onload=a;function a(){c.onerror=c.onload=null,clearTimeout(u);var n=r[t];0!==n&&(n&&n[1](new Error("Loading chunk "+t+" failed.")),r[t]=void 0)}return i.appendChild(c),e},o.m=t,o.c=e,o.d=function(t,n,e){o.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:e})},o.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(n,"a",n),n},o.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},o.p="",o.oe=function(t){throw console.error(t),t},o(o.s=52)}([function(t,n,e){var r=e(28)("wks"),o=e(18),i=e(1).Symbol,c="function"==typeof i;(t.exports=function(t){return r[t]||(r[t]=c&&i[t]||(c?i:o)("Symbol."+t))}).store=r},function(t,n){var e=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)},function(t,n,e){var r=e(6);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,n,e){var r=e(12),o=e(30);t.exports=e(7)?function(t,n,e){return r.f(t,n,o(1,e))}:function(t,n,e){return t[n]=e,t}},function(t,n){var e=t.exports={version:"2.5.3"};"number"==typeof __e&&(__e=e)},function(t,n,e){var r=e(1),o=e(3),i=e(8),c=e(18)("src"),u="toString",a=Function[u],f=(""+a).split(u);e(4).inspectSource=function(t){return a.call(t)},(t.exports=function(t,n,e,u){var a="function"==typeof e;a&&(i(e,"name")||o(e,"name",n)),t[n]!==e&&(a&&(i(e,c)||o(e,c,t[n]?""+t[n]:f.join(String(n)))),t===r?t[n]=e:u?t[n]?t[n]=e:o(t,n,e):(delete t[n],o(t,n,e)))})(Function.prototype,u,function(){return"function"==typeof this&&this[c]||a.call(this)})},function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,n,e){t.exports=!e(29)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,n){var e={}.hasOwnProperty;t.exports=function(t,n){return e.call(t,n)}},function(t,n){t.exports={}},function(t,n){t.exports=function(t){var n=typeof t;return null!=t&&("object"==n||"function"==n)}},function(t,n){var e={}.toString;t.exports=function(t){return e.call(t).slice(8,-1)}},function(t,n,e){var r=e(2),o=e(55),i=e(56),c=Object.defineProperty;n.f=e(7)?Object.defineProperty:function(t,n,e){if(r(t),n=i(n,!0),r(e),o)try{return c(t,n,e)}catch(t){}if("get"in e||"set"in e)throw TypeError("Accessors not supported!");return"value"in e&&(t[n]=e.value),t}},function(t,n,e){var r=e(1),o=e(4),i=e(3),c=e(5),u=e(14),a="prototype",f=function(t,n,e){var s,l,p,v,d=t&f.F,h=t&f.G,y=t&f.S,b=t&f.P,w=t&f.B,m=h?r:y?r[n]||(r[n]={}):(r[n]||{})[a],x=h?o:o[n]||(o[n]={}),g=x[a]||(x[a]={});h&&(e=n);for(s in e)p=((l=!d&&m&&void 0!==m[s])?m:e)[s],v=w&&l?u(p,r):b&&"function"==typeof p?u(Function.call,p):p,m&&c(m,s,p,t&f.U),x[s]!=p&&i(x,s,v),b&&g[s]!=p&&(g[s]=p)};r.core=o,f.F=1,f.G=2,f.S=4,f.P=8,f.B=16,f.W=32,f.U=64,f.R=128,t.exports=f},function(t,n,e){var r=e(15);t.exports=function(t,n,e){if(r(t),void 0===n)return t;switch(e){case 1:return function(e){return t.call(n,e)};case 2:return function(e,r){return t.call(n,e,r)};case 3:return function(e,r,o){return t.call(n,e,r,o)}}return function(){return t.apply(n,arguments)}}},function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,n,e){var r=e(26);t.exports=function(t,n){for(var e=t.length;e--;)if(r(t[e][0],n))return e;return-1}},function(t,n,e){var r=e(11),o=e(0)("toStringTag"),i="Arguments"==r(function(){return arguments}());t.exports=function(t){var n,e,c;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(e=function(t,n){try{return t[n]}catch(t){}}(n=Object(t),o))?e:i?r(n):"Object"==(c=r(n))&&"function"==typeof n.callee?"Arguments":c}},function(t,n){var e=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++e+r).toString(36))}},function(t,n,e){var r=e(6),o=e(1).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,n){var e=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:e)(t)}},function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,n,e){var r=e(63),o=e(21);t.exports=function(t){return r(o(t))}},function(t,n,e){var r=e(28)("keys"),o=e(18);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,n,e){var r=e(12).f,o=e(8),i=e(0)("toStringTag");t.exports=function(t,n,e){t&&!o(t=e?t:t.prototype,i)&&r(t,i,{configurable:!0,value:n})}},function(t,n,e){"use strict";var r=e(15);t.exports.f=function(t){return new function(t){var n,e;this.promise=new t(function(t,r){if(void 0!==n||void 0!==e)throw TypeError("Bad Promise constructor");n=t,e=r}),this.resolve=r(n),this.reject=r(e)}(t)}},function(t,n){t.exports=function(t,n){return t===n||t!=t&&n!=n}},function(t,n,e){var r=e(99);t.exports=function(t,n,e){"__proto__"==n&&r?r(t,n,{configurable:!0,enumerable:!0,value:e,writable:!0}):t[n]=e}},function(t,n,e){var r=e(1),o="__core-js_shared__",i=r[o]||(r[o]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,n){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},function(t,n,e){"use strict";var r=e(32),o=e(13),i=e(5),c=e(3),u=e(8),a=e(9),f=e(59),s=e(24),l=e(66),p=e(0)("iterator"),v=!([].keys&&"next"in[].keys()),d="values",h=function(){return this};t.exports=function(t,n,e,y,b,w,m){f(e,n,y);var x,g,_,j=function(t){if(!v&&t in S)return S[t];switch(t){case"keys":case d:return function(){return new e(this,t)}}return function(){return new e(this,t)}},O=n+" Iterator",P=b==d,k=!1,S=t.prototype,T=S[p]||S["@@iterator"]||b&&S[b],L=!v&&T||j(b),E=b?P?j("entries"):L:void 0,M="Array"==n?S.entries||T:T;if(M&&(_=l(M.call(new t)))!==Object.prototype&&_.next&&(s(_,O,!0),r||u(_,p)||c(_,p,h)),P&&T&&T.name!==d&&(k=!0,L=function(){return T.call(this)}),r&&!m||!v&&!k&&S[p]||c(S,p,L),a[n]=L,a[O]=h,b)if(x={values:P?L:j(d),keys:w?L:j("keys"),entries:E},m)for(g in x)g in S||i(S,g,x[g]);else o(o.P+o.F*(v||k),n,x);return x}},function(t,n){t.exports=!1},function(t,n,e){var r=e(62),o=e(35);t.exports=Object.keys||function(t){return r(t,o)}},function(t,n,e){var r=e(20),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,n){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,n,e){var r=e(1).document;t.exports=r&&r.documentElement},function(t,n,e){var r=e(2),o=e(15),i=e(0)("species");t.exports=function(t,n){var e,c=r(t).constructor;return void 0===c||void 0==(e=r(c)[i])?n:o(e)}},function(t,n,e){var r,o,i,c=e(14),u=e(78),a=e(36),f=e(19),s=e(1),l=s.process,p=s.setImmediate,v=s.clearImmediate,d=s.MessageChannel,h=s.Dispatch,y=0,b={},w="onreadystatechange",m=function(){var t=+this;if(b.hasOwnProperty(t)){var n=b[t];delete b[t],n()}},x=function(t){m.call(t.data)};p&&v||(p=function(t){for(var n=[],e=1;arguments.length>e;)n.push(arguments[e++]);return b[++y]=function(){u("function"==typeof t?t:Function(t),n)},r(y),y},v=function(t){delete b[t]},"process"==e(11)(l)?r=function(t){l.nextTick(c(m,t,1))}:h&&h.now?r=function(t){h.now(c(m,t,1))}:d?(i=(o=new d).port2,o.port1.onmessage=x,r=c(i.postMessage,i,1)):s.addEventListener&&"function"==typeof postMessage&&!s.importScripts?(r=function(t){s.postMessage(t+"","*")},s.addEventListener("message",x,!1)):r=w in f("script")?function(t){a.appendChild(f("script"))[w]=function(){a.removeChild(this),m.call(t)}}:function(t){setTimeout(c(m,t,1),0)}),t.exports={set:p,clear:v}},function(t,n){t.exports=function(t){try{return{e:!1,v:t()}}catch(t){return{e:!0,v:t}}}},function(t,n,e){var r=e(2),o=e(6),i=e(25);t.exports=function(t,n){if(r(t),o(n)&&n.constructor===t)return n;var e=i.f(t);return(0,e.resolve)(n),e.promise}},function(t,n){t.exports=function(t,n,e){switch(e.length){case 0:return t.call(n);case 1:return t.call(n,e[0]);case 2:return t.call(n,e[0],e[1]);case 3:return t.call(n,e[0],e[1],e[2])}return t.apply(n,e)}},function(t,n,e){var r=e(89),o=e(90),i=e(91);t.exports=function(t,n){return i(o(t,n,r),t+"")}},function(t,n,e){var r=e(93),o=e(44),i=e(101),c=e(103),u=e(10),a=e(50);t.exports=function t(n,e,f,s,l){n!==e&&i(e,function(i,a){if(u(i))l||(l=new r),c(n,e,a,f,t,s,l);else{var p=s?s(n[a],i,a+"",n,e,l):void 0;void 0===p&&(p=i),o(n,a,p)}},a)}},function(t,n,e){var r=e(27),o=e(26);t.exports=function(t,n,e){(void 0===e||o(t[n],e))&&(void 0!==e||n in t)||r(t,n,e)}},function(t,n,e){var r=e(106),o="object"==typeof self&&self&&self.Object===Object&&self,i=r||o||Function("return this")();t.exports=i},function(t,n,e){var r=e(114)(Object.getPrototypeOf,Object);t.exports=r},function(t,n,e){var r=e(48),o=e(10),i="[object AsyncFunction]",c="[object Function]",u="[object GeneratorFunction]",a="[object Proxy]";t.exports=function(t){if(!o(t))return!1;var n=r(t);return n==c||n==u||n==i||n==a}},function(t,n){var e=Object.prototype.toString;t.exports=function(t){return e.call(t)}},function(t,n){t.exports=function(t){return null!=t&&"object"==typeof t}},function(t,n){t.exports=function(t){var n=[];if(null!=t)for(var e in Object(t))n.push(e);return n}},function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.config=n.configApplyer=void 0;var r=i(e(88)),o=i(e(130));function i(t){return t&&t.__esModule?t:{default:t}}var c={};n.configApplyer=function(t){n.config=c=(0,r.default)(t,o.default)},n.config=c},function(t,n,e){e(53),e(85),t.exports=e(86)},function(t,n,e){e(54),e(57),e(68),e(72),e(83),e(84),t.exports=e(4).Promise},function(t,n,e){"use strict";var r=e(17),o={};o[e(0)("toStringTag")]="z",o+""!="[object z]"&&e(5)(Object.prototype,"toString",function(){return"[object "+r(this)+"]"},!0)},function(t,n,e){t.exports=!e(7)&&!e(29)(function(){return 7!=Object.defineProperty(e(19)("div"),"a",{get:function(){return 7}}).a})},function(t,n,e){var r=e(6);t.exports=function(t,n){if(!r(t))return t;var e,o;if(n&&"function"==typeof(e=t.toString)&&!r(o=e.call(t)))return o;if("function"==typeof(e=t.valueOf)&&!r(o=e.call(t)))return o;if(!n&&"function"==typeof(e=t.toString)&&!r(o=e.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,n,e){"use strict";var r=e(58)(!0);e(31)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,n=this._t,e=this._i;return e>=n.length?{value:void 0,done:!0}:(t=r(n,e),this._i+=t.length,{value:t,done:!1})})},function(t,n,e){var r=e(20),o=e(21);t.exports=function(t){return function(n,e){var i,c,u=String(o(n)),a=r(e),f=u.length;return a<0||a>=f?t?"":void 0:(i=u.charCodeAt(a))<55296||i>56319||a+1===f||(c=u.charCodeAt(a+1))<56320||c>57343?t?u.charAt(a):i:t?u.slice(a,a+2):c-56320+(i-55296<<10)+65536}}},function(t,n,e){"use strict";var r=e(60),o=e(30),i=e(24),c={};e(3)(c,e(0)("iterator"),function(){return this}),t.exports=function(t,n,e){t.prototype=r(c,{next:o(1,e)}),i(t,n+" Iterator")}},function(t,n,e){var r=e(2),o=e(61),i=e(35),c=e(23)("IE_PROTO"),u=function(){},a="prototype",f=function(){var t,n=e(19)("iframe"),r=i.length;for(n.style.display="none",e(36).appendChild(n),n.src="javascript:",(t=n.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),f=t.F;r--;)delete f[a][i[r]];return f()};t.exports=Object.create||function(t,n){var e;return null!==t?(u[a]=r(t),e=new u,u[a]=null,e[c]=t):e=f(),void 0===n?e:o(e,n)}},function(t,n,e){var r=e(12),o=e(2),i=e(33);t.exports=e(7)?Object.defineProperties:function(t,n){o(t);for(var e,c=i(n),u=c.length,a=0;u>a;)r.f(t,e=c[a++],n[e]);return t}},function(t,n,e){var r=e(8),o=e(22),i=e(64)(!1),c=e(23)("IE_PROTO");t.exports=function(t,n){var e,u=o(t),a=0,f=[];for(e in u)e!=c&&r(u,e)&&f.push(e);for(;n.length>a;)r(u,e=n[a++])&&(~i(f,e)||f.push(e));return f}},function(t,n,e){var r=e(11);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,n,e){var r=e(22),o=e(34),i=e(65);t.exports=function(t){return function(n,e,c){var u,a=r(n),f=o(a.length),s=i(c,f);if(t&&e!=e){for(;f>s;)if((u=a[s++])!=u)return!0}else for(;f>s;s++)if((t||s in a)&&a[s]===e)return t||s||0;return!t&&-1}}},function(t,n,e){var r=e(20),o=Math.max,i=Math.min;t.exports=function(t,n){return(t=r(t))<0?o(t+n,0):i(t,n)}},function(t,n,e){var r=e(8),o=e(67),i=e(23)("IE_PROTO"),c=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?c:null}},function(t,n,e){var r=e(21);t.exports=function(t){return Object(r(t))}},function(t,n,e){for(var r=e(69),o=e(33),i=e(5),c=e(1),u=e(3),a=e(9),f=e(0),s=f("iterator"),l=f("toStringTag"),p=a.Array,v={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},d=o(v),h=0;h<d.length;h++){var y,b=d[h],w=v[b],m=c[b],x=m&&m.prototype;if(x&&(x[s]||u(x,s,p),x[l]||u(x,l,b),a[b]=p,w))for(y in r)x[y]||i(x,y,r[y],!0)}},function(t,n,e){"use strict";var r=e(70),o=e(71),i=e(9),c=e(22);t.exports=e(31)(Array,"Array",function(t,n){this._t=c(t),this._i=0,this._k=n},function(){var t=this._t,n=this._k,e=this._i++;return!t||e>=t.length?(this._t=void 0,o(1)):o(0,"keys"==n?e:"values"==n?t[e]:[e,t[e]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,n,e){var r=e(0)("unscopables"),o=Array.prototype;void 0==o[r]&&e(3)(o,r,{}),t.exports=function(t){o[r][t]=!0}},function(t,n){t.exports=function(t,n){return{value:n,done:!!t}}},function(t,n,e){"use strict";var r,o,i,c,u=e(32),a=e(1),f=e(14),s=e(17),l=e(13),p=e(6),v=e(15),d=e(73),h=e(74),y=e(37),b=e(38).set,w=e(79)(),m=e(25),x=e(39),g=e(40),_="Promise",j=a.TypeError,O=a.process,P=a[_],k="process"==s(O),S=function(){},T=o=m.f,L=!!function(){try{var t=P.resolve(1),n=(t.constructor={})[e(0)("species")]=function(t){t(S,S)};return(k||"function"==typeof PromiseRejectionEvent)&&t.then(S)instanceof n}catch(t){}}(),E=function(t){var n;return!(!p(t)||"function"!=typeof(n=t.then))&&n},M=function(t,n){if(!t._n){t._n=!0;var e=t._c;w(function(){for(var r=t._v,o=1==t._s,i=0,c=function(n){var e,i,c=o?n.ok:n.fail,u=n.resolve,a=n.reject,f=n.domain;try{c?(o||(2==t._h&&C(t),t._h=1),!0===c?e=r:(f&&f.enter(),e=c(r),f&&f.exit()),e===n.promise?a(j("Promise-chain cycle")):(i=E(e))?i.call(e,u,a):u(e)):a(r)}catch(t){a(t)}};e.length>i;)c(e[i++]);t._c=[],t._n=!1,n&&!t._h&&A(t)})}},A=function(t){b.call(a,function(){var n,e,r,o=t._v,i=F(t);if(i&&(n=x(function(){k?O.emit("unhandledRejection",o,t):(e=a.onunhandledrejection)?e({promise:t,reason:o}):(r=a.console)&&r.error&&r.error("Unhandled promise rejection",o)}),t._h=k||F(t)?2:1),t._a=void 0,i&&n.e)throw n.v})},F=function(t){return 1!==t._h&&0===(t._a||t._c).length},C=function(t){b.call(a,function(){var n;k?O.emit("rejectionHandled",t):(n=a.onrejectionhandled)&&n({promise:t,reason:t._v})})},D=function(t){var n=this;n._d||(n._d=!0,(n=n._w||n)._v=t,n._s=2,n._a||(n._a=n._c.slice()),M(n,!0))},N=function(t){var n,e=this;if(!e._d){e._d=!0,e=e._w||e;try{if(e===t)throw j("Promise can't be resolved itself");(n=E(t))?w(function(){var r={_w:e,_d:!1};try{n.call(t,f(N,r,1),f(D,r,1))}catch(t){D.call(r,t)}}):(e._v=t,e._s=1,M(e,!1))}catch(t){D.call({_w:e,_d:!1},t)}}};L||(P=function(t){d(this,P,_,"_h"),v(t),r.call(this);try{t(f(N,this,1),f(D,this,1))}catch(t){D.call(this,t)}},(r=function(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1}).prototype=e(80)(P.prototype,{then:function(t,n){var e=T(y(this,P));return e.ok="function"!=typeof t||t,e.fail="function"==typeof n&&n,e.domain=k?O.domain:void 0,this._c.push(e),this._a&&this._a.push(e),this._s&&M(this,!1),e.promise},catch:function(t){return this.then(void 0,t)}}),i=function(){var t=new r;this.promise=t,this.resolve=f(N,t,1),this.reject=f(D,t,1)},m.f=T=function(t){return t===P||t===c?new i(t):o(t)}),l(l.G+l.W+l.F*!L,{Promise:P}),e(24)(P,_),e(81)(_),c=e(4)[_],l(l.S+l.F*!L,_,{reject:function(t){var n=T(this);return(0,n.reject)(t),n.promise}}),l(l.S+l.F*(u||!L),_,{resolve:function(t){return g(u&&this===c?P:this,t)}}),l(l.S+l.F*!(L&&e(82)(function(t){P.all(t).catch(S)})),_,{all:function(t){var n=this,e=T(n),r=e.resolve,o=e.reject,i=x(function(){var e=[],i=0,c=1;h(t,!1,function(t){var u=i++,a=!1;e.push(void 0),c++,n.resolve(t).then(function(t){a||(a=!0,e[u]=t,--c||r(e))},o)}),--c||r(e)});return i.e&&o(i.v),e.promise},race:function(t){var n=this,e=T(n),r=e.reject,o=x(function(){h(t,!1,function(t){n.resolve(t).then(e.resolve,r)})});return o.e&&r(o.v),e.promise}})},function(t,n){t.exports=function(t,n,e,r){if(!(t instanceof n)||void 0!==r&&r in t)throw TypeError(e+": incorrect invocation!");return t}},function(t,n,e){var r=e(14),o=e(75),i=e(76),c=e(2),u=e(34),a=e(77),f={},s={};(n=t.exports=function(t,n,e,l,p){var v,d,h,y,b=p?function(){return t}:a(t),w=r(e,l,n?2:1),m=0;if("function"!=typeof b)throw TypeError(t+" is not iterable!");if(i(b)){for(v=u(t.length);v>m;m++)if((y=n?w(c(d=t[m])[0],d[1]):w(t[m]))===f||y===s)return y}else for(h=b.call(t);!(d=h.next()).done;)if((y=o(h,w,d.value,n))===f||y===s)return y}).BREAK=f,n.RETURN=s},function(t,n,e){var r=e(2);t.exports=function(t,n,e,o){try{return o?n(r(e)[0],e[1]):n(e)}catch(n){var i=t.return;throw void 0!==i&&r(i.call(t)),n}}},function(t,n,e){var r=e(9),o=e(0)("iterator"),i=Array.prototype;t.exports=function(t){return void 0!==t&&(r.Array===t||i[o]===t)}},function(t,n,e){var r=e(17),o=e(0)("iterator"),i=e(9);t.exports=e(4).getIteratorMethod=function(t){if(void 0!=t)return t[o]||t["@@iterator"]||i[r(t)]}},function(t,n){t.exports=function(t,n,e){var r=void 0===e;switch(n.length){case 0:return r?t():t.call(e);case 1:return r?t(n[0]):t.call(e,n[0]);case 2:return r?t(n[0],n[1]):t.call(e,n[0],n[1]);case 3:return r?t(n[0],n[1],n[2]):t.call(e,n[0],n[1],n[2]);case 4:return r?t(n[0],n[1],n[2],n[3]):t.call(e,n[0],n[1],n[2],n[3])}return t.apply(e,n)}},function(t,n,e){var r=e(1),o=e(38).set,i=r.MutationObserver||r.WebKitMutationObserver,c=r.process,u=r.Promise,a="process"==e(11)(c);t.exports=function(){var t,n,e,f=function(){var r,o;for(a&&(r=c.domain)&&r.exit();t;){o=t.fn,t=t.next;try{o()}catch(r){throw t?e():n=void 0,r}}n=void 0,r&&r.enter()};if(a)e=function(){c.nextTick(f)};else if(!i||r.navigator&&r.navigator.standalone)if(u&&u.resolve){var s=u.resolve();e=function(){s.then(f)}}else e=function(){o.call(r,f)};else{var l=!0,p=document.createTextNode("");new i(f).observe(p,{characterData:!0}),e=function(){p.data=l=!l}}return function(r){var o={fn:r,next:void 0};n&&(n.next=o),t||(t=o,e()),n=o}}},function(t,n,e){var r=e(5);t.exports=function(t,n,e){for(var o in n)r(t,o,n[o],e);return t}},function(t,n,e){"use strict";var r=e(1),o=e(12),i=e(7),c=e(0)("species");t.exports=function(t){var n=r[t];i&&n&&!n[c]&&o.f(n,c,{configurable:!0,get:function(){return this}})}},function(t,n,e){var r=e(0)("iterator"),o=!1;try{var i=[7][r]();i.return=function(){o=!0},Array.from(i,function(){throw 2})}catch(t){}t.exports=function(t,n){if(!n&&!o)return!1;var e=!1;try{var i=[7],c=i[r]();c.next=function(){return{done:e=!0}},i[r]=function(){return c},t(i)}catch(t){}return e}},function(t,n,e){"use strict";var r=e(13),o=e(4),i=e(1),c=e(37),u=e(40);r(r.P+r.R,"Promise",{finally:function(t){var n=c(this,o.Promise||i.Promise),e="function"==typeof t;return this.then(e?function(e){return u(n,t()).then(function(){return e})}:t,e?function(e){return u(n,t()).then(function(){throw e})}:t)}})},function(t,n,e){"use strict";var r=e(13),o=e(25),i=e(39);r(r.S,"Promise",{try:function(t){var n=o.f(this),e=i(t);return(e.e?n.reject:n.resolve)(e.v),n.promise}})},function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});function r(){try{return document.currentScript.src}catch(n){var t=document.getElementsByTagName("script");return t[t.length-1].src}}e.p=r().replace(/[^/\\\\]+$/,""),n.getCurrentPath=r},function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.L2Dwidget=void 0;var r,o=function(){function t(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(n,e,r){return e&&t(n.prototype,e),r&&t(n,r),n}}(),i=e(87),c=(r=i,r&&r.__esModule?r:{default:r}),u=e(51);var a=void 0,f=new(function(){function t(){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t)}return o(t,[{key:"init",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(0,u.configApplyer)(t),!u.config.mobile.show&&c.default.mobile()||e.e(0).then(e.bind(null,131)).then(function(t){(a=t).theRealInit()}).catch(function(t){console.error(t)})}},{key:"captureFrame",value:function(t){return a.captureFrame(t)}},{key:"downloadFrame",value:function(){this.captureFrame(function(t){var n=document.createElement("a");document.body.appendChild(n),n.setAttribute("type","hidden"),n.href=t,n.download="live2d.png",n.click()})}}]),t}());n.L2Dwidget=f},function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o=window.device,i={},c=[];window.device=i;var u=window.document.documentElement,a=window.navigator.userAgent.toLowerCase(),f=["googletv","viera","smarttv","internet.tv","netcast","nettv","appletv","boxee","kylo","roku","dlnadoc","roku","pov_tv","hbbtv","ce-html"];i.macos=function(){return s("mac")},i.ios=function(){return i.iphone()||i.ipod()||i.ipad()},i.iphone=function(){return!i.windows()&&s("iphone")},i.ipod=function(){return s("ipod")},i.ipad=function(){return s("ipad")},i.android=function(){return!i.windows()&&s("android")},i.androidPhone=function(){return i.android()&&s("mobile")},i.androidTablet=function(){return i.android()&&!s("mobile")},i.blackberry=function(){return s("blackberry")||s("bb10")||s("rim")},i.blackberryPhone=function(){return i.blackberry()&&!s("tablet")},i.blackberryTablet=function(){return i.blackberry()&&s("tablet")},i.windows=function(){return s("windows")},i.windowsPhone=function(){return i.windows()&&s("phone")},i.windowsTablet=function(){return i.windows()&&s("touch")&&!i.windowsPhone()},i.fxos=function(){return(s("(mobile")||s("(tablet"))&&s(" rv:")},i.fxosPhone=function(){return i.fxos()&&s("mobile")},i.fxosTablet=function(){return i.fxos()&&s("tablet")},i.meego=function(){return s("meego")},i.cordova=function(){return window.cordova&&"file:"===location.protocol},i.nodeWebkit=function(){return"object"===r(window.process)},i.mobile=function(){return i.androidPhone()||i.iphone()||i.ipod()||i.windowsPhone()||i.blackberryPhone()||i.fxosPhone()||i.meego()},i.tablet=function(){return i.ipad()||i.androidTablet()||i.blackberryTablet()||i.windowsTablet()||i.fxosTablet()},i.desktop=function(){return!i.tablet()&&!i.mobile()},i.television=function(){for(var t=0;t<f.length;){if(s(f[t]))return!0;t++}return!1},i.portrait=function(){return window.innerHeight/window.innerWidth>1},i.landscape=function(){return window.innerHeight/window.innerWidth<1},i.noConflict=function(){return window.device=o,this};function s(t){return-1!==a.indexOf(t)}function l(t){return u.className.match(new RegExp(t,"i"))}function p(t){var n=null;l(t)||(n=u.className.replace(/^\s+|\s+$/g,""),u.className=n+" "+t)}function v(t){l(t)&&(u.className=u.className.replace(" "+t,""))}i.ios()?i.ipad()?p("ios ipad tablet"):i.iphone()?p("ios iphone mobile"):i.ipod()&&p("ios ipod mobile"):i.macos()?p("macos desktop"):i.android()?i.androidTablet()?p("android tablet"):p("android mobile"):i.blackberry()?i.blackberryTablet()?p("blackberry tablet"):p("blackberry mobile"):i.windows()?i.windowsTablet()?p("windows tablet"):i.windowsPhone()?p("windows mobile"):p("windows desktop"):i.fxos()?i.fxosTablet()?p("fxos tablet"):p("fxos mobile"):i.meego()?p("meego mobile"):i.nodeWebkit()?p("node-webkit"):i.television()?p("television"):i.desktop()&&p("desktop"),i.cordova()&&p("cordova");function d(){i.landscape()?(v("portrait"),p("landscape"),h("landscape")):(v("landscape"),p("portrait"),h("portrait")),w()}function h(t){for(var n in c)c[n](t)}i.onChangeOrientation=function(t){"function"==typeof t&&c.push(t)};var y="resize";Object.prototype.hasOwnProperty.call(window,"onorientationchange")&&(y="onorientationchange"),window.addEventListener?window.addEventListener(y,d,!1):window.attachEvent?window.attachEvent(y,d):window[y]=d,d();function b(t){for(var n=0;n<t.length;n++)if(i[t[n]]())return t[n];return"unknown"}i.type=b(["mobile","tablet","desktop"]),i.os=b(["ios","iphone","ipad","ipod","android","blackberry","windows","fxos","meego","television"]);function w(){i.orientation=b(["portrait","landscape"])}w(),n.default=i},function(t,n,e){var r=e(41),o=e(42),i=e(92),c=e(127),u=o(function(t){return t.push(void 0,i),r(c,void 0,t)});t.exports=u},function(t,n){t.exports=function(t){return t}},function(t,n,e){var r=e(41),o=Math.max;t.exports=function(t,n,e){return n=o(void 0===n?t.length-1:n,0),function(){for(var i=arguments,c=-1,u=o(i.length-n,0),a=Array(u);++c<u;)a[c]=i[n+c];c=-1;for(var f=Array(n+1);++c<n;)f[c]=i[c];return f[n]=e(a),r(t,this,f)}}},function(t,n){t.exports=function(t){return t}},function(t,n,e){var r=e(43),o=e(10);t.exports=function t(n,e,i,c,u,a){return o(n)&&o(e)&&(a.set(e,n),r(n,e,void 0,t,a),a.delete(e)),n}},function(t,n,e){var r=e(94),o=e(95),i=e(96),c=e(97),u=e(98);function a(t){var n=-1,e=null==t?0:t.length;for(this.clear();++n<e;){var r=t[n];this.set(r[0],r[1])}}a.prototype.clear=r,a.prototype.delete=o,a.prototype.get=i,a.prototype.has=c,a.prototype.set=u,t.exports=a},function(t,n){t.exports=function(){this.__data__=[],this.size=0}},function(t,n,e){var r=e(16),o=Array.prototype.splice;t.exports=function(t){var n=this.__data__,e=r(n,t);return!(e<0||(e==n.length-1?n.pop():o.call(n,e,1),--this.size,0))}},function(t,n,e){var r=e(16);t.exports=function(t){var n=this.__data__,e=r(n,t);return e<0?void 0:n[e][1]}},function(t,n,e){var r=e(16);t.exports=function(t){return r(this.__data__,t)>-1}},function(t,n,e){var r=e(16);t.exports=function(t,n){var e=this.__data__,o=r(e,t);return o<0?(++this.size,e.push([t,n])):e[o][1]=n,this}},function(t,n,e){var r=e(100),o=function(){try{var t=r(Object,"defineProperty");return t({},"",{}),t}catch(t){}}();t.exports=o},function(t,n){t.exports=function(t,n){return null==t?void 0:t[n]}},function(t,n,e){var r=e(102)();t.exports=r},function(t,n){t.exports=function(t){return function(n,e,r){for(var o=-1,i=Object(n),c=r(n),u=c.length;u--;){var a=c[t?u:++o];if(!1===e(i[a],a,i))break}return n}}},function(t,n,e){var r=e(44),o=e(104),i=e(108),c=e(111),u=e(112),a=e(116),f=e(117),s=e(118),l=e(121),p=e(47),v=e(10),d=e(122),h=e(123),y=e(124);t.exports=function(t,n,e,b,w,m,x){var g=t[e],_=n[e],j=x.get(_);if(j)r(t,e,j);else{var O=m?m(g,_,e+"",t,n,x):void 0,P=void 0===O;if(P){var k=f(_),S=!k&&l(_),T=!k&&!S&&h(_);O=_,k||S||T?f(g)?O=g:s(g)?O=c(g):S?(P=!1,O=o(_,!0)):T?(P=!1,O=i(_,!0)):O=[]:d(_)||a(_)?(O=g,a(g)?O=y(g):(!v(g)||b&&p(g))&&(O=u(_))):P=!1}P&&(x.set(_,O),w(O,_,b,m,x),x.delete(_)),r(t,e,O)}}},function(t,n,e){(function(t){var r=e(45),o="object"==typeof n&&n&&!n.nodeType&&n,i=o&&"object"==typeof t&&t&&!t.nodeType&&t,c=i&&i.exports===o?r.Buffer:void 0,u=c?c.allocUnsafe:void 0;t.exports=function(t,n){if(n)return t.slice();var e=t.length,r=u?u(e):new t.constructor(e);return t.copy(r),r}}).call(n,e(105)(t))},function(t,n){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},function(t,n,e){(function(n){var e="object"==typeof n&&n&&n.Object===Object&&n;t.exports=e}).call(n,e(107))},function(t,n){var e;e=function(){return this}();try{e=e||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(e=window)}t.exports=e},function(t,n,e){var r=e(109);t.exports=function(t,n){var e=n?r(t.buffer):t.buffer;return new t.constructor(e,t.byteOffset,t.length)}},function(t,n,e){var r=e(110);t.exports=function(t){var n=new t.constructor(t.byteLength);return new r(n).set(new r(t)),n}},function(t,n,e){var r=e(45).Uint8Array;t.exports=r},function(t,n){t.exports=function(t,n){var e=-1,r=t.length;for(n||(n=Array(r));++e<r;)n[e]=t[e];return n}},function(t,n,e){var r=e(113),o=e(46),i=e(115);t.exports=function(t){return"function"!=typeof t.constructor||i(t)?{}:r(o(t))}},function(t,n,e){var r=e(10),o=Object.create,i=function(){function t(){}return function(n){if(!r(n))return{};if(o)return o(n);t.prototype=n;var e=new t;return t.prototype=void 0,e}}();t.exports=i},function(t,n){t.exports=function(t,n){return function(e){return t(n(e))}}},function(t,n){t.exports=function(){return!1}},function(t,n){t.exports=function(){return!1}},function(t,n){var e=Array.isArray;t.exports=e},function(t,n,e){var r=e(119),o=e(49);t.exports=function(t){return o(t)&&r(t)}},function(t,n,e){var r=e(47),o=e(120);t.exports=function(t){return null!=t&&o(t.length)&&!r(t)}},function(t,n){var e=9007199254740991;t.exports=function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=e}},function(t,n){t.exports=function(){return!1}},function(t,n,e){var r=e(48),o=e(46),i=e(49),c="[object Object]",u=Function.prototype,a=Object.prototype,f=u.toString,s=a.hasOwnProperty,l=f.call(Object);t.exports=function(t){if(!i(t)||r(t)!=c)return!1;var n=o(t);if(null===n)return!0;var e=s.call(n,"constructor")&&n.constructor;return"function"==typeof e&&e instanceof e&&f.call(e)==l}},function(t,n){t.exports=function(){return!1}},function(t,n,e){var r=e(125),o=e(50);t.exports=function(t){return r(t,o(t))}},function(t,n,e){var r=e(126),o=e(27);t.exports=function(t,n,e,i){var c=!e;e||(e={});for(var u=-1,a=n.length;++u<a;){var f=n[u],s=i?i(e[f],t[f],f,e,t):void 0;void 0===s&&(s=t[f]),c?o(e,f,s):r(e,f,s)}return e}},function(t,n,e){var r=e(27),o=e(26),i=Object.prototype.hasOwnProperty;t.exports=function(t,n,e){var c=t[n];i.call(t,n)&&o(c,e)&&(void 0!==e||n in t)||r(t,n,e)}},function(t,n,e){var r=e(43),o=e(128)(function(t,n,e,o){r(t,n,e,o)});t.exports=o},function(t,n,e){var r=e(42),o=e(129);t.exports=function(t){return r(function(n,e){var r=-1,i=e.length,c=i>1?e[i-1]:void 0,u=i>2?e[2]:void 0;for(c=t.length>3&&"function"==typeof c?(i--,c):void 0,u&&o(e[0],e[1],u)&&(c=i<3?void 0:c,i=1),n=Object(n);++r<i;){var a=e[r];a&&t(n,a,r,c)}return n})}},function(t,n){t.exports=function(){return!1}},function(t,n,e){"use strict";var r={model:{jsonPath:"https://unpkg.com/live2d-widget-model-shizuku@latest/assets/shizuku.model.json",scale:1,hHeadPos:.5,vHeadPos:.618,myDefine:[]},display:{superSample:2,width:150,height:300,position:"right",hOffset:0,vOffset:-20},mobile:{show:!0,scale:.5,motion:!0},name:{canvas:"live2dcanvas",div:"live2d-widget"},react:{opacityDefault:.7,opacityOnHover:.2,myFunc:function(t){console.log("(undefined) ┑(￣Д ￣)┍")}},dev:{log:!1,border:!1,mouseLog:!1,mouseFunc:function(t,n,e,r){console.log("MouseFunc: "+t+","+n+"; "+e+", "+r)}}};t.exports=r}]).L2Dwidget;
//# sourceMappingURL=L2Dwidget.min.js.map