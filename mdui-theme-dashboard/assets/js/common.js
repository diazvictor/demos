/*jshint esversion: 8 */
// autoComplete.js on type event emitter
 document.querySelector("#search").addEventListener("autoComplete", function(event) {
    console.log(event.detail);
});

// The autoComplete.js Engine instance creator
const autoCompletejs = new autoComplete({
    data: {
        src: async function() {
            // Loading placeholder text
            document.querySelector("#search").setAttribute("placeholder", "Loading...");
            // Fetch External Data Source
            const query = document.querySelector("#search").value;
			
            const source = await fetch(`/assets/js/file.json`);
            const data = await source.json();
            return data;
        },
        key: ["title"],
        cache: false
    },
    // query: {
        // manipulate: function(query) {
            // return query.replace("@pizza", "burger");
        // },
    // },
    trigger: {
        event: ["input"]
    },
    placeHolder: "Buscar",
    searchEngine: function (query, record){
		return `<b>${record}</b>`;
	},
    highlight: true,
    maxResults: 5,
    resultsList: {
        render: true
    },
    onSelection: function(feedback) {
        const selection = feedback.selection.value.title;
        // Render selected choice to selection div
        //document.querySelector(".selection").innerHTML = selection;
        // Clear Input
        document.querySelector("#search").value = "";
        // Change placeholder with the selected value
        // document.querySelector("#autoComplete").setAttribute("placeholder", selection);
        document.querySelector("#search").value = selection;
        // Concole log autoComplete data feedback
        //console.log(feedback);
        // window.location.href = '/search/' +  selection;
    },
});

// function search_media(e){
	// var key = e.keyCode || e.which;
	// let search = document.querySelector("#search").value;
	// if ( key == 13 ){
		// if (search !== '') {
			// window.location.href = '/search/' +  search;
		// }
	// }
// }

// document.querySelector("#btn_search").addEventListener("click", function(event) {
    // let search = document.querySelector("#search").value;
    // if (search !== '') {
		// window.location.href = '/search/' +  search;
	// }
// });
