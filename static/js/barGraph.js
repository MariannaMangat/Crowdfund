const url = '/api/data'


fetch(url)
	.then(data=>{return data.json()})
	.then(results=>{
		// console.log(results);
		console.log(Object.keys(results))

		function init() {
			data = [{
				x: Object.keys(results["Art"]),
				y: Object.values(results["Art"]),
				type: "bar",
				marker: {color: '#a7cb00'},
				transforms: [{
					type: 'sort',
					target: 'y',
					order: 'descending'}]
			}];
			
			var barlayout = {
				barmode: "stack",
				yaxis: {title: 'Percent'},
				showlegend: false
			};
	
			var BAR = document.getElementById("bar_plot");
			Plotly.plot(BAR, data, barlayout);
		};
		// =============================================
		function updatePlotly(newx, newy) {
			var BAR = document.getElementById("bar_plot");
		
			// Note the extra brackets around 'newx' and 'newy'
			Plotly.restyle(BAR, "x", [newx]);
			Plotly.restyle(BAR, "y", [newy]);
		}
		
		// Only works when you try to switch the drop downs. Initially it'll be init, then after you click it'll be getData
		window.getData = function(dataset) {
		
			// Initialize empty arrays to contain our axes
			var x = [];
			var y = [];
		
			// Fill the x and y arrays as a function of the selected dataset
			switch (dataset) {
				case "Art": // we want this to be the same as the first data set up there
					x = Object.keys(results["Art"]),
					y = Object.values(results["Art"]);
					break;
				case "Comics": 
					x = Object.keys(results["Comics"]),
					y = Object.values(results["Comics"]);
					break;
				case "Crafts": 
					x = Object.keys(results["Crafts"]),
					y = Object.values(results["Crafts"]);
					break;
				case "Dance": 
					x = Object.keys(results["Dance"]),
					y = Object.values(results["Dance"]);
					break;
				case "Design": 
					x = Object.keys(results["Design"]),
					y = Object.values(results["Design"]);
					break;
				case "Fashion": 
					x = Object.keys(results["Fashion"]),
					y = Object.values(results["Fashion"]);
					break;
				case "Film & Video": 
					x = Object.keys(results["Film & Video"]),
					y = Object.values(results["Film & Video"]);
					break;
				case "Food": 
					x = Object.keys(results["Food"]),
					y = Object.values(results["Food"]);
					break;
				case "Games": 
					x = Object.keys(results["Games"]),
					y = Object.values(results["Games"]);
					break;
				case "Journalism": 
					x = Object.keys(results["Journalism"]),
					y = Object.values(results["Journalism"]);
					break;
				case "Music": 
					x = Object.keys(results["Music"]),
					y = Object.values(results["Music"]);
					break;
				case "Photography": 
					x = Object.keys(results["Photography"]),
					y = Object.values(results["Photography"]);
					break;
				case "Publishing": 
					x = Object.keys(results["Publishing"]),
					y = Object.values(results["Publishing"]);
					break;
				case "Technology": 
					x = Object.keys(results["Technology"]),
					y = Object.values(results["Technology"]);
					break;
				case "Theater": 
					x = Object.keys(results["Theater"]),
					y = Object.values(results["Theater"]);
					break;
				default:
					x = Object.keys(results["Art"]),
					y = Object.values(results["Art"]);
					break;
			};
		
			updatePlotly(x, y);
		};
		
		init();


	});