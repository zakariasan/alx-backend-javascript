// 1-stdin.js

process.stdout.write('Welcome to Holberton School, what is your name?\n');

// Listen for data input
process.stdin.on('data', (data) => {
  // Trim the input to remove any extra newline characters
  const name = data.toString().trim();
  // Display the user's input
  process.stdout.write(`Your name is: ${name}\n`);
  // Display the closing message and exit the process
  process.stdout.write('This important software is now closing\n');
  process.exit();
});

