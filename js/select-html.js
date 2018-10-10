// ============= JS version-1  ==============

$(function () {

    var $cat = $("#category1"),
        $subcat = $(".subcat");

    var optgroups = {};

    $subcat.each(function (i, v) {
        var $e = $(v);
        var _id = $e.attr("id");
        optgroups[_id] = {};
        $e.find("optgroup").each(function () {
            var _r = $(this).data("rel");
            $(this).find("option").addClass("is-dyn");
            optgroups[_id][_r] = $(this).html();
        });
    });
    $subcat.find("optgroup").remove();

    var _lastRel;
    $cat.on("change", function () {
        var _rel = $(this).val();
        if (_lastRel === _rel) return true;
        _lastRel = _rel;
        $subcat.find("option").attr("style", "");
        $subcat.val("");
        $subcat.find(".is-dyn").remove();
        if (!_rel) return $subcat.prop("disabled", true);
        $subcat.each(function () {
            var $el = $(this);
            var _id = $el.attr("id");
            $el.append(optgroups[_id][_rel]);
        });
        $subcat.prop("disabled", false);
    });

    console.log("hello")

});





/////////////////////////////////////////////////
// ============= JS version-2  ==============
// var $select1 = $('#select1'),
//     $select2 = $('#select2'),
//     $options = $select2.find('option');

// $select1.on('change', function () {
//     $select2.html($options.filter('[value="' + this.value + '"]'));
// }).trigger('change');


// ============== HTML version-2 ( Use this code with JS version-2 )===========
// {/* <select>
//     <option value="0" selected>SUBCATEGORY</option>
//     <option value="1">Subcategory Art 1</option>
//     <option value="1">Subcategory Art 2</option>
//     <option value="2">Subcategory Comics 1</option>
//     <option value="2">Subcategory Comics 2</option>
//     <option value="3">Subcategory Crafts 1</option>
//     <option value="3">Subcategory Crafts 2</option>
//     <option value="4">Subcategory Dance 1</option>
//     <option value="4">Subcategory Dance 2</option>
// </select> */}