/*
  From: https://github.com/jasondavies/newick.js
*/
function parseNewick(s) {
    var ancestors = [];
    var tree = {};
    var tokens = s.split(/\s*(;|\(|\)|,|:)\s*/);
    for (var i=0; i<tokens.length; i++) {
	var token = tokens[i];
	switch (token) {
        case '(': // new branchset
	    var subtree = {};
	    tree["children"] = [subtree];
	    ancestors.push(tree);
	    tree = subtree;
	    break;
        case ',': // another branch
	    var subtree = {};
	    ancestors[ancestors.length-1]["children"].push(subtree);
	    tree = subtree;
	    break;
        case ')': // optional name next
	    tree = ancestors.pop();
	    break;
        case ':': // optional length next
	    break;
        default:
	    var x = tokens[i-1];
	    if (x == ')' || x == '(' || x == ',') {
		tree["name"] = token;
	    } else if (x == ':') {
		tree["data"] = { "branch_length": parseFloat(token) };
	    }
	    if (tree["data"] == undefined) {
		tree["data"] = { "branch_length": 1 };
	    }
	}
    }
    return tree;
}
