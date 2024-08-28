import React, { useState } from 'react';


const questions = [
  {
    question: "What is React primarily used for?",
    options: [
      "Backend development",
      "Database management",
      "Building user interfaces",
      "Networking"
    ],
    answer: "Building user interfaces",
    explanation: "React is a JavaScript library used for building user interfaces, primarily single-page applications where you need a fast, interactive experience."
  },
  {
    question: "Which method in React is called when a component is mounted?",
    options: [
      "componentDidUpdate",
      "componentDidMount",
      "componentWillUnmount",
      "render"
    ],
    answer: "componentDidMount",
    explanation: "The componentDidMount method is called after a component is mounted (inserted into the tree). It's commonly used for fetching data or setting up subscriptions."
  },
  {
    question: "In Node.js, which module is used to handle HTTP requests?",
    options: [
      "fs",
      "http",
      "path",
      "url"
    ],
    answer: "http",
    explanation: "The http module in Node.js is used to create HTTP servers and handle HTTP requests."
  },
  {
    question: "What is the purpose of the `useEffect` hook in React?",
    options: [
      "To manage component state",
      "To perform side effects in functional components",
      "To handle routing",
      "To render JSX"
    ],
    answer: "To perform side effects in functional components",
    explanation: "The useEffect hook allows you to perform side effects (like data fetching, subscriptions) in functional components."
  },
  {
    question: "How do you create a new Express application?",
    options: [
      "express.create()",
      "new Express()",
      "express()",
      "Express.init()"
    ],
    answer: "express()",
    explanation: "To create a new Express application, you call the express() function which returns an instance of an Express application."
  },
  {
    question: "Which method is used to update state in a React class component?",
    options: [
      "setState()",
      "updateState()",
      "changeState()",
      "modifyState()"
    ],
    answer: "setState()",
    explanation: "In React class components, setState() is used to update the state of the component."
  },
  {
    question: "In Node.js, what is the purpose of the `package.json` file?",
    options: [
      "To define the structure of your HTML files",
      "To manage project dependencies and scripts",
      "To configure Webpack",
      "To store database configurations"
    ],
    answer: "To manage project dependencies and scripts",
    explanation: "The package.json file is used to manage project dependencies, scripts, and metadata about the project."
  },
  {
    question: "What is a middleware function in Express?",
    options: [
      "A function that handles HTTP requests",
      "A function that performs operations on the request and response objects",
      "A function that renders HTML",
      "A function that connects to the database"
    ],
    answer: "A function that performs operations on the request and response objects",
    explanation: "Middleware functions in Express are used to perform operations on the request and response objects before reaching the route handler."
  },
  {
    question: "How do you define a component in React?",
    options: [
      "By creating a function or class",
      "By using a constructor",
      "By importing a module",
      "By defining a variable"
    ],
    answer: "By creating a function or class",
    explanation: "In React, components can be defined as functions or classes that return JSX."
  },
  {
    question: "What is `npm` used for in Node.js development?",
    options: [
      "To manage packages",
      "To compile TypeScript",
      "To bundle JavaScript files",
      "To create a project directory"
    ],
    answer: "To manage packages",
    explanation: "npm (Node Package Manager) is used to manage packages and dependencies in Node.js development."
  }
];
export default questions;