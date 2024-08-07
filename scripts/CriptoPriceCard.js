      callApiCriptoPrices();
      setInterval(() => {
        callApiCriptoPrices();
      }, 5000)

      async function callApiCriptoPrices() {
        await fetch("https://dev.bcxcorretora.com.br/api/prices", {
          method: "GET",
          headers: {
            "Content-type": "application/json"
          }
        }).then((res) => {
          return res.json()
        }).then((data) => {
          createCardCripto(data)
        })
        setInterval(callApiCriptoPrices, 10000)
      }


      function createCardCripto(data) {
        const bitcoinPrice = document.querySelector('.bitcoin-price');
        const bitcoinVariation = document.querySelector('.bitcoin-variation');

        const ethereumPrice = document.querySelector('.ethereum-price');
        const ethereumVariation = document.querySelector('.ethereum-variation');

        const tetherPrice = document.querySelector('.tether-price');
        const tetherVariation = document.querySelector('.tether-variation');

        if(data[0].variation < 0) {
          bitcoinVariation.classList.add('variation-negative');
          bitcoinVariation.classList.add('back-variation-negative');
        }
        if(data[1].variation < 0) {
          ethereumVariation.classList.add('variation-negative');
          ethereumVariation.classList.add('back-variation-negative');
        }
        if(data[2].variation < 0) {
          tetherVariation.classList.add('variation-negative');
          tetherVariation.classList.add('back-variation-negative');
        }

        bitcoinPrice.innerHTML = (data[0].price * data[2].price).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
        bitcoinVariation.innerHTML = data[0].variation.toFixed(2) + "%";

        ethereumPrice.innerHTML = (data[1].price * data[2].price).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
        ethereumVariation.innerHTML = data[1].variation.toFixed(2) + "%";

        tetherPrice.innerHTML = (data[2].price).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
        tetherVariation.innerHTML = data[2].variation.toFixed(2) + "%"
      }
