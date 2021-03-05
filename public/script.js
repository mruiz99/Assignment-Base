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


    function unique(arr) {
        let result = [];
      
        for (let thing of arr) {
          if (!result.includes(thing)) {
            result.push(thing);
          }
        }
      
        return result;
      }
      
  
    
    function findMatches(wordToMatch, data) {
        return data.filter(place => {
            // here we need to figure out if the city or state 		// MATCHES what was searched
            const regex = new RegExp(wordToMatch, 'gi');
            //'g' means global, 'i' means case insensitive
            return place.city.match(regex) || place.state.match(regex)
        });
    }

    function displayMatches(event) {
        if (event.target.value.length > 0) {
        const matchArray = findMatches(event.target.value, data);
        const html = matchArray.map(place => {
            const regex = new RegExp(event.target.value, 'gi');
            const cityName = place.city.replace(regex, '<span class="hl">${event.target.value}</span>')
            const stateName = place.state.replace(regex, '<span class="hl">${event.target.value}</span>')
            return `
            
                <address class="column" style="background-image: linear-gradient(salmon, darkorange); width: 400px; margin-top: 25px;">
                    <li style="font-family: Righteous; font-size: 18px;">
                        <span class="name">${place.name}</span>
                    </li>
                    <li>
                        <span class="category">${place.category}</span>
                    </li>
                    <li>
                        <span class="address">${place.address_line_1}</span>
                    </li>
                    <li>
                        <span class="name">${place.city}, ${place.state}</span>
                    </li>
                    <li>
                        <span class="zipcode">${place.zip}</span>
                    </li>
                </address>
            
            `;
        }).join('');
        console.log("SUGGESTIONS");
        suggestions.innerHTML = html;
    } else {
        suggestions.innerHTML = "";
    }
    }

    
    search.addEventListener('change', displayMatches);
    search.addEventListener('keyup', (evt) => { 
        displayMatches(evt)
    });

}

window.onload = windowActions;