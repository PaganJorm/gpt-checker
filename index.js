window.onload = () => {
	document.getElementById("eval").addEventListener("click", evalFunction)
}

function evalFunction() {
	let output = document.getElementById("test-results")
	let func = document.getElementById("code-input").value.toString()
	let funcName = func.split(" ")[1]
	funcName = funcName.substring(0, funcName.indexOf("("))

	/*
		Apparently this has better performance than
		output.innerHTML = ''
		Never tested  
	*/
	while (output.firstChild) {
		output.removeChild(output.firstChild)
	}

	try {
		var body = func
		var wrap = (s) => "{ return " + func + " };" //return the block having function expression
		func = new Function(wrap(body))
		func.call(null).call(null)
	} catch (error) {
		output.innerHTML = "Invalid code input"
	} finally {
		if (funcName.match(/^(add|addNums|addNum|addNumbers|Add|Sum|sum)$/)) {
			printResults(testSum(func))
		} else if (funcName.match(/^(multiplyNumbers|mult|multiply)$/)) {
			printResults(testMultiply(func))
		} else {
			output.innerHTML = "Function not yet supported or invalid function name"
		}
	}
}

function printResults(results) {
	let textArea = document.getElementById("test-results")

	results.forEach((result) => {
		let text = document.createElement("p")

		text.textContent = "Test"

		if (result === true) {
			text.textContent = "✔️ " + text.textContent + " success"

			text.style.color = "#66FF99"
		} else {
			text.textContent = "❌ " + text.textContent + " fail"

			text.style.color = "#ff726f"
		}

		textArea.appendChild(text)
	})
}

function testSum(func) {
	let results = []

	results.push(func.call(null).call(null, 4, 4) === 8)
	results.push(func.call(null).call(null, 0, 0) === 0)
	results.push(func.call(null).call(null, 100, 200) === 300)
	results.push(func.call(null).call(null, 999, 999) === 1998)

	return results
}

function testMultiply(func) {
	let results = []

	results.push(func.call(null).call(null, 2, 2) === 4)
	results.push(func.call(null).call(null, 0, 0) === 0)
	results.push(func.call(null).call(null, 0, 10) === 0)
	results.push(func.call(null).call(null, 10, 10) === 100)

	return results
}