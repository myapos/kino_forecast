export const numOfNumbers = 80;

export const getHistoryResults = `getHistoryResults`;

// export const proxyBaseURL = `http://localhost:3000`;

export const proxyBaseURL = `http://localhost:81/kino`;

export const startDateStr = '2018-03-25'; // YYYY-MM-DD

export const endDateStr = '2018-03-25'; // YYYY-MM-DD

let date = new Date();

// set as default time frame the current date - 1 until current date

export const startDate = new Date(date.setDate(date.getDate() - 1)); // YYYY-MM-DD

export const endDate = new Date(); // YYYY-MM-DD

// export const endDate = new Date('2017-12-31'); // YYYY-MM-DD

export const unplugApiKey = '4fed9657fb6f9971daca5ebf7701728f3afec8871d9e76a87fd25266e0d902d5';
