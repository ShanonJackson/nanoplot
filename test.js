// Example of truncated JSON
const invalidJSON = '{"name": "Alice", "age": 25'; // Missing closing brace

try {
	JSON.parse(invalidJSON);
} catch (error) {
	console.error("Error:", error.message); // This will log: Unexpected end of JSON input
}
