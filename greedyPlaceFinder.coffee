window.greedyAlgorithm = (chars, validPixels)->
	seconds = new Date().getTime() / 1000
	currTime = seconds
	results = []
	while chars.length > 0
		allShitty = true
		newChars = []
		for char in chars
			currTime = new Date().getTime() / 1000
			if currTime > seconds + 15
				break
			keep = true
			checks = []
			checks[0] = [0,0]
			checks[1] = [char.width, 0]
			checks[2] = [0, char.height]
			checks[3] = [char.width, char.height]
			fits = true
			finalX = -1
			finalY = -1
			end = false
			console.log(char.attempts)
			if char.attempts <= 3
				allShitty = false
			for i in [0...validPixels.length]
				for j in [0...validPixels[i].length]
					k=0
					fits = true
					while k < 4-char.attempts
						currX = checks[k][0]
						currY = checks[k][1]
						if currX + i >= validPixels.length
							currX = validPixels.length - i - 1
						if currY + j >= validPixels[i].length
							currY = validPixels[i].length- j - 1
						if not validPixels[currX+i][currY+j]
							fits = false
						k++
					if fits
						end = true
						finalX = i
						finalY = j
						break
				if end
					break
			end = false
			char.attempts++;
			if fits
				keep = false
				results.push([char, finalX, finalY]);
				for a in [0..char.width] 
					for b in [0..char.height]
						validPixels[Math.floor(a+finalX, validPixels.length-1)][Math.floor(b+finalY, validPixels[0].length-1)] = false
			if keep
				newChars.push(char)
		if(!allShitty)
			chars = newChars
		else
			chars = []
	alert "Finished!!" + results.length
	return results


