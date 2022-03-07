(ns xenodochial_sutherland.dynamic
  (:require [quil.core :as q :include-macros true] [toolbelt.core :as t]))

(defn setup []
  ; Set frame rate to 30 frames per second.
  (q/frame-rate 2)
  ; Set color mode to HSB (HSV) instead of default RGB.
  (q/color-mode :hsb))
  ; setup function returns initial state. It contains
  ; circle color and position.

(defn d [tl tr br bl xtile ytile] (let [e? (even? (rand-int 6))
                                        a [tl br]
                                        b [tr bl]
                                        c [tl tr]
                                        d [bl br]
                                        ]
                                    (q/stroke [(q/random 255) (q/random 170) 255])
                                    (apply q/line (if e? c d))
                                    (apply q/line (if e? a b))))

(defn draw-state []
  (q/background 255)
  (q/fill 255)
  (t/tile (q/width) (q/height) 40 d)
  (t/tile (q/width) (q/height) 10 d)
  (q/stroke 255)
  (t/padding 50 255))
