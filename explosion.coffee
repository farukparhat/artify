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
    @iteration            = 0;
    @style                = @parent.style
    @fontsize             = parseFloat(window.getComputedStyle(@parent).getPropertyValue('font-size'))
    @fontfamily           = window.getComputedStyle(@parent).getPropertyValue('font-family')
    @fontweight           = window.getComputedStyle(@parent).getPropertyValue('font-weight')
    @textdecoration       = window.getComputedStyle(@parent).getPropertyValue('text-decoration')
    @fontstyle            = window.getComputedStyle(@parent).getPropertyValue('font-style')
    @lineheight           = window.getComputedStyle(@parent).getPropertyValue('line-height')
    @textalign            = window.getComputedStyle(@parent).getPropertyValue('text-allign')
    @stroke               = window.getComputedStyle(@parent).getPropertyValue('stroke')
    @strokeweight         = window.getComputedStyle(@parent).getPropertyValue('stroke-weight')
    @cssprops             = [@fontsize, @fontfamily, @fontweight, @textdecoration, @fontstyle, @lineheight, @textalign, @stroke, @strokeweight]

    @elem.style['zIndex'] = -9999
    @transformX           = 0
    @transformY           = 0
    @transformRotation    = 0
    @offsetTop  = window.getOffset(@elem).top
    top = window.pageYOffset or document.documentElement.scrollTop
    @offsetLeft = window.getOffset(@elem).left
    @width = elem.offsetWidth
    @height = elem.offsetHeight
    @attempts = 0
    @valid = true

this.Particle = Particle

class Explosion
  constructor:()->
    @body          = document.getElementsByTagName("body")[0]
    @pixels = 0
    @body?.onclick = (event)=>@justClicked(event)
    @body.addEventListener("touchstart", (event)=>
        @touchEvent = event
      )
    @body.addEventListener("touchmove", (event)=>
        @touchMoveCount ||= 0
        @touchMoveCount++
      )
    @body.addEventListener("touchend", (event)=>
        @dropBomb(@touchEvent) if @touchMoveCount < 2
        @touchMoveCount = 0
      )
    @explosifyNodes  @body.childNodes
    i = 0
    @chars = for char in document.getElementsByTagName('particle')
      if ((window.getOffset(@char).top <= (window.innerHeight + window.pageYOffset)) && (window.getOffset(char).top >= pageYOffset)) 
        curr = new Particle(char, @body)
        curr.iteration = i
        i++
        curr
      
    for char in document.getElementsByTagName('particle')
      char.style.visibility = 'hidden'



  justClicked:(event)=>
    pos = window.findClickPos(event)

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

this.Explosion = Explosion
