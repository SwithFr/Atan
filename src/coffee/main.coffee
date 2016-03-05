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
    }
]
