'use strict';

/**
 * Class
 * @constructor
 * @param size - size of pizza
 * @param type - type of pizza
 * @throws {PizzaException} - in case of improper use
 */
function Pizza(size, type) {
  if (arguments.length !== Pizza.NUMBER_OF_ARGUMENTS) {
    throw new PizzaException(`Invalid number of parameters passed to pizza, given ${arguments.length} instead of 2`);
  }
  if (Pizza.allowedSizes.indexOf(size) >= 0) {
    this.size = size;
  } else {
    throw new PizzaException('Invalid size of pizza');
  }
  if (Pizza.allowedTypes.indexOf(type) >= 0) {
    this.type = type;
  } else {
    throw new PizzaException('Invalid type of pizza');
  }
  this.extraIngredients = [];
}

Pizza.NUMBER_OF_ARGUMENTS = 2;

/* Sizes, types and extra ingredients */
Pizza.SIZE_S = {name: 'SMALL', price: 50};
Pizza.SIZE_M = {name: 'MEDIUM', price: 75};
Pizza.SIZE_L = {name: 'LARGE', price: 100};

Pizza.TYPE_VEGGIE = {name: 'VEGGIE', price: 50};
Pizza.TYPE_MARGHERITA = {name: 'MARGHERITA', price: 60};
Pizza.TYPE_PEPPERONI = {name: 'PEPPERONI', price: 70};

Pizza.EXTRA_TOMATOES = {name: 'TOMATOES', price: 5};
Pizza.EXTRA_CHEESE = {name: 'CHEESE', price: 7};
Pizza.EXTRA_MEAT = {name: 'MEAT', price: 9};

/* Allowed properties */
Pizza.allowedSizes = [Pizza.SIZE_S, Pizza.SIZE_M, Pizza.SIZE_L];
Pizza.allowedTypes = [Pizza.TYPE_VEGGIE, Pizza.TYPE_MARGHERITA, Pizza.TYPE_PEPPERONI];
Pizza.allowedExtraIngredients = [Pizza.EXTRA_TOMATOES, Pizza.EXTRA_CHEESE, Pizza.EXTRA_MEAT];

/**
 * Adds extra ingredient to the pizza if it was not added yet.
 * @param extra is the ingredient object.
 */
Pizza.prototype.addExtraIngredient = function(extra) {
  if (Pizza.allowedExtraIngredients.indexOf(extra) < 0) {
    throw new PizzaException('Invalid ingredient');
  }
  if (this.extraIngredients.indexOf(extra) >= 0) {
    throw new PizzaException('Ingredient is already added');
  }
  this.extraIngredients.push(extra);
}

/**
 * Removes extra ingredient from the pizza if the
 * one was added previously.
 * @param extra is the ingredient object.
 */
Pizza.prototype.removeExtraIngredient = function(extra) {
  if (Pizza.allowedExtraIngredients.indexOf(extra) < 0) {
    throw new PizzaException('Ingredient does not exist');
  }
  if (this.extraIngredients.indexOf(extra) < 0) {
    throw new PizzaException('No such ingredient in this pizza');
  }
  this.extraIngredients.splice(this.extraIngredients.indexOf(extra), 1);
}

/**
 * Returns all ingredients added to pizza
 * @returns {Array} of all ingredients added to pizza
 */
Pizza.prototype.getExtraIngredients = function() {
  return this.extraIngredients;
}

/**
 * Calculates price of the pizza based on its
 * size, type and extra ingredients.
 * @returns {Number} price of the pizza as a number.
 */
Pizza.prototype.getPrice = function() {
  return [this.size, this.type, ...this.extraIngredients].reduce((totalPrice, item) => totalPrice + item.price, 0);
}

/**
 * Provides complete info about the pizza.
 * @returns {String} that describes pizza`s size, type,
 * extra ingredients as well as its final price.
 */
Pizza.prototype.getPizzaInfo = function() {
  function getIngredients(extraIngredients) {
    if (extraIngredients.length === 0) {
      return 'none';
    } else if (extraIngredients.length === 1) {
      return extraIngredients[0].name;
    } else {
      return extraIngredients.reduce((extras, item, index) => {
        if (index === 0) {
          return extras + item.name;
        } else {
          return `${extras}, ${item.name}`;
        }
      }, '')
    }
  }
  return `Size: ${this.size.name}, type: ${this.type.name}; ` +
  `extra ingredients: ${getIngredients(this.extraIngredients)}; price: ${this.getPrice()}UAH.`;
}

/**
 * Provides the size object of the pizza.
 * @returns {Object} describing the size of the pizza.
 */
Pizza.prototype.getSize = function() {
  return this.size;
}

/**
 * Provides information about an error while working with a pizza.
 * details are stored in the log property.
 * @constructor
 */
function PizzaException(message = 'Error occurred') {
  this.log = message;
}
PizzaException.prototype = Error.prototype;

/* It should work */ 
// small pizza, type: veggie
let pizza = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
// add extra meat
pizza.addExtraIngredient(Pizza.EXTRA_MEAT);
// check price
console.log(`Price: ${pizza.getPrice()} UAH`); //=> Price: 109 UAH
// add extra corn
pizza.addExtraIngredient(Pizza.EXTRA_CHEESE);
// add extra corn
pizza.addExtraIngredient(Pizza.EXTRA_TOMATOES);
// check price
console.log(`Price with extra ingredients: ${pizza.getPrice()} UAH`); // Price: 121 UAH
// check pizza size
console.log(`Is pizza large: ${pizza.getSize() === Pizza.SIZE_L}`); //=> Is pizza large: false
// remove extra ingredient
pizza.removeExtraIngredient(Pizza.EXTRA_CHEESE);
console.log(`Extra ingredients: ${pizza.getExtraIngredients().length}`); //=> Extra ingredients: 2
console.log(pizza.getPizzaInfo()); //=> Size: SMALL, type: VEGGIE; extra ingredients: MEAT,TOMATOES; price: 114UAH.

// examples of errors
// let pizza2 = new Pizza(Pizza.SIZE_S); // => Required two arguments, given: 1
//
// let pizza3 = new Pizza(Pizza.SIZE_S, Pizza.SIZE_S); // => Invalid type
//
// let pizza4 = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
// pizza4.addExtraIngredient(Pizza.EXTRA_MEAT);
// pizza4.addExtraIngredient(Pizza.EXTRA_MEAT); // => Duplicate ingredient
//
// let pizza5 = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
// pizza5.addExtraIngredient(Pizza.EXTRA_MEAT); // => Invalid ingredient
