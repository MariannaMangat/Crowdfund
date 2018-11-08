$(document).ready(function() {

    d3.selectAll(".maincat > .list > li").on("click", function() {
        d3.selectAll(".displayed").classed("displayed", false).classed("hidden", true);
        
        switch (this.getAttribute("data-value")){
            case "Art":
                d3.select(".artDiv").classed("displayed", true).classed("hidden", false);
                break;
            case "Comics":
                d3.select(".comicsDiv").classed("displayed", true).classed("hidden", false);
                break;
            case "Crafts":
                d3.select(".craftsDiv").classed("displayed", true).classed("hidden", false);
                break;
            case "Dance":
                d3.select(".danceDiv").classed("displayed", true).classed("hidden", false);
                break;
            case "Design":
                d3.select(".designDiv").classed("displayed", true).classed("hidden", false);
                break;
            case "Fashion":
                d3.select(".fashionDiv").classed("displayed", true).classed("hidden", false);
                break;
            case "Film and Video":
                d3.select(".filmDiv").classed("displayed", true).classed("hidden", false);
                break;
            case "Food":
                d3.select(".foodDiv").classed("displayed", true).classed("hidden", false);
                break;
            case "Games":
                d3.select(".gamesDiv").classed("displayed", true).classed("hidden", false);
                break;
            case "Journalism":
                d3.select(".journalDiv").classed("displayed", true).classed("hidden", false);
                break;
            case "Music":
                d3.select(".musicDiv").classed("displayed", true).classed("hidden", false);
                break;
            case "Photography":
                d3.select(".photoDiv").classed("displayed", true).classed("hidden", false);
                break;
            case "Publishing":
                d3.select(".publishDiv").classed("displayed", true).classed("hidden", false);
                break;
            case "Technology":
                d3.select(".techDiv").classed("displayed", true).classed("hidden", false);
                break;
            case "Theater":
                d3.select(".theaterDiv").classed("displayed", true).classed("hidden", false);
                break;

        }
    });

    document.getElementById("asdf").addEventListener("submit", () => {
        new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", '/api/compute');
            xhr.send(new FormData(document.getElementById("asdf")));
            xhr.onload = () => {
                d3.select("#result").text(xhr.responseText).classed("hidden", false).classed("displayed", true);
                resolve(xhr.responseText);
            };
            xhr.error = () => reject();
        });
        return false;
    });

    document.getElementById("reset").addEventListener("click", () => {
        d3.select("#result").classed("hidden", true).classed("displayed", false);
        d3.selectAll(".displayed").classed("hidden", true).classed("displayed", false);
        document.getElementById("goal_input").value = "";
        document.getElementById("backer_input").value = "";
    });
});






function isInputNumber(event){
    let ch = String.fromCharCode(event.which);
    if(!(/[0-9]/.test(ch))){
        event.preventDefault();
    }
}