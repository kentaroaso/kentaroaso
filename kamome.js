/*
kamome.js slideshow 1.12

The MIT License

Copyright (c) 2010 firstAudience.com : Keisuke Nakayama

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var kamome = function () {

    var configurations = [
	{
            elem_id : "top_slideshow",  	//画像リストを囲むdivのid（HTML上の値と同じ）
            slide_width : 950, 			//横サイズ（ピクセル値、数値のみ）
            slide_height : 400, 		//縦サイズ（ピクセル値、数値のみ）
            stay : 5000, 			//表示間隔（ミリ秒：1000 = 1秒）
            fade_pace : 60, 			//トランジション速度（ミリ秒）10 ~ 100が適当
            controll_panel : false, 		//コントロールパネルの表示／非表示 true or false
            panel_font_size : '76.92%', 	//コントロールパネルの文字サイズ（単位はCSSの記法に準じます、%, em, px等）
            play :  true, 			//自動再生 true or false
            to : true, 				//再生方向 true or false
            elem_class_name : "slideshow" 	//画像リストを囲むdivのclass値。通常は変更しないでください
	}
    ];

    var setSlideshow = function (config) {

        var iInc = function (bool) {
            if (bool === true) {
                if (slideshow.current < slideshow.play_list.length - 1) {
                    slideshow.current += 1;
                } else if (slideshow.current === slideshow.play_list.length - 1) {
                    slideshow.current = 0;
                }
            } else if (bool === false) {
                if (slideshow.current > 0) {
                    slideshow.current -= 1;
                } else if (slideshow.current === 0) {
                    slideshow.current = slideshow.play_list.length - 1;
                }
            }
        }

        var getPlayList = function (obj_slideshow) {
            var results = [];

            dom.walk_the_DOM(obj_slideshow.target_node, function (node) {
                if (node.nodeType === 1) {
                    if (node.tagName === 'LI') {
                            results.push(node);
                    } else if (node.tagName === 'A') {
                            results[results.length - 1].href = node.getAttribute('href');
                            results[results.length - 1].rel = node.getAttribute('rel');
                    } else if (node.tagName === 'IMG') {
                            results[results.length - 1].img = node;
                            results[results.length - 1].alt = node.getAttribute('alt');
                    }
                }
            });

            for (var i = 0; i < results.length; i += 1) {
                if (i === 0) {
                    results[i].back = results[results.length - 1];
                    results[i].foth = results[i + 1];
                } else if (i === results.length -1) {
                    results[i].back = results[i - 1];
                    results[i].foth = results[0];
                } else {
                    results[i].back = results[i - 1];
                    results[i].foth = results[i + 1];
                }
            }

            obj_slideshow.play_list = results;
        }

        var playSlides = function fade (obj_slideshow) {
            if (obj_slideshow.play === false) {
                return;
            } else if (obj_slideshow.op_level > 0) {
                obj_slideshow.op_level -= 0.5;
                dom.setStyleOpacity(obj_slideshow.play_list[obj_slideshow.current], obj_slideshow.op_level);
                obj_slideshow.play_timer = setTimeout(function () {
                    fade(obj_slideshow);
                }, obj_slideshow.fade_pace);
            } else {
                obj_slideshow.op_level = obj_slideshow.op_level_reset;
                dom.setStyleOpacity(obj_slideshow.play_list[obj_slideshow.current], obj_slideshow.op_level_reset);
                iInc(obj_slideshow.to);
                setSlides(obj_slideshow);
                if (obj_slideshow.controll_panel) {
                    obj_slideshow.loadStatus();
                }
                obj_slideshow.play_timer = setTimeout(function () {
                    fade(obj_slideshow);
                }, obj_slideshow.stay);
            }
            return;
        };

        var preparation = function (obj_slideshow) {
            obj_slideshow.op_level = obj_slideshow.op_level_reset;
            obj_slideshow.play_list[obj_slideshow.current].style.zIndex = '1';
            dom.setStyleOpacity(obj_slideshow.play_list[obj_slideshow.current], obj_slideshow.op_level_reset);
            obj_slideshow.play_list[obj_slideshow.current].foth.style.zIndex = '1';
            obj_slideshow.play_list[obj_slideshow.current].foth.style.visibility = 'hidden';
            dom.setStyleOpacity(obj_slideshow.play_list[obj_slideshow.current].foth, obj_slideshow.op_level_reset);
            obj_slideshow.play_list[obj_slideshow.current].back.style.zIndex = '1';
            obj_slideshow.play_list[obj_slideshow.current].back.style.visibility = 'hidden';
            dom.setStyleOpacity(obj_slideshow.play_list[obj_slideshow.current].back, obj_slideshow.op_level_reset);
        }

        var setSlides = function (obj_slideshow) {
            if (obj_slideshow.to !== false) {
                obj_slideshow.play_list[obj_slideshow.current].back.style.zIndex = '1';
                obj_slideshow.play_list[obj_slideshow.current].back.style.visibility = 'hidden';
                obj_slideshow.play_list[obj_slideshow.current].style.zIndex = '3';
                obj_slideshow.play_list[obj_slideshow.current].style.visibility = 'visible';
                obj_slideshow.play_list[obj_slideshow.current].foth.style.zIndex = '2';
                obj_slideshow.play_list[obj_slideshow.current].foth.style.visibility = 'visible';
            } else {
                obj_slideshow.play_list[obj_slideshow.current].foth.style.zIndex = '1';
                obj_slideshow.play_list[obj_slideshow.current].foth.style.visibility = 'hidden';
                obj_slideshow.play_list[obj_slideshow.current].style.zIndex = '3';
                obj_slideshow.play_list[obj_slideshow.current].style.visibility = 'visible';
                obj_slideshow.play_list[obj_slideshow.current].back.style.zIndex = '2';
                obj_slideshow.play_list[obj_slideshow.current].back.style.visibility = 'visible';
            }
        };

        var setControll = function (obj_slideshow) {

            obj_slideshow.checkReverse = function () {
                obj_slideshow.to = !obj_slideshow.to;
                clearTimeout(obj_slideshow.play_timer);
                preparation(obj_slideshow);
                setSlides(obj_slideshow);
                panel.reverse_check.className = obj_slideshow.to === true ? 'reverse_off' : 'reverse_on';
                obj_slideshow.play_timer = setTimeout(function () {
                    playSlides(obj_slideshow);
                }, obj_slideshow.stay);
            };

            obj_slideshow.togglePlay = function (e) {
                var et = e.target || e.srcElement;
                var er = e.relatedTarget || e.toElement;
                if (et.className === 'pause_to_play') {
                    clearTimeout(obj_slideshow.play_timer);
                    obj_slideshow.play = true;
                    obj_slideshow.loadStatus();
                    obj_slideshow.play_timer = setTimeout(function () {
                       playSlides(obj_slideshow);
                    }, 0);
                } else if (et.className === 'play_to_pause') {
                    obj_slideshow.play = false;
                    obj_slideshow.loadStatus();
                    clearTimeout(obj_slideshow.play_timer);
                }
            };

            obj_slideshow.toNext = function (e) {
                clearTimeout(obj_slideshow.play_timer);
                preparation(obj_slideshow);
                iInc(true);
                setSlides(obj_slideshow);
                obj_slideshow.loadStatus();
                obj_slideshow.play_timer = setTimeout(function () {
                    playSlides(obj_slideshow);
                }, obj_slideshow.stay);
            };

            obj_slideshow.toPrevious = function (e) {
                clearTimeout(obj_slideshow.play_timer);
                preparation(obj_slideshow);
                iInc(false);
                setSlides(obj_slideshow);
                obj_slideshow.loadStatus();
                obj_slideshow.play_timer = setTimeout(function () {
                    playSlides(obj_slideshow);
                }, obj_slideshow.stay);
            };

            obj_slideshow.openURL = function () {
                if (obj_slideshow.play_list[obj_slideshow.current].href) {
                    if (obj_slideshow.play_list[obj_slideshow.current].rel === 'newWin') {
                        window.open(obj_slideshow.play_list[obj_slideshow.current].href);
                    } else {
                        window.location = obj_slideshow.play_list[obj_slideshow.current].href;
                    }
                    return true;
                } else {
                    return false;
                }
            };

            obj_slideshow.loadStatus = function () {
                if (obj_slideshow.play_list[obj_slideshow.current].href) {
                    caption_icon.className = (obj_slideshow.play_list[obj_slideshow.current].rel === 'newWin' ? 'newWin' : 'normal');
                } else {
                    caption_icon.className = '';
                }
                caption_text.innerHTML = obj_slideshow.play_list[obj_slideshow.current].alt || 'untitled...';
                nombre_text.nodeValue = (obj_slideshow.current + 1) + ' / ' + obj_slideshow.play_list.length;
                panel.play.className = obj_slideshow.play ? 'play_to_pause' : 'pause_to_play';
            };

            obj_slideshow.show_panel = function () {
                obj_slideshow.show_timer = setTimeout(function () {
                    panel.style.display = 'block';
                }, 100);
                clearTimeout(obj_slideshow.hide_timer);
            };

            obj_slideshow.hide_panel = function () {
                obj_slideshow.hide_timer = setTimeout(function () {
                    panel.style.display = 'none';
                }, 100);
                clearTimeout(obj_slideshow.show_timer);
            };

            obj_slideshow.target_node.mask = document.createElement('DIV');

            var mask = obj_slideshow.target_node.mask;
            mask.className = 'mask';
            mask.style.width = obj_slideshow.slide_width;
            mask.style.height = obj_slideshow.slide_height;

            var panel = document.createElement('DIV');
            var side = document.createElement('DIV');
            var info_disp = document.createElement('P');
            var caption = document.createElement('STRONG');
            var caption_text = document.createElement('SPAN');
            var caption_icon = document.createElement('SPAN');
            var nombre_text = document.createTextNode('0 / 0');
            var controll = document.createElement('UL');
            panel.play = document.createElement('LI');
            panel.reverse_check = document.createElement('LI');
            panel.next = document.createElement('LI');
            panel.previous = document.createElement('LI');
            panel.nombre = document.createElement('LI');

            panel.play.innerHTML = '<span>Play or Pause</span>';
            panel.reverse_check.innerHTML = '<span>Reverse</span>';
            panel.next.innerHTML = '<span>forth</span>';
            panel.previous.innerHTML = '<span>back</span>';
            caption_icon.innerHTML = '&nbsp;'

            panel.className = 'panel';
            panel.play.className = 'play_to_pause';
            panel.reverse_check.className = 'reverse_off';
            panel.next.className = 'foth';
            panel.previous.className = 'back';
            panel.nombre.className = 'nombre';
            info_disp.className = 'info_disp';

            panel.nombre.style.fontSize = obj_slideshow.panel_font_size;
            info_disp.style.fontSize = obj_slideshow.panel_font_size;

            caption.appendChild(caption_icon);
            caption.appendChild(caption_text);
            info_disp.appendChild(caption);
            panel.appendChild(info_disp);
            controll.appendChild(panel.previous);
            controll.appendChild(panel.next);
            panel.nombre.appendChild(nombre_text);
            controll.appendChild(panel.nombre);
            controll.appendChild(panel.play);
            controll.appendChild(panel.reverse_check);
            panel.appendChild(controll);
            mask.appendChild(panel);

            obj_slideshow.target_node.appendChild(mask);

            dom.addListener(mask, 'mouseover', obj_slideshow.show_panel, false);
            dom.addListener(mask, 'mouseout', obj_slideshow.hide_panel, false);
            dom.addListener(panel.reverse_check, 'mouseup', obj_slideshow.checkReverse, false);
            dom.addListener(panel.play, 'mouseup', obj_slideshow.togglePlay, false);
            dom.addListener(panel.next, 'mouseup', obj_slideshow.toNext, false);
            dom.addListener(panel.previous, 'mouseup', obj_slideshow.toPrevious, false);
            dom.addListener(caption, 'click', obj_slideshow.openURL, false);

        }

        var slideshow = {
            target_node : function () {
                var elem;
                elem = document.getElementById(config.elem_id);
                return elem;
            }(),
            elem_id :		config.elem_id	|| 'top_slideshow',
            slide_width :   	config.slide_width ? (parseInt(config.slide_width, 10) + 'px') : '640px',
            slide_height :		config.slide_width ? (parseInt(config.slide_height, 10) + 'px') : '480px',
            panel_font_size :	config.panel_font_size || '100%',
            stay :  		config.stay || 5000,
            fade_pace :		config.fade_pace || 60,// on a millisecond basis.
            controll_panel :	(config.controll_panel || config.controll_panel === undefined) ? true : false,
            play :			(config.play || config.play === undefined) ? true : false,
            to :			(config.to || config.to === undefined) ? true : false,
            elem_class_name :	config.elem_class_name || 'slideshow',
            play_list : [],
            show_timer : {},
            hide_timer : {},
            current : 0,
            i : 0,
            op_level : 10,
            op_level_reset : 10,
            play_timer : {},
            start : function () {
                var that = this;
                this.play_timer = setTimeout(function () {
                    playSlides(that);
                }, that.stay);
            },
            _getPlayList : function () {
                getPlayList(this);
            },
            _setSlides : function () {
                setSlides(this);
            },
            _setControll : function () {
                setControll(this);
            }

        }

        slideshow._getPlayList();
        slideshow._setSlides();

        if (slideshow.controll_panel !== false) {
            slideshow._setControll();
            slideshow.loadStatus();
        }

        if (slideshow.play !== false) {
            slideshow.start();
        }

    };

    var dom = {
        walk_the_DOM : function walk(node, func) {
            func(node);
            node = node.firstChild;
            while (node) {
                walk(node, func);
                node = node.nextSibling;
            }
        },
        setStyleOpacity : function (elem, palam) {
            elem.style.filter = 'alpha(opacity=' + (palam * 10) + ')';
            elem.style.MozOpacity = palam / 10;
            elem.style.opacity = palam / 10;
        },
        addListener : function (elem, eventType, func, cap) {
            if (elem.addEventListener) {
                elem.addEventListener(eventType, func, cap);
            } else if (elem.attachEvent) {
                elem.attachEvent('on' + eventType, func);
            } else {
                alert('Sorry. This Page does not support your browser. ');
                return false;
            }
            return elem;
        },
        contentLoaded : function (callback) {
            if (/WebKit/i.test(navigator.userAgent)) {
                var _timer = setInterval(function() {
                    if (/loaded|complete/.test(document.readyState)) {
                        clearInterval(_timer);
                        callback();
                    }
                }, 10);
            } else if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", callback, false);
            } else if (document.all) {
                document.write("<script id=__ie_onload defer src=javascript:void(0)><\/script>");
                var script = document.getElementById("__ie_onload");
                script.onreadystatechange = function() {
                  if (this.readyState == "complete") {
                    callback();
                  }
                };
            } else {
                return;
            }
        },
        removeListener : function (elem, eventType, func, cap) {
            if (elem.removeEventListener) {
                elem.removeEventListener(eventType, func, cap);
            } else if (elem.detachEvent) {
                elem.detachEvent('on' + eventType, func);
            } else {
                return false;
            }
            return elem;
        }
    };


    // create a new style sheet
    var styleTag = document.createElement("style");
    styleTag.setAttribute("type","text/css")
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(styleTag);

    for (var i = 0; i < configurations.length; i++) {
        var def = '#' + configurations[i].elem_id + '{width:' + configurations[i].slide_width + 'px;height:' + configurations[i].slide_height + 'px;overflow:hidden;}\n'
        if (styleTag.styleSheet) {
                styleTag.styleSheet.cssText += def;
            }
            else {
                var styles = document.createTextNode(def);
                styleTag.appendChild(styles);
            }
    }


    dom.contentLoaded(function(){
        for (var i = 0; i < configurations.length; i++) {
            var tgt_node = document.getElementById(configurations[i].elem_id);
            if ((tgt_node && tgt_node.nodeType) === 1) {
                setSlideshow(configurations[i]);
            }
        }
    });

}();
