greedyAlgorithm:(chars, validPixels)->
	while chars.length > 0
		allShitty = true
		newChars = []
		for char in chars
			keep = true
			x = char.offsetLeft
			y = char.offsetTop
			checks = []
			checks[0] = [x,y]
			checks[1] = [x+char.width, y]
			checks[2] = [x, y+char.height]
			checks[3] = [x+char.width, y+char.height]
			fits = true
			i = 0
			if char.attempts <= 3
				allShitty = false
			while i < 4-char.attempts
				i++
				if not (validPixels[i][0] && validPixels[i][1])
					fits = false
			if fits
				keep = false
				for i in [0..char.width] 
					for j in [0..char.width]
						validPixels[i+x][j+y] = false
			if keep
				newChars.add(char)
		if(!allShitty)
			chars = newChars
		else
			chars = []


