function newCoefficient() {
  return Math.floor((Math.random() * 100));
}

function DNA() {

  this.genes = [];
  this.fitness = 0;
  for (var i = 0; i < 3; i++) {
    this.genes[i] = newCoefficient(); 
  }

  // converts coefficients to string expression
  this.getExpression = function() {
    return this.genes[0] + "*(x**2) + " + this.genes[1] + "*x + " + this.genes[2];
  }

  //calculate the fitness function
  this.calcFitness = function(series) {
    var score = 0;
    var x, k, y;
    for(var i = 0; i < series.length - 1; i++) {
      x = series[i];
      y = series[i+1];
      k = (this.genes[0] * (x**2) + this.genes[1] * x + this.genes[2]);
      if(y > k) score += 1 - Math.abs(1-(k/y));
      else score += 1 - Math.abs(1-(y/k));
    }
    this.fitness = score;
  }

  // Crossover
  this.crossover = function(partner) {
    //create a new DNA
    var child = new DNA();
    
    var midpoint = Math.floor(Math.random(this.genes.length)); // Pick a midpoint
    
    // Half from one, half from the other
    for (var i = 0; i < this.genes.length; i++) {
      if (i > midpoint) child.genes[i] = this.genes[i];
      else              child.genes[i] = partner.genes[i];
    }
    return child;
  }

  // Based on a mutation probability, picks a new random character
  this.mutate = function(mutationRate) {
    for (var i = 0; i < this.genes.length; i++) {
      if (Math.random(1) < mutationRate) {
        this.genes[i] = newCoefficient();
      }
    }
  }
}
