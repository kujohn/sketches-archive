(ns happy_zhukovsky.dynamic
  (:require [quil.core :as q]
            [toolbelt.core :as t]))

(defn setup []
  (q/frame-rate 2)
  (q/color-mode :hsb)
  {})

(defn update-state [state])

(defn draw-state [state]
  (q/background 255)
  (q/stroke-weight 1.5)
  (q/stroke 255)
  (doseq [n (range 360)]
    (let [y (* (q/cos n) n) x (* (q/sin n) n)]
      (q/fill (q/random 15 35) 200 200)
      (q/ellipse (+ (/ (q/width) 2) x) (+ (/ (q/height) 2) y) 75 75)
      (q/ellipse (+ (/ (q/width) 2) x) (+ (/ (q/height) 2) y) 75 75)
    )
  )
)
