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
            this.targets[ i ] = document.querySelectorAll(conf.targets)
            this.event[ i ] =  conf.event
            if this.targets[ i ].length != 0
                for target in this.targets[ i ]
                    this.intiEvent target, this.event[ i ], i
    else
        this.targets = document.querySelectorAll(this.confs.targets)
        this.event = this.confs.event
        if this.targets
            for target in this.targets
                this.intiEvent target, this.event

# Initalise an event
Atan.prototype.intiEvent = ( target, event, i ) ->
    type = event.type || "load"
    fn = event.function || this.loadImg
    that = this
    i = i || false
    target.addEventListener type, ( e ) ->
        fn e, that, i
    , false

# Load the image
Atan.prototype.loadImg = ( event, that, i ) ->
    src = that.getSource( event.target, i )
    event.target.src = src

# get the image source
Atan.prototype.getSource = ( target, i ) ->
    if i
        conf = this.confs[ i - 1 ]
    else
        conf = this.confs

    src = conf.source.replace "data-", ""
    if src != target.dataset.src
        return target.dataset.src

    return false
