$(document).ready(function() {

    d3.selectAll(".maincat > .list > li").on("click", function() {
        switch (this.getAttribute("data-value")){
            case "Art":
                d3.select(".artDiv").style("display", "inline-block");
                break;
            case "Comics":
                d3.select(".comicsDiv").style("display", "inline-block");
                break;
            case "Crafts":
                d3.select(".craftsDiv").style("display", "inline-block");
                break;
            case "Dance":
                d3.select(".danceDiv").style("display", "inline-block");
                break;
            case "Design":
                d3.select(".designDiv").style("display", "inline-block");
                break;
            case "Fashion":
                d3.select(".fashionDiv").style("display", "inline-block");
                break;
            case "Film and Video":
                d3.select(".filmDiv").style("display", "inline-block");
                break;
            case "Food":
                d3.select(".foodDiv").style("display", "inline-block");
                break;
            case "Games":
                d3.select(".gamesDiv").style("display", "inline-block");
                break;
            case "Journalism":
                d3.select(".journalDiv").style("display", "inline-block");
                break;
            case "Music":
                d3.select(".musicDiv").style("display", "inline-block");
                break;
            case "Photography":
                d3.select(".photoDiv").style("display", "inline-block");
                break;
            case "Publishing":
                d3.select(".publishDiv").style("display", "inline-block");
                break;
            case "Technology":
                d3.select(".techDiv").style("display", "inline-block");
                break;
            case "Theater":
            d3.select(".theaterDiv").style("display", "inline-block");
                break;

        }
    });

    document.getElementById("asdf").addEventListener("submit", () => {
        new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", '/api/compute');
            xhr.send(new FormData(document.getElementById("asdf")));
            xhr.onload = () => {
                alert(xhr.responseText);
                resolve(xhr.responseText);
            };
            xhr.error = () => reject();
        });
        return false;
    });
});






function isInputNumber(event){
    let ch = String.fromCharCode(event.which);
    if(!(/[0-9]/.test(ch))){
        event.preventDefault();
    }
}