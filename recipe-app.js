if (Meteor.isClient) {
  //Session.setDefault("recipe", {});

  Meteor.call("getRecipe", function(error, result) {
    Session.set("recipe", result);
  });

  Template.title.helpers({
    title: function() {
      return Session.get("recipe").title;
    }
  });

  Template.ingredients.helpers({
    ingredients: function() {
      return Session.get("recipe").extendedIngredients;
    }
  });

  Template.registerHelper("arrayify", function(theArray, offset) {
    resultingArray = [];
    for (var i = 0; i < theArray.length; i++) {
      resultingArray.push({"key": i + offset, "value": theArray[i]});
    }
    return resultingArray;
  });

  Template.instructions.helpers({
    instructions: function() {
      var bigInstructionText = Session.get("recipe").text;
      console.log(bigInstructionText);
      return bigInstructionText.split(/\.\s/);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

  });

  Meteor.methods({
    getRecipe: function() {
      return EJSON.parse(Assets.getText("recipe.json"));
    }
  });
}
