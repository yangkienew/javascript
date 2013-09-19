(function($) {
    $.fn.listView = function() {
        var startIndex = 0;
        var _this = this;
        var _body = _this.children("#body");
        var _header = _this.children("#header");
        _header.sortable({
            placeholder: "placeholder",
            start: function(e, ui) {
                var w = ui.item.outerWidth();
                ui.placeholder.outerWidth(w);
                startIndex = ui.item.index() + 1;
            },
            stop: function(e, ui) {
                var ele = $(_this.selector + " #body li:nth-child(" + startIndex + ")");
                ele.remove();
                if (ui.item.index() == 0) {
                    ele.insertBefore(_body.children().first());
                }
                else {
                    ele.insertAfter($(_this.selector + " #body li:nth-child(" + (ui.item.index()) + ")"));
                }
            }
        });

        _this.click(function(e) {
            var target = $(e.target);
            $(".cell").removeClass("highlight");
            if (target.hasClass("cell")) {
                if (e.ctrlKey) {
                    var index = target.index();
                    var row = _this.aRow(index);
                    for (var i = 0; i < row.length; ++i)
                        row[i].addClass("selected");
                }
                else if (e.shiftKey) {
                }
                else {
                    $(".cell").removeClass("selected");
                    var index = target.index();
                    var row = _this.aRow(index);
                    for (var i = 0; i < row.length; ++i)
                        row[i].addClass("selected");
                }
                target.addClass("highlight");
            }
        });

        _this.aRow = function(index) {
            var row = [];
            var next = _body.children().first();
            while (next.length > 0) {
                var i = 0;
                var c = next.children().first();
                while (c.length > 0) {
                    if (i == index) {
                        row.push(c)
                        break;
                    }
                    c = c.next();
                    ++i;
                }
                next = next.next();
            }
            return row;
        }

        _this.addRow = function(row) {//{col_name: value, col_name: value...}
            var c = _body.children().first();
            while (c.length > 0) {
                $("<div>" + row[c.attr("id")] + "</div>").appendTo(c).addClass("cell");
                c = c.next();
            }
        }

        _header.disableSelection();
        _body.children().children().addClass("cell");

        $(_this.selector + " #header li").resizable({ handles: "e" });

        for (var i = 1; i <= 7; ++i) {
            var o = $(_this.selector + " #header #h_c" + i).resizable({ handles: "e", alsoResize: "#body #b_c" + i });
            $(_this.selector + " #body #b_c" + i).outerWidth(o.outerWidth());

        }

        return _this;
    }
} (jQuery));
