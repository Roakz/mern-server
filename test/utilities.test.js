const expect = require("expect")
const fs = require("fs")
const utilities = require("../utils/utilities")
// Use test data file
const testDataFile = "../data/blog_posts.test.json"
// When we write to the file, the path is relative to app.js
const testDataFileForWrite = utilities.getDataFileRelativeToApp(testDataFile)

beforeEach(() => {
	// Set and load data from test data file
	setupData()
})
afterEach(() => {
	// Empty test file data
	tearDownData()
})

describe("getAllPosts with one post", () => {
	it("should get a post if one exists", () => {
		// Pass an empty req object
		expect(Object.keys(utilities.getAllPosts({})).length).toBe(1)
	})
	it("user of first post should be tester", () => {
		expect(utilities.getAllPosts({})["1"].username).toBe("tester")
	})
})

describe("getPostById", () => {
	// Define a req object with the expected structure to pass a parameter
	const req = {
		params: {
			id: "1"
		}
	}
	it("user of post with id 1 should be tester", () => {
		expect(utilities.getPostById(req).username).toBe("tester")
	})
})

// Setup and tear down functions
function setupData() {
	let testPostData = {}
	let testPost = {}
	let date = Date.now()
	testPost.title = "Test post 1"
	testPost.username = "tester"
	testPost.create_date = date
	testPost.modified_date = date
	testPost.content = "This is the first test post"
	testPost.category = ""
	testPostData["1"] = testPost

	fs.writeFileSync(testDataFileForWrite, JSON.stringify(testPostData))
	utilities.setDataFile(testDataFile)
}

function tearDownData() {
	let testPostData = {}
	fs.writeFileSync(testDataFileForWrite, JSON.stringify(testPostData))
}