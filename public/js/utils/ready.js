$(document).ready(function(){
    $("#select-draw-type").on('change', function () {
        let type = $('#select-draw-type').val();
        setHtmlToMainList(type);
    });
    sessionDataSetPlotting();
    progressAlpha();
    setPositionPoint();
    setHtmlToMainList('pointLabel');
});