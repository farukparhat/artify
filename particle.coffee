class Particle
  constructor:(elem)->
    @elem                 = elem
    @style                = elem.style
    @elem.style['zIndex'] = -9999
    @transformX           = 0
    @transformY           = 0
    @transformRotation    = 0
    @offsetTop  = window.getOffset(@elem).top
    @offsetLeft = window.getOffset(@elem).left
    @velocityX  = 0
    @velocityY  = 0

this.Particle = Particle