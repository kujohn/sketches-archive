(ns bold_mclaren.dynamic
  (:require [quil.core :as q]
            [toolbelt.core :as t]))

(def size [500 500])

(defn setup []
  (q/frame-rate 2)
  (q/color-mode :hsb)
  {:particles []})

(defn update-state [state]
  (loop [i 0 all []]
    (if (< i 200)
      (recur (inc i) (conj all i))
      (assoc {} :particles all))))

(defn draw-state [state]
  (println state)
  (q/background 255)
  (q/fill 10)
  (q/stroke 255)
  (t/padding 50 255))
