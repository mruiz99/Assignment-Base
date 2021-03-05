async function windowActions() { 
    console.log('window loaded');

    const form = document.querySelector('.userform');
    const search = document.querySelector('#city')

    const request = await fetch('/api');
    const data = await request.json();
    console.log(data);
    search.addEventListener('input', (event) => {
        console.log('input', event.target.value);
    });

      //const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
      //const cities = [];
  
  
      //fetch(endpoint)
        //.then(blob => blob.json())
        //.then(data => cities.push(...data))
  
    function findMatches(wordToMatch, cities) {
        return cities.filter(place => {
            // here we need to figure out if the city or state 		// MATCHES what was searched
            const regex = new RegExp(wordToMatch, 'gi');
            //'g' means global, 'i' means case insensitive
            return place.city.match(regex) || place.state.match(regex)
        });
    }

    function displayMatches(event) {
        alert("TEST")
        const matchArray = findMatches(event.target.value, cities);
        const html = matchArray.map(place => {
            const regex = new RegExp(event.target.value, 'gi');
            const cityName = place.city.replace(regex, '<span class="hl">${this.value}</span>')
            const stateName = place.state.replace(regex, '<span class="hl">${this.value}</span>')
            return `
                <li>
                    <span class="name">${place.city}, $place.state}</span>
                    <span class="population">${place.population}</span>
                </li>
            `;
        }).join('');
        suggestions.innerHTML = html;	
    }
    
    const searchInput = document.querySelector('.userform');
    const suggestions = document.querySelector('.textarea');
    
    searchInput.addEventListener('change', displayMatches);
    searchInput.addEventListener('keyup', (evt) => { 
        displayMatches(evt) });

}

window.onload = windowActions;