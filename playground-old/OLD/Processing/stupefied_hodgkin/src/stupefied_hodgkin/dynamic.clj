(ns stupefied_hodgkin.dynamic
  (:require [quil.core :as q :include-macros true]
            [toolbelt.core :as t]))

(def size [500 500])

(defn setup []
  (q/frame-rate 2)
  (q/color-mode :hsb)
  {})

(defn update-state [state])

(defn c [[tl tr br bl] [cx cy]]
  (let [color (t/rand-hsb 50)]
    (q/stroke (t/rand-hsb 200))
    (q/fill color)
    (q/ellipse cx cy 40 40)
    (q/ellipse cx cy 100 100)))

(defn draw-state [state]
  (q/background 255)
  (t/tile (q/width) (q/height) 8 c)
  (q/stroke 255)
  (t/padding 50 255))
