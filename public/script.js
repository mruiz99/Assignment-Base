async function windowActions() {

    const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
    const cities = [];


    fetch(endpoint)
      .then(blob => blob.json())
      .then(data => cities.push(...data))

    console.log(data)


    console.log('window loaded');
    const form = document.querySelector('.userform');
    const search = document.querySelector('#city')

    const request = await fetch('/api');
    const data = await request.json();

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log('submit fired', search.value)

        const filtered = data.filter((record) => record.city.toUppercase() === search.value.toUpperCase());
    });

      search.addEventListener('input', (event) => {
          console.log('input', event.target.value);
      });
  }