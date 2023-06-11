function generateRandomString() { const alphaNumerical = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let result = '';
for (let i = 0; i < 6; i++) {
  result += alphaNumerical.charAt(Math.floor(Math.random() * alphaNumerical.length));
}
return result;
};

const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
app.set("view engine", "ejs");

//body parser
const bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: true }));

const urlDatabase = {
 "b2xVn2": "http://www.lighthouselabs.ca",
 "9sm5xK": "http://www.google.com"
};
// newdatabase with id
//const urlNewDatabase = {
 // b6UTxQ: { longURL: "https://www.tsn.ca", userID: "aJ48lW" },
  //i3BoGr: { longURL: "https://www.google.ca", userID: "aJ48lW" }
//};

app.get("/", (req, res) => {
  res.send("Hello!");
  });
//Get routes
  app.get("/urls", (req, res) => {
    const templateVars = { urls: urlDatabase };
    res.render("urls_index", templateVars);
  });

  app.get("/urls/new", (req, res) => {
    res.render("urls_new");
  });

  app.get("/urls/:shortURL", (req, res) => {
    const templateVars = { shortURL:req.params.shortURL, longURL: urlDatabase.b2xVn2 };
    res.render("urls_show", templateVars);

    app.get("/u/:id", (req, res) => {
      const id = req.params.id;
      const longURL = urlDatabase[id].longURL;
      res.redirect(longURL);
    });
    
  });
    //Post routes
  //generate random short url and add to database
  app.post("/urls", (req, res) => {
    const longURL = req.body.longURL;
    //const userID = req.session["userID"];
    const shortURL = generateRandomString();
    //urlNewDatabase[shortURL] = { longURL};
    res.redirect(`/urls/${shortURL}`);
  });
  

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

