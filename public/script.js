async function windowActions() { 
    console.log('window loaded');

    const form = document.querySelector('.userform');
    const search = document.querySelector('#city')
    const suggestions = document.querySelector('.suggestions');
    

    const results = [];
    const request = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    const data = await request.json()
    
    //console.log("INPUT", search);
    console.log(data);

    search.addEventListener('input', (event) => {
        console.log('input', event.target.value);
    });



      //const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  
  
      //fetch(endpoint)
        //.then(blob => blob.json())
        //.then(data => cities.push(...data))

    function findMatches(wordToMatch, data) {
        console.log("FINDMATCHES");
        return data.filter(place => {
            // here we need to figure out if the city or state 		// MATCHES what was searched
            const regex = new RegExp(wordToMatch, 'gi');
            //'g' means global, 'i' means case insensitive
            return place.city.match(regex) || place.state.match(regex)
        });
    }

    function displayMatches(event) {
        console.log("DISPLAYMATCHES");
        const matchArray = findMatches(event.target.value, data);
        const html = matchArray.map(place => {
            const regex = new RegExp(event.target.value, 'gi');
            const cityName = place.city.replace(regex, '<span class="hl">${event.target.value}</span>')
            const stateName = place.state.replace(regex, '<span class="hl">${event.target.value}</span>')
            return `
                <li>
                    <span class="name">${place.city}, $place.state}</span>
                    <span class="population">${place.population}</span>
                </li>
            `;
        }).join('');
        console.log("SUGGESTIONS");
        suggestions.innerHTML = html;
    }

    
    search.addEventListener('change', displayMatches);
    console.log("CHANGE");
    search.addEventListener('keyup', (evt) => { 
        displayMatches(evt)
        console.log("KEYUP")
    });

}

window.onload = windowActions;