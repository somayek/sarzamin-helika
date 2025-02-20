const { Engine } = require("json-rules-engine");

// Function to process rules
const evaluateRules = async (userData, rules) => {
  const engine = new Engine();

  // Load rules into engine
  rules.forEach((rule) => engine.addRule(rule));

  // Run the engine
  return await engine.run(userData);
};

module.exports = { evaluateRules };
