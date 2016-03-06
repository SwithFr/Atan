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

Atan.prototype._getTargets = ( target ) ->
    return [].slice.call(document.querySelectorAll( target ))

Atan.prototype.parseEvent = () ->
    targets = this.targets = this._getTargets( this.confs.targets )

    if targets
        for target in targets
            this.initEvent target, this.confs.event

Atan.prototype.parseEvents = ( conf, i ) ->
    targets = this.targets[ i ] = this._getTargets( conf.targets )
    event =  conf.event

    if targets.length != 0
        if event.type == "scroll"
            this.loadAtScroll event, i
        else
            for target in targets
                this.initEvent target, event, i

Atan.prototype.loadAtScroll = ( event, i ) ->
    that = this
    h = window.innerHeight || document.clientHeight

    if event.loadIfVisible
        this.loadAllVisible h, event, i

    window.addEventListener "scroll", ( e ) ->
        for target in this.targets[ i ]
            posY = target.getBoundingClientRect().top

            if posY < h
                that.runLoading target, event, i

    , false

Atan.prototype.runLoading = ( target, event, i ) ->
    delay = event.options && event.options.delay || false
    that = this

    if delay
        window.setTimeout () ->
            that.loadImg target, that, i
        , delay
    else
        that.loadImg target, that, i

Atan.prototype.loadAllVisible = ( h, event, i ) ->
    that = this

    for target in this.targets[ i ]
        posY = target.getBoundingClientRect().top

        if posY < h
            that.runLoading target, event, i

# Initalise an event
Atan.prototype.initEvent = ( target, event, i ) ->
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
    if target.src != src
        if that.confs[ i - 1 ].showLoader
            target.src = './img/Loading.gif'
            window.setTimeout () ->
                target.src = src
            , 200
        else
            target.src = src

    this.removeTarget target, i

Atan.prototype.removeTarget = ( target, i ) ->
    if i
        this.targets[ i ].splice this.targets[ i ].indexOf target, 1
    else
        this.targets.splice this.targets.indexOf target, 1

# get the image source
Atan.prototype.getSource = ( target, i ) ->
    if i
        conf = this.confs[ i - 1 ]
    else
        conf = this.confs

    src = conf.source.replace "data-", ""

    return target.dataset[src]
