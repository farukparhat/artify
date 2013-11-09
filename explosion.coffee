w = window

w.findClickPos = (e)-> 
  posx = 0
  posy = 0
  if (!e) then e = window.event
  if (e.pageX || e.pageY)
    posx = e.pageX
    posy = e.pageY
  else if (e.clientX || e.clientY)
    posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
    posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop
  x:posx,y:posy

w.getOffset = (el)->
  body = document.getElementsByTagName("body")[0]
  _x = 0
  _y = 0
  while el and !isNaN(el.offsetLeft) and !isNaN(el.offsetTop) 
      _x += el.offsetLeft - el.scrollLeft
      _y += el.offsetTop - el.scrollTop
      el = el.offsetParent
   top: _y + body.scrollTop, left: _x + body.scrollLeft

class Particle
  constructor:(elem, body)->
    @elem                 = elem
    @parent               = @elem.parentNode
    @char                 = elem.innerHTML
    @body                 = body
    @style                = @parent.style
    @fontsize             = parseFloat(window.getComputedStyle(@parent).getPropertyValue('font-size'))
    @elem.style['zIndex'] = -9999
    @transformX           = 0
    @transformY           = 0
    @transformRotation    = 0
    @offsetTop  = window.getOffset(@elem).top
    @offsetLeft = window.getOffset(@elem).left

this.Particle = Particle

class Explosion
  constructor:()->
    @body          = document.getElementsByTagName("body")[0]
    @explosifyNodes  @body.childNodes
    @chars = for char in document.getElementsByTagName('particle')
      curr = new Particle(char, @body)
      curr
    for part in @chars
      alert (part.char + ": " + "X= " + part.offsetLeft + ", Y= " + part.offsetTop + 
        ", \nFont: " + part.fontsize)

  explosifyNodes:(nodes)->
    for node in nodes
      @explosifyNode(node)
  
  explosifyNode:(node)->
    for name in ['script','style','iframe','canvas','video','audio','textarea','embed','object','select','area','map','input']
      return if node.nodeName.toLowerCase() == name
    switch node.nodeType
      when 1 then @explosifyNodes(node.childNodes)
      when 3
        unless /^\s*$/.test(node.nodeValue)
          if node.parentNode.childNodes.length == 1
            node.parentNode.innerHTML = @explosifyText(node.nodeValue)
            #alert explosifyText(node.nodeValue)
          else
            newNode           = document.createElement("particles")
            newNode.innerHTML = @explosifyText(node.nodeValue)
            node.parentNode.replaceChild newNode, node

  explosifyText:(string)->
    chars = for char, index in string.split ''
      unless /^\s*$/.test(char) then "<particle style='display:inline-block;'>#{char}</particle>" else '&nbsp;'
    chars = chars.join('')
    chars = for char, index in chars.split '&nbsp;'
      unless /^\s*$/.test(char) then "<word style='white-space:nowrap'>#{char}</word>" else char
    chars.join(' ')
new Explosion()
