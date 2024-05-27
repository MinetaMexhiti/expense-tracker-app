module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },

  // In jest.config.js or package.json under "jest"
"transformIgnorePatterns": [
  "node_modules/(?!(axios)/)"
]

};
