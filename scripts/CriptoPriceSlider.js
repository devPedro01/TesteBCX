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
          createSliderCripto(data)
        }).catch((err) => {
          console.log(err);
        })
      }

      function createSliderCripto(data) {
        const bitcoinPrice = document.querySelectorAll('.bitcoin-price');
        const bitcoinVariation = document.querySelectorAll('.bitcoin-variation');

        const ethereumPrice = document.querySelectorAll('.ethereum-price');
        const ethereumVariation = document.querySelectorAll('.ethereum-variation');

        const tetherPrice = document.querySelectorAll('.tether-price');
        const tetherVariation = document.querySelectorAll('.tether-variation');

        const variationPositive = document.querySelectorAll(".variation-positive");
        const variationNegative = document.querySelectorAll(".variation-negative");

        if(data[0].variation < 0) {
          bitcoinPrice[0].classList.add('variation-negative');
          bitcoinPrice[1].classList.add('variation-negative');
          bitcoinVariation[0].classList.add('variation-negative');
          bitcoinVariation[1].classList.add('variation-negative');
          variationPositive[0].setAttribute("hidden", "hidden");
          variationPositive[3].setAttribute("hidden", "hidden");
          variationNegative[0].removeAttribute("hidden");
          variationNegative[3].removeAttribute("hidden");
        }
        if(data[1].variation < 0) {
          ethereumPrice[0].classList.add('variation-negative');
          ethereumPrice[1].classList.add('variation-negative');
          ethereumVariation[0].classList.add('variation-negative');
          ethereumVariation[1].classList.add('variation-negative');
          variationPositive[1].setAttribute("hidden", "hidden");
          variationPositive[4].setAttribute("hidden", "hidden");
          variationNegative[1].removeAttribute("hidden");
          variationNegative[4].removeAttribute("hidden");
        }
        if(data[2].variation < 0) {
          tetherPrice[0].classList.add('variation-negative');
          tetherPrice[1].classList.add('variation-negative');
          tetherVariation[0].classList.add('variation-negative');
          tetherVariation[1].classList.add('variation-negative');
          variationPositive[2].setAttribute("hidden", "hidden");
          variationPositive[5].setAttribute("hidden", "hidden");
          variationNegative[2].removeAttribute("hidden");
          variationNegative[5].removeAttribute("hidden");
        }

        bitcoinPrice[0].innerHTML = (data[0].price * data[2].price).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
        bitcoinPrice[1].innerHTML = (data[0].price * data[2].price).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
        bitcoinVariation[0].innerHTML = "(" + data[0].variation.toFixed(2) + "%)";
        bitcoinVariation[1].innerHTML = "(" + data[0].variation.toFixed(2) + "%)";

        ethereumPrice[0].innerHTML = (data[1].price * data[2].price).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
        ethereumPrice[1].innerHTML = (data[1].price * data[2].price).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
        ethereumVariation[0].innerHTML = "(" + data[1].variation.toFixed(2) + "%)";
        ethereumVariation[1].innerHTML = "(" + data[1].variation.toFixed(2) + "%)";

        tetherPrice[0].innerHTML = (data[2].price).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
        tetherPrice[1].innerHTML = (data[2].price).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
        tetherVariation[0].innerHTML = "(" + data[2].variation.toFixed(2) + "%)"
        tetherVariation[1].innerHTML = "(" + data[2].variation.toFixed(2) + "%)"
      }
