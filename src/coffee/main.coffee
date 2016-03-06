atan = new Atan [
    {
        "targets": ".over" # Select all elements with .over class
        "event": {
            "type": "mouseover" # Load the image on mouse over
        }
        "source": "data-src" # get the source in this attribute
    },
    {
        "targets": ".click"
        "event": {
            "type": "click"
        }
        "source": "data-img"
    },
    {
        "targets": ".scroll"
        "event": {
            "type": "scroll",
            "loadIfVisible": true # If an image is on screen view load it
            "options": {
                "delay": 1000
            }
        }
        "source": "data-scroll"
    }
]
