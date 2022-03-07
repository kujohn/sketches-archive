(ns gifted_rubin.dynamic
  (:require [quil.core :as q]
            [toolbelt.core :as t]))

(def size [500 500])

(defn setup []
  (q/frame-rate 2)
  (q/color-mode :rgb)
  {:particles []})

(defn update-state [state] (loop [x 0 acc []]
                             (if (< x 50)
                               (recur (+ x 1) (conj acc x))
                               { :particles (conj acc x)})))

(defn draw-state [state]
  (q/clear)
  (q/background 200)
  (q/fill 255 255 255 0.3)
  (q/stroke 255)
  (doseq [x (state :particles)] (q/ellipse (/ (q/width) 2) (/ (q/height) 2) (* x 10) (* x 10)))
  (t/padding 50 255))
