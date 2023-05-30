const validateCategory = (newData) => {
  if (newData.title == "" || newData.link == "" || newData.img == "") {
		let message = {
			code: 201,
			status: false,
			message: "Fields cannot be left empty"
		}
		
		return message
	}
}

module.exports = { validateCategory }