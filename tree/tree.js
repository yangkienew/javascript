(function($) {
    var default_tree_node = "../tree/resource/default_tree_node.gif";
    var default_tree_leaf = "../tree/resource/default_tree_leaf1.gif";
    var plus = "../tree/resource/plus.gif";
    var minus = "../tree/resource/minus.gif";

    $.fn.tree = function() {/*{plus: "a.gig", minus: "b.gif", root:{id: "id", name: "Global", icon: "c.gif", children: [{id: "id", name: "c1", icon: "c1.gif"}, {id:"id", name: "c2", icon: "c2.gif"}]}*/
        var createNode = function(node) {
            var _hasChildren = node["children"] && node["children"].length > 0;

            var ul_tree_node = $("<ul></ul>").addClass("tree-node");
            if (!_hasChildren)
                ul_tree_node.addClass("leaf");
            if (node["id"])
                ul_tree_node.attr("id", node["id"]);

            var li_tree_node_self = $("<li></li>").appendTo(ul_tree_node).addClass("tree-node-self");
            if (_hasChildren)
                $("<img />").appendTo(li_tree_node_self).addClass("tree-node-minus").attr("src", minus);
            var _icon = node["icon"] || (_hasChildren ? default_tree_node : default_tree_leaf);
            var icon_img = $("<img src=\"" + _icon + "\"/>").appendTo(li_tree_node_self).addClass("tree-node-icon");
            var _name = node["name"] ? node["name"] : "";
            $("<span>" + _name + "</span>").appendTo(li_tree_node_self).addClass("tree-node-text");

            if (_hasChildren) {
                var li_tree_node_children = $("<li></li>").appendTo(ul_tree_node).addClass("tree-node-children");
                var ul_tree_node_list = $("<ul></ul>").appendTo(li_tree_node_children).addClass("tree-node-list");
                for (var i = 0; i < node["children"].length; ++i) {
                    $("<li></li>").appendTo(ul_tree_node_list).addClass("tree-node-list-node").append(createNode(node["children"][i]));
                }
            }
            return ul_tree_node;
        }

        this.appendChild = function(nodes, parent) {
            if (!parent)
                parent = this;
            parent.append(createNode(nodes));
        }

        this.insertBefore = function(node, parent_id, index) {
        }

        this.insertAfter = function(node, parent_id, index) {
        }

        this.toggleChild = function(tree_node_self) {//this is the tree-node-self li
            tree_node_self.next().slideToggle("fast", function() {
                tree_node_self.children().first().toggleClass("tree-node-plus").toggleClass("tree-node-minus");
                if (tree_node_self.children().first().hasClass("tree-node-plus"))
                    tree_node_self.children().first().attr("src", plus);
                else if (tree_node_self.children().first().hasClass("tree-node-minus"))
                    tree_node_self.children().first().attr("src", minus);
            });
        }

        this.click(function(e) {
            var $target = $(e.target);
            if (!$target)
                return;

            if ($target.hasClass("tree-node-plus") || $target.hasClass("tree-node-minus")) {
                _$this.toggleChild($target.parent());
            }
            else {
            }
        });

        var _id = this.selector.substr(1);
        if (arguments.length > 0) {
            this.appendChild(arguments[0], null);
        }
        var _$this = this;
        return this;
    }

} (jQuery));