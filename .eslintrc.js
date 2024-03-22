module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "plugins":["prettier"],
    "extends":["eslint:recommended","plugin:prettier/recommended"],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "ignorePatterns":[
        "node_modules/"
    ],
    "rules": {
        "prettier/prettier":["error",{"printWidth":120}]
    }
}
