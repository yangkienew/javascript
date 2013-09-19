(function($) {
    $.fn.splitPanel = function() {
        var _style = "horizontal";
        var _panel1, _panel2;
        var _this = this;
        if (arguments.length == 1) {
            if (arguments[0].style)
                _style = arguments[0].style;
            if (arguments[0].width)
                _this.width(arguments[0].width);
            if (arguments[0].height)
                _this.height(arguments[0].height);
        }

        _panel1 = _this.children().first();
        _panel2 = _this.children().first().next();
        if (_style == "vertical") {
            var p = {
                handles: "s",
                maxHeight: _this.innerHeight() - 50,
                resize: function(event, ui) {
                    onResize(event, ui)
                }
            };
            _panel1.outerHeight(Math.floor(_this.innerHeight() / 3)).outerWidth(_this.innerWidth()).resizable(p);
            _panel2.outerHeight(_this.innerHeight() - _panel1.outerHeight()).outerWidth(_this.innerWidth());
        }
        else {
            _panel1.css("float", "left");
            _panel2.css("float", "left");
            var p = {
                handles: "e",
                maxWidth: _this.innerWidth() - 50,
                resize: function(event, ui) {
                    onResize(event, ui)
                }
            };
            _panel1.outerWidth(Math.floor(_this.innerWidth() / 3)).outerHeight(_this.innerHeight()).resizable(p);
            _panel2.outerWidth(_this.innerWidth() - _panel1.outerWidth()).outerHeight(_this.innerHeight());
        }

        function onResize(event, ui) {
            if (_style == "vertical") {
                _panel2.outerHeight(_this.innerHeight() - _panel1.outerHeight());
            }
            else {
                _panel2.outerWidth(_this.innerWidth() - _panel1.outerWidth());
            }
        }

        return this;
    }
} (jQuery));
