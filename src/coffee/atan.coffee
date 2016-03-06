"use strict"

###
    Init Atan with a simple conf object or array of objects
###
Atan = ( confs ) ->
    this.targets = null
    this.event = null
    this.confs = confs
    this.isMultiConfs = false

    this.run()

    return this

# The run methode will check if there are some conf or juste one
Atan.prototype.run = () ->
    if Array.isArray this.confs
        this.targets = []
        this.event = []
        this.isMultiConfs = true

    this.parseConf()

# This method will set event listners
Atan.prototype.parseConf = () ->
    if this.isMultiConfs
        i = 0

        for conf in this.confs
            i++
            this.parseEvents conf, i
    else
        this.parseEvent()

Atan.prototype.parseEvent = () ->
    this.targets = document.querySelectorAll( this.confs.targets )
    this.event = this.confs.event

    if this.targets
        for target in this.targets
            this.intiEvent target, this.event

Atan.prototype.parseEvents = ( conf, i ) ->
    targets = this.targets[ i ] = document.querySelectorAll( conf.targets )
    event = this.event[ i ] =  conf.event

    if targets.length != 0
        if event.type == "scroll"
            this.loadAtScroll targets, event, i
        else
            for target in targets
                this.intiEvent target, event, i

Atan.prototype.loadAtScroll = ( targets, event, i ) ->
    that = this
    h = window.innerHeight || document.clientHeight

    if event.loadIfVisible
        this.loadAllVisible targets, h, i

    window.addEventListener "scroll", ( e ) ->
        dh = h + document.body.scrollTop
        a = -1
        delay = event.options.delay || false

        for target in targets
            posY = target.getBoundingClientRect().top

            if dh >= posY
                that.loadImg target, that, i
    , false

Atan.prototype.loadAllVisible = ( targets, h, i ) ->
    that = this

    for target in targets
        posY = target.offsetTop

        if h >= posY
            that.loadImg target, that, i
            # TODO: Remove loaded images

# Initalise an event
Atan.prototype.intiEvent = ( target, event, i ) ->
    type = event.type || "load"
    fn = event.function || this.loadImg
    that = this
    i = i || false

    target.addEventListener type, ( e ) ->
        fn e.target, that, i
    , false

# Load the image
Atan.prototype.loadImg = ( target, that, i ) ->
    src = that.getSource( target, i )
    target.src = src

# get the image source
Atan.prototype.getSource = ( target, i ) ->
    if i
        conf = this.confs[ i - 1 ]
    else
        conf = this.confs

    src = conf.source.replace "data-", ""

    if src != target.dataset[src]
        return target.dataset[src]

    return false
