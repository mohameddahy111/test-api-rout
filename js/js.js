const all = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
let mealId = "";

// mealId
if (localStorage.itemId != null) {
  mealId = JSON.parse(localStorage.itemId);
} else {
  mealId = "";
}
const singlMeal = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${
  mealId ? mealId : "0"
}`;

const displayList = (list) => {
  let cardConu = document.createElement("div");
  cardConu.classList.add("col-lg-4", "gy-3", "rounded-4");
  let infoCard = document.createElement("div");
  infoCard.addEventListener("click", function () {
    let itemId = list.idMeal;
    localStorage.removeItem.itemId;
    localStorage.setItem("itemId", JSON.stringify(itemId));
    location.href = "/html/singlmeal.html";
  });
  infoCard.classList.add("position-relative", "rounded-4", "infoCard");
  let cardImg = document.createElement("div");
  let heroImag = document.createElement("img");
  heroImag.setAttribute("src", `${list.strMealThumb}`);
  heroImag.classList.add("w-100", "rounded-4");
  let hoverCard = document.createElement("div");
  hoverCard.classList.add("hoverCard");
  hoverCard.classList.add(
    "align-items-center",
    "d-flex",
    "justify-content-center"
  );

  let nameMeal = document.createElement("p");
  nameMeal.innerText = list.strMeal;

  cardImg.appendChild(heroImag);
  hoverCard.appendChild(nameMeal);
  infoCard.appendChild(cardImg);
  infoCard.appendChild(hoverCard);

  cardConu.appendChild(infoCard);
  $("#prodectRow").append(cardConu);
};
if (location.href.includes("index")) {
  $(window).ready(function () {
    const meal = async () => {
      await fetch(all)
        .then((res) => res.json())
        .then((res) => {
          res.meals.map((x) => {
            displayList(x);
          });
        });
    };

    meal();
  });
}

if (location.href.includes("singlmeal")) {
  $(window).ready(function () {
    const viewSinglelMeal = async () => {
      await fetch(singlMeal)
        .then((res) => res.json())
        .then((res) => {
          res.meals.map((x) => {
            singleMealInfo(x);
          });
        });
    };
    const singleMealInfo = (x) => {
      let recipes = [
        { name: x.strIngredient1, wight: x.strMeasure1 },
        { name: x.strIngredient2, wight: x.strMeasure2 },
        { name: x.strIngredient3, wight: x.strMeasure3 },
        { name: x.strIngredient4, wight: x.strMeasure4 },
        { name: x.strIngredient5, wight: x.strMeasure5 },
        { name: x.strIngredient6, wight: x.strMeasure6 },
        { name: x.strIngredient7, wight: x.strMeasure7 },
        { name: x.strIngredient8, wight: x.strMeasure8 },
        { name: x.strIngredient9, wight: x.strMeasure9 },
        { name: x.strIngredient10, wight: x.strMeasure10 },
        { name: x.strIngredient11, wight: x.strMeasure11 },
        { name: x.strIngredient12, wight: x.strMeasure12 },
        { name: x.strIngredient13, wight: x.strMeasure13 },
        { name: x.strIngredient14, wight: x.strMeasure14 },
        { name: x.strIngredient15, wight: x.strMeasure15 },
        { name: x.strIngredient16, wight: x.strMeasure16 },
        { name: x.strIngredient17, wight: x.strMeasure17 },
        { name: x.strIngredient18, wight: x.strMeasure18 },
        { name: x.strIngredient19, wight: x.strMeasure19 },
        { name: x.strIngredient20, wight: x.strMeasure20 },
      ];
      $("#heroImage").attr("src", x.strMealThumb);
      $("#mealName").text(x.strMeal);
      $("#text").text(x.strInstructions);
      $("#area").text(x.strArea);
      $("#category").text(x.strCategory);
      $("#source").click(function () {
        location.href = x.strSource;
      });
      $("#youtube").click(function () {
        location.href = x.strYoutube;
      });
      let newlist = recipes.filter(
        (item) => item.name !== "" && item.name !== null
      );
      newlist.map((item) => {
        let itemRecipe = document.createElement("li");
        let text = document.createElement("p");
        let wight = document.createElement("span");
        text.innerText = item.wight;
        text.classList.add("text-bold");
        wight.innerText = item.name;
        wight.classList.add("mx-1", "px-2");

        text.appendChild(wight);
        itemRecipe.appendChild(text);
        $("#recipesList").append(itemRecipe);
      });
    };

    viewSinglelMeal();
  });
}

if (location.href.includes("search")) {
  let searchName = document.getElementById("searchName");
  let searchLetter = document.getElementById("searchLetter");
  console.log(searchName);
  const searchByName = async (data) => {
    await fetch(data)
      .then((res) => res.json())
      .then((res) =>
        res.meals?.map((x) => {
          displayList(x);
        })
      );
  };

  searchName.addEventListener("input", function () {
    let input = "not fonud";
    if (searchName.value === "") {
      $("#prodectRow").html("");
    } else {
      input = searchName.value;
      let mealsName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;

      $("#prodectRow").html("");
      searchByName(mealsName);
    }
  });
  searchLetter.addEventListener("input", function () {
    let input = "not fonud";
    if (searchLetter.value === "") {
      $("#prodectRow").html("");
    } else {
      input = searchLetter.value;
      let letter = `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`;

      $("#prodectRow").html("");
      searchByName(letter);
    }
  });
}

if (location.href.includes("categories")) {
  const categoriesArray = [];

  $(window).ready(function () {
    const categoriesItems = () => {
      const allProdect = async () => {
        await fetch(all)
          .then((res) => res.json())
          .then((res) =>
            res.meals.map((x) => {
              categoriesArray.push(x.strCategory);
            })
          );
        let newList = new Set(categoriesArray);
        let finlArray = Array(...newList);
        finlArray.map((x) => {
          let cardConu = document.createElement("div");
          cardConu.classList.add("col-lg-4", "gy-3", "rounded-4");
          let textcard = document.createElement("div");
          textcard.classList.add("text-card", "m-5");

          let text = document.createElement("p");
          text.innerText = x;
          textcard.appendChild(text);
          cardConu.appendChild(textcard);
          $("#prodectRow").append(cardConu);

          cardConu.addEventListener("click", function () {
            input = x;
            const findCategories = async () => {
              $("#prodectRow").html("");
              await fetch(
                `https://www.themealdb.com/api/json/v1/1/filter.php?c=${input}`
              )
                .then((res) => res.json())
                .then((res) =>
                  res.meals.map((x) => {
                    displayList(x);
                  })
                );
            };
            findCategories();
          });
        });
      };
      allProdect();
    };
    categoriesItems();
  });
}
if (location.href.includes("area")) {
  const areaArray = [];

  $(window).ready(function () {
    const areaItems = () => {
      const allProdect = async () => {
        await fetch(all)
          .then((res) => res.json())
          .then((res) =>
            res.meals.map((x) => {
              areaArray.push(x.strArea);
            })
          );
        let newList = new Set(areaArray);
        let finlArray = Array(...newList);
        console.log(finlArray);
        finlArray.map((x) => {
          let cardConu = document.createElement("div");
          cardConu.classList.add("col-lg-4", "gy-3", "rounded-4");
          let textcard = document.createElement("div");
          textcard.classList.add("text-card", "m-5");

          let text = document.createElement("p");
          text.innerText = x;
          textcard.appendChild(text);
          cardConu.appendChild(textcard);
          $("#prodectRow").append(cardConu);

          cardConu.addEventListener("click", function () {
            input = x;
            const findArea = async () => {
              $("#prodectRow").html("");
              await fetch(
                `https://www.themealdb.com/api/json/v1/1/filter.php?a=${input}`
              )
                .then((res) => res.json())
                .then((res) =>
                  res.meals.map((x) => {
                    displayList(x);
                  })
                );
            };
            findArea();
          });
        });
      };
      allProdect();
    };
    areaItems();
  });
}
if (location.href.includes("ingredients")) {

  $(window).ready(function () {
          let input = "";

    const ingredients = async () => {
      await fetch(all)
        .then((res) => res.json())
        .then((res) => {
          res.meals.map((x) => {
            ingredientsiNFO(x);
          });
        });
    };
    const ingredientsiNFO = (x) => {
      list = [];
      let recipes = [
        { name: x.strIngredient1, wight: x.strMeasure1 },
        { name: x.strIngredient2, wight: x.strMeasure2 },
        { name: x.strIngredient3, wight: x.strMeasure3 },
        { name: x.strIngredient4, wight: x.strMeasure4 },
        { name: x.strIngredient5, wight: x.strMeasure5 },
        { name: x.strIngredient6, wight: x.strMeasure6 },
        { name: x.strIngredient7, wight: x.strMeasure7 },
        { name: x.strIngredient8, wight: x.strMeasure8 },
        { name: x.strIngredient9, wight: x.strMeasure9 },
        { name: x.strIngredient10, wight: x.strMeasure10 },
        { name: x.strIngredient11, wight: x.strMeasure11 },
        { name: x.strIngredient12, wight: x.strMeasure12 },
        { name: x.strIngredient13, wight: x.strMeasure13 },
        { name: x.strIngredient14, wight: x.strMeasure14 },
        { name: x.strIngredient15, wight: x.strMeasure15 },
        { name: x.strIngredient16, wight: x.strMeasure16 },
        { name: x.strIngredient17, wight: x.strMeasure17 },
        { name: x.strIngredient18, wight: x.strMeasure18 },
        { name: x.strIngredient19, wight: x.strMeasure19 },
        { name: x.strIngredient20, wight: x.strMeasure20 },
      ];

      let filterList = recipes.filter((x) => x.name !== "" && x.name != null);
      filterList;
      console.log(filterList);

      filterList.map((x) => {
        let cardConu = document.createElement("div");
        cardConu.classList.add("col-lg-4", "gy-3", "rounded-4");
        let text = document.createElement("p");
        text.innerText = x.name;
        cardConu.appendChild(text);
        $("#prodectRow").append(cardConu);
        text.addEventListener("click", function () {
          input = x.name;
          let ingredientsList = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`;
          const findArea = async () => {
            $("#prodectRow").html("");
            await fetch(ingredientsList)
              .then((res) => res.json())
              .then((res) =>
                res.meals.map((x) => {
                  displayList(x);
                })
              );
          };
          findArea();
      
        });
      });
    };

    ingredients();
  });
}

/// jquery ///////////

$("#menuBtn").click(function () {
  let offsetMenu = $("#filterMenu").offset().left;
  let widthMenu = $("#filterMenu").innerWidth();
  if (offsetMenu == 0) {
    $("#box").animate({ left: `-${widthMenu}px` }, 1500);
    $("#menuBtn i").attr("class", "bi bi-list");
    $("#list").animate(
      { marginLeft: "-600px", marginTop: "200px" },
      1000,
      function () {}
    );
    $("#list li").slideUp(1000);
  } else {
    $("#box").animate({ left: `0` }, 1000);
    $("#menuBtn i").attr("class", "bi bi-x-lg");
    $("#list").animate(
      { marginLeft: "1px", marginTop: "1px" },
      1000,
      function () {}
    );
    $("#list li").slideDown(1000);
  }
});

/*          contant page vaildtion     */
// ///////// regex:
if (location.href.includes("contact")) {
  $(window).ready(function () {
    let regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    let fName = document.getElementById("fName");
    /// name valid///
    fName.addEventListener("focusout", function () {
      if (fName.value === "") {
        $("#helpIdName").text(" *name is required");
      } else {
        $("#helpIdName").text("");
      }
      disabled();
    });
    /// emmail valid////
    let email = document.getElementById("email");
    email.addEventListener("focusout", function () {
      if (email.value === "") {
        $("#emailHelpId").text(" *email required");
      } else {
        $("#emailHelpId").text("");
      }
      disabled();
      if (regex.test(email.value) == false) {
        $("#emailHelpId").text(" *email is incorrect");
      } else {
        $("#emailHelpId").text("");
      }
      disabled();
    });
    /// age vaild///
    let age = document.getElementById("age");
    age.addEventListener("focusout", function () {
      if (age.value === "") {
        $("#helpIdAge").text("Age is required");
      } else {
        $("#helpIdAge").text("");
      }
      disabled();
    });
    //// password vaild///
    let password = document.getElementById("password");
    password.addEventListener("focusout", function () {
      if (password.value.length < 6) {
        $("#helpIdPassword").text("password mast by more 6");
      } else {
        $("#helpIdPassword").text("");
      }
      disabled();
    });
    //// comfirm password vaild///
    let comfirmPassword = document.getElementById("comfirmPassword");
    comfirmPassword.addEventListener("input", function () {
      if (password.value !== comfirmPassword.value) {
        $("#helpIdComfirmPassword").text("password not match");
      } else {
        $("#helpIdComfirmPassword").text("");
      }
      disabled();
    });
    //// phone vaild///
    let phone = document.getElementById("phone");
    phone.addEventListener("focusout", function () {
      if (phone.value === "") {
        $("#helpIdPhone").text("phone is required");
      } else {
        $("#helpIdPhone").text("");
      }
      disabled();
    });

    const disabled = () => {
      if (
        fName.value === "" ||
        email.value === "" ||
        age.value === "" ||
        password.value !== comfirmPassword.value ||
        phone.value === ""
      ) {
        $("#submitBtn").attr("disabled", true);
      } else {
        $("#submitBtn").attr("disabled", false);
      }
    };
    disabled();
  });
}
