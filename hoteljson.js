let axios = require("axios");
let cheerio = require("cheerio");
let fs = require("fs");

axios
  .get("https://www.hyatt.com/explore-hotels/partial?regionGroup=6-Australia&categories=0&brands=")
  .then(
    response => {
      if (response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);
        var hyattHotelList = [];

        $(".properties")
          .find(".property")
          .each(function(i, elem) {
            hyattHotelList.push({
              hotel: $(elem)
                .text()
                .trim(),
              url: $(elem)
                .find(".b-text_copy-3")
                .attr("href")
            });
          });

        let hyattHotelListTrimmed = hyattHotelList.filter(n => n != undefined);
        fs.writeFile("hyattHotelList.json", JSON.stringify(hyattHotelList, null, 4), err => {
          console.log("File successfully written!");
        });
      }
    },
    error => console.log(error)
  );
